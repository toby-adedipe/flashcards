import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, StatusBar,TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { saveDeckTitle, clearDatabase } from '../utils/api';
import { addDeck } from '../actions';
import { black, white, gray, red } from '../utils/colors';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

class NewDeck extends Component{
    state={
        title:''
    }
    onChangeText = this.onChangeText.bind(this)
    onSubmit = this.onSubmit.bind(this)

    onChangeText(title){
        this.setState(()=>({
            title,
        }))
    } 
    onSubmit(){
        const { dispatch, navigation } = this.props
        const { title } = this.state

        saveDeckTitle(title)
            .then((newDeck)=>{
                console.log(newDeck)
                dispatch(addDeck(newDeck))
                navigation.navigate('IndividualDeck', { deckId: title, decks: newDeck })
            })
        this.setState(()=>({
            title: ''
        }))
    }
    clearDb(){
        clearDatabase()
    }
    render(){
        const { title } = this.state
        return(
            <View style={ styles.container }>
                <Text style={ styles.label}>
                    Name
                </Text>
                <TextInput
                    value= {title}
                    placeholder='Name this Deck'
                    onChangeText={ title=> this.onChangeText(title)}
                    style={styles.textInput}
                />
                <TouchableOpacity
                    onPress={this.onSubmit}
                    disabled={title===""}
                    style={title===""? styles.disabledBtn: styles.submitBtn}
                >
                    <Text style={title===""? styles.disabledText :styles.btnText}>Create Deck</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.clearDb}
                    style={styles.deleteBtn}
                >
                    <Text style={styles.deleteText}>Delete all Decks</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        marginTop: 10,
        marginLeft: 16,
        marginRight: 16,
        flex: 1,
    },
    label:{
        fontSize: 20,
    },
    textInput:{
        borderColor: black,
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 20,
        height: 55,
        marginTop: 5,
        paddingLeft: 5,
    },
    disabledBtn:{
        marginTop: 80,
        marginBottom: 10,
        backgroundColor: gray,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
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
    disabledText:{
        color: '#c7c5bf',
        fontSize: 20,
    },
    deleteBtn:{
        backgroundColor: red,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    deleteText:{
        fontSize: 20,
        color: white,
    }
})

export default connect()(NewDeck);