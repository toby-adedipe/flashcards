import React from 'react'
import { View, Text, Button} from 'react-native';

function IndividualDeck ({ route, navigation }){
  const { deckId } = route.params
    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Individual Deck</Text>
        <Text>title: {deckId}</Text>
        <Button title="Go back" onPress = {()=> navigation.goBack()} />
        <Button
          title='Go back to first screen in stack'
          onPress={()=> navigation.popToTop()}
        />
      </View>
    )
}
  
export default IndividualDeck