import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Company_finish, Landing, Sign_in, Company_sign_up, Company_account, Company_second_stage, Company_signup_third, Company_summary, Student_signup_firststage, Student_second_stage, Student_third_stage, Test, Student_account, Student_summary, Student_finish, Account, Home, Favourites } from './views/index.js';
import Error from './views/Error/Error.jsx';
import './App.css';





function App() {  
  
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Landing /> } /> 
        <Route path="/sign-in" element={<Sign_in />} />
        <Route path="/favourites" element={<Favourites />} />

        <Route path="/company-signup" element={<Company_sign_up />} />
        <Route path="/company-account" element={<Company_account />} />
        <Route path="/company-description" element={<Company_second_stage />} />
        <Route path="/company-work" element={<Company_signup_third />} />
        <Route path="/company-summary" element={<Company_summary />} />
        <Route path="/company-finish" element={<Company_finish />} />

        <Route path="/student-signup" element={<Student_signup_firststage />} />
        <Route path="/student-account" element={<Student_account />} />
        <Route path="/student-description" element={<Student_second_stage />} />
        <Route path="/student-work" element={<Student_third_stage />} />
        <Route path="/student-summary" element={<Student_summary />} />
        <Route path="/student-finish" element={<Student_finish />} />

        <Route path="/account" element={<Account />} />

        <Route path="/test-to-DB" element={<Test />} />
        

        {/* Fallback routes for handling errors */}       
        
        <Route path="*" element={<Error />} />     
      </Routes>
    </Router>
  );
}

export default App
