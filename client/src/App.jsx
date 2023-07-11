import './App.css';
import Header from './components/common/header';
import AppRoutes from './appRoutes';
import Footer from './components/common/footer';

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