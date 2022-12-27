import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";

export default function Register() {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Form");
  }

  const handleChange = (event) => {

  }

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => {
          handleSubmit(event);
        }}></form>

        <div className="brand">
          <img src="" alt="" />
          <h1>Walkie Talkie</h1>
        </div>

        <input type="text" name="userName" id="userName" placeholder='UserName' onChange={(event) => {handleChange(event)}} />
        <input type="email" name="email" id="email" placeholder='Email' onChange={(event) => {handleChange(event)}} />
        <input type="password" name="password" id="password" placeholder='Password' onChange={(event) => {handleChange(event)}} />
        <input type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm Password' onChange={(event) => {handleChange(event)}} />

        <button type='submit'>Create User</button>
        <span>
          User Already Exists!
          <Link to='/login'>Login</Link>
        </span>
      </FormContainer>
    </>
)
}

const FormContainer = styled.div``;