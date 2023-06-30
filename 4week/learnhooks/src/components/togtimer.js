import React, {useState, useEffect} from "react";

export default function ToggleTimer() {
    const [showTimer, setShowTimer ] = useState(true);

    const handleToggleTimer = () => {
        setShowTimer((prev) => !prev);
    }
    

    return(
        <div>
            {showTimer && <Timer/>}
            <button onClick={handleToggleTimer}>
                {showTimer ? "Hello Timer" : "Show Timer"}
            </button>            
        </div>
    )
}