import AnswerItem from './AnswerItem'
import React,{useContext,useEffect, useState} from 'react'
import questionContext from "../../context/Question"
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { useParams } from "react-router-dom";
import { CKEditor } from '@ckeditor/ckeditor5-react'

export default function Answers(props) {
    
    const { qstnId } = useParams();
    const [ans,setAns] = useState("");
    const { fetchAnswer,answers,addAnswer } = useContext(questionContext);

    const handleSubmitAns = ()=>{
        addAnswer(ans,qstnId);
    }

    const handleEditorChange = (e,editor)=>{
        document.querySelector(".ck-content").click()
        const datas = editor.getData();
        setAns(datas);
    }
    useEffect(()=>{
        fetchAnswer(qstnId);
        // eslint-disable-next-line
    },[]);
    return (
        <>
            <div className="answer-container">
                {answers.length===0? <p>Fetching Answers.....</p>:
                        answers.map((ans)=>{
                            return <AnswerItem key={ans._id} ans={ans} />
                })}
                <div className="addAnswer">
                    <h2>Add Answer</h2>
                    <div className="editor-container">
                        <CKEditor
                                editor={ Editor }
                                data={props.data}
                                onChange={ handleEditorChange }                                
                            />
                    </div>
                    <button className="btn_submit_ans" onClick={handleSubmitAns}>Submit</button>
                </div>
            </div>
        </>
    )
}
