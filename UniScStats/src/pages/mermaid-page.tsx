import Mermaidd from '@/components/mermaid';
import React from 'react';

const App = () => {
  const diagram = `
    graph TD
      A[User] --> B[React Frontend]
      B --> C[Login Page]
      C --> D{Credentials Valid?}
      D -- Yes --> E[JWT Token Issued]
      D -- No --> F[Error Message]
      E --> G[Dashboard]
      G --> H[View Reports]
      G --> I[Manage Profile]
      G --> J{Is Admin?}
      J -- Yes --> K[Admin Panel]
      K --> L[User Management]
      K --> M[System Logs]
      J -- No --> N[Access Denied Message]
      B --> O[API Request]
      O --> P[.NET Web API]
      P --> Q{Token Valid?}
      Q -- Yes --> R[Business Logic]
      R --> S[Database Access (SQL Server)]
      S --> T[(DB Tables)]
      Q -- No --> U[403 Unauthorized]
      style T fill:#f9f,stroke:#333,stroke-width:2px
      style K fill:#ffcccc
  `;

  return (
    <div>
      <h1>Complex Mermaid Diagram</h1>
      <Mermaidd chart={diagram} />
    </div>
  );
};

export default App;
