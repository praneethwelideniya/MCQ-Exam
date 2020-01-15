import axios from 'axios'

/**
 * This is an example of a service that connects to a 3rd party API.
 *
 * Feel free to remove this example from your application.
 */
const userApiClient = axios.create({
  /**
   * Import the config from the App/Config/index.js file
   */
  baseURL: 'https://us-central1-sl-exam-mcq.cloudfunctions.net',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
})

function createOrSignIn(user) {
  return userApiClient.post('/createOrSignIn',user)
  .then(function (response) {
    console.warn({success:true,res:response});
    return response.data
  })
  .catch(function (error) {
    console.warn({success:false,error:error});
    return {results:'error',error:error}
  });
}

export const userService = {
  createOrSignIn,
}
