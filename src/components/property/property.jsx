import Navbar from "../../ui_components/navbar/navbar";
import Header from "../../ui_components/header/header";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
// import { SlCalender } from "react-icons/sl";
import FooterMail from "../../ui_components/footer_mail_list/footermail";
import Footer from "../../ui_components/footer/footer";
import axios from "axios";
import "./scss/property.css";
import { Link } from "react-router-dom";

function Property() {
  const Location = useLocation();
  const [destination, setDestination] = useState("");


  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [person, setPerson] = useState({ adult: 1, child: 0, room: 1 });
  const [showCal, setShowCal] = useState(false);
  const [api,setApi] = useState('')
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);



  useEffect(() => {
    if (Location.state != null || undefined) {
      if (Location.state.destination != null) {
        let newDestination = Location.state.destination[0].toUpperCase().concat(Location.state.destination.slice(1))
        setDestination(newDestination);
      }
      if (Location.state.date != null) {
        setDate(Location.state.date);
      }
      if (Location.state.person != null) {
        setPerson(Location.state.person);
      }
    }
  }, [Location]);

  useEffect(() => {
    // setLoading(true)

  
    fetchApi();
  }, []);

  
  const fetchApi = async (req, res) => {
    const url = `https://bookme.onrender.com/api/hotel/fetchhotel?city=${destination[0]?.toUpperCase().concat(destination.slice(1)) ||destination }&min=${min ||0}&max=${max||1000000}`;

    try {
      const data = await axios.get(url);
      setApi(data.data);
    } catch (err) {
      console.log(err);
    }
  };
const searchHandler= ()=>{

  fetchApi()
}

  return (
    <div>
      <Navbar />
      <Header type="list" />

      <div className="propertyContainer">
        <div className="inputContainer">
          <h1 className="searchTitle">Search</h1>
          <div className="formItemsContainer">
            <label htmlFor="city">Destination</label>
            <input
              type="text"
              id="city"
              name="city"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            {/* <SlCalender className="icons" onClick={()=> setShowCal(!showCal)}/> */}
            <label htmlFor="city">Check-in Date</label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder={`${format(
                date[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}
              // onChange={(e) => setDate(e.target.value)}
              onClick={() => setShowCal(!showCal)}
            />
            {showCal && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="dateCalender"
                minDate={new Date()}
              />
            )}
          </div>

          <h2>Options</h2>
          <div className="optionsInput">
            <label htmlFor="min">Min Price (per night)</label>
            <input
              type="text"
              id="min"
              name="min"
              placeholder="$0"
              value={min}

              onChange={(e) => setMin(e.target.value)}


            />
          </div>

          <div className="optionsInput">
            <label htmlFor="max">Max Price (per night)</label>
            <input
              type="text"
              id="max"
              name="max"
              placeholder="$0" 
              value={max}
              onChange={(e) => setMax(e.target.value)}

            />
          </div>

          <div className="optionsInput">
            <label htmlFor="adult">Adult</label>
            <input
              min={1}
              type="number"
              id="adult"
              name="adult"
              placeholder="1"
              value={person.adult}
              onChange={(e) => setPerson({ ...person, adult: e.target.value })}
            />
          </div>

          <div className="optionsInput">
            <label htmlFor="child">Children</label>
            <input
              min={0}
              type="number"
              id="child"
              name="child"
              placeholder="0"
              value={person.child}
              onChange={(e) => setPerson({ ...person, child: e.target.value })}
            />
          </div>

          <div className="optionsInput">
            <label htmlFor="room">room</label>
            <input
              min={1}
              type="number"
              id="room"
              name="room"
              placeholder="1"
              value={person.room}
              onChange={(e) => setPerson({ ...person, room: e.target.value })}
            />
          </div>
          <button className="inputSearchBtn" onClick={searchHandler}>Search</button>
        </div>

        <div className="cardContianer">
{api ? <>{api.map((data,i)=>{
  return(
 <div className="cardItems" key={data?._id?data._id:i}>
 <div className="imgContainer">
   <img
    src={data?.placePicture?data.placePicture:"https://tse3.mm.bing.net/th?id=OIP.ORX-4rGWb_Nb-ueDhrD1zwHaE8&pid=Api&P=0"}
     alt="one"
     className="Cardimg"
   />
 </div>
 <div className="cardTextContainer">
   <div className="cardText">
     <h1 className="ptyType">{data?.type?data.type:'property'}</h1>
     <p className="ptyLocation">{data?.address?data.address:'address'}</p>
     <button className="taxiBtn">Free airport taxi</button>
     <h2 className="ptyDesc">
     {data?.desc?data.desc:'super delux property with air conditioning'} 
     </h2>
     <p className="ptyFeatures">
       Entire studio .1 bathroom .21m<sup>2</sup> . full bed
     </p>
     <p className="ptyCnlFeatures">Free cancellation</p>
     <p className="ptyCnlFeaturesDesc">
       you can cancel later, so lock on this great price today
     </p>
   </div>
 </div>
 <div className="gradeTextContainer">
   <div className="gradeDiv">
     <span className="grade">Exellent</span>
     <button className="rtBtn">{data?.rating?data.rating:'unrated'}</button>
   </div>
   <div className="feeContainer">
     <p>${data?.min_price?data.min_price:'not available'}</p>
     <p>includes taxes and fees</p>
     {/* http://localhost:3000/api/hotel/fetchhotel?name=${destination}&min=${min ||0}&max=${max||1000000} */}
     <Link to={`${data?._id}`}>
     <button className="availableBtn">see avalaibility!</button>
     </Link>
   </div>
 </div>
</div>
)
})}
</>:(<>
          <div className="cardItems">
            <div className="imgContainer">
              <img
                src="https://tse3.mm.bing.net/th?id=OIP.ORX-4rGWb_Nb-ueDhrD1zwHaE8&pid=Api&P=0"
                alt="one"
                className="Cardimg"
              />
            </div>
            <div className="cardTextContainer">
              <div className="cardText">
                <h1 className="ptyType">tower street apartments</h1>
                <p className="ptyLocation">500 place in market</p>
                <button className="taxiBtn">Free airport taxi</button>
                <h2 className="ptyDesc">
                  super delux apartment with air conditioning
                </h2>
                <p className="ptyFeatures">
                  Entire studio .1 bathroom .21m<sup>2</sup> . full bed
                </p>
                <p className="ptyCnlFeatures">Free cancellation</p>
                <p className="ptyCnlFeaturesDesc">
                  you can cancel later, so lock on this great price today
                </p>
              </div>
            </div>
            <div className="gradeTextContainer">
              <div className="gradeDiv">
                <span className="grade">Exellent</span>
                <button className="rtBtn">9.1</button>
              </div>
              <div className="feeContainer">
                <p>$112</p>
                <p>includes taxes and fees</p>
                <button  className="availableBtn">see avalaibility!</button>
              </div>
            </div>
          </div>
          </>)
        }
          {/* <div className="cardItems">
            <div className="imgContainer">
              <img
                src="https://tse3.mm.bing.net/th?id=OIP.ORX-4rGWb_Nb-ueDhrD1zwHaE8&pid=Api&P=0"
                alt="one"
                className="Cardimg"
              />
            </div>
            <div className="cardTextContainer">
              <div className="cardText">
                <h1 className="ptyType">tower street apartments</h1>
                <p className="ptyLocation">500 place in market</p>
                <button className="taxiBtn">Free airport taxi</button>
                <h2 className="ptyDesc">
                  super delux apartment with air conditioning
                </h2>
                <p className="ptyFeatures">
                  Entire studio .1 bathroom .21m<sup>2</sup> . full bed
                </p>
                <p className="ptyCnlFeatures">Free cancellation</p>
                <p className="ptyCnlFeaturesDesc">
                  you can cancel later, so lock on this great price today
                </p>
              </div>
            </div>
            <div className="gradeTextContainer">
              <div className="gradeDiv">
                <span className="grade">Exellent</span>
                <button className="rtBtn">9.1</button>
              </div>
              <div className="feeContainer">
                <p>$112</p>
                <p>includes taxes and fees</p>
                <button className="availableBtn">see avalaibility</button>
              </div>
            </div>
          </div> */}

          {/* <div className="cardItems">
            <div className="imgContainer">
              <img
                src="https://tse3.mm.bing.net/th?id=OIP.ORX-4rGWb_Nb-ueDhrD1zwHaE8&pid=Api&P=0"
                alt="one"
                className="Cardimg"
              />
            </div>
            <div className="cardTextContainer">
              <div className="cardText">
                <h1 className="ptyType">tower street apartments</h1>
                <p className="ptyLocation">500 place in market</p>
                <button className="taxiBtn">Free airport taxi</button>
                <h2 className="ptyDesc">
                  super delux apartment with air conditioning
                </h2>
                <p className="ptyFeatures">
                  Entire studio .1 bathroom .21m<sup>2</sup> . full bed
                </p>
                <p className="ptyCnlFeatures">Free cancellation</p>
                <p className="ptyCnlFeaturesDesc">
                  you can cancel later, so lock on this great price today
                </p>
              </div>
            </div>
            <div className="gradeTextContainer">
              <div className="gradeDiv">
                <span className="grade">Exellent</span>
                <button className="rtBtn">9.1</button>
              </div>
              <div className="feeContainer">
                <p>$112</p>
                <p>includes taxes and fees</p>
                <button className="availableBtn">see avalaibility</button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <FooterMail />
      <Footer />
    </div>
  );
}

export default Property;
