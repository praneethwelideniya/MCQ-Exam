import app from "./app";
import user from "./user";
import questions from "./questions";
import common from "./common";

import { combineReducers } from 'redux';

// Redux: Root Reducer
const rootReducer = combineReducers({
  appReducer: app,
  userReducer: user,
  questions : questions,
  common: common
});

// Exports
export default rootReducer;
