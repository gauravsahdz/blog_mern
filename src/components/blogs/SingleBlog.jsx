import React from "react";
import {
  Box,
  Heading,
  Link,
  Text,
  Avatar,
  Flex,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Grid,
  Image,
} from "@chakra-ui/react";
import { useAuth } from "../../hooks/auths";
import { formatDistanceToNow } from "date-fns";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useDeleteBlog } from "../../hooks/blogs";
import { Link as RouterLink } from "react-router-dom";
import { useUser } from "../../hooks/user";
import EditBlog from "./EditBlog";

const SingleBlog = ({ blog }) => {
  const { user, isLoading: authLoading } = useAuth();
  const { _id, authorId } = blog;
  const {
    isOpen: isMenuOpen,
    onOpen: onMenuOpen,
    onClose: onMenuClose,
  } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const { deleteBlog, isLoading: deleteLoading } = useDeleteBlog(_id);

  const formatPostedTime = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  return (
    <Grid templateColumns="1fr" gap={4} marginBottom={5} key={blog._id}>
      <Box
        p={5}
        boxShadow="md"
        borderRadius="md"
        bg="white"
        border="1px solid"
        borderColor="gray.200"
        minHeight="200px"
        display="flex"
        flexDirection="column"
      >
        <Box flex="1" as={RouterLink} to={`/blogs/${blog?._id}`}>
          <Image
            src={blog.imageLink}
            alt={blog.title}
            borderRadius="md"
            _hover={{
              cursor: "pointer",
              transform: "scale(1.05)",
              transition: "transform 0.2s",
            }}
          />
          <Heading fontSize="xl" marginTop="2">
            <Link
              textDecoration="none"
              _hover={{ textDecoration: "underline" }}
            >
              {blog.title}
            </Link>
          </Heading>
          <Text as="p" fontSize="md" marginTop="2" noOfLines={3}>
            {blog.body}
          </Text>
        </Box>
        <Flex align="center" marginTop="auto">
          <Avatar name={blog?.author} size="sm" />
          <Box marginLeft={3}>
            <Text fontWeight="bold">{blog?.author}</Text>
            <Text fontSize="sm" color="gray.500">
              {formatPostedTime(blog.createdAt)}
            </Text>
          </Box>
          {!authLoading && user?._id === authorId && (
            <div
              style={{
                marginLeft: "auto",
              }}
            >
              <IconButton
                colorScheme="blue"
                size="md"
                icon={<AiFillEdit />}
                isRound
                onClick={onModalOpen}
                variant="ghost"
              />
              <IconButton
                colorScheme="red"
                size="md"
                icon={<AiFillDelete />}
                isRound
                onClick={deleteBlog}
                isLoading={deleteLoading}
                variant="ghost"
              />
            </div>
          )}
        </Flex>
      </Box>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isModalOpen}
        onClose={onModalClose}
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent maxW="90%" w={{ base: "full", sm: "lg" }}>
          <ModalCloseButton />
          <ModalBody pb={12}>
            <EditBlog onModalClose={onModalClose} blogId={blog._id} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Grid>
  );
};

export default SingleBlog;
