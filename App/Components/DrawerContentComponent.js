import React,{ Component } from 'react'
import { Text,View,Dimensions,TouchableOpacity,Image,Picker,Modal,TouchableHighlight } from 'react-native'
const {height,width} = Dimensions.get('window')
import { GoogleSigninButton,GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase'
import { userService } from '../Services/UserService'
import * as AppAction from '../Actions'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";

class DrawerContentComponent extends Component {

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

      userService.createOrSignIn(JSON.stringify(firebaseUserCredential.user.toJSON()));
    } catch (e) {
      console.warn({success:false,error:e});
    }
  }

  componentDidMount(){
  }

  render() {
    return (
      <View style={{flex:1, backgroundColor:'gray',margin:2}}>

        <View style = {{flex:1, alignItems:'center', margin:height/20}}>
        <Image
        style={{width: height/5, height:height/5,borderRadius: height/10}}
        source={{uri:'https://www.thecocktaildb.com/images/media/drink/ft8ed01485620930.jpg'}}
        />
        </View>
        <View style = {{flex:4}}>
          <Text style ={{fontSize:25,textAlign:"center"}}>Praneeth Welideniya</Text>
          <Text style ={{fontSize:30,textAlign:"center"}}>{this.props.user.coin}</Text>
            <GoogleSigninButton
              style={{height: 55,alignItems:"center" }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={this.googleLogin} />
            <Text style ={{fontSize:10,textAlign:"center"}}>(Recommended)</Text>
          <View style = {{flex:0.2,flexDirection:'row',backgroundColor:'white',marginHorizontal:2,marginVertical:10}}>
            <View style={{flex:3,justifyContent:'center'}}>
              <Text style ={{fontSize:20,textAlign:"left", flex:2,marginHorizontal:2}}>Medium</Text>
            </View>
            <View style ={{fontSize:20,alignItems:"flex-end",flex:1,marginHorizontal:2,justifyContent:'center'}}>
              <Picker
               selectedValue={this.props.questions.medium}
               style={{width: width/3}}
               itemTextStyle={{ fontSize: 18, color: 'white' }}
               onValueChange={(itemValue, itemIndex) =>
                 this.props.AppAction.changeMedium(itemValue)
               }>
                <Picker.Item label="Sinhala" value="sinhala" />
                <Picker.Item label="English" value="english" />
              </Picker>
            </View>
          </View>
          <View style = {{flex:0.2,flexDirection:'row',backgroundColor:'white',marginHorizontal:2,marginVertical:10}}>
            <View style={{flex:3,justifyContent:'center'}}>
              <Text style ={{fontSize:20,textAlign:"left", flex:3,marginHorizontal:2}}>No of M.C.Qs</Text>
            </View>
            <View style ={{fontSize:20,alignItems:"flex-end",flex:1,marginHorizontal:2,justifyContent:'center'}}>
              <Picker
               selectedValue={this.props.questions.noOfMcqs}
               style={{width: width/4}}
               itemTextStyle={{ fontSize: 18, color: 'white' }}
               onValueChange={(itemValue, itemIndex) =>
                 this.props.AppAction.changeNoOfMcqs(itemValue)
               }>
                <Picker.Item label="10" value={10} />
                <Picker.Item label="15" value={15} />
                <Picker.Item label="20" value={20} />
                <Picker.Item label="25" value={25} />
              </Picker>
            </View>
          </View>
        </View>
      </View>
    )

}

}

const mapDispatchToProps = dispatch => ({
  AppAction: bindActionCreators(AppAction, dispatch)
});
const mapStateToProps = state => ({
  user: state.userReducer,
  questions : state.questions
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawerContentComponent);
