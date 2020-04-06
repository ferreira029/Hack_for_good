import { modalReducer } from './modalReducer';
import { combineReducers } from 'redux';
export const Reducers = combineReducers({
  modalState: modalReducer
});