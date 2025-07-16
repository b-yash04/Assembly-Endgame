export default function GameStatus(props){
    return(
        <section className={`game-status ${props.className}`}>
            <h2>{props.result}</h2>
            <p>{props.remarks}</p>
        </section>
    )
}