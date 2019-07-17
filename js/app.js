const form = document.querySelector('#taskForm');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.btn_clear');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners() {
	document.addEventListener('DOMContentLoaded', getTasks);

	form.addEventListener('submit', addTask);

	taskList.addEventListener('click', removeTask);

	clearBtn.addEventListener('click', clearTasks);

	filter.addEventListener('keyup', filterTasks);
}

function getTasks() {
	let tasks;

	if(localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function (task) {
		const li = document.createElement('li');
		li.className = 'collection__item';
		li.appendChild(document.createTextNode(task));
		const link = document.createElement('a');
		link.className = 'delete-item';
		link.innerHTML = '<i class="fa fa-remove"></i>';
		li.appendChild(link);

		taskList.appendChild(li);
	})
}

function addTask(e) {
	if(taskInput.value === '') {
		alert('Напишите задачу');
	}

	const li = document.createElement('li');
	li.className = 'collection__item';
	li.appendChild(document.createTextNode(taskInput.value));
	const link = document.createElement('a');
	link.className = 'delete-item';
	link.innerHTML = '<i class="fa fa-remove"></i>';
	li.appendChild(link);

	taskList.appendChild(li);

	storeTaskInLs(taskInput.value);

	taskInput.value = '';

	e.preventDefault();
}

function storeTaskInLs(task) {
	let tasks;

	if(localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.push(task);

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
	if(e.target.parentElement.classList.contains('delete-item')) {
		if(confirm('Удалить задачу?')) {
			e.target.parentElement.parentElement.remove();

			removeTaskFromLs(e.target.parentElement.parentElement);
		}
	}
}

function removeTaskFromLs(taskItem) {
	let tasks;

	if(localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.forEach(function (task, index) {
		if(taskItem.textContent === task) {
			tasks.splice(index, 1);
		}
	});

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks() {
	while(taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}

	clearLs();
}

function clearLs() {
	localStorage.clear();
}

function filterTasks(e) {
	const filterText = e.target.value.toLowerCase();

	document.querySelectorAll('.collection__item').forEach
	(function(task) {
		const filteredTask = task.firstChild.textContent;
		if(filteredTask.toLowerCase().indexOf(filterText) !== -1) {
			task.style.display = 'block';
		} else {
			task.style.display = 'none';
		}
	});
}