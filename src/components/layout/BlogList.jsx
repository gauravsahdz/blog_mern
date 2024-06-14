import {
  Box,
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { useBlogs } from "../../hooks/blogs";
import SingleBlog from "../blogs/SingleBlog";

export default function BlogList() {
  const { blogs, isLoading } = useBlogs();
  if (isLoading)
    return (
      <Box pos="absolute" top="50%" left="50%">
        <Spinner size="xl" />
      </Box>
    );

  return (
    <Container maxW={"7xl"} p="12">
      <Heading as="h2" marginTop="5">
        Latest articles
      </Heading>
      <Divider marginTop="5" />
      <Grid
        templateColumns="repeat(auto-fill, minmax(300px, 2fr))"
        gap={6}
        marginTop="5"
      >
        {blogs?.map((blog) => (
          <GridItem key={blog._id}>
            <motion.div layout>
              <SingleBlog blog={blog} />
            </motion.div>
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
}
