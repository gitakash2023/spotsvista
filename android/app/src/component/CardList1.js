// CardList1.js
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Card from './Card';

const CardList1 = () => {
  const data = [
    {
      id: 1,
      imageUrl: 'https://t4.ftcdn.net/jpg/04/68/58/83/360_F_468588320_98M7a6EtlzP7xKHkVZFDctrymnF03K1Y.jpg',
      title: 'Go with SpotsVista Auto',
      description: 'Doorstep pick-up, no bargaining',
    },
    {
      id: 2,
      imageUrl: 'https://img.freepik.com/premium-vector/bikers-cartoon-scene-with-bearded-males-riding-motorcycles-by-country-road-vector-illustration_1284-79684.jpg',
      title: 'Hoop on SpotsVista Moto',
      description: 'Move through traffic & save time',
    },
    {
      id: 3,
      imageUrl: 'https://www.shutterstock.com/image-vector/cool-flat-style-vector-illustration-600nw-1994889431.jpg',
      title: 'Hoop on a shuttle',
      description: 'pre-book a seat, ride in comfort',
    },
    {
        id: 4,
        imageUrl: 'https://www.shutterstock.com/image-vector/people-bus-stop-men-women-600nw-2276914587.jpghttps://www.shutterstock.com/image-vector/excited-woman-her-partner-characters-600nw-2288122377.jpg',
        title: 'Try group trips',
        description: 'Take a trip with coworkers and enjoy',
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

export default CardList1;
