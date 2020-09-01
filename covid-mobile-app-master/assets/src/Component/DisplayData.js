import React, { Suspense } from 'react'
import {View,Text,StyleSheet,ScrollView,Dimensions,ActivityIndicator} from 'react-native'
import NumberChange from '../Functions/NumberChange'
// import RingChart from './RingChart'
import AreaChartExample from './AreaChart'
import * as d3 from 'd3'
import TimeSeries from '../Component/TimeSeries'
import AreaChartSingleCountry from './AreaChartSingleCountry'
import {withNavigation} from 'react-navigation'
const RingChart = React.lazy(()=>import('../Component/RingChart'))
var WidthWindow = Dimensions.get("window").width
var heightWindow = Dimensions.get("window").height
var WidthScreen = Dimensions.get("screen").width
var heightScreen = Dimensions.get("screen").height
const DisplayData = ({Data,title,color,stateName,DisplayDataFor,id,StateCode,ApiLink,navigation,FetchData})=>{
    // console.log(id,"SingleCountryData",DisplayDataFor,"=",FetchData)
    var D3TIME = d3.timeFormat("%Y-%m-%d")
    var dates = new Date()
    var OneDayBefore = new Date(dates.getTime()-(1*24*60*60*1000))
    var CurrentDate = D3TIME(OneDayBefore)+"T00:00:00.000Z"
    var PastDate = new Date(dates.getTime()-(10*24*60*60*1000))
    var PastSavenDaysDate = D3TIME(PastDate)+"T00:00:00.000Z"
    // console.log(PastSavenDaysDate,"[JAIN]",CurrentDate)
    // console.log(heightWindow,"=",heightScreen,"=","height")
    var date = new Date()
    var month = date.getMonth()
    var AreaChart = null
    var TimeS =null
    if(DisplayDataFor==='India')
    {
        AreaChart=<AreaChartExample title={title} from={month} 
                backgroundGradientFrom={"rgb(180,74,42,.5)"}
                ChartWidth={150}
                ChartHeight={80}
                DisplayDataFor={DisplayDataFor}
                id={id}
                StateCode={StateCode}
                ApiLink="https://api.covid19india.org/data.json"
                CurrentDate={CurrentDate}
                PastSavenDaysDate={PastSavenDaysDate}
                FetchData={FetchData}
                />
        
    }
    if(DisplayDataFor==='India')
    {
        TimeS=<TimeSeries title={title}/>
                console.log("dia",title)
    }
    else if(DisplayDataFor==='Global')
    {
        // console.log("GlobalSection")
        AreaChart=<AreaChartExample title={title} from={month} 
                backgroundGradientFrom={"rgb(180,74,42,.5)"}
                ChartWidth={150}
                ChartHeight={80}
                DisplayDataFor={DisplayDataFor}
                id={id}
                StateCode={StateCode}
                ApiLink="https://api.covid19api.com/world"
                CurrentDate={CurrentDate}
                PastSavenDaysDate={PastSavenDaysDate}
                FetchData={FetchData}
                />
    }
    else if(DisplayDataFor==='SingleCountry')
    {
        console.log("Ankit")
        AreaChart=<AreaChartSingleCountry title={title} from={month} 
                backgroundGradientFrom={"rgb(180,74,42,.5)"}
                ChartWidth={150}
                ChartHeight={80}
                DisplayDataFor={DisplayDataFor}
                id={id}
                from={7}
                StateCode={StateCode}
                ApiLink="https://api.covid19api.com/total/country/"
                CurrentDate={CurrentDate}
                PastSavenDaysDate={PastSavenDaysDate}
                FetchData={FetchData}
                />
    }
    // 
    return(
        
        <View style={Styles.ViewStyle} >
            <View style={Styles.ViewStyleTwo}>            
                <View >
                    <Text 
                        style={Styles.TextStyleTitle} 
                        style={{color:color,fontWeight:"bold",marginLeft:10,fontSize:15}}>
                            {title}
                    </Text>
                    <Text 
                        style={Styles.TextStyleData} 
                        style={{color:color,fontSize:25,marginLeft:10}}>
                            {(NumberChange(Data))}
                    </Text>
                    {/* <Text style={Styles.TextStyleData}>{TimeS}</Text> */}
                    <View>
                        {TimeS}
                    </View>
                </View>
                
                {AreaChart}
            </View>
            <View style={{marginLeft:30,marginTop:-15}}>
                    <Suspense fallback={<View><ActivityIndicator/></View>}>
                        <RingChart Data={Data} title={title} DisplayDataFor={DisplayDataFor} id={id} ApiLink={ApiLink}/>
                        </Suspense>
            </View>
        </View>
        
    )
}
const Styles= StyleSheet.create({
    ViewStyle:{
        flexDirection:'row',
        
    },
    ViewStyleTwo:{
        
    
        height:heightWindow>700?heightWindow/9:heightWindow/11,
        width:(WidthWindow/2),
        backgroundColor:'transparent',
        margin:10,
        
        // borderBottomRightRadius:30,
        // borderTopEndRadius:30,
        flexDirection:"row",
        marginLeft:0
        
    },
    TextStyleTitle:{
        fontSize:15,
        marginLeft:3,
        marginTop:5,
        color:'white',
        fontWeight:'bold'
    },
    TextStyleData:{
        fontSize:20,
        marginLeft:3,
        color:"white"
    }
}) 
export default withNavigation(DisplayData)