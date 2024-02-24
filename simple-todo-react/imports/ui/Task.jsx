import React from "react";
//showing task in the form of list
export const Task = ({ task }) => {
    return <li>{task.text}</li>;
};

  // task = {
  //   text: text.trim(),
  //   createdAt: new Date()
  // };