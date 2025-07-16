import Header from "./components/Header.jsx"
import GameStatus from "./components/GameStatus.jsx"
import {languages} from "./languages.js"
import Language from "./components/Language.jsx"
import Letter from "./components/Letter.jsx"
import {useState} from "react"
import Key from "./components/Key.jsx"
export default function App(){

    const languageArr =  languages.map(item =>
        <Language key ={item.name}
                  name = {item.name} 
                  backgroundColor = {item.backgroundColor}
                  color = {item.color}
        /> 
    ) 

    const [word, setWord] = useState("ELEPHANT");
    const wordArr = word.split("").map((item,index) =>
        <Letter key ={index} letter = {item} />
    )

    const alphabets = Array.from({ length: 26 }, (_, i) =>
                    String.fromCharCode(65 + i) 
                    )
    function keyClick(letter){
        console.log(letter);
        
    }
    const keyboard = alphabets.map((item) => 
                    <Key 
                    alpha={item} 
                    key={item} 
                    onClick = {()=> keyClick(item)}/>);
    return (
        <main>
            <Header />
            <GameStatus />
            <section className="language-chips">{languageArr}</section>
            <section className="display-letter">{wordArr}</section>
            <section className="keyboard">{keyboard}</section>
            <button className="new-game">New Game</button>
        </main>
    )
}