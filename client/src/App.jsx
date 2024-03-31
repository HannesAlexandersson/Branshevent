import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Landing, Sign_in, Company_sign_up, Company_second_stage, Company_signup_third, Student_signup_firststage, Student_second_stage, } from './views/index.js';
import Error from './views/Error/Error.jsx';
import './App.css';





function App() {  
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing /> } /> 
        <Route path="/sign-in" element={<Sign_in />} />
        <Route path="/company-signup" element={<Company_sign_up />} />
        <Route path="/company-description" element={<Company_second_stage />} />
        <Route path="/company-work" element={<Company_signup_third />} />

        <Route path="/student-signup" element={<Student_signup_firststage />} />
        <Route path="/student-description" element={<Student_second_stage />} />
        

        {/* Fallback routes for handling errors */}       
        
        <Route path="*" element={<Error />} />     
      </Routes>
    </Router>
  );
}

export default App
