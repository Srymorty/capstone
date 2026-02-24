/**
 * DSWD Admin System - JavaScript Functionality
 * Adds interactivity to all pages
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize common functionality
    initCommon();
    
    // Page-specific initialization
    const page = document.body.className || document.querySelector('.main h1')?.textContent || '';
    
    if (document.body.classList.contains('login')) {
        initLoginPage();
    } else if (page.includes('Dashboard')) {
        initDashboardPage();
    } else if (page.includes('Beneficiaries')) {
        initBeneficiariesPage();
    } else if (page.includes('Assistance')) {
        initAssistancePage();
    } else if (page.includes('SOLOPARENT')) {
        initSoloparentPage();
    } else if (page.includes('AICS')) {
        initAicsPage();
    }
});

/* ============================================
   COMMON FUNCTIONS
   ============================================ */

// Initialize common elements across all pages
function initCommon() {
    // Search functionality for all search inputs
    const searchInputs = document.querySelectorAll('.search input');
    searchInputs.forEach(input => {
        input.addEventListener('input', debounce(handleGlobalSearch, 300));
    });
    
    // Initialize any modals
    initModals();
    
    // Add notification bell click handler
    const notificationBell = document.querySelector('.user span');
    if (notificationBell) {
        notificationBell.style.cursor = 'pointer';
        notificationBell.addEventListener('click', toggleNotifications);
    }
}

// Global search handler
function handleGlobalSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const page = document.querySelector('.main h1')?.textContent || '';
    
    // Find table or card content to filter
    const content = document.querySelector('.card');
    if (content) {
        const items = content.querySelectorAll('tr, .item, .stat-card');
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    }
}

// Toggle notifications dropdown
function toggleNotifications() {
    let dropdown = document.querySelector('.notification-dropdown');
    
    if (!dropdown) {
        dropdown = document.createElement('div');
        dropdown.className = 'notification-dropdown';
        dropdown.innerHTML = `
            <div style="padding: 15px; border-bottom: 1px solid #e5e7eb;">
                <strong>Notifications</strong>
            </div>
            <div style="padding: 15px; color: #6b7280;">
                <p>🔔 5 new assistance requests</p>
                <p>📋 3 beneficiaries pending approval</p>
                <p>✅ 12 requests approved today</p>
            </div>
        `;
        dropdown.style.cssText = `
            position: absolute;
            top: 60px;
            right: 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.15);
            min-width: 250px;
            z-index: 1000;
        `;
        document.querySelector('.topbar').appendChild(dropdown);
    }
    
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}

// Initialize modals
function initModals() {
    // Close modal on outside click
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal(e.target);
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal-overlay');
            modals.forEach(modal => closeModal(modal));
        }
    });
}

// Open modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// Close modal
function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Debounce utility
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/* ============================================
   LOGIN PAGE
   ============================================ */

function initLoginPage() {
    const form = document.querySelector('form');
    const passwordInput = document.querySelector('input[name="password"]');
    const emailInput = document.querySelector('input[name="email"]');
    
    // Add show/hide password toggle
    const passwordWrapper = document.createElement('div');
    passwordWrapper.style.position = 'relative';
    passwordInput.parentNode.insertBefore(passwordWrapper, passwordInput);
    passwordWrapper.appendChild(passwordInput);
    
    const togglePassword = document.createElement('span');
    togglePassword.innerHTML = '👁️';
    togglePassword.style.cssText = `
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        font-size: 18px;
    `;
    togglePassword.addEventListener('click', function() {
        passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    });
    passwordWrapper.appendChild(togglePassword);
    
    // Form validation
    form.addEventListener('submit', function(e) {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        // Client-side validation
        if (!email || !password) {
            e.preventDefault();
            showError('Please fill in all fields');
            return;
        }
        
        if (!isValidEmail(email)) {
            e.preventDefault();
            showError('Please enter a valid email address');
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = 'Signing in...';
        submitBtn.disabled = true;
        
        // Add loading animation
        submitBtn.style.opacity = '0.7';
        
        // Form will submit normally to PHP
    });
    
    // Real-time validation feedback
    emailInput.addEventListener('blur', function() {
        if (this.value && !isValidEmail(this.value)) {
            this.style.border = '2px solid #ef4444';
        } else {
            this.style.border = 'none';
        }
    });
    
    // Add shake animation on error
    function showError(message) {
        const card = document.querySelector('.card');
        card.classList.add('shake');
        
        let errorDiv = document.querySelector('.login-error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'login-error';
            errorDiv.style.cssText = 'color: #ef4444; margin-bottom: 15px; font-size: 14px;';
            form.insertBefore(errorDiv, form.firstChild);
        }
        errorDiv.textContent = message;
        
        setTimeout(() => card.classList.remove('shake'), 500);
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ============================================
   DASHBOARD PAGE
   ============================================ */

function initDashboardPage() {
    // Animate stat cards on load
    animateStats();
    
    // Add refresh button functionality
    addRefreshButton();
    
    // Initialize mini stats update
    setInterval(updateLiveStats, 30000); // Update every 30 seconds
}

function animateStats() {
    const cards = document.querySelectorAll('.stats .card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function addRefreshButton() {
    const topbar = document.querySelector('.topbar');
    const refreshBtn = document.createElement('button');
    refreshBtn.innerHTML = '🔄';
    refreshBtn.title = 'Refresh Data';
    refreshBtn.style.cssText = `
        background: white;
        border: 1px solid #e5e7eb;
        padding: 8px 12px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
    `;
    refreshBtn.addEventListener('click', function() {
        this.style.transform = 'rotate(360deg)';
        this.style.transition = 'transform 0.5s ease';
        showToast('Data refreshed successfully');
        setTimeout(() => {
            this.style.transform = 'rotate(0deg)';
        }, 500);
    });
    topbar.appendChild(refreshBtn);
}

function updateLiveStats() {
    // Simulate live stat updates
    const stats = document.querySelectorAll('.stats .card h1');
    stats.forEach(stat => {
        const current = parseInt(stat.textContent.replace(/,/g, ''));
        const change = Math.floor(Math.random() * 10) - 3;
        const newValue = Math.max(0, current + change);
        stat.textContent = newValue.toLocaleString();
    });
}

/* ============================================
   BENEFICIARIES PAGE
   ============================================ */

function initBeneficiariesPage() {
    createBeneficiariesTable();
    createAddBeneficiaryModal();
    setupBeneficiarySearch();
}

function createBeneficiariesTable() {
    const card = document.querySelector('.card');
    
    // Sample data
    const beneficiaries = [
        { id: 'BEN-001', name: 'Maria Santos', program: 'AICS', status: 'Active', amount: 5000 },
        { id: 'BEN-002', name: 'John Doe', program: 'SOLOPARENT', status: 'Active', amount: 3000 },
        { id: 'BEN-003', name: 'Jane Rivera', program: 'AICS', status: 'Pending', amount: 0 },
        { id: 'BEN-004', name: 'Carlos Mendoza', program: 'SOLOPARENT', status: 'Active', amount: 2500 },
        { id: 'BEN-005', name: 'Ana Garcia', program: 'AICS', status: 'Active', amount: 7500 },
    ];
    
    let tableHTML = `
        <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                <thead>
                    <tr style="background: #f8fafc; border-bottom: 2px solid #e5e7eb;">
                        <th style="padding: 12px; text-align: left; color: #64748b;">ID</th>
                        <th style="padding: 12px; text-align: left; color: #64748b;">Name</th>
                        <th style="padding: 12px; text-align: left; color: #64748b;">Program</th>
                        <th style="padding: 12px; text-align: left; color: #64748b;">Status</th>
                        <th style="padding: 12px; text-align: left; color: #64748b;">Amount</th>
                        <th style="padding: 12px; text-align: left; color: #64748b;">Actions</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    beneficiaries.forEach(b => {
        const statusClass = b.status === 'Active' ? 'green' : b.status === 'Pending' ? 'yellow' : 'red';
        tableHTML += `
            <tr class="beneficiary-row" data-name="${b.name.toLowerCase()}" data-program="${b.program.toLowerCase()}" style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 12px;">${b.id}</td>
                <td style="padding: 12px;"><strong>${b.name}</strong></td>
                <td style="padding: 12px;">${b.program}</td>
                <td style="padding: 12px;"><span class="${statusClass}" style="padding: 4px 10px; border-radius: 20px; font-size: 12px; background: ${b.status === 'Active' ? '#d1fae5' : '#fef3c7'}; color: ${b.status === 'Active' ? '#059669' : '#d97706'};">${b.status}</span></td>
                <td style="padding: 12px;">₱${b.amount.toLocaleString()}</td>
                <td style="padding: 12px;">
                    <button onclick="editBeneficiary('${b.id}')" style="padding: 6px 12px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; margin-right: 5px;">Edit</button>
                    <button onclick="deleteBeneficiary('${b.id}')" style="padding: 6px 12px; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;">Delete</button>
                </td>
            </tr>
        `;
    });
    
    tableHTML += `
                </tbody>
            </table>
        </div>
    `;
    
    card.innerHTML = tableHTML + card.innerHTML.split('<h3>Beneficiaries List</h3>')[1].split('<button')[0];
    card.querySelector('h3').textContent = 'Beneficiaries List';
    
    // Update button
    const addBtn = card.querySelector('button');
    addBtn.onclick = () => openModal('addBeneficiaryModal');
    addBtn.textContent = '+ Add New Beneficiary';
}

function createAddBeneficiaryModal() {
    const modal = document.createElement('div');
    modal.id = 'addBeneficiaryModal';
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;
    
    modal.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 15px; width: 450px; max-width: 90%;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="margin: 0;">Add New Beneficiary</h2>
                <button onclick="closeModal(document.getElementById('addBeneficiaryModal'))" style="background: none; border: none; font-size: 24px; cursor: pointer;">&times;</button>
            </div>
            <form id="addBeneficiaryForm">
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 500;">Full Name</label>
                    <input type="text" name="name" required style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 8px;">
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 500;">Program</label>
                    <select name="program" required style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 8px;">
                        <option value="">Select Program</option>
                        <option value="AICS">AICS</option>
                        <option value="SOLOPARENT">SOLOPARENT</option>
                    </select>
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 500;">Contact Number</label>
                    <input type="tel" name="contact" required style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 8px;">
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 500;">Address</label>
                    <textarea name="address" required style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 8px; min-height: 80px;"></textarea>
                </div>
                <button type="submit" style="width: 100%; padding: 12px; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px;">Add Beneficiary</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Form submission
    document.getElementById('addBeneficiaryForm').addEventListener('submit', function(e) {
        e.preventDefault();
        closeModal(document.getElementById('addBeneficiaryModal'));
        showToast('Beneficiary added successfully!');
        this.reset();
    });
}

function setupBeneficiarySearch() {
    const searchInput = document.querySelector('.search input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const term = e.target.value.toLowerCase();
            const rows = document.querySelectorAll('.beneficiary-row');
            rows.forEach(row => {
                const name = row.dataset.name;
                const program = row.dataset.program;
                row.style.display = (name.includes(term) || program.includes(term)) ? '' : 'none';
            });
        });
    }
}

// Global functions for table actions
window.editBeneficiary = function(id) {
    showToast(`Editing beneficiary ${id}...`);
};

window.deleteBeneficiary = function(id) {
    if (confirm('Are you sure you want to delete this beneficiary?')) {
        showToast(`Beneficiary ${id} deleted successfully`);
    }
};

/* ============================================
   ASSISTANCE REQUESTS PAGE
   ============================================ */

function initAssistancePage() {
    createRequestsTable();
    createBulkActions();
    createStatusTabs();
}

function createRequestsTable() {
    const card = document.querySelector('.card');
    
    const requests = [
        { id: 'REQ-001', applicant: 'Maria Santos', type: 'Medical', amount: 10000, status: 'Pending', date: '2024-01-15' },
        { id: 'REQ-002', applicant: 'John Doe', type: 'Burial', amount: 15000, status: 'Approved', date: '2024-01-14' },
        { id: 'REQ-003', applicant: 'Jane Rivera', type: 'Medical', amount: 8000, status: 'Rejected', date: '2024-01-14' },
        { id: 'REQ-004', applicant: 'Carlos Mendoza', type: 'Educational', amount: 5000, status: 'Pending', date: '2024-01-13' },
        { id: 'REQ-005', applicant: 'Ana Garcia', type: 'Medical', amount: 12000, status: 'Pending', date: '2024-01-13' },
    ];
    
    let tableHTML = `
        <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                <thead>
                    <tr style="background: #f8fafc; border-bottom: 2px solid #e5e7eb;">
                        <th style="padding: 12px; text-align: left;"><input type="checkbox" id="selectAll"></th>
                        <th style="padding: 12px; text-align: left; color: #64748b;">ID</th>
                        <th style="padding: 12px; text-align: left; color: #64748b;">Applicant</th>
                        <th style="padding: 12px; text-align: left; color: #64748b;">Type</th>
                        <th style="padding: 12px; text-align: left; color: #64748b;">Amount</th>
                        <th style="padding: 12px; text-align: left; color: #64748b;">Status</th>
                        <th style="padding: 12px; text-align: left; color: #64748b;">Date</th>
                        <th style="padding: 12px; text-align: left; color: #64748b;">Actions</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    requests.forEach(r => {
        const statusColors = {
            'Pending': { bg: '#fef3c7', color: '#d97706' },
            'Approved': { bg: '#d1fae5', color: '#059669' },
            'Rejected': { bg: '#fee2e2', color: '#dc2626' }
        };
        const colors = statusColors[r.status];
        
        tableHTML += `
            <tr class="request-row" data-status="${r.status.toLowerCase()}" style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 12px;"><input type="checkbox" class="request-checkbox" value="${r.id}"></td>
                <td style="padding: 12px;">${r.id}</td>
                <td style="padding: 12px;"><strong>${r.applicant}</strong></td>
                <td style="padding: 12px;">${r.type}</td>
                <td style="padding: 12px;">₱${r.amount.toLocaleString()}</td>
                <td style="padding: 12px;"><span style="padding: 4px 10px; border-radius: 20px; font-size: 12px; background: ${colors.bg}; color: ${colors.color};">${r.status}</span></td>
                <td style="padding: 12px;">${r.date}</td>
                <td style="padding: 12px;">
                    <button onclick="viewRequest('${r.id}')" style="padding: 6px 10px; background: #6b7280; color: white; border: none; border-radius: 6px; cursor: pointer; margin-right: 5px;">View</button>
                    ${r.status === 'Pending' ? `
                    <button onclick="quickApprove('${r.id}')" style="padding: 6px 10px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer; margin-right: 5px;">✓</button>
                    <button onclick="quickReject('${r.id}')" style="padding: 6px 10px; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;">✗</button>
                    ` : ''}
                </td>
            </tr>
        `;
    });
    
    tableHTML += `
                </tbody>
            </table>
        </div>
    `;
    
    // Keep existing content but add table
    const existingContent = card.innerHTML;
    card.innerHTML = existingContent + tableHTML;
    
    // Setup select all checkbox
    document.getElementById('selectAll').addEventListener('change', function() {
        document.querySelectorAll('.request-checkbox').forEach(cb => {
            cb.checked = this.checked;
        });
        updateBulkButtons();
    });
    
    // Individual checkbox change
    document.querySelectorAll('.request-checkbox').forEach(cb => {
        cb.addEventListener('change', updateBulkButtons);
    });
}

function createBulkActions() {
    const card = document.querySelector('.card');
    const actionsDiv = document.createElement('div');
    actionsDiv.id = 'bulkActions';
    actionsDiv.style.cssText = `
        margin-top: 15px;
        padding: 15px;
        background: #f8fafc;
        border-radius: 8px;
        display: none;
    `;
    actionsDiv.innerHTML = `
        <span style="margin-right: 15px;">Selected: <strong id="selectedCount">0</strong></span>
        <button onclick="bulkApprove()" style="padding: 8px 16px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer; margin-right: 10px;">✓ Approve Selected</button>
        <button onclick="bulkReject()" style="padding: 8px 16px; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;">✗ Reject Selected</button>
    `;
    card.appendChild(actionsDiv);
}

function createStatusTabs() {
    const card = document.querySelector('.card');
    const tabsDiv = document.createElement('div');
    tabsDiv.style.cssText = `
        margin-bottom: 15px;
        display: flex;
        gap: 10px;
    `;
    tabsDiv.innerHTML = `
        <button class="status-tab active" data-status="all" style="padding: 8px 16px; border: none; border-radius: 20px; cursor: pointer; background: #3b82f6; color: white;">All</button>
        <button class="status-tab" data-status="pending" style="padding: 8px 16px; border: 1px solid #e5e7eb; border-radius: 20px; cursor: pointer; background: white;">Pending</button>
        <button class="status-tab" data-status="approved" style="padding: 8px 16px; border: 1px solid #e5e7eb; border-radius: 20px; cursor: pointer; background: white;">Approved</button>
        <button class="status-tab" data-status="rejected" style="padding: 8px 16px; border: 1px solid #e5e7eb; border-radius: 20px; cursor: pointer; background: white;">Rejected</button>
    `;
    
    card.insertBefore(tabsDiv, card.querySelector('table'));
    
    // Tab click handlers
    document.querySelectorAll('.status-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.status-tab').forEach(t => {
                t.style.background = 'white';
                t.style.color = '#374151';
            });
            this.style.background = '#3b82f6';
            this.style.color = 'white';
            
            const status = this.dataset.status;
            filterByStatus(status);
        });
    });
}

function filterByStatus(status) {
    const rows = document.querySelectorAll('.request-row');
    rows.forEach(row => {
        if (status === 'all' || row.dataset.status === status) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function updateBulkButtons() {
    const checked = document.querySelectorAll('.request-checkbox:checked');
    const bulkActions = document.getElementById('bulkActions');
    const countSpan = document.getElementById('selectedCount');
    
    if (checked.length > 0) {
        bulkActions.style.display = 'block';
        countSpan.textContent = checked.length;
    } else {
        bulkActions.style.display = 'none';
    }
}

// Global functions
window.viewRequest = function(id) {
    showToast(`Viewing request ${id}`);
};

window.quickApprove = function(id) {
    if (confirm(`Approve request ${id}?`)) {
        showToast(`Request ${id} approved!`, 'success');
        setTimeout(() => location.reload(), 1000);
    }
};

window.quickReject = function(id) {
    if (confirm(`Reject request ${id}?`)) {
        showToast(`Request ${id} rejected`, 'error');
        setTimeout(() => location.reload(), 1000);
    }
};

window.bulkApprove = function() {
    const checked = document.querySelectorAll('.request-checkbox:checked');
    showToast(`${checked.length} requests approved!`, 'success');
    setTimeout(() => location.reload(), 1000);
};

window.bulkReject = function() {
    const checked = document.querySelectorAll('.request-checkbox:checked');
    showToast(`${checked.length} requests rejected`, 'error');
    setTimeout(() => location.reload(), 1000);
};

/* ============================================
   SOLOPARENT PROGRAM PAGE
   ============================================ */

function initSoloparentPage() {
    createSoloparentTable();
    createEnrollModal();
}

function createSoloparentTable() {
    const card = document.querySelector('.card');
    
    const beneficiaries = [
        { id: 'SOLO-001', name: 'Maria Santos', children: 2, benefit: 'Monthly Cash Grant', status: 'Active', joined: '2023-06-15' },
        { id: 'SOLO-002', name: 'John Doe', children: 1, benefit: 'Medical Assistance', status: 'Active', joined: '2023-08-20' },
        { id: 'SOLO-003', name: 'Jane Rivera', children: 3, benefit: 'Educational Support', status: 'Pending', joined: '2024-01-10' },
        { id: 'SOLO-004', name: 'Carlos Mendoza', children: 2, benefit: 'Monthly Cash Grant', status: 'Active', joined: '2023-03-05' },
    ];
    
    let tableHTML = `
        <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                <thead>
                    <tr style="background: #f8fafc; border-bottom: 2px solid #e5e7eb;">
                        <th style="padding: 12px; text-align: left; color: #64748b;">ID</th>
                        <th style="padding: 12px; text-align: left; color: #64748b;">Name</th>
                        <th style="padding: 12px; text-align: left; color: #64748b;">No. of Children</th>
                        <th style="padding: 12px; text-align: left; color: #64748b;">Benefit Type</th>
                        <th style="padding: 12px; text-align: left; color: #64748b;">Status</th>
                        <th style="padding: 12px; text-align: left; color: #64748b;">Date Joined</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    beneficiaries.forEach(b => {
        const statusColor = b.status === 'Active' ? '#10b981' : '#f59e0b';
        tableHTML += `
            <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 12px;">${b.id}</td>
                <td style="padding: 12px;"><strong>${b.name}</strong></td>
                <td style="padding: 12px;">${b.children}</td>
                <td style="padding: 12px;">${b.benefit}</td>
                <td style="padding: 12px;"><span style="padding: 4px 10px; border-radius: 20px; font-size: 12px; background: ${b.status === 'Active' ? '#d1fae5' : '#fef3c7'}; color: ${statusColor};">${b.status}</span></td>
                <td style="padding: 12px;">${b.joined}</td>
            </tr>
        `;
    });
    
    tableHTML += '</tbody></table></div>';
    
    card.innerHTML = '<h3>Enrolled Beneficiaries</h3>' + tableHTML + card.innerHTML.split('<button')[1];
    
    const btn = card.querySelector('button');
    btn.onclick = () => openModal('enrollModal');
}

function createEnrollModal() {
    const modal = document.createElement('div');
    modal.id = 'enrollModal';
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;
    
    modal.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 15px; width: 450px; max-width: 90%;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="margin: 0;">Enroll in SOLOPARENT Program</h2>
                <button onclick="closeModal(document.getElementById('enrollModal'))" style="background: none; border: none; font-size: 24px; cursor: pointer;">&times;</button>
            </div>
            <form id="enrollForm">
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 500;">Full Name</label>
                    <input type="text" name="name" required style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 8px;">
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 500;">Number of Children</label>
                    <input type="number" name="children" min="1" required style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 8px;">
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 500;">Benefit Type</label>
                    <select name="benefit" required style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 8px;">
                        <option value="">Select Benefit</option>
                        <option value="cash">Monthly Cash Grant</option>
                        <option value="medical">Medical Assistance</option>
                        <option value="educational">Educational Support</option>
                    </select>
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 500;">ID Number (Solo Parent ID)</label>
                    <input type="text" name="idNumber" required style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 8px;">
                </div>
                <button type="submit" style="width: 100%; padding: 12px; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px;">Enroll Beneficiary</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    document.getElementById('enrollForm').addEventListener('submit', function(e) {
        e.preventDefault();
        closeModal(document.getElementById('enrollModal'));
        showToast('Beneficiary enrolled successfully!');
        this.reset();
    });
}

/* ============================================
   AICS PROGRAM PAGE
   ============================================ */

function initAicsPage() {
    createAicsTable();
    createAssistanceModal();
}

function createAicsTable() {
    const card = document.querySelector('.card');
    
    const assistance = [
        { id: 'AICS-001', beneficiary: 'Maria Santos', crisis: 'Medical Emergency', amount: 15000, date: '2024-01-15', status: 'Released' },
        { id: 'AICS-002', beneficiary: 'John Doe', crisis: 'Fire Incident', amount: 25000, date: '2024-01-14', status: 'Released' },
        { id: 'AICS-003', beneficiary: 'Jane Rivera', crisis: 'Medical Emergency', amount: 10000, date: '2024-01-13', status: 'Processing' },
        { id: 'AICS-004', beneficiary: 'Carlos Mendoza', crisis: 'Burial Assistance', amount: 8000, date: '2024-01-12', status: 'Released' },
    ];
    
    let tableHTML = `
        <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                <thead>
                    <tr style="background: #f8fafc; border-bottom: 2px solid #e5e7eb;">
                        <th style="padding: 12px; text-align: left; color: #64748b;">ID</th>
                        <th style="padding: 12px; text-align: left; color: #64748b;">Beneficiary</th>
                        <th style="padding: 12px; text-align: left; color: #64748b;">Crisis Type</th>
                        <th style="padding: 12px; text-align: left; color: #64748b;">Amount</th>
                        <th style="padding: 12px; text-align: left; color: #64748b;">Date</th>
                        <th style="padding: 12px; text-align: left; color: #64748b;">Status</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    assistance.forEach(a => {
        const statusColors = {
            'Released': { bg: '#d1fae5', color: '#059669' },
            'Processing': { bg: '#fef3c7', color: '#d97706' }
        };
        const colors = statusColors[a.status];
        
        tableHTML += `
            <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 12px;">${a.id}</td>
                <td style="padding: 12px;"><strong>${a.beneficiary}</strong></td>
                <td style="padding: 12px;">${a.crisis}</td>
                <td style="padding: 12px;">₱${a.amount.toLocaleString()}</td>
                <td style="padding: 12px;">${a.date}</td>
                <td style="padding: 12px;"><span style="padding: 4px 10px; border-radius: 20px; font-size: 12px; background: ${colors.bg}; color: ${colors.color};">${a.status}</span></td>
            </tr>
        `;
    });
    
    tableHTML += '</tbody></table></div>';
    
    card.innerHTML = '<h3>Assistance Records</h3>' + tableHTML + card.innerHTML.split('<button')[1];
    
    const btn = card.querySelector('button');
    btn.onclick = () => openModal('assistanceModal');
}

function createAssistanceModal() {
    const modal = document.createElement('div');
    modal.id = 'assistanceModal';
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;
    
    modal.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 15px; width: 450px; max-width: 90%;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="margin: 0;">Provide AICS Assistance</h2>
                <button onclick="closeModal(document.getElementById('assistanceModal'))" style="background: none; border: none; font-size: 24px; cursor: pointer;">&times;</button>
            </div>
            <form id="assistanceForm">
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 500;">Beneficiary Name</label>
                    <input type="text" name="name" required style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 8px;">
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 500;">Crisis Type</label>
                    <select name="crisis" required style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 8px;">
                        <option value="">Select Crisis Type</option>
                        <option value="medical">Medical Emergency</option>
                        <option value="fire">Fire Incident</option>
                        <option value="burial">Burial Assistance</option>
                        <option value="displacement">Natural Disaster</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 500;">Assistance Amount (₱)</label>
                    <input type="number" name="amount" min="1" required style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 8px;">
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 500;">Date of Incident</label>
                    <input type="date" name="incidentDate" required style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 8px;">
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 500;">Remarks</label>
                    <textarea name="remarks" style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 8px; min-height: 80px;"></textarea>
                </div>
                <button type="submit" style="width: 100%; padding: 12px; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px;">Process Assistance</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    document.getElementById('assistanceForm').addEventListener('submit', function(e) {
        e.preventDefault();
        closeModal(document.getElementById('assistanceModal'));
        showToast('Assistance processed successfully!');
        this.reset();
    });
}

/* ============================================
   ADD CSS ANIMATIONS
   ============================================ */

// Add shake animation for login errors
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    
    .shake {
        animation: shake 0.5s ease;
    }
    
    .yellow {
        color: #d97706 !important;
    }
`;
document.head.appendChild(style);
