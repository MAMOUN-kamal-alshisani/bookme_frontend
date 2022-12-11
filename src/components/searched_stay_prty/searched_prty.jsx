import "./scss/searched.css";
import Navbar from "../../ui_components/navbar/navbar";
import Header from "../../ui_components/header/header";
import FooterMail from "../../ui_components/footer_mail_list/footermail";
import Footer from "../../ui_components/footer/footer";
import ReserverPt from '../reserve/PreserveModal'
import Modals from "./searchedModel";
import { useLocation } from "react-router-dom";
import { useState, useEffect,useContext } from "react";
import {SearchContext} from '../../context/searchcontext'
import {AuthContext} from '../../context/auth_context'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const imgs = [
  {
    src: "https://tse1.mm.bing.net/th?id=OIP.cOUMcmla1ZH-M45s9DVD2wHaE8&pid=Api&P=0",
  },
  {
    src: "https://tse1.mm.bing.net/th?id=OIP.NLpnFVTDg4inviVKES0r6wHaEK&pid=Api&P=0",
  },
  {
    src: "https://www.alvarezhomes.com/wp-content/uploads/2020/08/IMG_3673.jpeg",
  },
  { src: "http://roohome.com/wp-content/uploads/2017/01/Maxim-Nizovkin.jpg" },
  {
    src: "http://www.architecturebeast.com/wp-content/uploads/2017/04/Modern-industrial-interior-design-in-beautiful-open-apartment-21.jpg",
  },
  {
    src: "https://www.impressiveinteriordesign.com/wp-content/uploads/2015/05/Modern-House-Interior-Design-Ideas-4.jpg",
  },
  {
    src: "https://sevendimensions.in/wp-content/uploads/2018/10/Home-Interiors.jpg",
  },
  {
    src: "https://architecturesideas.com/wp-content/uploads/2018/11/duplex-house-interior-design39.jpg",
  },
];
function SearchPrty() {
  const navigate = useNavigate()
  const Location = useLocation();
  const path = Location.pathname.split("/")[2];
  const [index, setIndex] = useState(0);
  const [api, setApi] = useState("");
  // console.log(api);
  const [openReserveModal,setOpenReserveModal]= useState(false)
  useEffect(() => {
    // setLoading(true)
    const fetchApi = async (req, res) => {
      const url = `https://bookme.onrender.com/api/hotel/fetchhotel/${path}`;
  
      try {
        const data = await axios.get(url); 
        setApi(data.data); 
      } catch (err) { 
        console.log(err); 
      } 
    }; 
    fetchApi();
  }, []);


const {date,person}  = useContext(SearchContext); 
const {username}  = useContext(AuthContext); 


  const [basicModal, setBasicModal] = useState(false);
  const [imgsrc, setImgSrc] = useState("");

  const toggleShow = (e) => {
    setBasicModal(!basicModal);

    // console.log(e.target.src);
    setImgSrc(e.target.src);
  };

  //   console.log(imgs.src[imgsrc]);
  const leftBtn = () => {
    let obj = api?api.picture:imgs;
    setIndex(index - 1);

    if (index <= 0) {
      setIndex(obj.length - 1);
    }
    setImgSrc(obj[index]);
  };
  const rightBtn = () => {
    let obj = api?api.picture:imgs;
    setIndex(index + 1);

    if (index >= obj.length - 1) {
      setIndex(0);
    }
    setImgSrc(obj[index]);
  };

const milliSecsPerDay = 1000 * 60 *60 *24
function dayDifference(da1e,da2e){
const timeDiff = Math.abs(da2e.getTime() - da1e.getTime())
const dayDiff = Math.ceil(timeDiff / milliSecsPerDay)

return dayDiff
}
const reservedDays =dayDifference(date?date[0]?.endDate:'', date?date[0]?.startDate:'')
const fullprice = api.min_price * reservedDays *person.room

const handleReservation=()=>{
  if(username){
setOpenReserveModal(!openReserveModal)
  }else{
    navigate('/login')
  }
}
  return (
    <div>
      <Navbar />
      <Header type="list" />

      <Modals
        basicModal={basicModal}
        toggleShow={toggleShow}
        imgsrc={imgsrc}
        leftBtn={leftBtn}
        rightBtn={rightBtn}
      />

{api? (
        <>
          {/* {api?.map((data, i) => {
            return ( */}
              <div className="searchList">
                <div className="searchContainer">
                  <div className="searchItem" >
                    <h1 className="SearchName">
                      {api?.name? api.name : "no title avaliable"}
                    </h1>
                    <h4 className="LocationDesc">
                      {api?.city? api.city : "no city avaliable"}
                    </h4>
                    <p className="SearchLocation">
                      {api?.address? api.address : "no address avaliable"}
                    </p>
                    
                    <h4 className="Desc">
                      Book a stay over $
                      {api?.min_price? api.min_price : 2000} at this property
                      and get a free airport taxi
                    </h4>

                    <div className="btnContainer">
                      <button className="bookingBtn" onClick={handleReservation}>
                        reserve or book now
                      </button>
                    </div>
                  </div>

                  <div className="LocationImgs">
                    {api?.picture? (
                      api.picture.map((img, i) => {
                        return (
                          <img key={i}
                            onClick={toggleShow}
                            src={img}
                            alt={img.charAt(35) + i}
                            className="imgs"
                          />
                        );
                      })
                    ) : (
                      <>
                        {imgs.map((img, indx) => {
                          return (
                            <img
                              onClick={toggleShow}
                              src={img.src}
                              alt={img.src.charAt(35) + indx}
                              key={img.src.charAt(35) + indx}
                              className="imgs"
                            />
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>

                <div className="pDescCont">
                  <div className="pDesc_Div">
                    <h2>
                      {api?.name? api.name : "unavailabe"} Every Dreamers
                      Destination
                    </h2>
                    <p className="pDesc">
                    {api?.desc? api.desc :(
    <p>
                      "are air-conditioned room-style residential buildings. 
                      Each apartment has four bedrooms,    
                      shared bathroom and vanity area, living room, and kitchen.
                      As you enter the apartment you are staying in you will
                      come into the living room/kitchen area. A hallway in the
                      apartment leads you to the bedrooms and bathroom area. The
                      first bedroom you come to is bedroom A; the second is
                      bedroom B and so forth. There is a thermostat on the wall
                      next to the door for the first bedroom for use in
                      regulating the temperature. Kitchen is furnished with a
                      refrigerator, stove, double sink, and dishwasher. The
                      bathroom area includes a double sink vanity and a room
                      with toilet and shower/tub."</p>)
              }
            
                    </p>
                  </div>
                  <div className="offerContainer">
                    <h3>nice weekend stay!</h3>
                    <p>
                      Located in the hearts of people it has an exellent rating
                      of 9 stars!
                    </p>
                    <h2>${fullprice} ({reservedDays} nights)</h2>
                    <button onClick={handleReservation}>reserve or book now!</button>
                  </div>
                </div>
                {openReserveModal && <ReserverPt setOpenReserveModal={setOpenReserveModal} prtyId={path} fullprice={fullprice} reservedDays={reservedDays}/>}
              </div>
          {/* //   );
          // })} */}
        </>
      ) : (
        <>
          <h1>no featured proprety room view available!</h1>
        </>
      )}
      <FooterMail />
      <Footer />
    </div>
  );
}

export default SearchPrty;
