import './scss/footermail.css'
function FooterMail(){


    return(

        <div className="FM">
<div className='listItems'>
<h1>enjoy your time, get discounts!</h1>
<p>sign-up and get unlimited offers and deals!</p>

<form className='inputForm'>
    <input type="email" id='email' name='email' placeholder='Enter your email'/>
    <button className='inputBtn'>Subscribe</button>
</form>
<div className='checkboxContainer'>
<input type="checkbox"  id='checkbox' name='checkbox' disabled/>
<label htmlFor="checkbox">send me a link to get free bookMe app!</label>
</div>


</div>
        </div>
    )
}

export default FooterMail