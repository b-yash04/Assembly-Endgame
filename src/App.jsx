import Header from "./components/Header.jsx"
import GameStatus from "./components/GameStatus.jsx"
import {languages} from "./languages.js"
import Language from "./components/Language.jsx"
export default function App(){
    const languageArr =  languages.map(item =>
        <Language name = {item.name} 
                  backgroundColor = {item.backgroundColor}
                  color = {item.color}
        /> 
    ) 
    return (
        <main>
            <Header />
            <GameStatus />
            <section className="language-chips">{languageArr}</section>
        </main>
    )
}