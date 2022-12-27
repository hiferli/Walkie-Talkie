import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../Assets/Logo.svg";

export default function Register() {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Form");
  };

  const handleChange = (event) => {};

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