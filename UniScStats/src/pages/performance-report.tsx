// StudentPerformanceReport.jsx
import React, { useState } from 'react';

const initialData = [
  { id: 1, name: "Alice Johnson", year: 2023, session: "Spring", course: "ENG301", program: "BSc IT", level: "Graduate", gpa: 2.47 },
  { id: 2, name: "Isaac Newton", year: 2022, session: "Summer", course: "BIO150", program: "BSc Biology", level: "Graduate", gpa: 2.7 },
  { id: 3, name: "Tony Stark", year: 2022, session: "Fall", course: "BIO150", program: "BA Chemistry", level: "Undergrad", gpa: 3.48 },
  { id: 4, name: "Charlie Brown", year: 2022, session: "Summer", course: "ENG301", program: "BSc Math", level: "Undergrad", gpa: 3.33 },
  { id: 5, name: "Nina Dobrev", year: 2024, session: "Summer", course: "ENG301", program: "BSc Biology", level: "Undergrad", gpa: 2.3 },
  { id: 6, name: "Bruce Wayne", year: 2023, session: "Fall", course: "CS101", program: "BSc CS", level: "Graduate", gpa: 3.89 },
  { id: 7, name: "Diana Prince", year: 2021, session: "Spring", course: "HIST220", program: "BA History", level: "Undergrad", gpa: 3.45 },
  { id: 8, name: "Peter Parker", year: 2024, session: "Fall", course: "PHY110", program: "BSc Physics", level: "Undergrad", gpa: 3.67 },
  { id: 9, name: "Clark Kent", year: 2023, session: "Spring", course: "ENG301", program: "BA Journalism", level: "Graduate", gpa: 3.56 },
  { id: 10, name: "Selina Kyle", year: 2022, session: "Fall", course: "CS101", program: "BSc IT", level: "Undergrad", gpa: 2.98 },
  { id: 11, name: "Steve Rogers", year: 2023, session: "Summer", course: "BIO150", program: "BSc Biology", level: "Graduate", gpa: 3.22 },
  { id: 12, name: "Natasha Romanoff", year: 2024, session: "Spring", course: "CHEM201", program: "BSc Chemistry", level: "Undergrad", gpa: 3.9 },
  { id: 13, name: "Wanda Maximoff", year: 2022, session: "Spring", course: "PSY101", program: "BA Psychology", level: "Graduate", gpa: 3.42 },
  { id: 14, name: "Scott Lang", year: 2023, session: "Summer", course: "BUS210", program: "BBA", level: "Graduate", gpa: 2.87 },
  { id: 15, name: "Stephen Strange", year: 2024, session: "Fall", course: "MED401", program: "MBBS", level: "Graduate", gpa: 3.95 },
  { id: 16, name: "Barry Allen", year: 2021, session: "Fall", course: "PHY110", program: "BSc Physics", level: "Undergrad", gpa: 3.68 },
  { id: 17, name: "Hal Jordan", year: 2023, session: "Spring", course: "AST200", program: "BSc Astronomy", level: "Undergrad", gpa: 3.15 },
  { id: 18, name: "Arthur Curry", year: 2024, session: "Spring", course: "ENV105", program: "BSc Marine Bio", level: "Graduate", gpa: 3.6 },
  { id: 19, name: "Victor Stone", year: 2023, session: "Summer", course: "CS101", program: "BSc IT", level: "Undergrad", gpa: 3.01 },
  { id: 20, name: "Shuri Wakanda", year: 2022, session: "Fall", course: "ENG301", program: "BSc Engineering", level: "Graduate", gpa: 3.92 },
  { id: 21, name: "T'Challa", year: 2021, session: "Summer", course: "POL205", program: "BA Political Sci", level: "Undergrad", gpa: 3.5 },
  { id: 22, name: "Kamala Khan", year: 2024, session: "Spring", course: "ENG301", program: "BSc CS", level: "Undergrad", gpa: 3.03 },
  { id: 23, name: "Kate Bishop", year: 2023, session: "Summer", course: "HIST220", program: "BA History", level: "Undergrad", gpa: 3.32 },
  { id: 24, name: "Jennifer Walters", year: 2022, session: "Fall", course: "LAW300", program: "LLB", level: "Graduate", gpa: 3.87 },
  { id: 25, name: "Marc Spector", year: 2024, session: "Fall", course: "PSY101", program: "BA Psychology", level: "Graduate", gpa: 3.01 },
  { id: 26, name: "Matt Murdock", year: 2021, session: "Fall", course: "LAW300", program: "LLB", level: "Graduate", gpa: 3.79 },
  { id: 27, name: "Elektra Natchios", year: 2023, session: "Spring", course: "PHIL101", program: "BA Philosophy", level: "Undergrad", gpa: 3.19 },
  { id: 28, name: "Frank Castle", year: 2022, session: "Summer", course: "CRIM200", program: "BA Criminology", level: "Undergrad", gpa: 2.76 },
  { id: 29, name: "Jessica Jones", year: 2024, session: "Spring", course: "PSY101", program: "BA Psychology", level: "Undergrad", gpa: 2.95 },
  { id: 30, name: "Luke Cage", year: 2023, session: "Fall", course: "SOC101", program: "BA Sociology", level: "Undergrad", gpa: 3.05 },
  { id: 31, name: "Danny Rand", year: 2021, session: "Spring", course: "BUS210", program: "BBA", level: "Graduate", gpa: 2.89 },
  { id: 32, name: "Gwen Stacy", year: 2022, session: "Fall", course: "BIO150", program: "BSc Biology", level: "Undergrad", gpa: 3.33 },
  { id: 33, name: "Miles Morales", year: 2024, session: "Summer", course: "ENG301", program: "BSc CS", level: "Undergrad", gpa: 3.55 },
  { id: 34, name: "Reed Richards", year: 2023, session: "Fall", course: "ENG301", program: "BSc Engineering", level: "Graduate", gpa: 3.94 },
  { id: 35, name: "Susan Storm", year: 2022, session: "Summer", course: "CHEM201", program: "BSc Chemistry", level: "Undergrad", gpa: 3.6 },
  { id: 36, name: "Johnny Storm", year: 2021, session: "Fall", course: "PHY110", program: "BSc Physics", level: "Undergrad", gpa: 3.21 },
  { id: 37, name: "Ben Grimm", year: 2023, session: "Spring", course: "ENG301", program: "BSc Engineering", level: "Graduate", gpa: 2.75 },
  { id: 38, name: "Erik Stevens", year: 2022, session: "Fall", course: "POL205", program: "BA Political Sci", level: "Undergrad", gpa: 2.9 },
  { id: 39, name: "Loki Laufeyson", year: 2023, session: "Summer", course: "PHIL101", program: "BA Philosophy", level: "Graduate", gpa: 3.41 },
  { id: 40, name: "Thor Odinson", year: 2024, session: "Spring", course: "HIST220", program: "BA History", level: "Undergrad", gpa: 3.7 },
  { id: 41, name: "Gamora Zen", year: 2022, session: "Fall", course: "BIO150", program: "BSc Biology", level: "Graduate", gpa: 3.38 },
  { id: 42, name: "Rocket Raccoon", year: 2021, session: "Spring", course: "ENG301", program: "BSc Engineering", level: "Undergrad", gpa: 3.25 },
  { id: 43, name: "Groot Tree", year: 2024, session: "Fall", course: "ENV105", program: "BSc Marine Bio", level: "Undergrad", gpa: 3.66 },
  { id: 44, name: "Drax Destroyer", year: 2023, session: "Fall", course: "CRIM200", program: "BA Criminology", level: "Undergrad", gpa: 3.12 },
  { id: 45, name: "Nebula Blue", year: 2022, session: "Summer", course: "ENG301", program: "BSc Engineering", level: "Graduate", gpa: 3.45 },
  { id: 46, name: "Mantis Mind", year: 2023, session: "Spring", course: "PSY101", program: "BA Psychology", level: "Undergrad", gpa: 3.74 },
  { id: 47, name: "Okoye Dora", year: 2021, session: "Fall", course: "POL205", program: "BA Political Sci", level: "Graduate", gpa: 3.59 },
  { id: 48, name: "Pepper Potts", year: 2022, session: "Fall", course: "BUS210", program: "BBA", level: "Graduate", gpa: 3.36 },
  { id: 49, name: "Happy Hogan", year: 2023, session: "Summer", course: "ENG301", program: "BSc Math", level: "Undergrad", gpa: 2.83 },
  { id: 50, name: "Nick Fury", year: 2024, session: "Spring", course: "CRIM200", program: "BA Criminology", level: "Graduate", gpa: 3.47 },
];

const unique = (arr, key) => [...new Set(arr.map(item => item[key]))];

export default function StudentPerformanceReport() {
  const [filters, setFilters] = useState({ year: "", session: "", course: "", program: "", level: "" });

  const filteredData = initialData.filter(student =>
    (!filters.year || student.year === Number(filters.year)) &&
    (!filters.session || student.session === filters.session) &&
    (!filters.course || student.course === filters.course) &&
    (!filters.program || student.program === filters.program) &&
    (!filters.level || student.level === filters.level)
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearAllFilters=()=>{setFilters({ year: "", session: "", course: "", program: "", level: "" })}

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-2xl font-[Inter] backdrop-blur-sm border border-gray-200/50">
    {/* Header section remains unchanged */}
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h2 className="text-4xl font-extrabold text-gray-900 mb-1">Student Performance</h2>
        <p className="text-gray-500 font-medium">Analytics dashboard for academic tracking</p>
      </div>
      <div className="flex items-center space-x-3">
        <button 
          onClick={clearAllFilters}
          className="flex items-center space-x-1 bg-white/80 px-3 py-1.5 rounded-full shadow-sm border border-gray-200/60 hover:bg-gray-50 transition-colors text-gray-700 hover:text-gray-900 text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>Clear all</span>
        </button>
        <div className="flex items-center space-x-2 bg-white/80 px-3 py-1.5 rounded-full shadow-sm border border-gray-200/60 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
          </svg>
          <span className="text-gray-700">{filteredData.length} records</span>
        </div>
      </div>
    </div>
  
    <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-8">
    {[
      { name: "year", options: unique(initialData, "year"), icon: "📅" },
      { name: "session", options: unique(initialData, "session"), icon: "🕒" },
      { name: "course", options: unique(initialData, "course"), icon: "📚" },
      { name: "program", options: unique(initialData, "program"), icon: "🎓" },
      { name: "level", options: unique(initialData, "level"), icon: "📈" }
    ].map((filter) => (
      <div key={filter.name} className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg">{filter.icon}</span>
        <select
          name={filter.name}
          onChange={handleChange}
          value={filteredData[filter.name] || ""}
          className="w-full pl-10 pr-4 py-3 bg-white/90 border border-gray-300/80 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 shadow-sm transition-all hover:border-gray-400 appearance-none"
        >
          <option value="">{filter.name.charAt(0).toUpperCase() + filter.name.slice(1)}</option>
          {filter.options.map(opt => <option key={opt as any} value={opt as any}>{opt as any}</option>)}
        </select>
      </div>
    ))}
  </div>
  
    {/* Updated compact table styling */}
    <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-200/60">
      <table className="min-w-full bg-white/90 backdrop-blur-sm">
        <thead className="bg-gradient-to-r from-indigo-500 to-purple-600">
          <tr>
            {["ID", "Name", "Year", "Session", "Course", "Program", "Level", "GPA"].map((header) => (
              <th key={header} className="py-3 px-4 text-left text-white font-semibold text-xs tracking-wide">
                <div className="flex items-center">
                  {header}
                  {header === "GPA" && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200/50">
          {filteredData.map((student) => (
            <tr key={student.id} className="hover:bg-gray-50/80 transition-colors">
              <td className="py-2 px-4 font-mono text-gray-500 text-xs">{student.id}</td>
              <td className="py-2 px-4 font-medium text-gray-800 text-sm">{student.name}</td>
              <td className="py-2 px-4 text-gray-600 text-sm">{student.year}</td>
              <td className="py-2 px-4 text-gray-600 text-sm">{student.session}</td>
              <td className="py-2 px-4 text-gray-600 text-sm">{student.course}</td>
              <td className="py-2 px-4 text-gray-600 text-sm">{student.program}</td>
              <td className="py-2 px-4 text-gray-600 text-sm">{student.level}</td>
              <td className="py-2 px-4">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${student.gpa >= 3.5 ? 'bg-green-100 text-green-800' : student.gpa >= 2.5 ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>
                  {student.gpa.toFixed(2)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {filteredData.length === 0 && (
        <div className="p-6 text-center bg-white/50">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-700">No results found</h3>
          <p className="mt-1 text-gray-500 text-xs">Try adjusting your filters to find what you're looking for.</p>
        </div>
      )}
    </div>
  </div>
  );
}
