import React, { Component } from 'react'
import { View, Text, Button} from 'react-native';
import { Entypo } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';

class IndividualDeck extends Component{

  render(){
    const { route, navigation } = this.props
    const { deckId, decks } = route.params
  
    return(
      <View>
        <View>
          <Text style={{fontSize: 24, textAlign:'center'}}>{deckId}</Text>
          <Text style={{textAlign: 'center'}}>{decks[deckId].questions.length} questions</Text>
          <Button title="Go back" onPress = {()=> navigation.goBack()} />
          <Button
            title='Go back to first screen in stack'
            onPress={()=> navigation.popToTop()}
          />
          <Button
            title="Start Quiz"
            onPress={()=> navigation.navigate('Quiz', { deckId: deckId, deck: decks[deckId] })}
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={()=>navigation.navigate('NewQuestion', { deckId: deckId})}
          >
            <Entypo name="circle-with-plus" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
    
}
  
export default IndividualDeck