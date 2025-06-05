## Steps to run this Front-end application
Navigate to UniScStats Folder/src ---- open terminal and add the command

1.  npm run i (to install node dependencies)
2.  npm run dev (to run the application), open  http://localhost:8080/ in the browser.
   

# DataPortal3 Redesign Project - Requirements

## Project Overview
**Goal:** Redesign university data portal with role-based personalized dashboards, elegant visualizations, and on-demand insights for executive decision-making.

**Key Stakeholders:** University executives (VCP, Deans, Directors), ICT Team


markdown
# UniScStats Data Portal

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

A comprehensive university statistics dashboard with secure access controls, real-time data visualization, and modular UI components.

## ✨ Features

- **Interactive Dashboards**
  - Faculty performance metrics
  - Enrollment trends visualization
  - Custom report generation

- **Authentication & Security**
  - JWT-based authentication
  - Protected routes
  - Role-based access control

- **Data Visualization**
  - Line/bar charts for time-series data
  - Mermaid.js integration for diagrams
  - Responsive data tables

- **Developer Experience**
  - TypeScript support
  - Custom UI component library
  - Vite-powered builds
  - Dockerized deployment

## 📦 Project Structure
src/
├── components/ # Shared components
├── ui/ # UI component library
│ ├── primitives/ # Base components (Button, Input, etc.)
│ ├── composites/ # Complex components (DataGrid, Chart)
│ ├── hooks/ # Custom hooks
│ └── lib/ # Utility functions
├── pages/
│ └── governance/ # Feature-based routing
│ ├── auth/ # Authentication flows
│ ├── dashboard/ # Data visualization
│ └── reports/ # Report generation
├── contexts/ # React contexts
├── styles/
├── types/ # TypeScript definitions
├── App.tsx # Root component
└── main.tsx # Entry point


## 🚀 Quick Start

### Prerequisites

- Node.js v18+
- npm v9+ 
- Docker (optional)

### Installation

```bash
# Clone repository
git clone https://github.com/your-org/uniscstats.git
cd uniscstats

# Install dependencies (choose one)
npm install

Development
bash
npm run dev
Access at: [http://localhost:8000]

Production Build
bash
npm run build
Outputs to: dist/

🔧 Configuration
Environment Variables
Create .env file in root:

ini
VITE_API_BASE_URL=https://api.yourdomain.com

🐳 Docker Deployment
Build Container
bash
docker build -t uniscstats.
Run Container
bash
docker run -d \
  -p 3000:80 \
  -e VITE_API_BASE_URL=https://prod.api.example.com \
  --name uniscstats \
  uniscstats
Docker Compose
yaml
version: '3.8'
services:
  uniscstats:
    image: uniscstats
    ports:
      - "3000:80"
    environment:
      - VITE_API_BASE_URL=https://prod.api.example.com
    restart: unless-stopped
🧩 UI Components
The component library includes:

Component	Description	Usage Example

Import components from @/ui:
tsx
import { Button, Button, Slider } from '@/ui';
📊 Data Flow
Diagram
Code



🤝 Contributing
Fork the repository

Create your feature branch (git checkout -b feature/amazing-feature)

Commit changes (git commit -m 'Add amazing feature')

Push to branch (git push origin feature/amazing-feature)

Open a Pull Request

Code Standards
TypeScript strict mode

ESLint + Prettier enforced

Atomic component design

Meaningful commit messages

📄 License
MIT License - see LICENSE for details.

📬 Contact
Project Maintainers:
Name: Pratik Pokharel
Email: pratikpokhrel!@outlook.com


4. **Data Visualization**: 
   - Line charts for trends
   - Heatmaps for density patterns
   - Donut charts for quick stats

Would you like me to elaborate on any specific aspect of the wireframes or task prioritization?
