// data.ts

type TransformationHistory =
  | { date: string; description: string }
  | string;

interface DataLineage {
  origin_system: string;
  extract_process: string;
  transformation_history: any[];
}

interface DataOwnership {
  data_owner: string;
  data_steward: string;
  retention_policy: string;
}

interface QualityMetadata {
  data_quality_score: number;
  last_data_test_date: string;
  last_test_by: string;
  data_quality_rules: string[];
  quality_report_link: string;
}

interface Provenance {
  acquisition_date: string;
  source_contact: string;
  update_frequency: string;
}

interface DataGovernance {
  data_lineage: DataLineage;
  data_ownership: DataOwnership;
  quality_metadata: QualityMetadata;
  provenance: Provenance;
}

interface TechnicalMetadata {
  schema_version: string;
  refresh_schedule: string;
  sensitivity_class: string;
  access_audit_log: string;
}

interface VersionControl {
  version: string;
  version_date: string;
  change_log: string;
}

export interface ReportData {
  id: string;
  title: string;
  description: string;
  data_governance: DataGovernance;
  technical_metadata: TechnicalMetadata;
  keywords: string;
  bi_next_update: string;
  dataset_next_update: string;
  dataset: string[];
  theme: string[];
  category: string;
  access: string;
  link: string;
  source: string;
  version_control: VersionControl;
  last_update:string;
}

export const reports: ReportData[] = [
  {
    id: "reviews-dashboard",
    title: "Reviews Dashboard",
    description:
      "Overview of review activities and schedules with program analysis",
    data_governance: {
      data_lineage: {
        origin_system: "SARA (Student Administration System)",
        extract_process: "Nightly SQL Server SSIS package",
        transformation_history: [
          { date: "2024-01-10", description: "Normalized program codes", duration: 1 },
          { date: "2024-01-20", description: "Standardized course identifiers", duration: 2 },
          { date: "2024-02-12", description: "Removed legacy fields from student profiles" , duration: 3},
          { date: "2024-02-28", description: "Merged duplicate instructor records", duration: 1 },
          { date: "2024-03-15", description: "Formatted enrollment dates to ISO 8601", duration: 4 },
          { date: "2024-04-05", description: "Mapped faculty codes to display names" , duration: 2},
          { date: "2024-04-22", description: "Derived full-time/part-time flags from credit load",duration: 2 },
          { date: "2024-05-03", description: "Corrected invalid email domains in contact data",duration: 3 },
          { date: "2024-05-12", description: "Applied  redaction rules on archived reviews",duration: 4 }
        ]
      },
      data_ownership: {
        data_owner: "Office of Academic Quality (Dr. Emily Chen)",
        data_steward: "Data Governance Team (it-governance@unisc.edu)",
        retention_policy: "7 years post-review completion"
      },
      quality_metadata: {
        data_quality_score: 92.4,
        last_data_test_date: "2024-04-15",
        last_test_by: "Quality Assurance Team",
        data_quality_rules: [
          "ISO 8000-61 compliance",
          "UniSC Data Quality Framework v2.1"
        ],
        quality_report_link: "/reports/quality-audit-2024Q1.pdf"
      },
      provenance: {
        acquisition_date: "2024-01-05",
        source_contact: "sara-admin@unisc.edu",
        update_frequency: "Daily incremental, Full refresh monthly"
      }
    },
    technical_metadata: {
      schema_version: "2.3.1",
      refresh_schedule: "Every 24h + ad-hoc",
      sensitivity_class: "Protected (Level 2)",
      access_audit_log: "/audits/reviews-access.csv"
    },
    keywords: "Review",
    bi_next_update: "Apr-25",
    dataset_next_update: "TBC",
    dataset: ["Quality"],
    theme: ["Quality"],
    category: "School",
    access: "All staff",
    link: "https://app.powerbi.com/...",
    source: "Internal",
    last_update:'2024-05-12',
    version_control: {
      version: "1.4.2",
      version_date: "2024-04-20",
      change_log: "/changelogs/reviews-dashboard.md"
    }
  },
  {
    id: "program-compliance-tracker",
    title: "Program Compliance Tracker",
    description: "Tracks regulatory and accreditation compliance for academic programs",
    data_governance: {
      data_lineage: {
        origin_system: "CRICOS Portal",
        extract_process: "Weekly ETL using Azure Data Factory",
        transformation_history: [
         { date: "2024-01-10", description: "Normalized program codes" },
          { date: "2024-01-20", description: "Standardized course identifiers" },
          { date: "2024-02-12", description: "Removed legacy fields from student profiles" },
          { date: "2024-02-28", description: "Merged duplicate instructor records" },
          { date: "2024-03-15", description: "Formatted enrollment dates to ISO 8601" },
          { date: "2024-04-05", description: "Mapped faculty codes to display names" },
          { date: "2024-04-22", description: "Derived full-time/part-time flags from credit load" },
          { date: "2024-05-03", description: "Corrected invalid email domains in contact data" },
          { date: "2024-05-12", description: "Applied  redaction rules on archived reviews" }
        ]
      },
      data_ownership: {
        data_owner: "Compliance Office (Ms. Sarah Li)",
        data_steward: "Registry Compliance Unit (compliance@unisc.edu)",
        retention_policy: "10 years for compliance records"
      },
      quality_metadata: {
        data_quality_score: 96.1,
        last_data_test_date: "2024-03-29",
        last_test_by: "External Compliance Auditor",
        data_quality_rules: [
          "TEQSA reporting standards",
          "UniSC Compliance Model v1.0"
        ],
        quality_report_link: "/reports/accreditation-check-Q1.pdf"
      },
      provenance: {
        acquisition_date: "2024-01-03",
        source_contact: "cricos@unisc.edu",
        update_frequency: "Weekly"
      }
    },
    technical_metadata: {
      schema_version: "1.1.0",
      refresh_schedule: "Every 7 days",
      sensitivity_class: "Confidential (Level 3)",
      access_audit_log: "/audits/compliance-access.csv"
    },
    keywords: "Compliance, Accreditation",
    bi_next_update: "May-10",
    dataset_next_update: "May-12",
    dataset: ["Compliance"],
    theme: ["Governance"],
    category: "University",
    access: "Compliance Team only",
    link: "https://app.powerbi.com/...",
    last_update:'2024-06-03',

    source: "Internal + External",
    version_control: {
      version: "2.0.0",
      version_date: "2024-04-01",
      change_log: "/changelogs/compliance-tracker.md"
    }
  },
  {
    id: "course-feedback-analysis",
    title: "Course Feedback Analysis",
    description: "Aggregated sentiment and scores from student evaluations across all faculties",
    data_governance: {
      data_lineage: {
        origin_system: "Blue Evaluations",
        extract_process: "Nightly REST API ingestion into PostgreSQL",
        transformation_history: [
  { date: "2024-01-05", description: "Parsed JSON responses from API into tabular format" },
  { date: "2024-01-18", description: "Filtered out test records and internal evaluation data" },
  { date: "2024-02-01", description: "Created derived sentiment scores using NLP pipeline" },
  { date: "2024-02-14", description: "Harmonized instructor naming conventions across faculties" },
  { date: "2024-03-01", description: "Removed incomplete evaluations (less than 3 responses)" },
  { date: "2024-03-18", description: "Mapped legacy department codes to current structure" },
  { date: "2024-04-04", description: "Redacted personal identifiers in free-text feedback" },
  { date: "2024-04-17", description: "Calculated average satisfaction scores by delivery mode" },
  { date: "2024-05-06", description: "Imputed missing Likert scale values with mode" }
]
      },
      data_ownership: {
        data_owner: "Teaching & Learning Division (Dr. Roger Vance)",
        data_steward: "BI Support Team (bi-support@unisc.edu)",
        retention_policy: "5 years rolling"
      },
      quality_metadata: {
        data_quality_score: 89.7,
        last_data_test_date: "2024-04-10",
        last_test_by: "Teaching Analytics Unit",
        data_quality_rules: [
          "Missing value threshold < 1%",
          "All surveys >= 5 responses"
        ],
        quality_report_link: "/reports/feedback-data-quality.pdf"
      },
      provenance: {
        acquisition_date: "2024-01-06",
        source_contact: "blue-admin@unisc.edu",
        update_frequency: "Daily"
      }
    },
    technical_metadata: {
      schema_version: "3.0.0",
      refresh_schedule: "Daily + end-of-term snapshots",
      sensitivity_class: "Protected (Level 2)",
      access_audit_log: "/audits/feedback-access.csv"
    },
    keywords: "Feedback, Sentiment, Course Quality",
    bi_next_update: "Apr-30",
    dataset_next_update: "TBC",
    dataset: ["Feedback"],
    theme: ["Teaching Excellence"],
    category: "Faculty",
    access: "Academic staff only",
    link: "https://app.powerbi.com/...",
    last_update:'2024-06-01',
    source: "Internal",
    version_control: {
      version: "1.3.5",
      version_date: "2024-04-18",
      change_log: "/changelogs/course-feedback.md"
    }
  },
  {
    id: "graduate-outcomes-dashboard",
    title: "Graduate Outcomes Dashboard",
    description: "Visualisation of graduate employment, further study, and satisfaction rates",
    data_governance: {
      data_lineage: {
        origin_system: "Graduate Outcomes Survey (GOS)",
        extract_process: "Monthly Excel import via secure SFTP",
        transformation_history: [
  { date: "2024-01-08", description: "Imported historical course feedback from legacy CSVs" },
  { date: "2024-01-22", description: "Standardized instructor IDs across datasets" },
  { date: "2024-02-05", description: "Removed inactive student records post-graduation" },
  { date: "2024-02-25", description: "Consolidated term codes into academic year/semester format" },
  { date: "2024-03-10", description: "Validated and cleaned rating scale anomalies" },
  { date: "2024-03-29", description: "Tagged anonymous responses with hashed session IDs" },
  { date: "2024-04-10", description: "Aligned campus location names with official registry" },
  { date: "2024-04-25", description: "Generated net promoter score (NPS) metric from raw responses" },
  { date: "2024-05-09", description: "Removed flagged comments with inappropriate language" }
]
      },
      data_ownership: {
        data_owner: "Careers and Employability (Ms. Janice Morgan)",
        data_steward: "Graduate Services Team (grad-support@unisc.edu)",
        retention_policy: "7 years from collection"
      },
      quality_metadata: {
        data_quality_score: 25.5,
        last_data_test_date: "2024-04-01",
        last_test_by: "Graduate Reporting Officer",
        data_quality_rules: [
          "Response rate > 50%",
          "No duplicate student IDs"
        ],
        quality_report_link: "/reports/grad-outcomes-Q1.pdf"
      },
      provenance: {
        acquisition_date: "2024-01-10",
        source_contact: "gos-admin@unisc.edu",
        update_frequency: "Monthly"
      }
    },
    technical_metadata: {
      schema_version: "2.1.4",
      refresh_schedule: "Monthly",
      sensitivity_class: "Protected (Level 2)",
      access_audit_log: "/audits/graduate-outcomes.csv"
    },
    keywords: "Graduate, Employment, Survey",
    bi_next_update: "May-01",
    dataset_next_update: "May-03",
    dataset: ["Graduate Outcomes"],
    theme: ["Careers"],
    category: "Institution",
    access: "All staff",
    link: "https://app.powerbi.com/...",
    last_update:'2024-05-18',
    source: "External",
    version_control: {
      version: "1.0.8",
      version_date: "2024-04-05",
      change_log: "/changelogs/graduate-outcomes.md"
    }
  }
];
