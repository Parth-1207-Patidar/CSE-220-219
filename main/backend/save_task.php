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
    $taskName = $_POST['taskName'];

    $stmt = $conn->prepare("INSERT INTO tasks (task_name) VALUES (?)");
    $stmt->bind_param("s", $taskName);
    $stmt->execute();
    echo "Task added successfully";
}

$conn->close();
?>
