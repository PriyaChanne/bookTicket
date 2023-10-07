import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LogIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleButtonPress = async () => {
    try {
      // API endpoint URL
      const apiUrl = 'https://demo0413095.mockable.io/digitalflake/api/login';

      // User data to send in the request
      const userData = {
        email: email,
        password:password,
      };

      // Sending the POST request
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${userData.email}&password=${userData.password}`,
      });

      // Checking the response status
      if (response.ok) {
        // Request was successful, you can handle the response data here
        const data = await response.json();
        console.log('API Response:', data);

        // Optionally, you can navigate to another screen or perform some action
        // after a successful API call.
        // Example:
        navigation.navigate('main')
      } else {
        // Request failed, handle the error here
        console.error('API Request failed');
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error('An error occurred:', error);
    }
    
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Image */}
      <View style={styles.imageView}>
        <Image
          source={require('../Assets/images/DF_Icon.png')} // Replace with the path to your image file
          resizeMode="cover"
        />
        <Text style={styles.text}>Co-working</Text>
      </View>
      <View style={styles.content}>
        {/* Email Input */}
        <Text style={styles.inputLabel}>Mobile number or Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          color="black" // Set text color inside the input field to black
          backgroundColor="#F0F0F0" // Set background color of the input field
        />

        {/* Password Input */}
        <Text style={styles.inputLabel}>Password</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={!isPasswordVisible} // Hide or show password
            color="black" // Set text color inside the input field to black
            backgroundColor="#F0F0F0" // Set background color of the input field
          />
          <TouchableOpacity
            style={styles.eyeIconContainer}
            onPress={togglePasswordVisibility}
          >
            <Image
              source={require('../Assets/images/eye.png')} // Replace with the path to your eye icon image
              resizeMode="contain"
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleButtonPress} // Call the handleButtonPress function
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <View style={styles.textlog}>
        <Text style={{ color: 'black' }}>New user? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('register')}>
          <Text style={{ color: '#2A1D8B', fontWeight: 'bold' }}>Create an account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // ... Your styles remain the same
  container: {
    flex: 1,
  },
  imageView: {
    marginTop: '25%',
    alignItems: 'center', // Center the content horizontally
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
    marginTop: "7%",
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
  passwordInputContainer: {
    position: 'relative', // To position the eye icon
  },
  passwordInput: {
    height: 45,
    borderColor: '#DADADA',
    borderWidth: 1,
    marginHorizontal: '5%',
    paddingLeft: 10,
    paddingRight: 40, // Adjust right padding to accommodate the eye icon
    borderRadius: 10,
    color: 'black', // Set text color inside the input field to black
    backgroundColor: '#F9F9F9', // Set background color of the input field
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 10, // Adjust the right position as needed
    top: '50%', // Vertically center the icon
    transform: [{ translateY: -12 }], // Vertically center the icon
  },
  eyeIcon: {
    tintColor: 'black', // Set the color of the image
    marginRight:"5%"
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
    alignSelf: 'center',
  }
});

export default LogIn;
