export const hermApplicationCapabilities = [
  {
    id: 'AD001',
    code: 'AD001',
    name: 'Learning & Teaching',
    type: 'Application Domain',
    portfolios: [
      {
        id: 'AP021',
        code: 'AP021',
        name: 'Curriculum Management',
        type: 'Application Portfolio',
        applications: [
          { 
            id: 'AC096', 
            code: 'AC096', 
            name: 'Curriculum Lifecycle Management', 
            type: 'Application Capability',
            description: 'Curriculum Lifecycle Management applications enable the design, creation, maintenance, and disestablishment of curriculum for educational institutions.',
            productExamples: 'Akari, CourseLoop, Global IT Factory'
          },
          { 
            id: 'AC105', 
            code: 'AC105', 
            name: 'Curriculum Accreditation', 
            type: 'Application Capability',
            description: 'Curriculum Accreditation applications enable the capture, analysis, and reporting of information required for the application and maintenance of external accreditation of curricula and the schools, colleges, or institutions that deliver accredited curricula.',
            productExamples: 'Creatrix Campus, RimaOne ACADEM'
          }
        ]
      },
      {
        id: 'AP001',
        code: 'AP001',
        name: 'Student Attraction',
        type: 'Application Portfolio',
        applications: [
          { 
            id: 'AC001', 
            code: 'AC001', 
            name: 'Student Recruitment', 
            type: 'Application Capability',
            description: 'Student Recruitment applications enable attracting and engaging with prospective students.',
            comments: 'These applications are used to manage the complexities of the student recruitment pipeline from lead to prospect to opportunity. Functionality typically includes: lead generation and prospect data management; automated prospect nurturing; recruitment event scheduling, and application processing.',
            productExamples: 'Ellucian Recruit, Salesforce Education Cloud, Technolutions Slate'
          },
          { 
            id: 'AC002', 
            code: 'AC002', 
            name: 'Agent Management', 
            type: 'Application Capability',
            description: 'Agent Management applications are responsible for managing international and domestic student recruitment agents.',
            productExamples: 'Ascent One, StudyLink Connect'
          }
        ]
      },
      {
        id: 'AP004',
        code: 'AP004',
        name: 'Student Administration',
        type: 'Application Portfolio',
        applications: [
          { 
            id: 'AC003', 
            code: 'AC003', 
            name: 'Student Admission', 
            type: 'Application Capability',
            description: 'Student Admission applications are responsible for managing domestic and international student admissions.',
            productExamples: 'Ellucian, Tribal SITS, ZAP Solutions - AMP'
          },
          { 
            id: 'AC004', 
            code: 'AC004', 
            name: 'Transfer Credit Management', 
            type: 'Application Capability',
            description: 'Transfer Credit Management applications enable the evaluation and management of transfer credits from other institutions.',
            productExamples: 'CollegeSource, Transferology'
          },
          { 
            id: 'AC005', 
            code: 'AC005', 
            name: 'International Student Management', 
            type: 'Application Capability',
            description: 'International Student Management applications enable the management of visa compliance and international student requirements.',
            comments: 'These applications commonly support SEVIS reporting, visa tracking, and compliance monitoring for international students.',
            productExamples: 'iGrad, Sunapsis'
          },
          { 
            id: 'AC006', 
            code: 'AC006', 
            name: 'Student Management', 
            type: 'Application Capability',
            description: 'Student Management applications support the core records, functions, and processes of the student lifecycle.',
            comments: 'The core scope of functionality of student management applications covers the formal student lifecycle (typically beginning upon matriculation and ends upon cessation of study) and includes the following: applications, admissions and enrolment; course catalogue management; student record management; class management; student financial management (billing); compliance management and reporting.',
            productExamples: 'Callista, Ellucian Banner, Oracle PeopleSoft Campus Solutions, Technology One Student, Tribal SITS, Workday Student'
          },
          { 
            id: 'AC007', 
            code: 'AC007', 
            name: 'Student Conduct Management', 
            type: 'Application Capability',
            description: 'Student Conduct Management applications enable the administration of student misconduct processes.',
            comments: 'Student Conduct Management applications commonly support case management functionality for different types of misconduct (e.g. academic and non-academic).',
            productExamples: 'Maxient, Symplicity'
          },
          { 
            id: 'AC083', 
            code: 'AC083', 
            name: 'Student Portal', 
            type: 'Application Capability',
            description: 'Student Portal applications provide students with a unified interface to institutional resources and functions.',
            comments: 'Student Portal applications commonly integrate with other student-facing applications such as the Student Management System and Learning Management System.',
            productExamples: 'Campus Labs, Ellucian Experience, Oracle Student Cloud'
          },
          { 
            id: 'AC086', 
            code: 'AC086', 
            name: 'Credential Platform', 
            type: 'Application Capability',
            description: 'Credential Platform applications enable the generation, validation, and sharing of student credentials.',
            comments: 'Credential Platform applications commonly integrate with Student Management Systems to automatically generate digital credentials upon completion of courses, programmes, or other achievements.',
            productExamples: 'Accredible, BadgeList, Credly, Parchment'
          },
          { 
            id: 'AC087', 
            code: 'AC087', 
            name: 'Timetable Management', 
            type: 'Application Capability',
            description: 'Timetable Management applications enable optimal allocation of course classes to scheduled time periods and venues.',
            comments: 'Timetable Management applications commonly include resource optimisation capabilities. Some Student Management Systems include timetabling solutions.',
            productExamples: 'CELCAT, Concept Evolution, Infosilem, Semestry, Syllabus Plus'
          },
          { 
            id: 'AC088', 
            code: 'AC088', 
            name: 'Exchange & Transfer Management', 
            type: 'Application Capability',
            description: 'Exchange & Transfer Management applications enable the administration of domestic and international student exchanges and transfers.',
            productExamples: 'Study Abroad 101, Terra Dotta'
          },
          { 
            id: 'AC089', 
            code: 'AC089', 
            name: 'Credit & Articulation', 
            type: 'Application Capability',
            description: 'Credit & Articulation applications recognise credits for prior student learning and suggest appropriate coursework and pathways.',
            productExamples: 'Transferology'
          },
          { 
            id: 'AC115', 
            code: 'AC115', 
            name: 'Graduation Management', 
            type: 'Application Capability',
            description: 'Graduation Management applications enable the administration of graduation processes and ceremonies.',
            productExamples: 'GradHub, Parchment'
          },
          { 
            id: 'AC116', 
            code: 'AC116', 
            name: 'Financial Aid', 
            type: 'Application Capability',
            description: 'Financial Aid applications enable the administration of financial support awarded to students.',
            comments: 'Financial Aid application solutions are commonly deployed as modules of full-service Student Management Systems. The Financial Aid applications market is broadly oriented towards meeting the specific needs of North American higher education.',
            productExamples: 'BlackBaud, CampusLogic, Elluician, FAME, Oracle, Workday'
          },
          { 
            id: 'AC122', 
            code: 'AC122', 
            name: 'Candidature Management', 
            type: 'Application Capability',
            description: 'Candidature Management applications enable functions of the student lifecycle unique to candidates undertaking study by research.',
            comments: 'These applications typically support doctoral or sub-doctoral Programmes of Learning. Functionality of Candidature Management applications includes matchmaking with research topics and research supervisors, access to funding and resources, the specification and management of achievement towards agreed milestones, thesis management, and the functions of the doctoral and sub-doctoral enrolment. Many institutions utilise custom applications or configure CRM platforms to perform these functions.',
            productExamples: 'Cayuse GEM, ResearchMaster HDR, Technology One Student'
          },
          { 
            id: 'AC123', 
            code: 'AC123', 
            name: 'Scholarship Management', 
            type: 'Application Capability',
            description: 'Scholarship Management applications enable the administration of scholarship programmes.',
            comments: 'Scholarship Management application solutions are commonly deployed as modules of full-service Student Management Systems or sometimes specialised Financial Aid applications.',
            productExamples: 'AcademicWorks, CampusLogic, Ellucian, InfoReady, Oracle, WizeHive Zengine'
          }
        ]
      },
      {
        id: 'AP013',
        code: 'AP013',
        name: 'Learning Content',
        type: 'Application Portfolio',
        applications: [
          { 
            id: 'AC093', 
            code: 'AC093', 
            name: 'eLearning Authoring', 
            type: 'Application Capability',
            description: 'eLearning Authoring applications enable the creation of digital learning content.',
            comments: 'eLearning Authoring applications commonly enable content creators to generate interactive content without technical programming skills. Some eLearning Authoring applications integrate directly with Learning Management Systems.',
            productExamples: 'Adobe Captivate, Articulate Storyline, H5P, iSpring'
          },
          { 
            id: 'AC094', 
            code: 'AC094', 
            name: 'Digital Media Management', 
            type: 'Application Capability',
            description: 'Digital Media Management applications enable the storage, cataloguing, discovery, and delivery of digital media.',
            comments: 'Digital Media Management applications in higher education are commonly used to store and deliver lecture recordings and other educational video content.',
            productExamples: 'Kaltura, Panopto, YuJa'
          },
          { 
            id: 'AC095', 
            code: 'AC095', 
            name: 'Digital Learning Object Management', 
            type: 'Application Capability',
            description: 'Digital Learning Object Management applications enable the storage, cataloguing, discovery, and reuse of digital learning objects.',
            comments: 'Digital Learning Object Management applications are commonly referred to as Learning Object Repositories (LOR).',
            productExamples: 'EQUELLA, Fedora, MIT DSpace'
          }
        ]
      },
      {
        id: 'AP014',
        code: 'AP014',
        name: 'Curriculum Delivery',
        type: 'Application Portfolio',
        applications: [
          { 
            id: 'AC097', 
            code: 'AC097', 
            name: 'Learning Management System', 
            type: 'Application Capability',
            description: 'Learning Management System applications enable the delivery, tracking, and administration of educational courses and training programmes.',
            comments: 'Learning Management Systems commonly provide functionality for course creation and management, content delivery, assessment, communication, and reporting. LMS applications may be supplemented by additional learning technologies.',
            productExamples: 'Blackboard Learn, Canvas, D2L Brightspace, Moodle, Sakai'
          },
          { 
            id: 'AC098', 
            code: 'AC098', 
            name: 'Placement Management', 
            type: 'Application Capability',
            description: 'Placement Management applications enable the administration of student placements with external organisations.',
            comments: 'Placement Management applications commonly support the matching of students with placement opportunities, the management of placement documentation, and the monitoring of placement progress.',
            productExamples: 'InPlace, Kuali, PebblePad, Watermark'
          },
          { 
            id: 'AC137', 
            code: 'AC137', 
            name: 'Specialist Learning Tool', 
            type: 'Application Capability',
            description: 'Specialist Learning Tool applications enable specific learning activities or support particular pedagogical approaches.',
            comments: 'Specialist Learning Tools are commonly used to supplement Learning Management Systems with specialised functionality for specific disciplines or teaching approaches.',
            productExamples: 'Labster, McGraw-Hill Connect, Pearson MyLab, TopHat'
          }
        ]
      },
      {
        id: 'AP005',
        code: 'AP005',
        name: 'Student Success',
        type: 'Application Portfolio',
        applications: [
          { 
            id: 'AC090', 
            code: 'AC090', 
            name: 'Career Support', 
            type: 'Application Capability',
            description: 'Career Support applications enable the delivery of career services and employment support to students and graduates.',
            comments: 'Career Support applications commonly include functionality for job posting, employer engagement, career counselling, and graduate outcome tracking.',
            productExamples: 'CSO, GradJobs, Handshake, PeopleGrove, Symplicity'
          },
          { 
            id: 'AC091', 
            code: 'AC091', 
            name: 'Academic Advisement', 
            type: 'Application Capability',
            description: 'Academic Advisement applications enable the administration of academic advising and support services.',
            comments: 'Academic Advisement applications commonly include functionality for appointment scheduling, degree audit, academic planning, and communication between advisors and students.',
            productExamples: 'AdAstra, EAB Navigate, Ellucian Degree Works, Starfish'
          },
          { 
            id: 'AC092', 
            code: 'AC092', 
            name: 'Learning Analytics', 
            type: 'Application Capability',
            description: 'Learning Analytics applications enable the collection, analysis, and reporting of data about learners and their contexts.',
            comments: 'Learning Analytics applications commonly integrate with Learning Management Systems and Student Management Systems to provide insights into student engagement, performance, and risk factors.',
            productExamples: 'Blackboard Analytics, Brightspace Insights, Civitas Learning, Yellowdig'
          }
        ]
      },
      {
        id: 'AP015',
        code: 'AP015',
        name: 'Learning Assessment',
        type: 'Application Portfolio',
        applications: [
          { 
            id: 'AC101', 
            code: 'AC101', 
            name: 'Examination Management', 
            type: 'Application Capability',
            description: 'Examination Management applications enable the administration of examinations and assessments.',
            comments: 'Examination Management applications commonly include functionality for examination scheduling, venue allocation, invigilation management, and results processing.',
            productExamples: 'ExamSoft, Inspera, TestReach'
          },
          { 
            id: 'AC102', 
            code: 'AC102', 
            name: 'Results Management', 
            type: 'Application Capability',
            description: 'Results Management applications enable the processing, analysis, and reporting of assessment results.',
            comments: 'Results Management applications commonly integrate with Student Management Systems and Learning Management Systems to streamline the flow of assessment data.',
            productExamples: 'Rogo, TestReach'
          },
          { 
            id: 'AC103', 
            code: 'AC103', 
            name: 'Academic Integrity', 
            type: 'Application Capability',
            description: 'Academic Integrity applications enable the detection and prevention of academic misconduct.',
            comments: 'Academic Integrity applications commonly include plagiarism detection, collusion detection, and contract cheating detection capabilities.',
            productExamples: 'Ouriginal, SafeAssign, Turnitin, Urkund'
          },
          { 
            id: 'AC104', 
            code: 'AC104', 
            name: 'ePortfolio Management', 
            type: 'Application Capability',
            description: 'ePortfolio Management applications enable students to create, maintain, and share digital portfolios of their learning and achievements.',
            comments: 'ePortfolio Management applications commonly support reflection, goal setting, and showcase functionality.',
            productExamples: 'Digication, FolioSpaces, Mahara, PebblePad, Portfolium'
          },
          { 
            id: 'AC132', 
            code: 'AC132', 
            name: 'Remote Proctoring', 
            type: 'Application Capability',
            description: 'Remote Proctoring applications enable the supervision of examinations and assessments conducted remotely.',
            comments: 'Remote Proctoring applications commonly use video monitoring, screen recording, and AI-based analysis to detect potential academic misconduct during remote examinations.',
            productExamples: 'ExamSoft, Honorlock, ProctorU, Respondus'
          }
        ]
      }
    ]
  },
  {
    id: 'AD002',
    code: 'AD002',
    name: 'Research',
    type: 'Application Domain',
    portfolios: [
      {
        id: 'AP002',
        code: 'AP002',
        name: 'Research Management',
        type: 'Application Portfolio',
        applications: [
          { 
            id: 'AC063', 
            code: 'AC063', 
            name: 'Research Ethics Management', 
            type: 'Application Capability',
            description: 'Research Ethics Management applications enable the administration of research ethics approval processes.',
            comments: 'Research Ethics Management applications commonly support the submission, review, and approval of research ethics applications, as well as ongoing monitoring of approved research.',
            productExamples: 'Cayuse IRB, Click Ethics, SPARK'
          },
          { 
            id: 'AC065', 
            code: 'AC065', 
            name: 'Intellectual Property & Commercialisation', 
            type: 'Application Capability',
            description: 'Intellectual Property & Commercialisation applications enable the management of intellectual property portfolios and commercialisation activities.',
            comments: 'These applications commonly support patent management, licensing, and spin-off company creation.',
            productExamples: 'Anaqua, AppColl, Inteum'
          },
          { 
            id: 'AC067', 
            code: 'AC067', 
            name: 'Research Fund Sourcing', 
            type: 'Application Capability',
            description: 'Research Fund Sourcing applications assemble and present information about potential funding sources.',
            comments: 'Research Fund Sourcing applications commonly aggregate the details of research funds from various databases, providers, and agencies so that research advisors and individual researchers can explore and assess options. These applications are sometimes capable of filtering research funding options to meet the specific interests, expertise, and capacity of individual researchers or of a research group.',
            productExamples: 'Cayuse Fund Finder, Research Professional, VIP-Research Industry Profiling'
          },
          { 
            id: 'AC068', 
            code: 'AC068', 
            name: 'Innovation Management', 
            type: 'Application Capability',
            description: 'Innovation Management applications enable the administration of innovation and technology transfer activities.',
            comments: 'Innovation Management applications commonly support the identification, protection, and commercialisation of intellectual property.',
            productExamples: 'Inteum, TechPlan'
          },
          { 
            id: 'AC069', 
            code: 'AC069', 
            name: 'Research Grants Management', 
            type: 'Application Capability',
            description: 'Research Grants Management applications enable the administration of research grants and funding.',
            comments: 'Research Grants Management applications commonly support the full lifecycle of research grants from application preparation through to final reporting.',
            productExamples: 'Cayuse, InfoEd Global, ProposalCentral, ResearchFish'
          },
          { 
            id: 'AC139', 
            code: 'AC139', 
            name: 'Research Collaboration', 
            type: 'Application Capability',
            description: 'Research Collaboration applications enable collaborative research activities and partnerships.',
            comments: 'These applications commonly support research networking, collaboration matching, and joint project management.',
            productExamples: 'ResearchGate, Academia.edu, Mendeley'
          }
        ]
      },
      {
        id: 'AP006',
        code: 'AP006',
        name: 'Research Activity',
        type: 'Application Portfolio',
        applications: [
          { 
            id: 'AC008', 
            code: 'AC008', 
            name: 'Research Project Management', 
            type: 'Application Capability',
            description: 'Research Project Management applications enable the planning, tracking, and management of research projects.',
            comments: 'These applications commonly support project planning, milestone tracking, resource allocation, and progress reporting for research activities.',
            productExamples: 'Microsoft Project, Smartsheet, Asana, Monday.com'
          },
          { 
            id: 'AC009', 
            code: 'AC009', 
            name: 'Laboratory Notebook', 
            type: 'Application Capability',
            description: 'Laboratory Notebook applications enable digital recording and management of research observations and data.',
            comments: 'Electronic Lab Notebooks (ELNs) commonly support secure data entry, version control, collaboration, and regulatory compliance.',
            productExamples: 'LabArchives, Benchling, LabGuru, SciNote'
          },
          { 
            id: 'AC010', 
            code: 'AC010', 
            name: 'Survey & Data Collection', 
            type: 'Application Capability',
            description: 'Survey & Data Collection applications enable the design, distribution, and analysis of research surveys and data collection instruments.',
            comments: 'These applications commonly support questionnaire design, participant recruitment, data collection, and basic statistical analysis.',
            productExamples: 'Qualtrics, REDCap, SurveyMonkey, LimeSurvey'
          },
          { 
            id: 'AC066', 
            code: 'AC066', 
            name: 'Research Information Management', 
            type: 'Application Capability',
            description: 'Research Information Management applications enable the collection, management, and reporting of information about research activities and outputs.',
            comments: 'Research Information Management Systems (RIMS) commonly integrate with other institutional systems to provide comprehensive research intelligence and reporting.',
            productExamples: 'Elements, Pure, Symplectic'
          },
          { 
            id: 'AC070', 
            code: 'AC070', 
            name: 'Laboratory Information Management', 
            type: 'Application Capability',
            description: 'Laboratory Information Management applications enable the administration of laboratory operations and data.',
            comments: 'Laboratory Information Management Systems (LIMS) commonly support sample tracking, data management, instrument integration, and regulatory compliance.',
            productExamples: 'LabVantage, LabWare, Thermo Scientific SampleManager'
          },
          { 
            id: 'AC012', 
            code: 'AC012', 
            name: 'Research Participant Management', 
            type: 'Application Capability',
            description: 'Research Participant Management applications enable the recruitment, scheduling, and management of research participants.',
            comments: 'These applications commonly support participant databases, consent management, scheduling, and communication.',
            productExamples: 'SONA Systems, REDCap, Calendly'
          },
          { 
            id: 'AC013', 
            code: 'AC013', 
            name: 'Statistical Analysis', 
            type: 'Application Capability',
            description: 'Statistical Analysis applications enable advanced statistical analysis and modeling of research data.',
            comments: 'These applications commonly support descriptive and inferential statistics, data visualization, and statistical modeling.',
            productExamples: 'SPSS, R, SAS, Stata, MATLAB'
          },
          { 
            id: 'AC014', 
            code: 'AC014', 
            name: 'Reference Management', 
            type: 'Application Capability',
            description: 'Reference Management applications enable the collection, organization, and citation of research references and bibliographies.',
            comments: 'These applications commonly support citation formatting, bibliography generation, and integration with word processors.',
            productExamples: 'EndNote, Mendeley, Zotero, RefWorks'
          }
        ]
      },
      {
        id: 'AP003',
        code: 'AP003',
        name: 'Research Data Management',
        type: 'Application Portfolio',
        applications: [
          { 
            id: 'AC064', 
            code: 'AC064', 
            name: 'Research Data Storage & Compute', 
            type: 'Application Capability',
            description: 'Research Data Storage & Compute applications provide secure, scalable storage and computational resources for research data.',
            comments: 'These applications commonly provide high-performance computing capabilities and large-scale data storage for research projects.',
            productExamples: 'AWS Research Cloud, Google Cloud for Research, Microsoft Azure for Research'
          },
          { 
            id: 'AC071', 
            code: 'AC071', 
            name: 'Research Data Repository', 
            type: 'Application Capability',
            description: 'Research Data Repository applications enable the storage, cataloguing, and sharing of research datasets.',
            comments: 'Research Data Repositories commonly support data publication, citation, and long-term preservation.',
            productExamples: 'Dataverse, DSpace, Fedora, Figshare'
          },
          { 
            id: 'AC015', 
            code: 'AC015', 
            name: 'Data Visualization', 
            type: 'Application Capability',
            description: 'Data Visualization applications enable the creation of charts, graphs, and interactive visualizations of research data.',
            comments: 'These applications commonly support various chart types, interactive dashboards, and integration with statistical analysis tools.',
            productExamples: 'Tableau, Power BI, D3.js, Plotly, ggplot2'
          },
          { 
            id: 'AC016', 
            code: 'AC016', 
            name: 'Data Cleaning & Preparation', 
            type: 'Application Capability',
            description: 'Data Cleaning & Preparation applications enable the preprocessing and transformation of raw research data.',
            comments: 'These applications commonly support data validation, outlier detection, missing data handling, and data transformation.',
            productExamples: 'OpenRefine, Trifacta, Alteryx, Python pandas, R tidyverse'
          }
        ]
      },
      {
        id: 'AP007',
        code: 'AP007',
        name: 'Research Metrics',
        type: 'Application Portfolio',
        applications: [
          { 
            id: 'AC072', 
            code: 'AC072', 
            name: 'Research Performance Management', 
            type: 'Application Capability',
            description: 'Research Performance Management applications enable the measurement, analysis, and reporting of research performance and impact.',
            comments: 'These applications commonly integrate with bibliographic databases and research information systems to provide comprehensive research analytics.',
            productExamples: 'Altmetric, PlumX, SciVal, Web of Science'
          },
          { 
            id: 'AC017', 
            code: 'AC017', 
            name: 'Bibliometric Analysis', 
            type: 'Application Capability',
            description: 'Bibliometric Analysis applications enable the quantitative analysis of scholarly publications and citations.',
            comments: 'These applications commonly support citation analysis, impact metrics, research trend analysis, and collaboration network mapping.',
            productExamples: 'Web of Science, Scopus, Google Scholar, VOSviewer'
          }
        ]
      }
    ]
  },
  {
    id: 'AD003',
    code: 'AD003',
    name: 'Enabling',
    type: 'Application Domain',
    portfolios: [
      {
        id: 'AP008',
        code: 'AP008',
        name: 'Governance',
        type: 'Application Portfolio',
        applications: [
          { 
            id: 'AC074', 
            code: 'AC074', 
            name: 'Risk Management', 
            type: 'Application Capability',
            description: 'Risk Management applications enable the identification, assessment, and mitigation of institutional risks.',
            comments: 'Risk Management applications commonly support risk registers, risk assessment workflows, and risk reporting.',
            productExamples: 'Archer, LogicGate, MetricStream, ServiceNow'
          },
          { 
            id: 'AC075', 
            code: 'AC075', 
            name: 'Compliance Management', 
            type: 'Application Capability',
            description: 'Compliance Management applications enable the monitoring and reporting of compliance with regulatory requirements.',
            comments: 'Compliance Management applications commonly support compliance tracking, audit management, and regulatory reporting.',
            productExamples: 'MetricStream, ServiceNow, Thomson Reuters'
          },
          { 
            id: 'AC076', 
            code: 'AC076', 
            name: 'Quality Management', 
            type: 'Application Capability',
            description: 'Quality Management applications enable the management of quality assurance and improvement processes.',
            comments: 'Quality Management applications commonly support quality standards compliance, process improvement, and performance monitoring.',
            productExamples: 'Intelex, MasterControl, ServiceNow'
          },
          { 
            id: 'AC077', 
            code: 'AC077', 
            name: 'Internal Audit', 
            type: 'Application Capability',
            description: 'Internal Audit applications enable the planning, execution, and reporting of internal audit activities.',
            comments: 'Internal Audit applications commonly support audit planning, fieldwork management, and audit reporting.',
            productExamples: 'AuditBoard, Galvanize, ServiceNow'
          },
          { 
            id: 'AC018', 
            code: 'AC018', 
            name: 'Policy Management', 
            type: 'Application Capability',
            description: 'Policy Management applications enable the creation, approval, publication, and maintenance of institutional policies.',
            comments: 'Policy Management applications commonly include workflow functionality for policy development and approval processes.',
            productExamples: 'MetricStream, PolicyTech, ServiceNow'
          },
          { 
            id: 'AC019', 
            code: 'AC019', 
            name: 'Board Management', 
            type: 'Application Capability',
            description: 'Board Management applications enable the administration of board meetings, documents, and governance processes.',
            comments: 'These applications commonly support meeting scheduling, document distribution, voting, and minutes management.',
            productExamples: 'BoardEffect, Diligent, OnBoard, Aprio'
          },
          { 
            id: 'AC020', 
            code: 'AC020', 
            name: 'Legal Case Management', 
            type: 'Application Capability',
            description: 'Legal Case Management applications enable the management of legal matters and litigation.',
            comments: 'These applications commonly support case tracking, document management, deadline management, and legal workflow.',
            productExamples: 'Clio, MyCase, PracticePanther, LexisNexis'
          },
          { 
            id: 'AC021', 
            code: 'AC021', 
            name: 'Contract Management', 
            type: 'Application Capability',
            description: 'Contract Management applications enable the creation, negotiation, execution, and management of contracts.',
            comments: 'These applications commonly support contract lifecycle management, approval workflows, and compliance monitoring.',
            productExamples: 'Agiloft, ContractWorks, DocuSign CLM, Icertis'
          }
        ]
      },
      {
        id: 'AP009',
        code: 'AP009',
        name: 'Change & Transformation',
        type: 'Application Portfolio',
        applications: [
          { 
            id: 'AC078', 
            code: 'AC078', 
            name: 'Project & Portfolio Management', 
            type: 'Application Capability',
            description: 'Project & Portfolio Management applications enable the planning, execution, and monitoring of projects and programmes.',
            comments: 'These applications commonly support project planning, resource management, progress tracking, and portfolio oversight.',
            productExamples: 'Clarity, Microsoft Project, Smartsheet, Workday Adaptive Planning'
          },
          { 
            id: 'AC022', 
            code: 'AC022', 
            name: 'Enterprise Architecture', 
            type: 'Application Capability',
            description: 'Enterprise Architecture applications enable the design, planning, and governance of enterprise architecture.',
            comments: 'Enterprise Architecture applications commonly support architecture modeling, impact analysis, and architecture governance.',
            productExamples: 'Ardoq, MEGA, Sparx Enterprise Architect, Software AG Alfabet'
          },
          { 
            id: 'AC025', 
            code: 'AC025', 
            name: 'Business Process Management', 
            type: 'Application Capability',
            description: 'Business Process Management applications enable the modeling, automation, and optimization of business processes.',
            comments: 'BPM applications commonly support process modeling, workflow automation, and process analytics.',
            productExamples: 'Appian, Pega, ServiceNow, UIPath'
          },
          { 
            id: 'AC026', 
            code: 'AC026', 
            name: 'Change Management', 
            type: 'Application Capability',
            description: 'Change Management applications enable the planning, communication, and management of organizational change initiatives.',
            comments: 'These applications commonly support change impact assessment, stakeholder communication, and change readiness tracking.',
            productExamples: 'Prosci, ChangeGear, ServiceNow, Workday'
          },
          { 
            id: 'AC027', 
            code: 'AC027', 
            name: 'Innovation Management', 
            type: 'Application Capability',
            description: 'Innovation Management applications enable the capture, evaluation, and development of innovative ideas.',
            comments: 'These applications commonly support idea submission, evaluation workflows, and innovation pipeline management.',
            productExamples: 'Brightidea, IdeaScale, Spigit, Qmarkets'
          }
        ]
      },
      {
        id: 'AP010',
        code: 'AP010',
        name: 'Service & Operation',
        type: 'Application Portfolio',
        applications: [
          { 
            id: 'AC081', 
            code: 'AC081', 
            name: 'Service Management', 
            type: 'Application Capability',
            description: 'Service Management applications enable the delivery and support of IT and business services.',
            comments: 'Service Management applications commonly support incident management, problem management, change management, and service catalog functionality.',
            productExamples: 'Cherwell, Freshservice, Remedy, ServiceNow'
          },
          { 
            id: 'AC082', 
            code: 'AC082', 
            name: 'Asset Management', 
            type: 'Application Capability',
            description: 'Asset Management applications enable the tracking and management of physical and digital assets.',
            comments: 'Asset Management applications commonly support asset discovery, inventory management, and lifecycle tracking.',
            productExamples: 'IBM Maximo, Infor EAM, ServiceNow, UpKeep'
          },
          { 
            id: 'AC028', 
            code: 'AC028', 
            name: 'Facilities Management', 
            type: 'Application Capability',
            description: 'Facilities Management applications enable the management of physical facilities and infrastructure.',
            comments: 'Facilities Management applications commonly support space management, maintenance scheduling, and energy management.',
            productExamples: 'Archibus, FM:Systems, Manhattan, ServiceNow'
          },
          { 
            id: 'AC030', 
            code: 'AC030', 
            name: 'Procurement Management', 
            type: 'Application Capability',
            description: 'Procurement Management applications enable the sourcing, purchasing, and management of goods and services.',
            comments: 'Procurement Management applications commonly support supplier management, contract management, and purchase order processing.',
            productExamples: 'Ariba, Coupa, Oracle Purchasing, Workday Procurement'
          },
          { 
            id: 'AC031', 
            code: 'AC031', 
            name: 'Inventory Management', 
            type: 'Application Capability',
            description: 'Inventory Management applications enable the tracking and management of institutional inventory and supplies.',
            comments: 'These applications commonly support stock tracking, reorder management, and inventory optimization.',
            productExamples: 'NetSuite, SAP MM, Oracle Inventory, Fishbowl'
          },
          { 
            id: 'AC032', 
            code: 'AC032', 
            name: 'Vendor Management', 
            type: 'Application Capability',
            description: 'Vendor Management applications enable the management of supplier relationships and performance.',
            comments: 'These applications commonly support vendor onboarding, performance monitoring, and contract management.',
            productExamples: 'Vendorful, Coupa, SAP Ariba, Oracle Supplier Network'
          },
          { 
            id: 'AC033', 
            code: 'AC033', 
            name: 'Transportation Management', 
            type: 'Application Capability',
            description: 'Transportation Management applications enable the management of institutional transportation services.',
            comments: 'These applications commonly support fleet management, route optimization, and transportation scheduling.',
            productExamples: 'Fleetio, Samsara, Verizon Connect, GPS Insight'
          },
          { 
            id: 'AC034', 
            code: 'AC034', 
            name: 'Energy Management', 
            type: 'Application Capability',
            description: 'Energy Management applications enable the monitoring and optimization of energy consumption.',
            comments: 'These applications commonly support energy monitoring, sustainability reporting, and energy efficiency analysis.',
            productExamples: 'EnergyCAP, Schneider Electric, Siemens, Johnson Controls'
          },
          { 
            id: 'AC035', 
            code: 'AC035', 
            name: 'Security Management', 
            type: 'Application Capability',
            description: 'Security Management applications enable the management of physical and information security.',
            comments: 'These applications commonly support access control, incident management, and security monitoring.',
            productExamples: 'Genetec, Milestone, Avigilon, Honeywell'
          },
          { 
            id: 'AC036', 
            code: 'AC036', 
            name: 'Environmental Management', 
            type: 'Application Capability',
            description: 'Environmental Management applications enable the monitoring and management of environmental compliance and sustainability.',
            comments: 'These applications commonly support environmental reporting, waste management, and sustainability tracking.',
            productExamples: 'Locus, Enablon, SAP EHS, Sphera'
          },
          { 
            id: 'AC037', 
            code: 'AC037', 
            name: 'Emergency Management', 
            type: 'Application Capability',
            description: 'Emergency Management applications enable emergency preparedness, response, and communication.',
            comments: 'These applications commonly support emergency notification, incident command, and crisis communication.',
            productExamples: 'Everbridge, Rave Mobile Safety, Alertus, Blackboard Connect'
          },
          { 
            id: 'AC038', 
            code: 'AC038', 
            name: 'Space Management', 
            type: 'Application Capability',
            description: 'Space Management applications enable the optimization and allocation of physical spaces.',
            comments: 'These applications commonly support space planning, occupancy tracking, and space utilization analysis.',
            productExamples: 'Archibus, FM:Systems, iOFFICE, SpaceIQ'
          },
          { 
            id: 'AC039', 
            code: 'AC039', 
            name: 'Maintenance Management', 
            type: 'Application Capability',
            description: 'Maintenance Management applications enable the planning and tracking of facility and equipment maintenance.',
            comments: 'These applications commonly support work order management, preventive maintenance scheduling, and maintenance history tracking.',
            productExamples: 'IBM Maximo, UpKeep, Fiix, Maintenance Connection'
          }
        ]
      },
      {
        id: 'AP012',
        code: 'AP012',
        name: 'Digital Identity',
        type: 'Application Portfolio',
        applications: [
          { 
            id: 'AC099', 
            code: 'AC099', 
            name: 'Identity & Access Management', 
            type: 'Application Capability',
            description: 'Identity & Access Management applications enable the management of user identities and access permissions.',
            comments: 'IAM applications commonly support single sign-on, multi-factor authentication, and role-based access control.',
            productExamples: 'Active Directory, Okta, Ping Identity, SailPoint'
          },
          { 
            id: 'AC040', 
            code: 'AC040', 
            name: 'Directory Services', 
            type: 'Application Capability',
            description: 'Directory Services applications provide centralized storage and management of organizational information.',
            comments: 'Directory Services commonly store user accounts, groups, and organizational structure information.',
            productExamples: 'Active Directory, Apache Directory Server, OpenLDAP, Red Hat Directory Server'
          },
          { 
            id: 'AC041', 
            code: 'AC041', 
            name: 'Privileged Access Management', 
            type: 'Application Capability',
            description: 'Privileged Access Management applications enable the secure management of privileged accounts and access.',
            comments: 'PAM applications commonly support privileged account discovery, password vaulting, and session monitoring.',
            productExamples: 'CyberArk, BeyondTrust, Thycotic, HashiCorp Vault'
          },
          { 
            id: 'AC042', 
            code: 'AC042', 
            name: 'Multi-Factor Authentication', 
            type: 'Application Capability',
            description: 'Multi-Factor Authentication applications provide additional security layers beyond passwords.',
            comments: 'MFA applications commonly support various authentication factors including SMS, mobile apps, and hardware tokens.',
            productExamples: 'Duo Security, RSA SecurID, Authy, Google Authenticator'
          }
        ]
      },
      {
        id: 'AP022',
        code: 'AP022',
        name: 'Customer Relationship Management',
        type: 'Application Portfolio',
        applications: [
          { 
            id: 'AC106', 
            code: 'AC106', 
            name: 'Customer Relationship Management', 
            type: 'Application Capability',
            description: 'Customer Relationship Management applications enable the management of relationships with customers and stakeholders.',
            comments: 'CRM applications in higher education commonly support prospective student management, donor relations, and alumni engagement.',
            productExamples: 'Microsoft Dynamics, Salesforce, SugarCRM, Zoho CRM'
          },
          { 
            id: 'AC107', 
            code: 'AC107', 
            name: 'Contact Management', 
            type: 'Application Capability',
            description: 'Contact Management applications enable the storage and management of contact information.',
            comments: 'Contact Management applications commonly integrate with CRM systems and communication platforms.',
            productExamples: 'HubSpot, Salesforce, Zoho Contacts'
          },
          { 
            id: 'AC043', 
            code: 'AC043', 
            name: 'Donor Management', 
            type: 'Application Capability',
            description: 'Donor Management applications enable the management of donor relationships and fundraising activities.',
            comments: 'These applications commonly support donor tracking, gift processing, and fundraising campaign management.',
            productExamples: 'Blackbaud Raiser\'s Edge, DonorPerfect, Bloomerang, Little Green Light'
          },
          { 
            id: 'AC044', 
            code: 'AC044', 
            name: 'Alumni Management', 
            type: 'Application Capability',
            description: 'Alumni Management applications enable the management of relationships with graduates and alumni.',
            comments: 'Alumni Management applications commonly support alumni database management, event planning, and fundraising activities.',
            productExamples: 'Blackbaud, Ellucian Advance, iModules'
          }
        ]
      },
      {
        id: 'AP011',
        code: 'AP011',
        name: 'Engagement & Relationship',
        type: 'Application Portfolio',
        applications: [
          { 
            id: 'AC108', 
            code: 'AC108', 
            name: 'Marketing Automation', 
            type: 'Application Capability',
            description: 'Marketing Automation applications enable automated marketing campaigns and lead nurturing.',
            comments: 'Marketing Automation applications commonly support email marketing, lead scoring, and campaign analytics.',
            productExamples: 'HubSpot, Mailchimp, Marketo, Pardot'
          },
          { 
            id: 'AC109', 
            code: 'AC109', 
            name: 'Event Management', 
            type: 'Application Capability',
            description: 'Event Management applications enable the planning, promotion, and management of events.',
            comments: 'Event Management applications commonly support event registration, ticketing, and attendee management.',
            productExamples: 'Cvent, Eventbrite, RegOnline, Whova'
          },
          { 
            id: 'AC110', 
            code: 'AC110', 
            name: 'Alumni Management', 
            type: 'Application Capability',
            description: 'Alumni Management applications enable the management of relationships with graduates and alumni.',
            comments: 'Alumni Management applications commonly support alumni database management, event planning, and fundraising activities.',
            productExamples: 'Blackbaud, Ellucian Advance, iModules'
          },
          { 
            id: 'AC111', 
            code: 'AC111', 
            name: 'Content Management', 
            type: 'Application Capability',
            description: 'Content Management applications enable the creation, management, and publication of digital content.',
            comments: 'Content Management Systems commonly support web content management, document management, and content workflow.',
            productExamples: 'Drupal, SharePoint, Sitecore, WordPress'
          },
          { 
            id: 'AC112', 
            code: 'AC112', 
            name: 'Social Media Management', 
            type: 'Application Capability',
            description: 'Social Media Management applications enable the management of social media presence and engagement.',
            comments: 'Social Media Management applications commonly support content scheduling, social listening, and analytics.',
            productExamples: 'Hootsuite, Sprout Social, Buffer'
          },
          { 
            id: 'AC113', 
            code: 'AC113', 
            name: 'Survey Management', 
            type: 'Application Capability',
            description: 'Survey Management applications enable the creation, distribution, and analysis of surveys.',
            comments: 'Survey Management applications commonly support questionnaire design, response collection, and data analysis.',
            productExamples: 'Qualtrics, SurveyMonkey, Typeform'
          },
          { 
            id: 'AC114', 
            code: 'AC114', 
            name: 'Communication Management', 
            type: 'Application Capability',
            description: 'Communication Management applications enable institutional communications and messaging.',
            comments: 'Communication Management applications commonly support email campaigns, notifications, and emergency communications.',
            productExamples: 'Constant Contact, Mailchimp, SendGrid'
          },
          { 
            id: 'AC045', 
            code: 'AC045', 
            name: 'Web Analytics', 
            type: 'Application Capability',
            description: 'Web Analytics applications enable the measurement and analysis of website performance and user behavior.',
            comments: 'These applications commonly support traffic analysis, conversion tracking, and user journey mapping.',
            productExamples: 'Google Analytics, Adobe Analytics, Hotjar, Crazy Egg'
          },
          { 
            id: 'AC046', 
            code: 'AC046', 
            name: 'Digital Asset Management', 
            type: 'Application Capability',
            description: 'Digital Asset Management applications enable the storage, organization, and distribution of digital assets.',
            comments: 'These applications commonly support media libraries, asset tagging, and brand compliance.',
            productExamples: 'Bynder, Widen, Adobe Experience Manager, Brandfolder'
          }
        ]
      },
      {
        id: 'AP019',
        code: 'AP019',
        name: 'Financial Management',
        type: 'Application Portfolio',
        applications: [
          { 
            id: 'AC124', 
            code: 'AC124', 
            name: 'Financial Management System', 
            type: 'Application Capability',
            description: 'Financial Management Systems enable comprehensive management of institutional finances and accounting.',
            comments: 'Financial Management Systems commonly support general ledger, accounts payable, accounts receivable, and financial reporting.',
            productExamples: 'Oracle Financials, SAP S/4HANA Finance, Technology One Finance, Workday Financial Management'
          },
          { 
            id: 'AC125', 
            code: 'AC125', 
            name: 'Budget Management', 
            type: 'Application Capability',
            description: 'Budget Management applications enable the planning, allocation, and monitoring of institutional budgets.',
            comments: 'Budget Management applications commonly support budget planning, approval workflows, and budget monitoring.',
            productExamples: 'Adaptive Insights, Hyperion Planning, Oracle PBCS, Workday Adaptive Planning'
          },
          { 
            id: 'AC126', 
            code: 'AC126', 
            name: 'Accounting Management', 
            type: 'Application Capability',
            description: 'Accounting Management applications enable the recording and reporting of financial transactions.',
            comments: 'Accounting applications commonly support journal entries, account reconciliation, and financial statement preparation.',
            productExamples: 'Oracle General Ledger, SAP Financial Accounting, Technology One Finance'
          },
          { 
            id: 'AC127', 
            code: 'AC127', 
            name: 'Expense Management', 
            type: 'Application Capability',
            description: 'Expense Management applications enable the processing and reimbursement of employee expenses.',
            comments: 'Expense Management applications commonly support expense reporting, approval workflows, and expense analytics.',
            productExamples: 'Concur, Expensify, Oracle Expenses, Workday Expenses'
          },
          { 
            id: 'AC128', 
            code: 'AC128', 
            name: 'Grant Management', 
            type: 'Application Capability',
            description: 'Grant Management applications enable the administration of research and other grants.',
            comments: 'Grant Management applications commonly support grant accounting, compliance reporting, and grant analytics.',
            productExamples: 'Cayuse, Oracle Grants Accounting, Workday Grants'
          },
          { 
            id: 'AC047', 
            code: 'AC047', 
            name: 'Accounts Payable', 
            type: 'Application Capability',
            description: 'Accounts Payable applications enable the management of vendor invoices and payments.',
            comments: 'These applications commonly support invoice processing, approval workflows, and payment automation.',
            productExamples: 'Oracle Payables, SAP AP, Workday Financials, AvidXchange'
          },
          { 
            id: 'AC048', 
            code: 'AC048', 
            name: 'Accounts Receivable', 
            type: 'Application Capability',
            description: 'Accounts Receivable applications enable the management of customer invoices and collections.',
            comments: 'These applications commonly support invoice generation, payment processing, and collections management.',
            productExamples: 'Oracle Receivables, SAP AR, Workday Financials, Zuora'
          },
          { 
            id: 'AC049', 
            code: 'AC049', 
            name: 'Cash Management', 
            type: 'Application Capability',
            description: 'Cash Management applications enable the management of institutional cash flows and liquidity.',
            comments: 'These applications commonly support cash forecasting, bank reconciliation, and investment tracking.',
            productExamples: 'Kyriba, GTreasury, Oracle Treasury, SAP Cash Management'
          },
          { 
            id: 'AC050', 
            code: 'AC050', 
            name: 'Financial Reporting', 
            type: 'Application Capability',
            description: 'Financial Reporting applications enable the creation and distribution of financial reports.',
            comments: 'These applications commonly support regulatory reporting, management reporting, and financial analytics.',
            productExamples: 'Oracle Financial Reporting, SAP BPC, Workday Financial Reporting, Hyperion'
          },
          { 
            id: 'AC051', 
            code: 'AC051', 
            name: 'Tax Management', 
            type: 'Application Capability',
            description: 'Tax Management applications enable the calculation, reporting, and payment of various taxes.',
            comments: 'These applications commonly support income tax, sales tax, and other regulatory tax requirements.',
            productExamples: 'Vertex, Avalara, Thomson Reuters ONESOURCE, SAP Tax'
          },
          { 
            id: 'AC052', 
            code: 'AC052', 
            name: 'Investment Management', 
            type: 'Application Capability',
            description: 'Investment Management applications enable the management of institutional investments and endowments.',
            comments: 'These applications commonly support portfolio management, performance analysis, and risk assessment.',
            productExamples: 'BlackRock Aladdin, Charles River, SimCorp, Eze Eclipse'
          },
          { 
            id: 'AC053', 
            code: 'AC053', 
            name: 'Student Billing', 
            type: 'Application Capability',
            description: 'Student Billing applications enable the management of student tuition and fee billing.',
            comments: 'These applications commonly support tuition calculation, fee assessment, payment processing, and collections.',
            productExamples: 'Ellucian Banner, Workday Student, Flywire, Nelnet Campus Commerce'
          }
        ]
      },
      {
        id: 'AP020',
        code: 'AP020',
        name: 'Human Resources',
        type: 'Application Portfolio',
        applications: [
          { 
            id: 'AC117', 
            code: 'AC117', 
            name: 'Human Resource Information System', 
            type: 'Application Capability',
            description: 'Human Resource Information Systems enable comprehensive management of employee data and HR processes.',
            comments: 'HRIS applications commonly support employee records, organizational structure, and HR workflow management.',
            productExamples: 'BambooHR, Oracle HCM, SAP SuccessFactors, Workday HCM'
          },
          { 
            id: 'AC118', 
            code: 'AC118', 
            name: 'Payroll Management', 
            type: 'Application Capability',
            description: 'Payroll Management applications enable the processing and administration of employee compensation.',
            comments: 'Payroll applications commonly integrate with time and attendance systems and financial management systems.',
            productExamples: 'ADP, Ceridian, Oracle Payroll, Workday Payroll'
          },
          { 
            id: 'AC119', 
            code: 'AC119', 
            name: 'Performance Management', 
            type: 'Application Capability',
            description: 'Performance Management applications enable the management of employee performance evaluation and development.',
            comments: 'Performance Management applications commonly support goal setting, performance reviews, and development planning.',
            productExamples: 'BambooHR, Oracle HCM, SAP SuccessFactors, Workday HCM'
          },
          { 
            id: 'AC120', 
            code: 'AC120', 
            name: 'Recruitment Management', 
            type: 'Application Capability',
            description: 'Recruitment Management applications enable the management of hiring processes and candidate selection.',
            comments: 'Recruitment applications commonly support job posting, applicant tracking, and interview scheduling.',
            productExamples: 'Greenhouse, iCIMS, Oracle Taleo, Workday Recruiting'
          },
          { 
            id: 'AC121', 
            code: 'AC121', 
            name: 'Learning & Development Management', 
            type: 'Application Capability',
            description: 'Learning & Development Management applications enable the management of employee training and professional development.',
            comments: 'L&D applications commonly support training catalog management, learning path creation, and training analytics.',
            productExamples: 'Cornerstone OnDemand, Oracle Learning, SAP SuccessFactors, Workday Learning'
          },
          { 
            id: 'AC054', 
            code: 'AC054', 
            name: 'Time & Attendance', 
            type: 'Application Capability',
            description: 'Time & Attendance applications enable the tracking and management of employee work hours.',
            comments: 'These applications commonly support time tracking, leave management, and integration with payroll systems.',
            productExamples: 'Kronos, ADP Time, Oracle Time & Labor, Workday Time Tracking'
          },
          { 
            id: 'AC055', 
            code: 'AC055', 
            name: 'Benefits Administration', 
            type: 'Application Capability',
            description: 'Benefits Administration applications enable the management of employee benefits programs.',
            comments: 'These applications commonly support benefits enrollment, administration, and communication.',
            productExamples: 'Workday Benefits, Oracle Benefits, SAP Benefits, BenefitFocus'
          }
        ]
      },
      {
        id: 'AP016',
        code: 'AP016',
        name: 'Facilities & Estate',
        type: 'Application Portfolio',
        applications: [
          { 
            id: 'AC056', 
            code: 'AC056', 
            name: 'Space Planning', 
            type: 'Application Capability',
            description: 'Space Planning applications enable the design and optimization of physical space utilization.',
            comments: 'These applications commonly support floor plan design, space allocation, and occupancy planning.',
            productExamples: 'Archibus, AutoCAD, SketchUp, Revit'
          }
        ]
      }
    ]
  }
]

export const hermBusinessCapabilities =[
     {
    id: 'BC001',
    code: 'BC001',
    name: 'Curriculum Management',
    type: 'Parent',
    description: 'Curriculum Management capability and related functions.',
    children: [
      { id: 'BC002', code: 'BC002', name: 'Curriculum Planning', type: 'Core', parentId: 'BC001' },
      { id: 'BC003', code: 'BC003', name: 'Curriculum Design', type: 'Core', parentId: 'BC001' },
      { id: 'BC004', code: 'BC004', name: 'Curriculum Production', type: 'Core', parentId: 'BC001' },
      { id: 'BC007', code: 'BC007', name: 'Curriculum Accreditation', type: 'Core', parentId: 'BC001' },
      { id: 'BC235', code: 'BC235', name: 'Offering Management', type: 'Core', parentId: 'BC001' },
      { id: 'BC038', code: 'BC038', name: 'Curriculum Improvement', type: 'Core', parentId: 'BC001' },
      { id: 'BC041', code: 'BC041', name: 'Curriculum Disestablishment', type: 'Core', parentId: 'BC001' }
    ]
  },
  {
    id: 'BC008',
    code: 'BC008',
    name: 'Student Recruitment',
    type: 'Parent',
    description: 'Student Recruitment capability and related functions.',
    children: [
      { id: 'BC012', code: 'BC012', name: 'Domestic Student Recruitment', type: 'Core', parentId: 'BC008' },
      { id: 'BC013', code: 'BC013', name: 'International Student Recruitment', type: 'Core', parentId: 'BC008' }
    ]
  },
  {
    id: 'BC014',
    code: 'BC014',
    name: 'Student Admission',
    type: 'Parent',
    description: 'Student Admission capability and related functions.',
    children: [
      { id: 'BC015', code: 'BC015', name: 'Study Application Management', type: 'Core', parentId: 'BC014' },
      { id: 'BC018', code: 'BC018', name: 'Learning Recognition Management', type: 'Core', parentId: 'BC014' },
      { id: 'BC020', code: 'BC020', name: 'Matriculation', type: 'Core', parentId: 'BC014' }
    ]
  },
  {
    id: 'BC019',
    code: 'BC019',
    name: 'Student Enrolment',
    type: 'Parent',
    description: 'Student Enrolment capability and related functions.',
    children: [
      { id: 'BC021', code: 'BC021', name: 'Enrolment', type: 'Core', parentId: 'BC019' },
      { id: 'BC022', code: 'BC022', name: 'Student Allocation', type: 'Core', parentId: 'BC019' },
      { id: 'BC027', code: 'BC027', name: 'Timetable Management', type: 'Core', parentId: 'BC019' }
    ]
  },
  {
    id: 'BC023',
    code: 'BC023',
    name: 'Curriculum Delivery',
    type: 'Parent',
    description: 'Curriculum Delivery capability and related functions.',
    children: [
      { id: 'BC024', code: 'BC024', name: 'Learning & Teaching Resource Preparation', type: 'Core', parentId: 'BC023' },
      { id: 'BC025', code: 'BC025', name: 'Learning & Teaching Resource Management', type: 'Core', parentId: 'BC023' },
      { id: 'BC026', code: 'BC026', name: 'Learning & Teaching Delivery', type: 'Core', parentId: 'BC023' },
      { id: 'BC059', code: 'BC059', name: 'Student Supervision', type: 'Core', parentId: 'BC023' }
    ]
  },
  {
    id: 'BC028',
    code: 'BC028',
    name: 'Student Assessment',
    type: 'Parent',
    description: 'Student Assessment capability and related functions.',
    children: [
      { id: 'BC029', code: 'BC029', name: 'Learning Assessment', type: 'Core', parentId: 'BC028' },
      { id: 'BC031', code: 'BC031', name: 'Student Research Assessment', type: 'Core', parentId: 'BC028' }
    ]
  },
  {
    id: 'BC032',
    code: 'BC032',
    name: 'Completion Management',
    type: 'Parent',
    description: 'Completion Management capability and related functions.',
    children: [
      { id: 'BC035', code: 'BC035', name: 'Completion Award', type: 'Core', parentId: 'BC032' }
    ]
  },
  {
    id: 'BC044',
    code: 'BC044',
    name: 'Student Management',
    type: 'Parent',
    description: 'Student Management capability and related functions.',
    children: [
      { id: 'BC010', code: 'BC010', name: 'Scholarship Management', type: 'Core', parentId: 'BC044' },
      { id: 'BC246', code: 'BC246', name: 'Student Liability Management', type: 'Core', parentId: 'BC044' },
      { id: 'BC248', code: 'BC248', name: 'Financial Aid Management', type: 'Core', parentId: 'BC044' },
      { id: 'BC046', code: 'BC046', name: 'Student Academic Progress Management', type: 'Core', parentId: 'BC044' },
      { id: 'BC225', code: 'BC225', name: 'Cross-Institutional Study', type: 'Core', parentId: 'BC044' },
      { id: 'BC030', code: 'BC030', name: 'Placement Management', type: 'Core', parentId: 'BC044' },
      { id: 'BC223', code: 'BC223', name: 'Examination Management', type: 'Core', parentId: 'BC044' },
      { id: 'BC224', code: 'BC224', name: 'Special Consideration Management', type: 'Core', parentId: 'BC044' },
      { id: 'BC047', code: 'BC047', name: 'Research Candidature Management', type: 'Core', parentId: 'BC044' },
      { id: 'BC049', code: 'BC049', name: 'Student Misconduct Management', type: 'Core', parentId: 'BC044' }
    ]
  },
  {
    id: 'BC052',
    code: 'BC052',
    name: 'Student Support',
    type: 'Parent',
    description: 'Student Support capability and related functions.',
    children: [
      { id: 'BC055', code: 'BC055', name: 'Careers Advice', type: 'Core', parentId: 'BC052' },
      { id: 'BC053', code: 'BC053', name: 'Academic Advice', type: 'Core', parentId: 'BC052' },
      { id: 'BC054', code: 'BC054', name: 'Core Skills Development', type: 'Core', parentId: 'BC052' },
      { id: 'BC056', code: 'BC056', name: 'Financial Advice', type: 'Core', parentId: 'BC052' },
      { id: 'BC226', code: 'BC226', name: 'Student Grievance Management', type: 'Core', parentId: 'BC052' }
    ]
  },
  {
    id: 'BC065',
    code: 'BC065',
    name: 'Research Opportunities & Planning',
    type: 'Parent',
    description: 'Research Opportunities & Planning capability and related functions.',
    children: [
      { id: 'BC066', code: 'BC066', name: 'Research Opportunity Management', type: 'Core', parentId: 'BC065' },
      { id: 'BC067', code: 'BC067', name: 'Collaborative Opportunity Management', type: 'Core', parentId: 'BC065' },
      { id: 'BC070', code: 'BC070', name: 'Research Project Design', type: 'Core', parentId: 'BC065' }
    ]
  },
  {
    id: 'BC071',
    code: 'BC071',
    name: 'Research Funding',
    type: 'Parent',
    description: 'Research Funding capability and related functions.',
    children: [
      { id: 'BC072', code: 'BC072', name: 'Research Fund Sourcing', type: 'Core', parentId: 'BC071' },
      { id: 'BC215', code: 'BC215', name: 'Research Grant Management', type: 'Core', parentId: 'BC071' }
    ]
  },
  {
    id: 'BC245',
    code: 'BC245',
    name: 'Research Assurance',
    type: 'Parent',
    description: 'Research Assurance capability and related functions.',
    children: [
      { id: 'BC094', code: 'BC094', name: 'Research Ethics Management', type: 'Core', parentId: 'BC245' },
      { id: 'BC212', code: 'BC212', name: 'Research Integrity Management', type: 'Core', parentId: 'BC245' },
      { id: 'BC090', code: 'BC090', name: 'Research Performance Management', type: 'Core', parentId: 'BC245' },
      { id: 'BC091', code: 'BC091', name: 'Research Quality Management', type: 'Core', parentId: 'BC245' }
    ]
  },
  {
    id: 'BC093',
    code: 'BC093',
    name: 'Research Management',
    type: 'Parent',
    description: 'Research Management capability and related functions.',
    children: [
      { id: 'BC073', code: 'BC073', name: 'Research Funds Management', type: 'Core', parentId: 'BC093' },
      { id: 'BC069', code: 'BC069', name: 'Research Programme Management', type: 'Core', parentId: 'BC093' }
    ]
  },
  {
    id: 'BC074',
    code: 'BC074',
    name: 'Research Activity',
    type: 'Parent',
    description: 'Research Activity capability and related functions.',
    children: [
      { id: 'BC077', code: 'BC077', name: 'Research Data Management', type: 'Core', parentId: 'BC074' },
      { id: 'BC075', code: 'BC075', name: 'Research Creation', type: 'Core', parentId: 'BC074' },
      { id: 'BC097', code: 'BC097', name: 'Research Infrastructure Management', type: 'Core', parentId: 'BC074' },
      { id: 'BC236', code: 'BC236', name: 'Research Resource Management', type: 'Core', parentId: 'BC074' }
    ]
  },
  {
    id: 'BC086',
    code: 'BC086',
    name: 'Research Dissemination',
    type: 'Parent',
    description: 'Research Dissemination capability and related functions.',
    children: [
      { id: 'BC083', code: 'BC083', name: 'Research Output Management', type: 'Core', parentId: 'BC086' },
      { id: 'BC237', code: 'BC237', name: 'Research Outcome Management', type: 'Core', parentId: 'BC086' },
      { id: 'BC228', code: 'BC228', name: 'Research Impact Management', type: 'Core', parentId: 'BC086' },
      { id: 'BC088', code: 'BC088', name: 'Research Commercialisation Management', type: 'Core', parentId: 'BC086' }
    ]
  },
  {
    id: 'BC147',
    code: 'BC147',
    name: 'Strategy Management',
    type: 'Parent',
    description: 'Strategy Management capability and related functions.',
    children: [
      { id: 'BC148', code: 'BC148', name: 'Vision & Strategy Development', type: 'Core', parentId: 'BC147' },
      { id: 'BC149', code: 'BC149', name: 'Strategic Plan Management', type: 'Core', parentId: 'BC147' }
    ]
  },
  {
    id: 'BC206',
    code: 'BC206',
    name: 'Business Capability Management',
    type: 'Parent',
    description: 'Business Capability Management capability and related functions.',
    children: [
      { id: 'BC230', code: 'BC230', name: 'Business Planning', type: 'Core', parentId: 'BC206' },
      { id: 'BC209', code: 'BC209', name: 'Enterprise Architecture', type: 'Core', parentId: 'BC206' },
      { id: 'BC217', code: 'BC217', name: 'Customer Experience Management', type: 'Core', parentId: 'BC206' },
      { id: 'BC216', code: 'BC216', name: 'Business Process Management', type: 'Core', parentId: 'BC206' },
      { id: 'BC218', code: 'BC218', name: 'Service Management', type: 'Core', parentId: 'BC206' },
      { id: 'BC207', code: 'BC207', name: 'Change Management', type: 'Core', parentId: 'BC206' },
      { id: 'BC210', code: 'BC210', name: 'Portfolio & Programme Management', type: 'Core', parentId: 'BC206' },
      { id: 'BC243', code: 'BC243', name: 'Project Management', type: 'Core', parentId: 'BC206' },
      { id: 'BC244', code: 'BC244', name: 'Product Management', type: 'Core', parentId: 'BC206' },
      { id: 'BC208', code: 'BC208', name: 'Benefits Management', type: 'Core', parentId: 'BC206' }
    ]
  },
  {
    id: 'BC160',
    code: 'BC160',
    name: 'Governance, Risk, & Compliance',
    type: 'Parent',
    description: 'Governance, Risk, & Compliance capability and related functions.',
    children: [
      { id: 'BC164', code: 'BC164', name: 'Policy Management', type: 'Core', parentId: 'BC160' },
      { id: 'BC165', code: 'BC165', name: 'Quality Management', type: 'Core', parentId: 'BC160' },
      { id: 'BC168', code: 'BC168', name: 'Risk Management', type: 'Core', parentId: 'BC160' },
      { id: 'BC170', code: 'BC170', name: 'Compliance Management', type: 'Core', parentId: 'BC160' },
      { id: 'BC161', code: 'BC161', name: 'Business Continuity Management', type: 'Core', parentId: 'BC160' },
      { id: 'BC234', code: 'BC234', name: 'Incident Management', type: 'Core', parentId: 'BC160' },
      { id: 'BC167', code: 'BC167', name: 'Investigation Management', type: 'Core', parentId: 'BC160' },
      { id: 'BC163', code: 'BC163', name: 'Internal Audit', type: 'Core', parentId: 'BC160' },
      { id: 'BC166', code: 'BC166', name: 'Complaint & Compliment Management', type: 'Core', parentId: 'BC160' }
    ]
  },
  {
    id: 'BC133',
    code: 'BC133',
    name: 'Library Administration',
    type: 'Parent',
    description: 'Library Administration capability and related functions.',
    children: [
      { id: 'BC213', code: 'BC213', name: 'Library Collection Management', type: 'Core', parentId: 'BC133' },
      { id: 'BC134', code: 'BC134', name: 'Collection Access Management', type: 'Core', parentId: 'BC133' }
    ]
  },
  {
    id: 'BC232',
    code: 'BC232',
    name: 'Advancement Management',
    type: 'Parent',
    description: 'Advancement Management capability and related functions.',
    children: [
      { id: 'BC037', code: 'BC037', name: 'Alumni Management', type: 'Core', parentId: 'BC232' },
      { id: 'BC222', code: 'BC222', name: 'Development & Fundraising', type: 'Core', parentId: 'BC232' },
      { id: 'BC233', code: 'BC233', name: 'Donor, Sponsor, & Philanthropist Management', type: 'Core', parentId: 'BC232' }
    ]
  },
  {
    id: 'BC107',
    code: 'BC107',
    name: 'Marketing Management',
    type: 'Parent',
    description: 'Marketing Management capability and related functions.',
    children: [
      { id: 'BC108', code: 'BC108', name: 'Advertising Management', type: 'Core', parentId: 'BC107' },
      { id: 'BC109', code: 'BC109', name: 'Campaign Management', type: 'Core', parentId: 'BC107' },
      { id: 'BC111', code: 'BC111', name: 'Market Research', type: 'Core', parentId: 'BC107' },
      { id: 'BC112', code: 'BC112', name: 'Marketing Planning', type: 'Core', parentId: 'BC107' },
      { id: 'BC113', code: 'BC113', name: 'Merchandising', type: 'Core', parentId: 'BC107' },
      { id: 'BC247', code: 'BC247', name: 'Brand Management', type: 'Core', parentId: 'BC107' }
    ]
  },
  {
    id: 'BC238',
    code: 'BC238',
    name: 'Engagement & Relationship Management',
    type: 'Parent',
    description: 'Engagement & Relationship Management capability and related functions.',
    children: [
      { id: 'BC220', code: 'BC220', name: 'Communications Management', type: 'Core', parentId: 'BC238' },
      { id: 'BC241', code: 'BC241', name: 'Engagement Management', type: 'Core', parentId: 'BC238' },
      { id: 'BC239', code: 'BC239', name: 'Relationship Management', type: 'Core', parentId: 'BC238' },
      { id: 'BC240', code: 'BC240', name: 'Outreach Management', type: 'Core', parentId: 'BC238' },
      { id: 'BC242', code: 'BC242', name: 'Extension Management', type: 'Core', parentId: 'BC238' }
    ]
  },
  {
    id: 'BC155',
    code: 'BC155',
    name: 'Legal Services',
    type: 'Parent',
    description: 'Legal Services capability and related functions.',
    children: [
      { id: 'BC159', code: 'BC159', name: 'Legal Advisory', type: 'Core', parentId: 'BC155' },
      { id: 'BC156', code: 'BC156', name: 'Contract Management', type: 'Core', parentId: 'BC155' },
      { id: 'BC157', code: 'BC157', name: 'Dispute Resolution & Litigation', type: 'Core', parentId: 'BC155' }
    ]
  },
  {
    id: 'BC201',
    code: 'BC201',
    name: 'Information & Communication Technology Management',
    type: 'Parent',
    description: 'Information & Communication Technology Management capability and related functions.',
    children: [
      { id: 'BC202', code: 'BC202', name: 'Alignment, Planning, & Organisation', type: 'Core', parentId: 'BC201' },
      { id: 'BC203', code: 'BC203', name: 'Build, Acquisition, & Implementation', type: 'Core', parentId: 'BC201' },
      { id: 'BC204', code: 'BC204', name: 'Delivery, Service, & Support', type: 'Core', parentId: 'BC201' },
      { id: 'BC205', code: 'BC205', name: 'Monitoring, Assessment, & Evaluation', type: 'Core', parentId: 'BC201' }
    ]
  },
  {
    id: 'BC171',
    code: 'BC171',
    name: 'Human Resource Management',
    type: 'Parent',
    description: 'Human Resource Management capability and related functions.',
    children: [
      { id: 'BC172', code: 'BC172', name: 'Organisational Design', type: 'Core', parentId: 'BC171' },
      { id: 'BC174', code: 'BC174', name: 'Workforce Planning', type: 'Core', parentId: 'BC171' },
      { id: 'BC175', code: 'BC175', name: 'Talent Acquisition', type: 'Core', parentId: 'BC171' },
      { id: 'BC182', code: 'BC182', name: 'Workforce Training & Development', type: 'Core', parentId: 'BC171' },
      { id: 'BC176', code: 'BC176', name: 'Remuneration & Benefits Management', type: 'Core', parentId: 'BC171' },
      { id: 'BC178', code: 'BC178', name: 'Workforce Resource Management', type: 'Core', parentId: 'BC171' },
      { id: 'BC181', code: 'BC181', name: 'Workforce Performance Management', type: 'Core', parentId: 'BC171' },
      { id: 'BC173', code: 'BC173', name: 'Workforce Relations Management', type: 'Core', parentId: 'BC171' },
      { id: 'BC183', code: 'BC183', name: 'Human Resource Support', type: 'Core', parentId: 'BC171' }
    ]
  },
  {
    id: 'BC184',
    code: 'BC184',
    name: 'Financial Management',
    type: 'Parent',
    description: 'Financial Management capability and related functions.',
    children: [
      { id: 'BC190', code: 'BC190', name: 'Financial Planning & Analysis', type: 'Core', parentId: 'BC184' },
      { id: 'BC187', code: 'BC187', name: 'Accounts Payable', type: 'Core', parentId: 'BC184' },
      { id: 'BC188', code: 'BC188', name: 'Accounts Receivable', type: 'Core', parentId: 'BC184' },
      { id: 'BC249', code: 'BC249', name: 'General Accounting', type: 'Core', parentId: 'BC184' },
      { id: 'BC189', code: 'BC189', name: 'Price Modelling', type: 'Core', parentId: 'BC184' },
      { id: 'BC191', code: 'BC191', name: 'Tax Management', type: 'Core', parentId: 'BC184' },
      { id: 'BC214', code: 'BC214', name: 'Payroll Management', type: 'Core', parentId: 'BC184' },
      { id: 'BC192', code: 'BC192', name: 'Bank Management', type: 'Core', parentId: 'BC184' },
      { id: 'BC193', code: 'BC193', name: 'Procurement Management', type: 'Core', parentId: 'BC184' },
      { id: 'BC194', code: 'BC194', name: 'Project Accounting', type: 'Core', parentId: 'BC184' },
      { id: 'BC197', code: 'BC197', name: 'Asset Management', type: 'Core', parentId: 'BC184' },
      { id: 'BC199', code: 'BC199', name: 'Investment Management', type: 'Core', parentId: 'BC184' },
      { id: 'BC219', code: 'BC219', name: 'Treasury Management', type: 'Core', parentId: 'BC184' }
    ]
  },
  {
    id: 'BC135',
    code: 'BC135',
    name: 'Information Management',
    type: 'Parent',
    description: 'Information Management capability and related functions.',
    children: [
      { id: 'BC144', code: 'BC144', name: 'Advanced Analytics', type: 'Core', parentId: 'BC135' },
      { id: 'BC211', code: 'BC211', name: 'Business Intelligence & Reporting', type: 'Core', parentId: 'BC135' },
      { id: 'BC143', code: 'BC143', name: 'Data Management', type: 'Core', parentId: 'BC135' },
      { id: 'BC136', code: 'BC136', name: 'Information Governance', type: 'Core', parentId: 'BC135' },
      { id: 'BC139', code: 'BC139', name: 'Identity & Access Management', type: 'Core', parentId: 'BC135' },
      { id: 'BC138', code: 'BC138', name: 'Information Security Management', type: 'Core', parentId: 'BC135' },
      { id: 'BC146', code: 'BC146', name: 'Enterprise Content Management', type: 'Core', parentId: 'BC135' },
      { id: 'BC145', code: 'BC145', name: 'Records Management', type: 'Core', parentId: 'BC135' },
      { id: 'BC141', code: 'BC141', name: 'Intellectual Property Management', type: 'Core', parentId: 'BC135' },
      { id: 'BC140', code: 'BC140', name: 'Artefact & Collection Management', type: 'Core', parentId: 'BC135' },
      { id: 'BC231', code: 'BC231', name: 'Digital Preservation', type: 'Core', parentId: 'BC135' }
    ]
  },
  {
    id: 'BC125',
    code: 'BC125',
    name: 'Facilities & Estate Management',
    type: 'Parent',
    description: 'Facilities & Estate Management capability and related functions.',
    children: [
      { id: 'BC126', code: 'BC126', name: 'Building & Facilities Management', type: 'Core', parentId: 'BC125' },
      { id: 'BC127', code: 'BC127', name: 'Property Management', type: 'Core', parentId: 'BC125' },
      { id: 'BC128', code: 'BC128', name: 'Campus Transportation Management', type: 'Core', parentId: 'BC125' },
      { id: 'BC129', code: 'BC129', name: 'Campus Security Management', type: 'Core', parentId: 'BC125' },
      { id: 'BC130', code: 'BC130', name: 'Commercial Tenancy Management', type: 'Core', parentId: 'BC125' },
      { id: 'BC131', code: 'BC131', name: 'Cleaning & Waste Management', type: 'Core', parentId: 'BC125' },
      { id: 'BC132', code: 'BC132', name: 'Groundskeeping Management', type: 'Core', parentId: 'BC125' },
      { id: 'BC221', code: 'BC221', name: 'Environmental Sustainability Management', type: 'Core', parentId: 'BC125' },
      { id: 'BC227', code: 'BC227', name: 'Space Utilisation Management', type: 'Core', parentId: 'BC125' }
    ]
  },
  {
    id: 'BC114',
    code: 'BC114',
    name: 'Supporting Services',
    type: 'Parent',
    description: 'Supporting Services capability and related functions.',
    children: [
      { id: 'BC115', code: 'BC115', name: 'Housing & Accommodation Management', type: 'Core', parentId: 'BC114' },
      { id: 'BC116', code: 'BC116', name: 'Gallery & Museum Management', type: 'Core', parentId: 'BC114' },
      { id: 'BC117', code: 'BC117', name: 'Childcare Management', type: 'Core', parentId: 'BC114' },
      { id: 'BC118', code: 'BC118', name: 'Healthcare Management', type: 'Core', parentId: 'BC114' },
      { id: 'BC180', code: 'BC180', name: 'Health, Safety, & Wellbeing Management', type: 'Core', parentId: 'BC114' },
      { id: 'BC124', code: 'BC124', name: 'Membership Management', type: 'Core', parentId: 'BC114' },
      { id: 'BC120', code: 'BC120', name: 'Printing Management', type: 'Core', parentId: 'BC114' },
      { id: 'BC121', code: 'BC121', name: 'Sport & Recreation Management', type: 'Core', parentId: 'BC114' },
      { id: 'BC229', code: 'BC229', name: 'Intercollegiate Athletics Management', type: 'Core', parentId: 'BC114' },
      { id: 'BC123', code: 'BC123', name: 'Retail Management', type: 'Core', parentId: 'BC114' },
      { id: 'BC195', code: 'BC195', name: 'Travel Management', type: 'Core', parentId: 'BC114' },
      { id: 'BC110', code: 'BC110', name: 'Event Management', type: 'Core', parentId: 'BC114' },
      { id: 'BC122', code: 'BC122', name: 'Venue Management', type: 'Core', parentId: 'BC114' },
      { id: 'BC119', code: 'BC119', name: 'Mail Management', type: 'Core', parentId: 'BC114' }
    ]
  }
]