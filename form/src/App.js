import logo from './logo.svg';
import './App.css';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Register from './pages/RegisterForm';
import IntermediateForm from './pages/intermediate-form';
import Advform from './pages/adv-form';
import Home from './pages/home';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}  />
      <Route path='/basic' element={<Register/>}/>
      <Route path='/inter' element={<IntermediateForm/>}/>
      <Route path='/advanced' element={<Advform/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
