<?php
    include("connection.php");
    if(isset($_POST['submit'])) {
     
    $email = $_POST["email"];
    $password = $_POST["pass"];

    $sql = "select * from login where email = '$email' and password = '$password'";
    $result = mysqli_query($conn, $sql);

    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
    $count = mysqli_num_rows($result);

    if ($count == 1){
        echo '<script>
        alert("Welcome back! Login successful.");
        window.location.href = "index.html";
        </script>';
        exit();
    } else {
        echo "<script>
        alert('Invalid email or password.');
        window.location.href = 'loginlib.php';
        history.back();
        </script>";
    }

    }  
    
?>