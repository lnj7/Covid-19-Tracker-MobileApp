import React, { Suspense } from 'react'
import {View,Text} from 'react-native'
import {withNavigation} from 'react-navigation'
import BackButton from '../Component/BackButton'
import Spinner from 'react-native-loading-spinner-overlay'
// import TableData from '../Component/TableData'
const TableData = React.lazy(()=>import('../Component/TableData'))
const StateScreen = ({navigation,id})=>{
    var id = navigation.getParam("id")
    return(
        <View style={{backgroundColor:'rgb(24,26,31)'}}>
                  <BackButton onPress={()=>navigation.goBack()}/>
        <Suspense fallback={<View><Spinner visible={true} textContent="Loading..." textStyle={{color:'white'}}/></View>}>
            <TableData DisplayDataFor="India"/>
            </Suspense>
        </View>
    )
}

export default withNavigation(StateScreen)