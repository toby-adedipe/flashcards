import { AsyncStorage } from "react-native"
import STORAGE_KEY from './_Data'
import data from './_Data';

function saveDummyData(data){
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))

    return data
}

//getDecks
export async function  getDecks(){
    try {
        const decks = await AsyncStorage.getItem(STORAGE_KEY)

        if(decks !== null){
            return JSON.parse(decks)
        }
    }
    catch (err){
        console.warn('getDecks failed', err)
    }
}
//getDeck(id)
export async function getDeck(id){
    try{
        const deck = await AsyncStorage.getItem(STORAGE_KEY)

        if (deck !== null){
            return deck[id]
        }
    }
    catch (err){
        console.warn('getDeck failed', err)
    }
}
//saveDeckTitle(title)
export async function saveDeckTitle(key, title){
    try {
        await AsyncStorage.mergeItem(
            STORAGE_KEY,
            JSON.stringify({
                [key] : {
                    title: title,
                    questions: [],
                }
            })
        )
    }
    catch(err){
        console.warn('failed to save deck title', err)
    }
}


//addcardToDeck(title, card)
export async function addCardToDeck(key, card){
    const data = AsyncStorage.getItem(STORAGE_KEY)
    const updatedData = JSON.parse(data)

    updatedData[key]={
        ...updatedData[key],
        qustions:[
            ...updatedData[key].questions,
            {
                question: card.questionInput,
                answer: card.answerInput,
            }
        ]
    }

    try {
        AsyncStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(updatedData)
        )
    }catch(err){
        console.warn('failed to addcard to deck', err)
    }
}

export function getData(results){
    return results === null
        ? getDecks()
        : console.warn('Existing data')
}