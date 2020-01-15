import axios from 'axios'
import firebase from 'react-native-firebase'
const subref = firebase.firestore().collection('subjects')
const examdoc = firebase.firestore().collection('exams');
/**
 * This is an example of a service that connects to a 3rd party API.
 *
 * Feel free to remove this example from your application.
 */
const userApiClient = axios.create({
  /**
   * Import the config from the App/Config/index.js file
   */
  baseURL: 'https://opentdb.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
})

async function getQuestions(id,medium,limit) {
  await firebase.firestore().enableNetwork()
  var random = await crypto.getRandomValues(new Uint32Array(2))[0]
  var position ='random_1' ;
  switch (Math.floor(Math.random() * 3) + 1) {
    case 3:
      position = 'random_3'
      break;
    case 2:
      position = 'random_2'
      break;
    default:
      position = 'random_1'
  }
  console.warn(position)
  var error =false;
  var qset=[];

console.warn(medium)
console.warn(id)
  await firebase.firestore().collection('questions').where('medium','==',medium).where('subject_id', '==', id).where(position,'>=',random).limit(Number(limit)).get()
  .then(function(questions){
    console.warn(questions.docs.length)
    if(questions.docs.length != 0){
       questions.docs.forEach(q=>{
         console.warn(q.data().question)
        qset.push({
          correct_answer:q.data().correct_answer,
          question:q.data().question,
          incorrect_answers:q.data().incorrect_answers
        })
      })
    }
  }).catch(err =>{
    error =true
    console.warn(err)
  })

  if(qset.length < limit){
    await firebase.firestore().collection('questions').where('medium','==',medium).where('subject_id', '==', id).where(position,'<',random).orderBy(position,'desc').limit(Number(limit-qset.length)).get()
    .then(function(questions){
      console.warn(questions.docs.length)
      if(questions.docs.length != 0){
         questions.docs.forEach(q=>{
           console.warn(q.data().question)
          qset.push({
            correct_answer:q.data().correct_answer,
            question:q.data().question,
            incorrect_answers:q.data().incorrect_answers
          })
        })
      }
    }).catch(err =>{
      error =true
      console.warn(err)
    })
  }
  if(error || qset.length<1){
    return {results:"error",error:error}
  }
  else{
    return {results:qset}
  }
  //return {results:"error",error:error}
}

async function getExams(medium,disable){
    var exams = []
    if(disable){
      firebase.firestore().disableNetwork()
    }
    await firebase.firestore().collection('exams').onSnapshot((subs)=>{
      console.warn(subs.metadata)
      subs.forEach(s=>{
        exams.push({name:medium=='english'?s.data().name:s.data().sinhala_name, sub:s ,id:s.id})
      })
    })
    return exams;
}

const a = async (medium) => {
  var exams = [];
  await firebase.firestore().collection('exams').onSnapshot((subs)=>{
    console.warn(subs.metadata)
    subs.forEach(s=>{
      exams.push({name:medium=='english'?s.data().name:s.data().sinhala_name, sub:s ,id:s.id})
    })
  })
  return exams;
}

async function getSubjects(medium,id,disable){
    var subjects = [];
    if(disable){
      firebase.firestore().disableNetwork()
    }
    subref.where('exams','array-contains', examdoc.doc(id))
    .onSnapshot( (subs)=>{
      console.warn(subs.metadata)
      subs.forEach(async s=>{
        await subjects.push({name:medium=='english'?s.data().name:s.data().sinhala_name, sub:s ,id:s.id})
      })
      if(disable){
          firebase.firestore().enableNetwork()
      }
    })
    return subjects;
}

export const questionService = {
  getQuestions,
  getSubjects,
  getExams
}
