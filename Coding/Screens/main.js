import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image,FlatList } from 'react-native';

const Main = ({ navigation }) => {
    const [showWorking, setShowWorking] = useState(true);




    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => setShowWorking(true)}
                    style={[
                        styles.button,
                        showWorking ? styles.activeButton : null,
                    ]}
                >
                    <Text style={[styles.buttonText, showWorking ? styles.activeButtonText : null]}> Co-Working</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setShowWorking(false)}
                    style={[
                        styles.button,
                        !showWorking ? styles.activeButton : null,
                    ]}
                >
                    <Text style={[styles.buttonText, !showWorking ? styles.activeButtonText : null]}>Booking History</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                {showWorking ? (
                    <WorkingScreen />
                ) : (
                    <BookingScreen navigation={navigation} />
                )}
            </View>
        </View>
    );
};

const WorkingScreen = ({ navigation }) => {
    return (
        <View style={styles.screen}>
            <View style={styles.imageContainer}>
                <View style={styles.imageWrapper}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('slot')
                    }}>
                        <Image
                            source={require('../Assets/images/singlePer.png')}
                            style={styles.image}
                        />
                        <Text style={styles.text}>Book Work {'\n'}Station</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.imageWrapper}>
                    <TouchableOpacity>
                        <Image
                            source={require('../Assets/images/GroupPer.png')}
                            style={styles.image}
                        />
                        <Text style={styles.text}>Meeting {'\n'}room</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const BookingScreen = ({ navigation }) => {
    const bookingData = [
        {
            id: '1',
            title: 'Booking 1',
            description: 'Description for Booking 1',
        },
        {
            id: '2',
            title: 'Booking 2',
            description: 'Description for Booking 2',
        },
        {
            id: '3',
            title: 'Booking 3',
            description: 'Description for Booking 3',
        },
        // Add more booking items as needed
    ];
    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    );
    return (
        <View style={styles.container}>
            <FlatList
                data={bookingData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        margin: 10,
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        textAlign: 'center',
    },
    activeButton: {
        backgroundColor: 'blue',
    },
    activeButtonText: {
        color: 'white', // Ensure that this style is correctly applied
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    screen: {
        flex: 1,
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imageWrapper: {
        alignItems: 'center',
    },
    image: {
        margin: 10,
    },
    text: {
        fontWeight: 'bold', // Make the text bold
        color: 'black', // Set the text color to black
        textAlign: 'center', // Center the text horizontally
    },
    container: {
        flex: 1,
        padding: 16,
    },
    item: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        marginTop: 8,
        fontSize: 16,
    },
});

export default Main;
