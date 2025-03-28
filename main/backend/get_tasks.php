<?php
$serverName = "localhost";
$userName = "root";
$password = "";
$dbName = "TaskTracker";

$conn = new mysqli($serverName, $userName, $password, $dbName);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id, task_name FROM tasks";
$result = $conn->query($sql);

$tasks = [];
while ($row = $result->fetch_assoc()) {
    $tasks[] = $row;
}

echo json_encode($tasks);
$conn->close();
?>
