import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Loader from "../Assets/Loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../Utilities/APIRoutes";

export default function SetAvatar() {
  // This is an Open Source API which would give us random avatars when random numbers are sent as a parameter
  const API = "http://api.multiavatar.com/10032001";

  // useState while we're setting up avatars
  const [avatars, setAvatars] = useState([]);

  // Loaders while the Avatars are being created.
  const [isLoading, setIsLoading] = useState(true);

  // Checking for the selected Avatars
  const [selectedAvatars, setSelectedAvatars] = useState(undefined);

  // Toast Styling... Same as which we used before
  const toastStyling = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const setProfilePicture = async () => {};

  useEffect(() => {
    (async () => {
      const data = [];

      for (let index = 0; index < 4; index++) {
        // Create a Random Number and makes the API call with the random number and hance get a random image
        const image = await axios.get(
          `${API}/${Math.round(Math.random() * 1000)}`
        );

        const buffer = new Buffer (image.data);
        data.push(buffer.toString("base64"));
      }

      setAvatars(data);
      setIsLoading(false);
    })();

    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  return (
    <>
      <Container>
        <div className="title-container">
          <h1>Pick Up An Avatar</h1>
        </div>
        <div className="avatars"></div>
      </Container>
      <ToastContainer />
    </>
  );
}

const Container = styled.div``;
