import React, { useState } from 'react'
import {View,Text,Dimensions,StyleSheet,ActivityIndicator} from 'react-native'
import { ProgressChart} from 'react-native-chart-kit'
import useSwr from 'swr'
import Spinner from 'react-native-loading-spinner-overlay'
import ColorPicker from '../Functions/ColorPicker';
async function fetcher(url) {
    const res = await fetch(url);
    const json = await res.json();
    return json;
  }
  var widthWindow = Dimensions.get("window").width
const RingChart = ({Data,title,DisplayDataFor,id,ApiLink})=>{
    // console.log(ApiLink,"=",DisplayDataFor,"=",id,"[RingChart.js]")
    var [ApiSuccess,SetApiSuccess] = useState(true)
    var per = []
    var showPersentage =null
    const {data:abc} = useSwr(ApiLink,fetcher)
    
    if(abc)
    {
        if(DisplayDataFor==='India')
        {
        if(title==="Active"){
        per[0]=(abc.statewise[0].active)/(abc.statewise[0].confirmed)
        showPersentage = (<Text 
                style={{color:"gray",fontWeight:'bold',marginTop:48,marginLeft:28}}>
                    {parseFloat(per[0]*100).toFixed(0)+"%"}
                    </Text>)
        
        }
        else if(title==="Recovered")
        {
            per[0]=(abc.statewise[0].recovered)/(abc.statewise[0].confirmed)
            showPersentage = (<Text 
                style={{color:"gray",fontWeight:'bold',marginTop:48,marginLeft:28}}>
                    {parseFloat(per[0]*100).toFixed(0)+"%"}
                    </Text>)
        }
        else if(title==='Deaths')
        {
            per[0]=(abc.statewise[0].deaths)/(abc.statewise[0].confirmed)
            showPersentage = (<Text 
                style={{color:"gray",fontWeight:'bold',marginTop:48,marginLeft:28}}>
                    {parseFloat(per[0]*100).toFixed(0)+"%"}
                    </Text>)
        }
        }
        else if(DisplayDataFor==='State')
        {
            for(var key in abc.statewise)
            {
                if(abc.statewise[key].state===id)
                {
                    if(title==="Active")
                    {
                        
                        per[0]=(abc.statewise[key].active)/(abc.statewise[key].confirmed)
                        showPersentage = (<Text 
                                style={{color:"gray",fontWeight:'bold',marginTop:48,marginLeft:28}}>
                                    {parseFloat(per[0]*100).toFixed(0)+"%"}
                                    </Text>)
                    
                    }
                    else if(title==="Recovered")
                        {
                            per[0]=(abc.statewise[key].recovered)/(abc.statewise[key].confirmed)
                            showPersentage = (<Text 
                                style={{color:"gray",fontWeight:'bold',marginTop:48,marginLeft:28}}>
                                    {parseFloat(per[0]*100).toFixed(0)+"%"}
                                    </Text>)
                        }
                    else if(title==='Deaths')
                    {
                        per[0]=(abc.statewise[key].deaths)/(abc.statewise[key].confirmed)
                        showPersentage = (<Text 
                            style={{color:"gray",fontWeight:'bold',marginTop:48,marginLeft:28}}>
                                {parseFloat(per[0]*100).toFixed(0)+"%"}
                                </Text>)
                    }
                }
            }
        }
        else if(DisplayDataFor==='Global')
        {
            // console.log("Global [RingChart.js]")
            try{
            var confirmedcases =abc["Global"].TotalConfirmed
            var recoveredcases= abc["Global"].TotalRecovered
            var deathcases = abc["Global"].TotalDeaths
            var activeCases = confirmedcases-recoveredcases-deathcases
            if(title==="Active"){
                per[0]=(activeCases)/(confirmedcases)
                showPersentage = (<Text 
                        style={{color:"gray",fontWeight:'bold',marginTop:48,marginLeft:28}}>
                            {parseFloat(per[0]*100).toFixed(0)+"%"}
                            </Text>)
                
                }
                else if(title==="Recovered")
                {
                    per[0]=(recoveredcases)/(confirmedcases)
                    showPersentage = (<Text 
                        style={{color:"gray",fontWeight:'bold',marginTop:48,marginLeft:28}}>
                            {parseFloat(per[0]*100).toFixed(0)+"%"}
                            </Text>)
                }
                else if(title==='Deaths')
                {
                    per[0]=(deathcases)/(confirmedcases)
                    showPersentage = (<Text 
                        style={{color:"gray",fontWeight:'bold',marginTop:48,marginLeft:28}}>
                            {parseFloat(per[0]*100).toFixed(0)+"%"}
                            </Text>)
                }
            }
            catch{
                
            }
        }
        else if((DisplayDataFor==='SingleCountry'))
        {
            for(var key in abc["Countries"])
            {
                if(id===abc["Countries"][key].Country)
                {
                    if(title==="Active")
                    {
                        
                        per[0]=(abc["Countries"][key].TotalConfirmed -abc["Countries"][key].TotalRecovered-abc["Countries"][key].TotalDeaths)/(abc["Countries"][key].TotalConfirmed)
                        showPersentage = (<Text 
                                style={{color:"gray",fontWeight:'bold',marginTop:48,marginLeft:28}}>
                                    {parseFloat(per[0]*100).toFixed(0)+"%"}
                                    </Text>)
                    
                    }
                    else if(title==="Recovered")
                        {
                            per[0]=(abc["Countries"][key].TotalRecovered)/(abc["Countries"][key].TotalConfirmed)
                            showPersentage = (<Text 
                                style={{color:"gray",fontWeight:'bold',marginTop:48,marginLeft:28}}>
                                    {parseFloat(per[0]*100).toFixed(0)+"%"}
                                    </Text>)
                        }
                    else if(title==='Deaths')
                    {
                        per[0]=(abc["Countries"][key].TotalDeaths)/(abc["Countries"][key].TotalConfirmed)
                        showPersentage = (<Text 
                            style={{color:"gray",fontWeight:'bold',marginTop:48,marginLeft:28}}>
                                {parseFloat(per[0]*100).toFixed(0)+"%"}
                                </Text>)
                    }
                }
            }
        }
    }
    const dataset = {
        // labels: ["Run"], // optional
        data: per
      };
      const screenWidth = Dimensions.get("window").width;
      const chartConfig = {
        backgroundGradientFrom: "red",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: 'aliceblue',
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => ColorPicker(title),
        strokeWidth: 3, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };
      if(!abc)
      return <View><ActivityIndicator/></View>
    return(
        <View style={{marginLeft:widthWindow/10}}>
            {showPersentage}
            <ProgressChart
            data={dataset}
            width={100}
            height={120}
            strokeWidth={6}
            radius={35}
            chartConfig={chartConfig}
            hideLegend={true}
            style={{position:'absolute'}}
            />
        </View>
    )
    
}
const styles = StyleSheet.create({
    spinnerTextStyle:{
        color:"white"
    }
})
export default RingChart