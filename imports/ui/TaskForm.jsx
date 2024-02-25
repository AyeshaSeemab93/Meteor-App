import React from "react";
import {useState} from "react";

import {Meteor} from "meteor/meteor";


export const TaskForm = ({}) => {
  const [text, setText] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    if(!text) return; //if text is empty,falsy,NaN, 0 , Undefinded then return
    //1inserting the task(obj)into the collection
    //2(same code in server/main.j here it  triggers a request to the server where actuall insertion happens), during prototype stage
    // TasksCollection.insert({
    //   text: text.trim(),
    //   userId: user._id, // receiving the user id from the props/app.jsx
    //   createdAt: new Date()
    // });
    //3 after writing method in api/tasksMethods.js we just call the method here
    Meteor.call('tasks.insert', text) //text is the argument to the method
    //calling server to insert the task into the collection, not directly inserting into the collection from the client
    
    //clearing the input field at the end
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
