// DrawerNav.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import RideHistory from './drawerScreens/RideHistory';
import Logout from './drawerScreens/Logout';
import UserChat from '../../Navigation/NavigationScreens/UserChat';
import DriverChat from '../../Navigation/NavigationScreens/driver/DriverChat';


const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator >
      <Drawer.Screen name="RideHistory" component={RideHistory} />
      <Drawer.Screen name="Logout" component={Logout} />
      <Drawer.Screen name="UserChat" component={UserChat} />
      <Drawer.Screen name="DriverChat" component={DriverChat} />
      {/* <Drawer.Screen name="ChatScreen" component={ChatScreen} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNav;
