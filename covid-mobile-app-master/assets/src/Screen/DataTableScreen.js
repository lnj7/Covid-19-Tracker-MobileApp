import React, { Suspense } from 'react'
import {View,Text,Dimensions,StyleSheet, TabBarIOS,Button,TouchableOpacity} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {withNavigation} from 'react-navigation'
import * as d3 from 'd3'
import AreaChartExample from '../Component/AreaChart'
import ColorPicker from '../Functions/ColorPicker'
// import StackChart from '../Component/StackChart'
import Spinner from 'react-native-loading-spinner-overlay'
import { AppLoading } from 'expo'
import BackButton from '../Component/BackButton'
const StackChart = React.lazy(()=>import('../Component/StackChart'))
const height = Dimensions.get("screen").height
const width = Dimensions.get("window").width
const DataTableScreen = ({navigation,id})=>{
    var stack=null
    var D3TIME = d3.timeFormat("%Y-%m-%d")
    var dates = new Date()
    var OneDayBefore = new Date(dates.getTime()-(1*24*60*60*1000))
    var CurrentDate = D3TIME(OneDayBefore)+"T00:00:00.000Z"
    var PastDate = new Date(dates.getTime()-(7*24*60*60*1000))
    var PastSavenDaysDate = D3TIME(PastDate)+"T00:00:00.000Z"
    // console.log("PastSavenDate",SavenDays,"Currnet==",CurrentDate)
    var FetchData = navigation.getParam("FetchData")
    // console.log(FetchData,"fatchy")
    var DisplayDataFor = navigation.getParam("DisplayDataFor")
    var ApiLink = navigation.getParam("ApiLink")
    var id= navigation.getParam("id")
    var AreaChartEx = null
    if(DisplayDataFor==='India' || DisplayDataFor ==='Global')
    AreaChartEx = <View>
        <View style={Styles.ViewStyleSecond}>
            <AreaChartExample 
            title={"Confirmed"} from={6}                 
            backgroundGradientFrom={"rgb(180,74,42,.5)"}
            ChartHeight={100}
            ChartWidth={400}
            ApiLink={ApiLink}
            DisplayDataFor={DisplayDataFor}
            CurrentDate={CurrentDate}
            PastSavenDaysDate={PastSavenDaysDate}
            FetchData={FetchData}
            />
            </View>
            <View style={Styles.ViewStyleThird}>
            <AreaChartExample title={"Recovered"} from={6}                 
            backgroundGradientFrom={"rgb(180,74,42,.5)"}
            ChartHeight={100}
            ChartWidth={400}
            ApiLink={ApiLink}
            DisplayDataFor={DisplayDataFor}
            CurrentDate={CurrentDate}
            PastSavenDaysDate={PastSavenDaysDate}
            FetchData={FetchData}

            />
            
            </View>
            <View style={Styles.ViewStyleFourth}>
            <AreaChartExample title={"Active"} from={6}                 
            backgroundGradientFrom={"rgb(180,74,42,.5)"}
            ChartHeight={100}
            ChartWidth={400}
            ApiLink={ApiLink}
            DisplayDataFor={DisplayDataFor}
            CurrentDate={CurrentDate}
            PastSavenDaysDate={PastSavenDaysDate}
            FetchData={FetchData}

            />
            </View>
            <View style={Styles.ViewStyleFive}>
                <AreaChartExample title={"Deaths"} from={6}                 
                backgroundGradientFrom={"rgb(180,74,42,.5)"}
                ChartHeight={100}
                ChartWidth={400}
                ApiLink={ApiLink}
                DisplayDataFor={DisplayDataFor}
                CurrentDate={CurrentDate}
            PastSavenDaysDate={PastSavenDaysDate}
            FetchData={FetchData}

                />
            </View>
    </View>
    if(DisplayDataFor==='India')
    stack=(
        <View style={{marginTop:50}}>
                {/* <TableData/> */}
                <Suspense fallback={<View><Spinner visible={true} textContent="Loading..." textStyle={{color:'white'}}/></View>}>
                <StackChart ApiLink={ApiLink} id={id} DisplayDataFor={DisplayDataFor}/>
                </Suspense>
                <View style={Styles.ViewChartStyle}><Text style={{color:'white',fontWeight:'bold',fontSize:22}}>Top 3 Effected States</Text></View>
            </View>
    )
    return(
        <View style={Styles.ViewStyle}>
            <BackButton onPress={()=>navigation.goBack()}/>
            <View>
                <View style={Styles.ViewStyleColorCircle}>
                        <View style={Styles.ViewStyleRedCircle}></View>
                        <View style={Styles.ViewStyleBlueCircle}></View>
                        <View style={Styles.ViewStyleGreenCircle}></View>
                        <View style={Styles.ViewStyleGrayCircle}></View>
                </View>
                <View style={Styles.ViewStyleCircleInfo}>
                        <View style={Styles.ViewStyleRedCircleInfo}><Text style={{color:"white"}}>C</Text></View>
                        <View style={Styles.ViewStyleBlueCircleInfo}><Text style={{color:"white"}}>A</Text></View>
                        <View style={Styles.ViewStyleGreenCircleInfo}><Text style={{color:"white"}}>R</Text></View>
                        <View style={Styles.ViewStyleGrayCircleInfo}><Text style={{color:"white"}}>D</Text></View>
                </View>
            </View>
            
            {AreaChartEx}
            {stack}
            
            {/* <Button title="back" onPress={()=>navigation.goBack()}/> */}
        </View>

    )
}
const Styles = StyleSheet.create({
    ViewChartStyle:{
        alignSelf:'center',
        marginTop:-10
    },
    ViewStyle:{
        backgroundColor:'rgb(24,26,31)', //rgb(111,108,170)
        opacity:1,
        height:height,
        
    },
    ViewStyleSecond:{
        marginTop:50
    },
    ViewStyleThird:{
        marginTop:-100
    },
    ViewStyleFourth:{
        marginTop:-40
    },
    ViewStyleFive:{
        marginTop:-140
    },
    ViewStyleColorCircle:{
        
        marginTop:40,
        marginLeft:width/2.6,
        flexDirection:'row',

    },
    ViewStyleRedCircle:{
        height:15,
        width:15,
        backgroundColor:ColorPicker("Confirmed"),
        borderRadius:50,
        margin:5
    },
    ViewStyleBlueCircle:{
        height:15,
        width:15,
        backgroundColor:ColorPicker("Active"),
        borderRadius:50,
        margin:5

    },
    ViewStyleGreenCircle:{
        height:15,
        width:15,
        backgroundColor:ColorPicker("Recovered"),
        borderRadius:50,
        margin:5
    },
    ViewStyleGrayCircle:{
        height:15,
        width:15,
        backgroundColor:ColorPicker("Deaths"),
        borderRadius:50,
        margin:5
    },
    ViewStyleCircleInfo:{
        marginLeft:width/2.6,
        flexDirection:"row"
    },
    ViewStyleRedCircleInfo:{
        color:"white",
        margin:5

    },
    ViewStyleBlueCircleInfo:{
        color:"white",
        margin:5,
        marginLeft:12

    },
    ViewStyleGreenCircleInfo:{
        color:"white",
        margin:5,
        marginLeft:10

    },
    ViewStyleGrayCircleInfo:{
        color:'white',
        margin:5,
        marginLeft:12

    }
})
export default withNavigation(DataTableScreen)