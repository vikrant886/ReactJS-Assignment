import logo from './logo.svg';
import './App.css';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Register from './pages/RegisterForm';
import IntermediateForm from './pages/intermediate-form';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Register/>}  />
      <Route path='/inter' element={<IntermediateForm/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
