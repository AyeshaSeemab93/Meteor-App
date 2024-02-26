//1: creating methods to insert, remove in the task collection(DB) using Meteor methods
//created after removing the default insecure packageI(allowing client to directly eidt the DB)
//writing at common place so that it can be used in multiple places eg. TaskForm.jsx, Task.jsx and server side
//2. check if same user is removing the task who created it 
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
    //1:checking if the taskId is a string
    check(taskId, String);
    //2:check if the user is logged in
    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }
    //3:check if user is the one who created the task
    const task = TasksCollection.findOne({userId: this.userId });
    if(!task)
    {
      throw new Meteor.Error("Access denied.");
    }
    //4: else removing the task from the collection
    TasksCollection.remove(taskId);
  },


  'tasks.setIsChecked'(taskId, isChecked) {
    //1:checking if the taskId is a string 2: authorized user is logged in 3: user is the one who created the task 4: updating the isChecked field in the task
    check(taskId, String);
    check(isChecked, Boolean);
 
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });
    if(!task){
      throw new Meteor.Error('Access denied.');
    }

    TasksCollection.update(taskId, {
      $set: {
        isChecked
      }
    });
  }


  }


);
