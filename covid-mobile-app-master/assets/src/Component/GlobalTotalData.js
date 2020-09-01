import React, { Suspense } from 'react'
import {View,FlatList,Text,StyleSheet,TouchableOpacity,ActivityIndicator} from 'react-native'
import useSwr from 'swr'
import GlobalResponse from '../API/GlobalResponse'
import Spinner from 'react-native-loading-spinner-overlay'
// import DisplayData from './DisplayData'
import Colorpicker from '../Functions/ColorPicker'
const DisplayData = React.lazy(()=>import('../Component/DisplayData'))
async function fetcher(url) {
    const res = await fetch(url);
    const json = await res.json();
    return json;
  }
const GlobalTotalData = ()=>{
    // const [result,Check] = GlobalResponse()
    const {data:result} = useSwr("https://api.covid19api.com/summary",fetcher)
    if(result)
    // console.log(result,"GlobalTotalData")
    if(result)
    {
        if(result["success"]===false)
        {
            return (<View><Spinner visible={true} textContent="LimitOver.... " textStyle={{color:'white'}}/></View>)

        }

    }
    // if(!Check)
    // {
    //     return (<View><Text>Something is wrong</Text></View>)
    // }
    var  TotalData= {}
    if(result){
    try{
   
    TotalData={
        Confirmed:{
            data:result["Global"].TotalConfirmed
        },
        Active:{
            data:result["Global"].TotalConfirmed-result["Global"].TotalRecovered-result["Global"].TotalDeaths
        },
        Recovered:{
            data:result["Global"].TotalRecovered
        },
        Deaths:{
            data:result["Global"].TotalDeaths
        }
    }
        }
    catch{
    }
}
    if(!result)
    return (<View><ActivityIndicator/></View>)
    return(
        <View >
            
            <FlatList
            data={Object.keys(TotalData)}
            
            renderItem={({item,index})=>{
            return (
                    <Suspense fallback={<View><Text style={{color:"white",fontSize:27}}></Text></View>}>           
                    <DisplayData 
                    Data={TotalData[item].data} 
                    title={item} 
                    color={Colorpicker(item)}
                    DisplayDataFor="Global"
                    ApiLink ="https://api.covid19api.com/summary"
                    FetchData={false}
                    />
                    </Suspense>

                )
            }}
            showsVerticalScrollIndicator={false}
            
            style={{display:"flex"}}
            
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
export default GlobalTotalData