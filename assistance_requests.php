<?php
session_start();
if (!isset($_SESSION['admin'])) {
    header("Location: login.php");
    exit();
}

// For demo purposes, example counts. In a real system, fetch from DB
$totalRequests = 120;
$pending = 45;
$processing = 30;
$approved = 45;
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Assistance Requests - DSWD Admin</title>
<link rel="stylesheet" href="style.css">
<style>
/* Status summary bar */
.status-bar {
    display: flex;
    gap: 15px;
    margin-top: 20px;
    margin-bottom: 20px;
}
.status-card {
    flex: 1;
    background-color: #f3f4f6;
    padding: 15px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    transition: transform 0.2s;
}
.status-card:hover {
    transform: translateY(-3px);
}
.status-card h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #111827;
}
.status-card p {
    margin: 5px 0 0 0;
    color: #6b7280;
}
.status-total { background-color: #ffffff; }
.status-pending { background-color: #ffffff; }
.status-processing { background-color: #ffffff; }
.status-approved { background-color: #ffffff; }

/* ============================= */
/* FILTER SECTION DESIGN */
/* ============================= */

.filter-form {
    display: flex;
    flex-wrap: wrap;
    gap: 18px;
    align-items: center;
    margin-top: 15px;
}

/* Dropdown Styling */
.filter-form select {
    padding: 12px 18px;
    min-width: 220px;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    background: #f8fafc;
    font-size: 14px;
    font-weight: 500;
    color: #334155;
    outline: none;
    cursor: pointer;
    transition: all 0.3s ease;
}
.filter-form .form-group:last-of-type {
    margin-left: auto;
}

/* Focus Effect */
.filter-form select:focus {
    background: #ffffff;
    border-color: #3b82f6;
    box-shadow: 0 6px 18px rgba(59,130,246,0.15);
    transform: translateY(-2px);
 
}
.filter-form .form-group:last-child {
    margin-left: auto;
}

/* Search Button */
.btn-search {
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

/* Search Hover */
.btn-search:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(37,99,235,0.35);
}

/* Reset Button */
.btn-reset {
    background: #ef4444;
    color: white;
    padding: 12px 24px;
    border-radius: 12px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
}

/* Reset Hover */
.btn-reset:hover {
    background: #dc2626;
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(220,38,38,0.35);
}


.filter-form input[name="search"] {
    padding: 12px 18px;
    min-width: 280px;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    background: #f8fafc;
    font-size: 14px;
    font-weight: 500;
    color: #334155;
    outline: none;
    cursor: text;
    transition: all 0.3s ease;
}

.filter-form input[name="search"]:focus {
    background: #ffffff;
    border-color: #3b82f6;
    box-shadow: 0 6px 18px rgba(59,130,246,0.15);
    transform: translateY(-2px);
}
</style>
<script src="app.js" defer></script>
</head>

<body>

<!-- SIDEBAR -->
<div class="sidebar">
    <h2>DSWD Admin</h2>
    <span>Management System</span>

    <div class="menu">
        <a href="admin_dashboard.php">Dashboard</a>
        <a href="beneficiaries.php">Beneficiaries</a>
        <a href="assistance_requests.php" class="active">Assistance Requests</a>
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
            <input type="text" placeholder="Search requests...">
        </div>

        <div class="user">
            🔔
            <div class="avatar">AD</div>
            <strong>Admin User</strong>
            <a href="logout.php" style="color: #374151; text-decoration: none; margin-left: 10px;">Logout</a>
        </div>
    </div>

    <!-- TITLE -->
    <h1>Assistance Requests</h1>
    <p style="color:#6b7280; margin-top:5px;">
        Review and manage assistance requests from beneficiaries.
    </p>

    <!-- STATUS SUMMARY BAR -->
    <div class="status-bar">
        <div class="status-card status-total">
            <h2><?= $totalRequests ?></h2>
            <p>Total Requests</p>
        </div>
        <div class="status-card status-pending">
            <h2><?= $pending ?></h2>
            <p>Pending</p>
        </div>
        <div class="status-card status-processing">
            <h2><?= $processing ?></h2>
            <p>Processing</p>
        </div>
        <div class="status-card status-approved">
            <h2><?= $approved ?></h2>
            <p>Approved</p>
        </div>
    </div>

    <!-- CONTENT -->
    <div class="card">

    <h3>Search & Filter Requests</h3>

    <form method="GET" action="" class="filter-form">

        <!-- Search Bar -->
        <div class="form-group">
            <input 
                type="text" 
                name="search" 
                placeholder="Search by name, request ID, or program..."
                value="<?= isset($_GET['search']) ? $_GET['search'] : '' ?>"
            >
        </div>

        <!-- Status Filter -->
        <div class="form-group">
            <select name="status">
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
            </select>
        </div>

        <!-- Program Filter -->
        <div class="form-group">
            <select name="program">
                <option value="">All Programs</option>
                <option value="AICS">AICS</option>
                <option value="SoloParent">Solo Parent</option>
            </select>
        </div>

        <!-- Buttons -->
        <div class="form-group">
            <button type="submit" class="btn-search">Search</button>
            <a href="assistance_requests.php" class="btn-reset">Reset</a>
        </div>

    </form>

</div>

</div>

</body>
</html>
