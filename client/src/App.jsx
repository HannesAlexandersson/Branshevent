import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './views/Landing-page/Landing_page.jsx';
import Sign_in from './views/Sign-in/Sign_in.jsx';
import Company_sign_up from './views/Company-signUp/Company_sign_up.jsx';
import Company_second_stage from './views/Company-secondstage/Company_second_stage.jsx';
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
        

        {/* Fallback routes for handling errors */}       
        
        <Route path="*" element={<Error />} />     
      </Routes>
    </Router>
  );
}

export default App
