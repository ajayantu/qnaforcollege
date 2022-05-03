import React, { useContext, useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';
import QuestionContext from '../../context/Question'
import './DisplayUser.css'
import icon from './user icon.png';

export default function DisplayUser() {

    const { fetchUser,user,role,setUser,uploadProfilePic } = useContext(QuestionContext);
    const { userId } = useParams();
    const [singleFile,setSingleFile] = useState(null);

    const singleFileChange = (e)=>{
        setSingleFile(e.target.files[0])
    }
    const uploadSingleFile = async (e)=>{
        e.preventDefault();
        if (singleFile!==null) {
            const formData = new FormData();
            formData.append('profileImg',singleFile)
            const url = await uploadProfilePic(formData);
            setUser({...user,profile_pic:url})
        }
    }
    useEffect(()=>{
        fetchUser(userId);
        return ()=>{
            setUser({})
        }
        // eslint-disable-next-line
    },[])

    return (
        <>
            <div className="user_container">
            
                <div className="user_details">
                <div className="user_icon"><img src={user.profile_pic?user.profile_pic:icon} alt="" /></div>
                <form className="pic_form" encType="multipart/form-data">
                    <input type="file" name="profileImg" onChange={singleFileChange} />
                    <button type="submit" onClick={uploadSingleFile}>Update</button>
                </form>
                    <pre>
                    <span>Username                     :    {user?user.username:""}</span>
                    <span>Role                                :    {user?role:""}</span>
                    <span>Questions Asked         :    {user?user.qstn:""}</span>
                    <span>Questions Answered  :    {user?user.ans:""}</span>
                    <span>Total Points Earned     :    {user?user.points:""}</span>
                    </pre>
                </div>
                
            </div>
        </>
    )
}
