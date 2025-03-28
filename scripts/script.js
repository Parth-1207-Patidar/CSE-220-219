document.addEventListener("DOMContentLoaded", loadTasks);

document.getElementById("addTaskButton").addEventListener("click", async () => {
    const taskName = document.getElementById("taskName").value.trim();

    if (taskName) {
        await fetch("../main/backend/save_task.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `taskName=${encodeURIComponent(taskName)}`
        });
        
        document.getElementById("taskName").value = "";
        await loadTasks();
    }
});

async function loadTasks() {
    const response = await fetch("../main/backend/get_tasks.php");
    const tasks = await response.json();

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
        let saveInterval;
        
        if (task.is_running) {
            startButton.disabled = true;
            stopButton.disabled = false;
            interval = setInterval(() => {
                seconds++;
                timerDiv.textContent = formatTime(seconds);
            }, 1000);
        }

        startButton.addEventListener("click", async () => {
            startButton.disabled = true;
            stopButton.disabled = false;
        
            interval = setInterval(() => {
                seconds++;
                timerDiv.textContent = formatTime(seconds);
            }, 1000);
        
            saveInterval = setInterval(async () => {
                await fetch("../main/backend/update_timer.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: `id=${task.id}&elapsed_time=${seconds}&is_running=1`
                });
            }, 5000);
        });
        
        stopButton.addEventListener("click", async () => {
            clearInterval(interval);
            clearInterval(saveInterval);
            startButton.disabled = false;
            stopButton.disabled = true;
        
            await fetch("../main/backend/update_timer.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `id=${task.id}&elapsed_time=${seconds}&is_running=0`
            });
        });
        
        popButton.addEventListener("click", async () => {
            await fetch("../main/backend/delete_task.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `id=${task.id}`
            });
            
            await loadTasks();
        });

        taskDiv.appendChild(taskNameDiv);
        taskDiv.appendChild(timerDiv);
        taskDiv.appendChild(startButton);
        taskDiv.appendChild(stopButton);
        taskDiv.appendChild(popButton);
        taskList.appendChild(taskDiv);
    });
}

function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
