import React from 'react'
import {View,Dimensions} from 'react-native'
import {withNavigation} from 'react-navigation'
import DistrictTableData from '../Component/DistrictTableData'
import BackButton from '../Component/BackButton'
const HeightScreen = Dimensions.get("window").height
const StateScreen = ({navigation,id})=>{
    var id = navigation.getParam("id")
    return(
        <View style={{backgroundColor:'rgb(24,26,31)',opacity:.9,height:HeightScreen}}>
            {/* <StateTotalData id={id}/> */}
            <BackButton onPress={()=>navigation.goBack()}/>

            <DistrictTableData id={id}/>
        </View>
    )
}

export default withNavigation(StateScreen)