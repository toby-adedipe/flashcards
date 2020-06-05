import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { black, white, red, lightGreen, lighBlue } from '../utils/colors'
import {
    clearLocalNotification,
    setLocalNotification,
} from '../utils/helpers'

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
        clearLocalNotification()
            .then(setLocalNotification)
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
        const { deckId, deck } = this.props.route.params;
        const totalQuestions = deck.questions.length;

        if(question.questionInput === undefined){
            return(
                <View style={ styles.container }>
                    <Text style={{fontSize: 16, textAlign:'center', color: red}}>No cards(questions) in this deck yet. To Start Playing Add cards</Text>
                    <TouchableOpacity
                        onPress={()=>navigation.navigate('NewQuestion', { deckId })}
                        style={styles.submitBtn}
                    >
                        <Text style={styles.btnText}>Add Cards</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        return(
            <View style={ styles.container }>
                <Text style={ styles.headerText}>{ deck.title }</Text>
                {!completedQuiz && (
                    <View>
                        <Text style={{fontSize:16, textAlign: 'center',}}>{`Question ${questionIndex} of ${totalQuestions}`}</Text>
                        { !showAnswer && (
                            <View>
                                <View style={styles.questionCard}>
                                    <Text style={styles.cardText}>{question.questionInput}?</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={()=>this.showAnswer()}
                                    style={styles.submitBtn}
                                >
                                    <Text style={styles.btnText}>Show Answer</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        {showAnswer && (
                            <View>
                                <View style={styles.questionCard}>
                                    <Text style={styles.cardText}>{question.answerInput}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={()=>this.onSubmit(true)}
                                    style={styles.correctBtn}
                                >
                                    <Text style={styles.correctText}>Correct Answer</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={()=>this.onSubmit(false)}
                                    style={styles.wrongBtn}
                                >
                                    <Text style={styles.wrongText}>Wrong Answer</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={()=>this.showAnswer()}
                                    style={styles.hideAnswer}
                                >
                                    <Text style={styles.hideAnswerText}>Hide Answer</Text>
                                </TouchableOpacity>

                            </View>
                        )}
                    </View>
                )}
                {completedQuiz && (
                    <View>
                        <Text style={{fontSize:20, textAlign: 'center', marginBottom: 10, marginTop: 200,}}>You Got</Text>
                        <Text style={{fontSize: 24, textAlign: 'center', marginBottom: 10}}>{Math.trunc((correctQuestions/totalQuestions)*100)}%</Text>
                        <Text style={{fontSize: 16, textAlign: 'center', marginBottom: 10, }}>Thats { correctQuestions } out of {totalQuestions} questions.</Text>
                        <TouchableOpacity
                            onPress={()=>this.beginQuiz()}
                            style={styles.hideAnswer}
                        >
                            <Text style={styles.hideAnswerText}>Try Again</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>navigation.goBack()}
                            style={styles.submitBtn}
                        >
                            <Text style={styles.btnText}>Go to Deck</Text>
                        </TouchableOpacity>
                    </View>
                )}
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        marginTop: 10,
        marginLeft: 16,
        marginRight: 16,
    },
    headerText:{
        fontSize: 30,
        textAlign: 'center',
    },
    questionCard:{
        height: 200,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#ccc',
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardText:{
        fontSize: 20,
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
    correctBtn:{
        marginBottom: 10,
        backgroundColor: lightGreen,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    correctText:{
        color: black,
        fontSize: 20,
    },
    wrongBtn:{
        marginBottom: 10,
        backgroundColor: red,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    wrongText:{
        color: white,
        fontSize: 20,
    },
    hideAnswer:{
        marginBottom: 10,
        backgroundColor: lighBlue,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    hideAnswerText:{
        color: black,
        fontSize: 20,
    }
})

export default Quiz