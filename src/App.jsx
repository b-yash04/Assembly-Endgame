import Header from "./components/Header.jsx"
import GameStatus from "./components/GameStatus.jsx"
import {languages} from "./languages.js"
import Language from "./components/Language.jsx"
import Letter from "./components/Letter.jsx"
import {useState} from "react"
import Key from "./components/Key.jsx"
import clsx from "clsx";
export default function App(){


    

    const [word, setWord] = useState("ELEPHANT");
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
    let wrongGuess = guessedLetter.filter(item => !word.includes(item)).length;
    
    const languageArr =  languages.map((item,index) =>{

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
                    onClick = {isGameOver ?undefined:()=> keyClick(item)}/>)
    })
    return (
        <main>
            <Header />
            <GameStatus 
            result = {isGameWon ? "You Won 🎉" : isGameOver ? "Game Over" : ""}
            remarks = {isGameWon ? "Well Done!" : isGameOver ? "You Lose! Better try learn Assembly Language 😭 " : ""}
            className = {isGameWon ? "game-status-won" : isGameOver ? "game-status-lost" : ""}
            />
            <section className="language-chips">{languageArr}</section>
            <section className="display-letter">{wordArr}</section>
            <section className="keyboard">{keyboard}</section>
            {isGameOver && <button className="new-game">New Game</button>}
        </main>
    )
}