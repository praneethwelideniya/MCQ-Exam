import React from 'react'
import { Text, View } from 'react-native';
import { createAppContainer, createStackNavigator,createSwitchNavigator,createDrawerNavigator } from 'react-navigation'
import LoginScreen from '../Containers/LoginScreen'
import SplashScreen from '../Containers/SplashScreen'
import LoadingScreen from '../Containers/LoadingScreen'
import ExamsScreen from '../Containers/ExamsScreen'
import SubjectsScreen from '../Containers/SubjectsScreen'
import ResultScreen from '../Containers/ResultScreen'
import QuestionScreen from '../Containers/QuestionScreen'
import DrawerContentComponent from '../Components/DrawerContentComponent'

/**
 * The root screen contains the application's navigation.
 *
 * @see https://reactnavigation.org/docs/en/hello-react-navigation.html#creating-a-stack-navigator
 */
const StartUpStackNavigator = createStackNavigator(
  {

    // Create the application routes here (the key is the route name, the value is the target screen)
    // See https://reactnavigation.org/docs/en/stack-navigator.html#routeconfigs
    ExamTypes: {
      screen:ExamsScreen
    },
    SubjectTypes: {
      screen:SubjectsScreen
    }
  },
  {
    // By default the application will show the splash screen
    initialRouteName: 'ExamTypes',
    // See https://reactnavigation.org/docs/en/stack-navigator.html#stacknavigatorconfig
    headerLayoutPreset: 'center'
  }
)

const QuestionNavigator = createStackNavigator(
  {

    // Create the application routes here (the key is the route name, the value is the target screen)
    // See https://reactnavigation.org/docs/en/stack-navigator.html#routeconfigs

    Questions : {
      screen:QuestionScreen
    },
    Results:{
      screen:ResultScreen,
    }

  },
  {
    // By default the application will show the splash screen
    initialRouteName: 'Questions',
    // See https://reactnavigation.org/docs/en/stack-navigator.html#stacknavigatorconfig
    headerLayoutPreset: 'center'
  }
)

const DrawerNavigator = createDrawerNavigator({
  Home : StartUpStackNavigator
},{
  initialRouteName : 'Home',
  contentComponent : DrawerContentComponent
})

const InitialNavigator = createSwitchNavigator({
  Splash:{
    screen:LoadingScreen,
    navigationOptions:({navigation})=>({
        header:null
    })
  },
  App: DrawerNavigator,
  Question : QuestionNavigator,
  Login:{
    screen:LoginScreen,
    navigationOptions:({navigation})=>({
        header:null
    })
  }
},{
  initialRouteName: 'Splash',
});

export default createAppContainer(InitialNavigator);
