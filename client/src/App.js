

import { useState, useEffect } from 'react';

// const { API_BASE } = process.env;
const API_BASE = "http://localhost:3001";



function App() {

  const [todos, setTodos] =useState([]);
  const[popupActive, setpopupActive] = useState(false);
  const[newtodo, setNewTodo]=useState("");

  useEffect(()=>{
    GetTodos();

  }, [])

  //axios?
  const GetTodos = ()=>{
    fetch(API_BASE + "/todos")
    .then(res=>res.json())
    .then(data=>setTodos(data))
    .catch(err=>console.error("Error: ", err))
  }

  const completeTodo = async id =>{
    const data = await fetch(API_BASE+"/todo/complete/" + id)
      .then(res=>res.json());

    setTodos(todos => todos.map(task=>{
        if(task._id===data._id){
          task.complete = data.complete;
        }
        return todos;
    }))

  }

  const deleteTodo = async id=>{
    const data = await fetch(API_BASE+"/todo/delete/" + id, {method:"DELETE"})
    .then(res=>res.json());

    setTodos(todos=>todos.filter(todo=>todo._id!==data._id));
  }

  return (
    <div className="App">
      <h1>Welcome, Andrés</h1>
      <h3>Your tasks</h3>

          <div className="todos">

              {
                todos.map(task=>(
                    <div className={"todo "+(task.complete? "is-complete":"")} key={task._id} >

                        <div className="checkbox"> </div>

                        <div className="text">{task.text}</div>

                        <div className="delete-todo"> X </div>

                    </div>
                )
                )
              }



              {/* <div className="todo is-complete">

                  <div className="checkbox"> </div>

                  <div className="text">Get the milk</div>

                  <div className="delete-todo"> X </div>

              </div> */}




          </div>




    </div>
  );
}

export default App;
