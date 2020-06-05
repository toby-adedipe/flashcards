import React, { Component} from 'react'
import { ScrollView, View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';
import { getDecks } from '../utils/api';
import { receiveDecks } from '../actions';
import { connect } from 'react-redux';

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
        console.log(decks)
        return (
            <View style={styles.container}>
            { error !== '' &&(
              <View>
                <Text style={{fontSize: 16, textAlign:'center'}}>{error}</Text>
                <Button
                  title="Go to New Deck"
                  onPress={()=> navigation.navigate('NewDeck')}
                />
              </View>
            )}
            { error === '' && (
              <View>
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
                <Button
                  title="Go to New Deck"
                  onPress={()=> navigation.navigate('NewDeck')}
                />
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
    shadowColor: 'rgba(15, 15, 15, 0.1)',
    shadowOffset: {
      width: 0, height: 0
    },
    shadowOpacity: 1, 
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center', 
  }
})  
// function mapStateToProps({ decks }){
//   return {
//     decks: (typeof decks) === 'undefined' ? {}: decks
//   }
// }  
export default connect()(HomeScreen)