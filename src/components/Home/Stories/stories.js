import './stories.css'

const Stories = props => {
  const {userDetails} = props

  return (
    <div className="story-card slick-item">
      <img className="story-img" alt="user story" src={userDetails.story_url} />
      <p>{userDetails.user_name}</p>
    </div>
  )
}

export default Stories
