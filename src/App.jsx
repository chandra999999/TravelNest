
import './App.css';
import Nav from './Nav';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Layout from './Layout';
import Indexpage from './Indexpage';
import Register from './Register';
import axios from 'axios';
import { UserContextProvider } from './UserContextProvider';
import Account from './Account';
axios.defaults.baseUrl = 'http://localhost:3000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route index element={<Indexpage />} />
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />
          <Route path="/account/:subpage?" element={<Account />} />
          <Route path="/account/:subpage/:action" element={<Account />} />
          
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
