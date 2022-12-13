import React from "react";
import Navbar from '../../ui_components/navbar/navbar'
import Header from "../../ui_components/header/header";
import Featured from "../featured/featured";
import PropertyList from '../propertylist/propertylist'
import FeaturedProperty from '../featuredland/featuredland'
import FooterMail from '../../ui_components/footer_mail_list/footermail'
import Footer from '../../ui_components/footer/footer'
import './scss/home.css'
function Home(){


return(
    <>
   <Navbar/>
   <Header/>
   <div className="homeMain">
    
{/* <Featured/>
<h3 className="homeTitle">
browse by property type
</h3>
<PropertyList/>
<h3 className="homeTitle">
featured property
</h3>
<FeaturedProperty/> */}
<FooterMail/> 
<Footer/> 
   </div>
    </>
)

}


export default Home