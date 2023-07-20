import {createContext, useEffect, useState} from "react";
import axios from "axios";


export const UserContext = createContext({});

export function UserContextProvider({children}){
  const [user,setuser] = useState(null);
  const [ready,setready]=useState(false);
    async function logo(){
      
     var id=(window.localStorage.getItem("userid"));
    
     if(id!=null){
      
      const res=await axios.post('http://localhost:3000/profile',{id});
      if(res.data!=null){
      console.log(res.data.name);
    //  var t=new userLogincredentials(res["data"]["_id"],res["data"]["name"],res["data"]["email"]);
    //  console.log(id+" usercontet");
     setready(true);
     setuser(res.data);
     }}
   }


useEffect(()=>{
  logo();
},[])

  
  return (
    <UserContext.Provider value={{user,setuser,ready}}>
      {children}
    </UserContext.Provider>
  );
}