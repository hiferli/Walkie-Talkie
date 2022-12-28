import React , { useState , useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../Assets/Logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

export default function Register() {
  const toastStyling = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",  
  }

  const [values, setValues] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    // alert("Form");
    if(handleValidation()){
      // Calling APIs
    }
  };

  const handleValidation = () => {
    const {userName , email , password , confirmPassword} = values;
    // Empty Values Validation
    if(userName === ""){
      toast.error("Please Enter A Valid Username",  toastStyling)
      return false;
    } else if(email === ""){
      toast.error("Please Enter A Valid Email",  toastStyling)
      return false;
    } else if(password === ""){
      toast.error("Please Enter A Valid Password",  toastStyling)
      return false;
    } else if(confirmPassword === ""){
      toast.error("Please Enter Your Password Once Again",  toastStyling)
      return false;
    } 
    
    // Errors in Username and Password
    if(password !== confirmPassword){
      toast.error("Passwords must match",  toastStyling)
      return false;
    } else if(userName.length < 5){
      toast.error("Username Should Be Atleast 6 Characters",  toastStyling)
      return false;
    } else if(password.length < 8){
      toast.error("Password Should Have Atleast 8 Characters",  toastStyling)      
      return false;
    }
    
    // Strong Password Validation
    if(password === confirmPassword){
      let capitalLetters = password.length - password.replace(/[A-Z]/g, '').length;;
      let smallLetters = password.length - password.replace(/[a-z]/g, '').length;;
      let numbers = password.length - password.replace(/[0-9]/g, '').length;;
      let specialCharacters = password.length - capitalLetters - smallLetters - numbers;
      
      if(specialCharacters < 1 || capitalLetters < 1 || smallLetters < 1 || numbers < 1){
        toast.error("Password Must Contain Atleast 1 SmallCase Character, 1 UpperCase Character, 1 Numeric Character as well as 1 Special Character",  toastStyling)      
        return false;
      }
    }

    return true;
  }

  const handleChange = (event) => {
    setValues({ ...values , [event.target.name]: event.target.value});
  };

  return (
    <>
      <FormContainer>
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <div className="brand">
            <img src={Logo} alt="Walkie Talkie" />
            <h1>Walkie Talkie</h1>
          </div>

          <input
            type="text"
            name="userName"
            id="userName"
            placeholder="UserName"
            onChange={(event) => {
              handleChange(event);
            }}
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={(event) => {
              handleChange(event);
            }}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={(event) => {
              handleChange(event);
            }}
          />
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            onChange={(event) => {
              handleChange(event);
            }}
          />

          <button type="submit">Create User</button>
          <span>
            User Already Exists! 
            <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 5rem;
    }

    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }

  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;

    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }

  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;

    &:hover {
      background-color: #4e0eff;
    }
  }

  span {
    color: white;
    text-transform: uppercase;

    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;