import React, { Component } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { addCardToDeck } from '../utils/api';

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
        const { route } = this.props
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
    }
    render(){
        const { question, answer} = this.state
        return(
            <View>
                <Text>Question</Text>
                <TextInput
                    value={question}
                    onChangeText={text=>this.handleQuestionChange(text)}
                    placeholder="Whats your question"
                />
                <Text>Answer</Text>
                <TextInput
                    value={answer}
                    onChangeText={text=>this.handleAnswerChange(text)}
                    placeholder="Whats the answer"
                />
                <Button
                    onPress={this.handleSubmit}
                    title="Submit"
                    
                />
            </View>
        )
    }
}

export default NewQuestion;