import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, StatusBar,TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { saveDeckTitle, clearDatabase } from '../utils/api';
import { addDeck } from '../actions';
import { black, white } from '../utils/colors';
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
                navigation.navigate('IndividualDeck', { deckId: title })
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
                <Button
                    onPress={this.onSubmit}
                    disabled={title===""}
                    title='Create New Deck'
                />
                <Button
                    onPress={this.clearDb}
                    title='Delete'
                />
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
    submitBtn:{
        flex: 1,
        color: black,
        height: 55,
        textAlign: 'center',
    }

})

export default connect()(NewDeck);