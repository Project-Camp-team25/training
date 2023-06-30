import {useState} from 'react';

function Numcnt() {
    const [카운트, 카운트변경] = useState(0);
    const 숫자변경 = (e) => {
        카운트변경(카운트+1);
    }
    return(
        <div>
            <p>현재 count  : {카운트}</p>
            <button onClick={숫자변경}>+</button>
        </div>

    )
}

export default Numcnt;