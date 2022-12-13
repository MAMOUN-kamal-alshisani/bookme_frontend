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


api?.map(data=>{
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

        </div>
    )
}


export default FeaturedProperty