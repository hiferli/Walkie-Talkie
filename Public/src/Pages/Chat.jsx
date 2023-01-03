import React , { useState , useEffect } from "react";
import styled from "styled-components";
import axios from 'axios'
import { json, useNavigate } from "react-router-dom";
import { allUsersRoute } from "../Utilities/APIRoutes";
import Contacts  from '../Components/Contacts'
import Welcome from "../Components/Welcome";
import ChatContainer from "../Components/ChatContainer";

export default function Chat() {
	const [contacts, setContacts] = useState([]);
	const [currentUser, setCurrentUser] = useState(undefined);

	const [currentChat, setCurrentChat] = useState(undefined)
	const [isLoaded, setIsLoaded] = useState(false)

	const navigation = useNavigate();
	// Getting the Currently Logged In User Information
	useEffect(() => {
		(async () => {
			if(!localStorage.getItem("User")){
				// If user is not logged in, then they're redirected to login page
				navigation("/login");
			} else {
				// If the user is logged in, then the user is set to the user data in the localstorage
				setCurrentUser(await JSON.parse(localStorage.getItem("User")));
				setIsLoaded(true)
			}
		})();
	  }, [])

	useEffect(() => {
		(async () => {
			if(currentUser){
				// If the user has an Avatar
				if(currentUser.isAvatarImageSet){
					// Gets the data for the user.
					const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
					setContacts(data.data)
				} else {
					// If not, then  they're landed to the setAvatar Page
					navigation('/setAvatar')
				}
			}
		})();
	  }, [currentUser])

	  const handleChatChange = (chat) => {
		setCurrentChat(chat)
	  }

	return (
		<Container>
			<div className="container">
				<Contacts contacts = {contacts} currentUser = {currentUser}  changeChat = {handleChatChange} />
				{isLoaded && currentChat === undefined ? (
				<Welcome currentUser = {currentUser}/>
				) : (
				<ChatContainer currentChat = {currentChat} currentUser = {currentUser} />
				)}
			</div>
		</Container>
	);
}

const Container = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 1rem;
	align-items: center;
	background-color: #131324;
	
	.container {
		height: 85vh;
		width: 85vw;
		background-color: #00000076;
		display: grid;
		grid-template-columns: 25% 75%;
		
		@media screen and (min-width: 720px) and (max-width: 1080px) {
			grid-template-columns: 35% 65%;
		}
	}
`;
