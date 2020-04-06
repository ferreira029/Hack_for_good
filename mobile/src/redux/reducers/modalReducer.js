import { CLICK_UPDATE_VALUE } from './../action/actionTypes';

const initialState = {
  visibleHelp: false,
};
export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLICK_UPDATE_VALUE:
      return {
        ...state,
        visibleHelp: action.visibleHelp
      };
    default:
      return state;
  }
};