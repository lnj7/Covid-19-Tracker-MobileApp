import React from 'react'
import {View,StyleSheet,TouchableOpacity} from 'react-native'
import { ScrollView, FlatList } from 'react-native-gesture-handler'
import IndiaResponse from '../API/IndiaResponse'
import TableHeader from '../Component/TableHeader'
import {withNavigation} from 'react-navigation'
import RowData from './RowData'
const TableData =({navigation,DisplayDataFor})=>{
    const result = IndiaResponse()
    
    return(
        <ScrollView horizontal={true}>        
            <View style={Styles.ViewStyle}>
            <TableHeader name={"States"}/>
                {/* {TableDataArray} */}
            <FlatList
            data={result.statewise}
            keyExtractor={({item})=>item}
            renderItem={({item})=>{
                    if(item.state!=='Total')
                    return (
                        <TouchableOpacity onPress={()=> navigation.navigate("StateHomeScreen",{id:item.state})}>
                    <RowData 
                        StateName={item.state} 
                        ConfirmedCases={item.confirmed}
                        ActiveCases={item.active}
                        RecoverCases={item.recovered}
                        DeathCases={item.deaths}  
                        id={item.state}  
                        DisplayDataFor={DisplayDataFor}
                    />
                    </TouchableOpacity>
                    )
            }}
            />
        </View>
        </ScrollView>

    )
}
const Styles= StyleSheet.create({
    ViewStyle:{
        marginTop:50
    },

})
export default withNavigation(TableData)