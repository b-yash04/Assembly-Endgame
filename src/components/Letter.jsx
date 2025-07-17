export default function Letter(props){
    return(
        <span className= {`lttr ${props.className}`}>
            {props.letter}
        </span>
    )
}