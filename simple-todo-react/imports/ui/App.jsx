import React from 'react';
import { Task } from './Task.jsx';


const tasks = [
  {_id: 1, text: 'This is task 1'},
  {_id: 2, text: 'This is task 2'},
  {_id: 3, text: 'This is task 3'}
]

export const App = () => (
  <div>
    <h1>Welcome to Meteor!</h1>
    <ul>
      {tasks.map(task => <Task key={task._id} task={task} />)}
    </ul>
  </div>
);
