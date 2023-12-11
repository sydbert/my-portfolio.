<?php
    include("connection.php");

    if(isset($_POST['submit'])){
        $name = $_POST['name'];
        $email = $_POST['email'];
        $contact = $_POST['contact'];
        $password = $_POST['pass'];
        $cpassword = $_POST['cpass'];

        if (!is_numeric($contact)) {
            echo "<script>
            alert('Contact must be a valid number.');
            window.location.href = 'loginlib.php';
            history.back();
            </script>";
        } else {

        
        $sql = "SELECT * FROM login WHERE email = '$email'";
        $result = mysqli_query($conn, $sql);
        $count_email = mysqli_num_rows($result);

        if($count_email == 0){
            if($password == $cpassword){
                $hash = password_hash($password, PASSWORD_DEFAULT);
                $sql = "INSERT INTO login(name, email, contact, password) VALUES ('$name', '$email', '$contact', '$password')";
                $result = mysqli_query($conn, $sql);

                if($result){
                    echo '<script>
                    alert("Welcome! Your registration was successful.");
                    window.location.href = "index.html";
                  </script>';
                }
            }
            else {
                echo '<script>
                alert("Passwords do not match.");
                window.location.href = "loginlib.php";
                history.back();
                </script>';
            }
        }
        else {
            echo '<script>
                    window.location.href="loginlib.php";
                    alert("Email is already in use.");
                    history.back();
                  </script>';
        }
    }
}
?>
