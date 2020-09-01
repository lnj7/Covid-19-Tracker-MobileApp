import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity,Dimensions} from 'react-native'
const ScreenWidth = Dimensions.get('window').width
const ScreenHeight = Dimensions.get("screen").height
const customheight = ScreenHeight/3
const customheight2 = ScreenHeight - (customheight)
const ButtonJs = ({click,title})=>{
    return(
        <View  >
            <TouchableOpacity style={Styles.ButtonStyle} onPress={click}>
            <Text style={Styles.TextStyle}>
                {title}
            </Text>
            </TouchableOpacity>
            
        </View>
    )
}
const Styles = StyleSheet.create({
    ButtonStyle:{
        height:50,
        width:ScreenWidth-5,
        backgroundColor:'rgb(24,26,31)',
        borderRadius:20,
        marginTop:5
    
    },
    TextStyle:{
        color:'white',
        fontWeight:'bold',
        fontSize:20,
        alignSelf:'center',
        marginTop:5
    }
})
export default ButtonJs