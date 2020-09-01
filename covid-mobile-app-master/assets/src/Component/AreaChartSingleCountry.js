import React from 'react'
import {View,Text,ActivityIndicator} from 'react-native'
import {LineChart } from 'react-native-chart-kit'
import useSwr from 'swr'
import * as d3 from 'd3'
import ColorPicker from '../Functions/ColorPicker'
var TimeConv = d3.timeParse('%d %B %Y')
var TimeConvForState = d3.timeParse("%d-%b-%y")
var par =d3.timeParse("%Y-%m-%dT00:00:00Z")

async function fetcher(url) {
    const res = await fetch(url);
    const json = await res.json();
    return json;
  }
const AreaChartSingleCountry=(
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
      const {data:abc} = useSwr(`${ApiLink}${id}`,fetcher)
        if(abc)
        {
          console.log(abc,"SINGLECOUNTRY")
            var data =[]
            var count =0
            var labels =[]
            for(var key in abc)
        {
            var date = abc[key].Date
            var t =par(date)
            var mon
            var dates
            // var time =TimeConv(abc.cases_time_series[key].date+"2020")
        try{
        var mon=(t.getMonth())
        var dates= (t.getDate())
        }
        catch{
          // console.log("CatchSingleCountry")
        }
        if(mon===from-1){
    
        
        if(title==='Confirmed'){

        data[count]=abc[key].Confirmed
        labels[count] = dates+1
        var chartColor = title
         chartColor= ColorPicker(title,chartColor)
        }
        if(title==='Recovered')
        {
            data[count]=abc[key].Recovered
            labels[count] = dates+1
            var chartColor = title
          chartColor= ColorPicker(title,chartColor)
        }
        if(title==='Active')
        {
            data[count]=abc[key].Active
            labels[count] = dates+1
            var chartColor = title
          chartColor= ColorPicker(title,chartColor)
        }
        if(title==='Deaths')
        {
            data[count]=abc[key].Deaths
            labels[count] = dates+1
            var chartColor = title
          chartColor= ColorPicker(title,chartColor)
        }
        count++
        }
        
    }
        }
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
        if(!abc)
        return <View><View style={{justifyContent:'center',marginLeft:40}}><ActivityIndicator/></View></View>
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
    export default AreaChartSingleCountry