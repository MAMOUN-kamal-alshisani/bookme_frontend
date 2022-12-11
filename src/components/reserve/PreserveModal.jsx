import "./scss/PreserveModal.css";
import { GrClose } from "react-icons/gr";
import { useState, useEffect, useContext } from "react";
import { SearchContext } from "../../context/searchcontext";
import axios from "axios";
function ReserverPt({ setOpenReserveModal, prtyId}) {
  const [api, setApi] = useState("");
  const [selectedRoom, setSelectRoom] = useState([]);
  const { date } = useContext(SearchContext);

  // console.log(api);
  useEffect(() => {
    const fetchApi = async (req, res) => {
      const url = `https://bookme.onrender.com/api/hotel/room/${prtyId?prtyId:''}`;

      try {
        const data = await axios.get(url);
        setApi(data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchApi();
  }, []);

  const getDatesInRange = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const dates = new Date(startDate.getTime());
    const datesList = [];

    while (dates <= endDate) {
      datesList.push(new Date(dates).getTime());
      dates.setDate(dates.getDate() + 1);
    }
    return datesList;
  };

  const reservedDates = getDatesInRange(date[0].startDate, date[0].endDate);
  const isAvailable = (roomNumber) => {
    const isFound = roomNumber?.unavailableDates.some((date) => {
      reservedDates?reservedDates.includes(new Date(date).getTime()):'' ;
    });
    return !isFound;
  };

  const selectHandler = (e) => {
    const checked = e.target.checked;
    const values = e.target.value;
  //   if(checked){return alert('reserved successfully!')} 
  //   else{
  //      alert('damn')
  //      console.log('sdsadsd');
  //   }
   return setSelectRoom(() =>
      checked
        ? [...selectedRoom, values] 
        : selectedRoom.filter((item) => item !== values)
    );

   
  };

  const clickHandler = async () => {
    try {
      await Promise.all(
        selectedRoom.map((roomId) => {
          const response = axios.put(
            `https://bookme.onrender.com/api/room/availability/${roomId}`,
            {
              date: reservedDates,
            }
          );
          return response.data;
        })
      );
 alert("selected room/s have successfully been reserved!")

    } catch (err) {
      console.log(err);
      alert("there has been a problem, please try again later!")

    }

  };
  return (
    <div className="reserver">
      <div className="reserveModalContainer">


        <div className="iconDiv">
        <GrClose
          className="closeIcon"
          onClick={() => setOpenReserveModal(false)}

        />

{/* <div className="SroomHeader">select room:</div> */}
        </div>
       

        {api
          ? api.map((data, i) => {
           
              return (
           
                <div className="roomList" key={i}>
                  <div className="roomItems">
                    <h2 className="roomTitle">{data?.title}</h2>
                    <p className="roomDesc">{data?.desc}</p>
                    <p className="roomMax">
                      person per room <b>( {data?.maxPeople} )</b>
                    </p>

                    {/* <p className="roomPrice">price {data?.price}</p> */}
                    <p className="roomPrice">Room Number</p>
               
                    {data?.roomNumber.map((room,i) => {
                      return (
                        <div className="roomN" key={room?._id}>
                          <label htmlFor="room">({room?.number})</label>
                 
                          <input
                            type="checkbox"
                            className="checkbox"
                            value={room?._id}
                            onClick={()=>selectHandler}
                            disabled={!isAvailable(room)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          : "none available!"}
<div className="btnContainer">
        <button className="reserveBtn" onClick={()=>clickHandler()}>
          Reserve!
        </button>
        <button className="closeBtn"  onClick={() => setOpenReserveModal(false)}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default ReserverPt;
