import { Routes, Route } from 'react-router-dom';
import Dictionary from './components/dictionary/dictionary';
import Edit from './components/edit/edit';
import Login from './components/authentication/login';
import Register from './components/authentication/register';
import Error from './components/common/error.jsx';
import ProtectedRoutes from './components/protectedRoutes';

export default function AppRoutes() {
  return(
    <Routes>

      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="*" element={<Error />} />

      <Route element={ <ProtectedRoutes /> }>
        <Route path="" element={<Dictionary />} />
        <Route path="edit" element={<Edit />} />
      </Route>

    </Routes>
  )
}