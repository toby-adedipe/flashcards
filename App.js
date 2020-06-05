import * as React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import reducers from './reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import HomeScreen from './components/HomeScreen'
import IndividualDeck from './components/IndividualDeck'
import NewDeck from './components/NewDeck';
import middleware from './middleware';

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={ createStore(reducers, middleware)}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Home"
            component={HomeScreen}
            options={{title: "All Decks"}}
          />
          <Stack.Screen
            name="NewDeck" 
            component={NewDeck}
            options={{ title: 'Create New Question'}} 
          />
          <Stack.Screen
            name="IndividualDeck"
            component={IndividualDeck}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;