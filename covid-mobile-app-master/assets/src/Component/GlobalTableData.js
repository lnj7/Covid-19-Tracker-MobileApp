import React, { useState } from "react";
import {View,Text,FlatList,TouchableOpacity,StyleSheet} from 'react-native'
import TableHeader from '../Component/TableHeader'
import RowData from '../Component/RowData'
import {withNavigation} from 'react-navigation'
import useSwr from 'swr'
import Spinner from 'react-native-loading-spinner-overlay'
import { ScrollView } from "react-native-gesture-handler";
import ButtonJs from "./Button";
import BackButton from "./BackButton";
async function fetcher(url) {
    const res = await fetch(url);
    const json = await res.json();
    return json;
  }
const GlobalTableData = ({navigation})=>{
    // const result = StateResponse()
    const [Wait,setWait] = useState(true)
    const {data:result} = useSwr("https://api.covid19api.com/summary",fetcher)
    if(result)
    {
        if(result["success"]===false)
        {
            return (<View><Spinner visible={true} textContent="LimitOver.... " textStyle={styles.spinnerTextStyle}/><ButtonJs click={()=>navigation.getBack()} title={"Back"}/></View>)

        }

    }
    var size =[]
    var count = 0
    if(result )
    {
    
        for(var key in result["Countries"])
        {
            size.push({
                key:key,
                data:key
            })
            count++
        }
    }
    
    if(!Wait)
    return (<View><Spinner visible={true} textContent="Loading.." textStyle={styles.spinnerTextStyle}/></View>)
    return(
        <ScrollView horizontal={true}>
        <View style={{marginTop:50}}>
            <BackButton onPress={()=>navigation.goBack()}/>
            <TableHeader name={"Global"}/>
            <FlatList
            data={Object.keys(result["Countries"])}
            renderItem={({item})=>{
                return (
                //  <TouchableOpacity onPress={()=>navigation.navigate("SingleCountry",{id:result["Countries"][item].Country})}> 
                <RowData 
                    StateName={result["Countries"][item].Country} 
                    ConfirmedCases={result["Countries"][item].TotalConfirmed}
                    ActiveCases={result["Countries"][item].TotalConfirmed-result["Countries"][item].TotalRecovered-result["Countries"][item].TotalDeaths}
                    RecoverCases={result["Countries"][item].TotalRecovered}
                    DeathCases={result["Countries"][item].TotalDeaths}    
                />
                // </TouchableOpacity>
                )
                
            }}
            />
        </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    spinnerTextStyle:{
        color:"white"
    }
})
export default withNavigation(GlobalTableData)