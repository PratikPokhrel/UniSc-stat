// Real data extracted from Excel DCP Canvas sheets
import {
    BookOpen,
    Briefcase,
    Monitor,
    Database,
    Shield,
    Target,
    Settings,
    Brain,
    Building2,
    GraduationCap,
    Users,                                                         
    Zap,
    Wrench,
    Microscope,
    DollarSign,
    Leaf, Store,AlertTriangle, Search, Scale,
    MessagesSquare,
    Eye,
    Crown,
    Archive,
    Printer,
    CreditCard,
    Calculator,
    ShoppingCart,
    PieChart,
    TrendingUp,
    BarChart3
} from 'lucide-react';


const organizationalData = {
    IAU: {
        orgInfo: {
            code: 'ORG_L3_279',
            name: 'Insights & Analytics Unit',
            shortName: 'IAU',
            description: 'Data Capability Portfolio',
            theme: 'blue',
            icon: <BarChart3  className="h-8 w-8 text-white" />,
            framework: 'CAUDIT Aligned',
            frameworkDetail: 'HERM Framework',
            focus: 'Strategic',
            focusDetail: 'Analytics & Insights'
        },
        capabilities: {
            'strategy-management': {
                title: 'Strategy Management',
                icon: <Target className="w-5 h-5" />,
                color: 'blue',
                capabilities: [
                    { id: 'BC148', code: 'BC148', name: 'Vision & Strategy Development', description: 'Creates and articulates organizational vision, mission, and strategic direction.', maturityLevel: 'Optimizing', riskLevel: 'Low', owner: 'Chief Data Officer' },
                    { id: 'BC149', code: 'BC149', name: 'Strategic Plan Management', description: 'Manages the development, implementation, and monitoring of strategic plans across the organization.', maturityLevel: 'Managed', riskLevel: 'Medium', owner: 'Chief Data Officer' },
                ],
                applicationPlatforms: [
                    {
                        code: 'AP008', name: 'Governance', description: 'Policy Management applications provide workflow and tracking, versioning and document management, and related features and functions tailored to the requirements of caring for an institution’s policies and related artefacts.', applicationCapabilities: [
                            { code: 'AC099', name: 'Policy Management', description: 'Policy Management applications facilitate the institution-wide lifecycle management of policy artefacts.' }
                        ]
                    },
                    {
                        code: 'AP009', name: 'Change & Transformation', description: 'Strategy Management applications model, map, manage, and measure the relationship between an institutions strategic goals and its business outcomes.', applicationCapabilities: [
                            { code: 'AC015', name: 'Strategy Management', description: 'Strategy Management applications model, map, manage, and measure the relationship between an institutions strategic goals.' }
                        ]
                    }
                ]
            },
            'information-management': {
                title: 'Information Management',
                icon: <Database className="w-5 h-5" />,
                color: 'green',
                capabilities: [
                    { id: 'BC136', code: 'BC136', name: 'Information Governance', description: 'Establishes and maintains information governance frameworks, policies, and procedures.', maturityLevel: 'Defined', riskLevel: 'High', owner: 'Information Governance Manager' },
                    { id: 'BC138', code: 'BC138', name: 'Information Security Management', description: 'Information Security Management protects the confidentiality, integrity, and availability of information in an institutions care.', maturityLevel: 'Defined', riskLevel: 'High', owner: 'Information Governance Manager', shared: true, owner2:'ITS' },
                    { id: 'BC139', code: 'BC139', name: 'Identity & Access Management', description: 'Identity & Access Management manages information about people and things, instantiates and enforces organisational business rules and policy regarding entitlements to systems and services, and mediates access requests and identity verification.', maturityLevel: 'Defined', riskLevel: 'High', owner: 'Information Governance Manager', shared: true, owner2:'ITS' },
                    { id: 'BC211', code: 'BC211', name: 'Business Intelligence & Reporting', description: 'Delivers business intelligence solutions, dashboards, and reporting capabilities.', maturityLevel: 'Optimizing', riskLevel: 'Low', owner: 'BI Manager' },
                    { id: 'BC143', code: 'BC143', name: 'Data Management', description: 'Manages data assets, data quality, data integration, and data lifecycle processes.', maturityLevel: 'Optimizing', riskLevel: 'Medium', owner: 'Chief Data Officer' },
                    { id: 'BC144', code: 'BC144', name: 'Advanced Analytics', description: 'Provides advanced analytics, predictive modeling, and data science capabilities.', maturityLevel: 'Optimizing', riskLevel: 'Low', owner: 'BI Manager' },
                    { id: 'BC145', code: 'BC145', name: 'Records Management', description: 'Manages organizational records, document retention, and compliance with record-keeping requirements.', maturityLevel: 'Managed', riskLevel: 'Medium', owner: 'Chief Data Officer' },
                    { id: 'BC146', code: 'BC146', name: 'Enterprise Content Management', description: 'Manages enterprise content, document management systems, and content lifecycle.', maturityLevel: 'Defined', riskLevel: 'Low', owner: 'Chief Data Officer' },
                    { id: 'BC141', code: 'BC141', name: 'Intellectual Property Management', description: 'Manages intellectual property assets, patents, trademarks, and IP commercialization.', maturityLevel: 'Defined', riskLevel: 'High', owner: 'IP Manager  | Chief Data Officer' },
                    { id: 'BC231', code: 'BC231', name: 'Digital Preservation', description: 'Ensures long-term preservation and accessibility of digital assets and records.', maturityLevel: 'Managed', riskLevel: 'Medium', owner: 'Chief Data Officer' }
                ],
                applicationPlatforms: [
                    {
                        code: 'AP012', name: 'Digital Identity', description: 'Identity Governance & Administration applications facilitate the governance and delivery of digital-identity lifecycle-management for people and things.', 
                        applicationCapabilities: [
                            { code: 'AC112', name: 'Programme & Project Management', description: 'Identity Governance and Administration applications provide functionality that often includes identity provisioning, access provisioning, policy and role management, segregation-of-duties controls, auditing, and reporting. These features and functions are sometimes bundled into comprehensive Identity & Access Management platforms..' }
                        ]
                    }
                ]
               
            },
            'business-management': {
                title: 'Business Capability Management',
                icon: <Settings className="w-5 h-5" />,
                color: 'blue',
                capabilities: [
                    { id: 'BC207', code: 'BC207', name: 'Change Management', description: 'Manages the effects of change on people.', maturityLevel: 'Optimizing', riskLevel: 'Low', owner2: 'ITS', shared: true },
                    { id: 'BC206', code: 'BC206', name: 'Business Capability Management', description: 'Manages business capability framework, capability assessment, and capability development.', maturityLevel: 'Optimizing', riskLevel: 'Low', owner: 'Enterprise Architect' },
                    { id: 'BC209', code: 'BC209', name: 'Enterprise Architecture', description: 'Enterprise Architecture conducts enterprise analysis, design, planning, and implementation to aid successful development and execution of strategy.', maturityLevel: 'Optimizing', riskLevel: 'Low', shared:true, owner2: 'ITS' },
                    { id: 'BC216', code: 'BC216', name: 'Business Process Management', description: 'Manages business process design, optimization, and continuous improvement.', maturityLevel: 'Defined', riskLevel: 'Medium', owner: 'Process Excellence Manager' },
                    { id: 'BC218', code: 'BC218', name: 'Service Management', description: 'Manages service delivery, service design, and service improvement processes.', maturityLevel: 'Managed', riskLevel: 'Medium', owner: 'Service Manager' },
                    { id: 'BC208', code: 'BC208', name: 'Benefits Management', description: 'Manages benefits realization, value measurement, and outcome tracking.', maturityLevel: 'Defined', riskLevel: 'Medium', owner: 'Benefits Manager' },
                    { id: 'BC210', code: 'BC210', name: 'Portfolio & Programme Management', description: 'Manages project portfolios, programmes, and strategic initiatives.', maturityLevel: 'Managed', riskLevel: 'Medium', owner: 'Portfolio Manager' },
                    { id: 'BC243', code: 'BC243', name: 'Project Management', description: 'Manages individual projects, project methodologies, and project delivery.', maturityLevel: 'Optimizing', riskLevel: 'Low', owner: 'PMO Director' },
                    { id: 'BC244', code: 'BC244', name: 'Product Management', description: 'Manages product development, product lifecycle, and product strategy.', maturityLevel: 'Defined', riskLevel: 'Medium', owner: 'Product Manager' }
                ],
                applicationPlatforms: [
                    
                    {
                        code: 'AP009', name: 'Change & Transformation', description: 'Strategy Management applications model, map, manage, and measure the relationship between an institutions strategic goals and its business outcomes.', applicationCapabilities: [
                            { code: 'AC008', name: 'Product Management', description: 'Product Management applications curate information and enable workflows related to the ideation, design, build, and full lifecycle of digital and other products.' },
                            { code: 'AC009', name: 'Portfolio Management', description: 'Portfolio Management applications arrange information about programmes and projects into collections able to be prioritised and value-managed as coordinated portfolios of work.' },
                            { code: 'AC010', name: 'Programme & Project Management', description: 'Programme & Project Management applications manage information about the initiatives an institution considers or undertakes as structured programmes and their component projects.' }
                        ]
                    }
                ]
            }
        },
        applications: {
            'strategy-systems': {
                title: 'Strategy & Planning Systems',
                icon: <Target className="w-5 h-5" />,
                color: 'blue',
                applications: [
                    { id: 'AC015', code: 'AC015', name: 'Strategy Management', status: 'Active', owner: 'Strategy Team', description: 'System for managing strategic planning, execution, and performance monitoring.' }
                ]
            },
            'project-portfolio': {
                title: 'Project & Portfolio Systems',
                icon: <Briefcase className="w-5 h-5" />,
                color: 'green',
                applications: [
                    { id: 'AC009', code: 'AC009', name: 'Portfolio Management', status: 'Active', owner: 'Portfolio Management Team', description: 'Platform for managing project portfolios, resource allocation, and strategic alignment.' },
                    { id: 'AC010', code: 'AC010', name: 'Programme & Project Management', status: 'Active', owner: 'PMO Team', description: 'Comprehensive system for programme and project management activities.' },
                    { id: 'AC008', code: 'AC008', name: 'Product Management', status: 'Active', owner: 'Product Management Team', description: 'System for managing product development, roadmaps, and lifecycle.' }
                ]
            },
            'governance-compliance': {
                title: 'Governance & Policy Systems',
                icon: <Shield className="w-5 h-5" />,
                color: 'purple',
                applications: [
                    { id: 'AC099', code: 'AC099', name: 'Policy Management', status: 'Active', owner: 'Governance Team', description: 'Platform for policy development, approval, and compliance management.' },
                    { id: 'AC112', code: 'AC112', name: 'Notice & Consent', status: 'Active', owner: 'Privacy Team', description: 'System for managing privacy notices and consent management.' }
                ]
            }
        },
        dataEntities: [
            { id: 'DE081', code: 'DE081', name: 'Strategy', description: 'Strategic plans, objectives, and performance indicators' },
            { id: 'DE082', code: 'DE082', name: 'Plan', description: 'Business plans, operational plans, and implementation roadmaps' },
            { id: 'DE120', code: 'DE120', name: 'Record', description: 'Organizational records and document management data' },
            { id: 'DE154', code: 'DE154', name: 'Programme', description: 'Programme definitions, objectives, and delivery information' },
            { id: 'DE155', code: 'DE155', name: 'Project', description: 'Project data including scope, resources, timelines, and deliverables' },
            { id: 'DE192', code: 'DE192', name: 'Cohort', description: 'Student cohort and group analytics data' },
            { id: 'DE193', code: 'DE193', name: 'Collective', description: 'Collective and community group data for analytics' },
            { id: 'DE194', code: 'DE194', name: 'Community', description: 'Community engagement and stakeholder information' },
            { id: 'DE195', code: 'DE195', name: 'Indigenous Peoples', description: 'Indigenous peoples data for cultural and policy analysis' },
            { id: 'DE210', code: 'DE210', name: 'Organisation', description: 'Organizational structure, capabilities, and performance data' }
        ],
        teamMembers: [
            { id: 'user-2', name: 'Andrei Stoian', role: 'Business Intelligence  Manager', email: 'a.stoian@usc.edu', avatar: '👨‍💻', color: 'bg-blue-100 border-blue-300', textColor: 'text-blue-800', department: 'Analytics', permissions: ['assess', 'review'] },
            { id: 'user-4', name: 'Steve Perry', role: 'Lead Data Governance', email: 'sperry@usc.edu', avatar: '👨‍💼', color: 'bg-orange-100 border-orange-300', textColor: 'text-orange-800', department: 'Architecture', permissions: ['assess', 'design'] },
            { id: 'user-1', name: 'Paul Butler', role: 'Senior Analytics Manager', email: 'p.butler@usc.edu', avatar: '👨‍💼', color: 'bg-purple-100 border-purple-300', textColor: 'text-purple-800', department: 'Data Strategy', permissions: ['assess', 'approve'] },
        ]
    },
    ASU: {
        orgInfo: {
            code: 'ORG_L3_294',
            name: 'Academic Support Unit',
            shortName: 'ASU',
            description: 'Academic Excellence Portfolio',
            theme: 'blue',
            icon: <GraduationCap className="h-8 w-8 text-white" />,
            framework: 'Academic Standards',
            frameworkDetail: 'Teaching Excellence Framework',
            focus: 'Educational',
            focusDetail: 'Student Success & Learning'
        },
        capabilities: {
            'student-support': {
                title: 'Student Support & Services',
                icon: <Users className="w-5 h-5" />,
                color: 'blue',
                capabilities: [
                    { id: 'BC010', code: 'BC010', name: 'Scholarship Management', description: 'Manages scholarship programs, awards, and student financial assistance.', maturityLevel: 'Managed', riskLevel: 'Low', owner: 'Scholarship Manager' },
                    { id: 'BC246', code: 'BC246', name: 'Student Liability Management', description: 'Manages student financial liabilities and debt collection processes.', maturityLevel: 'Defined', riskLevel: 'Medium', owner: 'Student Finance Officer' },
                    { id: 'BC248', code: 'BC248', name: 'Financial Aid Management', description: 'Manages student financial aid programs and assistance.', maturityLevel: 'Optimizing', riskLevel: 'Low', owner: 'Financial Aid Director' },
                    { id: 'BC046', code: 'BC046', name: 'Student Academic Progress Management', description: 'Monitors and manages student academic progress and intervention.', maturityLevel: 'Managed', riskLevel: 'Medium', owner: 'Academic Progress Manager' }
                ]
            },
            'academic-services': {
                title: 'Academic Support Services',
                icon: <BookOpen className="w-5 h-5" />,
                color: 'green',
                capabilities: [
                    { id: 'BC225', code: 'BC225', name: 'Cross-Institutional Study', description: 'Manages cross-institutional study arrangements and partnerships.', maturityLevel: 'Defined', riskLevel: 'Low', owner: 'Partnerships Coordinator' },
                    { id: 'BC030', code: 'BC030', name: 'Placement Management', description: 'Manages student placement programs and work-integrated learning.', maturityLevel: 'Optimizing', riskLevel: 'Low', owner: 'Placement Director' },
                    { id: 'BC224', code: 'BC224', name: 'Special Consideration Management', description: 'Manages special consideration requests and accommodations.', maturityLevel: 'Managed', riskLevel: 'Medium', owner: 'Student Support Manager' },
                    { id: 'BC047', code: 'BC047', name: 'Research Candidature Management', description: 'Manages research student candidature and supervision.', maturityLevel: 'Defined', riskLevel: 'Medium', owner: 'Research Student Manager' },
                    { id: 'BC049', code: 'BC049', name: 'Student Misconduct Management', description: 'Manages student misconduct cases and disciplinary processes.', maturityLevel: 'Managed', riskLevel: 'High', owner: 'Student Conduct Officer' }
                ]
            }
        },
        applications: {
            'student-systems': {
                title: 'Student Support Systems',
                icon: <Users className="w-5 h-5" />,
                color: 'blue',
                applications: [
                    { id: 'AC116', code: 'AC116', name: 'Financial Aid', status: 'Active', owner: 'Financial Aid Team', description: 'System for managing student financial aid and assistance programs.' },
                    { id: 'AC123', code: 'AC123', name: 'Scholarship Management', status: 'Active', owner: 'Scholarship Team', description: 'Platform for scholarship administration and award management.' },
                    { id: 'AC098', code: 'AC098', name: 'Placement Management', status: 'Active', owner: 'Placement Team', description: 'System for managing student placements and work-integrated learning.' }
                ]
            },
            'academic-systems': {
                title: 'Academic Management Systems',
                icon: <BookOpen className="w-5 h-5" />,
                color: 'green',
                applications: [
                    { id: 'AC122', code: 'AC122', name: 'Candidature Management', status: 'Active', owner: 'Research Team', description: 'Platform for managing research student candidature.' },
                    { id: 'AC007', code: 'AC007', name: 'Student Conduct Management', status: 'Active', owner: 'Student Services', description: 'System for managing student misconduct and disciplinary processes.' }
                ]
            }
        },
        dataEntities: [
            { id: 'DE004', code: 'DE004', name: 'Student', description: 'Student enrollment, academic records, and performance data' },
            { id: 'DE059', code: 'DE059', name: 'Financial Assistance', description: 'Financial aid, scholarships, and student support data' },
            { id: 'DE062', code: 'DE062', name: 'Placement', description: 'Student placement and work-integrated learning data' },
            { id: 'DE186', code: 'DE186', name: 'Student Progress', description: 'Academic progress tracking and intervention data' },
            { id: 'DE054', code: 'DE054', name: 'Study Application', description: 'Study applications and admission data' }
        ],
        teamMembers: [
            { id: 'user-3', name: 'Dr. Sarah Wilson', role: 'Academic Director', email: 's.wilson@usc.edu', avatar: '👩‍🎓', color: 'bg-blue-100 border-blue-300', textColor: 'text-blue-800', department: 'Academic Affairs', permissions: ['assess', 'approve'] },
            { id: 'user-4', name: 'Emily Chen', role: 'Student Support Manager', email: 'e.chen@usc.edu', avatar: '👩‍💼', color: 'bg-green-100 border-green-300', textColor: 'text-green-800', department: 'Student Services', permissions: ['assess', 'review'] }
        ]
    },
    ADV: {
        orgInfo: {
            code: 'ORG_L3_285',
            name: 'Advancement Unit',
            shortName: 'ADV',
            description: 'Advancement & Development Portfolio',
            theme: 'green',
            icon: <Building2 className="h-8 w-8 text-white" />,
            framework: 'Advancement Standards',
            frameworkDetail: 'Fundraising Excellence Framework',
            focus: 'Strategic',
            focusDetail: 'Donor Relations & Growth'
        },
        capabilities: {
            'advancement-management': {
                title: 'Advancement & Development',
                icon: <Building2 className="w-5 h-5" />,
                color: 'green',
                capabilities: [
                    { id: 'BC222', code: 'BC222', name: 'Development & Fundraising', description: 'Manages fundraising campaigns, donor relations, and development activities.', maturityLevel: 'Optimizing', riskLevel: 'Low', owner: 'Development Director' },
                    { id: 'BC233', code: 'BC233', name: 'Donor, Sponsor, & Philanthropist Management', description: 'Manages relationships with donors, sponsors, and philanthropists.', maturityLevel: 'Managed', riskLevel: 'Medium', owner: 'Donor Relations Manager' },
                    { id: 'BC037', code: 'BC037', name: 'Alumni Management', description: 'Manages alumni relationships, engagement, and networking activities.', maturityLevel: 'Defined', riskLevel: 'Low', owner: 'Alumni Relations Manager' },
                    { id: 'BC241', code: 'BC241', name: 'Engagement Management', description: 'Manages stakeholder engagement and relationship building activities.', maturityLevel: 'Managed', riskLevel: 'Medium', owner: 'Engagement Manager' }
                ]
            },
            'community-outreach': {
                title: 'Community & Outreach',
                icon: <Users className="w-5 h-5" />,
                color: 'purple',
                capabilities: [
                    { id: 'BC109', code: 'BC109', name: 'Campaign Management', description: 'Manages fundraising and marketing campaigns.', maturityLevel: 'Optimizing', riskLevel: 'Low', owner: 'Campaign Manager' },
                    { id: 'BC239', code: 'BC239', name: 'Relationship Management', description: 'Manages stakeholder and partner relationships.', maturityLevel: 'Managed', riskLevel: 'Medium', owner: 'Relationship Manager' },
                    { id: 'BC240', code: 'BC240', name: 'Outreach Management', description: 'Manages community outreach and external engagement programs.', maturityLevel: 'Defined', riskLevel: 'Low', owner: 'Outreach Coordinator' },
                    { id: 'BC242', code: 'BC242', name: 'Extension Management', description: 'Manages extension services and community programs.', maturityLevel: 'Defined', riskLevel: 'Medium', owner: 'Extension Manager' }
                ]
            }
        },
        applications: {
            'advancement-systems': {
                title: 'Advancement Management Systems',
                icon: <Briefcase className="w-5 h-5" />,
                color: 'green',
                applications: [
                    { id: 'AC030', code: 'AC030', name: 'Fundraising', status: 'Active', owner: 'Advancement Team', description: 'Platform for managing fundraising activities and donor campaigns.' },
                    { id: 'AC027', code: 'AC027', name: 'Alumni Management', status: 'Active', owner: 'Alumni Team', description: 'System for managing alumni relationships and engagement.' },
                    { id: 'AC028', code: 'AC028', name: 'Community Engagement', status: 'Active', owner: 'Community Team', description: 'Platform for managing community engagement and outreach.' }
                ]
            },
            'marketing-systems': {
                title: 'Marketing & Engagement Systems',
                icon: <Monitor className="w-5 h-5" />,
                color: 'purple',
                applications: [
                    { id: 'AC118', code: 'AC118', name: 'Marketing CRM', status: 'Active', owner: 'Marketing Team', description: 'Customer relationship management for marketing and engagement.' },
                    { id: 'AC020', code: 'AC020', name: 'Event Management', status: 'Active', owner: 'Events Team', description: 'System for managing events and fundraising activities.' }
                ]
            }
        },
        dataEntities: [
            { id: 'DE212', code: 'DE212', name: 'Donor', description: 'Donor information, giving history, and relationship data' },
            { id: 'DE213', code: 'DE213', name: 'Sponsor', description: 'Sponsor relationships and partnership data' },
            { id: 'DE005', code: 'DE005', name: 'Alum', description: 'Alumni information and engagement data' },
            { id: 'DE105', code: 'DE105', name: 'Campaign', description: 'Fundraising and marketing campaign data' },
            { id: 'DE107', code: 'DE107', name: 'Event', description: 'Event management and fundraising event data' },
            { id: 'DE194', code: 'DE194', name: 'Community', description: 'Community engagement and stakeholder information' }
        ],
        teamMembers: [
            { id: 'user-4', name: 'Michael Chen', role: 'Advancement Director', email: 'm.chen@usc.edu', avatar: '👨‍💼', color: 'bg-green-100 border-green-300', textColor: 'text-green-800', department: 'Advancement', permissions: ['assess', 'approve'] },
            { id: 'user-5', name: 'Lisa Rodriguez', role: 'Alumni Relations Manager', email: 'l.rodriguez@usc.edu', avatar: '👩‍🎯', color: 'bg-purple-100 border-purple-300', textColor: 'text-purple-800', department: 'Alumni Relations', permissions: ['assess', 'engage'] }
        ]
    },
    CSALT: {
        orgInfo: {
            code: 'ORG_L3_297',
            name: 'Centre for Support & Advancement of Learning & Teaching',
            shortName: 'CSALT',
            description: 'Teaching Innovation Portfolio',
            theme: 'blue',
            icon: <Zap className="h-8 w-8 text-white" />,
            framework: 'Teaching Excellence',
            frameworkDetail: 'Learning Innovation Framework',
            focus: 'Educational',
            focusDetail: 'Teaching & Learning Innovation'
        },
        capabilities: {
            'curriculum-management': {
                title: 'Curriculum Development & Management',
                icon: <BookOpen className="w-5 h-5" />,
                color: 'blue',
                capabilities: [
                    { id: 'BC001', code: 'BC001', name: 'Curriculum Management', description: 'Manages curriculum development, approval, and lifecycle processes.', maturityLevel: 'Optimizing', riskLevel: 'Low', owner: 'Curriculum Manager' },
                    { id: 'BC002', code: 'BC002', name: 'Curriculum Planning', description: 'Plans and designs curriculum structure and learning pathways.', maturityLevel: 'Optimizing', riskLevel: 'Low', owner: 'Curriculum Planner' },
                    { id: 'BC003', code: 'BC003', name: 'Curriculum Design', description: 'Designs curriculum content, learning outcomes, and assessment strategies.', maturityLevel: 'Managed', riskLevel: 'Medium', owner: 'Curriculum Designer' },
                    { id: 'BC004', code: 'BC004', name: 'Curriculum Production', description: 'Produces and develops curriculum materials and resources.', maturityLevel: 'Defined', riskLevel: 'Low', owner: 'Content Developer' },
                    { id: 'BC007', code: 'BC007', name: 'Curriculum Accrediation', description: 'Produces and develops curriculum materials and resources.', maturityLevel: 'Defined', riskLevel: 'Low', owner: 'Content Developer' },
                    { id: 'BC235', code: 'BC235', name: 'Offering Management', description: 'Produces and develops curriculum materials and resources.', maturityLevel: 'Defined', riskLevel: 'Low', owner: 'Curriculum Designer' },
                    { id: 'BC041', code: 'BC041', name: 'Curriculum Disestablishment', description: 'Produces and develops curriculum materials and resources.', maturityLevel: 'Defined', riskLevel: 'Low', owner: 'Curriculum Designer' }
                ]
            },
            'learning-delivery': {
                title: 'Learning & Teaching Delivery',
                icon: <Monitor className="w-5 h-5" />,
                color: 'blue',
                capabilities: [
                    { id: 'BC023', code: 'BC023', name: 'Curriculum Delivery', description: 'Manages the delivery of curriculum and learning experiences.', maturityLevel: 'Optimizing', riskLevel: 'Low', owner: 'Learning Delivery Manager' },
                    { id: 'BC024', code: 'BC024', name: 'Learning & Teaching Resource Preparation', description: 'Prepares learning and teaching resources and materials.', maturityLevel: 'Managed', riskLevel: 'Medium', owner: 'Resource Coordinator' },
                    { id: 'BC025', code: 'BC025', name: 'Learning & Teaching Resource Management', description: 'Manages learning and teaching resources and infrastructure.', maturityLevel: 'Defined', riskLevel: 'Medium', owner: 'Resource Manager' },
                    { id: 'BC026', code: 'BC026', name: 'Learning & Teaching Delivery', description: 'Delivers learning and teaching activities and experiences.', maturityLevel: 'Optimizing', riskLevel: 'Low', owner: 'Teaching Delivery Lead' },
                    { id: 'BC059', code: 'BC059', name: 'Student Supervison', description: 'Delivers learning and teaching activities and experiences.', maturityLevel: 'Optimizing', riskLevel: 'Low', owner: 'Teaching Delivery Lead' }
                ]
            },
            'assessment-quality': {
                title: 'Assessment & Quality Assurance',
                icon: <Target className="w-5 h-5" />,
                color: 'green',
                capabilities: [
                    { id: 'BC028', code: 'BC028', name: 'Student Assessment', description: 'Manages student assessment processes and quality assurance.', maturityLevel: 'Managed', riskLevel: 'Medium', owner: 'Assessment Manager' },
                    { id: 'BC029', code: 'BC029', name: 'Learning Assessment', description: 'Assesses learning outcomes and educational effectiveness.', maturityLevel: 'Defined', riskLevel: 'Medium', owner: 'Learning Assessor' },
                    { id: 'BC031', code: 'BC031', name: 'Student Research Assessment', description: 'Assesses student research projects and outcomes.', maturityLevel: 'Managed', riskLevel: 'Medium', owner: 'Research Assessor' },
                    { id: 'BC059', code: 'BC059', name: 'Student Supervision', description: 'Manages student supervision and mentoring activities.', maturityLevel: 'Optimizing', riskLevel: 'Low', owner: 'Supervision Coordinator' }
                ]
            }
        },
        applications: {
            'curriculum-systems': {
                title: 'Curriculum Management Systems',
                icon: <BookOpen className="w-5 h-5" />,
                color: 'blue',
                applications: [
                    { id: 'AC096', code: 'AC096', name: 'Curriculum Lifecycle Management', status: 'Active', owner: 'CSALT Team', description: 'Platform for managing the complete curriculum lifecycle.' },
                    { id: 'AC105', code: 'AC105', name: 'Curriculum Accreditation', status: 'Active', owner: 'Quality Team', description: 'System for managing curriculum accreditation processes.' }
                ]
            },
            'learning-systems': {
                title: 'Learning Technology Systems',
                icon: <Monitor className="w-5 h-5" />,
                color: 'blue',
                applications: [
                    { id: 'AC093', code: 'AC093', name: 'eLearning Authoring', status: 'Active', owner: 'Learning Technology Team', description: 'Platform for creating and authoring eLearning content.' },
                    { id: 'AC095', code: 'AC095', name: 'Digital Learning Object Management', status: 'Active', owner: 'Digital Resources Team', description: 'System for managing digital learning objects and resources.' },
                    { id: 'AC094', code: 'AC094', name: 'Digital Media Management', status: 'Active', owner: 'Media Team', description: 'Platform for managing digital media and learning resources.' },
                    { id: 'AC097', code: 'AC097', name: 'Learning Management System', status: 'Active', owner: 'LMS Team', description: 'Primary platform for learning delivery and management.' }
                ]
            }
        },
        dataEntities: [
            { id: 'DE043', code: 'DE043', name: 'Area of Learning', description: 'Learning areas, disciplines, and subject domains' },
            { id: 'DE162', code: 'DE162', name: 'Unit of Learning', description: 'Individual learning units and course components' },
            { id: 'DE163', code: 'DE163', name: 'Element of Learning', description: 'Learning elements and instructional components' },
            { id: 'DE164', code: 'DE164', name: 'Learning Outcome', description: 'Learning outcomes and competency achievements' },
            { id: 'DE159', code: 'DE159', name: 'Learning Activity', description: 'Learning activities and educational experiences' },
            { id: 'DE160', code: 'DE160', name: 'Learning Resource', description: 'Learning resources and educational materials' },
            { id: 'DE052', code: 'DE052', name: 'Assessment', description: 'Assessment data and evaluation information' }
        ],
        teamMembers: [
            { id: 'user-5', name: 'Dr. Emma Thompson', role: 'CSALT Director', email: 'e.thompson@usc.edu', avatar: '👩‍🏫', color: 'bg-orange-100 border-orange-300', textColor: 'text-orange-800', department: 'Teaching Innovation', permissions: ['assess', 'approve'] },
            { id: 'user-6', name: 'David Kumar', role: 'Learning Technology Manager', email: 'd.kumar@usc.edu', avatar: '👨‍💻', color: 'bg-blue-100 border-blue-300', textColor: 'text-blue-800', department: 'Learning Technology', permissions: ['assess', 'develop'] }
        ]
    },
    FM: {
        orgInfo: {
            code: 'ORG_L3_296',
            name: 'Facilities Management',
            shortName: 'FM',
            description: 'Infrastructure and Facilities Services Portfolio',
            theme: 'orange',
            icon: <Building2 className="h-8 w-8 text-white" />,
            framework: 'Infrastructure Management Framework',
            frameworkDetail: 'Asset Lifecycle Management',
            focus: 'Operational',
            focusDetail: 'Infrastructure & Facilities'
        },
        capabilities: {
            'facilities-estate': {
                title: 'Facilities & Estate Management',
                icon: <Building2 className="w-5 h-5" />,
                color: 'orange',
                capabilities: [
                    { id: 'BC125', code: 'BC125', name: 'Facilities & Estate Management', description: 'Manages overall facilities and estate operations and strategy.', maturityLevel: 'Managed', riskLevel: 'Medium', owner: 'Facilities Manager' },
                    { id: 'BC126', code: 'BC126', name: 'Building & Facilities Management', description: 'Manages building operations, maintenance, and facility services.', maturityLevel: 'Optimizing', riskLevel: 'Low', owner: 'Building Operations Manager' },
                    { id: 'BC127', code: 'BC127', name: 'Property Management', description: 'Manages property portfolio, leases, and real estate operations.', maturityLevel: 'Defined', riskLevel: 'Medium', owner: 'Property Manager' },
                    { id: 'BC227', code: 'BC227', name: 'Space Utilisation Management', description: 'Manages space allocation, utilization analysis, and optimization.', maturityLevel: 'Managed', riskLevel: 'Low', owner: 'Space Planning Manager' }
                ]
            },
            'operations-services': {
                title: 'Operations & Support Services',
                icon: <Wrench className="w-5 h-5" />,
                color: 'blue',
                capabilities: [
                    { id: 'BC128', code: 'BC128', name: 'Campus Transportation Management', description: 'Manages campus transportation systems, parking, and mobility services.', maturityLevel: 'Defined', riskLevel: 'Medium', owner: 'Transportation Manager' },
                    { id: 'BC129', code: 'BC129', name: 'Campus Security Management', description: 'Manages campus security operations and safety systems.', maturityLevel: 'Optimizing', riskLevel: 'High', owner: 'Security Manager' },
                    { id: 'BC131', code: 'BC131', name: 'Cleaning & Waste Management', description: 'Manages cleaning services and waste management operations.', maturityLevel: 'Managed', riskLevel: 'Low', owner: 'Cleaning Services Manager' },
                    { id: 'BC132', code: 'BC132', name: 'Groundskeeping Management', description: 'Manages landscaping, grounds maintenance, and outdoor spaces.', maturityLevel: 'Defined', riskLevel: 'Low', owner: 'Grounds Manager' },
                    { id: 'BC119', code: 'BC119', name: 'Mail Management', description: 'Manages mail and postal services across campus.', maturityLevel: 'Defined', riskLevel: 'Low', owner: 'Mail Services Coordinator' }
                ]
            },
            'sustainability-compliance': {
                title: 'Environmental & Compliance',
                icon: <Leaf className="w-5 h-5" />,
                color: 'green',
                capabilities: [
                    { id: 'BC221', code: 'BC221', name: 'Environmental Sustainability Management', description: 'Manages environmental sustainability initiatives and compliance.', maturityLevel: 'Managed', riskLevel: 'Medium', owner: 'Sustainability Manager' },
                    { id: 'BC234', code: 'BC234', name: 'Incident Management', description: 'Manages facility-related incidents, emergency response, and safety protocols.', maturityLevel: 'Optimizing', riskLevel: 'High', owner: 'Safety & Emergency Manager' }
                ]
            },
            'commercial-venues': {
                title: 'Commercial & Venue Services',
                icon: <Store className="w-5 h-5" />,
                color: 'purple',
                capabilities: [
                    { id: 'BC130', code: 'BC130', name: 'Commercial Tenancy Management', description: 'Manages commercial tenancies, retail spaces, and leasing arrangements.', maturityLevel: 'Defined', riskLevel: 'Medium', owner: 'Commercial Manager' },
                    { id: 'BC122', code: 'BC122', name: 'Venue Management', description: 'Manages event venues, bookings, and venue operations.', maturityLevel: 'Managed', riskLevel: 'Low', owner: 'Venue Manager' }
                ]
            }
        },
        applications: {
            'asset-management': {
                title: 'Asset & Space Management',
                icon: <Database className="w-5 h-5" />,
                color: 'blue',
                applications: [
                    { id: 'AC124', code: 'AC124', name: 'Inventory Management', status: 'Active', owner: 'Facilities Team', description: 'System for managing facility inventory and equipment tracking.' },
                    { id: 'AC134', code: 'AC134', name: 'Space Management', status: 'Active', owner: 'Space Planning Team', description: 'Platform for space allocation, utilization, and planning.' },
                    { id: 'AC106', code: 'AC106', name: 'Facilities Management', status: 'Active', owner: 'Facilities Team', description: 'Comprehensive facilities management system for operations.' },
                    { id: 'AC035', code: 'AC035', name: 'Fixed Asset Management', status: 'Active', owner: 'Asset Management Team', description: 'System for tracking and managing fixed assets.' }
                ]
            },
            'building-operations': {
                title: 'Building & Operations Systems',
                icon: <Settings className="w-5 h-5" />,
                color: 'blue',
                applications: [
                    { id: 'AC107', code: 'AC107', name: 'Maintenance Management', status: 'Active', owner: 'Maintenance Team', description: 'System for maintenance scheduling and work order management.' },
                    { id: 'AC037', code: 'AC037', name: 'Building Management System', status: 'Active', owner: 'Building Operations', description: 'Integrated building automation and control system.' },
                    { id: 'AC108', code: 'AC108', name: 'Workplace Management', status: 'Active', owner: 'Workplace Services', description: 'Platform for workplace services and desk booking.' },
                    { id: 'AC019', code: 'AC019', name: 'Emergency Management', status: 'Active', owner: 'Emergency Response Team', description: 'System for emergency response and incident management.' }
                ]
            },
            'security-transport': {
                title: 'Security & Transportation',
                icon: <Shield className="w-5 h-5" />,
                color: 'blue',
                applications: [
                    { id: 'AC034', code: 'AC034', name: 'Physical Access Control', status: 'Active', owner: 'Security Team', description: 'Physical access control and security management system.' },
                    { id: 'AC033', code: 'AC033', name: 'Parking', status: 'Active', owner: 'Parking Services', description: 'Parking management and enforcement system.' },
                    { id: 'AC140', code: 'AC140', name: 'Transportation Management', status: 'Active', owner: 'Transportation Team', description: 'Campus transportation and shuttle management system.' }
                ]
            },
            'sustainability': {
                title: 'Environmental Systems',
                icon: <Leaf className="w-5 h-5" />,
                color: 'green',
                applications: [
                    { id: 'AC036', code: 'AC036', name: 'Environmental Sustainability', status: 'Active', owner: 'Sustainability Team', description: 'Environmental monitoring and sustainability management system.' }
                ]
            }
        },
        dataEntities: [
            { id: 'DE103', code: 'DE103', name: 'Incident', description: 'Facility-related incidents, emergencies, and safety events' },
            { id: 'DE126', code: 'DE126', name: 'Physical Asset', description: 'Physical assets including equipment, furniture, and infrastructure' },
            { id: 'DE037', code: 'DE037', name: 'Facility', description: 'Buildings, structures, and facility information' },
            { id: 'DE173', code: 'DE173', name: 'Utility', description: 'Utility consumption, billing, and service data' },
            { id: 'DE035', code: 'DE035', name: 'Building', description: 'Building information, specifications, and operations data' },
            { id: 'DE033', code: 'DE033', name: 'Campus', description: 'Campus-level facilities and infrastructure data' },
            { id: 'DE034', code: 'DE034', name: 'Site', description: 'Site and location information for facilities' },
            { id: 'DE183', code: 'DE183', name: 'Space', description: 'Room and space allocation, utilization, and booking data' }
        ],
        teamMembers: [
            { id: 'user-fm-1', name: 'Michael Thompson', role: 'Director of Facilities', email: 'm.thompson@usc.edu', avatar: '👨‍💼', color: 'bg-orange-100 border-orange-300', textColor: 'text-orange-800', department: 'Facilities Management', permissions: ['assess', 'approve'] },
            { id: 'user-fm-2', name: 'Sarah Chen', role: 'Building Operations Manager', email: 's.chen@usc.edu', avatar: '👩‍🔧', color: 'bg-blue-100 border-blue-300', textColor: 'text-blue-800', department: 'Building Operations', permissions: ['assess', 'manage'] },
            { id: 'user-fm-3', name: 'David Rodriguez', role: 'Space Planning Manager', email: 'd.rodriguez@usc.edu', avatar: '👨‍🏗️', color: 'bg-green-100 border-green-300', textColor: 'text-green-800', department: 'Space Planning', permissions: ['assess', 'review'] },
            { id: 'user-fm-4', name: 'Lisa Park', role: 'Security Manager', email: 'l.park@usc.edu', avatar: '👩‍💼', color: 'bg-red-100 border-red-300', textColor: 'text-red-800', department: 'Security Services', permissions: ['assess', 'manage'] },
            { id: 'user-fm-5', name: 'James Wilson', role: 'Sustainability Manager', email: 'j.wilson@usc.edu', avatar: '👨‍🌱', color: 'bg-green-100 border-green-300', textColor: 'text-green-800', department: 'Sustainability', permissions: ['assess', 'review'] }
        ]
    },
    RES: {
        orgInfo: {
            code: 'ORG_L3_277',
            name: 'Research Services',
            shortName: 'RES',
            description: 'Research Excellence and Innovation Portfolio',
            theme: 'purple',
            icon: <Microscope className="h-8 w-8 text-white" />,
            framework: 'Research Excellence Framework',
            frameworkDetail: 'NHMRC/ARC Research Framework',
            focus: 'Research',
            focusDetail: 'Research Excellence & Innovation'
        },
        capabilities: {
            'research-planning': {
                title: 'Research Planning & Strategy',
                icon: <Target className="w-5 h-5" />,
                color: 'blue',
                capabilities: [
                    { id: 'BC065', code: 'BC065', name: 'Research Opportunities & Planning', description: 'Identifies and plans research opportunities and strategic research directions.', maturityLevel: 'Optimizing', riskLevel: 'Medium', owner: 'Research Strategy Manager' },
                    { id: 'BC066', code: 'BC066', name: 'Research Opportunity Management', description: 'Manages research opportunities, partnerships, and collaborative arrangements.', maturityLevel: 'Managed', riskLevel: 'Medium', owner: 'Partnerships Manager' },
                    { id: 'BC067', code: 'BC067', name: 'Collaborative Opportunity Management', description: 'Manages collaborative research opportunities and multi-institutional partnerships.', maturityLevel: 'Defined', riskLevel: 'Medium', owner: 'Collaboration Manager' },
                    { id: 'BC070', code: 'BC070', name: 'Research Project Design', description: 'Designs and develops research projects and methodologies.', maturityLevel: 'Optimizing', riskLevel: 'Low', owner: 'Research Design Lead' }
                ]
            },
            'funding-management': {
                title: 'Research Funding & Grants',
                icon: <DollarSign className="w-5 h-5" />,
                color: 'blue',
                capabilities: [
                    { id: 'BC071', code: 'BC071', name: 'Research Funding', description: 'Manages overall research funding strategy and portfolio.', maturityLevel: 'Optimizing', riskLevel: 'High', owner: 'Research Funding Director' },
                    { id: 'BC072', code: 'BC072', name: 'Research Fund Sourcing', description: 'Sources and identifies research funding opportunities.', maturityLevel: 'Managed', riskLevel: 'Medium', owner: 'Funding Development Manager' },
                    { id: 'BC073', code: 'BC073', name: 'Research Funds Management', description: 'Manages research fund allocation and financial administration.', maturityLevel: 'Optimizing', riskLevel: 'Medium', owner: 'Research Finance Manager' },
                    { id: 'BC215', code: 'BC215', name: 'Research Grant Management', description: 'Manages research grant applications, awards, and compliance.', maturityLevel: 'Optimizing', riskLevel: 'High', owner: 'Grants Manager' }
                ]
            },
            'research-operations': {
                title: 'Research Operations & Management',
                 icon: <Settings className="w-5 h-5" />,
                color: 'blue',
                capabilities: [
                    { id: 'BC093', code: 'BC093', name: 'Research Management', description: 'Manages overall research operations and administration.', maturityLevel: 'Optimizing', riskLevel: 'Medium', owner: 'Research Operations Manager' },
                    { id: 'BC074', code: 'BC074', name: 'Research Activity', description: 'Manages day-to-day research activities and operations.', maturityLevel: 'Managed', riskLevel: 'Low', owner: 'Research Activity Coordinator' },
                    { id: 'BC069', code: 'BC069', name: 'Research Programme Management', description: 'Manages large-scale research programmes and initiatives.', maturityLevel: 'Defined', riskLevel: 'Medium', owner: 'Programme Manager' },
                    { id: 'BC090', code: 'BC090', name: 'Research Performance Management', description: 'Manages research performance measurement and evaluation.', maturityLevel: 'Managed', riskLevel: 'Medium', owner: 'Performance Manager' },
                    { id: 'BC097', code: 'BC097', name: 'Research Infrastructure Management', description: 'Manages research infrastructure, facilities, and resources.', maturityLevel: 'Optimizing', riskLevel: 'High', owner: 'Infrastructure Manager' }
                ]
            },
            'governance-ethics': {
                title: 'Research Governance & Ethics',
                icon: <Shield className="w-5 h-5" />,
                color: 'blue',
                capabilities: [
                    { id: 'BC245', code: 'BC245', name: 'Research Assurance', description: 'Ensures research quality, compliance, and assurance processes.', maturityLevel: 'Optimizing', riskLevel: 'High', owner: 'Research Assurance Manager' },
                    { id: 'BC094', code: 'BC094', name: 'Research Ethics Management', description: 'Manages research ethics approvals and compliance.', maturityLevel: 'Optimizing', riskLevel: 'High', owner: 'Ethics Manager' },
                    { id: 'BC212', code: 'BC212', name: 'Research Integrity Management', description: 'Manages research integrity and responsible conduct of research.', maturityLevel: 'Managed', riskLevel: 'High', owner: 'Research Integrity Officer' },
                    { id: 'BC091', code: 'BC091', name: 'Research Quality Management', description: 'Manages research quality standards and improvement.', maturityLevel: 'Defined', riskLevel: 'Medium', owner: 'Quality Manager' }
                ]
            },
            'data-outputs': {
                title: 'Research Data & Outputs',
                 icon: <Database className="w-5 h-5" />,
                color: 'blue',
                capabilities: [
                    { id: 'BC077', code: 'BC077', name: 'Research Data Management', description: 'Manages research data lifecycle, storage, and sharing.', maturityLevel: 'Managed', riskLevel: 'Medium', owner: 'Research Data Manager' },
                    { id: 'BC075', code: 'BC075', name: 'Research Creation', description: 'Manages research creation and development processes.', maturityLevel: 'Optimizing', riskLevel: 'Low', owner: 'Research Development Lead' },
                    { id: 'BC083', code: 'BC083', name: 'Research Output Management', description: 'Manages research outputs, publications, and dissemination.', maturityLevel: 'Managed', riskLevel: 'Low', owner: 'Research Outputs Manager' },
                    { id: 'BC086', code: 'BC086', name: 'Research Dissemination', description: 'Manages research dissemination and knowledge transfer.', maturityLevel: 'Defined', riskLevel: 'Low', owner: 'Knowledge Transfer Manager' }
                ]
            },
            'impact-commercialisation': {
                title: 'Research Impact & Commercialisation',
                // icon: '<TrendingUp className="w-5 h-5" />',
                color: 'blue',
                capabilities: [
                    { id: 'BC228', code: 'BC228', name: 'Research Impact Management', description: 'Manages research impact assessment and measurement.', maturityLevel: 'Defined', riskLevel: 'Medium', owner: 'Impact Manager' },
                    { id: 'BC237', code: 'BC237', name: 'Research Outcome Management', description: 'Manages research outcomes and benefit realization.', maturityLevel: 'Managed', riskLevel: 'Medium', owner: 'Outcomes Manager' },
                    { id: 'BC088', code: 'BC088', name: 'Research Commercialisation Management', description: 'Manages research commercialisation and technology transfer.', maturityLevel: 'Defined', riskLevel: 'High', owner: 'Commercialisation Manager' },
                    { id: 'BC236', code: 'BC236', name: 'Research Resource Management', description: 'Manages research resources and capacity planning.', maturityLevel: 'Managed', riskLevel: 'Medium', owner: 'Resource Manager' }
                ]
            }
        },
        applications: {
            'research-management': {
                title: 'Research Management Systems',
                // icon: '<Microscope className="w-5 h-5" />',
                color: 'blue',
                applications: [
                    { id: 'AC068', code: 'AC068', name: 'Innovation Management', status: 'Active', owner: 'Innovation Team', description: 'Platform for managing innovation processes and technology transfer.' },
                    { id: 'AC004', code: 'AC004', name: 'Research Portal', status: 'Active', owner: 'Research Services', description: 'Central portal for research information and services.' },
                    { id: 'AC069', code: 'AC069', name: 'Research Grants Management', status: 'Active', owner: 'Grants Team', description: 'System for managing research grant applications and awards.' },
                    { id: 'AC063', code: 'AC063', name: 'Research Ethics Management', status: 'Active', owner: 'Ethics Committee', description: 'Platform for research ethics applications and approvals.' }
                ]
            },
            'funding-systems': {
                title: 'Funding & Finance Systems',
                // icon: '<DollarSign className="w-5 h-5" />',
                color: 'blue',
                applications: [
                    { id: 'AC067', code: 'AC067', name: 'Research Fund Sourcing', status: 'Active', owner: 'Funding Team', description: 'System for identifying and tracking funding opportunities.' },
                    { id: 'AC065', code: 'AC065', name: 'Intellectual Property & Commercialisation', status: 'Active', owner: 'IP Team', description: 'Platform for IP management and commercialisation activities.' }
                ]
            },
            'research-infrastructure': {
                title: 'Research Infrastructure & Labs',
                // icon: '<Beaker className="w-5 h-5" />',
                color: 'blue',
                applications: [
                    { id: 'AC066', code: 'AC066', name: 'Research Infrastructure Management', status: 'Active', owner: 'Infrastructure Team', description: 'System for managing research infrastructure and facilities.' },
                    { id: 'AC076', code: 'AC076', name: 'Virtual Laboratory', status: 'Active', owner: 'Lab Services', description: 'Virtual laboratory platform for remote research activities.' },
                    { id: 'AC075', code: 'AC075', name: 'Laboratory Information Management', status: 'Active', owner: 'Lab Management', description: 'LIMS for laboratory data and sample management.' },
                    { id: 'AC077', code: 'AC077', name: 'Electronic Laboratory Notebook', status: 'Active', owner: 'Research Teams', description: 'Digital laboratory notebook for research documentation.' },
                    { id: 'AC117', code: 'AC117', name: 'Specimen Management', status: 'Active', owner: 'Specimen Services', description: 'System for managing research specimens and samples.' },
                    { id: 'AC109', code: 'AC109', name: 'Animal Management', status: 'Active', owner: 'Animal Services', description: 'Platform for research animal management and welfare.' },
                    { id: 'AC131', code: 'AC131', name: 'Clinical Trials Management', status: 'Active', owner: 'Clinical Research', description: 'System for managing clinical trials and research studies.' },
                    { id: 'AC078', code: 'AC078', name: 'Specialist Research Tool', status: 'Active', owner: 'Research Teams', description: 'Specialist tools and software for research activities.' }
                ]
            },
            'data-management': {
                title: 'Research Data Systems',
                // icon: '<Database className="w-5 h-5" />',
                color: 'blue',
                applications: [
                    { id: 'AC072', code: 'AC072', name: 'Research Data Management Planning', status: 'Active', owner: 'Data Management Team', description: 'Platform for research data management planning and compliance.' },
                    { id: 'AC070', code: 'AC070', name: 'Research Output Repository', status: 'Active', owner: 'Repository Team', description: 'Institutional repository for research outputs and publications.' },
                    { id: 'AC071', code: 'AC071', name: 'Research Identifier Management', status: 'Active', owner: 'Research Services', description: 'System for managing researcher identifiers and profiles.' }
                ]
            },
            'metrics-reporting': {
                title: 'Research Metrics & Analytics',
                // icon: '<BarChart className="w-5 h-5" />',
                color: 'blue',
                applications: [
                    { id: 'AC081', code: 'AC081', name: 'Research Performance Metrics', status: 'Active', owner: 'Analytics Team', description: 'Platform for research performance measurement and analytics.' },
                    { id: 'AC082', code: 'AC082', name: 'Research Dissemination Metrics', status: 'Active', owner: 'Impact Team', description: 'System for tracking research dissemination and impact metrics.' }
                ]
            }
        },
        dataEntities: [
            { id: 'DE201', code: 'DE201', name: 'Research Opportunity', description: 'Research opportunities, partnerships, and collaboration prospects' },
            { id: 'DE165', code: 'DE165', name: 'Research Application', description: 'Research grant applications and funding proposals' },
            { id: 'DE075', code: 'DE075', name: 'Research Resource', description: 'Research resources, equipment, and infrastructure data' },
            { id: 'DE068', code: 'DE068', name: 'Research Output', description: 'Research publications, reports, and deliverables' },
            { id: 'DE073', code: 'DE073', name: 'Research Project', description: 'Research project information, scope, and management data' },
            { id: 'DE203', code: 'DE203', name: 'Research Award', description: 'Research grants, awards, and funding information' },
            { id: 'DE070', code: 'DE070', name: 'Research Data', description: 'Research datasets, analysis, and data management information' },
            { id: 'DE166', code: 'DE166', name: 'Research Outcome', description: 'Research outcomes, benefits, and impact data' },
            { id: 'DE167', code: 'DE167', name: 'Research Impact', description: 'Research impact assessment and measurement data' },
            { id: 'DE022', code: 'DE022', name: 'Creature', description: 'Research animals and specimen data for studies' }
        ],
        teamMembers: [
            { id: 'user-res-1', name: 'Dr. Amanda Foster', role: 'Director of Research Services', email: 'a.foster@usc.edu', avatar: '👩‍🔬', color: 'bg-cyan-100 border-cyan-300', textColor: 'text-cyan-800', department: 'Research Services', permissions: ['assess', 'approve'] },
            { id: 'user-res-2', name: 'Prof. Michael Chang', role: 'Research Strategy Manager', email: 'm.chang@usc.edu', avatar: '👨‍🎓', color: 'bg-blue-100 border-blue-300', textColor: 'text-blue-800', department: 'Research Strategy', permissions: ['assess', 'approve'] },
            { id: 'user-res-3', name: 'Dr. Sarah Mitchell', role: 'Research Ethics Manager', email: 's.mitchell@usc.edu', avatar: '👩‍⚖️', color: 'bg-red-100 border-red-300', textColor: 'text-red-800', department: 'Research Ethics', permissions: ['assess', 'compliance'] },
            { id: 'user-res-4', name: 'James Rodriguez', role: 'Research Grants Manager', email: 'j.rodriguez@usc.edu', avatar: '👨‍💼', color: 'bg-green-100 border-green-300', textColor: 'text-green-800', department: 'Research Funding', permissions: ['assess', 'manage'] },
            { id: 'user-res-5', name: 'Dr. Lisa Chen', role: 'Research Data Manager', email: 'l.chen@usc.edu', avatar: '👩‍💻', color: 'bg-purple-100 border-purple-300', textColor: 'text-purple-800', department: 'Research Data', permissions: ['assess', 'review'] },
            { id: 'user-res-6', name: 'Mark Thompson', role: 'Research Infrastructure Manager', email: 'm.thompson@usc.edu', avatar: '👨‍🔧', color: 'bg-orange-100 border-orange-300', textColor: 'text-orange-800', department: 'Research Infrastructure', permissions: ['assess', 'manage'] }
        ]
    },
    FS: {
        orgInfo: {
            code: 'ORG_L3_299',
            name: 'Financial Services',
            shortName: 'FS',
            description: 'Financial Management and Operations Portfolio',
            theme: 'blue',
            icon: <DollarSign className="h-8 w-8 text-white" />,
            framework: 'Financial Management Framework',
            frameworkDetail: 'AASB/IFRS Accounting Standards',
            focus: 'Operational',
            focusDetail: 'Financial Management & Control'
        },
        capabilities: {
            'financial-management': {
                title: 'Financial Management & Strategy',
                icon: <TrendingUp className="w-5 h-5" />,
                color: 'blue',
                capabilities: [
                    { id: 'BC184', code: 'BC184', name: 'Financial Management', description: 'Manages overall financial strategy, policies, and governance.', maturityLevel: 'Optimizing', riskLevel: 'High', owner: 'Chief Financial Officer' },
                    { id: 'BC190', code: 'BC190', name: 'Financial Planning & Analysis', description: 'Conducts financial planning, budgeting, and performance analysis.', maturityLevel: 'Optimizing', riskLevel: 'Medium', owner: 'Financial Planning Manager' },
                    { id: 'BC189', code: 'BC189', name: 'Price Modelling', description: 'Develops pricing models and fee structures.', maturityLevel: 'Managed', riskLevel: 'Medium', owner: 'Pricing Analyst' }
                ]
            },
            'accounting-operations': {
                title: 'Accounting & Financial Operations',
                icon: <Calculator className="w-5 h-5" />,
                color: 'blue',
                capabilities: [
                    { id: 'BC249', code: 'BC249', name: 'General Accounting', description: 'Manages general ledger, financial reporting, and accounting operations.', maturityLevel: 'Optimizing', riskLevel: 'High', owner: 'Accounting Manager' },
                    { id: 'BC187', code: 'BC187', name: 'Accounts Payable', description: 'Manages supplier payments and accounts payable processes.', maturityLevel: 'Managed', riskLevel: 'Medium', owner: 'Accounts Payable Manager' },
                    { id: 'BC188', code: 'BC188', name: 'Accounts Receivable', description: 'Manages customer billing and accounts receivable processes.', maturityLevel: 'Managed', riskLevel: 'Medium', owner: 'Accounts Receivable Manager' },
                    { id: 'BC194', code: 'BC194', name: 'Project Accounting', description: 'Manages project-based financial tracking and reporting.', maturityLevel: 'Defined', riskLevel: 'Medium', owner: 'Project Accountant' }
                ]
            },
            'treasury-banking': {
                title: 'Treasury & Banking Operations',
                icon: <Building2 className="w-5 h-5" />,
                color: 'green',
                capabilities: [
                    { id: 'BC219', code: 'BC219', name: 'Treasury Management', description: 'Manages cash flow, liquidity, and treasury operations.', maturityLevel: 'Optimizing', riskLevel: 'High', owner: 'Treasurer' },
                    { id: 'BC192', code: 'BC192', name: 'Bank Management', description: 'Manages banking relationships and financial transactions.', maturityLevel: 'Managed', riskLevel: 'Medium', owner: 'Banking Manager' },
                    { id: 'BC199', code: 'BC199', name: 'Investment Management', description: 'Manages institutional investments and portfolio performance.', maturityLevel: 'Defined', riskLevel: 'High', owner: 'Investment Manager' }
                ]
            },
            'asset-management': {
                title: 'Asset & Investment Management',
                icon: <PieChart className="w-5 h-5" />,
                color: 'blue',
                capabilities: [
                    { id: 'BC197', code: 'BC197', name: 'Asset Management', description: 'Manages financial assets and investment portfolios.', maturityLevel: 'Managed', riskLevel: 'High', owner: 'Asset Manager' }
                ]
            },
            'procurement-tax': {
                title: 'Procurement & Tax Management',
                icon: <ShoppingCart className="w-5 h-5" />,
                color: 'blue',
                capabilities: [
                    { id: 'BC193', code: 'BC193', name: 'Procurement Management', description: 'Manages procurement processes and supplier relationships.', maturityLevel: 'Optimizing', riskLevel: 'Medium', owner: 'Procurement Manager' },
                    { id: 'BC191', code: 'BC191', name: 'Tax Management', description: 'Manages tax compliance, reporting, and planning.', maturityLevel: 'Managed', riskLevel: 'High', owner: 'Tax Manager' }
                ]
            }
        },
        applications: {
            'financial-systems': {
                title: 'Core Financial Systems',
                icon: <Calculator className="w-5 h-5" />,
                color: 'blue',
                applications: [
                    { id: 'AC043', code: 'AC043', name: 'Financial Planning & Analysis', status: 'Active', owner: 'Finance Team', description: 'Comprehensive financial planning and analysis platform.' },
                    { id: 'AC044', code: 'AC044', name: 'Accounting', status: 'Active', owner: 'Accounting Team', description: 'Core accounting system for general ledger and financial reporting.' },
                    { id: 'AC040', code: 'AC040', name: 'Budgeting', status: 'Active', owner: 'Budget Team', description: 'Budget planning and management system.' }
                ]
            },
            'payments-billing': {
                title: 'Payments & Billing Systems',
                icon: <CreditCard className="w-5 h-5" />,
                color: 'blue',
                applications: [
                    { id: 'AC042', code: 'AC042', name: 'Expenses', status: 'Active', owner: 'Finance Team', description: 'Expense management and reimbursement system.' },
                    { id: 'AC039', code: 'AC039', name: 'Billing', status: 'Active', owner: 'Billing Team', description: 'Student and customer billing management system.' },
                    { id: 'AC045', code: 'AC045', name: 'Payment', status: 'Active', owner: 'Payments Team', description: 'Payment processing and transaction management system.' },
                    { id: 'AC111', code: 'AC111', name: 'Royalty Management', status: 'Active', owner: 'Finance Team', description: 'System for managing royalties and intellectual property revenue.' }
                ]
            },
            'treasury-investment': {
                title: 'Treasury & Investment Systems',
                icon: <TrendingUp className="w-5 h-5" />,
                color: 'green',
                applications: [
                    { id: 'AC049', code: 'AC049', name: 'Treasury', status: 'Active', owner: 'Treasury Team', description: 'Treasury management and cash flow system.' },
                    { id: 'AC038', code: 'AC038', name: 'Asset Management', status: 'Active', owner: 'Asset Management', description: 'Financial asset tracking and investment management system.' }
                ]
            },
            'procurement-tax': {
                title: 'Procurement & Compliance',
                icon: <ShoppingCart className="w-5 h-5" />,
                color: 'blue',
                applications: [
                    { id: 'AC047', code: 'AC047', name: 'Procurement', status: 'Active', owner: 'Procurement Team', description: 'Procurement and supplier management system.' },
                    { id: 'AC048', code: 'AC048', name: 'Tax Management', status: 'Active', owner: 'Tax Team', description: 'Tax compliance and reporting system.' },
                    { id: 'AC041', code: 'AC041', name: 'Contract Management', status: 'Active', owner: 'Contracts Team', description: 'Contract lifecycle management system.' }
                ]
            }
        },
        dataEntities: [
            { id: 'DE146', code: 'DE146', name: 'Account', description: 'Chart of accounts and financial account structures' },
            { id: 'DE143', code: 'DE143', name: 'Budget', description: 'Budget allocations, plans, and performance data' },
            { id: 'DE172', code: 'DE172', name: 'Expense', description: 'Expense transactions and reimbursement data' },
            { id: 'DE151', code: 'DE151', name: 'Financial Liability', description: 'Financial liabilities and debt obligations' },
            { id: 'DE171', code: 'DE171', name: 'Revenue', description: 'Revenue streams and income data' },
            { id: 'DE204', code: 'DE204', name: 'General Ledger', description: 'General ledger transactions and financial records' },
            { id: 'DE150', code: 'DE150', name: 'Financial Asset', description: 'Financial assets, investments, and securities' },
            { id: 'DE088', code: 'DE088', name: 'Contract', description: 'Financial contracts and procurement agreements' },
            { id: 'DE208', code: 'DE208', name: 'Supplier', description: 'Supplier information and vendor management data' }
        ],
        teamMembers: [
            { id: 'user-fs-1', name: 'Robert Anderson', role: 'Chief Financial Officer', email: 'r.anderson@usc.edu', avatar: '👨‍💼', color: 'bg-emerald-100 border-emerald-300', textColor: 'text-emerald-800', department: 'Financial Services', permissions: ['assess', 'approve'] },
            { id: 'user-fs-2', name: 'Michelle Wong', role: 'Financial Planning Manager', email: 'm.wong@usc.edu', avatar: '👩‍💼', color: 'bg-blue-100 border-blue-300', textColor: 'text-blue-800', department: 'Financial Planning', permissions: ['assess', 'approve'] },
            { id: 'user-fs-3', name: 'David Kumar', role: 'Accounting Manager', email: 'd.kumar@usc.edu', avatar: '👨‍💻', color: 'bg-green-100 border-green-300', textColor: 'text-green-800', department: 'Accounting', permissions: ['assess', 'manage'] },
            { id: 'user-fs-4', name: 'Sarah Johnson', role: 'Treasurer', email: 's.johnson@usc.edu', avatar: '👩‍🏦', color: 'bg-purple-100 border-purple-300', textColor: 'text-purple-800', department: 'Treasury', permissions: ['assess', 'manage'] },
            { id: 'user-fs-5', name: 'Carlos Martinez', role: 'Procurement Manager', email: 'c.martinez@usc.edu', avatar: '👨‍📊', color: 'bg-orange-100 border-orange-300', textColor: 'text-orange-800', department: 'Procurement', permissions: ['assess', 'review'] },
            { id: 'user-fs-6', name: 'Jennifer Lee', role: 'Tax Manager', email: 'j.lee@usc.edu', avatar: '👩‍⚖️', color: 'bg-red-100 border-red-300', textColor: 'text-red-800', department: 'Tax & Compliance', permissions: ['assess', 'compliance'] }
        ]
    },
    GRM: {
        orgInfo: {
            code: 'ORG_L3_291',
            name: 'Governance, Risk and Compliance',
            shortName: 'GRM',
            description: 'Governance, Risk Management and Compliance Portfolio',
            theme: 'blue',
            icon: <Shield className="h-8 w-8 text-white" />,
            framework: 'Risk Management Framework',
            frameworkDetail: 'ISO 31000 Risk Management',
            focus: 'Compliance',
            focusDetail: 'Risk & Governance'
        },
        capabilities: {
            'governance-oversight': {
                title: 'Governance & Oversight',
                icon: <Shield className="w-5 h-5" />,
                color: 'blue',
                capabilities: [
                    { id: 'BC160', code: 'BC160', name: 'Governance, Risk, & Compliance', description: 'Provides overall governance, risk management, and compliance oversight.', maturityLevel: 'Optimizing', riskLevel: 'High', owner: 'Chief Risk Officer' },
                    { id: 'BC164', code: 'BC164', name: 'Policy Management', description: 'Develops, manages, and maintains organizational policies and procedures.', maturityLevel: 'Optimizing', riskLevel: 'Medium', owner: 'Policy Manager' },
                    { id: 'BC165', code: 'BC165', name: 'Quality Management', description: 'Manages quality assurance and quality improvement processes.', maturityLevel: 'Managed', riskLevel: 'Medium', owner: 'Quality Manager' }
                ]
            },
            'risk-management': {
                title: 'Risk Management',
                icon: <AlertTriangle className="w-5 h-5" />,
                color: 'blue',
                capabilities: [
                    { id: 'BC168', code: 'BC168', name: 'Risk Management', description: 'Identifies, assesses, and manages organizational risks.', maturityLevel: 'Optimizing', riskLevel: 'High', owner: 'Risk Manager' },
                    { id: 'BC161', code: 'BC161', name: 'Business Continuity Management', description: 'Manages business continuity planning and disaster recovery.', maturityLevel: 'Managed', riskLevel: 'High', owner: 'Business Continuity Manager' }
                ]
            },
            'compliance-legal': {
                title: 'Compliance & Legal Services',
                icon: <Scale className="w-5 h-5" />,
                color: 'blue',
                capabilities: [
                    { id: 'BC170', code: 'BC170', name: 'Compliance Management', description: 'Ensures compliance with regulatory requirements and standards.', maturityLevel: 'Optimizing', riskLevel: 'High', owner: 'Compliance Manager' },
                    { id: 'BC155', code: 'BC155', name: 'Legal Services', description: 'Provides legal advice and manages legal matters.', maturityLevel: 'Managed', riskLevel: 'High', owner: 'General Counsel' },
                    { id: 'BC159', code: 'BC159', name: 'Legal Advisory', description: 'Provides legal advisory services and counsel.', maturityLevel: 'Optimizing', riskLevel: 'High', owner: 'Legal Advisor' },
                    { id: 'BC156', code: 'BC156', name: 'Contract Management', description: 'Manages contract development, review, and administration.', maturityLevel: 'Managed', riskLevel: 'Medium', owner: 'Contracts Manager' },
                    { id: 'BC157', code: 'BC157', name: 'Dispute Resolution & Litigation', description: 'Manages dispute resolution and litigation processes.', maturityLevel: 'Defined', riskLevel: 'High', owner: 'Litigation Manager' }
                ]
            },
            'audit-investigation': {
                title: 'Audit & Investigation',
                icon: <Search className="w-5 h-5" />,
                color: 'blue',
                capabilities: [
                    { id: 'BC163', code: 'BC163', name: 'Internal Audit', description: 'Conducts internal audits and assurance activities.', maturityLevel: 'Optimizing', riskLevel: 'Medium', owner: 'Chief Audit Executive' },
                    { id: 'BC167', code: 'BC167', name: 'Investigation Management', description: 'Manages investigations and inquiry processes.', maturityLevel: 'Managed', riskLevel: 'High', owner: 'Investigation Manager' }
                ]
            },
            'stakeholder-management': {
                title: 'Stakeholder & Complaints Management',
                icon: <Users className="w-5 h-5" />,
                color: 'blue',
                capabilities: [
                    { id: 'BC166', code: 'BC166', name: 'Complaint & Compliment Management', description: 'Manages complaints, compliments, and feedback processes.', maturityLevel: 'Managed', riskLevel: 'Medium', owner: 'Complaints Manager' }
                ]
            }
        },
        applications: {
            'governance-systems': {
                title: 'Governance & Policy Systems',
                icon: <Shield className="w-5 h-5" />,
                color: 'blue',
                applications: [
                    { id: 'AC014', code: 'AC014', name: 'Risk Management', status: 'Active', owner: 'Risk Team', description: 'Comprehensive risk management and assessment platform.' },
                    { id: 'AC013', code: 'AC013', name: 'Quality Management', status: 'Active', owner: 'Quality Team', description: 'Quality management system for standards and improvement.' },
                    { id: 'AC129', code: 'AC129', name: 'Meeting Management', status: 'Active', owner: 'Governance Team', description: 'Board and committee meeting management system.' }
                ]
            },
            'audit-compliance': {
                title: 'Audit & Compliance Systems',
                icon: <Search className="w-5 h-5" />,
                color: 'blue',
                applications: [
                    { id: 'AC012', code: 'AC012', name: 'Audit Management', status: 'Active', owner: 'Internal Audit', description: 'Internal audit planning and execution system.' },
                    { id: 'AC125', code: 'AC125', name: 'Digital Voting', status: 'Active', owner: 'Governance Team', description: 'Electronic voting system for governance decisions.' }
                ]
            },
            'legal-systems': {
                title: 'Legal & Contract Management',
                icon: <Scale className="w-5 h-5" />,
                color: 'blue',
                applications: [
                    { id: 'AC133', code: 'AC133', name: 'Legal Matter Management', status: 'Active', owner: 'Legal Team', description: 'Legal case and matter management system.' }
                ]
            }
        },
        dataEntities: [
            { id: 'DE092', code: 'DE092', name: 'Policy', description: 'Organizational policies, procedures, and governance documents' },
            { id: 'DE101', code: 'DE101', name: 'Risk', description: 'Risk assessments, registers, and mitigation strategies' },
            { id: 'DE088', code: 'DE088', name: 'Contract', description: 'Legal contracts, agreements, and commercial arrangements' },
            { id: 'DE175', code: 'DE175', name: 'Obligation', description: 'Legal and regulatory obligations and compliance requirements' },
            { id: 'DE120', code: 'DE120', name: 'Record', description: 'Governance and compliance records and documentation' }
        ],
        teamMembers: [
            { id: 'user-grm-1', name: 'Dr. Patricia Williams', role: 'Chief Risk Officer', email: 'p.williams@usc.edu', avatar: '👩‍⚖️', color: 'bg-slate-100 border-slate-300', textColor: 'text-slate-800', department: 'Risk & Governance', permissions: ['assess', 'approve'] },
            { id: 'user-grm-2', name: 'Michael Thompson', role: 'General Counsel', email: 'm.thompson@usc.edu', avatar: '👨‍⚖️', color: 'bg-blue-100 border-blue-300', textColor: 'text-blue-800', department: 'Legal Services', permissions: ['assess', 'approve'] },
            { id: 'user-grm-3', name: 'Sarah Davis', role: 'Compliance Manager', email: 's.davis@usc.edu', avatar: '👩‍💼', color: 'bg-red-100 border-red-300', textColor: 'text-red-800', department: 'Compliance', permissions: ['assess', 'compliance'] },
            { id: 'user-grm-4', name: 'Robert Kim', role: 'Chief Audit Executive', email: 'r.kim@usc.edu', avatar: '👨‍💻', color: 'bg-purple-100 border-purple-300', textColor: 'text-purple-800', department: 'Internal Audit', permissions: ['assess', 'audit'] },
            { id: 'user-grm-5', name: 'Jennifer Brown', role: 'Risk Manager', email: 'j.brown@usc.edu', avatar: '👩‍🔍', color: 'bg-orange-100 border-orange-300', textColor: 'text-orange-800', department: 'Risk Management', permissions: ['assess', 'review'] },
            { id: 'user-grm-6', name: 'David Martinez', role: 'Policy Manager', email: 'd.martinez@usc.edu', avatar: '👨‍📋', color: 'bg-green-100 border-green-300', textColor: 'text-green-800', department: 'Policy & Governance', permissions: ['assess', 'manage'] }
        ]
    },
    MC: {
        orgInfo: {
            code: 'ORG_L3_272',
            name: 'Marketing and Communications',
            shortName: 'MC',
            description: 'Marketing, Communications and Brand Portfolio',
            theme: 'pink',
            icon: '<Megaphone className="h-8 w-8 text-white" />',
            framework: 'Marketing Excellence Framework',
            frameworkDetail: 'Integrated Marketing Communications',
            focus: 'Strategic',
            focusDetail: 'Brand & Communications'
        },
        capabilities: {
            'marketing-strategy': {
                title: 'Marketing Strategy & Planning',
                icon: '<Target className="w-5 h-5" />',
                color: 'pink',
                capabilities: [
                    { id: 'BC107', code: 'BC107', name: 'Marketing Management', description: 'Manages overall marketing strategy, planning, and execution.', maturityLevel: 'Optimizing', riskLevel: 'Medium', owner: 'Marketing Director' },
                    { id: 'BC108', code: 'BC108', name: 'Advertising Management', description: 'Manages advertising campaigns and promotional activities.', maturityLevel: 'Managed', riskLevel: 'Medium', owner: 'Advertising Manager' },
                    { id: 'BC112', code: 'BC112', name: 'Marketing Planning', description: 'Develops marketing plans and strategic marketing initiatives.', maturityLevel: 'Optimizing', riskLevel: 'Low', owner: 'Marketing Planning Manager' },
                    { id: 'BC111', code: 'BC111', name: 'Market Research', description: 'Conducts market research and analysis to inform marketing decisions.', maturityLevel: 'Managed', riskLevel: 'Low', owner: 'Market Research Manager' }
                ]
            },
            'communications': {
                title: 'Communications Management',
                icon: '<MessageSquare className="w-5 h-5" />',
                color: 'blue',
                capabilities: [
                    { id: 'BC220', code: 'BC220', name: 'Communications Management', description: 'Manages internal and external communications strategies.', maturityLevel: 'Optimizing', riskLevel: 'Medium', owner: 'Communications Manager' },
                    { id: 'BC240', code: 'BC240', name: 'Outreach Management', description: 'Manages community outreach and engagement activities.', maturityLevel: 'Managed', riskLevel: 'Low', owner: 'Outreach Manager' }
                ]
            },
            'brand-campaigns': {
                title: 'Brand & Campaign Management',
                icon: '<Palette className="w-5 h-5" />',
                color: 'purple',
                capabilities: [
                    { id: 'BC247', code: 'BC247', name: 'Brand Management', description: 'Manages brand identity, positioning, and brand standards.', maturityLevel: 'Optimizing', riskLevel: 'Medium', owner: 'Brand Manager' },
                    { id: 'BC109', code: 'BC109', name: 'Campaign Management', description: 'Plans, executes, and manages marketing campaigns.', maturityLevel: 'Managed', riskLevel: 'Medium', owner: 'Campaign Manager' },
                    { id: 'BC113', code: 'BC113', name: 'Merchandising', description: 'Manages promotional products and merchandising activities.', maturityLevel: 'Defined', riskLevel: 'Low', owner: 'Merchandising Coordinator' }
                ]
            }
        },
        applications: {
            'marketing-systems': {
                title: 'Marketing Management Systems',
                icon: '<Megaphone className="w-5 h-5" />',
                color: 'pink',
                applications: [
                    { id: 'AC118', code: 'AC118', name: 'Marketing CRM', status: 'Active', owner: 'Marketing Team', description: 'Customer relationship management system for marketing activities.' },
                    { id: 'AC119', code: 'AC119', name: 'Sales CRM', status: 'Active', owner: 'Sales Team', description: 'Sales-focused customer relationship management platform.' },
                    { id: 'AC031', code: 'AC031', name: 'Marketing Tools', status: 'Active', owner: 'Marketing Team', description: 'Integrated marketing automation and campaign tools.' }
                ]
            },
            'communications-platforms': {
                title: 'Communications Platforms',
                icon: '<MessageSquare className="w-5 h-5" />',
                color: 'blue',
                applications: [
                    { id: 'AC028', code: 'AC028', name: 'Community Engagement', status: 'Active', owner: 'Community Team', description: 'Platform for community engagement and stakeholder communications.' },
                    { id: 'AC128', code: 'AC128', name: 'Social Media Management', status: 'Active', owner: 'Digital Team', description: 'Social media management and publishing platform.' },
                    { id: 'AC030', code: 'AC030', name: 'Fundraising', status: 'Active', owner: 'Development Team', description: 'Fundraising campaign management and donor communications.' }
                ]
            },
            'brand-creative': {
                title: 'Brand & Creative Systems',
                icon: '<Palette className="w-5 h-5" />',
                color: 'purple',
                applications: [
                    { id: 'AC138', code: 'AC138', name: 'Brand Management', status: 'Active', owner: 'Brand Team', description: 'Brand asset management and guidelines platform.' }
                ]
            }
        },
        dataEntities: [
            { id: 'DE105', code: 'DE105', name: 'Campaign', description: 'Marketing campaigns, promotions, and advertising initiatives' },
            { id: 'DE188', code: 'DE188', name: 'Communication', description: 'Communications, messages, and stakeholder correspondence' },
            { id: 'DE107', code: 'DE107', name: 'Event', description: 'Marketing events, promotions, and engagement activities' },
            { id: 'DE002', code: 'DE002', name: 'Prospect', description: 'Marketing prospects and potential customer data' },
            { id: 'DE211', code: 'DE211', name: 'Volunteer', description: 'Volunteer and community engagement participant data' }
        ],
        teamMembers: [
            { id: 'user-mc-1', name: 'Rebecca Johnson', role: 'Director of Marketing & Communications', email: 'r.johnson@usc.edu', avatar: '👩‍💼', color: 'bg-pink-100 border-pink-300', textColor: 'text-pink-800', department: 'Marketing & Communications', permissions: ['assess', 'approve'] },
            { id: 'user-mc-2', name: 'Alex Chen', role: 'Brand Manager', email: 'a.chen@usc.edu', avatar: '👨‍🎨', color: 'bg-purple-100 border-purple-300', textColor: 'text-purple-800', department: 'Brand Management', permissions: ['assess', 'approve'] },
            { id: 'user-mc-3', name: 'Maria Rodriguez', role: 'Communications Manager', email: 'm.rodriguez@usc.edu', avatar: '👩‍💻', color: 'bg-blue-100 border-blue-300', textColor: 'text-blue-800', department: 'Communications', permissions: ['assess', 'manage'] },
            { id: 'user-mc-4', name: 'James Taylor', role: 'Digital Marketing Manager', email: 'j.taylor@usc.edu', avatar: '👨‍💻', color: 'bg-green-100 border-green-300', textColor: 'text-green-800', department: 'Digital Marketing', permissions: ['assess', 'review'] },
            { id: 'user-mc-5', name: 'Emma Wilson', role: 'Market Research Analyst', email: 'e.wilson@usc.edu', avatar: '👩‍📊', color: 'bg-orange-100 border-orange-300', textColor: 'text-orange-800', department: 'Market Research', permissions: ['assess', 'analyze'] },
            { id: 'user-mc-6', name: 'Tom Anderson', role: 'Campaign Manager', email: 't.anderson@usc.edu', avatar: '👨‍📈', color: 'bg-red-100 border-red-300', textColor: 'text-red-800', department: 'Campaigns', permissions: ['assess', 'manage'] }
        ]
    },
    ODVCA: {
        orgInfo: {
            code: 'ORG_L3_273',
            name: 'Office of Deputy Vice-Chancellor (Academic)',
            shortName: 'ODVCA',
            description: 'Academic Leadership and Strategic Oversight Portfolio',
            theme: 'blue',
            icon: <Users className="h-8 w-8 text-white" />,
            framework: 'Academic Leadership Framework',
            frameworkDetail: 'Strategic Academic Governance',
            focus: 'Strategic',
            focusDetail: 'Academic Leadership'
        },
        capabilities: {
            'academic-leadership': {
                title: 'Academic Leadership & Governance',
                icon: <Crown className="w-5 h-5" />,
                color: 'blue',
                capabilities: [
                    // Based on the data, ODVCA appears to have limited specific capabilities
                    // Most capabilities are distributed to other units under the DVC Academic portfolio
                    { id: 'BC250', code: 'BC250', name: 'Academic Leadership', description: 'Provides strategic academic leadership and direction across the university.', maturityLevel: 'Optimizing', riskLevel: 'High', owner: 'Deputy Vice-Chancellor (Academic)' },
                    { id: 'BC251', code: 'BC251', name: 'Academic Governance', description: 'Oversees academic governance structures and decision-making processes.', maturityLevel: 'Optimizing', riskLevel: 'Medium', owner: 'Academic Governance Manager' },
                    { id: 'BC252', code: 'BC252', name: 'Academic Policy Development', description: 'Develops and reviews academic policies and procedures.', maturityLevel: 'Managed', riskLevel: 'Medium', owner: 'Policy Development Manager' }
                ]
            },
            'strategic-oversight': {
                title: 'Strategic Academic Oversight',
                icon: <Eye className="w-5 h-5" />,
                color: 'blue',
                capabilities: [
                    { id: 'BC253', code: 'BC253', name: 'Academic Quality Assurance', description: 'Ensures academic quality standards across all academic units.', maturityLevel: 'Managed', riskLevel: 'High', owner: 'Quality Assurance Director' },
                    { id: 'BC254', code: 'BC254', name: 'Academic Performance Monitoring', description: 'Monitors academic performance and outcomes across the university.', maturityLevel: 'Defined', riskLevel: 'Medium', owner: 'Performance Monitoring Manager' },
                    { id: 'BC255', code: 'BC255', name: 'Academic Strategic Planning', description: 'Leads strategic planning for academic initiatives and developments.', maturityLevel: 'Optimizing', riskLevel: 'Medium', owner: 'Strategic Planning Director' }
                ]
            },
            'stakeholder-management': {
                title: 'Academic Stakeholder Relations',
                icon: <Users className="w-5 h-5" />,
                color: 'green',
                capabilities: [
                    { id: 'BC256', code: 'BC256', name: 'Academic Committee Management', description: 'Manages academic committees and governance structures.', maturityLevel: 'Managed', riskLevel: 'Low', owner: 'Committee Coordinator' },
                    { id: 'BC257', code: 'BC257', name: 'Faculty Relations Management', description: 'Manages relationships with academic faculty and staff.', maturityLevel: 'Defined', riskLevel: 'Medium', owner: 'Faculty Relations Manager' }
                ]
            }
        },
        applications: {
            'governance-systems': {
                title: 'Academic Governance Systems',
                icon: <Settings className="w-5 h-5" />,
                color: 'blue',
                applications: [
                    // ODVCA likely uses governance and management systems rather than operational systems
                    { id: 'AC200', code: 'AC200', name: 'Academic Governance Platform', status: 'Active', owner: 'ODVCA Team', description: 'Platform for managing academic governance and committee processes.' },
                    { id: 'AC201', code: 'AC201', name: 'Academic Reporting System', status: 'Active', owner: 'Academic Services', description: 'System for academic performance reporting and analytics.' }
                ]
            },
            'planning-systems': {
                title: 'Strategic Planning Systems',
                icon: <Target className="w-5 h-5" />,
                color: 'blue',
                applications: [
                    { id: 'AC202', code: 'AC202', name: 'Academic Strategic Planning', status: 'Active', owner: 'Strategic Planning', description: 'Platform for academic strategic planning and monitoring.' },
                    { id: 'AC203', code: 'AC203', name: 'Academic Performance Dashboard', status: 'Active', owner: 'Performance Team', description: 'Dashboard for monitoring academic performance metrics.' }
                ]
            },
            'communication-systems': {
                title: 'Communication & Collaboration',
                icon: <MessagesSquare className="w-5 h-5" />,
                color: 'green',
                applications: [
                    { id: 'AC204', code: 'AC204', name: 'Academic Communication Platform', status: 'Active', owner: 'Communications Team', description: 'Platform for academic communications and announcements.' }
                ]
            }
        },
        dataEntities: [
            // ODVCA would manage high-level academic data
            { id: 'DE220', code: 'DE220', name: 'Academic Strategy', description: 'Academic strategic plans, goals, and performance indicators' },
            { id: 'DE221', code: 'DE221', name: 'Academic Governance', description: 'Academic governance structures, committees, and decision records' },
            { id: 'DE222', code: 'DE222', name: 'Academic Policy', description: 'Academic policies, procedures, and regulatory compliance data' },
            { id: 'DE223', code: 'DE223', name: 'Academic Performance', description: 'University-wide academic performance metrics and outcomes' },
            { id: 'DE224', code: 'DE224', name: 'Faculty Data', description: 'Academic staff and faculty information and performance data' }
        ],
        teamMembers: [
            { id: 'user-odvca-1', name: 'Prof. Elizabeth Morrison', role: 'Deputy Vice-Chancellor (Academic)', email: 'e.morrison@usc.edu', avatar: '👩‍🎓', color: 'bg-red-100 border-red-300', textColor: 'text-red-800', department: 'Academic Leadership', permissions: ['assess', 'approve'] },
            { id: 'user-odvca-2', name: 'Dr. Jonathan Hayes', role: 'Associate DVC (Academic)', email: 'j.hayes@usc.edu', avatar: '👨‍🎓', color: 'bg-blue-100 border-blue-300', textColor: 'text-blue-800', department: 'Academic Affairs', permissions: ['assess', 'approve'] },
            { id: 'user-odvca-3', name: 'Margaret Collins', role: 'Academic Governance Manager', email: 'm.collins@usc.edu', avatar: '👩‍💼', color: 'bg-green-100 border-green-300', textColor: 'text-green-800', department: 'Academic Governance', permissions: ['assess', 'manage'] },
            { id: 'user-odvca-4', name: 'Richard Thompson', role: 'Strategic Planning Director', email: 'r.thompson@usc.edu', avatar: '👨‍💼', color: 'bg-purple-100 border-purple-300', textColor: 'text-purple-800', department: 'Strategic Planning', permissions: ['assess', 'review'] }
        ]
    },
    LIB: {
        orgInfo: {
            code: 'ORG_L3_306',
            name: 'Library Services',
            shortName: 'LIB',
            description: 'Library and Information Services Portfolio',
            theme: 'blue',
            icon: <BookOpen className="h-8 w-8 text-white" />,
            framework: 'Library Standards Framework',
            frameworkDetail: 'AACR2/RDA Cataloguing Standards',
            focus: 'Educational',
            focusDetail: 'Information Services & Research Support'
        },
        capabilities: {
            'library-administration': {
                title: 'Library Administration & Management',
                icon: <Settings className="w-5 h-5" />,
                color: 'green',
                capabilities: [
                    { id: 'BC133', code: 'BC133', name: 'Library Administration', description: 'Manages overall library administration, operations, and strategic direction.', maturityLevel: 'Optimizing', riskLevel: 'Medium', owner: 'Library Director' }
                ]
            },
            'collection-management': {
                title: 'Collection Management & Access',
                icon: <Archive className="w-5 h-5" />,
                color: 'blue',
                capabilities: [
                    { id: 'BC213', code: 'BC213', name: 'Library Collection Management', description: 'Manages library collections including acquisition, cataloguing, and maintenance.', maturityLevel: 'Optimizing', riskLevel: 'Low', owner: 'Collection Development Manager' },
                    { id: 'BC134', code: 'BC134', name: 'Collection Access Management', description: 'Manages access to library collections and resources for users.', maturityLevel: 'Managed', riskLevel: 'Low', owner: 'Access Services Manager' }
                ]
            },
            'support-services': {
                title: 'Library Support Services',
                icon: <Printer className="w-5 h-5" />,
                color: 'green',
                capabilities: [
                    { id: 'BC120', code: 'BC120', name: 'Printing Management', description: 'Manages printing services and facilities within the library.', maturityLevel: 'Defined', riskLevel: 'Low', owner: 'Library Operations Manager' }
                ]
            }
        },
        applications: {
            'library-systems': {
                title: 'Library Management Systems',
                icon: <Database className="w-5 h-5" />,
                color: 'blue',
                applications: [
                    { id: 'AC062', code: 'AC062', name: 'Collection Management', status: 'Active', owner: 'Library Systems Team', description: 'Integrated library system for collection management and cataloguing.' },
                    { id: 'AC061', code: 'AC061', name: 'Library Management', status: 'Active', owner: 'Library Administration', description: 'Comprehensive library management and administration system.' }
                ]
            },
            'research-support': {
                title: 'Research Support Systems',
                icon: <Search className="w-5 h-5" />,
                color: 'blue',
                applications: [
                    { id: 'AC074', code: 'AC074', name: 'Reference Management', status: 'Active', owner: 'Research Support Team', description: 'Reference management tools and citation support services.' }
                ]
            }
        },
        dataEntities: [
            { id: 'DE114', code: 'DE114', name: 'Collection', description: 'Library collections including books, journals, digital resources, and special collections' }
        ],
        teamMembers: [
            { id: 'user-lib-1', name: 'Dr. Margaret Stevens', role: 'Library Director', email: 'm.stevens@usc.edu', avatar: '👩‍📚', color: 'bg-amber-100 border-amber-300', textColor: 'text-amber-800', department: 'Library Services', permissions: ['assess', 'approve'] },
            { id: 'user-lib-2', name: 'Thomas Wilson', role: 'Collection Development Manager', email: 't.wilson@usc.edu', avatar: '👨‍📖', color: 'bg-blue-100 border-blue-300', textColor: 'text-blue-800', department: 'Collection Development', permissions: ['assess', 'manage'] },
            { id: 'user-lib-3', name: 'Jennifer Park', role: 'Access Services Manager', email: 'j.park@usc.edu', avatar: '👩‍💻', color: 'bg-green-100 border-green-300', textColor: 'text-green-800', department: 'Access Services', permissions: ['assess', 'review'] },
            { id: 'user-lib-4', name: 'David Chen', role: 'Research Support Librarian', email: 'd.chen@usc.edu', avatar: '👨‍🔬', color: 'bg-purple-100 border-purple-300', textColor: 'text-purple-800', department: 'Research Support', permissions: ['assess', 'support'] }
        ]
    },
    PC: {
        orgInfo: {
            code: 'ORG_L3_300',
            name: 'People and Culture',
            shortName: 'P&C',
            description: 'Human Resources Portfolio',
            theme: 'green',
            icon: '<Users className="h-8 w-8 text-white" />',
            framework: 'CAUDIT Aligned',
            frameworkDetail: 'HERM Framework',
            focus: 'Operational',
            focusDetail: 'Human Resources & Workforce'
        },
        capabilities: {
            'human-resources': {
                title: 'Human Resource Management',
                icon: '<Users className="w-5 h-5" />',
                color: 'green',
                capabilities: [
                    { id: 'BC171', code: 'BC171', name: 'Human Resource Management', description: 'Manages overall human resource strategy, policies, and workforce management.', maturityLevel: 'Managed', riskLevel: 'Medium', owner: 'HR Director' },
                    { id: 'BC172', code: 'BC172', name: 'Organisational Design', description: 'Manages organizational structure, roles, and reporting relationships.', maturityLevel: 'Defined', riskLevel: 'Medium', owner: 'Organizational Development Manager' },
                    { id: 'BC174', code: 'BC174', name: 'Workforce Planning', description: 'Manages workforce planning, capacity planning, and resource allocation.', maturityLevel: 'Managed', riskLevel: 'Medium', owner: 'Workforce Planning Manager' },
                    { id: 'BC175', code: 'BC175', name: 'Talent Acquisition', description: 'Manages recruitment, selection, and onboarding processes.', maturityLevel: 'Optimizing', riskLevel: 'Low', owner: 'Talent Acquisition Manager' }
                ]
            },
            'employee-lifecycle': {
                title: 'Employee Lifecycle Management',
                icon: '<UserCheck className="w-5 h-5" />',
                color: 'blue',
                capabilities: [
                    { id: 'BC176', code: 'BC176', name: 'Remuneration & Benefits Management', description: 'Manages employee compensation, benefits, and reward programs.', maturityLevel: 'Managed', riskLevel: 'High', owner: 'Compensation & Benefits Manager' },
                    { id: 'BC178', code: 'BC178', name: 'Workforce Resource Management', description: 'Manages workforce resources, allocation, and utilization.', maturityLevel: 'Defined', riskLevel: 'Medium', owner: 'Resource Manager' },
                    { id: 'BC181', code: 'BC181', name: 'Workforce Performance Management', description: 'Manages employee performance evaluation and improvement processes.', maturityLevel: 'Managed', riskLevel: 'Medium', owner: 'Performance Manager' },
                    { id: 'BC182', code: 'BC182', name: 'Workforce Training & Development', description: 'Manages employee training, development, and capability building.', maturityLevel: 'Optimizing', riskLevel: 'Low', owner: 'Learning & Development Manager' }
                ]
            },
            'employee-relations': {
                title: 'Employee Relations & Support',
                icon: '<Heart className="w-5 h-5" />',
                color: 'purple',
                capabilities: [
                    { id: 'BC173', code: 'BC173', name: 'Workforce Relations Management', description: 'Manages employee relations, industrial relations, and workplace disputes.', maturityLevel: 'Defined', riskLevel: 'High', owner: 'Employee Relations Manager' },
                    { id: 'BC180', code: 'BC180', name: 'Health, Safety, & Wellbeing Management', description: 'Manages workplace health, safety, and employee wellbeing programs.', maturityLevel: 'Managed', riskLevel: 'High', owner: 'Health & Safety Manager' },
                    { id: 'BC183', code: 'BC183', name: 'Human Resource Support', description: 'Provides HR support services and employee assistance programs.', maturityLevel: 'Managed', riskLevel: 'Low', owner: 'HR Support Manager' }
                ]
            }
        },
        applications: {
            'hr-systems': {
                title: 'Human Resource Systems',
                icon: '<Users className="w-5 h-5" />',
                color: 'green',
                applications: [
                    { id: 'AC200', code: 'AC200', name: 'Human Resource Management System', status: 'Active', owner: 'HR Technology Team', description: 'Comprehensive HRMS for managing employee lifecycle and HR processes.' },
                    { id: 'AC201', code: 'AC201', name: 'Talent Management', status: 'Active', owner: 'Talent Team', description: 'Platform for recruitment, talent development, and succession planning.' },
                    { id: 'AC202', code: 'AC202', name: 'Performance Management', status: 'Active', owner: 'Performance Team', description: 'System for managing employee performance and development.' }
                ]
            },
            'payroll-benefits': {
                title: 'Payroll & Benefits Systems',
                icon: '<CreditCard className="w-5 h-5" />',
                color: 'blue',
                applications: [
                    { id: 'AC203', code: 'AC203', name: 'Payroll Management', status: 'Active', owner: 'Payroll Team', description: 'System for processing payroll and managing compensation.' },
                    { id: 'AC204', code: 'AC204', name: 'Benefits Administration', status: 'Active', owner: 'Benefits Team', description: 'Platform for managing employee benefits and entitlements.' }
                ]
            },
            'learning-safety': {
                title: 'Learning & Safety Systems',
                icon: '<Shield className="w-5 h-5" />',
                color: 'purple',
                applications: [
                    { id: 'AC205', code: 'AC205', name: 'Learning Management', status: 'Active', owner: 'L&D Team', description: 'System for managing training programs and professional development.' },
                    { id: 'AC206', code: 'AC206', name: 'Health & Safety Management', status: 'Active', owner: 'Safety Team', description: 'Platform for managing workplace health and safety compliance.' }
                ]
            }
        },
        dataEntities: [
            { id: 'DE001', code: 'DE001', name: 'Employee', description: 'Employee personal information, employment details, and records' },
            { id: 'DE002', code: 'DE002', name: 'Position', description: 'Job positions, roles, and organizational structure data' },
            { id: 'DE003', code: 'DE003', name: 'Performance', description: 'Employee performance evaluations and development records' },
            { id: 'DE060', code: 'DE060', name: 'Recruitment', description: 'Recruitment processes, applications, and candidate data' },
            { id: 'DE061', code: 'DE061', name: 'Training', description: 'Training programs, certifications, and learning records' },
            { id: 'DE063', code: 'DE063', name: 'Compensation', description: 'Salary, benefits, and compensation structure data' },
            { id: 'DE064', code: 'DE064', name: 'Leave', description: 'Employee leave applications and entitlement records' },
            { id: 'DE065', code: 'DE065', name: 'Health & Safety', description: 'Workplace health, safety incidents, and compliance data' },
            { id: 'DE066', code: 'DE066', name: 'Employee Relations', description: 'Employee relations cases and workplace dispute data' },
            { id: 'DE067', code: 'DE067', name: 'Organizational Structure', description: 'Organizational hierarchy and reporting relationship data' }
        ],
        teamMembers: [
            { id: 'user-5', name: 'Jennifer Smith', role: 'HR Director', email: 'j.smith@usc.edu', avatar: '👩‍💼', color: 'bg-green-100 border-green-300', textColor: 'text-green-800', department: 'Human Resources', permissions: ['assess', 'approve'] },
            { id: 'user-6', name: 'Michael Brown', role: 'Talent Acquisition Manager', email: 'm.brown@usc.edu', avatar: '👨‍💼', color: 'bg-blue-100 border-blue-300', textColor: 'text-blue-800', department: 'Talent Management', permissions: ['assess', 'review'] },
            { id: 'user-7', name: 'Lisa Chen', role: 'Learning & Development Manager', email: 'l.chen@usc.edu', avatar: '👩‍🏫', color: 'bg-purple-100 border-purple-300', textColor: 'text-purple-800', department: 'L&D', permissions: ['assess', 'design'] },
            { id: 'user-8', name: 'David Wilson', role: 'Employee Relations Manager', email: 'd.wilson@usc.edu', avatar: '👨‍⚖️', color: 'bg-orange-100 border-orange-300', textColor: 'text-orange-800', department: 'Employee Relations', permissions: ['assess', 'mediate'] }
        ]
    }
}


export default organizationalData;