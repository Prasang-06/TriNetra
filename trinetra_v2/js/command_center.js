/* ==========================================================================
   TRINETRA COMMAND CENTER — RAILWAY SECURITY OPERATIONS ENGINE
   Architecture: Location-First | Railway Schematic | Unified Event Chain
   TWO PLATFORMS. ONE INTELLIGENCE.
   ========================================================================== */

'use strict';

// ============================================================
// SYSTEM STATE
// ============================================================
const STATE = {
  dept: 'field_ops',
  officer: null,
  activePane: 'home',
  activeStation: 'nagpur',
  cctvAnimFrame: null,
  radarPhase: 0,
  enosePhase: 0,
};

// ============================================================
// DEPARTMENTS & RBAC NAV
// ============================================================
const DEPARTMENTS = {
  field_ops: {
    id: 'field_ops', label: 'Field Operations',
    desc: 'Frontline screening officer — assigned alerts, verification workflow, and SOP guidance',
    defaultPane: 'home',
    nav: [
      { group: 'OPERATIONS', items: [
        { pane: 'home',        icon: '⊞', label: 'Command Center' },
        { pane: 'assignments', icon: '✓', label: 'My Cases' },
        { pane: 'screenings',  icon: '≡', label: 'Screenings' },
        { pane: 'station',     icon: '⊘', label: 'Station Map' },
        { pane: 'alerts',      icon: '⚑', label: 'Alerts', badge: 'alerts' },
      ]},
    ],
  },
  technical: {
    id: 'technical', label: 'Technical & Engineering',
    desc: 'Sensor telemetry, edge compute diagnostics, and AI/ML model inference health',
    defaultPane: 'home',
    nav: [
      { group: 'ENGINEERING', items: [
        { pane: 'home',        icon: '⚙', label: 'System Overview' },
        { pane: 'devices',     icon: '⊡', label: 'Devices' },
        { pane: 'diagnostics', icon: '∿', label: 'Sensors' },
        { pane: 'aiml',        icon: '⊹', label: 'AI / ML' },
        { pane: 'audit',       icon: '≡', label: 'Logs' },
      ]},
    ],
  },
  operations: {
    id: 'operations', label: 'Operations & Control',
    desc: 'Divisional incident management, officer dispatch, and case workflow control',
    defaultPane: 'home',
    nav: [
      { group: 'CONTROL ROOM', items: [
        { pane: 'home',     icon: '⊛', label: 'Command Center' },
        { pane: 'alerts',   icon: '⚑', label: 'Live Events', badge: 'alerts' },
        { pane: 'cases',    icon: '⊟', label: 'Cases',       badge: 'cases' },
        { pane: 'officers', icon: '⊙', label: 'Personnel' },
        { pane: 'devices',  icon: '⊡', label: 'Devices' },
        { pane: 'station',  icon: '⊘', label: 'Station Map' },
      ]},
    ],
  },
  administration: {
    id: 'administration', label: 'Railway Administration',
    desc: 'Zonal KPI oversight, divisional reporting, and compliance audit ledger',
    defaultPane: 'home',
    nav: [
      { group: 'ZONAL HQ', items: [
        { pane: 'home',    icon: '⊜', label: 'Network' },
        { pane: 'station', icon: '⊘', label: 'Stations' },
        { pane: 'devices', icon: '⊡', label: 'Devices' },
        { pane: 'cases',   icon: '⊟', label: 'Cases' },
        { pane: 'audit',   icon: '≡', label: 'Reports' },
      ]},
    ],
  },
  executive: {
    id: 'executive', label: 'Executive Command',
    desc: 'Strategic railway safety readiness, high-severity incident oversight',
    defaultPane: 'home',
    nav: [
      { group: 'EXECUTIVE', items: [
        { pane: 'home',    icon: '⊗', label: 'Overview' },
        { pane: 'station', icon: '⊘', label: 'Network' },
        { pane: 'cases',   icon: '⊟', label: 'Performance' },
        { pane: 'audit',   icon: '≡', label: 'Reports' },
      ]},
    ],
  },
  sys_admin: {
    id: 'sys_admin', label: 'System Administration',
    desc: 'User management, RBAC, device registry, and tamper-proof audit trail',
    defaultPane: 'home',
    nav: [
      { group: 'ADMINISTRATION', items: [
        { pane: 'officers', icon: '⊙', label: 'Users & Roles' },
        { pane: 'devices',  icon: '⊡', label: 'Device Registry' },
        { pane: 'audit',    icon: '≡', label: 'Audit Log' },
        { pane: 'home',     icon: '⊂', label: 'System' },
      ]},
    ],
  },
};

// ============================================================
// DEMO OFFICER ACCOUNTS
// ============================================================
const DEMO_ACCOUNTS = {
  field_ops: {
    id: 'RPF-04217', name: 'Rahul Sharma', rank: 'Assistant Sub-Inspector',
    dept: 'field_ops', deptLabel: 'Field Operations',
    station: 'Nagpur Junction · Platform 3', authLevel: 'LEVEL 2',
    avatar: '👮', demo: true,
  },
  technical: {
    id: 'SYS-084', name: 'Dr. S. K. Mehta', rank: 'Sr. Systems & Sensor Engineer',
    dept: 'technical', deptLabel: 'Technical & Engineering',
    station: 'Sensor Lab · Nagpur', authLevel: 'LEVEL 3',
    avatar: '⚙️', demo: true,
  },
  operations: {
    id: 'RPF-0102', name: 'A. K. Joshi', rank: 'Divisional Security Commissioner',
    dept: 'operations', deptLabel: 'Operations & Control',
    station: 'Control Room · Nagpur Division', authLevel: 'LEVEL 4',
    avatar: '👔', demo: true,
  },
  administration: {
    id: 'CR-004', name: 'V. R. Nair', rank: 'Principal Chief Security Commissioner',
    dept: 'administration', deptLabel: 'Railway Administration',
    station: 'Zonal HQ · Mumbai CSMT', authLevel: 'LEVEL 5',
    avatar: '🏛️', demo: true,
  },
  executive: {
    id: 'DG-001', name: 'K. P. Sharma', rank: 'Director General, RPF',
    dept: 'executive', deptLabel: 'Executive Command',
    station: 'Rail Bhavan · New Delhi', authLevel: 'LEVEL 5',
    avatar: '🇮🇳', demo: true,
  },
  sys_admin: {
    id: 'SYS-ADM-01', name: 'IT System Admin', rank: 'Security & Systems Admin',
    dept: 'sys_admin', deptLabel: 'System Administration',
    station: 'Central IT Division', authLevel: 'LEVEL 5',
    avatar: '🔧', demo: true,
  },
};

// ============================================================
// STATIONS DATA
// ============================================================
const STATIONS = {
  nagpur: {
    id: 'nagpur', name: 'NAGPUR JUNCTION', division: 'Nagpur Division · Central Railway',
    status: 'NORMAL OPERATIONS',
    activeDevices: 6, handhelds: 3, quadrupeds: 2, cctvCount: 8,
    screeningsToday: 2842, openCases: 3, requiresVerification: 1, offlineDevices: 1,
    lastSync: '4 sec ago',
  },
  mumbai: {
    id: 'mumbai', name: 'MUMBAI CSMT', division: 'Mumbai Division · Central Railway',
    status: 'ELEVATED MONITORING',
    activeDevices: 12, handhelds: 8, quadrupeds: 4, cctvCount: 24,
    screeningsToday: 6410, openCases: 5, requiresVerification: 2, offlineDevices: 0,
    lastSync: '2 sec ago',
  },
  delhi: {
    id: 'delhi', name: 'NEW DELHI JUNCTION', division: 'Delhi Division · Northern Railway',
    status: 'NORMAL OPERATIONS',
    activeDevices: 10, handhelds: 6, quadrupeds: 4, cctvCount: 32,
    screeningsToday: 5120, openCases: 2, requiresVerification: 0, offlineDevices: 1,
    lastSync: '6 sec ago',
  },
};

// ============================================================
// LIVE SECURITY EVENTS & CASES
// ============================================================
let EVENTS_FEED = [
  { id:'TRN-2026-001284', time:'20:42:11', location:'Platform 3 — Nagpur Junction', device:'TRN-HND-001', type:'Requires Verification', status:'check', officer:'RPF-04217 (Rahul Sharma)' },
  { id:'TRN-2026-001278', time:'20:14:00', location:'Outer Signal Bridge Tunnel', device:'TRN-QDR-003', type:'High Alert', status:'alert', officer:'RPF QRT-2 (RPF-0102)' },
  { id:'TRN-2026-001270', time:'19:58:33', location:'Platform 2 — Mumbai CSMT', device:'TRN-HND-011', type:'Requires Verification', status:'check', officer:'Insp. P. Shinde' },
  { id:'TRN-2026-001265', time:'19:35:10', location:'Concourse Gate A — Nagpur', device:'TRN-HND-002', type:'Clear', status:'clear', officer:'Const. P. Verma' },
  { id:'TRN-2026-001258', time:'19:12:44', location:'Platform 1 — Nagpur Junction', device:'TRN-HND-001', type:'Clear', status:'clear', officer:'RPF-04217 (Rahul Sharma)' },
];

let CASES = [
  { caseId:'CASE-2026-001284', eventId:'TRN-2026-001284', time:'20:42:11 IST', result:'REQUIRES VERIFICATION', location:'Platform 3 — Nagpur Junction', device:'TRN-HND-001', officer:'ASI Rahul Sharma', status:'awaiting', statusLabel:'Awaiting Verification', notes:'Multimodal radar deviation + E-Nose VOC delta. Baggage directed to secondary table.' },
  { caseId:'CASE-2026-001278', eventId:'TRN-2026-001278', time:'20:14:00 IST', result:'HIGH ALERT', location:'Outer Signal Bridge Tunnel', device:'TRN-QDR-003', officer:'RPF QRT-2', status:'progress', statusLabel:'Verification In Progress', notes:'Quadruped detected trackside anomaly. 50m standoff cordon active.' },
  { caseId:'CASE-2026-001270', eventId:'TRN-2026-001270', time:'19:58:33 IST', result:'REQUIRES VERIFICATION', location:'Platform 2 — Mumbai CSMT', device:'TRN-HND-011', officer:'Insp. P. Shinde', status:'awaiting', statusLabel:'Awaiting Verification', notes:'Carry-on luggage density anomaly. Secondary check underway.' },
  { caseId:'CASE-2026-001250', eventId:'TRN-2026-001250', time:'18:20:00 IST', result:'VERIFIED — CLEAR', location:'Platform 4 — Nagpur Junction', device:'TRN-HND-002', officer:'Insp. R. Kumar', status:'closed', statusLabel:'Closed', notes:'Secondary physical check complete. Organic fertilizer trace confirmed. Cleared.' },
];

// Unified Security Event Registry
const EVENT_REGISTRY = {
  'TRN-2026-001284': {
    id: 'TRN-2026-001284', time: '20:42:11 IST',
    location: 'Platform 3 — Nagpur Junction', device: 'TRN-HND-001 (Handheld Platform)',
    officer: 'ASI Rahul Sharma (RPF-04217)',
    result: 'REQUIRES VERIFICATION', resultClass: 'check',
    why: [
      'mmWave Radar: Dielectric bulk deviation (+18.4 dB peak reflection at 14.2 cm depth).',
      'E-Nose Array: Elevated VOC delta on MQ-135 channel (840 PPM, 26× ambient air baseline).',
      'AI/ML Fusion: Dual-modality confidence score 0.942 on Trinetra-Fusion-v2.4 INT8 model.',
    ],
    recommendation: 'Direct passenger to secondary inspection table under active CCTV coverage. RPF officer to conduct physical baggage check per SOP-RPF-12B.',
    disclaimer: 'TRINETRA provides preliminary operational screening decision support. This is NOT a certified chemical laboratory determination.',
    chain: [
      { time: '20:41:52', source: 'CCTV — CAM-04 (Platform 3)', desc: 'Person and baggage detected entering Platform 3 screening lane.' },
      { time: '20:42:03', source: 'TRINETRA HANDHELD (TRN-HND-001)', desc: 'Screening initiated by operator ASI Rahul Sharma.' },
      { time: '20:42:06', source: 'mmWave RADAR (60 GHz)', desc: 'Spatial bulk reflection recorded: +18.4 dB at 14.2 cm depth.' },
      { time: '20:42:08', source: 'E-NOSE SENSOR ARRAY', desc: 'Gas sensor response: VOC 840 PPM delta spike above ambient baseline.', class: 'check' },
      { time: '20:42:10', source: 'AI / ML EDGE INFERENCE', desc: 'Trinetra-Fusion-v2.4 model inference in 41.2 ms. Confidence: 0.942.', class: 'check' },
      { time: '20:42:11', source: 'TRINETRA CORE', desc: 'Decision flag issued: REQUIRES VERIFICATION. Notification pushed to Control Room.', class: 'check' },
      { time: '20:43:02', source: 'RPF OFFICER (RPF-04217)', desc: 'Physical verification initiated per SOP-RPF-12B.' },
    ],
  },
  'TRN-2026-001278': {
    id: 'TRN-2026-001278', time: '20:14:00 IST',
    location: 'Outer Signal Bridge Tunnel — Nagpur Perimeter', device: 'TRN-QDR-003 (Quadruped Platform)',
    officer: 'RPF Quick Response Team 2',
    result: 'HIGH ALERT', resultClass: 'alert',
    why: [
      'Quadruped LiDAR & Vision: Unattended metallic container identified in ballast cavity.',
      'Thermal Imaging: Surface temperature anomaly +4.2°C above ambient rail temperature.',
      'E-Nose Pneumatic Snout: Elevated organic vapor gradient above clean-air baseline.',
    ],
    recommendation: 'Establish minimum 50m standoff cordon. Deploy RPF QRT. Do NOT approach without Bomb Disposal Squad authority.',
    disclaimer: 'TRINETRA provides preliminary operational screening decision support. This is NOT a certified chemical laboratory determination.',
    chain: [
      { time: '20:12:10', source: 'QUADRUPED ROBOT (TRN-QDR-003)', desc: 'Autonomous trackside patrol flagged unattended container in ballast.' },
      { time: '20:13:10', source: 'THERMAL CAMERA', desc: 'Surface thermal gradient confirmed (+4.2°C).' },
      { time: '20:13:20', source: 'E-NOSE PNEUMATIC SNOUT', desc: 'Elevated organic vapor gradient recorded.', class: 'alert' },
      { time: '20:13:45', source: 'AI / ML EDGE ENGINE', desc: 'High-anomaly classifier confidence 0.981.', class: 'alert' },
      { time: '20:14:00', source: 'TRINETRA CORE', desc: 'HIGH ALERT broadcast. Divisional cordon protocol activated.', class: 'alert' },
    ],
  },
};

// Device Fleet Registry
const DEVICES = [
  { id:'TRN-HND-001', type:'handheld', station:'nagpur', location:'Platform 3 — Nagpur', status:'online', battery:84, firmware:'v2.4.1-edge', officer:'ASI Rahul Sharma', temp:'42°C' },
  { id:'TRN-HND-002', type:'handheld', station:'nagpur', location:'Platform 1 — Nagpur', status:'online', battery:76, firmware:'v2.4.1-edge', officer:'Const. P. Verma', temp:'43°C' },
  { id:'TRN-HND-003', type:'handheld', station:'nagpur', location:'Concourse Security Gate A', status:'online', battery:82, firmware:'v2.4.1-edge', officer:'ASI K. Rao', temp:'41°C' },
  { id:'TRN-QDR-002', type:'quadruped', station:'nagpur', location:'Service & Yard Sector C', status:'online', battery:71, firmware:'v2.4.2-robot', officer:'Autonomous Patrol', temp:'45°C' },
  { id:'TRN-QDR-003', type:'quadruped', station:'nagpur', location:'Outer Signal Bridge Tunnel', status:'alert', battery:85, firmware:'v2.4.2-robot', officer:'Cordon Lock Mode', temp:'46°C' },
  { id:'TRN-QDR-005', type:'quadruped', station:'nagpur', location:'Maintenance Depot Line 4', status:'offline', battery:14, firmware:'v2.4.0-robot', officer:'Charging Dock', temp:'Standby' },
];

// Personnel List
const PERSONNEL = [
  { id:'RPF-04217', name:'Rahul Sharma', rank:'Assistant Sub-Inspector', dept:'Field Operations', duty:'Platform 3 Screening', station:'Nagpur', status:'ACTIVE', cases:1 },
  { id:'RPF-08819', name:'Rajesh Kumar', rank:'Inspector', dept:'Field Operations', duty:'Platform 2 Triage', station:'Nagpur', status:'ACTIVE', cases:0 },
  { id:'RPF-03314', name:'P. Verma', rank:'Constable', dept:'Field Operations', duty:'Concourse Gate A', station:'Nagpur', status:'ACTIVE', cases:0 },
  { id:'SYS-084', name:'Dr. S. K. Mehta', rank:'Sr. Systems Engineer', dept:'Technical', duty:'Sensor Calibration', station:'Nagpur', status:'ACTIVE', cases:0 },
  { id:'RPF-0102', name:'A. K. Joshi', rank:'Div. Commissioner', dept:'Operations', duty:'Control Room Supervisor', station:'Nagpur', status:'ACTIVE', cases:2 },
];

// Audit Ledger
let AUDIT_LOG = [
  { time:'20:43:02 IST', user:'RPF-04217 (Rahul Sharma)', action:'Initiated physical secondary check on Case CASE-2026-001284', device:'TRN-HND-001', location:'Platform 3 — Nagpur' },
  { time:'20:42:11 IST', user:'TRINETRA-CORE', action:'Screening result: REQUIRES VERIFICATION — TRN-2026-001284 issued', device:'TRN-HND-001', location:'Platform 3 — Nagpur' },
  { time:'20:30:15 IST', user:'RPF-0102 (A. K. Joshi)', action:'Assigned case CASE-2026-001284 to ASI Rahul Sharma', device:'CONTROL-TERMINAL', location:'Divisional Control Room' },
  { time:'20:14:00 IST', user:'TRINETRA-CORE', action:'HIGH ALERT broadcast on TRN-2026-001278 (Outer Signal Tunnel)', device:'TRN-QDR-003', location:'Outer Signal Bridge' },
  { time:'19:40:00 IST', user:'SYS-084 (Dr. S. K. Mehta)', action:'Diagnostic routine: 60 GHz mmWave + BME688 baseline recalibrated', device:'TRN-HND-001', location:'Sensor Lab, Nagpur' },
];

// ============================================================
// INITIALIZATION
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initStationSchematic();
  openAuthOverlay();

  // Topbar station select listener
  const stationSel = document.getElementById('station-select');
  if (stationSel) {
    stationSel.addEventListener('change', (e) => setStation(e.target.value));
  }

  // Topbar department select listener
  const deptSel = document.getElementById('dept-select');
  if (deptSel) {
    deptSel.addEventListener('change', (e) => quickLogin(e.target.value));
  }

  // Keyboard shortcut (Escape to close mobile sidebar)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSidebar();
  });
});

// Mobile Sidebar Toggle Handlers
function toggleSidebar() {
  const sidebar = document.getElementById('cc-sidebar');
  const backdrop = document.getElementById('cc-sidebar-backdrop');
  if (sidebar && backdrop) {
    const isOpen = sidebar.classList.contains('open');
    if (isOpen) {
      closeSidebar();
    } else {
      sidebar.classList.add('open');
      backdrop.classList.add('active');
    }
  }
}

function closeSidebar() {
  const sidebar = document.getElementById('cc-sidebar');
  const backdrop = document.getElementById('cc-sidebar-backdrop');
  if (sidebar) sidebar.classList.remove('open');
  if (backdrop) backdrop.classList.remove('active');
}

// Live IST Clock
function initClock() {
  function tick() {
    const now = new Date();
    const str = now.toLocaleTimeString('en-IN', { timeZone:'Asia/Kolkata', hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false }) + ' IST';
    const el = document.getElementById('topbar-clock');
    if (el) el.textContent = str;
  }
  tick();
  setInterval(tick, 1000);
}

// ============================================================
// AUTHENTICATION & SESSION MANAGEMENT
// ============================================================
let selectedDept = 'field_ops';

function openAuthOverlay() {
  const overlay = document.getElementById('auth-overlay');
  if (overlay) overlay.classList.add('open');
  selectDept(selectedDept || 'field_ops');
}

function selectDept(deptId) {
  selectedDept = deptId;
  document.querySelectorAll('.dept-btn').forEach(b => b.classList.remove('selected'));
  const btn = document.getElementById('dept-btn-' + deptId);
  if (btn) btn.classList.add('selected');

  const acc = DEMO_ACCOUNTS[deptId];
  if (acc) {
    const idInput = document.getElementById('login-id');
    if (idInput) idInput.value = acc.id;

    // Update Right Column Identity Card
    const av = document.getElementById('aop-avatar'); if (av) av.textContent = acc.avatar;
    const nm = document.getElementById('aop-name'); if (nm) nm.textContent = acc.name;
    const ro = document.getElementById('aop-role'); if (ro) ro.textContent = `${acc.rank} · ${acc.deptLabel}`;
    const idBadge = document.getElementById('aop-id'); if (idBadge) idBadge.textContent = `ID: ${acc.id}`;
    const stBadge = document.getElementById('aop-station'); if (stBadge) stBadge.textContent = acc.station;
    const lvBadge = document.getElementById('aop-level'); if (lvBadge) lvBadge.textContent = acc.authLevel;

    const btnText = document.getElementById('btn-signin-text');
    if (btnText) btnText.textContent = `AUTHENTICATE & ENTER (${acc.name.toUpperCase()})`;
  }
}

function handleLogin(e) {
  if (e) e.preventDefault();
  const deptId = selectedDept || 'field_ops';
  const acc = DEMO_ACCOUNTS[deptId];
  if (acc) {
    setSession(acc);
  } else {
    setSession({ id: 'RPF-04217', name: 'Duty Officer', rank: 'ASI', dept: deptId, deptLabel: DEPARTMENTS[deptId]?.label || deptId, station: 'Nagpur Junction', authLevel: 'LEVEL 2', avatar: '👮', demo: false });
  }
}

function quickLogin(deptId) {
  selectedDept = deptId;
  const acc = DEMO_ACCOUNTS[deptId];
  if (acc) {
    setSession(acc);
  }
}

function setSession(officer) {
  STATE.dept = officer.dept;
  STATE.officer = officer;

  const overlay = document.getElementById('auth-overlay');
  if (overlay) overlay.classList.remove('open');

  buildNav();
  renderOfficerCard();
  updateTopbars();
  switchPane('home');
  startCctvLoop();
}

function updateTopbars() {
  const deptSel = document.getElementById('dept-select');
  if (deptSel) deptSel.value = STATE.dept;
}

function logout() {
  cancelAnimationFrame(STATE.cctvAnimFrame || 0);
  STATE.officer = null;
  selectedDept = 'field_ops';
  openAuthOverlay();
}

// Build Sidebar Navigation per Department
function buildNav() {
  const container = document.getElementById('sidebar-nav');
  if (!container) return;

  const deptData = DEPARTMENTS[STATE.dept] || DEPARTMENTS.field_ops;
  let html = '';

  deptData.nav.forEach(group => {
    html += `<div class="cc-nav-group-label">${group.group}</div>`;
    group.items.forEach(item => {
      const activeClass = item.pane === STATE.activePane ? 'active' : '';
      let badgeHtml = '';
      if (item.badge === 'alerts') badgeHtml = `<span class="cc-nav-badge alert">1</span>`;
      if (item.badge === 'cases') badgeHtml = `<span class="cc-nav-badge check">3</span>`;

      html += `
        <div class="cc-nav-item ${activeClass}" onclick="switchPane('${item.pane}')">
          <div class="cc-nav-left">
            <span class="cc-nav-icon">${item.icon}</span>
            <span>${item.label}</span>
          </div>
          ${badgeHtml}
        </div>
      `;
    });
  });

  container.innerHTML = html;
}

function renderOfficerCard() {
  const off = STATE.officer;
  if (!off) return;

  const av = document.getElementById('sidebar-officer-avatar'); if (av) av.textContent = off.avatar;
  const nm = document.getElementById('sidebar-officer-name'); if (nm) nm.textContent = off.name;
  const idEl = document.getElementById('sidebar-officer-id'); if (idEl) idEl.textContent = off.id;
  const rkEl = document.getElementById('sidebar-officer-rank'); if (rkEl) rkEl.textContent = off.rank;
}

// ============================================================
// PANE NAVIGATION & RENDERING
// ============================================================
function switchPane(paneKey) {
  STATE.activePane = paneKey;
  document.querySelectorAll('.cc-pane').forEach(p => p.classList.remove('active'));

  const paneEl = document.getElementById('pane-' + paneKey);
  if (paneEl) paneEl.classList.add('active');

  buildNav();
  closeSidebar();

  if (paneKey === 'home') renderHomePane();
  if (paneKey === 'assignments') renderAssignmentsPane();
  if (paneKey === 'screenings') renderScreeningsPane();
  if (paneKey === 'alerts') renderAlertsPane();
  if (paneKey === 'cases') renderCasesPane();
  if (paneKey === 'station') renderStationPane();
  if (paneKey === 'devices') renderDevicesPane();
  if (paneKey === 'officers') renderPersonnelPane();
  if (paneKey === 'diagnostics') renderDiagnosticsPane();
  if (paneKey === 'aiml') renderAimlPane();
  if (paneKey === 'audit') renderAuditPane();
}

function setStation(stationKey) {
  STATE.activeStation = stationKey;
  renderHomePane();
}

// ============================================================
// HOME PANE (LOCATION + OPERATIONS FOCUSED)
// ============================================================
function renderHomePane() {
  const st = STATIONS[STATE.activeStation] || STATIONS.nagpur;

  // Station title & status
  const titleEl = document.getElementById('station-title-display');
  if (titleEl) titleEl.textContent = `${st.name} — ${st.division}`;

  const statusEl = document.getElementById('station-status-pill');
  if (statusEl) {
    statusEl.className = st.status.includes('NORMAL') ? 'cc-status-indicator normal' : 'cc-status-indicator alert';
    statusEl.textContent = st.status;
  }

  // Station Metrics Grid
  const smToday = document.getElementById('sm-today'); if (smToday) smToday.textContent = st.screeningsToday.toLocaleString();
  const smOpen = document.getElementById('sm-open'); if (smOpen) smOpen.textContent = st.openCases;
  const smVerif = document.getElementById('sm-verif'); if (smVerif) smVerif.textContent = st.requiresVerification;
  const smDevs = document.getElementById('sm-devs'); if (smDevs) smDevs.textContent = st.activeDevices;

  // Compact info rows
  const infoList = document.getElementById('st-compact-info');
  if (infoList) {
    infoList.innerHTML = `
      <div class="st-info-row"><span class="k">Handheld Units (Field)</span><span class="v">${st.handhelds} Units Active</span></div>
      <div class="st-info-row"><span class="k">Quadruped Robots (Patrol)</span><span class="v">${st.quadrupeds} Units Deployed</span></div>
      <div class="st-info-row"><span class="k">Railway CCTV Nodes</span><span class="v">${st.cctvCount} Connected</span></div>
      <div class="st-info-row"><span class="k">Offline Units</span><span class="v">${st.offlineDevices} Unit (Charging)</span></div>
      <div class="st-info-row"><span class="k">Gateway Synchronization</span><span class="v">${st.lastSync}</span></div>
    `;
  }

  // Live Security Events Stream
  renderEventsFeed();
  renderStationSchematicSVG();
}

function renderEventsFeed() {
  const container = document.getElementById('events-stream-list');
  if (!container) return;

  container.innerHTML = EVENTS_FEED.map(ev => `
    <div class="event-entry ${ev.status}" onclick="openEventDetail('${ev.id}')">
      <div class="event-entry-top">
        <span class="event-entry-id">${ev.id}</span>
        <span class="event-entry-time">${ev.time} IST</span>
      </div>
      <div class="event-entry-loc">${ev.location}</div>
      <div class="event-entry-bot">
        <span class="event-entry-dev">${ev.device}</span>
        <span class="event-entry-status ${ev.status}">${ev.type}</span>
      </div>
    </div>
  `).join('');
}

// ============================================================
// RAILWAY STATION OPERATIONAL SCHEMATIC (SVG)
// ============================================================
function initStationSchematic() {
  renderStationSchematicSVG();
}

function renderStationSchematicSVG() {
  const container = document.getElementById('station-schematic-svg');
  if (!container) return;

  // Render authentic engineering schematic of Nagpur Junction
  container.innerHTML = `
    <svg viewBox="0 0 760 340" xmlns="http://www.w3.org/2000/svg" style="background:#f6f8fb; font-family:'Inter', sans-serif;">
      <!-- Grid Lines (Subtle) -->
      <defs>
        <pattern id="rail-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e8ecf2" stroke-width="0.8"/>
        </pattern>
      </defs>
      <rect width="760" height="340" fill="url(#rail-grid)"/>

      <!-- Perimeter Track Lines -->
      <line x1="20" y1="50" x2="740" y2="50" stroke="#b0b8c6" stroke-width="2" stroke-dasharray="6,3"/>
      <line x1="20" y1="90" x2="740" y2="90" stroke="#8c97aa" stroke-width="3"/>
      <line x1="20" y1="130" x2="740" y2="130" stroke="#8c97aa" stroke-width="3"/>
      <line x1="20" y1="170" x2="740" y2="170" stroke="#8c97aa" stroke-width="3"/>
      <line x1="20" y1="210" x2="740" y2="210" stroke="#8c97aa" stroke-width="3"/>

      <!-- Track Ties / Sleepers -->
      <g stroke="#cbd3e0" stroke-width="1.5">
        ${Array.from({length: 36}, (_, i) => `<line x1="${30 + i*20}" y1="84" x2="${30 + i*20}" y2="96"/>`).join('')}
        ${Array.from({length: 36}, (_, i) => `<line x1="${30 + i*20}" y1="124" x2="${30 + i*20}" y2="136"/>`).join('')}
        ${Array.from({length: 36}, (_, i) => `<line x1="${30 + i*20}" y1="164" x2="${30 + i*20}" y2="176"/>`).join('')}
        ${Array.from({length: 36}, (_, i) => `<line x1="${30 + i*20}" y1="204" x2="${30 + i*20}" y2="216"/>`).join('')}
      </g>

      <!-- PLATFORM 1 -->
      <rect x="80" y="65" width="580" height="20" fill="#ffffff" stroke="#c2cbd8" stroke-width="1.2" rx="2"/>
      <text x="90" y="79" font-size="10" font-weight="700" fill="#334155">PLATFORM 1 — NORTHBOUND (HOWRAH EXP)</text>

      <!-- PLATFORM 2 -->
      <rect x="80" y="105" width="580" height="20" fill="#ffffff" stroke="#c2cbd8" stroke-width="1.2" rx="2"/>
      <text x="90" y="119" font-size="10" font-weight="700" fill="#334155">PLATFORM 2 — MAIN LINE (MUMBAI CSMT - DELHI)</text>

      <!-- PLATFORM 3 (Highlighted Anomaly Zone) -->
      <rect x="80" y="145" width="580" height="20" fill="#fdfaf4" stroke="#e0a860" stroke-width="1.5" rx="2"/>
      <text x="90" y="159" font-size="10" font-weight="700" fill="#8a4c0c">PLATFORM 3 — SECURITY SCREENING LANE (ACTIVE EVENT)</text>

      <!-- PLATFORM 4 -->
      <rect x="80" y="185" width="580" height="20" fill="#ffffff" stroke="#c2cbd8" stroke-width="1.2" rx="2"/>
      <text x="90" y="199" font-size="10" font-weight="700" fill="#334155">PLATFORM 4 — SOUTHBOUND (CHENNAI CENTRAL)</text>

      <!-- CONCOURSE & SECURITY CHECKPOINT -->
      <rect x="80" y="240" width="580" height="75" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" rx="4"/>
      <rect x="80" y="240" width="580" height="18" fill="#eef2f6" rx="3"/>
      <text x="95" y="253" font-size="10" font-weight="800" fill="#1e293b" letter-spacing="0.05em">CENTRAL CONCOURSE · MAIN PASSENGER TERMINAL</text>

      <!-- Checkpoint Lanes -->
      <g font-size="9" font-weight="600" fill="#475467">
        <rect x="100" y="270" width="110" height="34" fill="#f8fafc" stroke="#cbd5e1" rx="2"/>
        <text x="108" y="284">GATE A ENTRY</text>
        <text x="108" y="296" font-size="8" fill="#8a5a1f">LUGGAGE SCAN</text>

        <rect x="230" y="270" width="130" height="34" fill="#f8fafc" stroke="#cbd5e1" rx="2"/>
        <text x="238" y="284">SECURITY CHECKPOINT</text>
        <text x="238" y="296" font-size="8" fill="#1b5c32">TRN-HND-003 ONLINE</text>

        <rect x="380" y="270" width="130" height="34" fill="#f8fafc" stroke="#cbd5e1" rx="2"/>
        <text x="388" y="284">TICKET BARRIER</text>
        <text x="388" y="296" font-size="8" fill="#475467">AUTOMATED GATES</text>

        <rect x="530" y="270" width="110" height="34" fill="#f8fafc" stroke="#cbd5e1" rx="2"/>
        <text x="538" y="284">MAIN EXIT</text>
        <text x="538" y="296" font-size="8" fill="#475467">WEST CIRCULATION</text>
      </g>

      <!-- INTERACTIVE PINS & DEVICES -->

      <!-- Handheld 001 on Platform 3 (Clickable Event Flag) -->
      <g transform="translate(380, 142)" style="cursor:pointer;" onclick="openEventDetail('TRN-2026-001284')">
        <circle cx="12" cy="13" r="11" fill="#ab6010" stroke="#ffffff" stroke-width="2"/>
        <text x="12" y="17" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">!</text>
        <rect x="30" y="4" width="120" height="18" fill="#ffffff" stroke="#ab6010" rx="3"/>
        <text x="36" y="16" font-size="9" font-weight="700" fill="#8a4c0c">TRN-HND-001 · Check</text>
      </g>

      <!-- Handheld 002 on Platform 1 -->
      <g transform="translate(240, 62)" style="cursor:pointer;" onclick="openDeviceDetail('TRN-HND-002')">
        <circle cx="12" cy="13" r="9" fill="#8a5a1f" stroke="#ffffff" stroke-width="1.5"/>
        <text x="12" y="16" font-size="8" font-weight="800" fill="#ffffff" text-anchor="middle">H</text>
      </g>

      <!-- Quadruped 002 in Service Yard Sector -->
      <g transform="translate(680, 42)" style="cursor:pointer;" onclick="openDeviceDetail('TRN-QDR-002')">
        <circle cx="12" cy="13" r="9" fill="#2563eb" stroke="#ffffff" stroke-width="1.5"/>
        <text x="12" y="16" font-size="8" font-weight="800" fill="#ffffff" text-anchor="middle">Q</text>
      </g>

      <!-- CCTV Cameras -->
      <g transform="translate(100, 42)" style="cursor:pointer;" onclick="switchPane('diagnostics')">
        <polygon points="12,8 4,18 20,18" fill="#475467"/>
        <text x="12" y="30" font-size="8" fill="#64748b" text-anchor="middle">CAM-01</text>
      </g>
      <g transform="translate(640, 138)" style="cursor:pointer;" onclick="switchPane('diagnostics')">
        <polygon points="12,8 4,18 20,18" fill="#475467"/>
        <text x="12" y="30" font-size="8" fill="#64748b" text-anchor="middle">CAM-04</text>
      </g>
    </svg>
  `;
}

// ============================================================
// OTHER PANES
// ============================================================
function renderAssignmentsPane() {
  const container = document.getElementById('assignments-table-body');
  if (!container) return;

  const myCases = CASES.filter(c => c.officer.includes('Rahul Sharma') || STATE.dept !== 'field_ops');
  container.innerHTML = myCases.map(c => `
    <tr>
      <td><b>${c.caseId}</b></td>
      <td><a href="#" onclick="openEventDetail('${c.eventId}')" style="color:var(--accent-bronze); font-weight:700;">${c.eventId}</a></td>
      <td>${c.location}</td>
      <td>${c.time}</td>
      <td><span class="pill ${c.status === 'awaiting' ? 'check' : c.status === 'progress' ? 'alert' : 'clear'}">${c.statusLabel}</span></td>
      <td><button class="btn btn-secondary" onclick="openAssignModal('${c.caseId}')">Update Status</button></td>
    </tr>
  `).join('');
}

function renderScreeningsPane() {
  const container = document.getElementById('screenings-table-body');
  if (!container) return;

  container.innerHTML = EVENTS_FEED.map(s => `
    <tr>
      <td><b>${s.id}</b></td>
      <td>${s.time} IST</td>
      <td>${s.location}</td>
      <td>${s.device}</td>
      <td><span class="pill ${s.status}">${s.type}</span></td>
      <td>${s.officer}</td>
      <td><button class="btn btn-secondary" onclick="openEventDetail('${s.id}')">Inspect Chain</button></td>
    </tr>
  `).join('');
}

function renderAlertsPane() {
  const container = document.getElementById('alerts-table-body');
  if (!container) return;

  const alerts = EVENTS_FEED.filter(e => e.status !== 'clear');
  container.innerHTML = alerts.map(a => `
    <tr>
      <td><b>${a.id}</b></td>
      <td>${a.time} IST</td>
      <td>${a.location}</td>
      <td>${a.device}</td>
      <td><span class="pill ${a.status}">${a.type}</span></td>
      <td>${a.officer}</td>
      <td>
        <button class="btn btn-primary" onclick="openEventDetail('${a.id}')">View Details</button>
        <button class="btn btn-secondary" onclick="openAssignModal('CASE-' + '${a.id}'.slice(4))">Dispatch</button>
      </td>
    </tr>
  `).join('');
}

function renderCasesPane() {
  const container = document.getElementById('cases-table-body');
  if (!container) return;

  container.innerHTML = CASES.map(c => `
    <tr>
      <td><b>${c.caseId}</b></td>
      <td><a href="#" onclick="openEventDetail('${c.eventId}')" style="color:var(--accent-bronze); font-weight:700;">${c.eventId}</a></td>
      <td>${c.location}</td>
      <td>${c.time}</td>
      <td>${c.officer}</td>
      <td><span class="pill ${c.status === 'awaiting' ? 'check' : c.status === 'progress' ? 'alert' : 'clear'}">${c.statusLabel}</span></td>
      <td>
        <button class="btn btn-secondary" onclick="openAssignModal('${c.caseId}')">Reassign</button>
        <button class="btn btn-primary" onclick="closeCase('${c.caseId}')">Close Case</button>
      </td>
    </tr>
  `).join('');
}

function closeCase(caseId) {
  const c = CASES.find(x => x.caseId === caseId);
  if (c) {
    c.status = 'closed';
    c.statusLabel = 'Closed';
    addAudit(`Case ${caseId} verified and closed by ${STATE.officer?.name || 'Officer'}`, c.device, c.location);
    renderCasesPane();
  }
}

function renderDevicesPane() {
  const container = document.getElementById('devices-table-body');
  if (!container) return;

  container.innerHTML = DEVICES.map(d => `
    <tr>
      <td><b>${d.id}</b></td>
      <td>${d.type === 'handheld' ? 'TRINETRA Handheld' : 'TRINETRA Quadruped'}</td>
      <td>${d.location}</td>
      <td><span class="pill ${d.status === 'online' ? 'clear' : d.status === 'alert' ? 'alert' : 'offline'}">${d.status.toUpperCase()}</span></td>
      <td>${d.battery}%</td>
      <td>${d.temp}</td>
      <td>${d.officer}</td>
      <td><button class="btn btn-secondary" onclick="openDeviceDetail('${d.id}')">Telemetry</button></td>
    </tr>
  `).join('');
}

function renderPersonnelPane() {
  const container = document.getElementById('personnel-table-body');
  if (!container) return;

  container.innerHTML = PERSONNEL.map(p => `
    <tr>
      <td><b>${p.id}</b></td>
      <td>${p.name}</td>
      <td>${p.rank}</td>
      <td>${p.dept}</td>
      <td>${p.duty}</td>
      <td><span class="pill clear">${p.status}</span></td>
      <td>${p.cases} Cases</td>
      <td><button class="btn btn-secondary" onclick="openAssignModal('CASE-2026-001284')">Assign Task</button></td>
    </tr>
  `).join('');
}

function renderStationPane() {
  renderHomePane();
}

function renderDiagnosticsPane() {
  drawRadarCanvas();
  drawEnoseCanvas();
}

function renderAimlPane() {
  renderDiagnosticsPane();
}

function renderAuditPane() {
  const container = document.getElementById('audit-table-body');
  if (!container) return;

  container.innerHTML = AUDIT_LOG.map(a => `
    <tr>
      <td class="mono">${a.time}</td>
      <td><b>${a.user}</b></td>
      <td>${a.action}</td>
      <td class="mono">${a.device}</td>
      <td>${a.location}</td>
    </tr>
  `).join('');
}

function addAudit(action, device, location) {
  const now = new Date();
  const time = now.toLocaleTimeString('en-IN', { timeZone:'Asia/Kolkata', hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false }) + ' IST';
  AUDIT_LOG.unshift({
    time,
    user: STATE.officer ? `${STATE.officer.id} (${STATE.officer.name})` : 'SYSTEM',
    action,
    device: device || 'CENTRAL-GATEWAY',
    location: location || 'Nagpur Division',
  });
}

// ============================================================
// CANVASES (RADAR, E-NOSE & CCTV)
// ============================================================
function drawRadarCanvas() {
  const canvas = document.getElementById('radar-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  ctx.fillStyle = '#0f1219';
  ctx.fillRect(0, 0, W, H);

  // Grid
  ctx.strokeStyle = '#222836';
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 30) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = 0; y < H; y += 25) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

  // Waveform
  STATE.radarPhase += 0.05;
  ctx.strokeStyle = '#8a5a1f';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let x = 0; x < W; x += 2) {
    const nx = x / W;
    let y = H * 0.75 - Math.sin(nx * 12 + STATE.radarPhase) * 6;
    if (Math.abs(nx - 0.52) < 0.08) {
      y -= (1 - Math.abs(nx - 0.52)/0.08) * (H * 0.55);
    }
    if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Baseline threshold line
  ctx.strokeStyle = '#ab6010';
  ctx.setLineDash([4, 4]);
  ctx.beginPath(); ctx.moveTo(0, H * 0.4); ctx.lineTo(W, H * 0.4); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = '#ab6010';
  ctx.font = '9px monospace';
  ctx.fillText('ANOMALY THRESHOLD (+15 dB)', 6, H * 0.38);
}

function drawEnoseCanvas() {
  const canvas = document.getElementById('enose-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  ctx.fillStyle = '#0f1219';
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = '#222836';
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 30) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = 0; y < H; y += 25) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

  STATE.enosePhase += 0.04;
  const channels = [
    { label:'MQ-135 (VOC)', color:'#ab6010', peak:0.75 },
    { label:'MQ-2 (Combustible)', color:'#3b82f6', peak:0.25 },
    { label:'BME688 (Gas)', color:'#237841', peak:0.18 },
  ];

  channels.forEach((ch) => {
    ctx.strokeStyle = ch.color;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let x = 0; x < W; x += 2) {
      const nx = x / W;
      let y = H * 0.85 - Math.sin(nx * 8 + STATE.enosePhase) * 4;
      if (Math.abs(nx - 0.65) < 0.12) {
        y -= (1 - Math.abs(nx - 0.65)/0.12) * (ch.peak * H * 0.7);
      }
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
  });
}

function startCctvLoop() {
  function loop() {
    drawCctvFeeds();
    drawRadarCanvas();
    drawEnoseCanvas();
    STATE.cctvAnimFrame = requestAnimationFrame(loop);
  }
  if (STATE.cctvAnimFrame) cancelAnimationFrame(STATE.cctvAnimFrame);
  STATE.cctvAnimFrame = requestAnimationFrame(loop);
}

function drawCctvFeeds() {
  const feeds = ['cctv-p3', 'cctv-concourse', 'cctv-entry', 'cctv-yard'];
  feeds.forEach(id => {
    const canvas = document.getElementById(id);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;

    ctx.fillStyle = '#141822';
    ctx.fillRect(0, 0, W, H);

    // Camera Scanline Grid
    ctx.strokeStyle = '#1d2332';
    ctx.lineWidth = 1;
    for (let y = 0; y < H; y += 8) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    // Target Bounding Box (Spatial Context)
    if (id === 'cctv-p3') {
      const t = Date.now() * 0.001;
      const bx = W * 0.45 + Math.sin(t) * 12;
      const by = H * 0.35 + Math.cos(t * 0.8) * 8;
      ctx.strokeStyle = '#ab6010';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(bx, by, 48, 70);

      ctx.fillStyle = '#ab6010';
      ctx.font = '8px monospace';
      ctx.fillText('TARGET #042 · BAGGAGE', bx, by - 4);
    }
  });
}

// ============================================================
// MODALS (EVENT DETAIL, DEVICE TELEMETRY, ASSIGN OFFICER)
// ============================================================
function openEventDetail(eventId) {
  const ev = EVENT_REGISTRY[eventId] || EVENT_REGISTRY['TRN-2026-001284'];
  const modal = document.getElementById('modal-event');
  if (!modal) return;

  document.getElementById('modal-event-id').textContent = ev.id;
  document.getElementById('modal-event-location').textContent = ev.location;

  const body = document.getElementById('modal-event-body');
  if (body) {
    body.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; background:var(--bg-subtle); padding:8px 10px; border-radius:var(--r-sm); border:1px solid var(--border-subtle);">
        <div><b>Device:</b> ${ev.device}</div>
        <div><span class="pill ${ev.resultClass}">${ev.result}</span></div>
      </div>

      <div style="font-weight:700; font-size:11px; text-transform:uppercase; color:var(--text-secondary); margin-bottom:6px;">Unified Sensor &amp; AI Decision Factors:</div>
      <ul style="margin-left:16px; margin-bottom:14px; font-size:11.5px; color:var(--text-primary); line-height:1.6;">
        ${ev.why.map(w => `<li style="list-style-type:disc; margin-bottom:4px;">${w}</li>`).join('')}
      </ul>

      <div style="font-weight:700; font-size:11px; text-transform:uppercase; color:var(--text-secondary); margin-bottom:6px;">Decision Lineage (Event Trace Chain):</div>
      <div class="event-chain">
        ${ev.chain.map(c => `
          <div class="chain-step ${c.class || ''}">
            <div class="chain-head">
              <span class="chain-time">${c.time}</span>
              <span class="chain-source">${c.source}</span>
            </div>
            <div class="chain-desc">${c.desc}</div>
          </div>
        `).join('')}
      </div>

      <div style="margin-top:12px; background:var(--accent-bronze-bg); border:1px solid var(--accent-bronze-border); border-radius:var(--r-sm); padding:8px 10px; font-size:11px; color:var(--accent-bronze-dark);">
        <b>Recommended SOP Action:</b> ${ev.recommendation}
      </div>
      <div style="margin-top:6px; font-size:9.5px; color:var(--text-muted);">
        <b>Disclaimer:</b> ${ev.disclaimer}
      </div>
    `;
  }

  modal.classList.add('open');
}

function openDeviceDetail(deviceId) {
  const dev = DEVICES.find(d => d.id === deviceId) || DEVICES[0];
  const modal = document.getElementById('modal-device');
  if (!modal) return;

  document.getElementById('modal-device-id').textContent = dev.id;
  document.getElementById('modal-device-location').textContent = dev.location;

  const body = document.getElementById('modal-device-body');
  if (body) {
    body.innerHTML = `
      <div class="st-info-list" style="margin-bottom:12px;">
        <div class="st-info-row"><span class="k">Platform Type</span><span class="v">${dev.type === 'handheld' ? 'TRINETRA Handheld Platform' : 'TRINETRA Quadruped Robotic Platform'}</span></div>
        <div class="st-info-row"><span class="k">Operational Status</span><span class="v"><span class="pill ${dev.status === 'online' ? 'clear' : dev.status === 'alert' ? 'alert' : 'offline'}">${dev.status.toUpperCase()}</span></span></div>
        <div class="st-info-row"><span class="k">Assigned Officer / Mode</span><span class="v">${dev.officer}</span></div>
        <div class="st-info-row"><span class="k">Battery Capacity</span><span class="v">${dev.battery}%</span></div>
        <div class="st-info-row"><span class="k">Core Temperature</span><span class="v">${dev.temp}</span></div>
        <div class="st-info-row"><span class="k">Firmware Version</span><span class="v">${dev.firmware}</span></div>
      </div>
      <div style="font-size:10.5px; color:var(--text-muted);">Edge Diagnostics: Dual-band Wi-Fi 6 + LoRaWAN active. NVMe high-speed circular write buffer healthy.</div>
    `;
  }

  modal.classList.add('open');
}

function openAssignModal(caseId) {
  const modal = document.getElementById('modal-assign');
  if (!modal) return;

  const idEl = document.getElementById('modal-assign-caseid');
  if (idEl) idEl.textContent = caseId;
  modal.classList.add('open');
}

function confirmAssignment() {
  const caseId = document.getElementById('modal-assign-caseid')?.textContent || 'CASE-2026-001284';
  const officerSel = document.getElementById('assign-officer-select');
  const officerName = officerSel ? officerSel.value : 'ASI Rahul Sharma';

  const c = CASES.find(x => x.caseId === caseId);
  if (c) {
    c.officer = officerName;
    c.status = 'progress';
    c.statusLabel = 'Verification In Progress';
    addAudit(`Case ${caseId} assigned to ${officerName}`, c.device, c.location);
  }

  closeModal('modal-assign');
  if (STATE.activePane === 'cases') renderCasesPane();
  if (STATE.activePane === 'assignments') renderAssignmentsPane();
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('open');
}
