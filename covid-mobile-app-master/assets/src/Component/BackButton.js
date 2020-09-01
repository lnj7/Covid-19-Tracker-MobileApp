import React from 'react'
import {View,Text,TouchableOpacity} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
const BackButton = ({onPress})=>{
    return(
        <TouchableOpacity onPress={onPress}>
            <View style={{flexDirection:'row',marginTop:35,marginLeft:15}}><Ionicons name={"ios-arrow-back"} size={34} color={"white"}/><Text style={{color:"white",marginTop:5}}>Back</Text></View>
            </TouchableOpacity>
    )
}
export default BackButton