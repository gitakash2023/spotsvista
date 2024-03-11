import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const DriverChat = () => {
  const [users, setUsers] = useState([]);
  const currentUser = auth().currentUser;
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('allUsers')
      .where('uid', '!=', currentUser.uid) 
      .where('role', '==', 'user') 
      .onSnapshot(querySnapshot => {
        if (!querySnapshot) {
          return;
        }
        const usersData = [];
        querySnapshot.forEach(doc => {
          usersData.push({
            id: doc.id,
            ...doc.data()
          });
        });
        setUsers(usersData);
      });
  
    return () => unsubscribe();
  }, []);
  

  const handleChat = (user) => {
    navigation.navigate('ChatScreen', { user });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleChat(item)}>
      <View style={styles.itemContainer}>
        <Image source={require('../../../Image/contactnew.png')} style={styles.image} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.email}>{item.email}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={users}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color:"black"
  },
  email: {
    fontSize: 14,
    color: '#888',
  },
});

export default DriverChat;
