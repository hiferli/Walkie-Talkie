import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Loader from "../Assets/Loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../Utilities/APIRoutes";
import { Buffer } from "buffer";

export default function SetAvatar() {
  // This is an Open Source API which would give us random avatars when random numbers are sent as a parameter
  const API = "http://api.multiavatar.com/10032001";

  // useState while we're setting up avatars
  const [avatars, setAvatars] = useState([]);

  // Loaders while the Avatars are being created.
  const [isLoading, setIsLoading] = useState(true);

  // Checking for the selected Avatars
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  // Toast Styling... Same as which we used before
  const toastStyling = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const setProfilePicture = async () => {
    // console.log(setAvatars);
    if (selectedAvatar === undefined) {
      toast.error("Please Select One Avatar", toastStyling);
    } else {
      const user = await JSON.parse(localStorage.getItem("User"));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("User", JSON.stringify(user));
        navigator("/");
      } else {
		toast.error("Error Setting Up Your Avatar... Please Try Again" , toastStyling);
	  }
    }
  };

  useEffect(() => {
    (async () => {
      const data = [];

      for (let index = 0; index < 4; index++) {
        // Create a Random Number and makes the API call with the random number and hance get a random image
        const image = await axios.get(
          `${API}/${Math.round(Math.random() * 1000)}`
        );

        const buffer = new Buffer(image.data);
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
      {isLoading ? (
        <Container>
          <img src={Loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick Up An Avatar</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <div className="submit-btn" onClick={setProfilePicture}>
            Set As Profile Picture
          </div>
        </Container>
      )}
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
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
`;
