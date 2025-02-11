document.getElementById("addTaskButton").addEventListener("click", () => {
    const taskName = document.getElementById("taskName").value.trim();

    if (taskName) {
        const taskDiv = document.createElement("div");
        taskDiv.className = "bg-gray-200 p-2 m-2 rounded-md flex justify-between items-center";

        const taskNameDiv = document.createElement("div");
        taskNameDiv.className = "w-4/5 overflow-y-auto whitespace-normal break-words";
        taskNameDiv.textContent = taskName;

        taskDiv.appendChild(taskNameDiv);

        const popButton = document.createElement("button");
        popButton.className = "bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600";
        popButton.textContent = "X";

        taskDiv.appendChild(popButton);

        popButton.addEventListener("click", () => {
            taskDiv.remove();
        });

        document.getElementById("taskList").appendChild(taskDiv);
        document.getElementById("taskName").value = "";
    }
});
