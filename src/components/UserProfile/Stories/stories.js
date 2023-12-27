import './stories.css'

const Stories = props => {
  const {upStoryDetails} = props
  console.log(upStoryDetails.id)
  return (
    <div className="up-story-card">
      <img
        className="up-story-img"
        alt="user story"
        src={upStoryDetails.image}
      />
    </div>
  )
}

export default Stories
