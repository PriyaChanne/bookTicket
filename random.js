import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Seat = ({ seat, isSelected, isLocked, onPress }) => (
  <TouchableOpacity
    style={[styles.seat, isSelected ? styles.selectedSeat : styles.unselectedSeat, isLocked ? styles.lockedSeat : null]}
    onPress={() => onPress(seat)}
  >
    <View style={isSelected ? styles.seatSelectedIcon : null} />
  </TouchableOpacity>
);

const SeatRow = ({ seats, selectedSeats, lockedSeats, onSeatPress }) => (
  <View style={styles.seatRow}>
    {seats.map((seat, index) => {
      const isSelected = selectedSeats.some((selectedSeat) => selectedSeat.seatNumber === seat.seatNumber);
      const isLocked = lockedSeats.some((lockedSeat) => lockedSeat.seatNumber === seat.seatNumber);

      return (
        <Seat key={index} seat={seat} isSelected={isSelected} isLocked={isLocked} onPress={() => onSeatPress(seat)} />
      );
    })}
  </View>
);

const SelectSeats = ({ route }) => {
  const { movieName, startTime, endTime, mySelectedSeats } = route.params;
  console.log("Check mySelectedSeats", mySelectedSeats);
  const topSeatsArrangement = [3, 4, 5, 6]; // 4 rows on top with 3, 4, 5, and 6 seats respectively
  const bottomRows = 11; // 11 rows on the bottom

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [lockedSeats, setLockedSeats] = useState([]);

  const generateTopSeatsData = (side) => {
    return Array.from({ length: topSeatsArrangement.reduce((a, b) => a + b, 0) }, (_, index) => ({
      seatNumber: `Top-${side === 'left' ? 'L' : 'R'}-${index + 1}`,
      price: 250, // Set the price to 250 for all top seats
    }));
  };

  const topLeftSeatsData = generateTopSeatsData('left');
  const topRightSeatsData = generateTopSeatsData('right');

  const handleSeatPress = (seat) => {
    const isSeatLocked = lockedSeats.some((lockedSeat) => lockedSeat.seatNumber === seat.seatNumber);

    if (isSeatLocked) {
      // If seat is locked, show an alert that it's already booked
      Alert.alert('Seat Booking', 'This seat has already been booked by another user.');
    } else {
      const isSeatSelected = selectedSeats.some((selectedSeat) => selectedSeat.seatNumber === seat.seatNumber);

      if (isSeatSelected) {
        // If seat is already selected, remove it from the selectedSeats array
        setSelectedSeats((prevSelectedSeats) =>
          prevSelectedSeats.filter((selectedSeat) => selectedSeat.seatNumber !== seat.seatNumber)
        );
      } else {
        // Check if the number of selected seats is less than the allowed number
        if (selectedSeats.length < mySelectedSeats) {
          // If seat is not selected and allowed limit is not reached, add it to the selectedSeats array
          setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, seat]);
        } else {
          // If the allowed limit is reached, show an alert
          Alert.alert('Seat Selection', `You can only select ${mySelectedSeats} seats.`);
        }
      }
    }
  };

  const renderTopSeats = (side) => {
    const seatsData = side === 'left' ? topLeftSeatsData : topRightSeatsData;

    let startIndex = 0;

    // Map over topSeatsArrangement to create rows on top
    return topSeatsArrangement.map((numSeats, rowIndex) => {
      const endIndex = startIndex + numSeats;
      const seats = seatsData.slice(startIndex, endIndex);

      startIndex = endIndex;

      // Render a row of seats on top
      return (
        <SeatRow key={rowIndex} seats={seats} selectedSeats={selectedSeats} lockedSeats={lockedSeats} onSeatPress={handleSeatPress} />
      );
    });
  };

  const renderBottomSeats = () => {
    // Generate seats data for the bottom rows
    const bottomSeatsData = Array.from({ length: bottomRows * 12 }, (_, index) => ({
      seatNumber: `Bottom-${index + 1}`,
      price: 250, // Set the price to 250 for all bottom seats
    }));

    let startIndex = 0;

    // Map over bottomRows to create rows on the bottom
    return Array.from({ length: bottomRows }).map((_, rowIndex) => {
      const endIndex = startIndex + 12;
      const seats = bottomSeatsData.slice(startIndex, endIndex);

      startIndex = endIndex;

      // Render a row of seats on the bottom
      return (
        <SeatRow key={rowIndex} seats={seats} selectedSeats={selectedSeats} lockedSeats={lockedSeats} onSeatPress={handleSeatPress} />
      );
    });
  };

  const totalPrice = selectedSeats.reduce((total, seat) => total + seat.price, 0);

  // Get the navigation object using the useNavigation hook
  const navigation = useNavigation();

  const lockSelectedSeats = async () => {
    try {
      const currentTime = new Date().getTime();
      const lockExpirationTime = currentTime + 6 * 60 * 60 * 1000;

      // Filter the locked seats to exclude seats that are in the selectedSeats array
      const seatsToLock = selectedSeats.filter((seat) => !lockedSeats.some((lockedSeat) => lockedSeat.seatNumber === seat.seatNumber));

      // Merge the seatsToLock with the existing lockedSeats and add the lockExpirationTime
      const updatedLockedSeatsData = [
        ...lockedSeats.filter((lockedSeat) => currentTime < lockedSeat.lockExpirationTime),
        ...seatsToLock.map((seat) => ({ ...seat, lockExpirationTime })),
      ];

      await AsyncStorage.setItem('lockedSeats', JSON.stringify(updatedLockedSeatsData));
      setLockedSeats(updatedLockedSeatsData);
    } catch (error) {
      console.error('Error while saving locked seats to AsyncStorage:', error);
    }
  };

  const loadLockedSeatsFromStorage = async () => {
    try {
      const lockedSeatsData = await AsyncStorage.getItem('lockedSeats');
      if (lockedSeatsData) {
        setLockedSeats(JSON.parse(lockedSeatsData));
      }
    } catch (error) {
      console.error('Error while loading locked seats from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    loadLockedSeatsFromStorage();
  }, []);

  useEffect(() => {
    const saveSelectedSeatsToStorage = async () => {
      try {
        await AsyncStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
      } catch (error) {
        console.error('Error while saving selected seats to AsyncStorage:', error);
      }
    };

    saveSelectedSeatsToStorage();
  }, [selectedSeats]);

  const navigateToNextScreen = () => {
    lockSelectedSeats();

    const currentTime = new Date().toLocaleTimeString();
    const selectedSeatNames = selectedSeats.map((seat) => seat.seatNumber);

    navigation.navigate('Ticket', {
      currentTime,
      selectedSeatNames,
      totalPrice,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {selectedSeats.length > 0 && (
        <View style={styles.selectedSeatInfoContainer}>
          <Text style={styles.selectedSeatInfoText}>
            Selected Seats: {selectedSeats.map((seat) => seat.seatNumber).join(', ')}
          </Text>
          <Text style={styles.selectedSeatInfoText}>Total Price: ₹{totalPrice}</Text>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.seatSectionContainer}>
          <View style={styles.seatingArrangement}>
            {/* Render columns as rows and rows as columns on top */}
            <View style={styles.seatingRow}>{renderTopSeats('left')}</View>
            <View style={styles.marginView} />
            <View style={styles.seatingRow1}>{renderTopSeats('right')}</View>
          </View>
        </View>
        <View style={styles.bottomSeats}>
          {/* Render bottom seats */}
          {renderBottomSeats()}
        </View>
      </ScrollView>

      {/* Next button at the bottom right corner */}
      <TouchableOpacity style={styles.nextButton} onPress={navigateToNextScreen}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // ... other styles ...
  lockedSeat: {
    backgroundColor: 'red',
  },
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: 'lightgray',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  seatSectionContainer: {
    marginBottom: 20,
  },
  seatingArrangement: {
    marginTop: '10%',
    flexDirection: 'row', // Changed to 'row' to create rows
  },
  seatingRow: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end', // Changed to 'column' to create columns
  },
  seatingRow1: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start', // Changed to 'column' to create columns
  },
  seatRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5, // Added margin between rows
  },
  seat: {
    width: 25,
    height: 25,
    borderRadius: 5,
    margin: 2, // Added margin between seats
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  unselectedSeat: {
    borderColor: 'grey',
    backgroundColor: 'white', // Set default color for unselected seats
  },
  selectedSeat: {
    backgroundColor: 'grey',
    borderColor: 'white',
  },
  lockedSeat: {
    backgroundColor: 'red', // Custom style for locked seats
  },
  seatSelectedIcon: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  selectedSeatInfoContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    width: '60%',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  selectedSeatInfoText: {
    fontSize: 16,
    color: 'black',
    marginVertical: 3,
  },
  marginView: {
    marginHorizontal: 10, // Added margin between left and right sides
  },
  bottomSeats: {
    marginTop: 8, // Added margin for bottom seats
  },
  nextButton: {
    width: '20%',
    backgroundColor: 'green',
    alignSelf: 'flex-end',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SelectSeats;
