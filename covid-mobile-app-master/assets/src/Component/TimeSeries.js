import React from 'react'
import {View,Text} from 'react-native'
import useSwr from 'swr'
import d3 from 'd3'
import ColorPicker from '../Functions/ColorPicker';


async function fetcher(url) {
    const res = await fetch(url);
    const json = await res.json();
    return json;
  }
const TimeSeries = ({title})=>{
    const {data:abc} = useSwr("https://api.covid19india.org/v4/min/timeseries.min.json",fetcher)
    console.log("helloooooo")
    if(abc)
    {
        
        var data=null
        var today = new Date()
        // var month= date.getMonth()
        // ab(month)
        // var dates= date.getDate()
        // var year = date.getFullYear()
        // var fulldate = `${year}-${month}-${dates}`
        var formattedDate = today.getFullYear() +"-"+
        ('0' + parseInt(today.getMonth() + 1)).slice(-2) +"-"+
        ('0' + today.getDate()).slice(-2);  
        console.log(formattedDate,"==",title)
        for(var key in abc['TT'].dates)
        {
            
                if(key===formattedDate)
                {
                    if(title==='Confirmed')                    
                    data=abc['TT'].dates[key]["delta"].confirmed
                    if(title==='Recovered')
                    data=abc['TT'].dates[key]["delta"].recovered
                    if(title==='Deaths')
                    data=abc['TT'].dates[key]["delta"].deceased
                    if(title==='Active')
                    data=''
                // console.log(abc['TT'].dates[key]["delta"].confirmed)
                }
            
        }
    }
    if(!abc)
    return (<View><Text></Text></View>)
    return(
        <View>
            <Text style={{color:ColorPicker(title),fontSize:15,marginLeft:10}}>+{data}</Text>
        </View>
    )
}
export default TimeSeries