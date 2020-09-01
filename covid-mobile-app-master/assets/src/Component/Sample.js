import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import RingChart from './RingChart'


const Sample = ()=>{
    return(
        <View style={Styles.Viewstyles}>
            <Text style={Styles.textStyle}>Confirm</Text>
            <Text style={Styles.textStyle}>700K</Text>
            <RingChart/>
        </View>
    )
}
const Styles = StyleSheet.create({
    Viewstyles:{
        height:100,
        width:250,
        backgroundColor:'white',
        marginTop:40,
        borderBottomRightRadius:30,
        borderTopEndRadius:30
    },
    textStyle:{
        color:'gray',
        fontWeight:'bold',
        fontSize:25,
        marginLeft:10,
    
    }
})
export default Sample