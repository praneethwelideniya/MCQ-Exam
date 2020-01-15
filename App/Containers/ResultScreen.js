import React, {Component} from 'react'
import {View,Text,Dimensions,FlatList,TouchableOpacity,ScrollView} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import * as AppAction from '../Actions'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import ResultList from '../Components/ResultList'
import { HeaderBackButton } from 'react-navigation';
import NavigationService from '../Services/NavigationService'

const Entities = require('html-entities').AllHtmlEntities;

const entities = new Entities();

class ResultScreen extends Component {

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
                 Results - {navigation.getParam('questiontype')}
               </Text>
               <Text
                 style={{
                   color: 'white',
                   textAlign :'center',
                   fontWeight: 'bold',
                   fontSize: 20,
                 }}>
                 Score : {navigation.getParam('score')*10}%
               </Text>
             </View>
           ),
           headerLeft :<HeaderBackButton tintColor ='white' onPress={() => {NavigationService.navigate("QuestionTypes",{pointerEvents:'auto'})} } />,
          };

    };
    componentDidMount(){

    }

  constructor(props) {
    super(props);
    this.state = {
      width:Dimensions.get('window').width
    };
    this.onLayout = this.onLayout.bind(this);
  }

  onLayout(e) {
    this.setState({
      width: Dimensions.get('window').width
    });
  }

  _keyExtractor = (item, index) => "result_id-"+item.id;

  _renderItem = ({item}) => (
    <ResultList
      id={item.id}
      results={item.results}
      width={4*(this.state.width/5)}
    />
  );
  _onPress(){
    this.props.AppAction.exitQuiz()
  }
  render() {
    return (
      <View style={{flex:1}}>
        <LinearGradient
          colors={['#240b36','#c31432']}
          style={{flex: 1}}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        >
          <View style={{flex:7}}>
            <ScrollView keyboardShouldPersistTaps='always'>
              <FlatList
                data={this.props.questions.results}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
              />
            </ScrollView>
          </View>
            <TouchableOpacity  style={{flex:1,alignItems: "center",justifyContent:"center"}} onPress={()=>{this.props.navigation.goBack(null)}} >

                   <LinearGradient
                     colors={["#f55010", "#f55010"]}
                     style={{flex: 1}}
                     start={{ x: 0.6, y: 0.3 }}
                     end={{ x: 0.7, y: 1 }}
                     style={{flexDirection:'row',margin:5,alignItems: "center",height:50,width:4*this.state.width/5,borderRadius:25} }
                   >
                   <Text style={{flex:2,textAlign:'center',fontSize:20, color:'white',fontWeight:'100'}}>
                    EXIT
                   </Text>
                   </LinearGradient>
            </TouchableOpacity>
        </LinearGradient>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  AppAction: bindActionCreators(AppAction, dispatch)
});
const mapStateToProps = state => ({
  questions : state.questions
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultScreen);
