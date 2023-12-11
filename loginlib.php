<?php
    include("connection.php");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login and Registration form for lib</title>
    <link rel="stylesheet" href="stylelib.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body>
    <div class="container">
    <input type="checkbox" id="flip">
     <div class="cover">
        <div class="font">
            <img src="images/blog-kate-august18-1080x630.jpg" alt="">
            <div class="text">
                <span class="text-1"> "A library is not a luxury but one of the necessities of life." </span>
                <span class="text-2"> - Henry Ward Beecher </span>

            </div>
        </div>
        <div class="back">
            <img class="backimg" src="images/hero.jpg" alt="">
            <div class="text">
                <span class="text-1"> "Libraries: where stories unfold, and minds take flight." </span>
                <span class="text-2"> - Sidney Sheldon </span>
            </div>
        </div>
     </div>
      <div class="forms">
          <div class="form-content">
            <div class="login-form">
            <h1 style="color: #8F9779; text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.5)">WELCOME TO OUR LIBRARY</h1>
            <center><span style="color: #a7a7a7; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2)"> Discover Worlds Within Pages</span></center><br><br>
              <div class="title">Login</div>
            <form action="login.php" method="POST"> 
              <div class="input-boxes">
                <div class="input-box">
                  <i class="fas fa-envelope"></i>
                  <input type="text" name="email" placeholder="Enter your email" required>
                </div>
                <div class="input-box">
                  <i class="fas fa-lock"></i>
                  <input type="password" name="pass" placeholder="Enter your password" required>
                </div>
                <div class="text"><a href="forgot_password.php">Forgot password?</a></div>
                <div class="button input-box">
                  <input type="submit" name="submit" value="Login">
                </div>
                <div class="text login-text">Don't have an account? <label for="flip">Signup now</label></div>
              </div>
          </form>
        </div>
          <div class="signup-form">
            <div class="title">Signup</div>
            <form action="signup.php" method="POST">
              <div class="input-boxes">
                <div class="input-box">
                  <i class="fas fa-user"></i>
                  <input type="text" name="name" placeholder="Enter your name" required>
                </div>
                <div class="input-box">
                  <i class="fas fa-envelope"></i>
                  <input type="email" name="email" placeholder="Enter your email" required>
                </div>
                <div class="input-box">
                <i class="fa-solid fa-address-book"></i>
                  <input type="text" name="contact" placeholder="Contact no." required>
                </div>
                <div class="input-box">
                  <i class="fas fa-lock"></i>
                  <input type="password" name="pass" placeholder="Password" required>
                </div>
                <div class="input-box">
                  <i class="fas fa-lock"></i>
                  <input type="password" name="cpass" placeholder="Confirm password" required>
                </div>
                <div class="button input-box">
                  <input type="submit" name="submit" value="Signup">
                </div>
                <div class="text sign-up-text">Already have an account? <label for="flip">Login now</label></div>
              </div>
        </form>
      </div>
      </div>
      </div>
    </div>
  </body>
  </html>