import './App.css';
import Header from './components/common/header';
import AppRoutes from './appRoutes';

export default function App() {
  return (
    <>
      <Header />
      <div className="container">
        <AppRoutes />
      </div>
    </>
  )
}