import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button, Appbar, Paragraph, Dialog, Portal } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';


const BookFutureRide = () => {
   
    const navigation = useNavigation();
    const [rideDate, setRideDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [rideTime, setRideTime] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [showDialog, setShowDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');

    const clearFields = () => {
        setRideDate(new Date());
        setShowDatePicker(false);
        setRideTime(new Date());
        setShowTimePicker(false);
        setSource('');
        setDestination('');
    };

    const bookFutureRide = async () => {
        try {
            await firestore().collection('futureRides').add({
                rideDate: rideDate.toISOString(),
                rideTime: rideTime.toISOString(),
                source,
                destination,
            });
            setDialogMessage('Ride booked successfully!');
            setShowDialog(true);
          setTimeout(()=>{
            navigation.navigate("Activity")
          },2000)
        } catch (error) {
            setDialogMessage('Error booking ride: ' + error.message);
            setShowDialog(true);
        } finally {
            clearFields(); 
        }
    };

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || rideDate;
        setShowDatePicker(false);
        setRideDate(currentDate);
    };

    const onTimeChange = (event, selectedTime) => {
        const currentTime = selectedTime || rideTime;
        setShowTimePicker(false);
        setRideTime(currentTime);
    };

    const isFormComplete = () => {
        return rideDate && rideTime && source && destination;
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Appbar.Header>
                <Appbar.Content title="Book Future Ride" />
            </Appbar.Header>
            <TextInput
                label="Enter your location"
                value={source}
                onChangeText={setSource}
                style={styles.input}
            />
            <TextInput
                label="Destination"
                value={destination}
                onChangeText={setDestination}
                style={styles.input}
            />
            <Button mode="contained" onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
                Select Ride Date
            </Button>
            <Text style={styles.dateTimeText}>Selected Date: {rideDate.toDateString()}</Text>
            {showDatePicker && (
                <DateTimePicker
                    value={rideDate}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                />
            )}
            <Button mode="contained" onPress={() => setShowTimePicker(true)} style={styles.dateButton}>
                Select Ride Time
            </Button>
            <Text style={styles.dateTimeText}>Selected Time: {rideTime.toLocaleTimeString()}</Text>
            {showTimePicker && (
                <DateTimePicker
                    value={rideTime}
                    mode="time"
                    display="default"
                    onChange={onTimeChange}
                />
            )}
            {isFormComplete() && (
                <TouchableOpacity onPress={bookFutureRide} style={styles.bookButton}>
                    <Text style={styles.bookButtonText}>Book Ride</Text>
                </TouchableOpacity>
            )}
            <Portal>
                <Dialog visible={showDialog} onDismiss={() => setShowDialog(false)}>
                    <Dialog.Title>Message</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>{dialogMessage}</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setShowDialog(false)}>OK</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        margin: 10,
    },
    dateButton: {
        margin: 10,
        backgroundColor: 'purple', 
        paddingVertical: 8, 
        paddingHorizontal: 16,
        borderRadius: 8,
        elevation: 3,
    },
    bookButton: {
        margin: 10,
        backgroundColor: '#FF5722', 
        paddingVertical: 10, 
        paddingHorizontal: 20, 
        borderRadius: 8,
        elevation: 3,
    },
    bookButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    dateTimeText: {
        fontSize: 16,
        color: 'black',
        marginTop: 10,
    },
});

export default BookFutureRide;
