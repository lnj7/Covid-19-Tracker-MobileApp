import React, { useState, useEffect } from 'react'
import {View,Text,Dimensions, DatePickerIOSBase} from 'react-native'
import {LineChart } from 'react-native-chart-kit'
import useSwr from 'swr'
import * as d3 from 'd3'

var TimeConv = d3.timeParse('%d %B %Y')
var TimeConvForState = d3.timeParse("%d-%b-%y")

async function fetcher(url) {
    const res = await fetch(url);
    const json = await res.json();
    return json;
  }
const StateAreaChart=({title,from,ChartHeight,ChartWidth,DisplayDataFor,id,ApiLink,StateCode})=>
{
    var data = []
    var count=0
    const {data:abc} = useSwr("https://api.covid19india.org/states_daily.json",fetcher)
    if(abc)
    {
        if(DisplayDataFor==='State'){

  var labels =[]
  
    
    for(var key in abc.states_daily)
    {
    //   console.log(abc.states_daily[key]["rj"],"==",abc.states_daily[key]["date"],"==",abc.states_daily[key]["status"],"9782")
    count++  
    var time = TimeConvForState(abc.states_daily[key]['date'])
      var mon = time.getMonth()
      var date = time.getDate()

      if(mon===from){
    
        
        // if((title==='Deaths')&&(abc.states_daily[key]["status"]==='Deceased'))
        // {
        //     try{
                
        //     data[count]=parseInt(abc.states_daily[key]["rj"])
        //     // data[count]=0
        //     labels[count]=date
            
        //   console.log(parseInt(abc.states_daily[key]['rj']),"7793",title,"=",count)
        // var chartColor = title
        //  chartColor= ColorPicker(title,chartColor)
            
        //     }
        //     catch{

        //     }
        //     count++
        // }
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
        
        }
    }
    
}}

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
    //   setTimeout(()=>{
    //     if(abc)
    //     setWait(wait=true)
    //   },20000)

      if(!abc)
      return <View><Text></Text></View>
      return(
          <View>
              <View style={{marginTop:0,marginLeft:-10}}>
  
  
                      <LineChart
                      data={{
                          labels: ["June"],
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

export default StateAreaChart