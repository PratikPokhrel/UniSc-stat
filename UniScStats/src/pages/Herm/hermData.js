// src/services/hermData.js
export const domains = [
  {
    id: "AD001",
    name: "Learning & Teaching",
    description: "Teaching and learning related capabilities",
    color: "bg-blue-100",
  },
  {
    id: "AD002",
    name: "Research",
    description: "Research and innovation capabilities",
    color: "bg-green-100",
  },
  {
    id: "AD003",
    name: "Enabling",
    description: "Support and administrative capabilities",
    color: "bg-purple-100",
  },
];

export const orgStructure = {
  // From Org_Chart sheet
  ORG_L1_08: {
    id: "ORG_L1_08",
    name: "University of the Sunshine Coast",
    children: ["ORG_L2_54", "ORG_L2_55", "ORG_L2_56", "ORG_L2_57", "ORG_L2_59"],
  },
  ORG_L2_54: {
    id: "ORG_L2_54",
    name: "Deputy Vice-Chancellor (Academic)",
    parent: "ORG_L1_08",
    children: [
      "ORG_L3_273",
      "ORG_L3_276",
      "ORG_L3_280",
      "ORG_L3_286",
      "ORG_L3_287",
      "ORG_L3_288",
      "ORG_L3_289",
      "ORG_L3_290",
      "ORG_L3_297",
      "ORG_L3_306",
    ],
  },
  // Add all other ORG_L2, ORG_L3, ORG_L4 entries from your Org_Chart
};

export const dcpCanvases = [
  {
    id: "CSALT",
    name: "Centre for Support & Advancement of Learning & Teaching",
    orgUnit: "ORG_L3_297",
    capabilities: ["BC001", "BC023", "BC028"],
    activities: ["AC093", "AC095", "AC137"],
    dataEntities: ["DE159", "DE160"],
  },
  {
    id: "ODVCA",
    name: "Office of DVC (Academic)",
    orgUnit: "ORG_L3_273",
    capabilities: ["BC001", "BC002", "BC003", "BC004"],
    activities: ["AC096", "AC105", "AC102"],
    dataEntities: ["DE161", "DE162"],
  },
  // Add other canvases (FM, ASU, etc.)
];

export const capabilities = [
  {
    id: "BC001",
    name: "Curriculum Management",
    domain: "AD001",
    activities: ["AC096", "AC105"],
    dataEntities: ["DE161", "DE162"],
    orgUnits: ["ORG_L3_273", "ORG_L3_276"],
  },
  {
    id: "BC008",
    name: "Student Recruitment",
    domain: "AD001",
    activities: ["AC001", "AC002"],
    dataEntities: ["DE002", "DE003"],
    orgUnits: ["ORG_L3_280"],
  },
  // Add all other BCxxx capabilities from Master Mapping
];

export const activities = [
  {
    id: "AC096",
    name: "Curriculum Lifecycle Management",
    applications: ["AP021"],
    capabilities: ["BC001"],
    dataEntities: ["DE161"],
  },
  // Add all other ACxxx activities
];

export const dataEntities = [
  {
    id: "DE161",
    name: "Programme of Learning",
    capabilities: ["BC001"],
    activities: ["AC096"],
  },
  // Add all other DExxx entities
];