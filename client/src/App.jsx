import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './views/Landing-page/Landing_page.jsx';
import Sign_in from './views/Sign-in/Sign_in.jsx';
import Error from './views/Error/Error.jsx';
import './App.css';

/*


        <Route path="/login" element={<Login />} />
        errorElement: <ErrorPage />,
*/


function App() {  
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing /> } /> 
        <Route path="/sign-in" element={<Sign_in />} />
        

        {/* Fallback routes for handling errors */}       
        
        <Route path="*" element={<Error />} />     
      </Routes>
    </Router>
  );
}

export default App
