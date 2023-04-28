import React ,{ useState } from 'react'
import Chart from 'chart.js/auto';
import { CategoryScale } from "chart.js";
import BarChart from "../components/BarChart";
Chart.register(CategoryScale);
const Form = () => {
const [startDate, setstartDate]= useState();
const [endDate, setendDate] = useState();
const [noOfAsteroids, setnoOfAsteroids] = useState([]);
const [noElement, setnoElement] = useState([]);
const [maxSpeed, setmaxSpeed] = useState(0);
const [sizeAvg, setsizeAvg] = useState(0);
const [closestAsteroids, setclosestAsteroids] = useState("");
const [closestAsteroidsDist, setclosestAsteroidsDist] = useState(0);
const [loading, setloading] = useState(false);


const fetchData =async(ansStart,ansEnd)=>{
const finalurl=`https://api.nasa.gov/neo/rest/v1/feed?start_date=${ansStart}&end_date=${ansEnd}&api_key=H9l5VsV4lpLViipq2Atbk5lftOgHHEC2oGbxesNu`;
setloading(true);
 const response=await fetch(finalurl);
   const data= await response.json();  
   setloading(false); 
  const letnoelement=data.near_earth_objects;
  const letnoelement2=Object.values(letnoelement);
  const speed=[];
  for(let i=0;i<letnoelement2.length;i++)
  {
    speed[i]=letnoelement2[i][i].close_approach_data[0].relative_velocity.kilometers_per_hour;
  }
  speed.sort();
  speed.reverse();
  let mSpeed=Math.round(speed[0]);
  setmaxSpeed(mSpeed);
  const size=[];
  const closeDistArray = new Map();
  let k=0;
  for(let i=0;i<letnoelement2.length;i++)
  {
      for(let j=0;j<letnoelement2[i].length;j++)
      {
        size[k]=letnoelement2[i][j].estimated_diameter.kilometers.estimated_diameter_max;
        closeDistArray.set(letnoelement2[i][j].name,letnoelement2[i][j].close_approach_data[0].miss_distance.lunar);
        k++;
      }
  }
  const sortedAsc = new Map([...closeDistArray].sort());
  var sum =size.reduce(function (x, y) {
    return x + y;
}, 0);
  const avg=(sum/size.length);
  var number = parseInt('' + (avg * 100)) / 100
  setsizeAvg(number);

  const first = [...sortedAsc][0];
  var number2 = parseInt('' + (first[1] * 100)) / 100
  setclosestAsteroids(first[0]);
  setclosestAsteroidsDist(number2);
  const d1=[];
  for(let x=0;x<letnoelement2.length;x++)
           {
            d1[x]=letnoelement2[x].length;
           }
           setnoOfAsteroids(d1);
           const d2=[];
        for(let i=0;i<letnoelement2.length;i++)
        {
          d2[i]="Day"+(i+1);
        }
        setnoElement(d2); 
 }
    const  getData=()=>{
   
      let sDate=startDate.toString();
      let eDate=endDate.toString();
      let sD=sDate.split("-");
      let date1=sD[0]+"-"+sD[1]+"-"+sD[2];
         date1=date1.toString();
      let eD=eDate.split("-");
      let date2=eD[0]+"-"+eD[1]+"-"+eD[2];
      date2=date2.toString();

      fetchData(date1,date2);
    }
    const handleOnStartDateChange=(event)=>{
        let s=(event.target.value);
        setstartDate(s);
       
    }
    const handleOnEndDateChange=(event)=>{
        let s=(event.target.value);
        setendDate(s);
        
    }

  return(
  <>
<div className="container">
    <h3  id='text-1'>Pick  Date</h3>
<form>
  <div className="mb-3">
    <label htmlFor="exampleInputStartDate" className="form-label"><h4>Start Date</h4></label>
    <input type="date" className="form-control" onChange={handleOnStartDateChange} value={startDate} id="exampleInputStartDate"/>
  
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEndDate" className="form-label"><h4>End Date</h4></label>
    <h6>(End Date should not be more than 7 days from starting date)</h6>
    <input type="date" className="form-control"  onChange={handleOnEndDateChange} value={endDate} id="exampleInputEndDate"/>
  </div>
  <button className="btn btn-primary " type='button' onClick={getData}>{loading ?(

<div class="spinner-border text-dark" role="status">
<span class="visually-hidden">Loading...</span>
</div>

      ):(
        "Submit"
      )}
      </button>
      
</form>
<div> 
    <BarChart Ddata={noOfAsteroids} eElement={noElement}/>
 </div>

 <div className="container4 mt-4">
  <div className="container4-1">
    <h4 className='heading-1'>Maximum Velocity of an asteroid:  <span id='text-3' style={{color:'#fa5b3d'}}>{maxSpeed}</span> km/hr </h4> 
    </div>
    <div className="container4-2">
    <h4 className='heading-1'>Closest Asteroid to Earth is  <span id='text-3' style={{color:'#fa5b3d'}}> {closestAsteroids} </span> asteroid and having a lunar distance of <span id='text-3' style={{color:'#fa5b3d'}}> {closestAsteroidsDist}km </span></h4>
    </div>
    <div className="container4-3">
      <h4 className='heading-1'> Average size of Asteroids: <span id='text-3' style={{color:'#fa5b3d'}}> {sizeAvg} kms </span></h4> 
      </div>
 </div>
</div>
    </>
  )
}

export default Form