import * as Types from "../../ActionTypes";
const initialState = {
  isLoggedIn: false,
  userName: '',
  coin:40,
  currentUser:{},
  anonymous:true
};

import { REHYDRATE } from 'redux-persist';

export default (user = (state = initialState, action) => {
  switch (action.type) {
    case Types.SETUSERNAME:
        return { ...state,userName:action.payload,isLoggedIn:true}
    default:
      return state;
  }
});
