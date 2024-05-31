import { Box, Image, Heading, Text, Input, Button } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  postNewUserLoginDetails,
  getUserLoginDetails,
  updateUserAuthStatus,
} from "../Redux/authentication/action";
import styles from "../styles/Login.module.css";

export const initialState = {
  firstName: "",
  lastName: "",
  mobile: "",
  email: "",
  password: "",
  confirmPassword: "",
  otp: "",
  isLoading: false,
  isError: false,
  isAuth: false,
};

const existingUser = {
  existingEmail: "",
  existingPassword: "",
};

export function LoginSignup() {
  const [userData, setUserData] = useState(initialState);
  const [existingUserData, setExistingUserData] = useState(existingUser);
  const [checkMsg, setCheckMsg] = useState("Incorrect OTP");
  const [color, setColor] = useState("red");
  const [otp] = useState("1234");
  const [visible, setVisible] = useState(false);
  const [showMatchStatus, setShowMatchStatus] = useState(false); // Add this line
  const [matchStatus, setMatchStatus] = useState(""); // Add this line
  const btnRef = useRef();
  const otpRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reduxStore = useSelector((store) => store.users);
  const [showForm1, setShowForm1] = useState(true);
  const [showForm2, setShowForm2] = useState(false);
  const [showForm3, setShowForm3] = useState(false);

  const getInput = (e) => {
    let name = e.target.name;

    if (name === "existingEmail" || name === "existingPassword") {
      setExistingUserData((prev) => ({ ...prev, [name]: e.target.value }));
    } else {
      setUserData((prev) => ({ ...prev, [name]: e.target.value }));

      if (name === "mobile" && btnRef.current) {
        btnRef.current.disabled = e.target.value.length !== 10;
      }

      if (name === "confirmPassword" && otpRef.current) {
        setShowMatchStatus(true);
        if (e.target.value === userData.password) {
          otpRef.current.disabled = false;
          setMatchStatus("passwords match");
          setColor("green");
        } else {
          otpRef.current.disabled = true;
          setMatchStatus("passwords don't match");
          setColor("red");
        }
      }

      if (name === "otp") {
        setShowMatchStatus(false);
        setVisible(true);
        if (e.target.value === otp) {
          setCheckMsg("OTP Matched");
          setColor("green");
          setUserData((prev) => ({ ...prev, isAuth: true }));
        } else {
          setCheckMsg("Incorrect OTP");
          setColor("red");
        }
        if (e.target.value.length === 0) {
          setVisible(false);
        }
      }
    }
  };

  const toggleForms = async (e) => {
    if (e.target.innerText === "Proceed") {
      await dispatch(getUserLoginDetails(userData.mobile));
      let userExist = JSON.parse(localStorage.getItem("currentUser"));

      if (userExist) {
        updateUserAuthStatus(userExist.id, { isAuth: true });
        userExist.isAuth = true;
        localStorage.setItem("currentUser", JSON.stringify(userExist));
        setShowForm3(true);
        setShowForm1(false);
        setShowForm2(false);
        navigate("/"); // Redirect to home page
      } else {
        alert("Default OTP: 1234");

        setShowForm3(false);
        setVisible(false);
        setShowForm1((prev) => !prev);
        setShowForm2((prev) => !prev);
      }
    } else if (e.target.innerText === "Cancel") {
      setUserData(initialState);
    }
  };

  const addUser = async () => {
    let res = await dispatch(postNewUserLoginDetails(userData));
    navigate("/");
  };

  const checkCredentials = () => {
    let userExist = JSON.parse(localStorage.getItem("currentUser"));
    if (
      existingUserData.existingEmail === userExist.email &&
      existingUserData.existingPassword === userExist.password
    ) {
      navigate("/");
    } else {
      alert("email or password is wrong");
    }
  };

  return (
    <Box
      id={styles.mainContainer}
      display="flex"
      borderRadius="10px"
      boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;"
      width="80%"
      height="auto"
      margin="auto"
      marginTop="70px"
    >
      <Box w="40%" id={styles.subContainer}>
        <Image
          w="100%"
          id={styles.img}
          src="https://www.jiomart.com/msassets/images/login-banner.jpg"
          alt="loginImage"
          borderRadius="10px 0px 0px 10px"
        />
      </Box>

      <Box id={styles.subContainer2} w="60%">
        {showForm1 && (
          <>
            <Box align="left" margin="auto" w="50%" mt="20px">
              <Heading id={styles.heading}>Sign In</Heading>
              <Text id={styles.subHeading}>
                Sign in to access your Orders, Offers and Wishlist.
              </Text>
            </Box>
            <FormControl width="50%" margin="auto">
              <FormLabel id={styles.form1} mt="100px">
                Mobile Number
              </FormLabel>
              <Input
                border="2px solid gray"
                type="number"
                name="mobile"
                value={userData.mobile}
                onChange={getInput}
              />
              {userData.mobile.length > 0 && userData.mobile.length <= 9 && (
                <Text color="red">10 digits required</Text>
              )}
              {userData.mobile.length > 10 && (
                <Text color="red">10 digits required</Text>
              )}
              {userData.mobile.length === 10 && (
                <Text color="green">Great, now you can proceed</Text>
              )}
              <Button
                mt="20px"
                isDisabled={
                  userData.mobile.length < 10 || userData.mobile.length > 10
                }
                onClick={toggleForms}
                bg="orange"
              >
                Proceed
              </Button>
            </FormControl>
          </>
        )}

        {showForm2 && (
          <>
            <Heading>Sign Up</Heading>
            <FormControl id={styles.form2Input} width="50%" margin="auto" mt="30px">
              <FormLabel>Start by entering your First Name</FormLabel>
              <Input
                name="firstName"
                placeholder="First Name"
                border="2px solid gray"
                type="text"
                onChange={getInput}
              />
              <Input
                name="lastName"
                placeholder="Last Name"
                border="2px solid gray"
                type="text"
                value={userData.lastName}
                onChange={getInput}
              />
              <Input
                name="email"
                placeholder="Enter Email"
                border="2px solid gray"
                type="text"
                value={userData.email}
                onChange={getInput}
              />
              <Input
                name="password"
                placeholder="Password"
                border="2px solid gray"
                type="password"
                value={userData.password}
                onChange={getInput}
              />
              <Input
                name="confirmPassword"
                placeholder="Confirm Password"
                border="2px solid gray"
                type="password"
                value={userData.confirmPassword}
                onChange={getInput}
              />
              {showMatchStatus && (
                <Text align="left" fontSize="15px" color={color}>
                  {matchStatus}
                </Text>
              )}
              <FormLabel fontWeight="bold" mt="30px">
                Provide OTP sent on your mobile number +91 {userData.mobile}
              </FormLabel>
              <Input
                name="otp"
                placeholder="Enter 1234 as default OTP"
                border="2px solid gray"
                type="password"
                value={userData.otp}
                onChange={getInput}
                ref={otpRef}
                disabled
              />
              {visible && (
                <Text fontSize="15px" color={color} align="left">
                  {checkMsg}
                </Text>
              )}
              <Button onClick={(e) => toggleForms(e)} mt="20px" bg="red.500">
                Cancel
              </Button>
              <Button
                mt="20px"
                isDisabled={userData.otp !== otp}
                bg="orange"
                onClick={addUser}
              >
                Verify
              </Button>
            </FormControl>
          </>
        )}

        {showForm3 && (
          <FormControl width="50%" margin="auto">
            <FormLabel id={styles.form3} mt="100px">
              Enter your Details to login
            </FormLabel>
            <Input
              mt="30px"
              border="2px solid gray"
              type="email"
              placeholder="Enter Email"
              name="existingEmail"
              value={existingUserData.existingEmail}
              onChange={getInput}
            />

            <Input
              mt="30px"
              border="2px solid gray"
              type="password"
              placeholder="Enter Password"
              name="existingPassword"
              value={existingUserData.existingPassword}
              onChange={getInput}
            />

            <Button
              mt="30px"
              isDisabled={
                existingUserData.existingPassword.length === 0 ||
                existingUserData.existingEmail.length === 0
              }
              onClick={checkCredentials}
              bg="orange"
            >
              login
            </Button>
          </FormControl>
        )}
      </Box>
    </Box>
  );
}
