import React, { useState,useEffect } from 'react'
import {View} from 'react-native'
import GlobalBase from '../API/GlobalBase'
export default ()=>{
    const [GlobalResult,SetGlobalResult] = useState([])
    const [Check,SetCheck] =useState(true)
        const Req = async ()=>{
            const Response= await GlobalBase.get()
            .catch(error=>{
                console.log(error,"Error in GlobalResponse")
                SetGlobalResult("Somthing went Wrong..")
                SetCheck(false)
            })
            SetGlobalResult(Response.data)
            // console.log(Response)
            // indiaBase.get()
            // .then(response=>{
            //     console.log(response.data)
            //     SetIndiaResult(response.data)
            // })
        }
useEffect(()=>{
    console.log("Global")
    Req()
},[])
    return [GlobalResult,Check]
}