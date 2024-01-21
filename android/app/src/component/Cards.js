import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Title } from 'react-native-paper';

const data = [
  { id: 1, title: 'Daily', imageUrl: 'https://5.imimg.com/data5/MB/UG/GLADMIN-71610569/1-250x250.png' },
  { id: 2, title: 'Parcel', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX_iB7NnGcjbxh7ErWvoMN8oH_HNNqSM1U37rHogMNEJPlj2-OTZOpFWsOCJmTxXwvX20&usqp=CAU' },
  { id: 3, title: 'Electric', imageUrl: 'https://ubuntumanual.org/wp-content/uploads/2019/03/ELECTRIC-TAXI-BUSINESS-PLAN.jpg' },
];

const Cards = () => {
  return (
    <View style={styles.container}>
      {data.map(item => (
        <Card key={item.id} style={styles.card}>
          <Card.Cover source={{ uri: item.imageUrl }} style={styles.cardImage} />
          <Card.Content style={styles.cardContent}>
            <Title>{item.title}</Title>
          </Card.Content>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: "space-between",
    height:110
 
  },
  card: {
    width: 100,
    
  },
  cardImage: {
    height: 80,
    padding:15
  },
  cardContent: {
    alignItems: 'center',
    
   

  },
});

export default Cards;
