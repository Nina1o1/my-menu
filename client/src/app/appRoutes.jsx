import { Routes, Route } from 'react-router-dom';
import Login from '../components/authentication/login';
import Register from '../components/authentication/register';
import Error from '../components/common/error.jsx';
import Dictionary from "../components/dictionary/dictionary"
import Edit from "../components/edit/edit"
import Folder from '../components/folder/folder';
import FolderDisplay from '../components/folderDisplay/folderDisplay';
import ProtectedRoutes from '../components/protectedRoutes';

export default function AppRoutes() {
  return(
    <Routes>

      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="*" element={<Error />} />

        <Route path="edit" element={<Edit />} />
        <Route path="" element={<Dictionary />} />
        <Route path="folder" element={<Folder />} />
        <Route path="folder_display" element={<FolderDisplay />} />

      <Route element={ <ProtectedRoutes /> }>
      </Route>

    </Routes>
  )
}