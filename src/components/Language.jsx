export default function Language(props){
    const styles = {
        backgroundColor : props.backgroundColor,
        color : props.color
    }
    return <span className = "chip"style ={styles}>{props.name}</span>
}