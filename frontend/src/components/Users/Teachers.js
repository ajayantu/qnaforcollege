import React, { useEffect,useContext } from 'react'
import './Students.css'
import QstnsModal from '../Modals/QstnsModal'
import questionContext from "../../context/Question"
import AskUserItem from './AskUserItem';

export default function Teachers() {
    const { teachers,fetchTeachers } = useContext(questionContext);
    useEffect(()=>{
        fetchTeachers();
        // eslint-disable-next-line
    },[])
    return (
        <>
            <div className="askuser-container">
                {teachers && teachers.map((tchr)=>{
                        return <AskUserItem key={tchr._id} askuser={tchr} />
                    })}
            </div>
            <QstnsModal />
        </>
    )
}
