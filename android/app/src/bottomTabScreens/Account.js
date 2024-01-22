import { View, Text } from 'react-native'
import React from 'react'
import Logout from './accountTab/Logout'
import UserProfile from './accountTab/UserProfile'


const Account = () => {
  return (
    <>
    <UserProfile/>
   <Logout/>
   </>
  )
}

export default Account