import Header from "./components/Header.jsx"
import GameStatus from "./components/GameStatus.jsx"
import {languages} from "./languages.js"
import Language from "./components/Language.jsx"
import Letter from "./components/Letter.jsx"
import {useState} from "react"
import Key from "./components/Key.jsx"
import clsx from "clsx";
import {getFarewellText} from "./utils.js"
import Confetti from 'react-confetti';
import {getRandomWord} from './utils.js'


export default function App(){

    const [word, setWord] = useState(getRandomWord());
    
    const [guessedLetter, setGuessedLetter] = useState([]);
    let correctLetters = 0
    const wordArr = word.split("").map((item,index) =>{
        const display = guessedLetter.includes(item)
        correctLetters = display ? correctLetters+1 : correctLetters
        return(
            <Letter key ={index} letter = {display ? item : ""} />
        )
    }
    
    )
    const lastGuessedLetter = guessedLetter[guessedLetter.length - 1]
    let isIncorrect = !word.includes(lastGuessedLetter)
    let wrongGuess = guessedLetter.filter(item => !word.includes(item)).length;
    let farewellLang = ""
    const languageArr =  languages.map((item,index) =>{
        if(wrongGuess > index) farewellLang = item.name
        return (<Language key ={item.name}
                  name = {item.name} 
                  backgroundColor = {item.backgroundColor}
                  color = {item.color}
                  className = {wrongGuess > index ? "lost" : "" }
        />) }
    ) 

    const isGameWon = correctLetters == word.length ? true : false
    
    const isGameOver = wrongGuess == languageArr.length-1 ? true : false
    const alphabets = Array.from({ length: 26 }, (_, i) =>
                    String.fromCharCode(65 + i) 
                    )
    
    function keyClick(letter){
        
        setGuessedLetter(prevLetters =>
            prevLetters.includes(letter) ?
                prevLetters :
                [...prevLetters, letter]
        )
        
    }

    const keyboard = alphabets.map((item) => {
        const isGuessed = guessedLetter.includes(item)
        const isCorrect = isGuessed && word.includes(item)
        const isWrong = isGuessed && !word.includes(item)
        const className = clsx({
                green : isCorrect,
                red : isWrong
            }
        )
        
            return  (<Key 
                    alpha={item} 
                    key={item} 
                    className  = {className}
                    onClick = {isGameOver ?undefined: isGameWon ? undefined : ()=> keyClick(item)}/>)
    })
    let result = "";

if (isGameWon) {
  result = "You Won 🎉";
} else if (isGameOver) {
  result = "Game Over";
} else if (isIncorrect && farewellLang) {
  result = getFarewellText(farewellLang); 
}
function handle(){

    setWord(getRandomWord())
    setGuessedLetter([])
}
const lostLetters = word.split("").map((item,index) =>{
    const display = guessedLetter.includes(item)
    const className = clsx({
        redword : !display
    })
    return ( <Letter className = {className} key ={index} letter = {item}/>

    )
})
    return (
        <main>
            {isGameWon &&  <Confetti recycle={false}
                        numberOfPieces={1000}/>}
            <Header />
            <GameStatus 
            result = {result}
            remarks = {isGameWon ? "Well Done!" : isGameOver ? "You Lose! Better try learn Assembly Language 😭 " : ""}
            className = {isGameWon ? "game-status-won" : isGameOver ? "game-status-lost" : isIncorrect && farewellLang ? "game-status-farewell":"status"}
            />
            <section className="language-chips">{languageArr}</section>
            <section className="display-letter">{isGameOver? lostLetters: wordArr}</section>
            <section className="keyboard">{keyboard}</section>
            {(isGameOver || isGameWon) && <button onClick={handle}  className="new-game">New Game</button>}
        </main>
    )
}