import React from 'react'
import {View,Text, StyleSheet} from 'react-native';
import firebase from 'firebase'
import db from '../config'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {withNavigation} from 'react-navigation';
import {Card} from 'react-native-elements';

export default class Receiver extends React.Component{
    constructor(props){
        super(props)
        this.state={
            UserId: firebase.auth().currentUser.email,
            ReceiverId:this.props.navigation.getParam('details')["UserId"],
            RequestId:this.props.navigation.getParam('details')["RequestId"],
            BookName: this.props.navigation.getParam('details')["BookName"],
            Reason: this.props.navigation.getParam('details')["ReasonForRequest"],
            ReceiverName: "", 
            ReceiverPhoneNumber:"",
            ReceiverAddress:"",
            ReceiverRequestDocId:""
        }
    }
    getReceiverDetails=()=>{
        db.collection('usersbetter').where('UserId', '==', this.state.ReceiverId).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({
                ReceiverName: doc.data().UserName,
                ReceiverPhoneNumber: doc.data().PhoneNumber,
                ReceiverAddress: doc.data().Address,
                })
            })
        })
        db.collection('Request_Books').where('RequestId', '==', this.state.RequestId).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({
                    ReceiverRequestDocId: doc.id
                })
            })
        })
    }
    
    componentDidMount(){
        this.getReceiverDetails()
    }
    render(){
        return(
            <View style={{flex:1}}>
            <View style={{flex:0.3}}>
            <Card
            title={"Item Information:"}
            titleStyle={{fontSize:24.531}}
            >    
            <Card>
                <Text>
                    Name: {this.state.BookName},
                </Text>
            </Card>
            <Card>
                <Text>
                    Reason: {this.state.Reason},
                </Text>
            </Card>
            </Card>
            </View>
            <View style={{flex:0.3}}>
                <Card>

                
            <Card>
                <Text>
                    Receiver Name: {this.state.ReceiverName}
                </Text>
            </Card>
            <Card>
                <Text>
                    Phone Number: {this.state.ReceiverPhoneNumber}
                </Text>
            </Card>
            <Card>
                <Text>
                    Address: {this.state.ReceiverAddress}
                </Text>
            </Card>
            </Card>
            </View>
                <TouchableOpacity
                style={styles.text}
                onPress={()=>{
                    this.props.navigation.navigate('BookDonate')
                }}
                >
                    <Text>Back To Donate</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        marginTop:50,
        backgroundColor:'white',
    },
    loginBox:{
        width:300,
        height:40,
        borderWidth:1.5,
        fontSize:20,
        margin:10,
        paddingLeft:10,
        alignSelf:"center",
        justifyContent: 'center',
        borderColor:"#00873E"
    },
    text:{
        fontSize:30,
        textAlign:"center",
        marginBottom:50,
        alignSelf:"center",
        backgroundColor:'#c54245',
        height:60,
        width:120,
        paddingTop:13,
        borderWidth:3,
        borderRadius:1,
        justifyContent:"center"
    },

    title:{
        fontSize: 40,
        textAlign:'center',
        alignSelf: 'center',
        color:"#00873E"
    }
})
