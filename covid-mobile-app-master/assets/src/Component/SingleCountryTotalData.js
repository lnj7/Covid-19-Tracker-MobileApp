import React from 'react'
import {View,FlatList,Text,StyleSheet,TouchableOpacity} from 'react-native'
import GlobalResponse from '../API/GlobalResponse'
import DisplayData from './DisplayData'
import Colorpicker from '../Functions/ColorPicker'
const SingleCountryTotalData = ({id})=>{
    const result = GlobalResponse()
    console.log(id,"singleCOun...",result,"::::")
    var TotalData = {}
    for(var key in result["Countries"])
    {
        if(result["Countries"][key].Country===id)
        TotalData={
            Confirmed:{
                data:result["Countries"][key].TotalConfirmed
            },
            Active:{
                data:result["Countries"][key].TotalConfirmed-result["Countries"][key].TotalRecovered-result["Countries"][key].TotalDeaths
            },
            Recovered:{
                data:result["Countries"][key].TotalRecovered
            },
            Deaths:{
                data:result["Countries"][key].TotalDeaths
            }
        }
    }
    return(
        <View >
            
            <FlatList
            data={Object.keys(TotalData)}
            keyExtractor={(item)=>item.key}
            renderItem={({item})=>{
                // console.log(id)
            return (
                                 
                    <DisplayData 
                    Data={TotalData[item].data} 
                    title={item} 
                    color={Colorpicker(item)}
                    DisplayDataFor="SingleCountry"
                    ApiLink ="https://api.covid19api.com/summary"
                    FetchData={false}
                    id={id}
                    />
                    

                )
            }}
            // showsVerticalScrollIndicator={false}
            
            // style={{display:"flex"}}
            
            />
        </View>
    )
}
const Styles =  StyleSheet.create({
    ViewStyle:{
        borderWidth:1,
        borderColor:'red',
        height:50
    }
})
export default SingleCountryTotalData