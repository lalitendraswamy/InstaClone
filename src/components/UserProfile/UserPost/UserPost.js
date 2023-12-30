import './UserPost.css'

const UserPost = props => {
  const {obj} = props

  return (
    <li>
      <img className="up" alt="user post" src={obj.image} />
    </li>
  )
}

export default UserPost
