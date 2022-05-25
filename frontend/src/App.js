import Home from "./components/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Answers from "./components/Answer/Answers";
import Navbar from './components/Navbar/Navbar'
import Notification from "./components/Notification/Notification";
import Sidebar from "./components/Sidebar/Sidebar"
import YourQstn from "./components/yourQuestions/YourQstn";
import YourAnswer from "./components/YourAnswer/YourAnswer";
import LoadingBar from 'react-top-loading-bar'
import questionContext from "./context/Question"
import React, { useContext } from 'react'
import Students from './components/Users/Students'
import Login from "./components/UserRegistration/Login";
import Signup from "./components/UserRegistration/Signup";
import ErrorPage from "./components/Error Page/ErrorPage";
import AskQstn from "./components/Ask Question/AskQstn";
import Teachers from "./components/Users/Teachers";
import UpdateQstn from "./components/UpdateQstn/UpdateQstn";
import Alert from "./components/Alerts/Alert";
import DisplayUserDetail from "./components/DisplayUserInfo/DisplayUserDetail";
import About from "./components/About/About";
import ProfileFetcher from "./components/Profile page/ProfileFetcher";

function App() {
  const { progress, isLogin } = useContext(questionContext);
  return (
    <Router>
      <Navbar />
      <Alert />
      <LoadingBar
        color='#f11946'
        progress={progress}
        height={2.73}
      />
      <Sidebar />
      <Routes>
        <Route path="/" element={<div>Hello</div>} />
        <Route path="/questions/:pageNum" element={<Home />} />
        <Route path="/answers/:qstnId" element={<Answers />} />
        <Route path="/user/:userId" element={<DisplayUserDetail />} />
        <Route path="/notify" element={<Notification />} />
        <Route path="/yourqstn" element={<YourQstn />} />
        <Route path="/yourans" element={<YourAnswer />} />
        <Route path="/getstudents" element={<Students />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/about" element={<About />} />
        {!isLogin && <Route path="/login" element={<Login />} />}
        {!isLogin && <Route path="/signup" element={<Signup />} />}
        {isLogin && <Route path="/askqstn" element={<AskQstn />} />}
        {isLogin && <Route path="/updateqstn/:qstnId" element={<UpdateQstn />} />}
        {isLogin && <Route path="/profile" element={<ProfileFetcher />} />}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}
export default App;
