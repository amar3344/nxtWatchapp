import {formatDistanceToNow} from 'date-fns'
import './trendingVideos.css'

const TrendingVideos = props => {
  const {videoDetails} = props
  console.log(videoDetails)

  const publishedDate = formatDistanceToNow(new Date(videoDetails.published_at))

  return (
    <li>
      <div>
        <div>
          <img src={videoDetails.thumbnail_url} alt="" width={50} />
        </div>
        <div>
          <div>
            <img
              src={videoDetails.channel.profile_image_url}
              alt=""
              width={20}
            />
          </div>
          <div>
            <h6>{videoDetails.title}</h6>
            <div>
              <p>{videoDetails.channel.name}</p>
              <p>{videoDetails.view_count}</p>
              <p>{publishedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default TrendingVideos
