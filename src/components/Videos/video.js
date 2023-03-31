import {formatDistanceToNow} from 'date-fns'

import './video.css'

const Videos = props => {
  const {details} = props
  const publishedDate = formatDistanceToNow(new Date(details.published_at))
  return (
    <li className="each-video-list">
      <img src={details.thumbnail_url} alt="" className="video-images" />
      <div className="video-thumbnail-container">
        <img
          src={details.channel.profile_image_url}
          alt=""
          width={35}
          height={50}
        />
        <div className="thumbnails">
          <p className="thumbnail-text">{details.title}</p>
          <div className="channel-details">
            <p className="video-details-text">{details.channel.name}</p>
            <ul>
              <li>
                <p className="video-details-text">{details.view_count} views</p>
              </li>
              <li>
                <p className="video-details-text">{publishedDate} ago</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </li>
  )
}

export default Videos
