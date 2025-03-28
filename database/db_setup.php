<?php
$serverName = "localhost";
$userName = "root";
$password = "";


$conn = mysqli_connect($serverName, $userName, $password);
if (!$conn) {
    die("Connection Failed: " . mysqli_connect_error());
}

$query = "CREATE DATABASE IF NOT EXISTS Credentials";
if (!mysqli_query($conn, $query)) {
    die("Database creation failed: " . mysqli_error($conn));
}

mysqli_select_db($conn, "Credentials");

$query = "CREATE TABLE IF NOT EXISTS information (
    email VARCHAR(80) NOT NULL PRIMARY KEY,
    pass VARCHAR(255) NOT NULL
)";
if (!mysqli_query($conn, $query)) {
    die("Table creation failed: " . mysqli_error($conn));
}

$query = "CREATE DATABASE IF NOT EXISTS TaskTracker";
if (!mysqli_query($conn, $query)) {
    die("Database creation failed: " . mysqli_error($conn));
}

mysqli_select_db($conn, "TaskTracker");

$query = "CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";
if (!mysqli_query($conn, $query)) {
    die("Table creation failed: " . mysqli_error($conn));
}

mysqli_close($conn);

header("Location: ../login/index.php");
exit;
?>
