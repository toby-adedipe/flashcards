import React, { Component } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { addCardToDeck } from '../utils/api';
import {gray, black, white} from '../utils/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

class NewQuestion extends Component{
    state={
        question:'',
        answer: '',
    }
    constructor(props){
        super(props)
        this.handleQuestionChange = this.handleQuestionChange.bind(this);
        this.handleAnswerChange = this.handleAnswerChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleQuestionChange(text){
        this.setState(()=>({
            question: text
        }))
    }
    handleAnswerChange(text){
        this.setState(()=>({
            answer: text
        }))
    }
    handleSubmit(){
        const { route, navigation } = this.props
        const { deckId } = route.params
        const { question, answer } = this.state
        const card = {
            questionInput: question,
            answerInput: answer
        }
        addCardToDeck(deckId, card)
            .then(console.log(deckId))
            .then(this.setState(()=>({
                question: '',
                answer: '',
            })))
        navigation.goBack();
    }
    render(){
        const { question, answer} = this.state
        return(
            <View style={styles.container}>
                <Text style={styles.headerText}>Question</Text>
                <TextInput
                    value={question}
                    onChangeText={text=>this.handleQuestionChange(text)}
                    placeholder="Whats your question"
                    style={styles.textInput}
                />
                <Text style={styles.headerText}>Answer</Text>
                <TextInput
                    value={answer}
                    onChangeText={text=>this.handleAnswerChange(text)}
                    placeholder="Whats the answer"
                    style={styles.textInput}
                />
                <TouchableOpacity
                    onPress={this.handleSubmit}
                    disabled={question==='' || answer===''}
                    style={ question==='' || answer==='' 
                        ? styles.disabledBtn
                        : styles.submitBtn
                    }

                >
                    <Text 
                        style={ question==='' || answer==='' 
                            ? styles.disabledText
                            : styles.btnText
                        }
                    >
                        Submit
                    </Text>
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
    headerText:{
        fontSize: 20,
    },
    textInput:{
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 4,
        marginTop: 10,
        marginBottom: 20,
        height: 50,
    },
    disabledBtn:{
        marginBottom: 10,
        backgroundColor: gray,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    submitBtn:{
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
})
export default NewQuestion;