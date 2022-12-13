import React from "react";
import "./scss/prolists.css";
import { useState, useEffect } from "react";
import axios from "axios";

function PropertyList() {
  const imgSrc = [
    "https://jooinn.com/images/hotel-1.jpg",
    "https://miro.medium.com/max/3200/1*PWELGI5uLVolWcF3FbJesg.jpeg",
    "https://tse1.mm.bing.net/th?id=OIP.dwfEOIyCCxXpWwdUoAuhWwHaIU&pid=Api&P=0",
    "https://tse2.mm.bing.net/th?id=OIP.LL8UedBemkguGwS0zNXPKwHaFj&pid=Api&P=0",
  ];
  const [api, setApi] = useState(
    [
      { type: "hotel", count: 7 },
      { type: "apartment", count: 2 },
      { type: "mansion", count: 3 },
      { type: "house", count: 4 },
    ] || []
  );

  // console.log(api);
  useEffect(() => {
    // setLoading(true)
    const fetchApi = async (req, res) => {
      const url = `api/hotel/getByType`;

      try {
        const data = await axios.get(url);
        //    const newData =  await data.json()
        setApi(data.data);
        // res.status(200).send(data
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
  }, []);

  return (
    <div className="properylist">
      {Array.isArray(api) ? (
        <>
          {api?.map((item, i) => {
            return (
              <div className="listsItem" key={i}>
                <img src={imgSrc[i]} alt={i} className="pItemImg" />
                <div className="listTitles">
                  <h1>{item?.type}</h1>
                  <h3>
                    {item?.count} {item?.type}
                  </h3>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <>
          <div className="listsItem">
            <img
              src="https://jooinn.com/images/hotel-1.jpg"
              alt="1"
              className="pItemImg"
            />
            <div className="listTitles">
              <h1>Hotel</h1>
              <h3>34 properties</h3>
            </div>
          </div>
          <div className="listsItem">
            <img
              src="https://miro.medium.com/max/3200/1*PWELGI5uLVolWcF3FbJesg.jpeg"
              alt="2"
              className="pItemImg"
            />
            <div className="listTitles">
              <h1>Mansions</h1>
              <h3>145 properties</h3>
            </div>
          </div>
          <div className="listsItem">
            <img
              src="https://tse1.mm.bing.net/th?id=OIP.dwfEOIyCCxXpWwdUoAuhWwHaIU&pid=Api&P=0"
              alt="3"
              className="pItemImg"
            />
            <div className="listTitles">
              <h1>Apartments</h1>
              <h3>50 properties</h3>
            </div>
          </div>
          <div className="listsItem">
            <img
              src="https://tse2.mm.bing.net/th?id=OIP.LL8UedBemkguGwS0zNXPKwHaFj&pid=Api&P=0"
              alt="4"
              className="pItemImg"
            />
            <div className="listTitles">
              <h1>Houses</h1>
              <h3>46 properties</h3>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PropertyList;
