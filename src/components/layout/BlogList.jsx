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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );

  return (
    <Container maxW="7xl" p={{ base: 4, md: 8 }} py={{ base: 6, md: 12 }}>
      <Heading
        as="h2"
        marginTop={{ base: 3, md: 5 }}
        fontSize={{ base: "2xl", md: "4xl" }}
      >
        Latest articles
      </Heading>
      <Divider marginTop={{ base: 3, md: 5 }} />
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        }}
        gap={6}
        marginTop={{ base: 5, md: 6 }}
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
