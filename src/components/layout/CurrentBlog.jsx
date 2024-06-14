import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Container,
  Divider,
  Grid,
  GridItem,
  IconButton,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link as routerLink, useParams } from "react-router-dom";
import { AiOutlineRollback } from "react-icons/ai";
import { ROOT } from "../../lib/routes";
import Navbar from "./Navbar";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
export default function CurrentBlog() {
  const { blogId } = useParams();
  const [currentBlog, setCurrentBlog] = useState([]);
  useEffect(() => {
    const fetchBlog = async () => {
      const res = await axios.get(`${API_URL}/blogs/${blogId}`);
      setCurrentBlog(res.data.data);
    };
    fetchBlog();
  }, []);

  return (
    <>
      <Navbar />
      <motion.div layout>
        <Container maxW={"7xl"} p="12">
          <motion.button
            whileHover={{
              scale: 1.2,
              transition: { duration: 1 },
            }}
            whileTap={{ scale: 0.9 }}
          >
            <IconButton
              colorScheme="#319594"
              as={routerLink}
              to={ROOT}
              size="lg"
              icon={<AiOutlineRollback />}
              isRound
              variant="ghost"
            />
          </motion.button>
          <Heading as="h2">{currentBlog.title}</Heading>

          <Divider marginTop="5" />
          <Grid
            templateColumns="repeat(auto-fill, minmax(100%, 1fr))"
            gap={6}
            marginTop="5"
          >
            <GridItem>
              <Box w="100%">
                <Text as="p" fontSize="md" marginTop="2">
                  {currentBlog.body}
                </Text>
              </Box>
            </GridItem>
          </Grid>
        </Container>
      </motion.div>
    </>
  );
}
