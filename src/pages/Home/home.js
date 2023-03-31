import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {AiOutlineSearch} from 'react-icons/ai'
import {IoMdClose} from 'react-icons/io'

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
  const [displayDescription, setDisplayDescription] = useState(true)

  const getSuccessView = () => (
    <ul className="videos-container">
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
    console.log(data)
    console.log(res)
    if (data.videos.length !== 0) {
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

  const getFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
        width={200}
      />
      <h3>No Search results found</h3>
      <p>Try different words or remove search filter</p>
      <button type="button" className="retry-button">
        Retry
      </button>
    </div>
  )

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

  const getToggleButton = () => {
    setDisplayDescription(prevState => !prevState)
  }

  const getResultsBySearchFilter = () => {
    getSuccessViewFromApi()
  }

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-content-container">
        {displayDescription && (
          <div className="header-container">
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                alt=""
                className="nxt-wave-home-image"
              />
              <p className="home-tag-line">
                Buy Nxt Watch Premium prepaid plans with UPI
              </p>
              <button type="button" className="home-button">
                GET IT NOW
              </button>
            </div>
            <IoMdClose onClick={getToggleButton} className="close-button" />
          </div>
        )}

        <div className="bottom-container">
          <div className="search-container">
            <input
              type="search"
              placeholder="Search"
              value={searchInput}
              onChange={getSearchInput}
              className="home-search-input"
            />
            <AiOutlineSearch
              className="search-button"
              onClick={getResultsBySearchFilter}
            />
          </div>
          {getYouTubeThumbNailsFromUrl()}
        </div>
      </div>
    </div>
  )
}

export default Home
