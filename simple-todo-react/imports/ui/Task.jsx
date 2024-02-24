import React from "react";
//showing task in the form of list
export const Task = ({ task, onCheckboxClick , onDeleteClick}) => {
   
    return (
        <li>
            <input
                type="checkbox"
                checked={!!task.isChecked} // checked = true/false !! converts the value to strict boolean
                onClick={() => onCheckboxClick(task)}
                readOnly
            />
            
            <span>{task.text}</span>
            <button onClick={ () => onDeleteClick(task) }>&times;</button>
            {/* >&times; = cross sign */}
        </li>
            

            );
};

  // task = {
  //   text: text.trim(),
  //   createdAt: new Date()
  // };