import React,{ Component } from 'react'
import { Text,View,Dimensions,TouchableOpacity,StyleSheet,FlatList } from 'react-native'
import { connect } from 'react-redux'
const {height,width} =Dimensions.get('window')

class ListButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: 'white',
    };

  }

  _keyExtractor = (item, index) => "list_id-"+item.id;

  _renderItem = ({item}) => (
    <TouchableOpacity style={styles.card} onPress={()=>{this.props.onPressItem(item.name,item.id,item.sub)}} >
         <Text style={{ textAlign:"center"}}>
          {item.name}
         </Text>
    </TouchableOpacity>
  );
  render(){
    return (
      <View>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={this.props.data}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        horizontal={false}
        numColumns={this.props.numOfColumn}
      />
    </View>
    );
  }
}

const mapStateToProps = state => ({
  question_type_id:state.questions.questionTypeId
  });
export default connect(
  mapStateToProps,
  null
)(ListButton);

const styles = StyleSheet.create({
card:{
  shadowColor: '#00000021',
  shadowOffset: {
    width: 0,
    height: 6,
  },
  shadowOpacity: 0.37,
  shadowRadius: 7.49,
  elevation: 12,
  borderRadius:6,

  marginVertical: 5,
  backgroundColor:"white",
  flexBasis: '49%',
  height:height/4,
  marginHorizontal: 2,
  justifyContent:"center"
},
listContainer:{
 justifyContent:'center'
}
});
