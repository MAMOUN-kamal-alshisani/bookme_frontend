import "./scss/signUp.css";
import { HiArrowSmRight } from "react-icons/hi";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [CPassword, setCPassword] = useState("");
console.log(CPassword);
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const signUpHandler = async () => {
    if(credentials.username && credentials.password && credentials.email != '' &&null && undefined){
      try {
        const res = await axios.post("/auth/signup", credentials);
        console.log(res);
        alert("successful signUp!");
        navigate("/login");
      } catch (err) {
        alert(err);
        console.log(err);
      }

    }

  };

  const ComparePassWord = () => {
    let SignUpBtn = document.querySelector(".signUpBtn");
    let cPassword = document.querySelector("#cpassword");
    let password = document.querySelector("#password");

    if (cPassword.focus = true && credentials.password !== CPassword) {
      SignUpBtn.disabled = true;
      setTimeout(()=>{

        return (cPassword.style.outlineColor = "red");

      },4000)
    }

     else if(cPassword.focus = true && credentials.password == CPassword){
      SignUpBtn.disabled = false;
      cPassword.style.outlineColor = "green"
      setTimeout(()=>{
     
        return ( cPassword.style.outlineColor = "blue");

      },1000)
    }


  if (password.focus = true && credentials.password !== CPassword) {
        SignUpBtn.disabled = true;
      
          return (password.style.outlineColor = "red");
        
      }
  };

  useEffect(() => {
    ComparePassWord();
  }, [credentials.password, CPassword]);
  return (
    <>
      <div className="login">
        <div className="lContainer">
        <h2 className="signUpHeader">Sign-up</h2>

          <form className="form" onSubmit={(e)=>e.preventDefault()}>
          <input
            type="text"
            id="username"
            value={credentials.username}
            name="username"
            placeholder="Enter Username"
            onChange={handleChange}
            required
          />
     <input
            type="email"
            id="email"
            value={credentials.email}
            name="email"
            placeholder="email:example@domain.com"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="password"
            value={credentials.password}
            name="password"
            placeholder="Enter password"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            id="cpassword"
            name="cpassword"
            placeholder="confirm password"
            onChange={(e) => setCPassword(e.target.value)}
            value={CPassword}
            required
          />

     
          <button onClick={signUpHandler} className="signUpBtn">
            signUp
          </button>
          </form>
          <div className="signUpContainer">
            <p>already have an account?</p>
            <button onClick={()=>navigate("/login")}>Login Now!<HiArrowSmRight className="arrowIcon"/></button>
          </div>
          {/* {error && <span>{error}</span>} */}
        </div>
      </div>
    </>
  );
}

export default SignUp;
