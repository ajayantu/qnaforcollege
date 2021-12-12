import React,{ useState } from 'react'
import QuestionContext from './Question'

export default function QuestionStates(props) {
    const host = 'https://qnaforcollege.herokuapp.com/api';
    const [questions,setQuestions] = useState([]);
    const [answers,setAnswers] = useState([]);
    const [user,setUser] = useState({});
    const [role,setRole] = useState("");
    const [notify,setNotify] = useState([]);
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWFlMjg4MjYzZmZiMjc0NDIxNGUyMGYiLCJpYXQiOjE2MzkxMzg2MDR9.jNZapQimxC7uj9i2iIz7s1TDeqbmY14ZiW3KnWW9_3s";
    let count=0;
    const [notifyCount,setNotifyCount] = useState(0);
    const fetchQstns = async ()=>{
        await fetch(`${host}/getqstn`,{
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'auth_token': token
            },
        })
        .then(async (res)=>{
            const data = await res.json();
            console.log(data);
            setQuestions(data.questions);
        })
    }

    const fetchAnswer = async (qstnId)=>{
        await fetch(`${host}/getans/${qstnId}`,{
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'auth_token': token
            }
        })
        .then(async (res)=>{
            const data = await res.json();
            console.log(data);
            setAnswers(data.answers);
        })
    }

    const addAnswer = async (ans,qstnId)=>{
        console.log(qstnId);
        const myAns = {
            answer:ans.toString()
          };
        await fetch(`${host}/addans/${qstnId}`,{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'auth_token': token
            },
            body: JSON.stringify(myAns)
        })
        .then(async (res)=>{
            const data = await res.json();
            console.log(data);
            let temp = JSON.parse(JSON.stringify(answers));
            temp.push(data.answer);
            setAnswers(temp);
        })
    }

    const fetchUser = async (userId)=>{
        await fetch(`${host}/getuser/${userId}`,{
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'auth_token': token
            }
        })
        .then(async (res)=>{
            const data = await res.json();
            console.log(data);
            setUser(data.user);
            if(data.user.role === 0){
                setRole("Student")
            }
            else if(data.user.role === 1){
                setRole("Teacher")
            }
            else if(data.user.role === 3){
                setRole("Admin")
            }
        }) 
    }

    const fetchNotify = async ()=>{
        await fetch(`${host}/getnotify`,{
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'auth_token': token
            }
        })
        .then(async (res)=>{
            const data = await res.json();
            console.log(data);
            
            console.log("iam in");
            if(data.current){
            for(let i=0;i<data.notify.length;i++){
                if(data.current.current === data.notify[i]._id.toString()){
                    break;
                }
                data.notify[i].new = true;
                count++;
            }
            if(count !== 0){
                setNotifyCount(count);
                
            }
            setNotify(data.notify);
        }
        })
    }

    const editNotify = async ()=>{
        if(notifyCount === 0){return;}
        const myData =  {
            current:notify[0]._id.toString()
        }
        await fetch(`${host}/editnotify`,{
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            'auth_token': token
            },
            body:JSON.stringify(myData)
        })
        .then(async (res)=>{
            const data = await res.json();
            console.log("Notify is updated ",data);
            setNotifyCount(0);
        })
    }

    const qstnValues = {
        fetchQstns,questions,answers,setAnswers,fetchAnswer,addAnswer,fetchUser,user,role,fetchNotify,notifyCount,editNotify,notify
    }
    return(
        <QuestionContext.Provider value={qstnValues}>
            {props.children}
        </QuestionContext.Provider>
    )
}
