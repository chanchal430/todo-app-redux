export function loadState() {
    try {
        const serializedState = localStorage.getItem("state");

        if(serializedState === null) {
            return undefined;
        }

        return JSON.parse(serializedState)
    } catch (error) {
        console.log('Error in getting from LS: ', error.message);
        return undefined
    }
}

export function saveState(state) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("state", serializedState)
    } catch (error) {
        console.log('Error in saving to LS: ', error.message);
        
    }
}