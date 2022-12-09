import "./scss/header.css";
// import { MdHotel,IoAirplaneSharp ,GiCityCar,RiTaxiLine,GrAttraction,SlCalender,MdPersonAdd} from 'react-icons/all'
import { MdHotel } from "react-icons/md";
import { IoAirplaneSharp } from "react-icons/io5";
import { GiCityCar } from "react-icons/gi";
import { RiTaxiLine } from "react-icons/ri";
import { GrAttraction } from "react-icons/gr";
import { SlCalender } from "react-icons/sl";
import { MdPersonAdd } from "react-icons/md";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { SearchContext } from "../../context/searchcontext";
import { AuthContext } from "../../context/auth_context";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
function Header({ type }) {
  const navigate = useNavigate();
  const [showCal, setShowCal] = useState(false);
  const [showpeople, setShowpeople] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const { username } = useContext(AuthContext);
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);
  const [room, setRoom] = useState(1);
  const [destination, SetDestination] = useState("");

  const [person, setPerson] = useState({
    adult: adult,
    child: child,
    room: room,
  });

  let useClickOutside = (handler) => {
    const modalRef = useRef();

    useEffect(() => {
      const modalHandler = (e) => {
        if (!modalRef?.current?.contains(e?.target)) {
          // if(showCal || showpeople){
          handler();
          // setShowCal(false) || setShowpeople(false)
          // }
        }
      };

      document.addEventListener("mousedown", modalHandler);

      return () => {
        document.removeEventListener("mousedown", modalHandler);
      };
    });

    return modalRef;
  };

  useEffect(() => {
    setPerson((prev) => {
      return {
        ...prev,
        adult: adult,
        child: child,
        room: room,
      };
    });
  }, [adult, child, room]);

  const increaseCounter = (counter, cb) => {
    return cb(() => counter + 1);
  };

  const decreaseCounter = (counter, cb) => {
    if (counter == adult || counter == room) {
      if (counter > 1) {
        cb(() => counter - 1);
      }
    }
    if (counter == child) {
      if (counter > 0) {
        cb(() => counter - 1);
      }
    }
    return 0;
  };

  const { dispatch } = useContext(SearchContext);
  const destinationHandler = () => {
    if (destination != "") {
      dispatch({ type: "NEW_SEARCH", payload: { destination, date, person } });
      navigate("/property", { state: { destination, date, person } });
    } else {
      alert("please fill in required information!");
    }
  };

  let modalRef = useClickOutside(() => {
    if (showCal || showpeople) {
      setShowCal(false) || setShowpeople(false);
    }
  });

  const logOutHandler = () => {
    localStorage.removeItem("user");
    window.location.reload(true);
  };

  const randomDestination = () => {
    const city = {
      0: "Amman",
      1: "Dubai",
      2: "Rome",
      3: "Tokyo",
      4: "London",
      5: "Ankara",
      6: "Damascus",
      7: "Juba",
      8: "Seoul",
      9: "Moscow",
      10: "Amsterdam",
    };
    SetDestination(
      city[
        Math.floor(Math.random() * Object.keys(city).length)
      ].toLocaleLowerCase()
    );
    //    console.log(destination);
  };

  const toolTip = (tip) => {
    setTimeout(() => {
      return <span>{tip}</span>;
    }, 2000);
  };
  return (
    <header className="header">
      <div className="headerList">
        <div className="listItems">
          <MdHotel className="icons" />
          <p className="icon_text">stays</p>
        </div>
        <div className="listItems">
          <IoAirplaneSharp className="icons" />
          <p className="icon_text">flights</p>
        </div>
        <div className="listItems">
          <GiCityCar className="icons" />
          <p className="icon_text">car rentals</p>
        </div>
        <div className="listItems">
          <RiTaxiLine className="icons" />
          <p className="icon_text">taxi's</p>
        </div>
        <div className="listItems">
          <GrAttraction className="icons" stroke="white" />
          <p className="icon_text">attraction</p>
        </div>
      </div>
      {type !== "list" && (
        <>
          <div className="textContainer">
            <h1 className="headerTitle">
              {" "}
              booking your travels and getting a discount? awesome!
            </h1>

            <p className="headerText">
              get discounts on your travels upto 10% and more on bookMe!
            </p>
            {!username ? (
              <Link to="/login" className="btn btn-primary">
                <button className="headerBtn">Sign-in</button>
              </Link>
            ) : (
              <button className="headerBtn" onClick={logOutHandler}>
                log-out
              </button>
            )}
          </div>

          <div className="searchInputList" ref={modalRef}>
            <div className="searchInputItems">
              <Tippy content={toolTip("click to select a city randomly!")}>
                <span>
                  <MdHotel className="icons" onClick={randomDestination} />
                </span>
              </Tippy>
              <Tippy content={<span>write up city name</span>}>
                <input
                  type="text"
                  placeholder="your travel destination?"
                  className="searchInput"
                  id="destination"
                  onChange={(e) => SetDestination(e.target.value)}
                  value={destination}
                />
              </Tippy>
            </div>
            <Tippy content={<span>click to select a check-in and out date!</span>}>
              <div className="searchInputItems">
                <SlCalender
                  id="cl_Icon"
                  className="icons"
                  onClick={() => setShowCal(!showCal)}
                />
                <span
                  onClick={() => setShowCal(!showCal)}
                  id="cl_Icon"
                  className="icon_text"
                >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
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
            </Tippy>

            <Tippy content={<span>reserve accommodation!</span>}>
              <div className="searchInputItems">
                <MdPersonAdd
                  className="icons"
                  onClick={() => setShowpeople(!showpeople)}
                />
                <span
                  className="icon_text"
                  onClick={() => setShowpeople(!showpeople)}
                >{`${person.adult} adult, ${person.child} children, ${person.room} room.`}</span>
                {showpeople && (
                  <div className="searchOptions">
                    <div className="searchList">
                      <p className="searchItem">Adult:</p>
                      <button
                        className="counterBtn"
                        onClick={() => decreaseCounter(adult, setAdult)}
                      >
                        -
                      </button>
                      <h3 className="itemHeader">{adult}</h3>
                      <button
                        className="counterBtn"
                        onClick={() => increaseCounter(adult, setAdult)}
                      >
                        +
                      </button>
                    </div>

                    <div className="searchList">
                      <p className="searchItem">chidren:</p>
                      <button
                        className="counterBtn"
                        onClick={() => decreaseCounter(child, setChild)}
                      >
                        -
                      </button>
                      <h3 className="itemHeader">{child}</h3>
                      <button
                        className="counterBtn"
                        onClick={() => increaseCounter(child, setChild)}
                      >
                        +
                      </button>
                    </div>
                    <div className="searchList">
                      <p className="searchItem">room:</p>
                      <button
                        className="counterBtn"
                        onClick={() => decreaseCounter(room, setRoom)}
                      >
                        -
                      </button>
                      <h3 className="itemHeader">{room}</h3>
                      <button
                        className="counterBtn"
                        onClick={() => increaseCounter(room, setRoom)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </Tippy>
            <button className="searchBtn" onClick={destinationHandler}>
              Search
            </button>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
