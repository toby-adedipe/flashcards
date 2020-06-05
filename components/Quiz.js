import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class Quiz extends Component{
    state={
        showAnswer: false,
        completedQuiz: false,
        question: {},
        questionIndex: 1,
        correctQuestions: 0,
    }
    constructor(props){
        super(props);

        this.startQuiz = this.startQuiz.bind(this);
        this.beginQuiz = this.beginQuiz.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.showAnswer = this.showAnswer.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount(){
        this.startQuiz()
    }

    startQuiz(){
        const { route } = this.props
        const { deck } = route.params
        if(deck.questions.length>0){
            this.beginQuiz()
        }
    }
    
    beginQuiz(){
        const { route } = this.props
        const { deck } = route.params
        this.setState(()=>({
            showAnswer: false,
            completedQuiz: false,
            question: deck.questions[0],
            questionIndex: 1,
            correctQuestions: 0,
        }))
    }

    nextQuestion(){
        const { route } = this.props
        const { deck } = route.params
        const questionIndex = this.state.questionIndex + 1

        const question = deck.questions[questionIndex - 1]
        this.setState(()=>({
            showAnswer: false,
            question,
            questionIndex,
        }))
    }
    showAnswer(){
        this.setState(currState=>({
            showAnswer: !currState.showAnswer
        }))
    }
    onSubmit(answer){
        const { route } = this.props
        const { deck } = route.params
        const { questionIndex } = this.state
        if(answer){
            this.setState(currState=>({
                correctQuestions: currState.correctQuestions + 1
            }))
        }

        if(questionIndex === deck.questions.length){
            this,this.setState(()=>({
                completedQuiz: true,
            }))
        }else{
            this.nextQuestion()
        }
    }

    render(){
        const {
            showAnswer,
            completedQuiz,
            question,
            questionIndex,
            correctQuestions,
        } = this.state;
        const { navigation } = this.props
        const { deck } = this.props.route.params;
        const totalQuestions = deck.questions.length;

        return(
            <View>
                <Text>{ deck.title }</Text>
                {!completedQuiz && (
                    <View>
                        <Text>{`${questionIndex}/${totalQuestions}`}</Text>
                        { !showAnswer && (
                            <View>
                                <View>
                                    <Text>{question.questionInput}</Text>
                                </View>
                                <Button
                                    onPress={()=>this.showAnswer()}
                                    title='Show Answer'
                                />
                            </View>
                        )}
                        {showAnswer && (
                            <View>
                                <View>
                                    <Text>{question.answerInput}</Text>
                                </View>
                                <Button 
                                    onPress={()=>this.onSubmit(true)}
                                    title="Correct Answer"
                                />
                                <Button 
                                    onPress={()=>this.onSubmit(false)}
                                    title="Wrong Answer"
                                />
                                <Button
                                    onPress={()=>this.showAnswer()}
                                    title='Hide Answer'
                                />
                            </View>
                        )}
                    </View>
                )}
                {completedQuiz && (
                    <View>
                        <Text>Scores: { correctQuestions } out of {totalQuestions}</Text>

                        <Button
                            title='Take Quiz Again'
                            onPress={()=>this.beginQuiz()}
                        />
                        <Button
                            title='Go to Deck'
                            onPress={()=>navigation.goBack()}
                        />
                    </View>
                )}
                
            </View>
        )
    }
}

export default Quiz