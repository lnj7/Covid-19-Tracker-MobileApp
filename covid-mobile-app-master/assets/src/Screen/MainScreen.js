import React, { Suspense, useState } from 'react'
import {View,Text,ScrollView,StyleSheet,Dimensions, TouchableOpacity,FlatList} from 'react-native'
import {Ionicons,MaterialCommunityIcons} from '@expo/vector-icons'
import SearchBar from '../Component/SearchBar'
import RingChart from '../Component/RingChart'
import Bu from 'react-heooo'
import {withNavigation}  from 'react-navigation'
import ButtonJs from '../Component/Button'
import StatisticsIcon from '../Icons/StatisticsIcon'
import Constant from '../Screen/Constant'
import StateName from '../Searching/StateName'
import ColorPicker from '../Functions/ColorPicker'
import TimeSeries from '../Component/TimeSeries'
const TotalData = React.lazy(()=>import("../Component/TotalData"))
const AreaChartExample =  React.lazy(()=>import("../Component/AreaChart"))
const heightScreen = Dimensions.get("screen").height
const heightWindow = Dimensions.get("window").height
var wi = false
const MainScreen = ({navigation})=>{
    // const result = IndiaResponse()
    // console.log(result.cases_time_series[0].dailyconfirmed)
    const [WidthForSearch,SetWidthForSearch] = useState(false)
    const [Search,SetSearch]  = useState('')
    const [SearchString,SetSearchString] = useState([])
    const heightWindow = Dimensions.get("window").height
    const widthWindow = Dimensions.get("window").width
    var date = new Date()
    var month = date.getMonth()
    function onChangeText(value){

        SetSearch(value)
        var reg = new RegExp(Search)
        SetSearchString(StateName(Search))
        // console.log(SearchString,"sfd")
        SetWidthForSearch(true)
        if(value==='')
        {
            SetWidthForSearch(false)
        }
    }
    return(
        
        // <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{height:heightScreen,backgroundColor:'rgb(24,26,31)'}}>      
        <View style={Styles.FirstViewStyle}>
            <View style={{flexDirection:"row",width:widthWindow,justifyContent:"space-around"}}>
                <View style={{alignItems:'flex-start'}}>
                    {/* <TouchableOpacity onPress={()=>navigation.navigate('DataTable',{DisplayDataFor:"India",ApiLink:"https://api.covid19india.org/data.json",FetchData:true})}>
                        <MaterialCommunityIcons name="chart-timeline-variant" size={40} color="white"/>
                    </TouchableOpacity> */}
                    <StatisticsIcon onPress={()=>navigation.navigate('DataTable',{DisplayDataFor:"India",ApiLink:"https://api.covid19india.org/data.json",FetchData:true})}
                    color={"white"}
                    />
                </View>
                
                <View style={{}}>
                <Text 
                    style={{color:"white",fontWeight:'bold',fontSize:30}}>
                        Covid-19 Tracker
                </Text>
                </View>
                <View style={{alignItems:'flex-end'}}>
                <TouchableOpacity onPress={()=>navigation.navigate("GlobalHomeScreen",{FetchData:false})}>
                <Ionicons name="md-globe" size={40} color="white" />
                </TouchableOpacity>
                </View>

                
        </View>

        
        <View >
        <SearchBar 
            value={Search}
            onChangeText={text=>onChangeText(text)}
            placeholder={"Search"}
        />
        {/* ()=> navigation.navigate("StateHomeScreen",{id:item.state} */}
        <View style={{backgroundColor:'white',
        height:50,
        borderBottomEndRadius:8,
        borderBottomStartRadius:8,
        marginHorizontal:15,
        marginVertical:15,
        flexDirection:"row",
        justifyContent:"flex-start",
        alignSelf:"center",
        marginTop:-18,
        width:WidthForSearch?382:0}} >
            <TouchableOpacity onPress={()=>{
                    SetSearch('')
               return navigation.navigate("StateHomeScreen",{id:SearchString[0]})}}>
                    {/* <Text style={{color:'white'}}>{SearchString.map(res=>res)}</Text> */}
        
                    <FlatList 
                    data={SearchString}
                    renderItem={({item})=>{
                        // console.log(item,"qwert")
                        wi=true
                        return(
                        <Text style={{fontSize:18,color:ColorPicker('Deaths')}}>{item}</Text>
                        )
                    }}
                    
                    />
            </TouchableOpacity>
            </View>
        </View>
        </View>  
        {/* <ScrollView automaticallyAdjustContentInsets={false}> */}
        <View style={Styles.SecondViewStyle}>
        <Suspense fallback={<Text>Loading</Text>}>
            <TotalData/>
        </Suspense>
            {/* <TableData/>     */}
         {/* <ButtonJs click={()=>navigation.navigate('DataTable',{DisplayDataFor:"India",ApiLink:"https://api.covid19india.org/data.json"})} title={"Statistics"}/> */}
         

        </View> 
            {/* </ScrollView> */}
            <ButtonJs click={()=>navigation.navigate('IndiaScreen')} title={"StateWise"}/>
            {/* <Button /> */}
            {/* <Bu/>
            <TimeSeries title={"Confirmed"}/> */}
        </View>
        // </ScrollView>
    )
}
const Styles = StyleSheet.create({
    FirstViewStyle:{
        // backgroundColor:"rgb(24,26,31)",         //rgb(94,90,180)
        // height:height/3,
        // borderBottomStartRadius:15,
        // borderBottomEndRadius:15,
        marginTop:heightScreen/15
    },
    SecondViewStyle:{
        // height:height-(height/3)+25,
        marginTop:10,
        // borderTopEndRadius:45,
        // borderTopLeftRadius:45
    },
    SearchList:{
        backgroundColor:'white',
        height:50,
        borderRadius:5,
        marginHorizontal:15,
        marginVertical:15,
        flexDirection:"row",
        justifyContent:"flex-start",
        alignSelf:"center",
        
        
    }
    
})
export default withNavigation(MainScreen)