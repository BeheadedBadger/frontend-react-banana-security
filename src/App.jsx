import {Routes, Route, Navigate} from 'react-router-dom';
import NavBar from './components/NavBar';
import Profile from './pages/Profile';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import './App.css';
import {AuthContext} from './context/AuthContext';
import {useContext} from "react";

function App() {
    const {state} = useContext(AuthContext);

  return (
    <>
      <NavBar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={state === true ? <Profile/> : <Navigate to="/SignIn"/>}/>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        {/*<button onClick={() => stateChangeHandler()}>{state.toString()}</button>*/}
      </div>
    </>
  );
}

export default App;
