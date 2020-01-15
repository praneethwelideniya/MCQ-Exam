import React, { Component } from 'react'
import NavigationService from '../Services/NavigationService'
import AppNavigator from '../Navigators/AppNavigator'
import { View,Text,StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import * as AppAction from '../Actions'
import { bindActionCreators } from "redux";

class RootScreen extends Component {

  state = {
    addShow:true
  }

  render() {
    return (

      <View style={styles.container}>
        <AppNavigator
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef)
          }}
        />
      </View>
    )
  }
}


const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  AppAction: bindActionCreators(AppAction, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootScreen)

const styles = StyleSheet.create({
  container: {
    flex:1
  },
})
