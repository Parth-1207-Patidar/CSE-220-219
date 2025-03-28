<?php
$serverName = "localhost"; 
$userName = "root";
$password = "";
$dbName = "TaskTracker";

$conn = new mysqli($serverName, $userName, $password, $dbName);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $taskId = $_POST['id'];
    $elapsedTime = $_POST['elapsed_time'] ?? null;
    $isRunning = $_POST['is_running'] ?? null;

    if (!is_null($elapsedTime)) {
        $stmt = $conn->prepare("UPDATE tasks SET elapsed_time = ?, is_running = ? WHERE id = ?");
        $stmt->bind_param("iii", $elapsedTime, $isRunning, $taskId);
    } else {
        $stmt = $conn->prepare("UPDATE tasks SET is_running = ? WHERE id = ?");
        $stmt->bind_param("ii", $isRunning, $taskId);
    }
    
    $stmt->execute();
    echo "Task updated successfully";
}

$conn->close();
?>
