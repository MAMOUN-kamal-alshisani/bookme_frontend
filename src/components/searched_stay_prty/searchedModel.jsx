import { FaArrowRight } from 'react-icons/fa'
import { FaArrowLeft } from 'react-icons/fa'
import { GrClose } from 'react-icons/gr'
import {Button} from 'react-bootstrap';
import './scss/searched.css'
function Modals({basicModal,
    toggleShow,
    imgsrc,
    leftBtn,
    rightBtn
  }){

    return(
        <>
{basicModal &&
        <div className='modalContainer'>
 {/* <Modal show={basicModal} onHide={toggleShow} style={{width:"100%"}} > */}
 <Button className='closeBtn' variant="primary" onClick={toggleShow}>
 <GrClose/>
          </Button>
       <img src={`${imgsrc}`} alt={imgsrc.charAt(35)}/>
          
         
         
          <div className='modalBtnContainer'>
          <Button onClick={leftBtn} className="picDir leftBtn"><FaArrowLeft/></Button>

          <Button className='modalBtn' variant="secondary" onClick={toggleShow}>
            Close
          </Button>
          <Button onClick={rightBtn} className="picDir rightBtn"><FaArrowRight/></Button>
          

    
          </div>

      </div>
    }
    </>
    )
}
export default Modals