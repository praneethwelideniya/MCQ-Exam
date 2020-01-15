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

export default class SplashScreen extends React.Component {


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
