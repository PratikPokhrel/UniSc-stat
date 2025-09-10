 export const dataProducts = [
        {
            id: 1,
            name: 'Student Enrollment Trends',
            type: 'Analytical Dashboard',
            domain: 'Admissions',
            assets: 8,
            owners: [
                { firstName: 'Sarah', lastName: 'Johnson', email: 's.johnson@university.edu', role: 'Director of Admissions' },
                { firstName: 'Michael', lastName: 'Chen', email: 'm.chen@university.edu', role: 'Data Analyst' }
            ],
            status: 'Published',
            quality: 'Healthy 92.5',
            lastUpdated: '2023-10-15',
            description: 'Interactive dashboard showing enrollment trends by department, demographics, and geographic origin',
            tags: ['Admissions', 'Demographics', 'Trend Analysis'],
            usageStats: {
                weeklyViews: 145,
                frequentUsers: ['Admissions Office', 'Deans', 'Department Heads']
            }
        },
        {
            id: 2,
            name: 'Course Evaluation Analytics',
            type: 'Assessment Reports',
            domain: 'Academic Affairs',
            assets: 12,
            owners: [
                { firstName: 'Robert', lastName: 'Williams', email: 'r.williams@university.edu', role: 'Registry Officer' },
                { firstName: 'Emily', lastName: 'Davis', email: 'e.davis@university.edu', role: 'Assessment Coordinator' }
            ],
            status: 'Published',
            quality: 'Healthy 88.3',
            lastUpdated: '2023-09-28',
            description: 'Comprehensive analysis of student course evaluations with faculty benchmarking',
            tags: ['Faculty Performance', 'Student Feedback', 'Quality Assurance'],
            usageStats: {
                weeklyViews: 210,
                frequentUsers: ['Deans', 'Department Chairs', 'Faculty Senate']
            }
        },
        {
            id: 3,
            name: 'Graduation Rate Predictor',
            type: 'Predictive Model',
            domain: 'Institutional Research',
            assets: 5,
            owners: [
                { firstName: 'David', lastName: 'Miller', email: 'd.miller@university.edu', role: 'Chief Data Officer' },
                { firstName: 'Lisa', lastName: 'Thompson', email: 'l.thompson@university.edu', role: 'Data Scientist' }
            ],
            status: 'Published',
            quality: 'Fair 76.2',
            lastUpdated: '2023-11-02',
            description: 'Machine learning model predicting graduation likelihood based on early academic indicators',
            tags: ['Student Success', 'Early Warning', 'Retention'],
            usageStats: {
                weeklyViews: 87,
                frequentUsers: ['Advisors', 'Retention Specialists', 'Student Affairs']
            }
        },
        {
            id: 4,
            name: 'Research Grant Portfolio',
            type: 'Financial Dashboard',
            domain: 'Research Office',
            assets: 7,
            owners: [
                { firstName: 'Jennifer', lastName: 'Wilson', email: 'j.wilson@university.edu', role: 'VPR of Research' },
                { firstName: 'Thomas', lastName: 'Brown', email: 't.brown@university.edu', role: 'Grants Analyst' }
            ],
            status: 'Published',
            quality: 'Healthy 94.1',
            lastUpdated: '2023-10-22',
            description: 'Tracking of all active research grants with expenditure analytics and renewal forecasts',
            tags: ['Sponsored Research', 'Faculty Funding', 'Financial Oversight'],
            usageStats: {
                weeklyViews: 63,
                frequentUsers: ['Research Office', 'College Deans', 'PI Dashboard']
            }
        },
        {
            id: 5,
            name: 'Student Wellness Indicators',
            type: 'Integrated Dataset',
            domain: 'Student Affairs',
            assets: 9,
            owners: [
                { firstName: 'Patricia', lastName: 'Garcia', email: 'p.garcia@university.edu', role: 'Dean of Students' },
                { firstName: 'James', lastName: 'Lee', email: 'j.lee@university.edu', role: 'Wellness Coordinator' }
            ],
            status: 'Draft',
            quality: 'Fair 68.9',
            lastUpdated: '2023-11-15',
            description: 'Integrated data from counseling, health center, and academic alerts for early intervention',
            tags: ['Student Health', 'Mental Wellness', 'Early Alert'],
            usageStats: {
                weeklyViews: 42,
                frequentUsers: ['Counseling Center', 'Residence Life', 'Academic Advisors']
            }
        },
        {
            id: 6,
            name: 'Alumni Giving Patterns',
            type: 'Advancement Analytics',
            domain: 'University Advancement',
            assets: 6,
            owners: [
                { firstName: 'Richard', lastName: 'Martinez', email: 'r.martinez@university.edu', role: 'VP of Advancement' },
                { firstName: 'Amanda', lastName: 'Taylor', email: 'a.taylor@university.edu', role: 'Donor Relations' }
            ],
            status: 'Published',
            quality: 'Healthy 89.7',
            lastUpdated: '2023-09-15',
            description: 'Analysis of donor patterns, campaign effectiveness, and alumni engagement metrics',
            tags: ['Fundraising', 'Donor Relations', 'Campaign Strategy'],
            usageStats: {
                weeklyViews: 78,
                frequentUsers: ['Advancement Office', 'President\'s Office', 'Trustees']
            }
        },
        {
            id: 7,
            name: 'Faculty Workload Equity',
            type: 'Faculty Analytics',
            domain: 'Academic Affairs',
            assets: 4,
            owners: [
                { firstName: 'Elizabeth', lastName: 'Anderson', email: 'e.anderson@university.edu', role: 'Associate Provost' },
                { firstName: 'Daniel', lastName: 'Harris', email: 'd.harris@university.edu', role: 'Faculty Affairs' }
            ],
            status: 'Draft',
            quality: '--',
            lastUpdated: '2023-11-18',
            description: 'Comparative analysis of teaching, research and service loads across departments',
            tags: ['Faculty Governance', 'Workload Analysis', 'Equity'],
            usageStats: {
                weeklyViews: 31,
                frequentUsers: ['Provost Office', 'Faculty Senate', 'Department Chairs']
            }
        },
        {
            id: 8,
            name: 'STEM Retention Pipeline',
            type: 'Longitudinal Study',
            domain: 'Undergraduate Education',
            assets: 11,
            owners: [
                { firstName: 'Christopher', lastName: 'Clark', email: 'c.clark@university.edu', role: 'STEM Dean' },
                { firstName: 'Jessica', lastName: 'Lewis', email: 'j.lewis@university.edu', role: 'Retention Specialist' }
            ],
            status: 'Published',
            quality: 'Healthy 91.3',
            lastUpdated: '2023-08-30',
            description: 'Tracking student progression through STEM majors with intervention effectiveness metrics',
            tags: ['STEM Education', 'Student Success', 'Pathway Analysis'],
            usageStats: {
                weeklyViews: 56,
                frequentUsers: ['STEM Advisors', 'First-Year Programs', 'Department Chairs']
            }
        },
        {
            id: 11,
            name: 'Student Enrollment Trends',
            type: 'Analytical Dashboard',
            domain: 'Admissions',
            assets: 8,
            owners: [
                { firstName: 'Sarah', lastName: 'Johnson', email: 's.johnson@university.edu', role: 'Director of Admissions' },
                { firstName: 'Michael', lastName: 'Chen', email: 'm.chen@university.edu', role: 'Data Analyst' }
            ],
            status: 'Published',
            quality: 'Healthy 92.5',
            lastUpdated: '2023-10-15',
            description: 'Interactive dashboard showing enrollment trends by department, demographics, and geographic origin',
            tags: ['Admissions', 'Demographics', 'Trend Analysis'],
            usageStats: {
                weeklyViews: 145,
                frequentUsers: ['Admissions Office', 'Deans', 'Department Heads']
            }
        },
        {
            id: 12,
            name: 'Course Evaluation Analytics',
            type: 'Assessment Reports',
            domain: 'Academic Affairs',
            assets: 12,
            owners: [
                { firstName: 'Robert', lastName: 'Williams', email: 'r.williams@university.edu', role: 'Provost' },
                { firstName: 'Emily', lastName: 'Davis', email: 'e.davis@university.edu', role: 'Assessment Coordinator' }
            ],
            status: 'Published',
            quality: 'Healthy 88.3',
            lastUpdated: '2023-09-28',
            description: 'Comprehensive analysis of student course evaluations with faculty benchmarking',
            tags: ['Faculty Performance', 'Student Feedback', 'Quality Assurance'],
            usageStats: {
                weeklyViews: 210,
                frequentUsers: ['Deans', 'Department Chairs', 'Faculty Senate']
            }
        },
        {
            id: 13,
            name: 'Graduation Rate Predictor',
            type: 'Predictive Model',
            domain: 'Institutional Research',
            assets: 5,
            owners: [
                { firstName: 'David', lastName: 'Miller', email: 'd.miller@university.edu', role: 'Chief Data Officer' },
                { firstName: 'Lisa', lastName: 'Thompson', email: 'l.thompson@university.edu', role: 'Data Scientist' }
            ],
            status: 'Published',
            quality: 'Fair 76.2',
            lastUpdated: '2023-11-02',
            description: 'Machine learning model predicting graduation likelihood based on early academic indicators',
            tags: ['Student Success', 'Early Warning', 'Retention'],
            usageStats: {
                weeklyViews: 87,
                frequentUsers: ['Advisors', 'Retention Specialists', 'Student Affairs']
            }
        },
        {
            id: 14,
            name: 'Research Grant Portfolio',
            type: 'Financial Dashboard',
            domain: 'Research Office',
            assets: 7,
            owners: [
                { firstName: 'Jennifer', lastName: 'Wilson', email: 'j.wilson@university.edu', role: 'VPR of Research' },
                { firstName: 'Thomas', lastName: 'Brown', email: 't.brown@university.edu', role: 'Grants Analyst' }
            ],
            status: 'Published',
            quality: 'Healthy 94.1',
            lastUpdated: '2023-10-22',
            description: 'Tracking of all active research grants with expenditure analytics and renewal forecasts',
            tags: ['Sponsored Research', 'Faculty Funding', 'Financial Oversight'],
            usageStats: {
                weeklyViews: 63,
                frequentUsers: ['Research Office', 'College Deans', 'PI Dashboard']
            }
        },
        {
            id: 15,
            name: 'Student Wellness Indicators',
            type: 'Integrated Dataset',
            domain: 'Student Affairs',
            assets: 9,
            owners: [
                { firstName: 'Patricia', lastName: 'Garcia', email: 'p.garcia@university.edu', role: 'Dean of Students' },
                { firstName: 'James', lastName: 'Lee', email: 'j.lee@university.edu', role: 'Wellness Coordinator' }
            ],
            status: 'Draft',
            quality: 'Fair 68.9',
            lastUpdated: '2023-11-15',
            description: 'Integrated data from counseling, health center, and academic alerts for early intervention',
            tags: ['Student Health', 'Mental Wellness', 'Early Alert'],
            usageStats: {
                weeklyViews: 42,
                frequentUsers: ['Counseling Center', 'Residence Life', 'Academic Advisors']
            }
        },
        {
            id: 16,
            name: 'Alumni Giving Patterns',
            type: 'Advancement Analytics',
            domain: 'University Advancement',
            assets: 6,
            owners: [
                { firstName: 'Richard', lastName: 'Martinez', email: 'r.martinez@university.edu', role: 'VP of Advancement' },
                { firstName: 'Amanda', lastName: 'Taylor', email: 'a.taylor@university.edu', role: 'Donor Relations' }
            ],
            status: 'Published',
            quality: 'Healthy 89.7',
            lastUpdated: '2023-09-15',
            description: 'Analysis of donor patterns, campaign effectiveness, and alumni engagement metrics',
            tags: ['Fundraising', 'Donor Relations', 'Campaign Strategy'],
            usageStats: {
                weeklyViews: 78,
                frequentUsers: ['Advancement Office', 'President\'s Office', 'Trustees']
            }
        }
    ];
