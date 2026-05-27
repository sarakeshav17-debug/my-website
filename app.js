// ===== EMPLOYEE DATA =====
const employees = [
  { id:1,  first:"John",    last:"Doe",       address:"120 Elm Street",       mobile:"955-1234", email:"john.doe@example.com",       dept:"Sales",         desig:"Manager",           status:"active",   updated:"2024-09-03 12:49PM" },
  { id:2,  first:"Jane",    last:"Smith",     address:"455 Oak Avenue",       mobile:"955-5678", email:"jane.smith@example.com",     dept:"Marketing",     desig:"Director",          status:"inactive", updated:"2024-09-03 01:30PM" },
  { id:3,  first:"Alice",   last:"Johnson",   address:"780 Pine Road",        mobile:"955-6789", email:"alice.johnson@example.com",  dept:"HR",            desig:"Coordinator",       status:"active",   updated:"2024-09-03 01:55PM" },
  { id:4,  first:"Bob",     last:"Brown",     address:"32 Maple Lane",        mobile:"955-2345", email:"bob.brown@example.com",      dept:"IT",            desig:"Technician",        status:"active",   updated:"2024-09-03 02:00PM" },
  { id:5,  first:"Charlie", last:"Davis",     address:"954 Birch Boulevard",  mobile:"955-3456", email:"charlie.davis@example.com",  dept:"Finance",       desig:"Analyst",           status:"active",   updated:"2024-09-03 02:05PM" },
  { id:6,  first:"Eve",     last:"Miller",    address:"887 Cedar Street",     mobile:"955-4567", email:"eve.miller@example.com",     dept:"Operations",    desig:"Supervisor",        status:"active",   updated:"2024-09-03 03:50PM" },
  { id:7,  first:"Frank",   last:"Wilson",    address:"321 Spruce Way",       mobile:"955-5678", email:"frank.wilson@example.com",   dept:"Legal",         desig:"Consultant",        status:"draft",    updated:"2024-09-03 03:45PM" },
  { id:8,  first:"Grace",   last:"Lee",       address:"654 Palm Drive",       mobile:"955-6709", email:"grace.lee@example.com",      dept:"Engineering",   desig:"Developer",         status:"active",   updated:"2024-09-03 03:50PM" },
  { id:9,  first:"Henry",   last:"Taylor",    address:"887 Fir Road",         mobile:"955-1980", email:"henry.taylor@example.com",   dept:"RD",            desig:"Scientist",         status:"active",   updated:"2024-09-03 04:00PM" },
  { id:10, first:"Isabel",  last:"Anderson",  address:"123 Aspen Court",      mobile:"955-8401", email:"isabel.anderson@example.com",dept:"Customer",      desig:"Agent",             status:"inactive", updated:"2024-09-03 04:36PM" },
  { id:11, first:"Jack",    last:"Thomas",    address:"456 Cypress Avenue",   mobile:"955-9132", email:"jack.thomas@example.com",    dept:"Quality",       desig:"Inspector",         status:"active",   updated:"2024-09-03 04:40PM" },
  { id:12, first:"Karen",   last:"Jackson",   address:"789 Redwood Road",     mobile:"955-0113", email:"karen.jackson@example.com",  dept:"Logistics",     desig:"Coordinator",       status:"active",   updated:"2024-09-03 05:55PM" },
  { id:13, first:"Leo",     last:"Harris",    address:"321 Willow Street",    mobile:"955-2200", email:"leo.harris@example.com",     dept:"Sales",         desig:"Representative",    status:"active",   updated:"2024-09-03 06:10PM" },
  { id:14, first:"Mia",     last:"Martin",    address:"654 Magnolia Lane",    mobile:"955-3311", email:"mia.martin@example.com",     dept:"Marketing",     desig:"Specialist",        status:"active",   updated:"2024-09-03 06:20PM" },
  { id:15, first:"Nathan",  last:"Garcia",    address:"987 Chestnut Blvd",    mobile:"955-4422", email:"nathan.garcia@example.com",  dept:"IT",            desig:"Engineer",          status:"active",   updated:"2024-09-03 06:30PM" },
  { id:16, first:"Olivia",  last:"Martinez",  address:"741 Walnut Court",     mobile:"955-5533", email:"olivia.martinez@example.com",dept:"HR",            desig:"Manager",           status:"active",   updated:"2024-09-03 06:45PM" },
];

// ===== STATE =====
let currentTab    = 'active';
let currentPage   = 1;
const rowsPerPage = 8;

// ===== DEPT CLASS MAP =====
const deptClass = {
  "Sales":       "dept-Sales",
  "Marketing":   "dept-Marketing",
  "HR":          "dept-HR",
  "IT":          "dept-IT",
  "Finance":     "dept-Finance",
  "Operations":  "dept-Operations",
  "Legal":       "dept-Legal",
  "Engineering": "dept-Engineering",
  "RD":          "dept-RD",
  "Customer":    "dept-Customer",
  "Quality":     "dept-Quality",
  "Logistics":   "dept-Logistics",
};

// ===== FILTER BY TAB =====
function getFilteredData() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  let data = employees;

  if (currentTab === 'active')   data = data.filter(e => e.status === 'active');
  if (currentTab === 'inactive') data = data.filter(e => e.status === 'inactive');
  if (currentTab === 'drafts')   data = data.filter(e => e.status === 'draft');
  if (currentTab === 'deleted')  data = [];

  if (search) {
    data = data.filter(e =>
      e.first.toLowerCase().includes(search) ||
      e.last.toLowerCase().includes(search) ||
      e.email.toLowerCase().includes(search) ||
      e.dept.toLowerCase().includes(search) ||
      e.desig.toLowerCase().includes(search)
    );
  }
  return data;
}

// ===== RENDER TABLE =====
function renderTable() {
  const data    = getFilteredData();
  const total   = data.length;
  const pages   = Math.ceil(total / rowsPerPage);
  currentPage   = Math.min(currentPage, pages || 1);
  const start   = (currentPage - 1) * rowsPerPage;
  const pageData = data.slice(start, start + rowsPerPage);

  const tbody = document.getElementById('tableBody');

  if (pageData.length === 0) {
    tbody.innerHTML = `
      <tr><td colspan="8">
        <div class="no-results">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="40" height="40">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <p>No employees found</p>
        </div>
      </td></tr>`;
  } else {
    tbody.innerHTML = pageData.map((e, i) => {
      const dotClass = e.status === 'active' ? 'dot-active' : e.status === 'inactive' ? 'dot-inactive' : 'dot-draft';
      const dc = deptClass[e.dept] || 'dept-Sales';
      return `
        <tr style="animation-delay:${i * 0.04}s">
          <td class="name">${e.first}</td>
          <td>${e.last}</td>
          <td>${e.address}</td>
          <td>${e.mobile}</td>
          <td style="color:#3b82f6">${e.email}</td>
          <td><span class="dept-chip ${dc}">${e.dept}</span></td>
          <td>${e.desig}</td>
          <td>
            <div class="updated-cell">
              <span class="status-dot ${dotClass}"></span>
              ${e.updated}
            </div>
          </td>
        </tr>`;
    }).join('');
  }

  // Count
  document.getElementById('rowCount').textContent =
    total === 0 ? 'No employees' :
    `Showing ${start + 1}–${Math.min(start + rowsPerPage, total)} of ${total} employee${total !== 1 ? 's' : ''}`;

  renderPagination(pages);
}

// ===== RENDER PAGINATION =====
function renderPagination(totalPages) {
  const pg = document.getElementById('pagination');
  if (totalPages <= 1) { pg.innerHTML = ''; return; }

  let html = `<button class="page-btn" onclick="goPage(${currentPage - 1})" ${currentPage===1?'disabled':''}>‹</button>`;
  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="goPage(${i})">${i}</button>`;
  }
  html += `<button class="page-btn" onclick="goPage(${currentPage + 1})" ${currentPage===totalPages?'disabled':''}>›</button>`;
  pg.innerHTML = html;
}

// ===== GO TO PAGE =====
function goPage(n) {
  const data   = getFilteredData();
  const pages  = Math.ceil(data.length / rowsPerPage);
  if (n < 1 || n > pages) return;
  currentPage = n;
  renderTable();
}

// ===== SWITCH TAB =====
function switchTab(btn, tab) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  currentTab  = tab;
  currentPage = 1;
  renderTable();
}

// ===== FILTER TABLE (SEARCH) =====
function filterTable() {
  currentPage = 1;
  renderTable();
}

// ===== INIT =====
renderTable();