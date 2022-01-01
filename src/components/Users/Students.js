import React, { useEffect,useContext } from 'react'
import './Students.css'
import QstnsModal from '../Modals/QstnsModal'
import questionContext from "../../context/Question"
import StudentItem from './StudentItem';

export default function Students() {
    const { students,fetchStudents } = useContext(questionContext);
    useEffect(()=>{
        fetchStudents();
        // eslint-disable-next-line
    },[])
    return (
        <>
            <div className="students-container">
                {students && students.map((stud)=>{
                        return <StudentItem key={stud._id} stud={stud} />
                    })}
            </div>
            <QstnsModal />
        </>
    )
}
