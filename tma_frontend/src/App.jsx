import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ViewTask from './pages/ViewTask';
import CreateTask from './pages/CreateTask';
import UpdateTask from './pages/UpdateTask';
import DeleteTask from './pages/DeleteTask';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" replace={true} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" >
            <Route index element={< Dashboard />} />
            <Route path="task" >
              <Route path="view/:taskId" element={<ViewTask />} />
              <Route path="create" element={<CreateTask />} />
              <Route path="update/:taskId" element={<UpdateTask />} />
              <Route path="delete/:taskId" element={<DeleteTask />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
