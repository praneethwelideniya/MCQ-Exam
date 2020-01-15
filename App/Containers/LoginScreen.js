import React,  { Component } from 'react'
import { Text, View, Image, StyleSheet,Dimensions,TouchableOpacity,TextInput } from 'react-native'
import { moderateScale } from "../Helpers/ResponsiveFonts";
import Constants from "../Constants";
import * as AppAction from '../Actions'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import LinearGradient from 'react-native-linear-gradient'
import {AndroidBackHandler} from '../Helpers/BackHandlerAndroid'
import { GoogleSigninButton,GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase'
import { userService } from '../Services/UserService'

class LoginScreen extends Component {

  // Calling this function will open Google for login.
async googleLogin() {
  try {
    // add any configuration settings here:
    await GoogleSignin.configure({
      androidClientId:'1037849384495-t4usdupk9dgedhiuh4c3libcf5bn03op.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
      webClientId:"1037849384495-809ip12jbcpdu4kkojhqj1a8949pvi3v.apps.googleusercontent.com",
      offlineAccess: true
    });

    const data = await GoogleSignin.signIn();

    // create a new firebase credential with the token
    const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
    // login with credential
    const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

    console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));

    userService.createOrSignIn(JSON.stringify(firebaseUserCredential.user.toJSON()));
    this.props.navigation.navigate('App')
  } catch (e) {
    console.warn({success:false,error:e});
  }
}
  state = {
    username: "",
    width:Dimensions.get('window').width,
    isFocused: false,
    focusColor: Constants.Colors.Primary,
    borderWidth: 1,
    anonymous:false
  }
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    console.log(this.props.questions)
    this.setState({username:this.props.user.userName})
  }

  onChangeText(text){
      this.setState({username:text})
  }
  onBlur() {
    this.setState({
      isFocused: false,
      focusColor: Constants.Colors.Secondary,
      borderWidth: 0
    });
  }

  onFocus() {
    this.setState({
      isFocused: true,
      focusColor: Constants.Colors.Secondary,
      borderWidth: 2
    });
  }

  focus() {
    this.inputBox.focus();
  }

  // onChange(event) {
  //     this.props.onChange(event);
  // }

  handleBackButton() {
  return true;
}

  goToQuestionType = () =>{

    if(this.state.anonymous){
      firebase.auth().signInAnonymously()
      .then(() => {
        firebase.auth().currentUser
        .updateProfile({
          displayName: this.state.username
        }).then(function() {
          // Profile updated successfully!
          // "Jane Q. User"
          AppAction.goToQuestionType('QuestionTypes',this.state.username)


          // "https://example.com/jane-q-user/profile.jpg"

        }, function(error) {
          console.warn(error)
        });
      });
    }
    else{
      this.setState({anonymous:true})
    }

  };
  render() {
    return (
      <AndroidBackHandler onBackButtonPressAndroid={this.handleBackButton} >
        <View style={styles.container}>
          <LinearGradient
        colors={['#240b36','#c31432']}
        style={{flex: 1}}
        start={{ x: 0.7, y: 0.3 }}
        end={{ x: 0.8, y: 1 }}
      >
          <View style={{flex:4,alignItems: "center", justifyContent: "center"}}>
              <Image
                style={{
                  height: moderateScale(100),
                  width: moderateScale(100)
                }}
                source={Constants.Images.Common.logo}
              />
          </View>
          {this.state.anonymous?
          (<View style={{flex:4}}>
            <View style={{flex:1,alignItems:"center", justifyContent: "center"}} >
            <Text style={{fontSize:25, color:'white', fontSize:20}}>Enter your nick name</Text>
          </View>
          <View style={{flex:3,justifyContent: "flex-start",alignItems:'center'}}>
             <TextInput
               ref={ref => (this.inputBox = ref || "inputbox")}
               style={[styles.input,{borderColor: this.state.focusColor,borderWidth: this.state.borderWidth}]}
               value={this.state.username}
               placeholder='Enter nick name'
               placeholderTextColor='gray'
               editable={true}
               maxLength={15}
               onFocus={() => this.onFocus()}
               onBlur={() => this.onBlur()}
               onChangeText={(text)=>this.onChangeText(text)}
               blurOnSubmit={true}
             />
         </View></View>):(
          <View style={{flex:4,alignItems:"center", justifyContent: "center"}}>
         <GoogleSigninButton
           style={{ width: 4*this.state.width/5, height: 55 }}
           size={GoogleSigninButton.Size.Wide}
           color={GoogleSigninButton.Color.Dark}
           onPress={this.googleLogin}
           disabled={this.state.isSigninInProgress} /></View>)
                }
          <View opacity={this.state.username.length<2?0.3:1} style={{flex:3,justifyContent: "flex-start"}}>
              <TouchableOpacity style={{flex:1,alignItems: "center",justifyContent:"center"}} onPress={()=>{this.goToQuestionType()}} >
                     <LinearGradient
                       colors={["#f55010", "#f55010"]}
                       style={{flex: 1}}
                       style={{flexDirection:'row',margin:5,alignItems: "center",height:55,width:4*this.state.width/5,borderRadius:25} }
                     >
                     <Text style={{flex:2,textAlign:'center',fontSize:20, color:'white',fontWeight:'100'}}>
                      {!this.state.anonymous? "Skip Login" : "Enter" }
                     </Text>
                     </LinearGradient>
              </TouchableOpacity>
          </View>
          </LinearGradient>
        </View>
        </AndroidBackHandler>
    );
  }
}

// const mapStateToProps = state => ({
//
// });
const mapDispatchToProps = dispatch => ({
  AppAction: bindActionCreators(AppAction, dispatch)
});

const mapStateToProps = state => ({
  user: state.userReducer,
  questions: state.questions
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);

const styles = StyleSheet.create({
  input: {
    width: 4*Dimensions.get('window').width/5,
    fontSize: 22,
    fontWeight: "500",
    height: 55,
    backgroundColor: "white",
    color: "black",
    borderRadius:25,
    paddingHorizontal:moderateScale(20)
  },
  container: {
    flex: 1
  }
});
