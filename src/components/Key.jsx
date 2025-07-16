export default function Key(props) {
    return (
        <button onClick={props.onClick} className="key">
            {props.alpha}
        </button>
    )
}