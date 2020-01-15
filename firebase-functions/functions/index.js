const functions = require('firebase-functions');
const cors = require('cors')({
  origin: true
});
const admin = require('firebase-admin');
admin.initializeApp();
const exams =  admin.firestore().collection('exams')
const users = admin.firestore().collection('users')
const questionCollection = admin.firestore().collection('questions')
const subjects = admin.firestore().collection('subjects')



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.addQuestion = functions.https.onRequest( (req, res) => {
 return cors(req, res, () => {
  if(req.method !== 'POST') {
   return res.status(401).json({
    message: 'Not allowed'
   })
  }

  const request = req.body
    questionCollection.add(request).then(writeResult => {
      res.status(200).json({sccess:true})
  }, (error) => {
     res.status(error.code).json({
      success:false,message: 'Something went wrong. ${error.message}'
     })
    })
 })
})


exports.addExams = functions.https.onRequest((req, res) => {
 return cors(req, res, () => {
  if(req.method !== 'POST') {
   return res.status(401).json({
    message: 'Not allowed'
   })
  }
  exams.add(req.body).then(writeResult => {
    res.status(200).json(writeResult)
}, (error) => {
   res.status(error.code).json({
    message: 'Something went wrong. ${error.message}'
   })
  })
 })
})

exports.createOrSignIn = functions.https.onRequest((req, res) => {
 return cors(req, res, () => {
  if(req.method !== 'POST') {
   return res.status(401).json({
    message: 'Not allowed'
   })
  }
  const user = req.body
  users.doc(user.uid).set({
    email:user.email,
    name :user.displayName,
    isAnonymous :user.isAnonymous,
    coins : 250
  })
  .then(writeResult => {
    res.status(200).json(writeResult)
}, (error) => {
   res.status(error.code).json({
    message: 'Something went wrong. ${error.message}'
   })
  })
 })
})

exports.addQuestions = functions.https.onRequest((req, res) => {
 return cors(req, res, () => {
  if(req.method !== 'POST') {
   return res.status(401).json({
    message: 'Not allowed'
   })
  }
  var batch = admin.firestore().batch();
  const request = req.body
  request.questions.forEach((question)=>{
    batch.set(questions.doc(),
    {
      subject_id:request.subject_id,
      question :question.question,
      incorrect_answers :question.incorrect_answers,
      correct_answer : question.correct_answer
    }
    )
  });
    return batch.commit().then(function () {
      res.status(200).json({success:true})
    });
 })
})

exports.addQuestions2 = functions.https.onRequest((req, res) => {
 return cors(req, res, () => {
  if(req.method !== 'POST') {
   return res.status(401).json({
    message: 'Not allowed'
   })
  }
  var batch = admin.firestore().batch();
  const request = req.body
  request.questions.forEach((question)=>{
    batch.set(questions.doc(),
    {
      subject_id:request.subject_id,
      paper:request.paper,
      q_num : question.q_num,
      question :question.question,
      incorrect_answers :question.incorrect_answers,
      correct_answer : question.correct_answer
    }
    )
  });
    return batch.commit().then(function () {
      res.status(200).json({success:true})
    });
 })
})
// exports.addQuestions = functions.https.onRequest((req, res) => {
//  return cors(req, res, () => {
//   if(req.method !== 'POST') {
//    return res.status(401).json({
//     message: 'Not allowed'
//    })
//   }
//
//   const request = req.body
//   var questionTable = admin.database().ref('/questions/'+request.subject_id);
//   request.questions.forEach((question)=>{
//     questionTable.push().set(
//     {
//       question :question.question,
//       incorrect_answers :question.incorrect_answers,
//       correct_answer : question.correct_answer
//     }
//     )
//   });
//   return questionTable.on('value', (snapshot) => {
//    snapshot.forEach((item) => {
//    });
//    res.status(200).json({success:"true"})
//   }, (error) => {
//    res.status(error.code).json({
//     message: 'Something went wrong. ${error.message}'
//    })
//   })
//
//  })
// })

// exports.getQuestions = functions.https.onRequest((req, res) => {
//  return cors(req, res, () => {
//   if(req.method !== 'GET') {
//    return res.status(401).json({
//     message: 'Not allowed'
//    })
//   }
//
//   const numberOfUsers = 30;
//   const randomIndex = Math.floor(Math.random() * numberOfUsers);
//   var questionTable = admin.database().ref('/questions/0001');
//
//   questionTable.limitToFirst(randomIndex).limitToLast(1).once("value", function(snapshot) {
//     return res.status(200).json({success:"truee",data:snapshot.val()})
//   }, function (errorObject) {
//     return res.status(404).json({success:"false",error:errorObject.code})
//   });
//
//  })
// })
