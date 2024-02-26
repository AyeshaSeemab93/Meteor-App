# Meteor Todo App
https://meteor-todo-list.eu.meteorapp.com/

Welcome to my Meteor Todo App repository! This app is built using Meteor, a full-stack JavaScript framework that makes it easy to build real-time web applications.

### About Meteor

Meteor is a free and open-source isomorphic JavaScript web framework written using Node.js. It allows for rapid prototyping and produces cross-platform (Android, iOS, Web) code. Meteor integrates with MongoDB and uses the Distributed Data Protocol and a publish–subscribe pattern to automatically propagate data changes to clients without requiring the developer to write any synchronization code. 

### Features

- **Todo List App**: This is a simple Todo list app where users can create tasks, mark them as complete, and delete them when done.
- **User Authentication**: I have configured GitHub for user authentication, providing a secure login system for users.
- **Multiple Accounts**: Users can create multiple accounts on the app, each having a separate to-do list.
- **Real-time Updates**: Thanks to Meteor's reactivity, any changes made to the to-do list are instantly reflected across all connected clients.
- **MiniMongo**: The app uses MiniMongo, a client-side, in-memory database that mirrors the structure of MongoDB, to store and manage the data locally.
- **Methods**: Meteor methods are used for secure server-side operations, such as adding, updating, and deleting tasks. These methods ensure that the client can only execute specific actions when authorized.
- **Publications**: Meteor publications are utilized to define which data is sent from the server to the client. This helps in controlling what data each user can access.

### Deployment

The app has been deployed on Meteor Cloud/Galaxy for easy access. You can visit the deployed app [here](https://meteor-todo-list.eu.meteorapp.com/).

### Repository

This repository contains the code for the Meteor Todo App. Feel free to clone it and explore the code:

[GitHub Repository](https://github.com/AyeshaSeemab93/Meteor-App)

### Installation

If you want to run the app locally, make sure you have Meteor installed. Then, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/AyeshaSeemab93/Meteor-App.git
   ```

2. Navigate into the app directory:
   ```bash
   cd Meteor-App
   ```

3. Install dependencies:
   ```bash
   meteor npm install
   ```

4. Run the app:
   ```bash
   meteor
   ```

The app should now be running locally at `http://localhost:3000`.

### Contributions

Feel free to fork the repository, make changes, and create a pull request. Contributions are always welcome!

Happy task managing! 😊