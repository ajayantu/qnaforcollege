import React, { useState } from 'react'
import QuestionContext from './Question'
import axios from 'axios'

export default function QuestionStates(props) {
    const host = 'http://localhost:5000/api';
    const [isLogin, setIsLogin] = useState(localStorage.getItem("token") ? true : false);
    const [questions, setQuestions] = useState([]);
    const [userQstns, setUserQstns] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [userAnsQstns, setUserAnsQstns] = useState([]);
    const [students, setStudents] = useState([]);
    const [userId, setUserId] = useState("");
    const [qstnId, setQstnId] = useState("");
    const [user, setUser] = useState({});
    const [role, setRole] = useState("");
    const [notify, setNotify] = useState([]);
    let count = 0;
    const [notifyCount, setNotifyCount] = useState(0);
    const [progress, setProgress] = useState(0);

    const signup = async (username, email, password) => {
        setProgress(10)
        const res = await axios.post(`${host}/signup`, { username, email, password })
        setProgress(100)
        console.log(res.data);

        if (res.data.status === "ok") {
            return 0;
        }
        return 1;
    }
    const login = async (email, password) => {
        const res = await axios.post(`${host}/signin`, { email, password })
        console.log(res.data);

        if (res.data.status === "ok") {
            localStorage.setItem("token", res.data.token);
            setIsLogin(true);
        }
    }

    const fetchQstns = async () => {
        setProgress(10)
        const res = await axios.get(`${host}/getqstn`, {
            headers: {
                'auth_token': localStorage.getItem("token")
            },
        })
        setProgress(50)
        setQuestions(res.data.questions);
        setProgress(100)
    }

    const fetchStudents = async () => {
        const res = await axios.get(`${host}/getstud`, {
            headers: {
                'auth_token': localStorage.getItem("token")
            }
        })

        setStudents(res.data.students);
    }
    const fetchUserAnsQstn = async () => {
        setProgress(10)
        const res = await axios.get(`${host}/getuserans`, {
            headers: {
                'auth_token': localStorage.getItem("token")
            }
        })
        setProgress(50)
        const data = res.data;
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
    }

    const fetchUserQstns = async () => {
        setProgress(10)
        const res = await axios.get(`${host}/getuserqstn`, {
            headers: {
                'auth_token': localStorage.getItem("token")
            }
        })
        setProgress(50)
        setUserQstns(res.data.question);
        setProgress(100)
    }
    const fetchAnswer = async (qstnId) => {
        setProgress(10)
        const res = await axios.get(`${host}/getans/${qstnId}`, {
            headers: {
                'auth_token': localStorage.getItem("token")
            }
        })
        setProgress(50)
        setAnswers(res.data.answers);
        setProgress(100)
    }

    const addAnswer = async (ans, qstnId) => {
        const myAns = {
            answer: ans.toString()
        };
        const res = await axios.post(`${host}/addans/${qstnId}`, myAns, {
            headers: {
                'auth_token': localStorage.getItem("token")
            },

        })
        if (res.data.status !== "error") {
            let temp = JSON.parse(JSON.stringify(answers));
            temp.push(res.data.answer);
            setAnswers(temp);
        }
        else {
            if (res.data.flag === 1) {
                console.log("Question already answered by you..");
            }
        }
    }

    const fetchUser = async (userId) => {
        const res = await axios.get(`${host}/getuser/${userId}`, {
            headers: {
                'auth_token': localStorage.getItem("token")
            }
        })
        setUser(res.data.user);
        if (res.data.user.role === 0) {
            setRole("Student")
        }
        else if (res.data.user.role === 1) {
            setRole("Teacher")
        }
        else if (res.data.user.role === 3) {
            setRole("Admin")
        }
    }

    const fetchNotify = async () => {
        setProgress(10)
        const res = await axios.get(`${host}/getnotify`, {
            headers: {
                'auth_token': localStorage.getItem("token")
            }
        })
        setProgress(50)
        if (res.data.current) {
            for (let i = 0; i < res.data.notify.length; i++) {
                if (res.data.current.current === res.data.notify[i]._id.toString()) {
                    break;
                }
                res.data.notify[i].new = true;
                count++;
            }
            if (count !== 0) {
                setNotifyCount(count);
            }
            setNotify(res.data.notify);
            setProgress(100)
        }
    }

    const editNotify = async () => {
        if (notifyCount === 0) { return; }
        const myData = {
            current: notify[0]._id.toString()
        }
        await axios.put(`${host}/editnotify`, myData, {
            headers: {
                'auth_token': localStorage.getItem("token")
            },
        })
        setNotifyCount(0);
    }

    const findBadge = (badgeNum) => {
        let badge = "Begginer";
        let color = "#0d0e11"

        if (badgeNum === 0) {
            badge = "Begginer";
            color = "#0d0e11"
        }
        else if (badgeNum === 1) {
            badge = "Explainer";
            color = "#30a96f"
        }
        else if (badgeNum === 2) {
            badge = "Professional";
            color = "#6b3de4"
        }
        else if (badgeNum === 3) {
            badge = "Teacher";
            color = "#FE4A49"
        }
        else if (badgeNum === 4) {
            badge = "Pandit";
            color = "#ffbf00"
        }
        else if (badgeNum === 5) {
            badge = "Enlightned";
            color = "#d9a34a"
        }
        else if (badgeNum === 6) {
            badge = "Master";
            color = "#5fb6f8"
        }
        const fullBadge = {
            badge, color
        }
        return fullBadge;
    }
    const handleAsk = async () => {
        if (!userId || !qstnId) {
            console.log("please select a user and a question");
        }
        else {
            console.log("Question id : ", qstnId);
            console.log("User id : ", userId);
            const modal = document.querySelector(".modal-background");
            const visibility = modal.getAttribute('data-visible');
            if (visibility === "true") {
                modal.setAttribute("data-visible", false);
            }

            const myData = {
                userId: userId,
                qstnId: qstnId
            }
            await axios.post(`${host}/addnotify`, myData, {
                headers: {
                    'auth_token': localStorage.getItem("token")
                },
            })
        }
    }


    const qstnValues = {
        fetchQstns, questions, answers, setAnswers, fetchAnswer, addAnswer, fetchUser, user, role, fetchNotify, notifyCount, editNotify, notify, fetchUserQstns, userQstns, fetchUserAnsQstn, userAnsQstns, progress, students, fetchStudents, setQstnId, setUserId, handleAsk, findBadge, login, isLogin, setIsLogin, signup
    }
    return (
        <QuestionContext.Provider value={qstnValues}>
            {props.children}
        </QuestionContext.Provider>
    )
}
