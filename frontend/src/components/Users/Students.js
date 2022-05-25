import React, { useEffect,useContext } from 'react'
import './Students.css'
import QstnsModal from '../Modals/QstnsModal'
import questionContext from "../../context/Question"
import StudentItem from './AskUserItem';

export default function Students() {
    const { students,fetchStudents } = useContext(questionContext);
    useEffect(()=>{
        fetchStudents();
        // eslint-disable-next-line
    },[])
    return (
        <>
            <div className="askuser-container">
                {students && students.map((stud)=>{
                        return <StudentItem key={stud._id} askuser={stud} />
                    })}
            </div>
            <QstnsModal />
        </>
    )
}
