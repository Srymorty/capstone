<?php
session_start();
if (!isset($_SESSION['admin'])) {
    header("Location: login.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>AICS Program - DSWD Admin</title>
<link rel="stylesheet" href="style.css">
</head>

<body>

<!-- SIDEBAR -->
<div class="sidebar">
    <h2>DSWD Admin</h2>
    <span>Management System</span>

    <div class="menu">
        <a href="admin_dashboard.php">Dashboard</a>
        <a href="beneficiaries.php">Beneficiaries</a>
        <a href="assistance_requests.php">Assistance Requests</a>
        <a href="soloparent_program.php">SOLOPARENT Program</a>
        <a href="aics_program.php" class="active">AICS Program</a>
    </div>

    <div class="profile">
        <strong>Admin User</strong>
        <small><?= $_SESSION['admin'] ?></small>
    </div>
</div>

<!-- MAIN -->
<div class="main">

    <!-- TOP BAR -->
    <div class="topbar">
        <div class="search">
            <input type="text" placeholder="Search AICS beneficiaries...">
        </div>

        <div class="user">
            🔔
            <div class="avatar">AD</div>
            <strong>Admin User</strong>
            <a href="logout.php" style="color: #374151; text-decoration: none; margin-left: 10px;">Logout</a>
        </div>
    </div>

    <!-- TITLE -->
    <h1>AICS Program</h1>
    <p style="color:#6b7280; margin-top:5px;">
        Manage the Assistance to Individuals in Crisis Situations program.
    </p>
    <div style="text-align: right; margin-bottom: 15px;">
    <a href="aics_registration.php" 
       style="padding: 10px 20px; background: #3b82f6; color: white; 
              border-radius: 5px; text-decoration: none; display: inline-block;">
        Enroll Beneficiary
    </a>
</div>

    <!-- CONTENT -->
    <div class="card">
        <h3>Program Overview</h3>
        <p>Placeholder for AICS program details, including crisis assistance provided, beneficiary support, and program statistics.</p>
        <button style="padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 5px; cursor: pointer;">Provide Assistance</button>
    </div>

</div>

</body>
</html>
