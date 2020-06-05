import { AsyncStorage } from "react-native"
import data from './_Data';

const STORAGE_KEY = 'FLASH_CARDS_DATA'
//getDecks
export async function  getDecks(){
    try {
        const decks = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY))

        return decks
    }
    catch (err){
        console.warn('getDecks failed', err)
    }
}
//deleteDeck(id)
export async function deleteDeck(id){
    try{
        const decks = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY))
        delete decks[id]
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(results))
    }
    catch(err){
        console.warn('problem deleting deck', err)
    }
}
//getDeck(id)
export async function getDeck(id){
    try{
        getDecks()
            .then(decks=>{
                return decks[id]
            })
    }
    catch (err){
        console.warn('getDeck failed', err)
    }
}
//saveDeckTitle(title)
export async function saveDeckTitle(title){
    try {
        await AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify ({
            [title]:{
                title,
                questions:[]
            }
        }))

        return { [title]:{
            title,
            questions:[]
        }}
    }catch(err){
        console.warn('failed to save deck titile', err)
    }
}

export async function clearDatabase(){
    try{
        await AsyncStorage.clear()
    }catch(err){
        console.log('error while deleting database', err)
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
