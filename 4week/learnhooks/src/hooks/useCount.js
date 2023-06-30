import useCounter from "./countHook";

function UseCount(){
    const {count, increment } = useCounter(100)
    return(
        <div>
            <p>카운트 :{count} </p>
            <button onClick={increment}>증가</button>
        </div>
    )
}

export default UseCount;