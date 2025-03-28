document.addEventListener("DOMContentLoaded", loadTasks);

document.getElementById("addTaskButton").addEventListener("click", () => {
    const taskName = document.getElementById("taskName").value.trim();

    if (taskName) {
        fetch("../main/backend/save_task.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `taskName=${encodeURIComponent(taskName)}`
        })
        .then(() => {
            document.getElementById("taskName").value = "";
            loadTasks();
        });
    }
});

function loadTasks() {
    fetch("../main/backend/get_tasks.php")
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById("taskList");
            taskList.innerHTML = "";

            tasks.forEach(task => {
                const taskDiv = document.createElement("div");
                taskDiv.className = "bg-gray-200 p-2 m-2 rounded-md flex justify-between items-center";

                const taskNameDiv = document.createElement("div");
                taskNameDiv.className = "w-3/5 overflow-y-auto break-words";
                taskNameDiv.textContent = task.task_name;

                const timerDiv = document.createElement("div");
                timerDiv.className = "w-1/5 text-center";
                let seconds = task.elapsed_time;
                timerDiv.textContent = formatTime(seconds);

                const startButton = document.createElement("button");
                startButton.className = "bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600";
                startButton.textContent = "▶";
                
                const stopButton = document.createElement("button");
                stopButton.className = "bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600";
                stopButton.textContent = "⏸";
                stopButton.disabled = true;

                const popButton = document.createElement("button");
                popButton.className = "bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600";
                popButton.textContent = "X";

                let interval;
                
                // Check if task was running before refresh
                if (task.is_running) {
                    startButton.disabled = true;
                    stopButton.disabled = false;
                    interval = setInterval(() => {
                        seconds++;
                        timerDiv.textContent = formatTime(seconds);
                    }, 1000);
                }

                startButton.addEventListener("click", () => {
                    startButton.disabled = true;
                    stopButton.disabled = false;
                    interval = setInterval(() => {
                        seconds++;
                        timerDiv.textContent = formatTime(seconds);
                        fetch("../main/backend/update_timer.php", {
                            method: "POST",
                            headers: { "Content-Type": "application/x-www-form-urlencoded" },
                            body: `id=${task.id}&elapsed_time=${seconds}&is_running=1`
                        });
                    }, 1000);

                    
                });

                stopButton.addEventListener("click", () => {
                    clearInterval(interval);
                    startButton.disabled = false;
                    stopButton.disabled = true;
                    
                    fetch("../main/backend/update_timer.php", {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: `id=${task.id}&elapsed_time=${seconds}&is_running=0`
                    });
                });

                popButton.addEventListener("click", () => {
                    fetch("../main/backend/delete_task.php", {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: `id=${task.id}`
                    })
                    .then(() => loadTasks());
                });

                taskDiv.appendChild(taskNameDiv);
                taskDiv.appendChild(timerDiv);
                taskDiv.appendChild(startButton);
                taskDiv.appendChild(stopButton);
                taskDiv.appendChild(popButton);
                taskList.appendChild(taskDiv);
            });
        });
}

function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
