import {useState} from 'react'
import Cookies from 'js-cookie'

import './login.css'

const Login = props => {
  const [name, setUserName] = useState('')
  const [userPassword, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const getSuccessfulLoginFrom = token => {
    Cookies.set('jwt_token', token, {expires: 1})
    setShowErrorMessage(false)
    const {history} = props
    return history.replace('/')
  }

  const getFormSubmission = async e => {
    e.preventDefault()
    const userDetails = {username: name, password: userPassword}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const res = await fetch(url, options)
    const data = await res.json()
    if (res.status === 200) {
      getSuccessfulLoginFrom(data.jwt_token)
    } else {
      setErrorMessage(data.error_msg)
      setShowErrorMessage(true)
    }
    console.log(res)
    console.log(data)
  }

  const getUserName = e => {
    setUserName(e.target.value)
  }

  const getPassword = e => {
    setPassword(e.target.value)
  }

  const getTogglePassword = () => {
    setShowPassword(prevState => !prevState)
  }

  return (
    <div className="login-container">
      <form className="form-container" onSubmit={getFormSubmission}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt=""
          className="login-nxt-wave-logo"
        />
        <div className="input-container">
          <label htmlFor="username">USERNAME</label>
          <input
            value={name}
            type="text"
            id="username"
            placeholder="Username"
            onChange={getUserName}
          />
        </div>
        <div className="input-container">
          {showPassword ? (
            <>
              <label htmlFor="showPassword">PASSWORD</label>
              <input
                value={userPassword}
                type="text"
                id="showPassword"
                placeholder="Password"
                onChange={getPassword}
              />
            </>
          ) : (
            <>
              <label htmlFor="hidePassword">PASSWORD</label>
              <input
                value={userPassword}
                type="password"
                id="hidePassword"
                placeholder="Password"
                onChange={getPassword}
              />
            </>
          )}
        </div>
        <div className="checkbox-container">
          <input type="checkbox" id="checkbox" onClick={getTogglePassword} />
          <label htmlFor="checkbox">Show Password</label>
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        {showErrorMessage && <p className="error-message">*{errorMessage}</p>}
      </form>
    </div>
  )
}

export default Login
