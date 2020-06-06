# Introduction

A flashcard or flash card is a card bearing information on both sides, which is intended to be used as an aid in memorization. Each flashcard bears a question on one side and an answer on the other. This app attemps to simulate this game to help its users study or memorize.

## Installation and Development

Install dependencies by running:
`npm install`
Then 
`cd ios` and `pod install`
`cd..` and start the server by running `npx react-native start`

For IOS `yarn ios`
For Android `yarn android`

## Platforms

This App has been tested on an IOS and android simulator

## What you can do on the App

* A user can see all the saved decks on the homescreen
* They can access the deck
* Test themselves using the information in the cards
* check the answers and grade themselves
* A user can create a deck to hold cards(Questions)
* They can create Questions to add to existing decks.

## AsyncStorage

AsyncStorage acts as the backend database storing all the data that will be needed by the user on the back end. 

### Methods

it contains 5 api calls:

* [`getDecks()`] (#getDecks())
* [`deleteDeck(id)`] (#deleteDeck(id))
* [`getDeck(id)`] (#getDeck(id))
* [`saveDeckTitle(title)`] (#saveDeckTitle(title))
* [`clearDatabase()`] (#clearDatabase())

#### `getDecks()`

Method Signature:

```js
getDecks()
```

* Returns an object containing all the decks in the database.

#### `getDeck(id)`

Method Signature:

```js
getDeck(id)
```

* Returns an object containing the deck that matches that 'id'

#### `deleteDeck(id)`

Method Signature:

```js
deleteDeck(id)
```

* Removes the deck with matching the id

#### `saveDeckTitle(title)`

Method Signature:

```js
saveDeckTitle(title)
```

* Creates a new deck and gives it a title.

#### `clearDatabase()`

Method Signature:

```js
clearDatabase()
```

* Deletes all the decks from the database.

## Create React Native App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

