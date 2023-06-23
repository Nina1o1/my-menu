import { Routes, Route } from 'react-router-dom'
import Dictionary from './components/dictionary/dictionary'
import Edit from './components/edit/edit'
import Login from './components/authentication/login'
import Register from './components/authentication/register'
import Error from './components/common/error.jsx'

export default function AppRoutes() {
  return(
    <Routes>

      {/* public routes */}
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/*" element={<Error />}/>

      {/* protected routes */}
      <Route path="/" element={<Dictionary />}/>
      <Route path="/edit" element={<Edit />}/>
    </Routes>
  )
}