import React, { Component} from 'react'
import { ScrollView, View, Text, Button} from 'react-native';
import { getDecks } from '../utils/api';
import Decks from './Decks';
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
        const {navigation, decks} = this.props
        const {error } = this.state
        console.log(decks)
        return (
            <View>
            { error !== '' &&(
              <View>
                <Text>{error}</Text>
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
                    <View key={id}>
                      <Text>{decks[id].title}</Text>
                      <Text>{decks[id].questions.length} cards</Text>
                    </View>
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
 
function mapStateToProps({ decks }){
  return {
    decks: (typeof decks) === 'undefined' ? {}: decks
  }
}  
export default connect(mapStateToProps)(HomeScreen)