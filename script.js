// STEP 1: GET ELEMENTS FROM HTML
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const stats = document.getElementById('stats');

// STEP 2: CREATE AN ARRAY TO STORE ALL TASKS
// An array is like a list that can hold multiple items
let tasks = [];

// STEP 3: FUNCTION TO ADD A NEW TASK
function addTask() {
    // Get the text the user typed
    const taskText = taskInput.value;
    
    // Check if the input is empty
    if (taskText === '') {
        alert('Please enter a task!');
        return;  // Stop the function here
    }
    
    // Create a task object (objects store related data together)
    const task = {
        id: Date.now(),  // Unique ID using timestamp
        text: taskText,
        completed: false
    };
    
    // Add the task to our array
    tasks.push(task);  // push = add to end of array
    
    // Clear the input field
    taskInput.value = '';
    
    // Update the display
    renderTasks();
}

// STEP 4: FUNCTION TO DISPLAY ALL TASKS
function renderTasks() {
    // Clear the current list
    todoList.innerHTML = '';
    
    // If no tasks, show empty state
    if (tasks.length === 0) {
        todoList.innerHTML = '<li class="empty-state">No tasks yet. Add one above! 🎯</li>';
        updateStats();
        return;
    }
    
    // Loop through each task and create HTML for it
    tasks.forEach((task) => {
        // Create a new list item element
        const li = document.createElement('li');
        li.className = 'todo-item';
        
        // If task is completed, add completed class
        if (task.completed) {
            li.classList.add('completed');
        }
        
        // Create the HTML content for this task
        li.innerHTML = `
            <span class="todo-text">${task.text}</span>
            <button class="complete-btn" onclick="toggleComplete(${task.id})">
                ${task.completed ? 'Undo' : 'Done'}
            </button>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        `;
        
        // Add this task to the list
        todoList.appendChild(li);
    });
    
    // Update the stats
    updateStats();
}

// STEP 5: FUNCTION TO MARK TASK AS COMPLETE/INCOMPLETE
function toggleComplete(id) {
    // Find the task with this ID and flip its completed status
    tasks = tasks.map((task) => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    
    renderTasks();
}

// STEP 6: FUNCTION TO DELETE A TASK
function deleteTask(id) {
    // Remove the task with this ID from the array
    tasks = tasks.filter((task) => task.id !== id);
    
    renderTasks();
}

// STEP 7: FUNCTION TO UPDATE STATS
function updateStats() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    
    stats.textContent = `You have ${totalTasks} tasks (${completedTasks} completed, ${pendingTasks} pending)`;
}

// STEP 8: ADD EVENT LISTENERS
addBtn.addEventListener('click', addTask);

// Allow pressing Enter to add task
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Initial render (show empty state)
renderTasks();
