//creating methods to insert, remove in the task collection(DB) using Meteor methods
//created after removing the default insecure packageI(allowing client to directly eidt the DB)
//writing at common place so that it can be used in multiple places eg. TaskForm.jsx, Task.jsx and server side

import { Meteor } from "meteor/meteor";
 //importing the DBcollection
import { TasksCollection } from "../../db/TasksCollection"
import { check } from "meteor/check";

Meteor.methods(
  {
  'tasks.insert'(text) //tasks is the name of the collection in the DB check db/TasksCollection.js
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
