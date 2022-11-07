import Login from './Login';
import Dashboard from './Dashboard';

import 'bootstrap/dist/css/bootstrap.min.css';
import useLocalStorage from './hooks/useLocalStorage';
import { useEffect } from 'react';
import './Dashboard.css';
import { ContactProvider } from './contexts/ContactProvider';
import ConversationsProvider from './contexts/ConversationsProvider';

const SETPRIMARYKEY = "--primarycolor"
const SETSECONDARYKEY = "--secondarycolor"
const SETSUCCESSKEY = "--successcolor"
const SETBGKEY = "--bgcolor"

function App() {
  const [loginID , setLoginID] = useLocalStorage("loginID" , "")
  const [customize] = useLocalStorage("customize" , {})
  useEffect(() => {
    var r = document.querySelector(':root')
    customize[SETPRIMARYKEY] && r.style.setProperty(SETPRIMARYKEY, customize[SETPRIMARYKEY])
    customize[SETSECONDARYKEY] && r.style.setProperty(SETSECONDARYKEY, customize[SETSECONDARYKEY])
    customize[SETSUCCESSKEY] && r.style.setProperty(SETSUCCESSKEY, customize[SETSUCCESSKEY])
    customize[SETBGKEY] && r.style.setProperty(SETBGKEY, customize[SETBGKEY])
  }, [customize])
  
  return <ConversationsProvider loginID={loginID}><ContactProvider>{!loginID ? <Login setLoginID={setLoginID}/> : <Dashboard loginID={loginID}/>}</ContactProvider></ConversationsProvider>;
}

export default App;
