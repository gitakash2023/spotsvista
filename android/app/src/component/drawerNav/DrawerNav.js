// DrawerNav.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import RideHistory from './drawerScreens/RideHistory';
import Logout from './drawerScreens/Logout';
import UserChat from '../../Navigation/NavigationScreens/UserChat';
import ChatUserScreen from '../../Navigation/NavigationScreens/ChatUserScreen';


const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator >
      <Drawer.Screen name="RideHistory" component={RideHistory} />
      <Drawer.Screen name="Logout" component={Logout} />
      <Drawer.Screen name="ChatUserScreen" component={ChatUserScreen} />
  
      {/* <Drawer.Screen name="ChatScreen" component={ChatScreen} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNav;
