import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {AiOutlineSearch} from 'react-icons/ai'

import Navbar from '../../components/Navbar/navbar'
import Videos from '../../components/Videos/video'

import './home.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

const jwtToken = Cookies.get('jwt_token')

const Home = () => {
  const [videosList, setVideoList] = useState([])
  const [currentApiStatus, setCurrentApiStatus] = useState(apiStatus.initial)
  const [searchInput, setSearchInput] = useState('')

  const getSuccessView = () => (
    <ul>
      {videosList.map(eachItem => (
        <Videos details={eachItem} key={eachItem.id} />
      ))}
    </ul>
  )

  const getSuccessViewFromApi = async () => {
    setCurrentApiStatus(apiStatus.inProgress)
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const res = await fetch(url, options)
    const data = await res.json()
    if (res.ok === true) {
      setVideoList(data.videos)
      setCurrentApiStatus(apiStatus.success)
    } else {
      setCurrentApiStatus(apiStatus.failure)
    }
  }

  useEffect(() => getSuccessViewFromApi(), [])

  const getLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const getFailureView = () => {}

  const getYouTubeThumbNailsFromUrl = () => {
    switch (currentApiStatus) {
      case apiStatus.inProgress:
        return getLoader()
      case apiStatus.success:
        return getSuccessView()
      case apiStatus.failure:
        return getFailureView()
      default:
        return null
    }
  }

  const getSearchInput = e => {
    setSearchInput(e.target.value)
  }

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-content-container">
        <div className="header-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt=""
          />
          <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
          <button type="button">GET IT NOW</button>
        </div>
        <div className="bottom-container">
          <div className="search-container">
            <input
              type="search"
              placeholder="Search"
              value={searchInput}
              onChange={getSearchInput}
            />
            <AiOutlineSearch />
          </div>
          {getYouTubeThumbNailsFromUrl()}
        </div>
      </div>
    </div>
  )
}

export default Home
