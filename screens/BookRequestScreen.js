import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Keyboard, TextInput, Modal, ScrollView, Alert } from 'react-native';
import firebase from 'firebase';
import db from '../config'
import { render } from 'react-dom';
import MyHeader from '../Components/MyHeader';
export default  class BookRequest extends React.Component{
constructor(props){
super(props);
this.state={
    UserId: firebase.auth().currentUser.email,
    BookName:"",
    Reason: "",
}
}
//creates user id
createUniqueId(){
    return(
        Math.random().toString(25).substring(7)
    )
}

addRequest=(BookName,Reason)=>{
    var userid = this.state.UserId;
    var requestid = this.createUniqueId();
    db.collection('Request_Books').add({
        UserId:userid,
        BookName: BookName,
        ReasonForRequest:Reason,
        RequestId: requestid
    })
    this.setState({
        BookName: "",
        Reason: "",
    })
    return(
        Alert.alert( firebase.auth().currentUser.email + ", your book," + BookName + "has successfully been requested.")
    )
}

render(){
    return(
        <View style={{flex:1}}>
        <MyHeader title="Request A Book"></MyHeader>
            <KeyboardAvoidingView>
            <TextInput placeholder="Please enter a book name."
            onChangeText={text=>{
                this.setState({
                    BookName: text
                })
            }}
            value={this.state.BookName}
            style={styles.inputBox}
            ></TextInput>
           <TextInput placeholder={"Please enter your reason for wanting this book, "+ firebase.auth().currentUser.email + "."}
           multiline={true}
           numberOfLines={10}
            onChangeText={text=>{
                this.setState({
                    Reason: text
                })
            }}
            value={this.state.Reason}
            style={[styles.inputBox,{
                height:200,
            }]}
            ></TextInput>
            <TouchableOpacity style={styles.button} 
            onPress={()=>{
                this.addRequest(this.state.BookName,this.state.Reason)
            }}
            >
                <Text>Send</Text>
            </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
}
}

const styles = StyleSheet.create({
    keyboardstyle:{
        flex:3,
        alignItems:'center',
        justifyContent:'center'
    },
    inputBox:{
        width:"80%",
        height: 30,
        alignSelf: 'center',
        borderColor: "orange",
        borderRadius: 30,
        borderWidth: 2,
        marginTop : 25,
        padding: 30
    },
    button:{
        width:100,
        height: 30,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: "green",
        marginTop: 30,
        shadowColor: "black",
        // shadowOpacity: 0.53,
        // shadowOffset:{width:23, height: 34}
    }
})