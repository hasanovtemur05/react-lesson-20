import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import App from "../App";
import {SignIn, AdminLayout, StudentLayout, Student, Teacher, Course, Group, SignUp, Category, Brand } from '@pages'; 

const Index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        {/* Admin */}
        <Route path="admin-layout" element={<AdminLayout/>}>
        <Route index element={<Category />} />
        <Route path="brand" element={<Brand />} />
        <Route path="student" element={<Student />} />
        <Route path="teacher" element={<Teacher />} />
        <Route path="course" element={<Course/>}/>
        <Route path="group" element={<Group/>}/>
        </Route>
        
        {/* Student */}
        <Route path="student-layout" element={<StudentLayout/>}>
        
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default Index;
