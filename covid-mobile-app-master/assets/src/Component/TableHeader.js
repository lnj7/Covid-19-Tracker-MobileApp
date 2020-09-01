import React from 'react'
import {View,Text,StyleSheet,ScrollView} from 'react-native'

const TableHeader = ({name})=>{
    return(
        <View style={Styles.ViewStyle}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Text style={Styles.StateStyle}>{name}</Text>
            <Text style={Styles.ConfirmStyle}>Confirm</Text>
            <Text style={Styles.ActiveStyle}>Active</Text>
            <Text style={Styles.RecoverStyle}>Recover</Text>
            <Text style={Styles.DeathStyle}>Death</Text>
            </ScrollView>
        </View>
    )
}
const Styles= StyleSheet.create({
    ViewStyle:{
        flexDirection:'row',
        marginLeft:5
    },
    StateStyle:{
        // borderWidth:1,
        // borderColor:'black',
        width:200,
        backgroundColor:'white', //rgb(27,27,24)
        color:'gray',
        fontWeight:'bold',
        borderRadius:5,
        marginRight:3
    },
    ConfirmStyle:{
        // borderWidth:1,
        // borderColor:'black',
        width:90,
        backgroundColor:'white',
        color:'red',
        fontWeight:'bold',
        borderRadius:5,
        marginRight:3,
        marginLeft:2
        
    },
    ActiveStyle:{
    //    borderWidth:1,
    //     borderColor:'black',
        width:90,
        backgroundColor:'white',
        color:'rgb(13,94,244)',
        fontWeight:'bold',
        borderRadius:5,
        marginRight:3,
    },
    RecoverStyle:{
        // borderWidth:1,
        // borderColor:'black',
        width:90,
        backgroundColor:'white',
        color:'green',
        fontWeight:'bold',
        borderRadius:5,
        marginRight:3,
    },
    DeathStyle:{
        // borderWidth:1,
        // borderColor:'black',
        width:90,
        backgroundColor:'white',
        color:'grey',
        fontWeight:'bold',
        borderRadius:5,
        marginRight:3,
    },

})
export default TableHeader