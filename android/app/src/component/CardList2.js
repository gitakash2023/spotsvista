// CardList1.js
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Card from './Card';

const CardList2 = () => {
  const data = [
    {
      id: 1,
      imageUrl: 'https://t3.ftcdn.net/jpg/02/73/57/92/360_F_273579269_R1iWp4iMt7UDIekUuwqVSx1r7BYv8H7Q.jpg',
      title: 'Auto rides',
      description: 'upfront prices, doorstep pick-ups',
    },
    {
      id: 2,
      imageUrl: 'https://www.shutterstock.com/image-vector/couple-riding-motorbike-traveling-happily-260nw-1500080852.jpg',
      title: 'SpotsVista Moto trips',
      description: 'Affordable motorcycle pick-ups',
    },
    {
      id: 3,
      imageUrl: 'https://us.123rf.com/450wm/blueringmedia/blueringmedia2203/blueringmedia220300968/183850018-scene-with-many-people-using-public-transportation-illustration.jpg?ver=6',
      title: 'shuttle rides ',
      description: 'Low fares, premium A/C buses',
    },
    {
        id: 4,
        imageUrl: 'https://www.shutterstock.com/image-vector/people-inside-car-driver-passenger-600nw-1792716865.jpg',
        title: 'Try group trip',
        description: 'Seamless trips, together',
      },
  ];

  return (
    <ScrollView horizontal style={styles.scrollView}>
   
      {data.map((item) => (
        <Card key={item.id} data={item} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexDirection: 'row', // Set flexDirection to row for horizontal scroll
  },
});

export default CardList2;
