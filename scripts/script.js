document.getElementById("addTaskButton").addEventListener("click", () => {
    const taskName = document.getElementById("taskName").value.trim();

    if (taskName) {
        document.getElementById("taskList").innerHTML += `<div class="bg-gray-200 p-2 m-2 rounded-md flex justify-between items-center">
                <p>${taskName}</p>
                <button class="popButton w-1/5 bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2">pop</button>
            </div>`;

        document.querySelectorAll(".popButton").forEach((button) => {
            button.addEventListener("click", (event) => {
                event.target.parentElement.remove();
            });
        });

        document.getElementById("taskName").value = "";
    }
})
