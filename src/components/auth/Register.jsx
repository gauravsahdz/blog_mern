import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  FormErrorMessage,
  Tooltip,
} from "@chakra-ui/react";
import { LOGIN, ROOT } from "../../lib/routes";
import { Link as routerLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  usernameValidate,
  passwordValidate,
  emailValidate,
} from "../../utils/form-validation";
import { useRegister } from "../../hooks/auths";

export default function Register() {
  const { register: signup, isLoading } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleRegister(data) {
    signup({
      username: data.username,
      email: data.email,
      password: data.password,
      redirectTo: ROOT,
    });
  }
  const ladelBtn = "Don't be a stranger, sign up!";
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      px={{ base: 4, md: 8 }}
    >
      <Stack
        spacing={8}
        mx={"auto"}
        maxW={"lg"}
        w={{ base: "full", sm: "lg" }}
        py={12}
        px={6}
      >
        <Stack align={"center"}>
          <Heading fontSize={{ base: "2xl", md: "4xl" }} textAlign={"center"}>
            Come on in!
          </Heading>
          <Text fontSize={{ base: "sm", md: "lg" }} color={"gray.600"}>
            Sign up and receive virtual high-fives ✋
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleSubmit(handleRegister)}>
            <Stack spacing={4}>
              <FormControl id="username" isInvalid={errors.username}>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  placeholder="username"
                  {...register("username", usernameValidate)}
                />
                <FormErrorMessage>
                  {errors.username && errors.username.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl id="email" isInvalid={errors.email}>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  placeholder="user@email.com"
                  {...register("email", emailValidate)}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl id="password" isInvalid={errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Password123"
                  {...register("password", passwordValidate)}
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>

              <Stack spacing={10} pt={2}>
                <Tooltip label={ladelBtn}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    type="submit"
                    isLoading={isLoading}
                  >
                    Sign up
                  </Button>
                </Tooltip>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Ready to log in again?{" "}
                  <Link color={"blue.400"} as={routerLink} to={LOGIN}>
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
