import React from 'react'
import {View,TouchableOpacity} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
const StatisticsIcon = ({onPress,color})=>{
    return(
        <View>
            <TouchableOpacity onPress={onPress}>
                        <MaterialCommunityIcons name="chart-timeline-variant" size={40} color={color}/>
                    </TouchableOpacity>
        </View>
    )
}

export default StatisticsIcon