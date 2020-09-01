import React, { Suspense } from 'react'
import {View,Text,ScrollView,StyleSheet,Dimensions, Button} from 'react-native'

import SearchBar from '../Component/SearchBar'
import RingChart from '../Component/RingChart'
import useSwr from 'swr'
import {withNavigation}  from 'react-navigation'
import ButtonJs from '../Component/Button'
import GlobalResponse from '../API/GlobalResponse'
import Spinner from 'react-native-loading-spinner-overlay'
// import GlobalTotalData from '../Component/GlobalTotalData'
import StatisticsIcon from '../Icons/StatisticsIcon'
import BackButton from '../Component/BackButton'
const GlobalTotalData =  React.lazy(()=>import("../Component/GlobalTotalData"))
const TotalData = React.lazy(()=>import("../Component/TotalData"))
const AreaChartExample =  React.lazy(()=>import("../Component/AreaChart"))
const height = Dimensions.get("screen").height
async function fetcher(url) {
    const res = await fetch(url);
    const json = await res.json();
    return json;
  }
const GlobalHomeScreen = ({navigation})=>{
    var FetchData = navigation.getParam('FetchData')
    // const result = GlobalResponse()
    const {data:result,error} = useSwr("https://api.covid19api.com/summary",fetcher)
    if(error)
    {
        // console.log(error,"[GlobalHomeScreen.js]")
    }
    
    if(result)
    {
        // console.log(result,"Byeee")
        if(result["success"]===false)
        {
            // console.log("Jai",result["success"])
            return (<View><Spinner visible={true} textContent="LimitOver.... " textStyle={{color:'white'}}/></View>)

        }

    }
    if(!result)
    return (<View><Text></Text></View>)
    return(
        
        <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{height:height,backgroundColor:'rgb(24,26,31)'}}> 
      <BackButton onPress={()=>navigation.goBack()}/>
     
        <View style={Styles.FirstViewStyle}>
         <View style={{flexDirection:'column',marginTop:35}}>   
         <View style={{marginRight:20}}>
        <StatisticsIcon 
            color="white" 
            onPress={()=>navigation.navigate('DataTable',{DisplayDataFor:"Global",ApiLink:"https://api.covid19api.com/world",FetchData:false})}
            />
        </View>
        <SearchBar/>
        <Text style={{fontWeight:'bold',fontSize:25,color:"white",alignSelf:'center'}}>Global</Text>
        </View>
        </View>   
        <View style={Styles.SecondViewStyle}>
        <Suspense fallback={<View><Text> </Text></View>}>
         <GlobalTotalData DisplayDataFor={"Global"} FetchData={FetchData}/>
         </Suspense>
         <ButtonJs click={()=>navigation.navigate('GlobalScreen')} title={"CountryWise"}/>

        </View> 
            
        {/* <ButtonJs click={()=>navigation.navigate('DataTable',{DisplayDataFor:"Global",ApiLink:"https://api.covid19api.com/world"})} title={"Statistics"}/> */}

            {/* <RingChart  /> */}
        </View>
        </ScrollView>
    )
}
const Styles = StyleSheet.create({
    FirstViewStyle:{
                 //rgb(94,90,180) rgb(111,108,170)
        // height:height/3,
        // borderBottomStartRadius:15,
        // borderBottomEndRadius:15,
        marginTop:height/25

        
    },
    SecondViewStyle:{
        marginTop:10
        
        // borderTopEndRadius:45,
        // borderTopLeftRadius:45
    }
    
})
export default withNavigation(GlobalHomeScreen)