import React,{ Component } from 'react'
import { Text,View,Dimensions,FlatList,ScrollView,TouchableOpacity,Alert,StyleSheet,ActivityIndicator } from 'react-native'
import ListButton from '../Components/ListButton'
import * as AppAction from '../Actions'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import LinearGradient from 'react-native-linear-gradient'
import firebase from 'react-native-firebase'
import {AndroidBackHandler} from '../Helpers/BackHandlerAndroid'
import NavigationService from '../Services/NavigationService'
import { HeaderBackButton } from 'react-navigation';
const subref=firebase.firestore().collection('subjects')
const examdoc = firebase.firestore().collection('exams');
const {height,width} =Dimensions.get('window')


class SubjectsScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle :{
        backgroundColor: '#240b36'
      },
      headerTitleStyle: {
        textAlign: 'center',
        alignSelf:'center'
      },
      headerTitle : (
       <View style={{flex:1}}>
         <Text
           style={{
             color: 'white',
             textAlign :'center',
             fontWeight: 'bold',
             fontSize: 18,
           }}>
           Subjects
         </Text>
       </View>
     ),
     headerLeft :<HeaderBackButton tintColor ='white' onPress={() => {NavigationService.navigateAndReset('ExamTypes')}} />,
    };
    };

    constructor(props) {
      super(props);
      this._onPressItem = this._onPressItem.bind(this);
      this.loadSubjects = this.loadSubjects.bind(this);
      this.firstLoad = this.firstLoad.bind(this);
  }

  state = {
    pointerEvents:'auto',
    subjects:[],
  };
  async componentDidMount(){
      await this.loadSubjects(this.props.common.selectedExam)
  }

  componentDidUpdate(){

    if(this.props.common.error){
      console.log(this.props.common)
      this.props.AppAction.clearCommon()
      Alert.alert(
        'Error',
        'Something went wrong. Check your internet connection',
      [
        {text: 'OK', onPress: () =>{this.props.navigation.setParams({pointerEvents:'auto'})}},
      ],
      { cancelable: true }
    )
    }
    if(this.props.common.change_medium){
        this.loadSubjects(this.props.common.selectedExam)
        this.props.AppAction.completeMediumChange();
  }
}
  async firstLoad(subject_id){
    var qTypes = [];
    firebase.firestore().enableNetwork()
    await subref.where('exams','array-contains', examdoc.doc(subject_id)).onSnapshot( async (subss)=>{
      console.warn(subss.metadata)
        await subss.forEach(async ss => {
          //console.warn(ss.data().name)
          await qTypes.push({name:this.props.common.medium=='english'?ss.data().name:ss.data().sinhala_name, sub:ss ,id:ss.id})
          this.setState({subjects : qTypes})
        })
    })

  }

  async loadSubjects(subject){
    var qTypes = [];
    firebase.firestore().disableNetwork()
    await subref.where('exams','array-contains', examdoc.doc(subject.id)).onSnapshot( async (subs)=>{
      if(subs.length>0){
        console.warn(subs.metadata)
        await subs.forEach(async s => {
          await qTypes.push({name:this.props.common.medium=='english'?s.data().name:s.data().sinhala_name, sub:s ,id:s.id})
          this.setState({subjects : qTypes})
        })
      }
      else{
        this.firstLoad(subject.id)
      }
    })

  }

  async _onPressItem(name,id,sub) {
    this.props.AppAction.setQuestionTypes('Questions',id,name,this.props.common.medium,this.props.common.noOfMcqs)
  }


  render() {
    return (
        <View style={{flex: 1}} pointerEvents={this.props.navigation.getParam("pointerEvents")}>
          <LinearGradient
            colors={['#240b36','#c31432']}
            style={{flex: 1}}
            start={{ x: 0.6, y: 0.3 }}
            end={{ x: 0.7, y: 1 }}
            >
        <View style={{flex: 1,margin:1}}>
          {
            (this.state.subjects.length==0)
            ?(<ActivityIndicator style = {{alignItems:'center',justifyContent:'center',flex:1}} size={width/4} color="white" />):
            (<ScrollView keyboardShouldPersistTaps='always'>
              <ListButton
                onPressItem={this._onPressItem}
                data={this.state.subjects}
                onPressChangeEnable={false}
                numOfColumn = {1}
              />
            </ScrollView>)
          }
        </View>
      </LinearGradient>
        </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  AppAction: bindActionCreators(AppAction, dispatch)
});
const mapStateToProps = state => ({
  user: state.userReducer,
  questions: state.questions,
  common: state.common,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubjectsScreen);
