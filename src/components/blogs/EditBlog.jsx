import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Textarea,
  useColorModeValue,
  FormHelperText,
} from "@chakra-ui/react";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import { useUpdateBlog } from "../../hooks/blogs";
import { useAuth } from "../../hooks/auths";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function EditBlog({ onModalClose, blogId }) {
  const { updateBlog, isLoading } = useUpdateBlog();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [currentBlog, setCurrentBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${API_URL}/blogs/${blogId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCurrentBlog(res.data.data);
        setValue("title", res.data.data.title);
        setValue("desc", res.data.data.body);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlog();
  }, [blogId, setValue]);

  const handleUpdateBlog = async (data) => {
    await updateBlog(blogId, {
      title: data.title,
      body: data.desc,
      author: user.username,
    });
    reset();
    onModalClose();
  };

  if (!currentBlog) {
    //return a loading spinner on full modal
    return (
      <Flex minH={"40vh"} align={"center"} justify={"center"}>
        <Box>Loading...</Box>
      </Flex>
    );
  }

  return (
    <Flex minH={"40vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"90%"} minW={"90%"} py={12}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Update Blog</Heading>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} p={8}>
          <Stack>
            <form onSubmit={handleSubmit(handleUpdateBlog)}>
              <FormControl id="title">
                <FormLabel>Blog Title</FormLabel>
                <Input
                  type="text"
                  {...register("title", { required: true, maxLength: 120 })}
                />
                <FormHelperText>
                  Eg: The Art of Effective Communication
                </FormHelperText>
              </FormControl>
              <FormControl id="desc" mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder='I know writing can be tough, just type "blah blah blah" to test things out!'
                  as={TextareaAutosize}
                  minRows={5}
                  resize={"none"}
                  {...register("desc", { required: true })}
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  mt={"10px"}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                  isLoading={isLoading}
                  loadingText={"Loading..."}
                >
                  Update
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
