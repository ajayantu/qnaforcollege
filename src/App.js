import Home from "./components/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Answers from "./components/Answer/Answers";
import Navbar from './components/Navbar/Navbar'
import QuestionStates from './context/QuestionStates'
import DisplayUser from "./components/DisplayUserInfo/DisplayUser";
import Notification from "./components/Notification/Notification";
import Sidebar from "./components/Sidebar/Sidebar"

function App() {

  return (
    <QuestionStates>
      <Router>
      <Navbar />
      <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/answers/:qstnId" element={<Answers />} />
          <Route path="/user/:userId" element={<DisplayUser />} />
          <Route path="/notify" element={<Notification />} />
        </Routes>
      </Router>
    </QuestionStates>
  );
}

export default App;
