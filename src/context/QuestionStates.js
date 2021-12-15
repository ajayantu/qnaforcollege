import React, { useState } from 'react'
import QuestionContext from './Question'

export default function QuestionStates(props) {
    const host = 'https://qnaforcollege.herokuapp.com/api';
    const [questions, setQuestions] = useState([]);
    const [userQstns, setUserQstns] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [userAnsQstns, setUserAnsQstns] = useState([]);
    const [user, setUser] = useState({});
    const [role, setRole] = useState("");
    const [notify, setNotify] = useState([]);
    const token = process.env.REACT_APP_MY_TOKEN;
    let count = 0;
    const [notifyCount, setNotifyCount] = useState(0);
    const [progress, setProgress] = useState(0);


    const fetchQstns = async () => {
        setProgress(10)
        await fetch(`${host}/getqstn`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth_token': token
            },
        })
            .then(async (res) => {
                setProgress(50)
                const data = await res.json();
                setQuestions(data.questions);
                setProgress(100)
            })
    }

    const fetchUserAnsQstn = async () => {
        setProgress(10)
        await fetch(`${host}/getuserans`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth_token': token
            }
        })
            .then(async (res) => {
                setProgress(50)
                const data = await res.json();
                const qstns = [];

                let fl = 0;
                for (let i = 0; i < data.answers.length; i++) {
                    const qstnfetch = data.answers[i].question;
                    fl = 0;
                    for (let j = 0; j < qstns.length; j++) {
                        const qstnar = qstns[j];
                        if (qstnfetch._id === qstnar._id) {
                            fl = 1
                            break;
                        }

                    }
                    if (fl === 0) {
                        qstns.push(qstnfetch);
                    }

                }
                setUserAnsQstns(qstns);
                setProgress(100)
            })
    }

    const fetchUserQstns = async () => {
        setProgress(10)
        await fetch(`${host}/getuserqstn`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth_token': token
            }
        })
            .then(async (res) => {
                setProgress(50)
                const data = await res.json();
                setUserQstns(data.question);
                setProgress(100)
            })
    }
    const fetchAnswer = async (qstnId) => {
        setProgress(10)
        await fetch(`${host}/getans/${qstnId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth_token': token
            }
        })
            .then(async (res) => {
                setProgress(50)
                const data = await res.json();
                setAnswers(data.answers);
                setProgress(100)
            })
    }

    const addAnswer = async (ans, qstnId) => {
        const myAns = {
            answer: ans.toString()
        };
        await fetch(`${host}/addans/${qstnId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth_token': token
            },
            body: JSON.stringify(myAns)
        })
            .then(async (res) => {
                const data = await res.json();
                let temp = JSON.parse(JSON.stringify(answers));
                temp.push(data.answer);
                setAnswers(temp);
            })
    }

    const fetchUser = async (userId) => {
        await fetch(`${host}/getuser/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth_token': token
            }
        })
            .then(async (res) => {
                const data = await res.json();
                setUser(data.user);
                if (data.user.role === 0) {
                    setRole("Student")
                }
                else if (data.user.role === 1) {
                    setRole("Teacher")
                }
                else if (data.user.role === 3) {
                    setRole("Admin")
                }
            })
    }

    const fetchNotify = async () => {
        setProgress(10)
        await fetch(`${host}/getnotify`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth_token': token
            }
        })
            .then(async (res) => {
                setProgress(50)
                const data = await res.json();
                if (data.current) {
                    for (let i = 0; i < data.notify.length; i++) {
                        if (data.current.current === data.notify[i]._id.toString()) {
                            break;
                        }
                        data.notify[i].new = true;
                        count++;
                    }
                    if (count !== 0) {
                        setNotifyCount(count);

                    }
                    setNotify(data.notify);
                    setProgress(100)
                }
            })
    }

    const editNotify = async () => {
        if (notifyCount === 0) { return; }
        const myData = {
            current: notify[0]._id.toString()
        }
        await fetch(`${host}/editnotify`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth_token': token
            },
            body: JSON.stringify(myData)
        })
            .then(async (res) => {
                setNotifyCount(0);
            })
    }

    const qstnValues = {
        fetchQstns, questions, answers, setAnswers, fetchAnswer, addAnswer, fetchUser, user, role, fetchNotify, notifyCount, editNotify, notify, fetchUserQstns, userQstns, fetchUserAnsQstn, userAnsQstns, progress
    }
    return (
        <QuestionContext.Provider value={qstnValues}>
            {props.children}
        </QuestionContext.Provider>
    )
}
