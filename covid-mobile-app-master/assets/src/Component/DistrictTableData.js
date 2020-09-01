import React, { useState } from "react";
import {View,Text,FlatList,StyleSheet} from 'react-native'
import TableHeader from '../Component/TableHeader'
import RowData from '../Component/RowData'
import useSwr from 'swr'
import { ScrollView } from "react-native-gesture-handler";
import Spinner from 'react-native-loading-spinner-overlay'
import { color } from "react-native-reanimated";
async function fetcher(url) {
    const res = await fetch(url);
    const json = await res.json();
    return json;
  }
const DistrictTableData = ({id})=>{
    // const result = StateResponse()
    const [SpinnerVisible,SetSpinnerVisible] = useState(false)
    const {data:result} = useSwr("https://api.covid19india.org/state_district_wise.json",fetcher)
    
    if(!result)
    return (<View><Spinner visible={!SpinnerVisible} textContent="Loading.." textStyle={styles.spinnerTextStyle}/></View>)
    return(
        <ScrollView horizontal={true}>
        <View style={{marginTop:50}}>
            <TableHeader name={"Districts"}/>
            <FlatList
            data={Object.keys(result[id].districtData)}
            renderItem={({item})=>{
                return (
            
                <RowData 
                    StateName={item} 
                    ConfirmedCases={result[id].districtData[item].confirmed}
                    ActiveCases={result[id].districtData[item].active}
                    RecoverCases={result[id].districtData[item].recovered}
                    DeathCases={result[id].districtData[item].deceased}    
                />
                
                )
            }}
            />
        </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    spinnerTextStyle:{
        color:'white'
    }
})

export default DistrictTableData