
const StringMatching = (String,MatchingString)=>{
    // console.log(String,"-",MatchingString)
    var regularexp = `/${MatchingString}/i`
    console.log("[StringMAt.js]",String,"=",MatchingString)
    var reg =new RegExp(MatchingString)
    var result = reg.test(String)
    if(result)
    {
        console.log(String,"=",MatchingString,"[StringMAtch.js]")
        return String
    }
}
export default StringMatching