//import logo from './logo.svg';
import './App.css';
import {Auth} from "./components/auth";
import { db } from "./firebase-config";
import {useState} from "react";
function App() {
  const [userInfo,setUserInfo] = useState([]);
  const getUserInfo = () => {

  }
  return <div className="App">
    <Auth />
  </div>
}

export default App;
