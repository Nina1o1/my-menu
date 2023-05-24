import { Routes, Route } from 'react-router-dom'
import Dictionary from './dictionary/dictionary'
import Edit from './edit/edit'
import Login from './auth/login'
import Register from './auth/register'
import Error from './common/error.jsx'

export default function AppRoutes() {
  return(
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/" element={<Dictionary />}/>
      <Route path="/edit" element={<Edit />}/>
      <Route path="/*" element={<Error />}/>
    </Routes>
  )
}