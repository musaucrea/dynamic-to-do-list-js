document.addEventListener('DOMContentLoaded', function() {
    // Constants for DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' to prevent re-saving
    }

    // Function to add a task
    function addTask(taskText, save = true) {
        if (taskText.trim() === '') {
            alert('Please enter a task.');
            return;
        }

        // Create new task item
        const listItem = document.createElement('li');
        listItem.textContent = taskText;
        listItem.classList.add('task-item');
        
        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';
        removeButton.onclick = function() {
            removeTask(listItem, taskText);
        };

        // Append remove button to the list item
        listItem.appendChild(removeButton);
        
        // Append list item to the task list
        taskList.appendChild(listItem);

        // Save to Local Storage if required
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear the input field
        taskInput.value = '';
    }

    // Function to remove a task
    function removeTask(listItem, taskText) {
        taskList.removeChild(listItem);

        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Event listener for the "Add Task" button
    addButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        addTask(taskText);
    });

    // Event listener for pressing "Enter" in the input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            addTask(taskText);
            event.preventDefault(); // Prevent form submission
        }
    });
    

    // Load existing tasks on page load
    loadTasks();
});
