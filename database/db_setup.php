<?php
$serverName = "localhost";
$userName = "root";
$password = "";

$conn = mysqli_connect($serverName, $userName, $password);

if (!$conn){
    die("Connection Failed: ". mysqli_connect_error());
}

$query = "CREATE DATABASE IF NOT EXISTS Credentials";

$result = mysqli_query($conn, $query);

if (!$result){
    die("Database creation failed: ". mysqli_connect_error());
}

mysqli_select_db($conn, "Credentials");

$query = "CREATE TABLE IF NOT EXISTS information(
    email VARCHAR(80) NOT NULL PRIMARY KEY,
    pass VARCHAR(255) NOT NULL
)";

$result = mysqli_query($conn, $query);

if (!$result){
    die("Table creation failed: ". mysqli_connect_error());
}

echo "Database setup successfully";

mysqli_close($conn);
?>