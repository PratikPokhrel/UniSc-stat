
  // Realistic CAUDIT HERM data for IAU
  export const hermBreakdown = {
    'strategy-management': {
      score: 88.2,
      breakdown: [
        { name: 'Completeness', value: 92 },
        { name: 'Accuracy', value: 22 },
        { name: 'Consistency', value: 85 },
        { name: 'Timeliness', value: 90 },
        { name: 'Validity', value: 89 },
        { name: 'Uniqueness', value: 86 }
      ],
      kpis: [
        'Completeness Target: 95%',
        'Timeliness SLA: 98%',
        'Validity Threshold: 90%'
      ]
    },
    'information-management': {
      score: 84.5,
      breakdown: [
        { name: 'Completeness', value: 88 },
        { name: 'Accuracy', value: 83 },
        { name: 'Consistency', value: 45 },
        { name: 'Timeliness', value: 82 },
        { name: 'Validity', value: 86 },
        { name: 'Uniqueness', value: 83 }
      ],
      kpis: [
        'Accuracy Standard: 90%',
        'Consistency Target: 88%',
        'Uniqueness Threshold: 85%'
      ]
    },
    'analytics-insights': {
      score: 91.3,
      breakdown: [
        { name: 'Completeness', value: 53 },
        { name: 'Accuracy', value: 93 },
        { name: 'Consistency', value: 89 },
        { name: 'Timeliness', value: 92 },
        { name: 'Validity', value: 91 },
        { name: 'Uniqueness', value: 89 }
      ],
      kpis: [
        'Completeness Target: 95%',
        'Accuracy Standard: 95%',
        'Timeliness SLA: 95%'
      ]
    },
    'business-management': {
      score: 86.8,
      breakdown: [
        { name: 'Completeness', value: 89 },
        { name: 'Accuracy', value: 64 },
        { name: 'Consistency', value: 73 },
        { name: 'Timeliness', value: 88 },
        { name: 'Validity', value: 86 },
        { name: 'Uniqueness', value: 84 }
      ],
      kpis: [
        'Consistency Target: 90%',
        'Validity Threshold: 88%',
        'Uniqueness Standard: 85%'
      ]
    }
  };

  export const capabilityMaturityData = [
    { category: 'Strategy & Planning Management', maturity: 95, risk: 20, target: 95, capabilities: 4 },
    { category: 'Information & Data Management', maturity: 78, risk: 35, target: 85, capabilities: 7 },
    { category: 'Analytics & Business Intelligence', maturity: 96, risk: 45, target: 95, capabilities: 2 },
    { category: 'Business & Operations Management', maturity: 82, risk: 40, target: 88, capabilities: 7 }
  ];

  export const systemHealthData = [
    { name: 'Strategy & Planning Management', health: 98, performance: 95, uptime: 99.8, users: 245 },
    { name: 'Information & Data Management', health: 94, performance: 92, uptime: 99.2, users: 189 },
    { name: 'Analytics & Business Intelligence', health: 97, performance: 96, uptime: 99.9, users: 312 },
    { name: 'Business & Operations Management', health: 89, performance: 85, uptime: 98.5, users: 156 },
  ];

  export const governanceTrend = [
    { month: 'Jan', overall: 82, 'Strategy & Planning Management': 88, 'Information & Data Management': 79, 'Analytics & Business Intelligence': 85, 'Business & Operations Management': 81 },
    { month: 'Feb', overall: 84, 'Strategy & Planning Management': 89, 'Information & Data Management': 81, 'Analytics & Business Intelligence': 86, 'Business & Operations Management': 83 },
    { month: 'Mar', overall: 85, 'Strategy & Planning Management': 90, 'Information & Data Management': 82, 'Analytics & Business Intelligence': 87, 'Business & Operations Management': 84 },
    { month: 'Apr', overall: 86, 'Strategy & Planning Management': 91, 'Information & Data Management': 83, 'Analytics & Business Intelligence': 88, 'Business & Operations Management': 85 },
    { month: 'May', overall: 87, 'Strategy & Planning Management': 91, 'Information & Data Management': 84, 'Analytics & Business Intelligence': 89, 'Business & Operations Management': 85 },
    { month: 'Jun', overall: 87, 'Strategy & Planning Management': 92, 'Information & Data Management': 84, 'Analytics & Business Intelligence': 89, 'Business & Operations Management': 85 },
    { month: 'Aug', overall: 85, 'Strategy & Planning Management': 92, 'Information & Data Management': 84, 'Analytics & Business Intelligence': 89, 'Business & Operations Management': 84 },
    { month: 'Sep', overall: 87, 'Strategy & Planning Management': 92, 'Information & Data Management': 84, 'Analytics & Business Intelligence': 85, 'Business & Operations Management': 85 },
    { month: 'Oct', overall: 87, 'Strategy & Planning Management': 92, 'Information & Data Management': 81, 'Analytics & Business Intelligence': 89, 'Business & Operations Management': 82 }
  ];

  export const dataQualityMetrics = [
    { metric: 'Completeness', value: 94, target: 95, trend: 'up' },
    { metric: 'Accuracy', value: 91, target: 93, trend: 'up' },
    { metric: 'Consistency', value: 88, target: 90, trend: 'stable' },
    { metric: 'Timeliness', value: 86, target: 88, trend: 'down' },
    { metric: 'Validity', value: 92, target: 94, trend: 'up' },
    { metric: 'Uniqueness', value: 97, target: 98, trend: 'stable' }
  ];