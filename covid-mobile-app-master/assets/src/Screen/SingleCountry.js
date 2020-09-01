import React, { useEffect, Suspense } from 'react'
import {View,Text,ScrollView,StyleSheet,Dimensions, Button} from 'react-native'
import RingChart from '../Component/RingChart'
import {withNavigation}  from 'react-navigation'
import ButtonJs from '../Component/Button'
import StateTotalData from '../Component/StateTotalData'
import SingleCountryTotalData from '../Component/SingleCountryTotalData'
import ColorPicker from '../Functions/ColorPicker'
import StatisticsIcon from '../Icons/StatisticsIcon'
import BackButton from '../Component/BackButton'

const height = Dimensions.get("screen").height
const SingleCountry = ({navigation})=>{
    // const result = IndiaResponse()
    // console.log(result.cases_time_series[0].dailyconfirmed)
    var id = navigation.getParam("id")
    const height = Dimensions.get("screen").height
    const width = Dimensions.get("window").width
    var date = new Date()
    var month = date.getMonth()
    return(
        
        // <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{height:height,backgroundColor:'rgb(24,26,31)'}}>
        <BackButton onPress={()=>navigation.goBack()}/>
        <View style={{alignItems:'baseline',flexDirection:'row'}}>
          <Text style={{color:'white',marginTop:70,fontWeight:'bold',fontSize:25}}>{id}</Text>  
          <View style={{marginLeft:200}}>
          <StatisticsIcon 
            color={'white'}
            onPress={()=>navigation.navigate('DataTable',{ApiLink:"https://api.covid19india.org/state_district_wise.json",id:id,FetchData:true})}
          /> 
          </View>
          </View>   
        <View style={{marginTop:100}}>
        <SingleCountryTotalData id={id}/>

        </View>
        {/* <View style={Styles.SecondViewStyle}> */}
        
         {/* <ButtonJs click={()=>navigation.navigate('DataTable',{ApiLink:"https://api.covid19india.org/state_district_wise.json",id:id,FetchData:true})} title={"Statistics"}/> */}
         {/* <ButtonJs click={()=>navigation.navigate('State',{id:id})} title={"DistrictWise"}/> */}
            
        {/* </View>  */}
            
            
            <RingChart/>
        </View>
        // </ScrollView>
    )
}
const Styles = StyleSheet.create({
    FirstViewStyle:{
        backgroundColor:"rgb(24,26,31)",         //rgb(94,90,180)
        
        
    },
    SecondViewStyle:{
       
    }
    
})
export default withNavigation(SingleCountry)