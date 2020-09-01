import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import { STATE_NAMES } from '../Screen/Constant'
import useSwr from 'swr'
import ColorPicker from '../Functions/ColorPicker';
async function fetcher(url) {
    const res = await fetch(url);
    const json = await res.json();
    return json;
  }
const RowData =({StateName,ConfirmedCases,ActiveCases,RecoverCases,DeathCases,id,DisplayDataFor})=>{
    const {data:abc} = useSwr(DisplayDataFor==='India'?"https://api.covid19india.org/v4/min/timeseries.min.json":null,fetcher)

    if(DisplayDataFor==='India'){
    var data=null

    for(var key in STATE_NAMES)
    {
        if(id===STATE_NAMES[key])
        {
            data=key.toUpperCase()
            
        }   
    }
    if(abc)
    {
        
    
        var dataConfirm=null
        var dataRecover=null
        var dataDeaths=null
        var today = new Date()
        
        var formattedDate = today.getFullYear() +"-"+
        ('0' + parseInt(today.getMonth() + 1)).slice(-2) +"-"+
        ('0' + today.getDate()).slice(-2);  
        console.log(formattedDate,"=",DisplayDataFor)
        try{

        
        for(var key in abc[data].dates)
        {
            
                if(key===formattedDate)
                {
                                        
                    // dataConfirm=abc[data].dates[key]["delta"].confirmed
                    dataConfirm=(<Text style={{color:ColorPicker("Confirmed")}}>+{abc[data].dates[key]["delta"].confirmed}</Text>)
                    dataRecover=(<Text style={{color:ColorPicker("Recovered")}}>+{abc[data].dates[key]["delta"].recovered}</Text>)
                    // dataRecover=abc[data].dates[key]["delta"].recovered
                    dataDeaths=(<Text style={{color:ColorPicker("Deaths")}}>+{abc[data].dates[key]["delta"].deceased}</Text>)
                    // dataDeaths=abc[data].dates[key]["delta"].deceased
                
                    
                // console.log(abc['TT'].dates[key]["delta"].confirmed)
                }
            
        }
        }
        catch{
            console.log("catch kr liya")
        }

    }
}

    if(!abc&&DisplayDataFor==='India')
    return (<View><Text></Text></View>)

    return(
        <View style={{flexDirection:'row',marginLeft:5}}   >
            <Text style={Styles.StateStyle}>{StateName}</Text>
            <View>
            <Text style={Styles.ConfirmStyle}>{ConfirmedCases}</Text>
            {/* <Text style={{color:ColorPicker("Confirmed")}}>{dataConfirm}</Text> */}
            {dataConfirm}
            </View>
            <Text style={Styles.ActiveStyle}>{ActiveCases}</Text>
            <View>
            <Text style={Styles.RecoverStyle}>{RecoverCases}</Text>
            {dataRecover}
            </View>
            <View>
            <Text style={Styles.DeathStyle}>{DeathCases}</Text>
            {dataDeaths}
            </View>
        </View>
    )
}
const Styles= StyleSheet.create({
    ViewStyle:{
    
    },
    StateStyle:{
        // borderWidth:1,
        // borderColor:'black',
        marginTop:4,
        width:200,
        backgroundColor:'transparent',
        color:'white',
        fontWeight:'bold',
        borderRadius:5,
        marginRight:3

    },
    ConfirmStyle:{
        // borderWidth:1,
        // borderColor:'black',
        marginTop:4,

        width:90,
        backgroundColor:'transparent',
        color:"white",
        fontWeight:'bold',
        borderRadius:5,
        marginRight:3,
        marginLeft:2
        
    },
    ActiveStyle:{
    //    borderWidth:1,
    //     borderColor:'black',
    marginTop:4,

        width:90,
        backgroundColor:'transparent',
        color:'white',
        fontWeight:'bold',
        borderRadius:5,
        marginRight:3,
    },
    RecoverStyle:{
        // borderWidth:1,
        // borderColor:'black',
        marginTop:4,

        width:90,
        backgroundColor:'transparent',
        color:'white',
        fontWeight:'bold',
        borderRadius:5,
        marginRight:3,
    },
    DeathStyle:{
        // borderWidth:1,
        // borderColor:'black',
        marginTop:4,

        width:90,
        backgroundColor:'transparent',
        color:'white',
        
        fontWeight:'bold',
        borderRadius:5,
        marginRight:3,
    },

})
export default RowData