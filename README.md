## Steps to run this Front-end application
Navigate to UniScStats Folder/src ---- open terminal and add the command

1.  npm run i (to install node dependencies)
2.  npm run dev (to run the application), open  http://localhost:8080/ in the browser.
   

# DataPortal3 Redesign Project - Requirements

## Project Overview
**Goal:** Redesign university data portal with role-based personalized dashboards, elegant visualizations, and on-demand insights for executive decision-making.

**Key Stakeholders:** University executives (VCP, Deans, Directors), ICT Team

## Objectives & Requirements

### Stage 1: Elegant Visualization & Dashboard Foundation
- [ ] Implement interactive chart library (PowerBI + ECharts integration)
- [ ] Create 5 core executive dashboards:
  - Enrollment Trends (Real-time)
  - Admissions Pipeline
  - Student Success Metrics
  - Attrition Heatmaps
  - Offer Acceptance Rates
- [ ] Develop responsive grid layout system
- [ ] Add dark/light mode toggle

### Stage 2: On-Demand Insights Engine
- [ ] Natural language query interface
- [ ] Pre-built quick analysis templates:
  ```json
  "quick_insights": [
    "ProgramComparison2024",
    "AttritionForecast",
    "EnrollmentProjection"
  ]
  ```
- [ ] Cache system for frequent requests
- [ ] Automated report generation (PDF/Excel)

### Stage 3: Role-Based Personalization
- [ ] Azure AD role integration matrix:
  | Role | Dashboard Access | Data Permissions |
  |------|------------------|------------------|
  | VCP | Full             | University-wide |
  | Dean | School-level     | Department-specific |
- [ ] Customizable widget system
- [ ] User preference storage (localStorage + cloud sync)

## Technical Specifications

### Authentication & Authorization (.NET 8)
```bash
# Create base project
dotnet new webapp -o DataPortal3 -au Individual
```
- [ ] Implement Azure AD integration
- [ ] Role-based policy configuration:
  ```csharp
  services.AddAuthorization(options => {
    options.AddPolicy("ExecutiveAccess", policy => 
      policy.RequireRole("VCP", "Provost", "Dean"));
  });
  ```
- [ ] Secure API endpoints with JWT
- [ ] Audit logging middleware

### Containerized Deployment
```dockerfile
# Test stage in Dockerfile
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS test
RUN dotnet test /src/tests/DataPortal3.Tests

# Production build
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
USER 10001
ENTRYPOINT ["dotnet", "DataPortal3.dll"]
```

### PowerBI Integration
- [ ] Embedded authentication setup
- [ ] Report lifecycle management
- [ ] Cross-filtering between portal/PowerBI

## Development Notes

### ICT Intern Involvement Plan
1. Frontend module development (HTML/JS)
2. Style guide implementation
3. Basic chart configuration
4. Documentation tasks

### Migration Path
```mermaid
graph LR
  A[Current JSON] --> B[SQL Server]
  B --> C[Azure CosmosDB]
  C --> D[.NET Web API]
```

## Current Implementation Status

### Completed Features
✅ Client-side filtering/search  
✅ Basic dashboard framework  
✅ Static authentication  
✅ Chart.js integration

### Immediate Next Steps
1. Implement .NET authentication backend
2. Migrate data to Azure SQL
3. Create role-based access control
4. Develop API endpoints for:
   - Dynamic data loading
   - User preferences
   - Report metadata

## Testing Requirements
- [ ] Load testing (500+ concurrent users)
- [ ] Security penetration testing
- [ ] Cross-browser validation matrix
- [ ] Mobile responsiveness checklist

## Success Metrics
| Metric | Target | Measurement |
|--------|--------|-------------|
| Dashboard Load Time | <2s | Azure Monitor |
| Query Response | <5s | Application Insights |
| User Adoption | 85%+ | Google Analytics |
```


Here's a combined task list and Mermaid wireframe visualization for the MyUniSC Data Portal projects:

### Task List Roadmap

**Phase 1: Foundation Setup (Weeks 1-4)**
```markdown
- [ ] Set up Azure AD/EntraID authentication
- [ ] Create role matrix (VCP/Dean/Staff/ExecStaff)
- [ ] Develop base dashboard template
- [ ] Implement static JSON data source
- [ ] Build basic navigation structure
- [ ] Configure Azure Static Web App hosting
- [ ] Create security audit checklist
```

**Phase 2: Core Features (Weeks 5-8)**
```markdown
- [ ] Develop role-based view switching
- [ ] Implement PowerBI report embedding
- [ ] Build dynamic filter components
- [ ] Create search functionality
- [ ] Add dark/light mode toggle
- [ ] Set up basic usage analytics
```

**Phase 3: Enhancement & Testing (Weeks 9-12)**
```markdown
- [ ] Implement responsive grid system
- [ ] Add card/list view toggle
- [ ] Develop report metadata API
- [ ] Conduct load testing
- [ ] Perform security penetration tests
- [ ] Create user training materials
```

### Mermaid Wireframe Visualization

**Data Portal Dashboard View**
```mermaid
graph TD
    A[Portal Header] --> B[Role Selector]
    A --> C[Dark/Light Toggle]
    A --> D[User Profile]
    B --> E[Dashboard View]
    E --> F[Left Navigation]
    F --> G[Quick Filters]
    E --> H[Main Grid]
    H --> I1[Enrollment Chart]
    H --> I2[Attrition Heatmap]
    H --> I3[Success Metrics]
    H --> I4[Custom Widget]
    E --> J[Insights Toolbar]
    J --> K[Natural Language Input]
    J --> L[Quick Export]
```

**Reports Catalog View**
```mermaid
graph TD
    A[Catalog Header] --> B[Search Bar]
    A --> C[View Toggle]
    B --> D[Filters Panel]
    D --> E1[Category]
    D --> E2[Status]
    D --> E3[Access Level]
    A --> F[Main Content]
    F --> G[Card View]
    G --> H1[Report Card]
    H1 --> I1[Preview]
    H1 --> I2[Metadata]
    H1 --> I3[Access Button]
    F --> J[List View]
    J --> K1[Report Title]
    J --> K2[Quick Stats]
    J --> K3[Last Updated]
```

**Mobile View**
```mermaid
graph TD
    A[Hamburger Menu] --> B[User Context]
    B --> C1[Role: Executive]
    B --> C2[Dark Mode]
    A --> D[Main Content]
    D --> E[Stacked Cards]
    E --> F1[Collapsed Filters]
    E --> F2[Chart Preview]
    E --> F3[Quick Actions]
    A --> G[Floating Search]
```

Key UI Components Legend:
1. **Role-Based Color Coding**: Executive views use purple accents, staff views use blue
2. **Grid System**: 12-column responsive layout with card-based widgets
3. **Visual Hierarchy**: 
   - Primary Actions: Purple buttons
   - Secondary Actions: Gray outlines
   - Emergency Metrics: Red highlights
4. **Data Visualization**: 
   - Line charts for trends
   - Heatmaps for density patterns
   - Donut charts for quick stats

Would you like me to elaborate on any specific aspect of the wireframes or task prioritization?
