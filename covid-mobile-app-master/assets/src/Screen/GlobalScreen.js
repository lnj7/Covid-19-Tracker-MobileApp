import React from 'react'
import {View,Text} from 'react-native'
import {withNavigation} from 'react-navigation'

import TableData from '../Component/TableData'
import GlobalTableData from '../Component/GlobalTableData'
const GlobalScreen = ({navigation,id})=>{
    var id = navigation.getParam("id")
    return(
        <View style={{backgroundColor:'rgb(24,26,31)'}}>
            <GlobalTableData/>
        </View>
    )
}

export default withNavigation(GlobalScreen)