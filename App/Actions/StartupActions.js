import * as Types from "../ActionTypes";
import NavigationService from '../Services/NavigationService'
import { questionService } from '../Services/QuestionService'

export const startup = () => (
  { type: Types.STARTUP}
);

export const goToQuestionType = (screenName,username) =>{
  return dispatch => {
      dispatch({type: Types.SETUSERNAME, payload : username})
      NavigationService.navigate(screenName,{pointerEvents:'auto'});
  };
}

export const setQuestionTypes = (screenName,id,questiontype,medium,limit) => {
  return (dispatch,getState) => {
    dispatch({type: Types.SETQUESTIONTYPE, payload :{id:id,questiontype:questiontype}})
    questionService.getQuestions(id,medium,limit)
    .then(data => {
      if(data.results==='error'){
        //console.warn('making errors')
        dispatch({type:Types.MAKEERROR})
      }
      else{
        dispatch({type:Types.SETQUESTIONS, payload :data.results})
        NavigationService.navigate(screenName,{questiontype:questiontype,score:0,question_num:1});
      }
    }).catch((error)=>{
       //console.log("Api call error");
    })
  }
}


export const goToResults = (params,results) => {
  return dispatch => {
    dispatch({type: Types.COMPLETEQUIZ, payload :results})
    NavigationService.navigate('Results',params)
  }
}

export const clearCommon = () => {
  return dispatch => {
    dispatch({type:Types.CLEARERROR})
  }
}

export const setExam = (id,name,sub) => {
  return dispatch => {
    dispatch({type:Types.SETEXAM,payload:{id:id,name:name}})
    NavigationService.navigateAndReset('SubjectTypes',{sub:sub})
  }
}

export const changeNoOfMcqs = (value) => {
  return dispatch => {
    dispatch({type:Types.SETNOOFMCQ,payload:value})
  }
}

export const changeMedium = (value) => {
  return dispatch => {
    dispatch({type:Types.SETMEDIUM,payload:value})
  }
}
export const completeMediumChange = () => {
  return dispatch => {
    dispatch({type:"COMPLETEMEDIUMCHAGE"})
  }
}
export const navigate = (screenName) => {
  return (dispatch,getState) => {
        NavigationService.navigate(screenName);
  };
};
