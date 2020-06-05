import React, { Component} from 'react'
import { ScrollView, View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';
import { getDecks } from '../utils/api';
import { receiveDecks } from '../actions';
import { connect } from 'react-redux';
import { black, white } from '../utils/colors';

class HomeScreen extends Component{
    state = {
      decks: {},
      error: ''
    }
    componentDidMount(){
      const { dispatch } = this.props

        getDecks()
            .then((decks=>{
              if(decks === null){
                dispatch(receiveDecks({}))
                this.setState({
                  error:'No decks in database, create new ones'
                })
              }else{
                dispatch(receiveDecks(decks))
                this.setState(()=>({
                  decks
                }))
              }
            }))
            .then
    }

    render(){
        const {navigation, } = this.props
        const {error, decks } = this.state

        return (
            <View style={styles.container}>
            { error !== '' &&(
              <View>
                <Text style={{fontSize: 16, textAlign:'center'}}>{error}</Text>
                <TouchableOpacity
                  onPress={()=> navigation.navigate('NewDeck')}
                  style={styles.submitBtn}
                >
                  <Text style={styles.btnText}>Create New Deck</Text>
                </TouchableOpacity>
              </View>
            )}
            { error === '' && (
              <View style={styles.deckFlex}>
                <ScrollView>
                  {Object.keys(decks).map(id=>(
                    <TouchableOpacity  key={id}
                      onPress={()=> navigation.navigate('IndividualDeck', {deckId: decks[id].title, decks: decks})}
                    >
                      <View style={styles.decks}>
                        <Text style={{fontSize: 24}}>{decks[id].title}</Text>
                        <Text style={{fontSize: 16}}>{decks[id].questions.length} cards</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <TouchableOpacity
                  onPress={()=> navigation.navigate('NewDeck')}
                  style={styles.submitBtn}
                >
                  <Text style={styles.btnText}>Create New Deck</Text>
                </TouchableOpacity>
              </View>
            )}
            </View>
          );
    }
    
  }
 

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: 10,
    marginLeft: 16,
    marginRight: 16,
  },
  decks:{
    height: 80,
    flex: 1,
    borderRadius: 5,
    borderWidth:1,
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  deckFlex:{
    flex: 1,
    justifyContent: 'space-between',
  },
  submitBtn:{
    marginTop: 10,
    marginBottom: 30,
    backgroundColor: black,
    height: 50,
    color: white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  btnText:{
    color: white,
    fontSize: 20,
  },
})  

export default connect()(HomeScreen)