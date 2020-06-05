import React, { Component } from 'react'
import { View, Text, Button, StyleSheet} from 'react-native';
import { Entypo } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { black, white } from '../utils/colors';


class IndividualDeck extends Component{

  render(){
    const { route, navigation } = this.props
    const { deckId, decks } = route.params
  
    return(
      <View style={styles.container}>
        <View>
          <Text style={{fontSize: 30, textAlign:'center'}}>{deckId}</Text>
          <Text style={{textAlign: 'center', fontSize: 16}}>{decks[deckId].questions.length} questions</Text>
          <TouchableOpacity
            onPress={()=> navigation.navigate('Quiz', { deckId: deckId, deck: decks[deckId] })}
            style={styles.submitBtn}
          >
              <Text style={styles.btnText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={()=>navigation.navigate('NewQuestion', { deckId: deckId})}
            style={styles.addBtn}
          >
            <Entypo name="circle-with-plus" size={60} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
    
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: 10,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  submitBtn:{
    marginTop: 80,
    marginBottom: 10,
    backgroundColor: black,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  btnText:{
    color: white,
    fontSize: 20,
  },
  addBtn:{
    alignItems: 'center',
  },
})

export default IndividualDeck