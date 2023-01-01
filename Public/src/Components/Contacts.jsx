import React , { useState , useEffect } from 'react'
import styled from 'styled-components'
import Logo from '../Assets/Logo.svg'

export default function Contacts({contacts , currentUser}) {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined)

    // For the selected Chat Option
    const [currentSelected, setCurrentSelected] = useState(undefined)

    useEffect(() => {
      if(currentUser){
        setCurrentUserImage(currentUser.avatarImage);
        setCurrentUserName(currentUser.username);
    }
    }, [currentUser])
    
  return (
    <div>
      Contacts
    </div>
  )
}
