import React from 'react'
import { createAppContainer} from 'react-navigation'
import {createStackNavigator,HeaderBackground,HeaderBackButton} from 'react-navigation-stack'
import MainScreen from './assets/src/Screen/MainScreen'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout'
import StateScreen from './assets/src/Screen/StateScreen'
import DataTableScreen from './assets/src/Screen/DataTableScreen'
import IndiaScreen from './assets/src/Screen/IndiaScreen'
import StateHomeScreen from './assets/src/Screen/StateHomeScreen'
import GlobalHomeScreen from './assets/src/Screen/GlobalHomeScreen'
import GlobalScreen from './assets/src/Screen/GlobalScreen'
import SingleCountry from './assets/src/Screen/SingleCountry'
import {Button} from 'react-native'
const navigator = createStackNavigator({
  Screen:MainScreen,
  State:StateScreen,
  DataTable:DataTableScreen,
  IndiaScreen:IndiaScreen,
  StateHomeScreen:StateHomeScreen,
  GlobalHomeScreen:GlobalHomeScreen,
  GlobalScreen:GlobalScreen,
  SingleCountry:SingleCountry
  },
  {
  initialRouteName:'Screen',
  
  defaultNavigationOptions:{
    title:"",
    headerStyle:{
      backgroundColor:"rgb(24,26,31)",
      // opacity:1,
      height:0,
      // borderWidth:0,
    
    },
    headerBackTitle:"back",
    headerLeft:(props)=>(
      <HeaderBackButton 
        {...props}
        onPress={()=>console.log(props)}
      />
    )
    
    
  },

}


)

export default createAppContainer(navigator)


