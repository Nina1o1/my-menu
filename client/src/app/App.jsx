import './App.css';
import Header from '../components/common/header';
import Footer from '../components/common/footer';
import AppRoutes from './appRoutes';

export default function App() {
  return (
    <>
      <Header />
      <div className="container">
        <AppRoutes className="container"/>
      </div>
      <Footer />
    </>
  )
}