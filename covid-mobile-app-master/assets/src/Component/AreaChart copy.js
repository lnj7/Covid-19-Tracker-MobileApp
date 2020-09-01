import React, { useState } from 'react'
import {View,Text,ActivityIndicator,StyleSheet} from 'react-native'
import {LineChart } from 'react-native-chart-kit'
import useSwr from 'swr'
import * as d3 from 'd3'
import ColorPicker from '../Functions/ColorPicker'
import Spinner from 'react-native-loading-spinner-overlay'
var TimeConv = d3.timeParse('%d %B %Y')
var TimeConvForState = d3.timeParse("%d-%b-%y")

async function fetcher(url) {
    const res = await fetch(url);
    const json = await res.json();
    return json;
  }
const AreaChartExample=(
                {title,
                  from,
                  ChartHeight,
                  ChartWidth,
                  DisplayDataFor,
                  id,ApiLink,
                  StateCode,
                  CurrentDate,
                  PastSavenDaysDate,
                  FetchData
                })=>{
      // console.log(DisplayDataFor,"=",ApiLink,FetchData,"=",from,"=",CurrentDate,"=",PastSavenDaysDate,"jain")
    // const time =TimeConv(result.cases_time_series[0].date+"2020")
    var wait =false
    const {data:GlobaFetch} = useSwr(FetchData?"https://api.covid19india.org/data.json":`${ApiLink}?from=${PastSavenDaysDate}&to=${CurrentDate}`,fetcher)
    // const {data:abc} = useSwr(FetchData?"https://api.covid19india.org/data.json":null,fetcher)
    // console.log(`${ApiLink}?from=${PastSavenDaysDate}&to=${CurrentDate}`)
    if(GlobaFetch)
    {
      // console.log("helllo")
      // console.log(ApiLink,"Are",FetchData,"=",DisplayDataFor,"=",CurrentDate,"=",PastSavenDaysDate)

        if(GlobaFetch["success"]===false)
        {
            // console.log(GlobaFetch["success"],"Error in [AreaChartExample.js]")
            return (<View><ActivityIndicator/><Text style={{color:'red'}}>Error</Text></View>)

        }

    }
    // if(error)
    // {
    //   console.log(error,"faild")
    // }
   
    if(GlobaFetch){
    wait=true
    var labels =[]
    var data = []
    var count = 0
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    
    if(DisplayDataFor==='India')
    for(var key in GlobaFetch.cases_time_series)
    {
        var time =TimeConv(GlobaFetch.cases_time_series[key].date+"2020")
        var mon=(time.getMonth())
        var date= (time.getDate())
        if(mon===from){
    
        
        if(title==='Confirmed'){

        data[count]=GlobaFetch.cases_time_series[key].dailyconfirmed
        labels[count] = date
        var chartColor = title
         chartColor= ColorPicker(title,chartColor)
        }
        if(title==='Recovered')
        {
            data[count]=GlobaFetch.cases_time_series[key].dailyrecovered
            labels[count] = date
            var chartColor = title
          chartColor= ColorPicker(title,chartColor)
        }
        if(title==='Active')
        {
            data[count]=(GlobaFetch.cases_time_series[key].dailyconfirmed)-(GlobaFetch.cases_time_series[key].dailyrecovered)-(GlobaFetch.cases_time_series[key].dailydeceased)
            labels[count] = date
            var chartColor = title
          chartColor= ColorPicker(title,chartColor)
        }
        if(title==='Deaths')
        {
            data[count]=GlobaFetch.cases_time_series[key].dailydeceased
            labels[count] = date
            var chartColor = title
          chartColor= ColorPicker(title,chartColor)
        }
        count++
        }
        

    }
    if((DisplayDataFor==='Global')&& GlobaFetch){
      wait=true
      // console.log(GlobaFetch,"else")
      var date =10
      var count=0
      for(var key in GlobaFetch)
      {
        if(title==='Confirmed'){

          data[count]=GlobaFetch[key].TotalConfirmed
          labels[count] = date
          var chartColor = title
           chartColor= ColorPicker(title,chartColor)
          }
          if(title==='Recovered')
          {
              data[count]=GlobaFetch[key].TotalRecovered
              labels[count] = date
              var chartColor = title
            chartColor= ColorPicker(title,chartColor)
          }
          if(title==='Active')
          {
              data[count]=(GlobaFetch[key].TotalConfirmed)-(GlobaFetch[key].TotalRecovered)-(GlobaFetch[key].TotalDeaths)
              labels[count] = date
              var chartColor = title
            chartColor= ColorPicker(title,chartColor)
          }
          if(title==='Deaths')
          {
              data[count]=GlobaFetch[key].TotalDeaths
              labels[count] = date
              var chartColor = title
            chartColor= ColorPicker(title,chartColor)
          }
          date++
          count++
      }
    }
    
  
}

if((DisplayDataFor==='State') && GlobaFetch)
{
  var labels =[]
  var data = []
    var count=0
    // console.log(GlobaFetch.success,"SUBSCRIBE")
    for(var key in GlobaFetch.states_daily)
    {
      var time = TimeConvForState(GlobaFetch.states_daily[key]['date'])
      var mon = time.getMonth()
      var date = time.getDate()

      if(mon===from){
    
        
        if((title==='Confirmed')&&(GlobaFetch.states_daily[key]["status"]==='Confirmed'))
        {
            data[count]=parseInt(GlobaFetch.states_daily[key]["rj"])
            labels[count]=date
            
        var chartColor = title
         chartColor= ColorPicker(title,chartColor)
        }
        // if(title==='Recovered')
        // {
        //     data[count]=abc.cases_time_series[key].dailyrecovered
        //     labels[count] = date
        //     var chartColor = title
        //   chartColor= ColorPicker(title,chartColor)
        // }
        // if(title==='Active')
        // {
        //     data[count]=(abc.cases_time_series[key].dailyconfirmed)-(abc.cases_time_series[key].dailyrecovered)-(abc.cases_time_series[key].dailydeceased)
        //     labels[count] = date
        //     var chartColor = title
        //   chartColor= ColorPicker(title,chartColor)
        // }
        // if(title==='Deaths')
        // {
        //     data[count]=abc.cases_time_series[key].dailydeceased
        //     labels[count] = date
        //     var chartColor = title
        //   chartColor= ColorPicker(title,chartColor)
        // }
        count++
        }
    }
}
// setTimeout(()=>{
//   if(abc)
//   wait=true
// },1000000)

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    withOuterLines:false,
    withInnerLines:false,
    color: (opacity = 1) => `rgba(0, 255, 146, 0)`,
    strokeWidth: 10, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: true,
    withDots:false,
    propsForDots: {
        r: "0",
        strokeWidth: "2",
        stroke: "red"
      } // optional
  };
  // if(GlobaFetch)
  // {
  //   if(GlobaFetch["success"]===false)
  //   wait=false
  // }

    if(!wait)
    return <View style={{justifyContent:'center',marginLeft:40}}><ActivityIndicator/></View>
    // else if(!abc.success)
    // return <View><Spinner visible={true} textContent="Loading.." textStyle={styles.spinnerTextStyle}/></View>
    return(
        <View>
            <View style={{marginTop:0,marginLeft:-10}}>


                    <LineChart
                    data={{
                        labels: ["January", "February", "March", "April", "May", "June"],
                        datasets: [
                            {
                              data: data,
                              color: (opacity = 1) => `${chartColor} 1)`, // optional
                              strokeWidth: 2 // optional
                            }
                          ]
                    }}
                    width={ChartWidth}
                    height={ChartHeight}
                    chartConfig={chartConfig}
                    />
        </View>
        </View>
    ) 
}
const styles = StyleSheet.create({
  spinnerTextStyle:{
    color:"white"
  }
})
export default AreaChartExample