import React, { Component} from 'react'
import { View, Text, Button} from 'react-native';
import { getDecks, getData } from '../utils/api';
import Decks from './Decks';

class HomeScreen extends Component{
    
    componentDidMount(){
        getData()
            .then((decks=>console.log(decks)))
    }

    render(){
        const {navigation} = this.props
        //console.log(this.state.decks)
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>Home Screen</Text>
              <Text></Text>
              <Button
                title="Go to Details"
                onPress={()=> navigation.navigate('Details')}
              />
            </View>
          );
    }
    
  }
  
export default HomeScreen