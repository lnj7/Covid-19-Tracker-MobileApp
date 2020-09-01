import React, { useState,useEffect } from 'react'
import {View} from 'react-native'
import indiaBase from '../API/IndiaBase'
export default ()=>{
    const [IndiaResult,SetIndiaResult] = useState([])
        const Req = async ()=>{
            const Response= await indiaBase.get()
            .catch(error=>{
                console.log(error)
            })
            SetIndiaResult(Response.data)
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
    return IndiaResult
}