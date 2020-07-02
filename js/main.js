/*jslint this:true,
        devel: true,
        eval: true,
        browser: true
*/
/*global window*/

var input = document.querySelector('.todo-container .add-task input'),
    plus = document.querySelector('.todo-container .add-task .plus'),
    htmlTaskSpan = document.querySelector('.todo-container .tasks-content'),
    noTask = document.querySelector('.todo-container .tasks-content .no-tasks-message'),
    tasksCount = document.querySelector('.todo-status .tasks-count span'),
    taskCompleted = document.querySelector('.todo-status .tasks-completed span'),
    taskFound = false,
    tasksTimer = 0,
    taskCompletedTimer = 0,
    flagcompletedall = false;


/*Start setup local storage*/
function setupLocalStorage() {
    "use strict";
    localStorage.setItem('tasks', document.querySelector('.todo-container .tasks-content').outerHTML);
}
/*End setup local storage*/
/*Start set tasks*/
function setTasks() {
    "use strict";
    tasksTimer += 1;
    noTask.remove();
    if (document.querySelector('.todo-container .tasks-content .no-tasks-message')) {
        document.querySelector('.todo-container .tasks-content .no-tasks-message').remove();
    }
    var mainSpan = document.createElement('span'),
        textNode = document.createTextNode(input.value),
        deleteSpan = document.createElement('span');
    mainSpan.setAttribute('class', 'task-box');
    deleteSpan.setAttribute('class', 'delete');
    deleteSpan.textContent = "Delete";
    mainSpan.appendChild(textNode);
    mainSpan.appendChild(deleteSpan);
    htmlTaskSpan.appendChild(mainSpan);
    tasksCount.textContent = tasksTimer;
    input.value = "";
    document.querySelector('.todo-all .delete-all').classList.remove('disabled');
    document.querySelector('.todo-all .complete-all').classList.remove('disabled');
    setupLocalStorage();
}
/*End set tasks*/
/*Start check tasks if exist or not*/
function checkInput() {
    "use strict";
    var tasksbox = document.querySelectorAll('.todo-container .tasks-content .task-box');
    if (isNaN(input.value)) {
        if (tasksbox[0] === undefined) {
            setTasks();
        } else {
            tasksbox.forEach(function (taskbox) {
                if (taskbox.childNodes[0].textContent === input.value) {
                    taskFound = true;
                }
            });
            if (taskFound === true) {
                alert("This Task Have Been Written Before.");
                taskFound = false;
            } else {
                setTasks();
            }
        }
    } else {
        alert("sorry! Field can't be only Numbers or Empty");
    }
}
/*End check tasks if exist or not*/
/*Start Event click in documentation*/
document.addEventListener('click', function (e) {
    "use strict";
    /*Start add task*/
    if (e.target.classList.contains('plus')) {
        checkInput();
    }
    /*End  add task*/
    /*Start Finish task*/
    if (e.target.classList.contains("task-box")) {
        if (e.target.children.length === 1) {
            taskCompletedTimer += 1;
            e.target.style.textDecoration = "line-through";
            var finish = document.createElement('span');
            finish.setAttribute('class', 'finished');
            finish.textContent = "Completed";
            e.target.appendChild(finish);
            taskCompleted.textContent = taskCompletedTimer;
            if (tasksTimer === taskCompletedTimer) {
                document.querySelector('.todo-all .complete-all').classList.add('disabled');
            } else {
                document.querySelector('.todo-all .complete-all').classList.remove('disabled');
            }
        } else {
            taskCompletedTimer -= 1;
            e.target.style.textDecoration = "none";
            e.target.children[1].remove();
            taskCompleted.textContent = taskCompletedTimer;
            document.querySelector('.todo-all .complete-all').classList.remove('disabled');
        }
        setupLocalStorage();
    }
    /*End Finish task*/
    /*Start Delete task*/
    if (e.target.classList.contains("delete")) {
        if (e.target.parentNode.childNodes.length === 2) {
            tasksTimer -= 1;
            tasksCount.textContent = tasksTimer;
        } else {
            taskCompletedTimer -= 1;
            tasksTimer -= 1;
            taskCompleted.textContent = taskCompletedTimer;
            tasksCount.textContent = tasksTimer;
        }
        e.target.parentNode.remove();
        if (tasksTimer === 0) {
            var emptySpan = document.createElement('span');
            emptySpan.setAttribute('class', 'no-tasks-message');
            emptySpan.textContent = 'No Tasks To show';
            document.querySelector('.todo-container .tasks-content').appendChild(emptySpan);
            document.querySelector('.todo-all .delete-all').classList.add('disabled');
            document.querySelector('.todo-all .complete-all').classList.add('disabled');
        } else {
            document.querySelector('.todo-all .delete-all').classList.remove('disabled');
        }
        setupLocalStorage();
    }
    /*End Delete task*/
    if (e.target.classList.contains('delete-all')) {
        if (!e.target.classList.contains('disabled')) {
            tasksTimer = 0;
            taskCompletedTimer = 0;
            tasksCount.textContent = tasksTimer;
            taskCompleted.textContent = taskCompletedTimer;
            document.querySelector('.todo-container .tasks-content').innerHTML = '';
            var emptySpan2 = document.createElement('span');
            emptySpan2.setAttribute('class', 'no-tasks-message');
            emptySpan2.textContent = 'No Tasks To show';
            document.querySelector('.todo-container .tasks-content').appendChild(emptySpan2);
            document.querySelector('.todo-all .delete-all').classList.add('disabled');
            document.querySelector('.todo-all .complete-all').classList.add('disabled');
        }
        setupLocalStorage();
    }
    /*Start Delete All tasks*/
    /*Start complete all Tasks*/
    if (e.target.classList.contains('complete-all')) {
        if (!e.target.classList.contains('disabled')) {
            if (tasksTimer > 0) {
                document.querySelectorAll('.todo-container .tasks-content .task-box').forEach(function (taskbox) {
                    if (taskbox.children.length === 1) {
                        taskCompletedTimer += 1;
                        taskbox.style.textDecoration = "line-through";
                        var finish2 = document.createElement('span');
                        finish2.setAttribute('class', 'finished');
                        finish2.textContent = "Completed";
                        taskbox.appendChild(finish2);
                        taskCompleted.textContent = taskCompletedTimer;
                    }
                });
            }
        }
        document.querySelector('.todo-all .complete-all').classList.add('disabled');
        setupLocalStorage();
    }
    /*End Complete All Tasks*/
});
/*End Event click in documentation*/
/*Start Event Enter in input*/
input.addEventListener("keyup", function (event) {
    "use strict";
    if (event.keyCode === 13) {
        checkInput();
    }
});
/*End Event Enter in input*/
/*Start get local storage*/
window.onload = function () {
    "use strict";
    if (localStorage.length !== 0 && localStorage.getItem('tasks').search('no-tasks-message') === -1) {
        document.querySelector('.todo-container .tasks-content').remove();
        document.querySelector('.todo-container').innerHTML += (localStorage.getItem('tasks'));
        tasksTimer = document.querySelector('.todo-container .tasks-content').children.length;
        tasksCount.textContent = tasksTimer;
        document.querySelectorAll('.todo-container .tasks-content .task-box').forEach(function (taskbox) {
            if (taskbox.children.length === 1) {
                flagcompletedall = true;
            } else {
                taskCompletedTimer += 1;
            }
        });
        taskCompleted.textContent = taskCompletedTimer;
        if (flagcompletedall) {
            document.querySelector('.todo-all .complete-all').classList.remove('disabled');
        }
        document.querySelector('.todo-all .delete-all').classList.remove('disabled');
    }
};
/*End get local storage*/
