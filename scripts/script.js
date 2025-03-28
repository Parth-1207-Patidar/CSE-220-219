document.addEventListener("DOMContentLoaded", loadTasks);

document.getElementById("addTaskButton").addEventListener("click", () => {
    const taskName = document.getElementById("taskName").value.trim();

    if (taskName) {
        fetch("../main/backend/save_task.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `taskName=${encodeURIComponent(taskName)}`
        })
        .then(response => response.text())
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
                taskNameDiv.className = "w-4/5 overflow-y-auto whitespace-normal break-words";
                taskNameDiv.textContent = task.task_name;

                taskDiv.appendChild(taskNameDiv);

                const popButton = document.createElement("button");
                popButton.className = "bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600";
                popButton.textContent = "X";

                popButton.addEventListener("click", () => {
                    fetch("../main/backend/delete_task.php", {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: `id=${task.id}`
                    })
                    .then(() => loadTasks());
                });

                taskDiv.appendChild(popButton);
                taskList.appendChild(taskDiv);
            });
        });
}
