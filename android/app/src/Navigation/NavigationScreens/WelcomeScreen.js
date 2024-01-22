import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';



const WelcomeScreen = () => {
    const navigation = useNavigation();
    const handleAllow=()=>{
        navigation.navigate("HomeScreen")
    }
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://png.pngtree.com/png-vector/20221023/ourmid/pngtree-man-tracking-taxi-driver-cab-on-tablet-map-png-image_6346393.png' }}
        style={styles.image}
      />

      <View style={styles.textContainer}>
        <Text style={styles.heading}>Welcome to SpotsVista</Text>
        <Text style={styles.paragraph}>
          Have a hassle-free booking experience by giving us the following permissions:
        </Text>

        <View style={styles.bulletContainer}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Location (for finding available rides)</Text>
        </View>

        <View style={styles.bulletContainer}>
        <Text style={[styles.bullet, { marginLeft: 20 }]}>•</Text>

          <Text style={styles.bulletText}>Phone (for account security verification)</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAllow}>
        <Text style={styles.buttonText}>Allow Permissions</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  textContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color:"black"
  },
  paragraph: {
    textAlign: 'center',
    marginBottom: 10,
    color:"black",
    opacity:0.8
  },
  bulletContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  bullet: {
    fontSize: 16,
    marginRight: 5,
    color:"blue"
  },
  bulletText: {
    fontSize: 14,
    color:"black",
    opacity:0.8
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
