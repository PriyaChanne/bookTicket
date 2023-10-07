import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import register from './Screens/register'
import logIn from './Screens/logIn';
import main from './Screens/main';
import slot from './Screens/slot';
const Stack = createNativeStackNavigator();

function Native({navigation}) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SelectSeats">
          <Stack.Screen name="register" component={register}  options={{ headerShown: false }} />
          <Stack.Screen name="logIn" component={logIn}  options={{ headerShown: false }} />
          <Stack.Screen name="main" component={main}  options={{ headerShown: false }} />
          <Stack.Screen name="slot" component={slot}  options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  export default Native;
  
  
  
