import './scss/featuredland.css'
import {useState,useEffect} from 'react'
import axios from 'axios'
function FeaturedProperty(){
    const [api,setApi] = useState('' || [])

    useEffect(()=>{
        // setLoading(true)
       
        const fetchApi = async(req,res)=>{
            const url = `api/hotel/fetchhotel?featured=true&limit=4`
         
        try{
            const data = await axios.get(url)
        //    const newData =  await data.json()
             setApi(data.data)
             
        // res.status(200).send(data
        }catch(err){
        console.log(err);
        }
        }
        fetchApi()

    },[])

    return(
        <div className="FListProperty">
            
            {Array.isArray(api)?(<>
             {api?.map(data=>{
                return(
            <div className='FListItem' key={data?._id}>
               
<img src={data?.placePicture || "http://livinator.com/wp-content/uploads/2015/10/thefirstferryin-blogspot.jpg"} alt="property1" className="fpImg"/>
<span className="fpName">{data?.title}</span>
<span className="fpCity">{data?.name}</span>
<span className="fpPrice">starting from ${data?.min_price}</span>
{data?.rating &&<div className='fpRating'>
<button className="fpBtn">{data?.rating}</button>
<span className="fpGrade">legendary</span>
</div>}
</div>
)
})}

</>):

<>


<div className='FListItem'>

<img src="https://pix10.agoda.net/hotelImages/117/1178642/1178642_17063015390054186956.jpg?ca=6&ce=1&s=1024x768" alt="property1" className="fpImg"/>
<span className="fpName">Rotana Hotel</span>
<span className="fpCity">Amman</span>
<span className="fpPrice">starting from $250</span>

<div className='fpRating'>
<button className="fpBtn">7.7</button>
<span className="fpGrade">good</span>
</div>
</div>

<div className='FListItem'>

<img src="https://q-xx.bstatic.com/xdata/images/hotel/max300/219495079.jpg?k=71209bac4a9b105e8d55ad909f301c1c4c7e23fdd33165aae52c6ae7bd626ac7&o=" alt="property2" className="fpImg"/>
<span className="fpName">Mövenpick Hotel</span>
<span className="fpCity">Amman</span>
<span className="fpPrice">starting from $100</span>

<div className='fpRating'>
<button className="fpBtn">8.7</button>
<span className="fpGrade">very good</span>
</div>
</div>

<div className='FListItem'>

<img src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/325817460.jpg?k=b696de57e3400623c308f99386af9647e302066e1d1bdc64db7f15a9afecd069&o=&hp=1" alt="property3" className="fpImg"/>
<span className="fpName">Oryx Hotel</span>
<span className="fpCity">Aqaba</span>
<span className="fpPrice">starting from $120</span>

<div className='fpRating'>
<button className="fpBtn">8.2</button>
<span className="fpGrade">very good</span>
</div>
</div>

</>
}

        </div>
    )
}


export default FeaturedProperty