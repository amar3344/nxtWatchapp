import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FaFire} from 'react-icons/fa'

import './trending.css'

import Navbar from '../../components/Navbar/navbar'
import TrendingVideos from '../../components/TrendingVideos/trendingVideos'

const token = Cookies.get('jwt_token')

const apiStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Trending = () => {
  const [trendingVideos, setTrendingVideos] = useState([])
  const [currentApiStatus, setCurrentApiStatus] = useState(apiStatus.initial)

  const getTrendingVideosFromUrl = async () => {
    setCurrentApiStatus(apiStatus.inProgress)
    const url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const res = await fetch(url, options)
    const data = await res.json()
    if (res.ok === true) {
      setTrendingVideos(data.videos)
      setCurrentApiStatus(apiStatus.success)
    } else {
      setCurrentApiStatus(apiStatus.failure)
    }

    console.log(res)
    console.log(data)
  }

  useEffect(() => getTrendingVideosFromUrl(), [])

  const renderTrendingVideosSuccessView = () => (
    <ul>
      {trendingVideos.map(eachItem => (
        <TrendingVideos key={eachItem.id} videoDetails={eachItem} />
      ))}
    </ul>
  )

  const renderTrendingVideosFailureView = () => {}

  const renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const getTrendingVideos = () => {
    switch (currentApiStatus) {
      case apiStatus.success:
        return renderTrendingVideosSuccessView()
      case apiStatus.failure:
        return renderTrendingVideosFailureView()
      case apiStatus.inProgress:
        return renderLoaderView()
      default:
        return null
    }
  }
  return (
    <div className="trending-container">
      <Navbar />
      <div>
        <div className="trending-logo-container">
          <div className="trending-image-container">
            <FaFire className="trending-image" />
          </div>
          <h3>Trending</h3>
        </div>
        {getTrendingVideos()}
      </div>
    </div>
  )
}

export default Trending
