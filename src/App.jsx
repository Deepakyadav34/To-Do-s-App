import React, { useState, useEffect } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import Todo from './Todo'
import { db } from './firebase'
import { query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore'







const style = {
  bg: 'h-screen w-screen p-4 bg-gradient-to-r from-blue-950 to-blue-950',
  container: `bg-pink-100 max-w-[700px] w-full m-auto rounded-md shadow-xl p-8`,
  heading: `text-4xl font-bold text-center text-gray-500-p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full`,
  button: `border p-4 ml-2 bg-purple-600 text-slate-100`,
  count:`text-center p-2`,
  base:`bg-white`
}

function App() {

  const [todo, setTodos] = useState([]);
  const [input, setInput] = useState('')
  console.log(input)

  //create todo
  const createTodo = async (e) => {
    e.preventDefault(e)
    if (input === '') {
      alert('Please enter a valid task')
      return
    }
    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false,
    })
    setInput('')
  };




  //read todo from react
  useEffect(() => {
    const q = query(collection(db, 'todos'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = []
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id })
      });
      setTodos(todosArr)
    })
    return () => unsubscribe()
  }, [])

  //update todo from react
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed
    })

  }
  //delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id))
  }


  return (
    <div className={style.bg}>
   
      <div className={style.container}>
        <h3 className={style.heading}>ToDo List</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input className={style.input} value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Add ToDO works" />
          <button className={style.button}><AiOutlinePlus size={30} /></button>
        </form>
        <ul>
          {todo.map((todo, index) => (
            <Todo key={index}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo} />

          ))}

        </ul>
        {todo.length < 1 ? null : <p className={style.count}>{`You have ${todo.length} todos`}</p>}
</div>

      </div>
    
  );
}

export default App;