import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import BlogList from "./BlogList";

export default function Home() {
  return (
    <Flex direction="column" minH="100vh">
      <Navbar />
      <Box flex="1">
        <BlogList />
      </Box>
      <Footer />
    </Flex>
  );
}
