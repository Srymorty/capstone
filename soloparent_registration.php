<?php
session_start();
if (!isset($_SESSION['admin'])) {
    header("Location: login.php");
    exit();
}

// Get current date for registration
$registrationDate = date('Y-m-d');
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>SOLOPARENT Registration - DSWD Admin</title>
<link rel="stylesheet" href="style.css">
<script src="app.js" defer></script>
</head>
<body class="soloparent_registration">

<!-- SIDEBAR -->
<div class="sidebar">
    <h2>DSWD Admin</h2>
    <span>Management System</span>

    <div class="menu">
        <a href="admin_dashboard.php">Dashboard</a>
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
<style>
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f3f4f6;
    color: #111827;
    margin: 0;
    padding: 20px;
}

.registration-container {
    max-width: 900px;
    margin: 0 auto;
    background-color: #ffffff;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

h1 {
    text-align: center;
    margin-bottom: 20px;
}

.form-section {
    margin-bottom: 25px;
}

.section-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 15px;
    border-bottom: 2px solid #e5e7eb;
    padding-bottom: 5px;
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group label {
    font-weight: 500;
    margin-bottom: 5px;
}

.form-group input,
.form-group select,
.form-group textarea {
    padding: 8px 10px;
    border-radius: 10px;
    border: 1px solid #d1d5db;
    font-size: 14px;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    border-color: #3b82f6;
    outline: none;
}

.full-width {
    grid-column: 1 / -1;
}

.required {
    color: #ef4444;
}

.help-text {
    font-size: 12px;
    color: #6b7280;
}

/* Flex for First/Middle/Last Name */
.name-group {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.name-field {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 150px;
}

.add-child-btn {
    background-color: #3b82f6;
    color: #fff;
    border: none;
    padding: 8px 15px;
    border-radius: 6px;
    cursor: pointer;
    margin-top: 10px;
}

.add-child-btn:hover {
    background-color: #2563eb;
}

.documents-checklist {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.checkbox-item {
    display: flex;
    align-items: center;
    gap: 8px;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    margin-top: 20px;
}

.btn-primary {
    background-color: #10b981;
    color: #fff;
    border: none;
    padding: 10px 18px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
}

.btn-primary:hover {
    background-color: #059669;
}

.btn-secondary {
    background-color: #e5e7eb;
    color: #111827;
    border: none;
    padding: 10px 18px;
    border-radius: 6px;
    cursor: pointer;
}

.btn-secondary:hover {
    background-color: #d1d5db;
}
</style>

<div class="registration-container">
    <h1>SOLOPARENT Registration</h1>
    <form id="soloparentRegistrationForm" class="registration-form">

        <!-- Personal Information Section -->
        <div class="form-section">
            <h3 class="section-title">Personal Information</h3>
            <div class="name-group">
                <div class="name-field">
                    <label for="FirstName">First Name <span class="required">*</span></label>
                    <input type="text" id="FirstName" name="FirstName" required 
                           placeholder="Enter First Name" pattern="[A-Za-z\s]+" title="Letters only">
                </div>
                <div class="name-field">
                    <label for="MiddleName">Middle Name</label>
                    <input type="text" id="MiddleName" name="MiddleName" 
                           placeholder="Enter Middle Name" pattern="[A-Za-z\s]+" title="Letters only">
                </div>
                <div class="name-field">
                    <label for="LastName">Last Name <span class="required">*</span></label>
                    <input type="text" id="LastName" name="LastName" required 
                           placeholder="Enter Last Name" pattern="[A-Za-z\s]+" title="Letters only">
                </div>
            </div>

            <div class="form-grid">
                <div class="form-group">
                    <label for="dateOfBirth">Date of Birth <span class="required">*</span></label>
                    <input type="date" id="dateOfBirth" name="dateOfBirth" required 
                           max="<?php echo date('Y-m-d'); ?>">
                </div>
                <div class="form-group">
                    <label for="gender">Gender <span class="required">*</span></label>
                    <select id="gender" name="gender" required>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="civilStatus">Civil Status <span class="required">*</span></label>
                    <select id="civilStatus" name="civilStatus" required>
                        <option value="">Select Civil Status</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="widowed">Widowed</option>
                        <option value="separated">Separated</option>
                        <option value="annulled">Annulled</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Contact Information Section -->
        <div class="form-section">
            <h3 class="section-title">Contact Information</h3>
            <div class="form-grid">
                <div class="form-group">
                    <label for="phoneNumber">Phone Number <span class="required">*</span></label>
                    <input type="tel" id="phoneNumber" name="phoneNumber" required 
                           placeholder="09XX-XXX-XXXX" pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}">
                </div>
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" placeholder="email@example.com">
                </div>
                <div class="form-group full-width">
                    <label for="address">Address <span class="required">*</span></label>
                    <textarea id="address" name="address" required rows="2" 
                              placeholder="Enter complete address"></textarea>
                </div>
            </div>
        </div>

        <!-- Solo Parent Information Section -->
        <div class="form-section">
            <h3 class="section-title">Solo Parent Information</h3>
            <div class="form-grid">
                <div class="form-group">
                    <label for="soloParentId">Solo Parent ID <span class="required">*</span></label>
                    <input type="text" id="soloParentId" name="soloParentId" required 
                           placeholder="SOLO-XXXX-XXXX" pattern="SOLO-[0-9]{4}-[0-9]{4}">
                    <small class="help-text">Format: SOLO-YYYY-XXXX</small>
                </div>
                <div class="form-group">
                    <label for="numChildren">Number of Children <span class="required">*</span></label>
                    <input type="number" id="numChildren" name="numChildren" required min="1" max="20">
                </div>
                <div class="form-group full-width">
                    <label for="reasonSoloParent">Reason for Being Solo Parent <span class="required">*</span></label>
                    <select id="reasonSoloParent" name="reasonSoloParent" required>
                        <option value="">Select Reason</option>
                        <option value="widowed">Widowed</option>
                        <option value="separated">Separated/Divorced</option>
                        <option value="unmarried">Unmarried</option>
                        <option value="abandoned">Abandoned by Spouse</option>
                        <option value="spouseImprisoned">Spouse Imprisoned</option>
                        <option value="spouseDisabled">Spouse with Disability</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div class="form-group full-width" id="otherReasonGroup" style="display:none;">
                    <label for="otherReason">Specify Other Reason</label>
                    <input type="text" id="otherReason" name="otherReason" placeholder="Please specify">
                </div>
            </div>
        </div>

        <!-- Beneficiary Information Section -->
        <div class="form-section">
            <h3 class="section-title">Beneficiary Information</h3>
            <div class="form-grid">
                <div class="form-group">
                    <label for="program">Program <span class="required">*</span></label>
                    <select id="program" name="program" required>
                        <option value="">Select Program</option>
                        <option value="SOLOPARENT" selected>SOLOPARENT Program</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="benefitType">Benefit Type <span class="required">*</span></label>
                    <select id="benefitType" name="benefitType" required>
                        <option value="">Select Benefit Type</option>
                        <option value="monthly_cash">Monthly Cash Grant</option>
                        <option value="medical">Medical Assistance</option>
                        <option value="educational">Educational Support</option>
                        <option value="shelter">Shelter Assistance</option>
                        <option value="food">Food Assistance</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="registrationDate">Registration Date <span class="required">*</span></label>
                    <input type="date" id="registrationDate" name="registrationDate" 
                           required value="<?php echo $registrationDate; ?>" readonly>
                </div>
                <div class="form-group">
                    <label for="status">Initial Status</label>
                    <select id="status" name="status">
                        <option value="Pending">Pending</option>
                        <option value="Active">Active</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Form Actions -->
        <div class="form-actions">
            <a href="soloparent_program.php" class="btn-secondary">Cancel</a>
            <button type="submit" class="btn-primary">Register Participant</button>
        </div>

    </form>
</div>

<script>
// Show/hide other reason field based on selection
document.getElementById('reasonSoloParent').addEventListener('change', function() {
    const otherReasonGroup = document.getElementById('otherReasonGroup');
    if (this.value === 'other') {
        otherReasonGroup.style.display = 'block';
        document.getElementById('otherReason').setAttribute('required', 'true');
    } else {
        otherReasonGroup.style.display = 'none';
        document.getElementById('otherReason').removeAttribute('required');
    }
});
</script>

</body>
</html>
