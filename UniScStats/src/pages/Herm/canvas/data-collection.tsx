// Enhanced data collections with schema information and data classification

import {
    Users,
    GraduationCap,
    DollarSign,
    Building,
    Shield,
    Globe,
    Monitor,
    Heart,
    Settings,
    Activity,
    FileText,
    BarChart3,
    Database
} from 'lucide-react';

// Data sensitivity classification levels
const SensitivityLevels = {
    PUBLIC: { level: 'Public', description: 'No restrictions, can be publicly shared', color: 'bg-green-100 text-green-800' },
    INTERNAL: { level: 'Internal', description: 'General business use, no sensitive data', color: 'bg-blue-100 text-blue-800' },
    CONFIDENTIAL: { level: 'Confidential', description: 'Sensitive business data', color: 'bg-yellow-100 text-yellow-800' },
    HIGHLY_CONFIDENTIAL: { level: 'Highly Confidential', description: 'Very sensitive business data', color: 'bg-orange-100 text-orange-800' },
    RESTRICTED: { level: 'Restricted', description: 'Highly sensitive personal or regulated data', color: 'bg-red-100 text-red-800' }
};

export const dataCollections = [
    {
        id: 1,
        name: 'Student Information',
        icon: Database,
        color: 'bg-blue-100 text-blue-600',
        entities: [
           {
    id: 1,
    name: 'student_enrollment',
    type: 'SQL Server Table',
    source: 'SQL Server 2022',
    description: 'Core student enrollment data with academic records including personal, academic, and financial information',
    records: '1,156,432',
    lastUpdated: '2 hours ago',
    format: 'Relational',
    schema: [
        { 
            name: 'student_id', 
            type: 'BIGINT', 
            primaryKey: true, 
            description: 'Unique student identifier (SIS generated)', 
            sensitivity: SensitivityLevels.RESTRICTED,
            constraints: 'NOT NULL, IDENTITY(1000000,1)',
            example: '1001234'
        },
        { 
            name: 'university_id', 
            type: 'VARCHAR(12)', 
            description: 'Public student ID number', 
            sensitivity: SensitivityLevels.CONFIDENTIAL,
            constraints: 'NOT NULL, UNIQUE',
            example: 'U2023-12345'
        },
        { 
            name: 'enrollment_date', 
            type: 'DATETIME2', 
            description: 'Date of initial enrollment at university', 
            sensitivity: SensitivityLevels.INTERNAL,
            constraints: 'NOT NULL',
            example: '2023-08-15 00:00:00'
        },
        { 
            name: 'program_code', 
            type: 'VARCHAR(10)', 
            description: 'Academic program code (reference to programs table)', 
            sensitivity: SensitivityLevels.INTERNAL,
            constraints: 'NOT NULL, FOREIGN KEY',
            example: 'CS-BS'
        },
        { 
            name: 'program_name', 
            type: 'VARCHAR(100)', 
            description: 'Academic program display name', 
            sensitivity: SensitivityLevels.INTERNAL,
            example: 'Computer Science, B.S.'
        },
        { 
            name: 'status', 
            type: 'VARCHAR(20)', 
            description: 'Current enrollment status', 
            sensitivity: SensitivityLevels.INTERNAL,
            constraints: 'NOT NULL, CHECK (status IN ("Active", "Graduated", "Withdrawn", "On Leave"))',
            example: 'Active'
        },
        { 
            name: 'enrollment_level', 
            type: 'VARCHAR(15)', 
            description: 'Undergraduate/Graduate/Doctoral', 
            sensitivity: SensitivityLevels.INTERNAL,
            constraints: 'NOT NULL',
            example: 'Undergraduate'
        },
        { 
            name: 'credits_earned', 
            type: 'DECIMAL(5,2)', 
            description: 'Total academic credits earned toward degree', 
            sensitivity: SensitivityLevels.CONFIDENTIAL,
            constraints: 'DEFAULT 0.00',
            example: '45.50'
        },
        { 
            name: 'credits_transferred', 
            type: 'DECIMAL(5,2)', 
            description: 'Credits transferred from other institutions', 
            sensitivity: SensitivityLevels.CONFIDENTIAL,
            constraints: 'DEFAULT 0.00',
            example: '12.00'
        },
        { 
            name: 'gpa', 
            type: 'DECIMAL(3,2)', 
            description: 'Current cumulative GPA', 
            sensitivity: SensitivityLevels.RESTRICTED,
            constraints: 'CHECK (gpa BETWEEN 0.00 AND 4.00)',
            example: '3.45'
        },
        { 
            name: 'academic_standing', 
            type: 'VARCHAR(30)', 
            description: 'Good standing, probation, etc.', 
            sensitivity: SensitivityLevels.CONFIDENTIAL,
            example: 'Good Standing'
        },
        { 
            name: 'expected_graduation', 
            type: 'DATE', 
            description: 'Projected graduation date', 
            sensitivity: SensitivityLevels.INTERNAL,
            example: '2026-05-15'
        },
        { 
            name: 'primary_college', 
            type: 'VARCHAR(10)', 
            description: 'Home college/department code', 
            sensitivity: SensitivityLevels.INTERNAL,
            example: 'ENG'
        },
        { 
            name: 'primary_major', 
            type: 'VARCHAR(10)', 
            description: 'Primary major code', 
            sensitivity: SensitivityLevels.INTERNAL,
            example: 'CS'
        },
        { 
            name: 'secondary_major', 
            type: 'VARCHAR(10)', 
            description: 'Secondary major code if applicable', 
            sensitivity: SensitivityLevels.INTERNAL,
            example: 'MATH'
        },
        { 
            name: 'minor', 
            type: 'VARCHAR(10)', 
            description: 'Minor code if applicable', 
            sensitivity: SensitivityLevels.INTERNAL,
            example: 'BUS'
        },
        { 
            name: 'advisor_id', 
            type: 'BIGINT', 
            description: 'Primary academic advisor ID', 
            sensitivity: SensitivityLevels.INTERNAL,
            constraints: 'FOREIGN KEY',
            example: '500123'
        },
        { 
            name: 'financial_aid_eligible', 
            type: 'BIT', 
            description: 'Flag for financial aid eligibility', 
            sensitivity: SensitivityLevels.CONFIDENTIAL,
            example: '1'
        },
        { 
            name: 'tuition_residency', 
            type: 'VARCHAR(20)', 
            description: 'Residency status for tuition calculation', 
            sensitivity: SensitivityLevels.CONFIDENTIAL,
            constraints: 'CHECK (tuition_residency IN ("In-State", "Out-of-State", "International"))',
            example: 'In-State'
        },
        { 
            name: 'created_date', 
            type: 'DATETIME2', 
            description: 'Record creation timestamp', 
            sensitivity: SensitivityLevels.INTERNAL,
            constraints: 'NOT NULL, DEFAULT GETDATE()'
        },
        { 
            name: 'modified_date', 
            type: 'DATETIME2', 
            description: 'Record last modified timestamp', 
            sensitivity: SensitivityLevels.INTERNAL,
            constraints: 'NOT NULL, DEFAULT GETDATE()'
        },
        { 
            name: 'modified_by', 
            type: 'VARCHAR(50)', 
            description: 'User/system that last modified record', 
            sensitivity: SensitivityLevels.INTERNAL,
            example: 'SIS_IMPORT'
        },
        { 
            name: 'is_active', 
            type: 'BIT', 
            description: 'Active record flag', 
            sensitivity: SensitivityLevels.INTERNAL,
            constraints: 'NOT NULL, DEFAULT 1',
            example: '1'
        }
    ],
    classification: {
        overallSensitivity: SensitivityLevels.RESTRICTED,
        complianceStandards: ['FERPA', 'GDPR', 'HIPAA (for health-related programs)'],
        dataSubjects: ['Students', 'Academic Records', 'Financial Aid'],
        retentionPolicy: '7 years after last enrollment or graduation',
        accessControls: 'Role-based access, encryption at rest, column-level security for sensitive fields',
        dataOwners: ['Registrar Office', 'Academic Affairs'],
        dataStewards: ['SIS Administrators', 'Data Governance Team'],
        dataUsage: [
            'Academic advising',
            'Degree progress tracking',
            'Accreditation reporting',
            'Tuition calculation'
        ]
    },
    indexes: [
        {
            name: 'PK_student_enrollment',
            type: 'CLUSTERED',
            columns: ['student_id'],
            description: 'Primary key index'
        },
        {
            name: 'IX_student_enrollment_university_id',
            type: 'NONCLUSTERED',
            columns: ['university_id'],
            description: 'Lookup index for public student ID'
        },
        {
            name: 'IX_student_enrollment_program_status',
            type: 'NONCLUSTERED',
            columns: ['program_code', 'status'],
            description: 'Performance index for enrollment reports'
        }
    ],
    foreignKeys: [
        {
            name: 'FK_student_enrollment_programs',
            referenceTable: 'academic_programs',
            columns: ['program_code'],
            referenceColumns: ['program_code'],
            description: 'Links to academic programs catalog'
        },
        {
            name: 'FK_student_enrollment_advisors',
            referenceTable: 'faculty',
            columns: ['advisor_id'],
            referenceColumns: ['faculty_id'],
            description: 'Links to faculty advisor records'
        }
    ]
},
            {
                id: 2,
                name: 'StudentAnalytics_Dataset',
                type: 'Power BI Dataset',
                source: 'Power BI Service',
                description: 'Transformed student data for executive dashboards',
                records: '1,156,432',
                lastUpdated: '4 hours ago',
                format: 'Semantic Model',
                classification: {
                    overallSensitivity: SensitivityLevels.CONFIDENTIAL,
                    complianceStandards: ['FERPA'],
                    dataSubjects: ['Students'],
                    retentionPolicy: '5 years',
                    accessControls: 'Power BI workspace permissions'
                }
            },
            {
                id: 7,
                name: 'student_demographics',
                type: 'SQL Server Table',
                source: 'SQL Server 2022',
                description: 'Student demographic and background information',
                records: '154,892',
                lastUpdated: '6 hours ago',
                format: 'Relational',
                schema: [
                    { name: 'student_id', type: 'BIGINT', primaryKey: true, sensitivity: SensitivityLevels.RESTRICTED },
                    { name: 'age_group', type: 'VARCHAR(20)', sensitivity: SensitivityLevels.CONFIDENTIAL },
                    { name: 'gender', type: 'VARCHAR(10)', sensitivity: SensitivityLevels.CONFIDENTIAL },
                    { name: 'ethnicity', type: 'VARCHAR(50)', sensitivity: SensitivityLevels.CONFIDENTIAL },
                    { name: 'first_generation', type: 'BIT', sensitivity: SensitivityLevels.CONFIDENTIAL },
                    { name: 'socioeconomic_status', type: 'VARCHAR(20)', sensitivity: SensitivityLevels.RESTRICTED }
                ],
                classification: {
                    overallSensitivity: SensitivityLevels.RESTRICTED,
                    complianceStandards: ['FERPA', 'Title IX'],
                    dataSubjects: ['Students'],
                    retentionPolicy: '10 years',
                    accessControls: 'Role-based access, data masking'
                }
            },
            {
                id: 8,
                name: 'student_academic_history',
                type: 'Azure Synapse Table',
                source: 'Azure Synapse Analytics',
                description: 'Historical academic performance and progression data',
                records: '2,847,293',
                lastUpdated: '3 hours ago',
                format: 'Delta Lake',
                classification: {
                    overallSensitivity: SensitivityLevels.RESTRICTED,
                    complianceStandards: ['FERPA'],
                    dataSubjects: ['Students'],
                    retentionPolicy: 'Permanent',
                    accessControls: 'Column-level security, row-level security'
                }
            },
            {
                id: 9,
                name: 'student_engagement_metrics',
                type: 'Cosmos DB Collection',
                source: 'Azure Cosmos DB',
                description: 'Digital engagement and platform usage analytics',
                records: '15,923,847',
                lastUpdated: '30 minutes ago',
                format: 'JSON Document',
                classification: {
                    overallSensitivity: SensitivityLevels.CONFIDENTIAL,
                    complianceStandards: ['FERPA'],
                    dataSubjects: ['Students'],
                    retentionPolicy: '3 years',
                    accessControls: 'Azure AD authentication'
                }
            }
        ]
    },
    {
        id: 2,
        name: 'Financial Analytics',
        icon: BarChart3,
        color: 'bg-green-100 text-green-600',
        entities: [
            {
                id: 3,
                name: 'tuition_payments',
                type: 'Azure Synapse Table',
                source: 'Azure Synapse Analytics',
                description: 'Student tuition and fee payment records',
                records: '892,156',
                lastUpdated: '1 hour ago',
                format: 'Parquet',
                schema: [
                    { name: 'payment_id', type: 'BIGINT', primaryKey: true, sensitivity: SensitivityLevels.INTERNAL },
                    { name: 'student_id', type: 'BIGINT', description: 'References student_enrollment', sensitivity: SensitivityLevels.RESTRICTED },
                    { name: 'amount', type: 'DECIMAL(10,2)', sensitivity: SensitivityLevels.CONFIDENTIAL },
                    { name: 'payment_date', type: 'DATE', sensitivity: SensitivityLevels.INTERNAL },
                    { name: 'payment_method', type: 'VARCHAR(50)', sensitivity: SensitivityLevels.CONFIDENTIAL }
                ],
                classification: {
                    overallSensitivity: SensitivityLevels.HIGHLY_CONFIDENTIAL,
                    complianceStandards: ['PCI DSS', 'FERPA'],
                    dataSubjects: ['Students', 'Payment Processors'],
                    retentionPolicy: '7 years',
                    accessControls: 'Encryption, limited access roles'
                }
            },
            {
                id: 4,
                name: 'financial_summary_notebook',
                type: 'Databricks Notebook',
                source: 'Azure Databricks',
                description: 'Monthly financial analytics and forecasting models',
                records: '45 cells',
                lastUpdated: '6 hours ago',
                format: 'Python/SQL',
                classification: {
                    overallSensitivity: SensitivityLevels.CONFIDENTIAL,
                    complianceStandards: ['SOX'],
                    dataSubjects: ['Financial Data'],
                    retentionPolicy: '5 years',
                    accessControls: 'Databricks cluster access control'
                }
            },
            {
                id: 10,
                name: 'budget_allocations',
                type: 'Power BI Dataset',
                source: 'Power BI Service',
                description: 'University departmental budget allocation and spending',
                records: '24,567',
                lastUpdated: '1 day ago',
                format: 'Semantic Model',
                classification: {
                    overallSensitivity: SensitivityLevels.CONFIDENTIAL,
                    complianceStandards: ['Internal Policies'],
                    dataSubjects: ['Financial Data'],
                    retentionPolicy: '7 years',
                    accessControls: 'Power BI workspace permissions'
                }
            },
            {
                id: 11,
                name: 'financial_aid_disbursements',
                type: 'SQL Server Table',
                source: 'SQL Server 2022',
                description: 'Student financial aid and scholarship distributions',
                records: '487,293',
                lastUpdated: '4 hours ago',
                format: 'Relational',
                classification: {
                    overallSensitivity: SensitivityLevels.HIGHLY_CONFIDENTIAL,
                    complianceStandards: ['FERPA', 'Title IV'],
                    dataSubjects: ['Students', 'Financial Aid'],
                    retentionPolicy: '10 years',
                    accessControls: 'Role-based access, audit logging'
                }
            },
            {
                id: 12,
                name: 'revenue_forecasting_model',
                type: 'Azure ML Model',
                source: 'Azure Machine Learning',
                description: 'Predictive model for university revenue forecasting',
                records: 'Model v3.2',
                lastUpdated: '2 days ago',
                format: 'MLflow',
                classification: {
                    overallSensitivity: SensitivityLevels.CONFIDENTIAL,
                    complianceStandards: ['Internal Policies'],
                    dataSubjects: ['Financial Data'],
                    retentionPolicy: 'Indefinite',
                    accessControls: 'Azure ML workspace permissions'
                }
            }
        ]
    },
    {
        id: 3,
        name: 'Research Data',
        icon: FileText,
        color: 'bg-purple-100 text-purple-600',
        entities: [
            {
                id: 5,
                name: 'research_publications',
                type: 'Cosmos DB Collection',
                source: 'Azure Cosmos DB',
                description: 'Faculty research publications and citations',
                records: '12,847',
                lastUpdated: '3 days ago',
                format: 'JSON Document',
                classification: {
                    overallSensitivity: SensitivityLevels.INTERNAL,
                    complianceStandards: ['Copyright'],
                    dataSubjects: ['Faculty', 'Researchers'],
                    retentionPolicy: 'Permanent',
                    accessControls: 'Public read, restricted write'
                }
            },
            {
                id: 6,
                name: 'research_pipeline',
                type: 'Azure Data Factory Pipeline',
                source: 'Azure Data Factory',
                description: 'ETL pipeline for research data ingestion',
                records: '15 activities',
                lastUpdated: '12 hours ago',
                format: 'JSON',
                classification: {
                    overallSensitivity: SensitivityLevels.INTERNAL,
                    complianceStandards: [],
                    dataSubjects: ['Research Data'],
                    retentionPolicy: '1 year',
                    accessControls: 'ADF managed identity'
                }
            },
            {
                id: 13,
                name: 'grant_applications',
                type: 'SharePoint List',
                source: 'Microsoft SharePoint',
                description: 'Research grant applications and funding status',
                records: '3,847',
                lastUpdated: '5 hours ago',
                format: 'SharePoint',
                classification: {
                    overallSensitivity: SensitivityLevels.CONFIDENTIAL,
                    complianceStandards: ['Grantor Requirements'],
                    dataSubjects: ['Researchers', 'Funding Agencies'],
                    retentionPolicy: '7 years after project end',
                    accessControls: 'SharePoint permissions'
                }
            },
            {
                id: 14,
                name: 'research_collaboration_network',
                type: 'Graph Database',
                source: 'Neo4j',
                description: 'Research collaboration networks and partnerships',
                records: '89,472 nodes',
                lastUpdated: '1 day ago',
                format: 'Graph',
                classification: {
                    overallSensitivity: SensitivityLevels.INTERNAL,
                    complianceStandards: [],
                    dataSubjects: ['Researchers'],
                    retentionPolicy: '5 years',
                    accessControls: 'Neo4j role-based access'
                }
            },
            {
                id: 15,
                name: 'citation_impact_analysis',
                type: 'Databricks Notebook',
                source: 'Azure Databricks',
                description: 'Research impact and citation analysis workflows',
                records: '67 cells',
                lastUpdated: '8 hours ago',
                format: 'Python/Scala',
                classification: {
                    overallSensitivity: SensitivityLevels.INTERNAL,
                    complianceStandards: [],
                    dataSubjects: ['Research Data'],
                    retentionPolicy: '3 years',
                    accessControls: 'Databricks access control'
                }
            }
        ]
    },
    {
        id: 4,
        name: 'Academic Performance',
        icon: Activity,
        color: 'bg-orange-100 text-orange-600',
        entities: [
            {
                id: 16,
                name: 'course_grades',
                type: 'SQL Server Table',
                source: 'SQL Server 2022',
                description: 'Student course grades and academic performance',
                records: '4,892,734',
                lastUpdated: '1 hour ago',
                format: 'Relational',
                schema: [
                    { name: 'grade_id', type: 'BIGINT', primaryKey: true, sensitivity: SensitivityLevels.INTERNAL },
                    { name: 'student_id', type: 'BIGINT', sensitivity: SensitivityLevels.RESTRICTED },
                    { name: 'course_id', type: 'VARCHAR(20)', sensitivity: SensitivityLevels.INTERNAL },
                    { name: 'grade', type: 'VARCHAR(5)', sensitivity: SensitivityLevels.RESTRICTED },
                    { name: 'credits', type: 'DECIMAL(3,1)', sensitivity: SensitivityLevels.INTERNAL },
                    { name: 'semester', type: 'VARCHAR(20)', sensitivity: SensitivityLevels.INTERNAL }
                ],
                classification: {
                    overallSensitivity: SensitivityLevels.RESTRICTED,
                    complianceStandards: ['FERPA'],
                    dataSubjects: ['Students'],
                    retentionPolicy: 'Permanent',
                    accessControls: 'Row-level security, data masking'
                }
            },
            {
                id: 17,
                name: 'learning_analytics_dashboard',
                type: 'Power BI Report',
                source: 'Power BI Service',
                description: 'Real-time learning analytics and performance metrics',
                records: '25 visuals',
                lastUpdated: '45 minutes ago',
                format: 'Power BI',
                classification: {
                    overallSensitivity: SensitivityLevels.CONFIDENTIAL,
                    complianceStandards: ['FERPA'],
                    dataSubjects: ['Students'],
                    retentionPolicy: '3 years',
                    accessControls: 'Power BI RLS'
                }
            },
            {
                id: 18,
                name: 'course_evaluation_responses',
                type: 'Azure Data Lake',
                source: 'Azure Data Lake Gen2',
                description: 'Student course evaluation and feedback responses',
                records: '1,284,567',
                lastUpdated: '2 days ago',
                format: 'Parquet',
                classification: {
                    overallSensitivity: SensitivityLevels.CONFIDENTIAL,
                    complianceStandards: ['FERPA'],
                    dataSubjects: ['Students', 'Faculty'],
                    retentionPolicy: '5 years',
                    accessControls: 'ADLS ACLs, encryption'
                }
            },
            {
                id: 19,
                name: 'graduation_prediction_model',
                type: 'Azure ML Model',
                source: 'Azure Machine Learning',
                description: 'ML model predicting student graduation likelihood',
                records: 'Model v4.1',
                lastUpdated: '1 week ago',
                format: 'MLflow',
                classification: {
                    overallSensitivity: SensitivityLevels.CONFIDENTIAL,
                    complianceStandards: ['FERPA'],
                    dataSubjects: ['Students'],
                    retentionPolicy: 'Until superseded',
                    accessControls: 'Azure ML workspace permissions'
                }
            },
            {
                id: 20,
                name: 'academic_intervention_tracker',
                type: 'Microsoft Fabric Lakehouse',
                source: 'Microsoft Fabric',
                description: 'Tracking academic interventions and success rates',
                records: '67,843',
                lastUpdated: '3 hours ago',
                format: 'Delta Tables',
                classification: {
                    overallSensitivity: SensitivityLevels.RESTRICTED,
                    complianceStandards: ['FERPA'],
                    dataSubjects: ['Students'],
                    retentionPolicy: '7 years',
                    accessControls: 'Fabric permissions, row-level security'
                }
            }
        ]
    },
    {
        id: 5,
        name: 'Faculty & Staff',
        icon: Users,
        color: 'bg-indigo-100 text-indigo-600',
        entities: [
            {
                id: 21,
                name: 'faculty_profiles',
                type: 'SQL Server Table',
                source: 'SQL Server 2022',
                description: 'Faculty member profiles and academic credentials',
                records: '8,947',
                lastUpdated: '1 day ago',
                format: 'Relational',
                classification: {
                    overallSensitivity: SensitivityLevels.CONFIDENTIAL,
                    complianceStandards: ['Employment Contracts'],
                    dataSubjects: ['Faculty'],
                    retentionPolicy: '10 years after separation',
                    accessControls: 'HR role-based access'
                }
            },
            {
                id: 22,
                name: 'teaching_workload_analysis',
                type: 'Power BI Dataset',
                source: 'Power BI Service',
                description: 'Faculty teaching loads and course assignments',
                records: '12,847',
                lastUpdated: '6 hours ago',
                format: 'Semantic Model',
                classification: {
                    overallSensitivity: SensitivityLevels.INTERNAL,
                    complianceStandards: [],
                    dataSubjects: ['Faculty'],
                    retentionPolicy: '5 years',
                    accessControls: 'Department-level access'
                }
            },
            {
                id: 23,
                name: 'hr_employee_data',
                type: 'Azure Synapse Table',
                source: 'Azure Synapse Analytics',
                description: 'Staff and faculty HR information and metrics',
                records: '15,672',
                lastUpdated: '12 hours ago',
                format: 'Delta Lake',
                classification: {
                    overallSensitivity: SensitivityLevels.HIGHLY_CONFIDENTIAL,
                    complianceStandards: ['HIPAA', 'Employment Law'],
                    dataSubjects: ['Employees'],
                    retentionPolicy: '7 years after separation',
                    accessControls: 'HR role-based access, encryption'
                }
            },
            {
                id: 24,
                name: 'professional_development_tracking',
                type: 'Cosmos DB Collection',
                source: 'Azure Cosmos DB',
                description: 'Faculty professional development and training records',
                records: '47,293',
                lastUpdated: '2 days ago',
                format: 'JSON Document',
                classification: {
                    overallSensitivity: SensitivityLevels.CONFIDENTIAL,
                    complianceStandards: [],
                    dataSubjects: ['Faculty'],
                    retentionPolicy: '5 years',
                    accessControls: 'Department head access'
                }
            }
        ]
    },
    {
        id: 6,
        name: 'Campus Operations',
        icon: Settings,
        color: 'bg-yellow-100 text-yellow-600',
        entities: [
            {
                id: 25,
                name: 'facility_utilization',
                type: 'IoT Hub Data',
                source: 'Azure IoT Hub',
                description: 'Real-time campus facility and room utilization data',
                records: '2.4M sensors',
                lastUpdated: '5 minutes ago',
                format: 'Time Series',
                classification: {
                    overallSensitivity: SensitivityLevels.INTERNAL,
                    complianceStandards: [],
                    dataSubjects: ['Facility Data'],
                    retentionPolicy: '1 year',
                    accessControls: 'Facilities management access'
                }
            },
            {
                id: 26,
                name: 'energy_consumption_analytics',
                type: 'Power BI Dataset',
                source: 'Power BI Service',
                description: 'Campus energy usage and sustainability metrics',
                records: '892,847',
                lastUpdated: '30 minutes ago',
                format: 'Semantic Model',
                classification: {
                    overallSensitivity: SensitivityLevels.INTERNAL,
                    complianceStandards: [],
                    dataSubjects: ['Facility Data'],
                    retentionPolicy: '3 years',
                    accessControls: 'Public dashboards, detailed data restricted'
                }
            },
            {
                id: 27,
                name: 'maintenance_work_orders',
                type: 'ServiceNow API',
                source: 'ServiceNow',
                description: 'Campus maintenance requests and completion tracking',
                records: '34,892',
                lastUpdated: '1 hour ago',
                format: 'REST API',
                classification: {
                    overallSensitivity: SensitivityLevels.INTERNAL,
                    complianceStandards: [],
                    dataSubjects: ['Facility Data'],
                    retentionPolicy: '3 years',
                    accessControls: 'ServiceNow roles'
                }
            },
            {
                id: 28,
                name: 'parking_optimization_model',
                type: 'Azure ML Model',
                source: 'Azure Machine Learning',
                description: 'Campus parking allocation and optimization model',
                records: 'Model v2.8',
                lastUpdated: '3 days ago',
                format: 'MLflow',
                classification: {
                    overallSensitivity: SensitivityLevels.INTERNAL,
                    complianceStandards: [],
                    dataSubjects: ['Facility Data'],
                    retentionPolicy: 'Until superseded',
                    accessControls: 'Facilities management access'
                }
            },
            {
                id: 29,
                name: 'security_incident_logs',
                type: 'Azure Sentinel',
                source: 'Microsoft Sentinel',
                description: 'Campus security incidents and threat intelligence',
                records: '127,834',
                lastUpdated: '15 minutes ago',
                format: 'Log Analytics',
                classification: {
                    overallSensitivity: SensitivityLevels.HIGHLY_CONFIDENTIAL,
                    complianceStandards: ['Security Policies'],
                    dataSubjects: ['Security Data'],
                    retentionPolicy: '7 years',
                    accessControls: 'Security team access only'
                }
            }
        ]
    },
    {
        id: 7,
        name: 'Alumni & Engagement',
        icon: Heart,
        color: 'bg-pink-100 text-pink-600',
        entities: [
            {
                id: 30,
                name: 'alumni_database',
                type: 'CRM Database',
                source: 'Dynamics 365',
                description: 'Alumni contact information and engagement history',
                records: '284,739',
                lastUpdated: '4 hours ago',
                format: 'CRM',
                classification: {
                    overallSensitivity: SensitivityLevels.CONFIDENTIAL,
                    complianceStandards: ['GDPR'],
                    dataSubjects: ['Alumni'],
                    retentionPolicy: 'Indefinite with opt-out',
                    accessControls: 'Development office access'
                }
            },
            {
                id: 31,
                name: 'donation_tracking',
                type: 'SQL Server Table',
                source: 'SQL Server 2022',
                description: 'Alumni and donor contribution tracking',
                records: '156,847',
                lastUpdated: '2 hours ago',
                format: 'Relational',
                classification: {
                    overallSensitivity: SensitivityLevels.HIGHLY_CONFIDENTIAL,
                    complianceStandards: ['Tax Regulations'],
                    dataSubjects: ['Donors'],
                    retentionPolicy: 'Permanent',
                    accessControls: 'Development office access, encryption'
                }
            },
            {
                id: 32,
                name: 'alumni_career_outcomes',
                type: 'Power BI Dataset',
                source: 'Power BI Service',
                description: 'Graduate career progression and outcome analytics',
                records: '89,472',
                lastUpdated: '1 day ago',
                format: 'Semantic Model',
                classification: {
                    overallSensitivity: SensitivityLevels.INTERNAL,
                    complianceStandards: [],
                    dataSubjects: ['Alumni'],
                    retentionPolicy: '10 years',
                    accessControls: 'Aggregate data public, individual data restricted'
                }
            },
            {
                id: 33,
                name: 'engagement_scoring_model',
                type: 'Azure ML Model',
                source: 'Azure Machine Learning',
                description: 'Alumni engagement prediction and scoring model',
                records: 'Model v1.9',
                lastUpdated: '5 days ago',
                format: 'MLflow',
                classification: {
                    overallSensitivity: SensitivityLevels.CONFIDENTIAL,
                    complianceStandards: [],
                    dataSubjects: ['Alumni'],
                    retentionPolicy: 'Until superseded',
                    accessControls: 'Development analytics team'
                }
            }
        ]
    },
    {
        id: 8,
        name: 'Digital Learning',
        icon: Monitor,
        color: 'bg-cyan-100 text-cyan-600',
        entities: [
            {
                id: 34,
                name: 'lms_activity_logs',
                type: 'Azure Data Lake',
                source: 'Azure Data Lake Gen2',
                description: 'Learning Management System user activity and engagement',
                records: '45.7M events',
                lastUpdated: '10 minutes ago',
                format: 'JSON Lines',
                classification: {
                    overallSensitivity: SensitivityLevels.CONFIDENTIAL,
                    complianceStandards: ['FERPA'],
                    dataSubjects: ['Students', 'Faculty'],
                    retentionPolicy: '3 years',
                    accessControls: 'Learning analytics team access'
                }
            },
            {
                id: 35,
                name: 'online_course_analytics',
                type: 'Power BI Dataset',
                source: 'Power BI Service',
                description: 'Online course performance and completion metrics',
                records: '234,892',
                lastUpdated: '1 hour ago',
                format: 'Semantic Model',
                classification: {
                    overallSensitivity: SensitivityLevels.INTERNAL,
                    complianceStandards: [],
                    dataSubjects: ['Students'],
                    retentionPolicy: '5 years',
                    accessControls: 'Aggregate data public, individual data restricted'
                }
            },
            {
                id: 36,
                name: 'video_engagement_metrics',
                type: 'Cosmos DB Collection',
                source: 'Azure Cosmos DB',
                description: 'Educational video viewing patterns and engagement',
                records: '8.9M interactions',
                lastUpdated: '20 minutes ago',
                format: 'JSON Document',
                classification: {
                    overallSensitivity: SensitivityLevels.INTERNAL,
                    complianceStandards: [],
                    dataSubjects: ['Students'],
                    retentionPolicy: '2 years',
                    accessControls: 'Course instructors access'
                }
            },
            {
                id: 37,
                name: 'learning_pathway_optimization',
                type: 'Databricks Notebook',
                source: 'Azure Databricks',
                description: 'ML-driven personalized learning pathway recommendations',
                records: '89 cells',
                lastUpdated: '6 hours ago',
                format: 'Python/MLlib',
                classification: {
                    overallSensitivity: SensitivityLevels.CONFIDENTIAL,
                    complianceStandards: ['FERPA'],
                    dataSubjects: ['Students'],
                    retentionPolicy: '3 years',
                    accessControls: 'Learning analytics team'
                }
            }
        ]
    },
    {
        id: 9,
        name: 'External Data Sources',
        icon: Globe,
        color: 'bg-teal-100 text-teal-600',
        entities: [
            {
                id: 38,
                name: 'national_education_statistics',
                type: 'External API',
                source: 'Department of Education API',
                description: 'National higher education benchmarking data',
                records: 'Real-time feed',
                lastUpdated: '1 hour ago',
                format: 'REST API',
                classification: {
                    overallSensitivity: SensitivityLevels.PUBLIC,
                    complianceStandards: [],
                    dataSubjects: ['Aggregate Data'],
                    retentionPolicy: '1 year',
                    accessControls: 'Public access'
                }
            },
            {
                id: 39,
                name: 'industry_employment_trends',
                type: 'Azure Data Share',
                source: 'Labor Statistics Bureau',
                description: 'Industry employment trends and salary benchmarks',
                records: '1.2M records',
                lastUpdated: '1 week ago',
                format: 'CSV/Parquet',
                classification: {
                    overallSensitivity: SensitivityLevels.PUBLIC,
                    complianceStandards: [],
                    dataSubjects: ['Aggregate Data'],
                    retentionPolicy: '2 years',
                    accessControls: 'Public dataset'
                }
            },
            {
                id: 40,
                name: 'competitor_analysis_data',
                type: 'Web Scraping Pipeline',
                source: 'Azure Data Factory',
                description: 'Competitor university metrics and rankings',
                records: '847 institutions',
                lastUpdated: '2 days ago',
                format: 'JSON',
                classification: {
                    overallSensitivity: SensitivityLevels.INTERNAL,
                    complianceStandards: [],
                    dataSubjects: ['Public Data'],
                    retentionPolicy: '1 year',
                    accessControls: 'Strategic planning access'
                }
            },
            {
                id: 41,
                name: 'economic_indicators',
                type: 'Bloomberg API',
                source: 'Bloomberg Terminal',
                description: 'Economic indicators affecting higher education',
                records: 'Time series',
                lastUpdated: '4 hours ago',
                format: 'Financial Data',
                classification: {
                    overallSensitivity: SensitivityLevels.INTERNAL,
                    complianceStandards: ['License Agreement'],
                    dataSubjects: ['Financial Data'],
                    retentionPolicy: '1 year',
                    accessControls: 'Finance office access'
                }
            }
        ]
    },
    {
        id: 10,
        name: 'Compliance & Governance',
        icon: Shield,
        color: 'bg-red-100 text-red-600',
        entities: [
            {
                id: 42,
                name: 'data_classification_catalog',
                type: 'Microsoft Purview',
                source: 'Microsoft Purview',
                description: 'Data asset classification and sensitivity labeling',
                records: '12,847 assets',
                lastUpdated: '30 minutes ago',
                format: 'Metadata',
                classification: {
                    overallSensitivity: SensitivityLevels.HIGHLY_CONFIDENTIAL,
                    complianceStandards: ['GDPR', 'CCPA'],
                    dataSubjects: ['Metadata'],
                    retentionPolicy: 'Permanent',
                    accessControls: 'Data governance team'
                }
            },
            {
                id: 43,
                name: 'audit_trail_logs',
                type: 'Azure Monitor',
                source: 'Azure Monitor',
                description: 'System access logs and audit trails for compliance',
                records: '5.6M events',
                lastUpdated: '5 minutes ago',
                format: 'Log Analytics',
                classification: {
                    overallSensitivity: SensitivityLevels.HIGHLY_CONFIDENTIAL,
                    complianceStandards: ['SOX', 'HIPAA'],
                    dataSubjects: ['System Data'],
                    retentionPolicy: '7 years',
                    accessControls: 'IT security team only'
                }
            },
            {
                id: 44,
                name: 'gdpr_compliance_tracker',
                type: 'Power BI Report',
                source: 'Power BI Service',
                description: 'GDPR and data privacy compliance monitoring',
                records: '234 metrics',
                lastUpdated: '2 hours ago',
                format: 'Power BI',
                classification: {
                    overallSensitivity: SensitivityLevels.CONFIDENTIAL,
                    complianceStandards: ['GDPR'],
                    dataSubjects: ['Compliance Data'],
                    retentionPolicy: '5 years',
                    accessControls: 'Legal and compliance teams'
                }
            },
            {
                id: 45,
                name: 'risk_assessment_model',
                type: 'Azure ML Model',
                source: 'Azure Machine Learning',
                description: 'Institutional risk assessment and prediction model',
                records: 'Model v2.3',
                lastUpdated: '1 week ago',
                format: 'MLflow',
                classification: {
                    overallSensitivity: SensitivityLevels.HIGHLY_CONFIDENTIAL,
                    complianceStandards: [],
                    dataSubjects: ['Risk Data'],
                    retentionPolicy: 'Until superseded',
                    accessControls: 'Executive leadership access'
                }
            }
        ]
    }
];