import Home from './pages/home/Home';
import Watch from './pages/watch/Watch';
import './app.scss';
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from "./context/authContext/AuthContext";

function App() {
  const {user} = useContext(AuthContext);
  console.log(user)
  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/register" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />}/>
        <Route path="/login"  element={!user ? <Login /> : <Navigate to="/" />} />
        {user ? <>
          <Route path="/movies" element={<Home type="movies"/>} />
          <Route path="/series" element={<Home type="series"/>} />
          <Route path="/watch" element={<Watch />} />
        </> : <Route path="/*" element={<Navigate to="/login" />} />
        }
      </Routes>
    </Router>)
}

export default App;
