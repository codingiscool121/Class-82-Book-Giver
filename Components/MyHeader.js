import React from 'react';
import {Header, Icon} from 'react-native-elements';

const MyHeader = props=>{
    return(
        <Header
        leftComponent={
        <Icon
        name='bars'
        type='font-awesome'
        color='blue'
        onPress={()=>{
            props.navigation.toggleDrawer()
        }}
        >
        </Icon>}
         centerComponent={{text:props.title, style:{color:"black", fontSize: 30, fontWeight:"bold"}}}
         >
        </Header>
    )
}

export default MyHeader;