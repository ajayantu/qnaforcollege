import { React,useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import questionContext from "../../context/Question"
import './AskQstn.css'

export default function AskQstn() {
  const navigate = useNavigate();
  const { addQuestion,setAlert,darkmode } = useContext(questionContext);
  const [qstnDetails,setQstnDetails] = useState({});
  const handleSubmitQstn = async (e)=>{
    e.preventDefault();
    if(qstnDetails.title && qstnDetails.description && qstnDetails.visibility)
    {
      if(qstnDetails.title.length>=5 && qstnDetails.description.length>=5){
        await addQuestion(qstnDetails);
        navigate("/questions/1")
        setAlert({msg:"Question added successfully...",active:true,type:2})

      }
      else{
        setAlert({msg:"Description and title should have min length 5...",active:true})
      }
    }
    else{
      setAlert({msg:"Please provide all the details...",active:true})
    }
    const modal = document.querySelector(".askqstn_elements");
    const overlay = document.querySelector("#overlay");
    modal.classList.remove("active");
    overlay.classList.remove("active");
  }
  const handleFormChange = (e)=>{
    setQstnDetails({
      ...qstnDetails,
      [e.target.name]:e.target.value
    })
  }
  return (
    <>
        <div className={`askqstn_elements ${darkmode && 'bg-dark'}`}>
          <div className={`title ${darkmode && 'title-dark'}`}>Ask Question</div>
          <form action="#">
            <div className="input_box">
              <span className={`${darkmode && 'title-dark'}`}>Question</span>
              <input className={`${darkmode && 'bg-input-dark'}`} type="text" name='title' placeholder='Enter the question' required onChange={handleFormChange} />
            </div>
            <div className="input_box">
              <span className={`${darkmode && 'title-dark'}`}>Description</span>
              <textarea className={`${darkmode && 'bg-input-dark'}`} name="description" id="" cols="40" rows="10" required placeholder='Enter the description' onChange={handleFormChange}></textarea>
            </div>
            <div className="visibility_details">
              <span className={`v_title ${darkmode && 'title-dark'}`}>Visibility</span>
              <input type="radio" id="public" name="visibility" value={3} required onChange={handleFormChange} />
              <label htmlFor="public" className={`${darkmode && 'title-dark'}`}>Public</label><br />
              <input type="radio" id="teachers_only" name="visibility" value={1} required onChange={handleFormChange} />
              <label htmlFor="teachers_only" className={`${darkmode && 'title-dark'}`}>Teachers</label><br />
              <input type="radio" id="students_only" name="visibility" value={0} required onChange={handleFormChange} />
              <label htmlFor="students_only" className={`${darkmode && 'title-dark'}`}>Students</label>
            </div>
            <button type='submit' className='submit_btn_qstn' onClick={handleSubmitQstn}>Submit</button>
          </form>
        </div>
    </>
  )
}
