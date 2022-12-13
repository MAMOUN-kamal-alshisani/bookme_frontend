import './scss/featured.css'
import {useState,useEffect} from 'react'
import axios from 'axios'
function Featured(){
const [api,setApi] = useState({cities:['Amman', 'Dubai', 'Berlin'],list:[6, 4, 1]} ||[])
const [loading,setLoading] = useState(false)

    useEffect(()=>{
        // setLoading(true)
        const fetchApi = async(req,res)=>{
            const url = `api/hotel/getByCount?cities=Amman,Dubai,Berlin`
            setLoading(true)
            
        try{
            const data = await axios.get(url)
        //    const newData =  await data.json()
             setApi(data.data)
        // res.status(200).send(data
        }catch(err){
        console.log(err);
        }
        setLoading(false)
        }
        fetchApi()

    },[])



    return(
   
        <div className="featureContainer">
          {loading? (<h1>'loading please wait...'</h1>):(<><div className="featureList">
            <img className='featureImg' src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/3f/20/5e/exterior.jpg?w=700&h=-1&s=1" alt="feature1" />
            <div className="featureTexts">
            {api?<> <h1>{Array.isArray(api.cities)?api?.cities[0]:''} city</h1>
            <h2>{Array.isArray(api.list)?api?.list[0]:''} properties</h2></> :<h1> city</h1>}
            </div>
        </div>
        <div className="featureList">
            <img className='featureImg' src="https://imagevars.gulfnews.com/2021/09/27/Dubai-skyline--Burj-Khalifa--Downtown-Dubai_17c268bd388_medium.jpg" alt="feature2" />
            <div className="featureTexts">
                
           {api? <> <h1>{Array.isArray(api.cities)?api?.cities[1]:''} city</h1>
            <h2>{Array.isArray(api.list)?api?.list[1]:''} properties</h2></> :<h1> city</h1>}
            </div>
        </div>
        <div className="featureList">
            <img className='featureImg' src="https://d22dvihj4pfop3.cloudfront.net/wp-content/uploads/sites/106/2019/10/28102705/morocco-2_jpg-1024x768.jpg" alt="feature3" />
            <div className="featureTexts">
           {api? <> <h1>{Array.isArray(api.list)?api?.cities[2]:''} city</h1>
            <h2>{Array.isArray(api.list)?api?.list[2]:''} properties</h2></> :<h1> city</h1>}
            </div>
        </div>
        </> ) }
        </div>
    )
}
export default Featured