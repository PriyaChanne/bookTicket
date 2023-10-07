import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const register = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');

  const handleButtonPress = async () => {
    try {
      // API endpoint URL
      const apiUrl = 'https://demo0413095.mockable.io/digitalflake/api/create_account';
  
      // User data to send in the request
      const userData = {
        email: email,
        name: fullName,
      };
  
      // Sending the POST request
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${userData.email}&name=${userData.name}`,
      });
  
      // Checking the response status
      if (response.ok) {
        // Request was successful, you can handle the response data here
        const data = await response.json();
        console.log('API Response:', data);
  
        // Optionally, you can navigate to another screen or perform some action
        // after a successful API call.
        // Example:
        // navigation.navigate('Home');
      } else {
        // Request failed, handle the error here
        console.error('API Request failed');
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error('An error occurred:', error);
    }
  };
  
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageView}>
        <Text>{''}</Text>
        <Text style={styles.text}>Create an Account</Text>
      </View>
      <View style={styles.content}>
        {/* Full Name Input */}
        <Text style={styles.inputLabel}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={text => setFullName(text)}
          color="black" // Set text color inside the input field to black
          backgroundColor="#F0F0F0" // Set background color of the input field
        />

        {/* Mobile Number Input */}
        <Text style={styles.inputLabel}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          value={mobileNumber}
          onChangeText={text => setMobileNumber(text)}
          keyboardType="phone-pad"
          color="black" // Set text color inside the input field to black
          backgroundColor="#F0F0F0" // Set background color of the input field
        />

        {/* Email Input */}
        <Text style={styles.inputLabel}>Email ID</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
          color="black" // Set text color inside the input field to black
          backgroundColor="#F0F0F0" // Set background color of the input field
        />
      </View>

      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleButtonPress}
      >
        <Text style={styles.buttonText}>Create an account</Text>
      </TouchableOpacity>
      <View style={styles.textlog}>
        <Text style={{ color: 'black' }}>Existing user?</Text>
        <TouchableOpacity onPress={()=>{
          navigation.navigate('logIn')
        }}>
          <Text style={{ color: '#2A1D8B' }}>Log In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageView: {
    marginLeft: '5%',
    marginTop: '20%',
  },
  text: {
    color: 'black',
    fontSize: 22,
    fontWeight: '800',
  },
  content: {
    flex: 1,
    marginTop: '15%',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: '5%',
    marginTop: "5%",
    marginBottom: 10,
    color: 'black'
  },
  input: {
    height: 45,
    borderColor: '#DADADA',
    borderWidth: 1,
    marginHorizontal: '5%',
    paddingLeft: 10,
    borderRadius: 10,
    color: 'black', // Set text color inside the input field to black
    backgroundColor: '#F9F9F9', // Set background color of the input field
  },
  button: {
    backgroundColor: '#5167EB',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    marginHorizontal: '5%',
    marginTop: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textlog: {
    flexDirection: 'row',
    marginBottom: '3%',
    marginTop: 10,
    alignSelf: 'center'
  }
});

export default register;
