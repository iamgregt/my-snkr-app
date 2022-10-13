import React, { useEffect } from "react"
import {useState} from "react"
import {useNavigate} from "react-router-dom"
import './Login.css'


function Login({onLogin}) {

    const [authMode, setAuthMode] = useState("signin")
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    
    const navigate = useNavigate()



    const changeAuthMode = () => {
      setAuthMode(authMode === "signin" ? "signup" : "signin")
    }

    function clearState(){
      setUsername('')
      setPassword('')
      navigate('/')
      changeAuthMode()
    }

    function onSignUp(e) {
      e.preventDefault()

      

      
      const user = {
        username,
        password
      }

      fetch('/users', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
      .then(res => res.json()).then(data => {
        console.log(data)
        clearState()
      })
    }

    function onSubmit(e) {
      e.preventDefault()

      const user = {
        username,
        password
      }

      fetch('/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
        .then(res => {
          if(res.ok){
            res.json().then(user => {
              navigate('/')
              console.log(user)
              onLogin(user)
            })
          }{
            res.json().then(errorData => {
              setErrors(errorData.error)
              setUsername('')
              setPassword('')
            })
          }
        } )
    
    }



      if (authMode === "signin") {
        return (
          <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={onSubmit}>
              <div className="Auth-form-content">
                <h3 className="Auth-form-title">Sign In</h3>
                <div className="text-center">
                  <span className="nry">Not registered yet?{" "}</span>
                  <span className="link-primary" onClick={changeAuthMode}>
                    <a href="#">Sign Up</a>
                  </span>
                  {errors[0] && 
                  <div class="error-message">
                  <h4 class="error-text">{errors}</h4>
                </div>
                }
                </div>
                <div className="form-group mt-3">
                  <label>Username</label>
                  <input
                  required
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}                
                    type="text"
                    className="form-control mt-1"
                    placeholder="Enter username"
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Password</label>
                  <input
                  required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    className="form-control mt-1"
                    placeholder="Enter password"
                  />
                </div>
                <div className="d-grid gap-2 mt-3">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
                <p className="text-center mt-2">
                  Forgot <a href="#">password?</a>
                </p>
              </div>
            </form>
          </div>
        )
      }


  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={onSignUp}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
                  Already a User?{" "}
                  <span className="link-primary" onClick={changeAuthMode}>
                    <a href="#">Sign In</a>
                  </span>
                </div>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
            onChange={e => setUsername(e.target.value)}
            value={username}
            required
              type="text"
              className="form-control mt-1"
              placeholder="username"
            />
               <label>password</label>
            <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
              type="password"
              className="form-control mt-1"
              placeholder="password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login 