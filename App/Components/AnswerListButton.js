import React,{ Component } from 'react'
import { Text,View,Dimensions,FlatList,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

export default class AnswerListButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: 'white',
      change_cl: false,
      icon : 'closecircleo',
      clicked : false,
      width : Dimensions.get('window').width,
      height : Dimensions.get('window').height
    };
    this.onLayout = this.onLayout.bind(this);
  }
  componentDidUpdate(){
    if(!this.props.answered && this.state.change_cl){
      this.setState({clicked:false,backgroundColor:'white',change_cl:false})
    }
    if(this.props.answered && this.props.answer.id==3 && !this.state.change_cl){
      this.setState({change_cl:true,backgroundColor:'green'})
      if(this.state.clicked){
        this.setState({icon:'checkcircleo'})
      }

    }
  }
  componentDidMount(){
    console.log('did mount')
  }
  _onPress(){
    this.setState({clicked:true})
    if(this.props.answer.id !== 3){
       this.setState({change_cl:!this.state.change_cl})
       this.setState({backgroundColor:'red'})
       this.setState({icon:'closecircleo'})
    }
    this.props.onPressItem(this.props.answer.id,this.props.answer.answer)
  }
  onLayout(e) {
    this.setState({
      width: Dimensions.get('window').width
    });
  }
  render(){
    return (
      <TouchableOpacity disabled = {this.props.answered} onPress={()=>{this._onPress()}} onLayout={this.onLayout}>
         <View opacity={(this.props.answered && !this.state.clicked && this.props.answer.id!==3)?0.3:0.8} style={{marginHorizontal:10,marginVertical:5,flexDirection: 'row',alignItems: "center", backgroundColor:this.state.backgroundColor,height:this.state.height/12,borderRadius:15}}>
          <View style={{flex:1}} />
           <Text style={{flex:6,textAlign:'center'}}>
             {entities.decode(this.props.answer.answer)}
           </Text>
           <View style={{flex:1,alignItems:'flex-end',marginRight:5}}>
             {this.state.clicked && this.props.answered?<Icon name={this.state.icon} size={30} color="#900" />:null}
           </View>
         </View>
      </TouchableOpacity>
    );
  }
}
