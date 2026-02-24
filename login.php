<?php
session_start();
$valid_email = "1@gmail.com";
$valid_password = "admin123";

$error = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = trim($_POST["email"]);
    $password = trim($_POST["password"]);

    if ($email === $valid_email && $password === $valid_password) {
        $_SESSION["admin"] = $email;
        header("Location: admin_dashboard.php");
        exit();
    } else {
        $error = "Invalid email or password";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>DSWD Admin Login</title>
<link rel="stylesheet" href="style.css">
<script src="app.js" defer></script>
</head>
<body class="login">

<div class="card">
    <div class="icon"> <img src="Logo.jpg" alt=""></div>
    <h2>CSWD Admin System</h2>
    <p>Sign in to access the admin dashboard</p>

    <?php if ($error): ?>
        <div class="error"><?= $error ?></div>
    <?php endif; ?>

    <form method="POST">
        <label>Email</label>
        <input type="email" name="email" placeholder="your.email@dswd.gov.ph" required>

        <label>Password</label>
        <input type="password" name="password" placeholder="Enter your password" required>

        <button type="submit">Sign In</button>
    </form>
</div>

</body>
</html>
