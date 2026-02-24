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
<title>Beneficiaries - DSWD Admin</title>
<link rel="stylesheet" href="style.css">
<script src="app.js" defer></script>
</head>

<body>

<!-- SIDEBAR -->
<div class="sidebar">
    <h2>DSWD Admin</h2>
    <span>Management System</span>

    <div class="menu">
        <a href="admin_dashboard.php">Dashboard</a>
        <a href="beneficiaries.php" class="active">Beneficiaries</a>
        <a href="assistance_requests.php">Assistance Requests</a>
        <a href="soloparent_program.php">SOLOPARENT Program</a>
        <a href="aics_program.php">AICS Program</a>
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
            <input type="text" placeholder="Search beneficiaries...">
        </div>

        <div class="user">
            🔔
            <div class="avatar">AD</div>
            <strong>Admin User</strong>
            <a href="logout.php" style="color: #374151; text-decoration: none; margin-left: 10px;">Logout</a>
        </div>
    </div>

    <!-- TITLE -->
    <h1>Beneficiaries Management</h1>
    <p style="color:#6b7280; margin-top:5px;">
        Manage and view registered beneficiaries.
    </p>

    <!-- CONTENT -->
    <div class="card">
        <h3>Beneficiaries List</h3>
        <p>Placeholder for beneficiaries table. In a real system, this would display a list of beneficiaries with details like name, ID, program enrolled, etc.</p>
        <button style="padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 5px; cursor: pointer;">Add New Beneficiary</button>
    </div>

</div>

</body>
</html>
