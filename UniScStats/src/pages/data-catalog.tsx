import { useState, useEffect } from 'react';

import Papa from "papaparse";

const DataCatalog = () => {
   const [reports, setReports] = useState<any[]>([]);
  const [filteredReports, setFilteredReports] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);


  useEffect(() => {
    const loadCSV = async () => {
      try {
        const response = await fetch('/data.csv'); // public folder path
        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            // Clean and normalize data
            const cleanedData = results.data.map((row: any) => {
              // Parse Category JSON array string into single string (take first element)
              let category = 'Unknown';
              try {
                const parsedCategory = JSON.parse(row.Category);
                if (Array.isArray(parsedCategory) && parsedCategory.length > 0) {
                  category = parsedCategory[0];
                }
              } catch {
                // fallback if parsing fails
                category = row.Category;
              }

              // Clean Keywords: replace newlines with commas or space for display/search
              const keywords = (row.Keywords || '').replace(/\n/g, ', ');

              return {
                ...row,
                Title: row.Title?.trim(),
                Description: row.Description?.trim(),
                Keywords: keywords.trim(),
                Category: category.trim(),
                Link: row.Link?.trim(),
                Dataset: row.Dataset?.trim(),
              };
            });

            setReports(cleanedData);
            setFilteredReports(cleanedData);
            setIsLoading(false);
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
            setIsLoading(false);
          },
        });
      } catch (error) {
        console.error('Error loading CSV:', error);
        setIsLoading(false);
      }
    };

    loadCSV();
  }, []);

useEffect(() => {
  const results = reports.filter((report) => {
    const title = report.Title?.toLowerCase() || '';
    const description = report.Description?.toLowerCase() || '';
    const keywords = report.Keywords?.toLowerCase() || '';
    const category = report.Category;

    const matchesSearch =
      title.includes(searchTerm.toLowerCase()) ||
      description.includes(searchTerm.toLowerCase()) ||
      keywords.includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(category);

    return matchesSearch && matchesCategory;
  });

  setFilteredReports(results);
}, [searchTerm, selectedCategories, reports]);

  const categories = ['All', ...new Set(reports.map(r => r.Category))];

  // Compute counts by category for display
const categoryCounts = reports.reduce((acc, report) => {
  const cat = report.Category || 'Unknown';
  acc[cat] = (acc[cat] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

const toggleCategory = (category: string) => {
  setSelectedCategories(prev =>
    prev.includes(category)
      ? prev.filter(c => c !== category) // deselect
      : [...prev, category]              // select
  );
};

  return (
    <div className="w-full bg-gray-50">
      {/* Header */}
     <header className="bg-gradient-to-r from-indigo-50 via-white to-indigo-50 text-gray-800 py-6 px-4 shadow-sm border-b border-gray-200 rounded-b-md">
  <div className="w-full">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      
      {/* Title and report count */}
      <div className="flex-1 min-w-0 text-left">
        <h1 className="text-2xl font-bold text-indigo-900 truncate">University Data Catalog</h1>
        <p className="text-gray-600 text-sm mt-1">{reports.length} reports available</p>

        {/* Category counts */}
              <div className="flex flex-wrap gap-3 mt-3">
              {Object.entries(categoryCounts).map(([category, count]: [string, number]) => {
  const isSelected = selectedCategories.includes(category);

  return (
    <span
      key={category}
      onClick={() => toggleCategory(category)}
      className={`flex items-center space-x-2 text-sm font-medium rounded-full px-4 py-1 shadow-sm hover:shadow-md transition duration-200 ease-in-out cursor-pointer
        ${isSelected 
          ? 'bg-indigo-100 border border-indigo-300 text-indigo-800' 
          : 'bg-gray-50 border border-gray-200 text-gray-800'}`}
      title={`${count} reports in ${category}`}
    >
      <span>{category}</span>
      <span className={`inline-block font-bold rounded-full px-2 py-0.5 text-xs shadow-sm
        ${isSelected 
          ? 'bg-indigo-200 text-indigo-900' 
          : 'bg-indigo-100 text-indigo-800'}`}>
        {count}
      </span>
    </span>
  );
})}


              </div>


      </div>

      {/* Search and category filter */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full md:w-auto">
        {/* Search bar */}
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            id="search"
            type="text"
            placeholder="Search reports..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category dropdown */}
        <div className="w-full sm:w-48">
          <select
            id="category"
            className="block w-full pl-3 pr-10 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  </div>
</header>


      {/* Search and Filters */}
      <div className="w-full mx-auto px-4 py-6">
       
        {/* Results count */}
        <div className="mb-4 flex items-center">
          <span className="text-gray-600 mr-2">
            Showing {filteredReports.length} of {reports.length} reports
          </span>
          {searchTerm && (
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        )}

        {/* Reports grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredReports.length > 0 ? (
              filteredReports.map((report, index) => (
                <ReportCard key={index} report={report} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No reports found</h3>
                <p className="mt-1 text-gray-500">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};



const ReportCard = ({ report }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const categoryIcons = {
    'Public data': '📊',
    'Research': '🔬',
    'Students': '👩‍🎓',
    'School': '🏫',
    'Campus': '🌆',
    'Enrolment Planning': '📝',
    'Curriculum': '📚',
    'Corporate': '🏢'
  };

  return (
    <div className="bg-white rounded-lg shadow-xs hover:shadow-sm transition-all duration-150 border border-gray-100 h-full">
      <div className="p-3 flex flex-col justify-between h-full">
        {/* Top Section - Content */}
        <div>
          {/* Header */}
          <div className="flex justify-between items-start gap-1">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 mb-0.5">
                <span className="text-xs">{categoryIcons[report.Category] || '📄'}</span>
                <span className="px-1.5 py-0.5 rounded-full text-[11px] font-medium bg-indigo-50 text-indigo-600">
                  {report.Category}
                </span>
              </div>
              <h3 className="text-[15px] font-semibold text-gray-900 line-clamp-2 leading-snug">
                {report.Title}
              </h3>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-400 hover:text-indigo-500 transition-colors flex-shrink-0"
              aria-label={isExpanded ? 'Collapse description' : 'Expand description'}
            >
              {isExpanded ? (
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              ) : (
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Description */}
          <p
            className={`text-gray-500 text-[13px] mt-1 ${isExpanded ? '' : 'line-clamp-3'}`}
            style={{ lineHeight: '1.25rem' }}
          >
            {report.Description}
          </p>

          {/* Keywords */}
          {isExpanded && (
            <div className="mt-2">
              <h4 className="text-[11px] font-medium text-gray-400 mb-0.5">KEYWORDS</h4>
              <div className="flex flex-wrap gap-1">
                {report.Keywords.split(',').map((keyword, i) => (
                  <span
                    key={i}
                    className="inline-block px-1.5 py-0.5 rounded text-[11px] font-medium bg-gray-50 text-gray-500 border border-gray-100"
                  >
                    {keyword.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer: View Report Button */}
        <div className="mt-3 flex justify-end">
          <a
            href={report.Link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center whitespace-nowrap px-2.5 py-1 text-[13px] font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 transition-colors"
          >
            <svg
              className="w-3.5 h-3.5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            View Report
          </a>
        </div>
      </div>
    </div>
  );
};
export default DataCatalog;