import { Link, Button } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import { Link as ReachLink } from "react-router-dom";
import { getGoogleOauthUrl } from "../services/utils.service";

const OAuthGoogle = () => {
  return (
  <Link as={ReachLink} to={getGoogleOauthUrl()}>
    <Button colorScheme="teal" leftIcon={<FaGoogle />} variant={"solid"}>
      Continue with Google
    </Button>
  </Link>
  );
};

export default OAuthGoogle;
