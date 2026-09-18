# TRINETRA — Railway Narcotics & Explosives Detection System
> **Smart India Hackathon (SIH) — Problem Statement ID: 26026**  
> *Development of Mobile (Quadruped) / Handheld Device System for Real-Time Detection of Narcotics and Explosives for Railway Security (RPF).*

---

## 📌 Overview
**TRINETRA** is an integrated security and surveillance platform engineered for the **Indian Railways (RPF)**. It combines edge sensing hardware (mmWave Radar and E-Nose Sensor Arrays) with a unified real-time **Command & Control Center** to detect concealed narcotics, explosives, contraband, and hazardous materials across railway stations, platforms, and coaches.

---

## 🚀 Key Features

- **Dual-Sensor Fusion Architecture**:
  - **60–64 GHz mmWave Radar**: Penetrates luggage fabrics, backpacks, and clothing to measure dielectric anomalies and physical mass densities without ionizing radiation.
  - **16-Channel MOS/PID E-Nose Array**: Detects trace volatile organic compounds (VOCs), taggants, precursors, and chemical vapors at parts-per-billion (ppb) sensitivity.
- **Unified Command Center**:
  - Live spatial station map with device track overlay.
  - Real-time sensor stream telemetry, gas concentration spectrums, and radar cross-section (RCS) heatmaps.
  - Automated threat classification and Standard Operating Procedure (SOP) dispatch.
- **Multi-Platform Deployment**:
  - **Handheld Inspection Device**: Rugged field unit for RPF officers during platform and coach frisking.
  - **Quadruped Autonomous Robot**: Autonomous patrol unit for under-seat and luggage rack screening.

---

## 📂 Project Structure

```text
trinetra_v2_website/
├── README.md
└── trinetra_v2/
    ├── index.html             # System overview, hardware architecture & specs
    ├── command_center.html    # Unified live Command & Control Center UI
    ├── css/
    │   └── command_center.css # Command center styling & dark-mode control room UI
    ├── js/
    │   └── command_center.js  # Telemetry simulation, alert engine & interactions
    └── assets/                # Hardware diagrams and reference imagery
```

---

## 🛠️ Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Edge, Safari)
- (Optional) Python 3.x or Node.js for running a local server

### Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Prasang-06/TriNetra.git
   cd TriNetra/trinetra_v2
   ```

2. **Launch via Python HTTP Server:**
   ```bash
   python -m http.server 8000
   ```

3. **Open in browser:**
   - System Overview: `http://localhost:8000/index.html`
   - Live Command Center: `http://localhost:8000/command_center.html`

---

## 🛡️ Security Decision Matrix

| Anomaly Level | Radar Density | E-Nose Vapors | Threat Classification | Standard Operating Procedure (SOP) |
| :--- | :--- | :--- | :--- | :--- |
| **Case 01** | Normal | Baseline | 🟢 **CLEAR** | Routine patrol continues |
| **Case 02** | High Density | Baseline | 🟡 **PHYSICAL ANOMALY** | Flag for manual secondary baggage search |
| **Case 03** | Normal | High VOCs | 🟠 **CHEMICAL ANOMALY** | Chemical/Narcotic trace protocol triggered |
| **Case 04** | High Density | High VOCs | 🚨 **HIGH RISK ALERT** | Immediate 50m cordon + Alert QRT / EOD |

---

## 👥 Contributors & Acknowledgements
- **Problem Statement ID**: SIH 26026
- **Ministry / Organization**: Ministry of Railways / Railway Protection Force (RPF)
