// src/routes/AppRoutes.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import StudentLogin from "../pages/StudentLogin";
import StudentRegister from "../pages/StudentRegister";
import StudentDashboard from "../pages/StudentDashboard";
import StudentProfile from "../pages/StudentProfile";
import StudentProfileUpdate from "../pages/StudentProfileUpdate";
import StudentTimetable from "../pages/StudentTimetable";
import StudentAssignments from "../pages/StudentAssignments";
import StudentAttendance from "../pages/StudentAttendance";
import StudentNotices from "../pages/StudentNotices";
import StudentResultView from "../pages/ResultView";
import StudentApplyLeave from "../pages/StudentApplyLeave";
import AdminLogin from "../pages/Admin/AdminLogin";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import FilteredStudents from "../pages/Admin/FilteredStudent";
import StudentDetail from "../pages/Admin/StudentDetail";
import AllTeachers from "../pages/Admin/AllTeachers";
import TeacherDetail from "../pages/Admin/TeachersDetail";
import AllLeaves from "../pages/Admin/AllLeaves";
import AdminNoticePage from "../pages/Admin/AdminNoticePage";
import TeacherDashboard from "../pages/teacher/Teacherdashboard"
import TeacherLogin from "../pages/teacher/TeacherLogin";
import AdminCreateTimetable from "../pages/Admin/AdminCreateTimetable";
import TimetableList from "../pages/Admin/AdminTimetableList";
import AdminViewTimetables from "../pages/Admin/AdminViewTimetable";
import TeacherMarkAttendance from "../pages/teacher/TeacherMarkAttendance";
import TeacherProfileForm from "../pages/teacher/TeacherProfileForm";
import TeacherProfile from "../pages/teacher/TeacherProfile";
import TeacherNotices from "../pages/teacher/TeacherNotices";
import UploadAssignment from "../pages/teacher/UploadAssingments";
import UploadResults from "../pages/teacher/UploadResults";
import TeacherRegister from "../pages/teacher/TeachersRegistrationPage";


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/student-login" element={<StudentLogin />} />
                <Route path="/student-register" element={<StudentRegister />} />
                <Route path="/student-dashboard" element={<StudentDashboard />} />
                <Route path="/student-profile" element={<StudentProfile />} />
                <Route path="/student-profile-update" element={<StudentProfileUpdate />} />
                <Route path="/student/timetable" element={<StudentTimetable />} />
                <Route path="/student/assignments" element={<StudentAssignments />} />
                <Route path="/student/attendance" element={<StudentAttendance />} />
                <Route path="/student/notices" element={<StudentNotices />} />
                <Route path="/student/result" element={<StudentResultView />} />
                <Route path="/student/leave" element={<StudentApplyLeave />} />
                {/* admin routes  */}
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/filtered-students" element={<FilteredStudents />} />
                <Route path="/admin/student/:id" element={<StudentDetail />} />
                {/* tecahers routes  */}
                <Route path="/admin/teachers" element={<AllTeachers />} />
                <Route path="/admin/teacher/:id" element={<TeacherDetail />} />
                {/* leaves routes  */}
                <Route path="/admin/allLeaves" element={<AllLeaves />} />
                {/* notices routes  of admins  */}
                <Route path="/admin/notices" element={<AdminNoticePage />} />
                 <Route path="/admin/timetable/create" element={<AdminCreateTimetable />} />
                 <Route path="/admin/timetable" element={<TimetableList/ > } />
                 <Route path="/admin/timetables" element={<AdminViewTimetables/>}  />

                {/* <Route path="/admin/results" element={<StudentResultView />} /> */}


                {/* teachers route  */}
                <Route path="/teacher/dashboard" element={<TeacherDashboard/>} />
                <Route path="/teacher-login" element={<TeacherLogin/>} />
                <Route path ="/teacher/attendance/mark" element={<TeacherMarkAttendance/>}  />
                <Route path="/teacher/registration" element={<TeacherProfileForm/>} />
                <Route path="/teacher/profile" element={<TeacherProfile/>}  />
                <Route path="/teacher/notices" element={<TeacherNotices/>} />
                <Route path="/teacher/upload-assignment"  element={<UploadAssignment/>} />
                <Route path="/teacher/upload-results" element={<UploadResults/>} />
                <Route path ="/teacher-register" element={<TeacherRegister/>}  />
                



            </Routes>
        </Router>
    );
};

export default AppRoutes;
