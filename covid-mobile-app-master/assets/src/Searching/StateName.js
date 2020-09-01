import StateTotalData from "../Component/StateTotalData";
import StringMatching from "./StringMatching";

const StateName = (SearchValue)=>{
    var matchString = []
    var count=0
const STATE_NAMES = {
    ap: 'Andhra Pradesh',
    ar: 'Arunachal Pradesh',
    as: 'Assam',
    br: 'Bihar',
    ct: 'Chhattisgarh',
    ga: 'Goa',
    gj: 'Gujarat',
    hr: 'Haryana',
    hp: 'Himachal Pradesh',
    jh: 'Jharkhand',
    ka: 'Karnataka',
    kl: 'Kerala',
    mp: 'Madhya Pradesh',
    mh: 'Maharashtra',
    mn: 'Manipur',
    ml: 'Meghalaya',
    mz: 'Mizoram',
    nl: 'Nagaland',
    or: 'Odisha',
    pb: 'Punjab',
    rj: 'Rajasthan',
    sk: 'Sikkim',
    tn: 'Tamil Nadu',
    tg: 'Telangana',
    tr: 'Tripura',
    ut: 'Uttarakhand',
    up: 'Uttar Pradesh',
    wb: 'West Bengal',
    an: 'Andaman and Nicobar Islands',
    ch: 'Chandigarh',
    dn: 'Dadra and Nagar Haveli and Daman and Diu',
    dl: 'Delhi',
    jk: 'Jammu and Kashmir',
    la: 'Ladakh',
    ld: 'Lakshadweep',
    py: 'Puducherry',
    tt: 'Total',
    un: 'Unassigned',
  };
  for(var key in STATE_NAMES)
  {
      var str = STATE_NAMES[key]
      var reg = new RegExp(SearchValue,'i')
      if(reg.test(str))
      {
        matchString[count]=str
        count++
      }

  }
  return matchString
}

export default StateName