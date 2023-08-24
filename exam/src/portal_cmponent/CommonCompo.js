import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginComponent from "./Login_component";
import AdminComponenet from "../Admin/AdminComponent";
import QuestionLevel from "../Admin/QuestionLevel";
import Role from "../Admin/Role";
import Students from "../Admin/Students";
import Topic from "../Admin/Topic";
import DashBord from "../Admin/DashBord";
import Exams from "../Admin/Exams";
import Content from "../Admin/Content";
import ContentQuestions from "../Admin/ContentQuestions";
import StudentComponent from "../Student/StudentComponent";
import Dashbord from "../Student/Dashbord";
import ProfileComponent from "../Student/ProfileComponent";
import VideoTutorialComponent from "../Student/VideoTutorialComponent";
import ExamsComponent from "../Student/ExamsComponent";
import ViewExamsMarks from "../exam/ViewExamsMarks";
import SignUpComponenet from "./SignUpComponenet";
// import setmode from '../Student/context/contexts'

export default function CommonCompo() {
  // const theme=useContext(setmode)
  // console.log(theme.mode);
  return (
    <div className="mx-2">
      <Router>
        <Routes>
          <Route path="">
            <Route path="" element={<LoginComponent />}/>
            <Route path="signup" element={<SignUpComponenet/>}/>
          </Route>
          <Route path="admin" element={<AdminComponenet />}>
            <Route path="" element={<DashBord />} />
            <Route path="students" element={<Students />} />
            <Route path="exams" element={<Exams />} />
            <Route path="topics" element={<Topic />} />
            <Route path="contents" element={<Content />} />
            <Route path="content-questions" element={<ContentQuestions />} />
            <Route path="questions-level" element={<QuestionLevel />} />
            <Route path="role" element={<Role />} />
          </Route>
          <Route path="/student" element={<StudentComponent />}>
            <Route path="" element={<Dashbord />} />
            <Route path="profile" element={<ProfileComponent />} />
            <Route path="tutorials" element={<VideoTutorialComponent />} />
            <Route path="exams">
              <Route path="" element={<ExamsComponent />} />
              <Route path="examinfo" element={<ViewExamsMarks />} />
            </Route>
          </Route>
        </Routes>
      </Router>
      h1
    </div>
  );
}
