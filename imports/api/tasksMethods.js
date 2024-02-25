//creating methods to insert, remove in the task collection(DB) using Meteor methods
//writing at common place so that it can be used in multiple places eg. TaskForm.jsx, Task.jsx

import { Meteor } from "meteor/meteor";
 //importing the DBcollection
import { TasksCollection } from "/imports/api/TasksCollection";
import { check } from "meteor/check";

Meteor.methods(
  {
  'tasks.insert'(text) 
  {
    //check if the user is logged in
    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }
    // else inserting the task into the collection
    TasksCollection.insert({
      text,
      createdAt: new Date(),
      userId: this.userId,
    });
  },

  
  'tasks.remove'(taskId) 
  {
    check(taskId, String);
    //check if the user is logged in
    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }
    // else removing the task from the collection
    TasksCollection.remove(taskId);
  },


  'tasks.setIsChecked'(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);
 
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    TasksCollection.update(taskId, {
      $set: {
        isChecked
      }
    });
  }


  }


);
