import React from "react";
import {useState} from "react";
import {TasksCollection} from "../api/TasksCollection";

export const TaskForm = () => {
  const [text, setText] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  //
    if(!text) return; //if text is empty,falsy,NaN, 0 , Undefinded then return

    //inserting the task(obj)into the collection
    TasksCollection.insert({
      text: text.trim(),
      createdAt: new Date()
    });
    //clearing the input field
    setText("");
  }
  return(
    <form className="task-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Type to add new tasks"
        value={text}
        onChange={(e) => setText(e.target.value)}
        
      />
      <button type="submit">Add Task</button>
    </form>
  )
}
