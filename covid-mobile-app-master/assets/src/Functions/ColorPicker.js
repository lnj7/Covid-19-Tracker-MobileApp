export default (color,ChartColor)=>{
    
        if(color==='Confirmed'){
            if(ChartColor==='Confirmed')
            return 'rgba(255,0,0,'
            else
            return 'rgba(255,0,0,.6)'

        }
        else if(color==='Active')
        {
            if(ChartColor==='Active')
            return 'rgba(13,94,244,'
            else
            return 'rgba(13,94,244,.6)'
        }
        else if(color==='Recovered')
        {
            if(ChartColor==='Recovered')
            return 'rgba(0,255,0,'
            else
            return 'rgba(0,255,0,.5)'
        }
        else if(color==='Deaths')
        {
            if(ChartColor==='Deaths')
            return 'rgba(128,128,128,'
            else
            return 'rgba(128,128,128,.8)'
        }
  
}