import * as Types from "../../ActionTypes";
const initialState = {
  error: false,
  medium : 'english',
  noOfMcqs : '10',
  examSelected :false,
  selectedExam:{},
  change_medium : false
};

export default (user = (state = initialState, action) => {
  switch (action.type) {
    case Types.CLEARERROR:
        return {
          error : false
        }
    case Types.MAKEERROR:
        return {
          error : true
        }
    case Types.SETEXAM:
          return {
            ...state,
            examSelected : true,
            selectedExam :{id:action.payload.id,name:action.payload.name}
          }
    case Types.CLEAREXAM:
          return {
            ...state,
            examSelected : false,
            selectedExam :{}
          }
    case Types.SETNOOFMCQ:
          return {
            ...state,
            noOfMcqs : action.payload,
          }
    case Types.SETMEDIUM:
          return {
            ...state,
            medium : action.payload,
            change_medium:true
          }
    case "COMPLETEMEDIUMCHAGE":
          return {
            ...state,
            change_medium:false
          }
    default:
      return state;
  }
});
