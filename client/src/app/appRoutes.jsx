import { Routes, Route } from 'react-router-dom';
import Login from '../components/authentication/login';
import Register from '../components/authentication/register';
import Error from '../components/common/error.jsx';
import Dictionary from "../features/recipes/dictionary/dictionary"
import Edit from "../features/recipes/edit/edit"
import ProtectedRoutes from '../components/protectedRoutes';

export default function AppRoutes() {
  return(
    <Routes>

      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="*" element={<Error />} />

      <Route path="" element={<Dictionary />} />
      
      <Route element={ <ProtectedRoutes /> }>
        <Route path="edit" element={<Edit />} />
        {/* <Route path="" element={<Dictionary />} /> */}
        {/* <Route path="edit" element={<Edit />} /> */}
      </Route>

    </Routes>
  )
}