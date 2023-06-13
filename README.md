# Task-Manager

This code represents a repair service application that allows users to create, manage, and track tasks for repairing different products. The application utilizes JavaScript and interacts with a Firebase Realtime Database for storing and retrieving task data.

Functionality:

Creating a Task:

The user can fill out the form with the product type, problem description, client name, and client phone number.
Clicking the form's button creates a new task with the provided details.
The task is added to the "received-orders" section and stored in the Firebase database.
The form fields are cleared after creating the task.
Starting and Finishing a Task:

When a task is created, it appears in the "received-orders" section.
Clicking the "Start task" button for a task moves it to the "unfinished-orders" section.
Clicking the "Finish task" button for an unfinished task marks it as finished, moves it to the "completed-orders" section, and updates its status in the database.
Viewing Unfinished and Finished Tasks:

Clicking the "Load Unfinished Tasks" button retrieves all unfinished tasks from the database.
Unfinished tasks are displayed in the "unfinished-orders" section.
Clicking the "Load Completed Tasks" button retrieves all finished tasks from the database.
Finished tasks are displayed in the "completed-orders" section.
Clearing Orders:

Clicking the "Clear" button removes all task containers from the "received-orders" section.
All tasks are deleted from the Firebase database using the deleteAllTasks function.
Firebase Integration:

The code includes API functions (getTask, changeStatus, deleteAllTasks, createTaskInFirebase, getAllUnfinishedTasks, getAllFinishedTasks) for interacting with the Firebase Realtime Database.
These functions handle operations such as retrieving a single task, updating a task's status, deleting all tasks, creating a new task, and retrieving unfinished/finished tasks from the database.
Usage:

To use this code, you need to have a Firebase Realtime Database set up.
Replace the Firebase database URLs in the API functions (getTask, changeStatus, etc.) with your own Firebase database URL.
Host the HTML file and JavaScript code on a web server or locally to run the application.
Note:

This code provides a basic implementation of a repair service application and can be extended or modified based on specific requirements.
Ensure that you have the necessary Firebase configuration and security rules set up to interact with the Firebase database securely.
