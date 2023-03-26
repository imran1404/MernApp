import { useState, useEffect } from "react";
function App() {

  const [form, setForm] = useState({});
  const [users, setUsers] = useState([]);

  const handleClick = (e)=>{
    console.log(e.target.value)
    // just like value we can also get name value through name attribute using e.target .name
    console.log(e.target.name)
    setForm(
      {
        ...form,
        [e.target.name] : e.target.value
      }
    )

  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const response = await fetch("http://localhost:8080/demo", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    console.log(data)
  }

  const getUser = async ()=>{
    const response = await fetch("http://localhost:8080/demo", {
      method: "GET"
    })
    const data = await response.json()
    console.log(data)
    setUsers(data)
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
      <form>
      <input type="text" name="username" onChange={handleClick} placeholder='Username'/>
      <input type="password" name="password" onChange={handleClick} placeholder='Password'/>
      <input type="submit" onClick={handleSubmit} />
     <ul>
      {users.map((userr)=>{
        return <li key={userr._id}>{userr.username}:{userr.password}</li>
      })}
      
     </ul>
      </form>
  )
}

export default App;