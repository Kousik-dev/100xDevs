// Get references to the UI sections
const signInPage = document.getElementById("sign-in");
const signUpPage = document.getElementById("signup");
const todoContainer = document.getElementById("todo-container");

// Initially hide all sections except sign-in
signUpPage.style.display = "none";
todoContainer.style.display = "none";

// Function to show Sign-in page
function signIn() {
    signInPage.style.display = "block";
    signUpPage.style.display = "none";
    todoContainer.style.display = "none";
}

// Function to show Sign-up page
function signUp() {
    signInPage.style.display = "none";
    signUpPage.style.display = "block";
    todoContainer.style.display = "none";
}

// After successful sign-in, show the To-do container
function showTodoContainer() {
    signInPage.style.display = "none";
    signUpPage.style.display = "none";
    todoContainer.style.display = "block";
    fetchTodos(); // Fetch existing todos when showing the todo container
}

// Sign-up function
async function signUpUser() {
    const name = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    try {
        const response = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, password })
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message || 'Sign up successful');
            signIn(); // Show sign-in page
        } else {
            alert(data.message || 'Error during sign-up');
        }
    } catch (error) {
        console.error('Error during sign up:', error);
    }
}

// Sign-in function
async function signInUser() {
    const name = document.getElementById('signin-username').value;
    const password = document.getElementById('signin-password').value;

    try {
        const response = await fetch('http://localhost:3000/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, password })
        });

        const token = await response.json();
        console.log(token);
        if (response.ok) {
            localStorage.setItem('token', token); // Store JWT token
            showTodoContainer(); // Show the to-do container
        } else {
            alert('Invalid credentials');
        }
    } catch (error) {
        console.error('Error during sign in:', error);
    }
}

// Fetch and display todos
async function fetchTodos() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('http://localhost:3000/todo', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (response.ok) {
            displayTodos(data.todos);
        } else {
            console.error('Error fetching todos');
        }
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
}

// Function to display todos in the container
function displayTodos(todos) {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = ''; // Clear existing todos
    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('flex', 'justify-between', 'items-center', 'mb-4', 'p-3', 'border', 'border-gray-300', 'rounded-md','font-bold');

        // Add todo title
        const titleElement = document.createElement('p');
        titleElement.textContent = todo.title;
        todoItem.appendChild(titleElement);

        // Add delete button
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('bg-red-500', 'text-white', 'p-2', 'rounded-md');
        deleteButton.onclick = () => deleteTodo(todo._id);
        todoItem.appendChild(deleteButton);

        todoList.appendChild(todoItem);
    });
}

// Add a new todo
async function addTodo() {
    const title = document.getElementById('todo-input').value;

    if (title === '') {
        alert('Todo cannot be empty');
        return;
    }

    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, done: false })
        });

        const data = await response.json();
        if (response.ok) {
            document.getElementById('todo-input').value = ''; // Clear input field
            fetchTodos(); // Refresh the todo list
        } else {
            alert(data.message || 'Error adding todo');
        }
    } catch (error) {
        console.error('Error adding todo:', error);
    }
}

// Delete a todo
async function deleteTodo(todoId) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/todo/${todoId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            alert('Todo deleted');
            fetchTodos(); // Refresh the todo list
        } else {
            alert('Error deleting todo');
        }
    } catch (error) {
        console.error('Error deleting todo:', error);
    }
}

// Logout function
function logout() {
    localStorage.removeItem('token'); // Clear token
    signIn(); // Show sign-in page
}