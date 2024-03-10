// DrawerNav.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import RideHistory from './drawerScreens/RideHistory';
import Logout from './drawerScreens/Logout';
import UserProfile from '../../bottomTabScreens/accountTab/UserProfile';


const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator >
          <Drawer.Screen name="UserProfile" component={UserProfile} />

      <Drawer.Screen name="RideHistory" component={RideHistory} />
     
  
      <Drawer.Screen name="Logout" component={Logout} />

    </Drawer.Navigator>
  );
};

export default DrawerNav;
