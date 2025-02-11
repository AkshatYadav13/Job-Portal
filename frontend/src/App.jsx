import './css/App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/auth/Login'
import SignUp from './components/auth/Signup'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDesc from './components/JobDesc'
import Companies from './components/recruiter/Companies'
import CreateCompany from './components/recruiter/CreateCompany'
import CompanySetup from './components/recruiter/CompanySetup'
import RecruiterJobs from './components/recruiter/RecruiterJobs'
import PostJob from './components/recruiter/PostJob'
import Applicants from './components/recruiter/Applicants'
import EditJob from './components/recruiter/EditJob'
import ToggleTheme from './components/shared/ToggleTheme'
import ProtectedRoutes from './components/ProtectedRoutes'

const router = createBrowserRouter([
  {
    path:'/',
    element:<ProtectedRoutes><Home/></ProtectedRoutes>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<SignUp/>
  },
  {
    path:'/jobs',
    element:<ProtectedRoutes>
      <Jobs/>
    </ProtectedRoutes>
  },
  {
    path:'/browse',
    element:<ProtectedRoutes>
      <Browse/>
    </ProtectedRoutes>
  },
  {
    path:'/profile',
    element:<ProtectedRoutes>
      <Profile/>
    </ProtectedRoutes>
  },
  {
    path:'/description/:id',
    element:<ProtectedRoutes>
      <JobDesc/>
    </ProtectedRoutes>
  },
  // for recruiter
  {
    path:'/recruiter/company',
    element:<ProtectedRoutes>
      <Companies/>
    </ProtectedRoutes>
  },
  {
    path:'/recruiter/company/create',
    element:<ProtectedRoutes>
      <CreateCompany/>
    </ProtectedRoutes>
  },
  {
    path:'/recruiter/company/:id',
    element:<ProtectedRoutes>
      <CompanySetup/>
    </ProtectedRoutes>
  },
  {
    path:'/recruiter/jobs',
    element:<ProtectedRoutes>
      <RecruiterJobs/>
    </ProtectedRoutes>
  },
  {
    path:'/recruiter/job/create',
    element:<ProtectedRoutes>
      <PostJob/>
    </ProtectedRoutes>
  },
  {
    path:'/recruiter/job/:id/applicants',
    element:<ProtectedRoutes>
      <Applicants/>
    </ProtectedRoutes>
  },
  {
    path:'/recruiter/job/:id/edit',
    element:<ProtectedRoutes>
      <EditJob/>
    </ProtectedRoutes>
  },
])

function App() {
  return(
    <>
    <RouterProvider router={router}></RouterProvider>
    <div style={{display:'none'}}>
      <ToggleTheme></ToggleTheme>
    </div>
    </>
  )  
}

export default App
