import { React,useState,useContext } from 'react'
import questionContext from "../../context/Question"
import { useLocation,useParams,useNavigate } from 'react-router-dom';

export default function UpdateQstn() {
    let navigate = useNavigate()
    let { qstnId } = useParams()
    const { state } = useLocation()
    const { updateQuestion } = useContext(questionContext);
    const [qstnDetails,setQstnDetails] = useState({
        title:state.qstn.title,
        description:state.qstn.description,
        visibility:state.qstn.visibility
    });
    const handleSubmitQstn = async (e)=>{
      e.preventDefault();
      if(qstnDetails.title && qstnDetails.description && qstnDetails.visibility)
      {
        if(qstnDetails.title.length>=5 && qstnDetails.description.length>=5){
          await updateQuestion(qstnDetails,qstnId);
          navigate('/yourqstn')
        }
      }
    }
    const handleFormChange = (e)=>{
      setQstnDetails({
        ...qstnDetails,
        [e.target.name]:e.target.value
      })
    }
    return (
      <>
        <div className="askqstn_container">
          <div className="askqstn_elements">
            <div className="title">Update Question</div>
            <form action="#">
              <div className="input_box">
                <span>Question</span>
                <input type="text" name='title' value={qstnDetails.title} placeholder='Enter the question' required onChange={handleFormChange} />
              </div>
              <div className="input_box">
                <span>Description</span>
                <textarea name="description" id="" cols="40" rows="10" value={qstnDetails.description} required placeholder='Enter the description' onChange={handleFormChange}></textarea>
              </div>
              <div className="visibility_details">
                <span className="v_title">Visibility</span>
                <input type="radio" id="public" name="visibility" checked={qstnDetails.visibility===3?true:false} value={3} required onChange={handleFormChange} />
                <label htmlFor="public">Public</label><br />
                <input type="radio" id="teachers_only" name="visibility" checked={qstnDetails.visibility===1?true:false} value={1} required onChange={handleFormChange} />
                <label htmlFor="teachers_only">Teachers</label><br />
                <input type="radio" id="students_only" name="visibility" checked={qstnDetails.visibility===0?true:false} value={0} required onChange={handleFormChange} />
                <label htmlFor="students_only">Students</label>
              </div>
              <button type='submit' className='submit_btn_qstn' onClick={handleSubmitQstn}>Update</button>
            </form>
          </div>
        </div>
      </>
    )
  }
