import {
    ADD_DECK,
    REMOVE_DECK,
    RECEIVE_DECKS,
    ADD_QUESTION,
} from '../actions/index';

function decks(state={}, action){
    switch(action.type){
        case ADD_DECK:
            return {
                ...state,
                ...action.newDeck
            }
        case REMOVE_DECK:
            let currState = [...state]
            const newState = currState.filter(id=> id !== action.id)
            return {
                newState
            }
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_QUESTION:
            return {
                ...state,
                [action.deck]: {
                    ...state[action.deck],
                    questions: state[action.deck].questions.concat(action.question)
                }
            }
    }
}

export default decks;