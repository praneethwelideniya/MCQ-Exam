import React from 'react'
import {View,Image } from 'react-native'
import { moderateScale } from "../Helpers/ResponsiveFonts";
import Constants from "../Constants";
import LinearGradient from 'react-native-linear-gradient'
import * as AppAction from '../Actions'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import NavigationService from '../Services/NavigationService'
import firebase from 'react-native-firebase'

class LoadingScreen extends React.Component {

  componentDidMount(){
    if(firebase.auth().currentUser==null){
        this.props.navigation.navigate('Login')
    }
    else {
      // if(this.props.examSelected){
      //     this.props.navigation.navigate('SubjectTypes')
      // }else{
          this.props.navigation.navigate('App')


    }
  }

  render() {
    return (
      <View style={{flex:1}}>
        <LinearGradient
      colors={['#240b36','#c31432']}
      style={{flex: 1}}
      start={{ x: 0.7, y: 0.3 }}
      end={{ x: 0.8, y: 1 }}
    >
        <View style={{alignItems: "center", justifyContent: "center",alignSelf:"center"}}>
            <Image
              style={{
                height: moderateScale(100),
                width: moderateScale(100)
              }}
              source={Constants.Images.Common.logo}
            />
        </View>
        </LinearGradient>
      </View>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  AppAction: bindActionCreators(AppAction, dispatch)
});
const mapStateToProps = state => ({
  user: state.userReducer,
  examSelected :state.questions.examSelected
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadingScreen);
