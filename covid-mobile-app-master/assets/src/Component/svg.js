import React from 'react'
import {View,Text} from 'react-native'
import {Svg,G,Line} from 'react-native-svg'

const SVG = ()=>{
    return(
        <View>
           <Svg height={500} width={300}>
               <Text>Hell</Text>
               <G y={460}>
               <Line
            x1="0"
            y1="2"
            x2={260}
            y2="2"
            stroke={"red"}
            strokeWidth="0.5"
          />
               </G>
               </Svg> 
        </View>
    )
}
export default SVG