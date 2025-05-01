import React, { useState } from "react";
import { ArrowRightCircle, Search, Star, StarOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Use your existing reportData...
const reportData = {
  "Vice-Chancellor": {
    Academic: [
      "Student Performance Report",
      "Course Evaluation Report",
      "Research Output & Impact Report",
      "Academic Staff Workload Report"
    ],
    Enrollment: [
      "Enrollment Trends Report",
      "Diversity and Inclusion Report",
      "Graduation Rate & Time to Degree Completion"
    ],
    Financial: [
      "Annual Budget Report",
      "Capital Projects and Infrastructure Report",
      "Revenue vs. Expense Projections",
      "Grant Funding and Research Revenue"
    ],
    Strategic: [
      "Strategic Plan Progress Report",
      "Risk Management Report",
      "University Rankings and Benchmarking Report"
    ],
    Operational: [
      "Facilities Utilization Report",
      "IT Services & Digital Transformation Report",
      "Sustainability & Carbon Footprint Report"
    ],
    HR: [
      "Staff Performance & Appraisal Reports",
      "Hiring and Turnover Statistics",
      "Equity in Employment Report",
      "Training and Professional Development Uptake"
    ],
    Community: [
      "Alumni Engagement Report",
      "Industry Partnerships & Collaboration Report",
      "Internationalization Report"
    ]
  },
  "Director": {
    Financial: [
      "Procurement and Expenditure Report",
      "Cost-Benefit Analysis Report",
      "Operational Budget Report"
    ],
    Infrastructure: [
      "Facility Maintenance and Upgrade Report",
      "Health and Safety Compliance Report",
      "Campus Expansion Projects"
    ],
    "IT & Operations": [
      "System Uptime and Reliability Report",
      "IT Incident Response Report",
      "Operational Efficiency Metrics"
    ]
  },
  Dean: {
    Academic: [
      "Program Accreditation and Review Report",
      "Faculty Research Contributions",
      "Student Feedback and Satisfaction Analysis"
    ],
    HR: [
      "Faculty Hiring and Retention Report",
      "Staff Training Records",
      "Promotion and Tenure Evaluation Report"
    ],
    Budgeting: [
      "Department Budget Allocation",
      "Funding Applications and Grants",
      "Faculty Resource Utilization"
    ]
  }
};

const ReportCard = ({ category, report, onFavoriteToggle, isFavorite }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative border border-gray-200 hover:border-indigo-300 transition-all duration-200 shadow-sm hover:shadow-md rounded-lg px-4 py-3 text-gray-700 text-sm font-medium flex items-center justify-between bg-white group ${isHovered ? 'transform -translate-y-0.5' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="font-medium text-gray-800">{report}</span>
      <div className="flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle(report);
          }}
          className="p-1 rounded-full hover:bg-yellow-50 transition-colors"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Star
            className={`w-4 h-4 transition-all ${isFavorite ? "text-yellow-500 fill-yellow-300" : "text-gray-300 group-hover:text-yellow-400"}`}
          />
        </button>
        <button
          onClick={() => navigate(category == 'Academic' ? '/faculties' : '/performance')}
          className="p-1 rounded-full hover:bg-indigo-50 transition-colors"
          aria-label="View report"
        >
          <ArrowRightCircle className="w-4 h-4 text-indigo-500 group-hover:text-indigo-600" />
        </button>
      </div>
      {isHovered && (
        <div className="absolute inset-0 rounded-lg bg-indigo-50 opacity-30 -z-10"></div>
      )}
    </div>
  )
}

const Card = ({ title, items, favorites, onFavoriteToggle }) => (
  <div className="bg-white shadow-sm rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow duration-200">
    <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-3">{title}</h3>
    <div className="grid grid-cols-1 gap-2.5">
      {items.map((item, index) => (
        <ReportCard
          category={title}
          key={index}
          report={item}
          isFavorite={favorites.includes(item)}
          onFavoriteToggle={onFavoriteToggle}
        />
      ))}
    </div>
  </div>
);

const RoleReports = ({ role, categories, favorites, onFavoriteToggle }) => (
  <div className="my-8">
    <div className="mb-5">
      <h2 className="text-xl font-bold text-gray-800">{role}</h2>
      <div className="h-0.5 w-12 bg-indigo-500 rounded-full mt-2"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(categories).map(([category, reports]) => (
        <Card
          key={category}
          title={category}
          items={reports}
          favorites={favorites}
          onFavoriteToggle={onFavoriteToggle}
        />
      ))}
    </div>
  </div>
);

export default function UniversityReports() {
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (report: string) => {
    setFavorites((prev) =>
      prev.includes(report)
        ? prev.filter((r) => r !== report)
        : [report, ...prev]
    );
  };

  const allReports = Object.entries(reportData).flatMap(([role, categories]) =>
    Object.entries(categories).flatMap(([category, reports]) =>
      reports.map((report) => ({
        role,
        category,
        report
      }))
    )
  );

  const filteredReports =
    searchTerm.length >= 2
      ? allReports.filter((r) =>
        r.report.toLowerCase().includes(searchTerm.toLowerCase())
      )
      : [];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10 lg:px-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            University of The Sunshine Coast
          </span>
        </h1>
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search reports..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Favorite Reports Section */}
      {favorites.length > 0 && (
        <div className="mb-10 bg-gray-50 rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-200" />
            <h2 className="text-lg font-semibold text-gray-800">
              Favourite Reports
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {favorites.map((report, idx) => (
              <ReportCard
                key={idx}
                category={null}
                report={report}
                isFavorite={true}
                onFavoriteToggle={toggleFavorite}
              />
            ))}
          </div>
        </div>
      )}

      {/* Search Results or Full Report List */}
      {searchTerm.length >= 2 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredReports.length > 0 ? (
            filteredReports.map((r, idx) => (
              <ReportCard
                key={idx}
                category={null}
                report={r.report}
                isFavorite={favorites.includes(r.report)}
                onFavoriteToggle={toggleFavorite}
              />
            ))
          ) : (
            <div className="col-span-full py-8 text-center">
              <p className="text-gray-500">No reports found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      ) : (
        Object.entries(reportData).map(([role, categories]) => (
          <RoleReports
            key={role}
            role={role}
            categories={categories}
            favorites={favorites}
            onFavoriteToggle={toggleFavorite}
          />
        ))
      )}
    </div>
  );
}