import { useEffect,useContext } from 'react';
import './Home.css'
import questionContext from "../../context/Question"
import QuestionItem from './QuestionItem';

function Home(props) {
    const { fetchQstns,questions } = useContext(questionContext);
    useEffect(()=>{
        fetchQstns();
        // eslint-disable-next-line
    },[])
    
    return (
        <>
            <div className="questions-container">
                {
                    questions.map((qstn)=>{
                        return <QuestionItem key={qstn._id} qstn={qstn} qstnId={qstn._id} />
                })}
            </div>
        </>
    )
}

export default Home
