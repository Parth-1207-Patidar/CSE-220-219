<?php
session_start();

$serverName = "localhost";
$userName = "root";
$password = "";
$conn = mysqli_connect($serverName, $userName, $password);

if (mysqli_connect_errno()) {
    $_SESSION['error'] = "Database connection failed!";
    header("location: ../index.php");
    exit();
}

mysqli_select_db($conn, "Credentials");

$email = trim($_POST['email']);
$pass = trim($_POST['password']);

if (empty($email) || empty($pass)) {
    $_SESSION['error'] = "All fields are required!";
    header("location: ../index.php");
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $_SESSION['error'] = "Invalid email format!";
    header("location: ../index.php");
    exit();
}

$checkQuery = mysqli_prepare($conn, "SELECT email, pass FROM information WHERE email = ?");
mysqli_stmt_bind_param($checkQuery, "s", $email);
mysqli_stmt_execute($checkQuery);
$checkResult = mysqli_stmt_get_result($checkQuery);

if (mysqli_num_rows($checkResult) == 0) {
    $_SESSION['error'] = "Email not found!";
    header("location: ../index.php");
    exit();
} else {
    $row = mysqli_fetch_assoc($checkResult);
    $hashedPass = $row['pass'];

    if (password_verify($pass, $hashedPass)) {
        $_SESSION['error'] = ""; // Clear error on successful login
        header("location: ../../main/index.html");
        exit();
    } else {
        $_SESSION['error'] = "Incorrect password!";
        header("location: ../index.php");
        exit();
    }
}
?>
