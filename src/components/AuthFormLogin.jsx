import {
  Button,
  Stack,
  Input,
  Container,
  FormLabel,
  FormControl,
  FormHelperText,
  FormErrorMessage,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PasswordInput from "./PasswordInput";
import withNavigateHook from "./HOC/withNavigate";
import { useDispatch, useSelector } from "react-redux";
import { logInUser, fetchUserData } from "../redux/actions/auth";
import { getAuthState } from "../redux/reducers/auth/selector";
import { useLocation } from "react-router-dom";
import { SESSION_KEY } from "../constants";
const AuthFormLogin = (props) => {
  const dispatch = useDispatch();
  const authState = useSelector(getAuthState);
  const { state } = useLocation();
  const { navigation } = props;
  useEffect(() => {
    // const access_token = sessionStorage.getItem(SESSION_KEY);
    if (authState.is_logged_in) {
      navigation(state?.path || "/");
    }
    // } else {
    //   dispatch(fetchUserData());
    // }
  }, [authState.is_logged_in, state?.path, navigation, dispatch]);

  const [authFormState, setAuthFormState] = useState({
    email: "",
    password: "",
    formError: false,
    formErrorMessage: "",
  });
  function handleEmailChange(e) {
    setAuthFormState((prev) => {
      return {
        ...prev,
        email: e.target.value,
      };
    });
  }
  function handlePasswordChange(e) {
    setAuthFormState((prev) => {
      return {
        ...prev,
        password: e.target.value,
      };
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    setAuthFormState((prev) => {
      return {
        ...prev,
        formError: false,
        formErrorMessage: "",
      };
    });
    if (
      authFormState.email.trim() === "" ||
      authFormState.password.trim() === ""
    ) {
      setAuthFormState((prevState) =>
        Object.assign({}, prevState, {
          formError: true,
          formErrorMessage: "All fields are required",
        })
      );
      return;
    }
    if (!validateEmail()) return;
    if (!validatePassword()) return;

    dispatch(
      logInUser({
        email: authFormState.email.trim(),
        password: authFormState.password.trim(),
      })
    );
  }

  const validateEmail = () => {
    const emailRegex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (!emailRegex.test(authFormState.email)) {
      setAuthFormState((prevState) =>
        Object.assign({}, prevState, {
          formError: true,
          formErrorMessage: "Email is invalid",
        })
      );
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    if (
      authFormState.password.length < 8 ||
      !authFormState.password.match(/\d/) ||
      !authFormState.password.match(/[a-zA-Z]/)
    ) {
      setAuthFormState((prevState) =>
        Object.assign({}, prevState, {
          formError: true,
          formErrorMessage:
            "Password must contain at least one letter, one number and must be atleast 8 characters long",
        })
      );
      return false;
    }
    return true;
  };

  return (
    <Container>
      <Stack spacing={4}>
        <FormControl isInvalid={authFormState.formError}>
          <FormErrorMessage>{authFormState.formErrorMessage}</FormErrorMessage>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={authFormState.email}
            onChange={handleEmailChange}
          />
          <FormLabel>Password</FormLabel>
          <PasswordInput
            value={authFormState.password}
            handlePasswordChange={handlePasswordChange}
          />
          <FormHelperText>
            We will never share your email and password
          </FormHelperText>
        </FormControl>
      </Stack>
      <Flex justify="space-between">
        <Button
          mt="6px"
          variant="solid"
          colorScheme="blue"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button
          mt="6px"
          variant="outline"
          colorScheme="green"
          onClick={() => {
            navigation("/auth/register");
          }}
        >
          Don't have account
        </Button>
      </Flex>
    </Container>
  );
};

export default withNavigateHook(AuthFormLogin);
