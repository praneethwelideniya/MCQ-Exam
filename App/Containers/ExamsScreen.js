import React,{ Component } from 'react'
import { Text,View,Dimensions,FlatList,ScrollView,TouchableOpacity,Alert,StyleSheet,TouchableHighlight,ActivityIndicator,Modal,Picker } from 'react-native'
import ListButton from '../Components/ListButton'
import * as AppAction from '../Actions'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import LinearGradient from 'react-native-linear-gradient'
import firebase from 'react-native-firebase'
import {AndroidBackHandler} from '../Helpers/BackHandlerAndroid'
import NavigationService from '../Services/NavigationService'
const examdoc = firebase.firestore().collection('exams');
const {height,width} =Dimensions.get('window')


class ExamsScreeen extends Component {

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
       <View
         style={{
           flex:1,
           justifyContent: 'center',
         }}>
         <View style={{flex:1}}>
         <Text
           style={{
             color: 'white',
             textAlign: 'center',
             fontWeight: 'bold',
             fontSize: 18,
           }}>
           Exam List
         </Text>
         </View>
         </View>
     ),
        };
    };

    constructor(props) {
      super(props);
      this._onPressItem = this._onPressItem.bind(this);
      this.loadExams = this.loadExams.bind(this);
  }

  state = {
    width:Dimensions.get('window').width,
    pointerEvents:'auto',
    exams:[],
    modalVisible:false
  };
  async componentDidMount(){
      await this.loadExams();
      this.setModalVisible(!this.state.modalVisible);
  }
   componentUnmount(){
     this.setModalVisible(false);
   }
  componentDidUpdate(){
    if(this.props.common.change_medium){
        this.loadExams()
      this.props.AppAction.completeMediumChange();
    }
  }

  async firstLoad(){
    var qTypes = [];
    firebase.firestore().enableNetwork()
    await examdoc.onSnapshot( async (subss)=>{
      console.warn(subss.metadata)
        await subss.forEach(async ss => {
          //console.warn(ss.data().name)
          await qTypes.push({name:this.props.common.medium=='english'?ss.data().name:ss.data().sinhala_name, sub:ss ,id:ss.id})
          this.setState({exams : qTypes})
        })
    })

  }


  async loadExams(){
    var qTypes = [];
    firebase.firestore().disableNetwork()
    await examdoc.onSnapshot( async (subs)=>{
      if(subs.length>0){
        console.warn(subs.metadata)
        await subs.forEach(async s => {
          await qTypes.push({name:this.props.common.medium=='english'?s.data().name:s.data().sinhala_name, sub:s ,id:s.id})
          this.setState({exams : qTypes})
        })
      }
      else{
        this.firstLoad()
      }
    })
  }


  async _onPressItem(name,id,sub) {
    this.props.AppAction.setExam(id,name,sub)
  }

  handleBackButton = () => {
    return true
    }

    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }

  render() {
    return (
      <AndroidBackHandler onBackButtonPressAndroid={this.handleBackButton} >

        <Modal
          presentationStyle="overFullScreen"
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <View style={{backgroundColor:'gray',height:height/3,width:2*width/3,alignItems:'center',justifyContent:'center',borderRadius:15}}>
                <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    width:2*width/3,
                    margin:10
                  }}
                >
                <Text style={{textAlign:'center',fontSize:18,marginBottom:-10 }} >Select Medium</Text>
                <Picker
                 selectedValue={this.props.common.medium}
                 style={{width: 2*width/3,marginBottom:-10}}
                 itemTextStyle={{ fontSize: 18, color: 'white' }}
                 onValueChange={(itemValue, itemIndex) =>
                   this.props.AppAction.changeMedium(itemValue)
                 }
                 mode = "dialog"
                 >
                  <Picker.Item style={{fontSize:20}} label="Sinhala" value="sinhala" />
                  <Picker.Item label="English" value="english" />
                </Picker>
              </View>
              <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                  width:2*width/3,
                  margin:10
                }}
              >
              <Text style={{textAlign:'center',fontSize:18,marginBottom:-10 }} >Select No of M.C.Qs</Text>
              <Picker
               selectedValue={this.props.common.noOfMcqs}
               style={{width: 2*width/3,marginBottom:-10}}
               itemTextStyle={{ fontSize: 18, color: 'white' }}
               onValueChange={(itemValue, itemIndex) =>
                 this.props.AppAction.changeNoOfMcqs(itemValue)
               }
               mode = "dialog"
               >
               <Picker.Item label="10" value={10} />
               <Picker.Item label="15" value={15} />
               <Picker.Item label="20" value={20} />
               <Picker.Item label="25" value={1} />
              </Picker>
            </View>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
                style={{backgroundColor:'green',width:width/3,borderRadius:10}}>
                <Text style={{fontSize:25,textAlign:'center'}}>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <View style={{flex: 1}} pointerEvents={this.props.navigation.getParam("pointerEvents")}>
          <LinearGradient
            colors={['#240b36','#c31432']}
            style={{flex: 1}}
            start={{ x: 0.6, y: 0.3 }}
            end={{ x: 0.7, y: 1 }}
            >
        <View style={{margin:1}}>
          {
            this.state.exams.length==0
            ?(<ActivityIndicator style = {{alignItems:'center',justifyContent:'center',flex:1}} size={width/4} color="white" />):
            (<ScrollView keyboardShouldPersistTaps='always'>
              <ListButton
                onPressItem={this._onPressItem}
                data={this.state.exams}
                onPressChangeEnable={false}
                numOfColumn = {2}
              />
            </ScrollView>)
          }
          {!this.state.modalVisible?
          (<TouchableHighlight
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }} style={ styles.bottomView} >

                  <Text style={styles.textStyle}>Settings</Text>

               </TouchableHighlight>):
             null}
        </View>

      </LinearGradient>
        </View>
      </AndroidBackHandler>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  AppAction: bindActionCreators(AppAction, dispatch)
});
const mapStateToProps = state => ({
  questions: state.questions,
  common: state.common,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExamsScreeen);

const styles = StyleSheet.create({
  bottomView:{

    width: '100%',
    height: 30,
    backgroundColor: '#FF9800',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    position: 'absolute',

  },

  textStyle:{

    color: '#fff',
    fontSize:22
  }
});
