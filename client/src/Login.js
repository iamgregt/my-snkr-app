import React, { useEffect } from "react"
import {useState} from "react"


function Login() {

    const [authMode, setAuthMode] = useState("signin")
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const changeAuthMode = () => {
      setAuthMode(authMode === "signin" ? "signup" : "signin")
    }

    function onSubmit(e) {
      e.preventDefault()
      
      const user = {
        username,
        password
      }

      
    }



      if (authMode === "signin") {
        return (
          <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={onSubmit}>
              <div className="Auth-form-content">
                <h3 className="Auth-form-title">Sign In</h3>
                <div className="text-center">
                  Not registered yet?{" "}
                  <span className="link-primary" onClick={changeAuthMode}>
                    <a href="#">Sign Up</a>
                  </span>
                </div>
                <div className="form-group mt-3">
                  <label>Username</label>
                  <input
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
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="form-group mt-3">
            <label>First Name</label>
            <input
            required
              type="text"
              className="form-control mt-1"
              placeholder="First Name"
            />
               <label>Last Name</label>
            <input
            required
              type="text"
              className="form-control mt-1"
              placeholder="Last Name"
            />
          </div>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
            required
              type="text"
              className="form-control mt-1"
              placeholder="Enter username"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
            required
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="form-group mt-3">
            <label>Shoe Size</label>
            <input
              type="number"
              min={4}
              max={15}
              className="form-control mt-1"
              placeholder="Enter Shoe Size"
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