import React, { useState,useEffect } from 'react'
import {View} from 'react-native'
import StateBase from '../API/StateBase'
export default ()=>{
    const [StateResult,SetStateResult] = useState([])
        const Req = async ()=>{
            const Response= await StateBase.get()
            .catch(error=>{
                console.log(error)
            })
            SetStateResult(Response.data)
            // indiaBase.get()
            // .then(response=>{
            //     console.log(response.data)
            //     SetIndiaResult(response.data)
            // })
        }
useEffect(()=>{
    console.log("Effenct")
    Req()
},[])
    return StateResult
}