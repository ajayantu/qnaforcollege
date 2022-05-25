import React, { useContext,useState } from 'react'
import './Profile.css'
import user from './user.png';
import bg from './naturebg.jpg'
import point from './points_icon.png'
import questionContext from "../../context/Question"
export default function Profile(props) {
  const [singleFile,setSingleFile] = useState(null);
  const { findBadge,setProfile,uploadProfilePic,setAlert } = useContext(questionContext);
  const fullBadge = findBadge(props.profile.badge);
  const badgeStyle = {
    backgroundColor: fullBadge.color,
    color: "#fff",
  }
  const singleFileChange = (e)=>{
    setSingleFile(e.target.files[0])

  }
  const handleBtnClick = (e)=>{
    e.preventDefault();
    const hidInput = document.querySelector(".upload_pic_control .pic_upload_btn input");
    hidInput.click();
  }
  const uploadSingleFile = async (e)=>{
    e.preventDefault();
    if(singleFile)
    {
      const type = singleFile.type.toString().split("/")[1];
      if(type === "jpeg" || type === "jpg" || type === "png")
      {
        const formData = new FormData();
        formData.append('profileImg',singleFile)
        const url = await uploadProfilePic(formData);
        setProfile({...props.profile,profile_pic:url})
      }
      else{
        setAlert({msg:"Only jpg, jpeg, png files allowed",active:true})
      }
      
    }
  
  }
    
  return (
    <div className='profile_main'>
      <div className="profile_card">
        <div className="profilebg">
          <img src={bg} alt="" />
        </div>
        <div className="profile_pic">
          <img src={props.profile.profile_pic?props.profile.profile_pic:user} alt="" />
        </div>
        <div className="user_name_badge">
          <h2 className="username">{props.profile.username}</h2>
          <span className="author-badge" style={badgeStyle}>{fullBadge.badge}</span>
        </div>
        <div className="points_details">
          <img src={point} alt="" />
          <span className='points_amount'>{props.profile.points}</span>
        </div>
        <hr className='line' />
        <div className="profile_details">
          <table>
            <tbody>
            <tr>
              <td>{props.profile.qstn}</td>
              <td>Asked</td>
            </tr>
            <tr>
              <td>{props.profile.ans}</td>
              <td>Answered</td>
            </tr>
            </tbody>
          </table>
        </div>
        
      </div>
      <div className="upload_pic_control">
        <div className="update_pic_title">
          <span>Update profile image</span>
        </div>
        <div className="pic_upload_btn">
          <input type="file" className="upload_input" name="profileImg" onChange={singleFileChange} />
          <button className="upload_btn" onClick={handleBtnClick} type="submit">Upload</button>
          <span className="upload_text">{singleFile?(singleFile.name.length>13?singleFile.name.slice(0,13)+"...":singleFile.name):"No files Selected"}</span>
        </div>
        <div className="update_btn_pic">
          <button onClick={uploadSingleFile}>Update</button>
        </div>
      </div>
    </div>
  )
}
