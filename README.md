# Task-Manager

Task Management App
The Task Management App is a web application that allows users to create, manage, and track tasks. It provides a user-friendly interface for adding new tasks, updating task details, and marking tasks as completed. The app also includes features for categorizing tasks, assigning priorities, and displaying task status.

Features:

Task Creation: Users can create new tasks by providing the product type, problem description, client name, and client phone.
Task Management: Users can view, update, and delete tasks from the app.
Task Categorization: Tasks can be categorized based on the product type.
Client Information: The app allows users to store and display client information for each task.
Task Completion: Users can mark tasks as completed when the repair or work associated with the task is finished.
Data Persistence: The app stores tasks in a Firebase database, ensuring data persistence and accessibility.

Installation:

Clone the repository: git clone https://github.com/MalamirP/Task-Manager
Open the project folder: cd Task-Manager
Open the index.html file in a web browser or deploy the app on a web server.
Ensure that you have an active internet connection for the Firebase database access.

Usage:

Open the Task Management App in your web browser.
Use the form to enter the product type, problem description, client name, and client phone for a new task.
Click the "Create Task" button to add the task to the list.
To update a task, click the "Start task" button to mark it as started. The task will move to the "Unfinished Orders" section.
Once the task is completed, click the "Finish task" button. The task will be moved to the "Completed Orders" section.
To clear all orders, click the "Clear Orders" button.
Use the "Load Unfinished Orders" button to retrieve and display any unfinished tasks from the Firebase database.
The "Load Finished Orders" button can be used to fetch and display completed tasks from the database.
API and Firebase Database
The app utilizes the Firebase Realtime Database for storing and retrieving tasks. The following functions interact with the database:

createTaskInFirebase: Creates a new task in the Firebase database.
getAllUnfinishedTasks: Retrieves all unfinished tasks from the Firebase database.
getAllFinishedTasks: Retrieves all finished tasks from the Firebase database.
changeStatus: Updates the status of a task in the Firebase database.
deleteAllTasks: Deletes all tasks from the Firebase database.
getTask: Retrieves a specific task from the Firebase database.
Please ensure that you have the appropriate Firebase configuration and permissions set up to access and modify the database.
