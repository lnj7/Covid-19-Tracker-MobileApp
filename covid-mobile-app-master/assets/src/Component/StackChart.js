import React, { useState, useEffect } from 'react'
import {View,Text,Dimensions, StyleSheet} from 'react-native'
import {StackedBarChart} from 'react-native-chart-kit'
import useSwr from 'swr'
import * as d3 from 'd3'
import ColorPicker from '../Functions/ColorPicker'
var TimeConv = d3.timeParse('%d %B %Y')
async function fetcher(url) {
    const res = await fetch(url);
    const json = await res.json();
    return json;
  }
const screenWidth = Dimensions.get("window").width
const StackChart =({ApiLink,DisplayDataFor,id})=>{

    const {data:abc} = useSwr(ApiLink,fetcher)
    var dataset = [[],[],[]]
    var ActiveArray = []
    var RecoverArray = []
    var DeathArray = []
    var stateLabelArray=[]
    var Sortablearray =[]
    var StateLabel = []
    if(abc)
    {
        var count=0
        if(DisplayDataFor==='India')
        {
        for(var key in abc.statewise)
        {
            if(key!=='0' && parseInt(key) <4){
                dataset[count][0]=parseInt(abc.statewise[key].active)
                dataset[count][1]=parseInt(abc.statewise[key].recovered)
                dataset[count][2]=parseInt(abc.statewise[key].deaths)
                StateLabel[count] = abc.statewise[key].state

                // dataset[0][0]=abc.statewise[key].active
                // dataset[0][1]=abc.statewise[key].recovered

                count++
            }
        }
        }
        else if(DisplayDataFor==='State')
        {
            count=0
           for(var key in abc[id].districtData)
           {
            //    dataset[0][0]=abc[id].districtData[key].active
                Sortablearray.push({
                disname:key,
                  Confirm:abc[id].districtData[key].confirmed,
                  Active:abc[id].districtData[key].active,
                    Reccover:abc[id].districtData[key].recovered,
                    Death:abc[id].districtData[key].deceased 
                })
            //    dataset[count][0]=result[id].districtData[item].confirmed
                // if(count<3)
                // {
                // dataset[count][0]=abc[id].districtData[key].active
                // dataset[count][1]=abc[id].districtData[key].recovered
                // dataset[count][2]=abc[id].districtData[key].deceased 
                // StateLabel[count]=key
                // count++
                // }
                // ActiveArray[count]=abc[id].districtData[key].active
                // RecoverArray[count]=abc[id].districtData[key].recovered
                // DeathArray[count]=abc[id].districtData[key].deceased 
                // stateLabelArray[count]=key
                // count++
            }
            Sortablearray.sort(function(a,b){
                return b.Confirm-a.Confirm
            })
            var count
            Sortablearray.map(res=>{
                if(count<3)
                {
                    dataset[count][0]=res.Active
                dataset[count][1]=res.Reccover
                dataset[count][2]=res.Death
                StateLabel[count]=res.disname 
                count++
                }
            })
           } 

        }
    
    const data = {
        labels:StateLabel,
        legend: ["L1", "L2", "L3"],
        data: dataset,
        barColors: [ColorPicker("Active"), ColorPicker("Recovered"), ColorPicker("Deaths")]
      };
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "transparent",
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `rgba(255, 255, 255,0)`,
        strokeWidth: 0, // optional, default 3
        barPercentage: 1.5,
        useShadowColorFromDataset: false, // optional
        showLegend:false
      };
    const graphStyle={
        backgroundColor:'transparent',
        
    }
    if(!abc)
    return <View><Text></Text></View>
    return(
        <View>
            <StackedBarChart
                style={graphStyle}
                data={data}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                yLabelsOffset={-10}
                withHorizontalLabels={false}
                
                />
            <View style={Styles.ViewLabelStyle}>
                <Text style={{color:'white',marginLeft:-25,fontSize:12}}>{StateLabel[0]}</Text>
                <Text style={{color:'white',marginLeft:5,fontSize:12}}>{StateLabel[1]}</Text>
                <Text style={{color:'white',marginLeft:13,fontSize:12}}>{StateLabel[2]}</Text>
            </View>
                
        </View>
    )
}
const Styles = StyleSheet.create({
    ViewLabelStyle:{
        alignSelf:'center',
        flexDirection:'row',
        marginTop:-35,
        marginLeft:-70
    }
})
export default StackChart