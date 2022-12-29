import React , { useState , useEffect } from "react";
import styled from "styled-components";
import { json, Link, useNavigate } from "react-router-dom";
import Logo from "../Assets/Logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'
import { loginRoute } from "../Utilities/APIRoutes";

export default function Login() {
  const navigation = useNavigate();

  const toastStyling = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",  
  }

  const [values, setValues] = useState({
    username: "",
    password: "",
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    // alert("Form");
    if(handleValidation()){
      const { username , password } = values;
      const { data } = await axios.post(loginRoute , {
        username ,
        password
      });
      
      if(data.status === false){
        toast.error(data.errorMessage , toastStyling)
      }

    if(data.status === true){
      // Adding User Details to Local Storage
      localStorage.setItem('User', JSON.stringify(data.user));
      navigation("/")
    }
  }
    
  };

  const handleValidation = () => {
    const { username , password } = values;
    // Empty Values Validation
    // console.log(`${username}`)
    // console.log(`${email}`)

    if(username === ""){
      toast.error("Please Enter A Valid Username",  toastStyling)
      return false;
    } else if(password === ""){
      toast.error("Please Enter A Valid Password",  toastStyling)
      return false;
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
            name="username"
            id="username"
            placeholder="Username"
            min={5}
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
          
          <button type="submit">Login</button>
          <span>
            New to Walkie Talkie?
            <Link to="/register">Register Now!</Link>
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