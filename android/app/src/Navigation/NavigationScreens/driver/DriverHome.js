import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ChatDriverScreen from './ChatDriverScreen'
import DriverLogout from './DriverLogout'
import DriverChat from './DriverChat'

const DriverHome = () => {
  return (
    <View style={styles.container}>
      <DriverLogout />
      <DriverChat />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
  },
});

export default DriverHome;
