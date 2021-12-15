import Home from "./components/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Answers from "./components/Answer/Answers";
import Navbar from './components/Navbar/Navbar'
import DisplayUser from "./components/DisplayUserInfo/DisplayUser";
import Notification from "./components/Notification/Notification";
import Sidebar from "./components/Sidebar/Sidebar"
import YourQstn from "./components/yourQuestions/YourQstn";
import YourAnswer from "./components/YourAnswer/YourAnswer";
import LoadingBar from 'react-top-loading-bar'
import questionContext from "./context/Question"
import React, { useContext } from 'react'

function App() {
  const { progress } = useContext(questionContext);
  return (
    <Router>
      <Navbar />
      <LoadingBar
        color='#f11946'
        progress={progress}
        height={2.73}
      />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/answers/:qstnId" element={<Answers />} />
        <Route path="/user/:userId" element={<DisplayUser />} />
        <Route path="/notify" element={<Notification />} />
        <Route path="/yourqstn" element={<YourQstn />} />
        <Route path="/yourans" element={<YourAnswer />} />
      </Routes>
    </Router>
  );
}
export default App;
