<?php
$serverName = "localhost";
$userName = "root";
$password = "";

$conn = mysqli_connect($serverName, $userName, $password);

if (mysqli_connect_errno()) {
    echo "Error: ". mysqli_connect_error(). "<br>";
}

mysqli_select_db($conn,"Credentials");

$email = $_POST['email'];
$pass = $_POST['password'];

$checkQuery = mysqli_prepare($conn, "SELECT email, pass FROM information WHERE email = ?");
mysqli_stmt_bind_param( $checkQuery,"s", $email);
mysqli_stmt_execute($checkQuery);

$checkResult = mysqli_stmt_get_result($checkQuery);


if (mysqli_num_rows($checkResult) == 0) {
    echo "Email not found <br>";
}
else{
    $row = mysqli_fetch_assoc($checkResult);
    $hashedPass = $row['pass'];

    if (password_verify($pass, $hashedPass)) {
        header("location: ../main/index.html");
    }
    else{
        echo "Incorrect password <br>";
    }
}
