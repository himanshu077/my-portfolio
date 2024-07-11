import { useEffect, useState } from 'react';

function usePreviousState(initialPreviousState, state) {
    const [stateTuple, setStateTuple] = useState([initialPreviousState, state]);

    useEffect(() => {
        setStateTuple((previousState) => [previousState[1], state]);
    }, [state]);

    const previousState = stateTuple[0];

    return previousState;
}

export default usePreviousState;