import AnswerItem from './AnswerItem'
import React, { useContext, useEffect, useState } from 'react'
import questionContext from "../../context/Question"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useParams } from "react-router-dom";
export default function Answers(props) {

    var config = {
        toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'link', 'bulletedList', 'numberedList', 'outdent', 'indent', '|', 'insertTable'],

        heading: {
            options: [
                { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
            ]
        },
        image: {
            toolbar: [
                'imageTextAlternative',
                'imageStyle:side'
            ]
        },
        table: {
            contentToolbar: [
                'tableColumn',
                'tableRow',
                'mergeTableCells'
            ]
        },
        ckfinder: {
            uploadUrl: 'http://localhost:5000/api/uploads'
        }
    }

    const { qstnId } = useParams();
    const [ans, setAns] = useState("");
    const { fetchAnswer, answers, addAnswer, setAnswers } = useContext(questionContext);

    const handleSubmitAns = () => {
        addAnswer(ans, qstnId);
    }

    const handleEditorChange = (e, editor) => {
        document.querySelector(".ck-content").click()
        const datas = editor.getData();
        setAns(datas);
    }
    useEffect(() => {
        fetchAnswer(qstnId);
        return () => {
            setAnswers([]);
        }
        // eslint-disable-next-line
    }, []);
    return (
        <>
            <div className="answer-container">
                {!answers ? <p className='no-items-text'>No Answers for this Question</p> :
                    answers.map((ans) => {
                        return <AnswerItem key={ans._id} ans={ans} />
                    })}

                <div className="addAnswer">
                    <h2>Add Answer</h2>
                    <div className="editor-container">
                        <CKEditor
                            editor={ClassicEditor}
                            data={props.data}
                            onChange={handleEditorChange}
                            config={config}

                        />
                    </div>
                    <button className="btn_submit_ans" onClick={handleSubmitAns}>Submit</button>
                </div>
            </div>
        </>
    )
}
