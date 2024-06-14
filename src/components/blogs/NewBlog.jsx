import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  Textarea,
  useColorModeValue,
  FormHelperText,
} from "@chakra-ui/react";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import { useAddBlog } from "../../hooks/blogs";
import { useAuth } from "../../hooks/auths";

export default function SimpleCard({ onModalClose }) {
  const { addBlog, isLoading } = useAddBlog();
  const { user, authLoading } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleAddBlog = async (data) => {
    addBlog({
      title: data.title,
      body: data.desc,
      author: user.username,
    });
    reset();
    onModalClose();
  };

  return (
    <Flex minH={"40vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"90%"} minW={"90%"} py={12}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Add new blog</Heading>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} p={8}>
          <Stack>
            <form onSubmit={handleSubmit(handleAddBlog)}>
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
              <FormControl id="desc">
                <FormLabel> Description</FormLabel>
                <Textarea
                  placeholder='I know writing can be tough, Just type "blah blah blah" to test things out!'
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
                  POST
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
