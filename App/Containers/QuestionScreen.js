import React, {Component} from 'react'
import {View,Text,Dimensions,TouchableOpacity,ScrollView} from 'react-native'
import * as AppAction from '../Actions'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { categories as questionTypes } from "../data.json"
import AnswerListButton from "../Components/AnswerListButton"
import LinearGradient from 'react-native-linear-gradient'
import shuffle from 'shuffle-array';
import Icon from 'react-native-vector-icons/AntDesign';
import { HeaderBackButton } from 'react-navigation';
import NavigationService from '../Services/NavigationService'


const Entities = require('html-entities').AllHtmlEntities;

const entities = new Entities();

class QuestionScreen extends Component {
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
             Quiz - {navigation.getParam('questiontype')}
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
          headerLeft :<HeaderBackButton tintColor ='white' onPress={() => {NavigationService.navigate("App")}} />,

        headerRight :(
          <View style={{flex:1}}>
            <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 25
            }}>
          {navigation.getParam('question_num')}/{navigation.getParam('noOfMcqs')}
            </Text>
          </View>)
          };

    };

  constructor(props) {
    super(props);
    this.state = {
      width:Dimensions.get('window').width,
      questions : [],
      answers : [],
      no_of_questions:10,
      results : [],
      review : false,
      selected_id : 0,
      current_question_num:1,
      answered : false

    };
    this.onLayout = this.onLayout.bind(this);
  }

  onLayout(e) {
    this.setState({
      width: Dimensions.get('window').width
    });
  }
  componentDidMount(){
    this.props.navigation.setParams({'noOfMcqs':this.props.common.noOfMcqs})
    this.props.navigation.setParams({'question_type':this.props.questions.questionTypeName})
    this.setState({no_of_questions:this.props.questions.questions.length})
    this.getAnswers(0)
   }

  _onPressItem = (ans_id,answer) => {
    let arr = this.state.results
    arr.push({id:this.state.current_question_num,results:{correct:(ans_id==3),answer:entities.decode(answer)}})
    if(ans_id==3){
      this.props.navigation.setParams({score:this.props.navigation.getParam('score')+1})
    }
    this.setState({results:arr,selected_id:ans_id,answered:true})

  };
  getAnswers(number){
      let incorrect_answers = this.props.questions.questions[number].incorrect_answers;
      incorrect_answers.forEach( function(data,index,arr){
        arr[index] = {id:index,answer:data}
      })

      incorrect_answers[incorrect_answers.length] = {id : incorrect_answers.length, answer :this.props.questions.questions[number].correct_answer}

      this.setState({answers:shuffle(incorrect_answers)})
    }

  goToNext(){
    if(this.state.current_question_num === this.state.no_of_questions){
      this.props.AppAction.goToResults({score:this.props.navigation.getParam('score'),questiontype:this.props.navigation.getParam('questiontype')},this.state.results)
    }
    else{
      this.setState({answered:false})
      this.getAnswers(this.state.current_question_num)
      this.props.navigation.setParams({question_num:this.state.current_question_num+1})
      this.setState({current_question_num:this.state.current_question_num+1})
    }
  }
  render() {
      return (
          <View style={{flex:1}}>
          <LinearGradient
            colors={['#240b36','#c31432']}
            style={{flex: 1}}
            start={{ x: 0.6, y: 0.3 }}
            end={{ x: 0.7, y: 1 }}
          >
            <View opacity = {0.8} style={{alignItems:'center',flex:1,borderRadius:5,marginVertical:5,marginHorizontal:5,backgroundColor:"white"}}>
             <ScrollView keyboardShouldPersistTaps='always'>
              <Text style={{textAlign:'center',fontSize:15,marginHorizontal:5,fontWeight:'200' }}>{entities.decode(this.props.questions.questions[this.state.current_question_num-1].question)}</Text>
            </ScrollView>
          </View>
              {this.state.answers.length>0?
              <View style ={{flex:3}}>
              <ScrollView keyboardShouldPersistTaps='always'>
              <AnswerListButton
                answer={this.state.answers[0]}
                onPressItem={this._onPressItem}
                width={this.state.width}
                answered = {this.state.answered}
              />
              <AnswerListButton
                answer={this.state.answers[1]}
                onPressItem={this._onPressItem}
                width={this.state.width}
                answered = {this.state.answered}
              />
              <AnswerListButton
                answer={this.state.answers[2]}
                onPressItem={this._onPressItem}
                width={this.state.width}
                answered = {this.state.answered}
              />
              <AnswerListButton
                answer={this.state.answers[3]}
                onPressItem={this._onPressItem}
                width={this.state.width}
                answered = {this.state.answered}
              />
            {this.state.answers.length > 4?
              (<AnswerListButton
                answer={this.state.answers[4]}
                onPressItem={this._onPressItem}
                width={this.state.width}
                answered = {this.state.answered}
              />):null
            }
          </ScrollView>
          </View>:null
            }
            <TouchableOpacity disabled = {!this.state.answered} style={{flex:1,alignItems: "center",justifyContent:"center"}} onPress={()=>{this.goToNext()}} >
                 <View opacity = {!this.state.answered?0.4:1} style={{marginBottom:20}}>
                   <LinearGradient
                     colors={["#f55010", "#f55010"]}
                     style={{flex: 1}}
                     start={{ x: 0, y: 0 }}
                     end={{ x: 1, y: 1 }}
                     style={{flexDirection:'row',margin:5,alignItems: "center",height:50,width:4*this.state.width/5,borderRadius:25} }
                   >
                   <View style={{flex:1}}/>
                   <Text style={{flex:2,textAlign:'center',fontSize:20, color:'white',fontWeight:'100'}}>
                    NEXT
                   </Text>
                   <View style={{flex:1,alignItems:'flex-end',marginRight:5}}>
                   <Icon name='right' size={30} color="white" />
                   </View>
                   </LinearGradient>
                 </View>
              </TouchableOpacity>
        </LinearGradient>
      </View>)
  }
}

const mapDispatchToProps = dispatch => ({
  AppAction: bindActionCreators(AppAction, dispatch)
});
const mapStateToProps = state => ({
  common: state.common,
  questions : state.questions
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionScreen);
