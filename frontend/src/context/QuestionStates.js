import React, { useState } from 'react'
import QuestionContext from './Question'
import axios from 'axios'

export default function QuestionStates(props) {
    const host = 'https://qnaforcollege.herokuapp.com/api';
    const idUser = localStorage.getItem('user');
    const [isLogin, setIsLogin] = useState(localStorage.getItem("token") ? true : false);
    const [questions, setQuestions] = useState([]);
    const [userQstns, setUserQstns] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [userAnsQstns, setUserAnsQstns] = useState([]);
    const [students, setStudents] = useState([]);
    const [teachers,setTeachers] = useState([]);
    const [userId, setUserId] = useState("");
    const [qstnId, setQstnId] = useState("");
    const [user, setUser] = useState({});
    const [role, setRole] = useState("");
    const [notify, setNotify] = useState([]);
    let count = 0;
    const [notifyCount, setNotifyCount] = useState(0);
    const [progress, setProgress] = useState(0);
    const [page,setPage] = useState(1);
    const [pages,setPages] = useState(0)
    const [loading,setLoading] = useState(false)
    const [profile,setProfile] = useState(null);
    const [alert,setAlert] = useState({msg:"",active:false})
    const [qstn,setQstn] = useState(null)
    
    const checkImage = async(path)=>{
        
    }
    const deleteAnswer = async(ansId)=>{
        setProgress(10)
        const res = await axios.delete(`${host}/deleteans/${ansId}`,{
            headers:{
                'auth_token':localStorage.getItem("token")
            }
        });
        if(res.data.status==="ok")
        {
            const newarr = answers.filter((ans)=>{
                return ans._id!==ansId;
            })
            setAnswers(newarr);
            setAlert({msg:"Answer deleted...",active:true,type:2})
        }
        setProgress(50)
        setProgress(100)
    }
    const updateQuestion = async(qstnDetails,qstnId)=>{
        qstnDetails.visibility = parseInt(qstnDetails.visibility)
        setProgress(10)
        await axios.put(`${host}/editqstn/${qstnId}`,qstnDetails,{
            headers:{
                'auth_token':localStorage.getItem("token")
            }
        })
        setProgress(50)
        setProgress(100)
    }
    const deleteQuestion = async(qstnId)=>{
        setProgress(10)
        const res = await axios.delete(`${host}/deleteqstn/${qstnId}`,{
            headers:{
                'auth_token':localStorage.getItem("token")
            }
        })
        setProgress(50)
        if(res.data.status==="ok")
        {
            const newarr = userQstns.filter((qstn)=>{
                return qstn._id!==qstnId
            })
            setUserQstns(newarr)
            setAlert({msg:"Question deleted successfully...",active:true,type:2})
        }
        setProgress(100)
    }
    const addQuestion = async (qstnDetails)=>{
        qstnDetails.visibility = parseInt(qstnDetails.visibility)
        setProgress(10)
        await axios.post(`${host}/addqstn`,qstnDetails,{
            headers:{
                'auth_token':localStorage.getItem("token")
            }
        })
        setProgress(50)
        setProgress(100)
    }
    const fetchProfile = async()=>{
        setProgress(10)
            const res = await axios.get(`${host}/getprofile`, {
                headers: {
                    'auth_token': localStorage.getItem("token")
                }
            })
            setProgress(50)
            setProfile(res.data.user);
            setProgress(100)
    }

    const uploadProfilePic = async (data)=>{
        setProgress(10);
       const res =  await axios.post(`${host}/updatepic`,data,{
            headers:{
                'auth_token': localStorage.getItem("token")
            }
        })
        setProgress(100);
        return res.data.url;
    }
    const signup = async (username, email, password,role) => {
        setProgress(10)
        const res = await axios.post(`${host}/signup`, { username, email, password, role })
        setProgress(100)
        if (res.data.status === "ok") {
            return 0;
        }
        else{
            setAlert({msg:res.data.message,active:true})
        }
        return 1;
    }
    const login = async (email, password) => {
        const res = await axios.post(`${host}/signin`, { email, password })
        if (res.data.status === "ok") {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", res.data.user._id);
            setIsLogin(true);
        }
        else{
            setAlert({msg:res.data.message,active:true});
        }
    }

    const fetchQstns = async (fetch_page) => {
        setLoading(true);
        setProgress(10)
        const res = await axios.get(`${host}/getqstn?page=${fetch_page}`, {
            headers: {
                'auth_token': localStorage.getItem("token")
            },
        })
        setProgress(50)
        setQuestions(res.data.questions);
        setPages(res.data.pages)
        setPage(res.data.page)
        setProgress(100)
        setLoading(false)
    }

    const fetchStudents = async () => {
        const res = await axios.get(`${host}/getstud`, {
            headers: {
                'auth_token': localStorage.getItem("token")
            }
        })

        setStudents(res.data.students);
    }
    const fetchTeachers = async () => {
        const res = await axios.get(`${host}/getteach`, {
            headers: {
                'auth_token': localStorage.getItem("token")
            }
        })
        setTeachers(res.data.teachers);
    }
    const fetchUserAnsQstn = async () => {
        setLoading(true);
        setProgress(10)
        const res = await axios.get(`${host}/getuserans`, {
            headers: {
                'auth_token': localStorage.getItem("token")
            }
        })
        setProgress(50)
        const data = res.data;
        let qstns = [];
        let fl = 0;
        for (let i = 0; i < data.answers.length; i++) {
            fl = 0;
            for (let j = 0; j < qstns.length; j++) {
                if (data.answers[i].question._id === qstns[j].question._id) {
                    fl = 1
                    break;
                }

            }
            if (fl === 0) {
                qstns.push(data.answers[i]);
            }

        }
        setUserAnsQstns(qstns);
        setProgress(100)
        setLoading(false);
    }

    const fetchUserQstns = async () => {
        setLoading(true);
        setProgress(10)
        const res = await axios.get(`${host}/getuserqstn`, {
            headers: {
                'auth_token': localStorage.getItem("token")
            }
        })
        setProgress(50)
        setUserQstns(res.data.question);
        setProgress(100)
        setLoading(false);
    }

    const getQstnFromId = async (qstnId)=>{
        setProgress(10)
        const res = await axios.get(`${host}/fetchqstn/${qstnId}`);
        setQstn(res.data.qstn);
    }

    const fetchAnswer = async (qstnId) => {
        setLoading(true)
        await getQstnFromId(qstnId)
        const res = await axios.get(`${host}/getans/${qstnId}`, {
            headers: {
                'auth_token': localStorage.getItem("token")
            }
        })
        setProgress(50)
        setProgress(100)
        setAnswers(res.data.answers);
        setLoading(false)
    }

    const addAnswer = async (answer, qstnId) => {
        setProgress(10)
        const res = await axios.post(`${host}/addans/${qstnId}`,{answer}, {
            headers: {
                'auth_token': localStorage.getItem("token")
            },

        })
        setProgress(50)
        if (res.data.status !== "error") {
            let temp = JSON.parse(JSON.stringify(answers));
            temp.push(res.data.answer);
            setAnswers(temp);
        }
        else {
            setAlert({msg:"You already answered this question",active:true})
        }
        setProgress(100)
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
        if (res.data) {
            for (let i = 0; i < res.data.notify.length; i++) {
                if (res.data.current === res.data.notify[i]._id.toString()) {
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
        }
        else {
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
        fetchQstns, questions, answers, setAnswers, fetchAnswer, addAnswer, fetchUser, user,setUser,role, fetchNotify, notifyCount, editNotify, notify, fetchUserQstns, userQstns, fetchUserAnsQstn, userAnsQstns, progress, students, fetchStudents, setQstnId, setUserId, handleAsk, findBadge, login, isLogin, setIsLogin, signup,uploadProfilePic,page,setPage,pages,setPages,setQuestions,loading,setLoading,profile,setProfile,fetchProfile,teachers,setTeachers,fetchTeachers,addQuestion,deleteQuestion,updateQuestion,idUser,deleteAnswer,alert,setAlert,qstn,getQstnFromId,setQstn,setUserQstns,setUserAnsQstns,checkImage
    }
    return (
        <QuestionContext.Provider value={qstnValues}>
            {props.children}
        </QuestionContext.Provider>
    )
}
