import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import styled from "styled-components";
import {BiPowerOff} from 'react-icons/bi'

export default function Logout() {
    const navigator = useNavigate();

    const handleClick = async () => {
        localStorage.clear();
        navigator("/login")
    }

  return (
    <Button>
        <BiPowerOff />
    </Button>
  )
}

const Button = styled.button``;