import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import Register from './src/screens/Register';
import SendMessage from './src/screens/SendMessage';
import Settings from './src/screens/Settings';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Chat App'}}
        />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Send Message" component={SendMessage} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
