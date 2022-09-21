import { type } from "os";

interface AppState {
  screen: number
}

const initialState: AppState = {
  screen: 0
}

const reducer = (state = initialState, action: { type: string, payload: number}) => {
  switch(action.type) {
    case 'CHANGE_SCREEN':
      return {
        screen: action.payload
      }
    default : return state;
  }
}

export default reducer;
