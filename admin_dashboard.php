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
<title>DSWD Admin Dashboard</title>
<link rel="stylesheet" href="style.css">
<script src="app.js" defer></script>
</head>

<body>

<!-- SIDEBAR -->
<div class="sidebar">
    <div class="search">
            <input type="text" placeholder="Search...">
        </div>
    <h2>DSWD Admin</h2>
    <div class="menu">
        <a href="admin_dashboard.php" class="active">Dashboard</a>
        <a href="beneficiaries.php">Beneficiaries</a>
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
       

        <div class="user">
            🔔
            <div class="avatar">AD</div>
            <strong>Admin User</strong>
            <a href="logout.php" style="color: #374151; text-decoration: none; margin-left: 10px;">Logout</a>
        </div>
    </div>

    <!-- TITLE -->
    <h1>Admin Dashboard</h1>
    <p style="color:#6b7280; margin-top:5px;">
        Welcome back! Here's an overview of your system.
    </p>

    <!-- STATS -->
    <div class="stats">
        <div class="card">
            <h4>Total Beneficiaries</h4>
            <h1>2,547</h1>
            <small class="green">+12.5% from last month</small>
        </div>

        <div class="card">
            <h4>Assistance Requests</h4>
            <h1>384</h1>
            <small class="green">+8.2% from last month</small>
        </div>

        <div class="card">
            <h4>Approved This Month</h4>
            <h1>156</h1>
            <small class="green">+23.1% from last month</small>
        </div>

        <div class="card">
            <h4>Pending Review</h4>
            <h1>42</h1>
            <small class="red">-5.3% from last month</small>
        </div>
    </div>

    <!-- CHARTS -->
    <div class="charts">
        <div class="chart-box">
            <h3>Monthly Assistance Trends</h3>
            <p style="color:#6b7280;">Requests vs Approvals (chart placeholder)</p>
        </div>

        <div class="chart-box">
            <h3>Program Distribution</h3>
            <p style="color:#6b7280;">Pie chart placeholder</p>
        </div>
    </div>

</div>

</body>
</html>
