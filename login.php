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
<style>/* ============================= */
/* GLOBAL */
/* ============================= */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', sans-serif;
}

body.login {
    min-height: 100vh;
    background: linear-gradient(135deg, #f3f6ff, #f8edff);
    display: flex;
    align-items: center;
    justify-content: center;
}

/* ============================= */
/* LOGIN CARD */
/* ============================= */

.card {
    width: 380px;
    background: #ffffff;
    padding: 35px 30px;
    border-radius: 18px;
    box-shadow: 0 25px 50px rgba(0,0,0,0.12);
    text-align: center;
    position: relative;
}

/* ============================= */
/* LOGO */
/* ============================= */

.icon {
    width: 120px;
    height: 120px;
    margin: 0 auto 15px auto;
    display: flex;
    align-items: center;
    justify-content: center;
}

.icon img {
    width: 100%;
    height: auto;
    object-fit: contain;
}

/* ============================= */
/* TITLE & TEXT */
/* ============================= */

.card h2 {
    font-size: 22px;
    font-weight: 700;
    color: #111827;
    margin-bottom: 6px;
}

.card p {
    font-size: 14px;
    color: #6b7280;
    margin-bottom: 25px;
}

/* ============================= */
/* ERROR MESSAGE */
/* ============================= */

.error {
    background: #fee2e2;
    color: #b91c1c;
    padding: 10px;
    border-radius: 10px;
    font-size: 14px;
    margin-bottom: 15px;
}

/* ============================= */
/* FORM */
/* ============================= */

form {
    text-align: left;
}

form label {
    font-size: 13px;
    font-weight: 600;
    color: #111827;
    margin-bottom: 6px;
    display: block;
}

form input {
    width: 100%;
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid #e5e7eb;
    background: #f9fafb;
    margin-bottom: 18px;
    font-size: 14px;
    transition: all 0.25s ease;
}

form input:focus {
    outline: none;
    background: #ffffff;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
}

/* ============================= */
/* BUTTON */
/* ============================= */

button {
    width: 100%;
    padding: 13px;
    border: none;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 600;
    color: #ffffff;
    cursor: pointer;
    background: linear-gradient(135deg, #4f46e5, #9333ea);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

button:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 25px rgba(79,70,229,0.4);
}

/* ============================= */
/* RESPONSIVE */
/* ============================= */

@media (max-width: 420px) {
    .card {
        width: 90%;
        padding: 30px 20px;
    }
}</style>
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
