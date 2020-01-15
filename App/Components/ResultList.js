import React,{Component} from 'react'
import {View,Text} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/AntDesign';
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

class ResultList extends Component {

render(){
  return(
    <View opacity = {0.8} style={{flex:1,borderRadius:5,marginVertical:5,marginHorizontal:this.props.width/20,alignItems: "center",backgroundColor:"white"}}>
        <View style = {{flex:1, flexDirection:'row' }}>
          <Text style={{flex:1,fontSize:17,marginLeft:5 }}>{this.props.id} </Text>
          <Text style={{textAlign:'left',flex:13,fontSize:17}}>{entities.decode(this.props.questions.questions[this.props.id-1].question)}</Text>
        </View>
        <View style = {{flex:2, flexDirection:'row' }}>
          <View style = {{flex:1}}></View>
          <View style={{flex:9,alignItems:'flex-start',margin:10}}>
            <Text style={{textAlign:'left', fontSize:15}}>Correct Answer : </Text>
            <Text style={{textAlign:'left',marginLeft:5,fontSize:17}}>{entities.decode(this.props.questions.questions[this.props.id-1].correct_answer)}</Text>
              <Text style={{textAlign:'left', fontSize:15}}>Your Answer : </Text>
              <Text style={{textAlign:'left',marginLeft:5,fontSize:17}}>{entities.decode(this.props.results.answer)}</Text>
        </View>
          <View style={{flex:5,alignItems:'flex-end',margin:10}}>
            <Icon name={this.props.results.correct?'smileo':'frowno'} size={60} color={this.props.results.correct?'green':'red'} />
          </View>
      </View>
  </View>
  )
}
}

// const mapDispatchToProps = dispatch => ({
//   AppAction: bindActionCreators(AppAction, dispatch)
// });
const mapStateToProps = state => ({
  questions : state.questions
});

export default connect(
  mapStateToProps,
  null
)(ResultList);
