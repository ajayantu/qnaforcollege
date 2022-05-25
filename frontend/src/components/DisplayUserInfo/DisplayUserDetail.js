import React, { useEffect,useContext } from 'react'
import icon from './user icon.png';
import bg from './naturebg.jpg'
import point from './points_icon.png'
import questionContext from "../../context/Question"
import { useParams } from 'react-router-dom';
export default function DisplayUserDetail() {
  const { fetchUser,user,setUser,findBadge } = useContext(questionContext);
  const { userId } = useParams();
  const fullBadge = findBadge(user.badge);
  const badgeStyle = {
    backgroundColor: fullBadge.color,
    color: "#fff",
}

useEffect(()=>{
  fetchUser(userId);
  return ()=>{
      setUser({})
  }
  // eslint-disable-next-line
},[])
  return (
    <div className='profile_main'>
      <div className="profile_card">
        <div className="profilebg">
          <img src={bg} alt="" />
        </div>
        <div className="profile_pic">
          <img src={user.profile_pic?user.profile_pic:icon} alt="" />
        </div>
        <div className="user_name_badge">
          <h2 className="username">{user?user.username:""}</h2>
          <span className="author-badge" style={badgeStyle}>{fullBadge.badge}</span>
        </div>
        <div className="points_details">
          <img src={point} alt="" />
          <span className='points_amount'>{user?user.points:""}</span>
        </div>
        <hr className='line' />
        <div className="profile_details">
          <table>
            <tbody>
            <tr>
              <td>{user?user.qstn:""}</td>
              <td>Asked</td>
            </tr>
            <tr>
              <td>{user?user.ans:""}</td>
              <td>Answered</td>
            </tr>
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  )
}
