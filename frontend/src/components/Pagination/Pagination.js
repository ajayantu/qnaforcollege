import React,{useContext} from 'react'
import './Pagination.css'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import questionContext from "../../context/Question"

export default function Pagination({pages,changePage}) {
  const { darkmode } = useContext(questionContext);

    const location = useLocation();
    let pgno = location.pathname.includes("questions")?parseInt(window.location.pathname.split("/questions/")[1]):1
    const { pageNum } = useParams();
    const navigate = useNavigate()
    const handleNextPage = ()=>{
        navigate(`/questions/${parseInt(pageNum)+1}`)
        changePage(parseInt(pageNum)+1);
    }
    const handlePrevPage = ()=>{
        navigate(`/questions/${parseInt(pageNum)-1}`)
        changePage(parseInt(pageNum)-1);
    }
    
  return (
    <>
        <div className="pages_tracker">
                <button onClick={handlePrevPage} disabled={pgno<=1} style={pgno!==1?{cursor:"pointer"}:{cursor:"default"}}>&#171;</button>
                <span className={`${darkmode && 'dark-span'}`}>{pgno}</span>
                <button onClick={handleNextPage} disabled={pgno>=pages} style={pgno!==pages?{cursor:"pointer"}:{cursor:"default"}}>&#187;</button>
        </div>
    </>
  )
}
