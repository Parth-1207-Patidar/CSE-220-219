<?php
$serverName = "localhost";
$userName = "root";
$password = "";

$conn = mysqli_connect($serverName, $userName, $password);

if (!$conn) {
    echo "Connection failed:  ". mysqli_connect_error(). "<br>";
}

mysqli_select_db($conn,"Credentials");

$email = $_POST['email'];
$pass = $_POST['password'];


$hashedPass = password_hash($pass, PASSWORD_BCRYPT);


$checkQuery = mysqli_prepare($conn, "SELECT email FROM information WHERE email = ?");
mysqli_stmt_bind_param( $checkQuery,"s", $email);
mysqli_stmt_execute($checkQuery);
$checkResult = mysqli_stmt_get_result($checkQuery);


if (mysqli_num_rows($checkResult) == 0) {
    
    $query = mysqli_prepare($conn, "INSERT INTO information(email, pass) VALUES(?, ?)");
    mysqli_stmt_bind_param($query, "ss", $email, $hashedPass);
    
    $result = mysqli_stmt_execute($query);

    if ($result) {
        echo "Account created successfully <br>";
        header("location: login.html");
        exit();
    }
    else{
        die("Error: ". mysqli_stmt_error($query) . "<br>");
    }
}
else{
    echo "Email already exists <br>";
}
