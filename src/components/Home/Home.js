import { useEffect, useContext } from 'react';
import './Home.css'
import questionContext from "../../context/Question"
import QuestionItem from './QuestionItem';
function Home() {
    const { fetchQstns, questions } = useContext(questionContext);
    useEffect(() => {
        fetchQstns();
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className="contents">
                <div className="question-header">
                    <h1>All Questions</h1>
                    <button className='ask-btn' style={{ marginLeft: 20 }}>Ask Question</button>
                </div>
                <div className="content-container">
                
                {
                    questions.map((qstn) => {
                        return <QuestionItem key={qstn._id} qstn={qstn} qstnId={qstn._id} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Home
