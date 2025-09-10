import React, { useState, useMemo } from 'react';
import { Search, Building2, Users, BookOpen, Filter, ChevronDown, Grid, List, X, ArrowRight, Check, ChevronUp, Layers } from 'lucide-react';
import organizationalData from './../../governance/academic-structure/org_unit_data.jsx'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';
import { universityData } from './data.js';

const OrganisationRaw = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPortfolio, setSelectedPortfolio] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [viewMode, setViewMode] = useState('grid');
    const [showFilters, setShowFilters] = useState(true);
    const [filterHERM, setFilterHERM] = useState(true); // Add this with your other state declarations
    const navigate = useNavigate();

    const getCategoryColor = (category) => {
        const colors = {
            'Academic': 'bg-blue-600',
            'Operations': 'bg-green-600',
            'Governance': 'bg-purple-600',
            'Research': 'bg-orange-600',
            'Global': 'bg-pink-600'
        };
        return colors[category] || 'bg-gray-600';
    };

    const enhancedUniversityData = useMemo(() => {
        return universityData.map(item => {
            const orgUnit = organizationalData[item.departmentCode as keyof typeof organizationalData];
            const hasHERM = (orgUnit != null && orgUnit != undefined) ? true : false; // Check if the org unit has HERM data

            return {
                ...item,
                HERM: !!hasHERM,
                // Optionally include more org data if needed
                orgTheme: orgUnit?.orgInfo?.theme,
                orgIcon: orgUnit?.orgInfo?.icon
            };
        });
    }, [universityData]); // Only recompute when universityData changes

    const portfolios = useMemo(() => {
        const unique = [...new Set(enhancedUniversityData.map(item => item.portfolioDesc))];
        return unique.sort();
    }, [enhancedUniversityData]);

    const categories = useMemo(() => {
        const unique = [...new Set(enhancedUniversityData.map(item => item.category))];
        return unique.sort();
    }, [enhancedUniversityData]);

    const filteredData = useMemo(() => {
        return enhancedUniversityData.filter(item => {
            const matchesSearch = searchTerm === '' ||
                item.portfolioDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.departmentDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.unitDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.departmentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (item.HERM && 'herm'.includes(searchTerm.toLowerCase()));

            const matchesPortfolio = selectedPortfolio === 'all' ||
                item.portfolioDesc === selectedPortfolio;

            const matchesCategory = selectedCategory === 'all' ||
                item.category === selectedCategory;

            const matchesHERM = !filterHERM || item.HERM; // Only filter HERM if checkbox is checked

            return matchesSearch && matchesPortfolio && matchesCategory && matchesHERM;
        });
    }, [searchTerm, selectedPortfolio, selectedCategory, enhancedUniversityData, filterHERM]); // Add filterHERM to dependencies

    const stats = useMemo(() => {
        return {
            totalPortfolios: portfolios.length,
            totalDepartments: new Set(enhancedUniversityData.map(item => item.departmentDesc)).size,
            totalUnits: enhancedUniversityData.length,
            categories: categories.length,
            totalHERM: enhancedUniversityData.filter(item => item.HERM).length // New HERM stat
        };
    }, [portfolios, categories, enhancedUniversityData]);

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedPortfolio('all');
        setSelectedCategory('all');
        setFilterHERM(false); // Also clear the HERM filter
    };
    const onCardClickNavigate = (departmentCode) => { navigate(`/governance/${departmentCode}`); }

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="w-full mx-auto px-2 sm:px-3">
                {/* Compact Header Section */}
                <div className="mb-2">
                    <div className="mb-3">
                        <h1 className="text-xl font-bold">
                            <span className="text-blue-600 text-2xl">UniSC</span>
                            <span className="text-gray-900"> Organisational Units</span>
                        </h1>
                        <p className="text-base text-gray-500">Discover the full organizational framework of the university's leadership and operational units</p>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                        {/* Stats Cards */}
                        <div className="flex flex-wrap items-center gap-2">
                            {/* Units count - count all unique unit entries */}
                            <div className="flex items-center space-x-1.5 bg-blue-50 px-2.5 py-1.5 rounded-md border border-blue-100">
                                <Building2 className="h-3.5 w-3.5 text-blue-600" />
                                <span className="text-sm font-medium text-gray-800">
                                    {[...new Set(universityData.map(item => item.unit))].length}
                                </span>
                                <span className="text-xs text-gray-500">units</span>
                            </div>

                            {/* Portfolios count - count all unique portfolio entries */}
                            <div className="flex items-center space-x-1.5 bg-purple-50 px-2.5 py-1.5 rounded-md border border-purple-100">
                                <Layers className="h-3.5 w-3.5 text-purple-600" />
                                <span className="text-sm font-medium text-gray-800">
                                    {[...new Set(universityData.map(item => item.portfolio))].length}
                                </span>
                                <span className="text-xs text-gray-500">portfolios</span>
                            </div>

                            {/* Departments count - count all unique department entries */}
                            <div className="flex items-center space-x-1.5 bg-green-50 px-2.5 py-1.5 rounded-md border border-green-100">
                                <Users className="h-3.5 w-3.5 text-green-600" />
                                <span className="text-sm font-medium text-gray-800">
                                    {[...new Set(universityData.map(item => item.department))].length}
                                </span>
                                <span className="text-xs text-gray-500">departments/schools</span>
                            </div>
                        </div>

                        {/* View Controls */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center space-x-1.5 px-3 py-1.5 text-sm font-medium bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                <Filter className="w-3.5 h-3.5 text-gray-600" />
                                <span>Filters</span>
                                {showFilters ? (
                                    <ChevronUp className="w-3.5 h-3.5 text-gray-500" />
                                ) : (
                                    <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                                )}
                            </button>

                            <div className="flex bg-gray-100 rounded-md p-0.5">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-1.5 rounded-[5px] transition-all ${viewMode === 'grid' ? 'bg-white shadow-xs text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                    title="Grid view"
                                >
                                    <Grid className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-1.5 rounded-[5px] transition-all ${viewMode === 'list' ? 'bg-white shadow-xs text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                    title="Table view"
                                >
                                    <List className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters Section */}
                {showFilters && (
                    <div className=" p-4 mb-4 ">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-3">
                            {/* Search Input */}
                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search units..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                                />
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>

                            {/* Portfolio Select */}
                            <select
                                value={selectedPortfolio}
                                onChange={(e) => setSelectedPortfolio(e.target.value)}
                                className="w-full md:w-48 text-sm py-2 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                            >
                                <option value="all">All Portfolios</option>
                                {portfolios.map(portfolio => (
                                    <option key={portfolio} value={portfolio}>{portfolio}</option>
                                ))}
                            </select>

                            {/* HERM Filter */}
                            <div className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                                <input
                                    type="checkbox"
                                    id="hermFilter"
                                    checked={filterHERM}
                                    onChange={(e) => setFilterHERM(e.target.checked)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-400 border-gray-300 rounded transition-colors"
                                />
                                <label htmlFor="hermFilter" className="text-sm text-gray-700 whitespace-nowrap">
                                    CAUDIT HERM Mapped
                                </label>
                                {filterHERM && (
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full ml-1">
                                        {stats.totalHERM}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                {/* Results Grid View */}
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {filteredData.map((item, index) => (
                            <div
                                key={index}
                                className={`bg-white rounded-lg border p-3 transition-all hover:shadow-md cursor-pointer ${item.HERM ? 'border-blue-200 hover:border-blue-300' : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                onClick={() => item.HERM && onCardClickNavigate(item.departmentCode)}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`text-xs font-medium px-2 py-1 rounded ${item.HERM ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                                        }`}>
                                        {item.departmentCode}
                                    </span>
                                    {item.HERM && (
                                        <span className="flex items-center text-xs font-medium px-2 py-1 rounded bg-purple-100 text-purple-800">
                                            <Check className="w-3 h-3 mr-1" />
                                            HERM
                                        </span>
                                    )}
                                </div>

                                <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{item.unitDesc}</h3>

                                <div className="flex items-center space-x-1 mb-2">
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${item.category === 'Academic' ? 'bg-blue-100 text-blue-800' :
                                        item.category === 'Operations' ? 'bg-green-100 text-green-800' :
                                            item.category === 'Governance' ? 'bg-purple-100 text-purple-800' :
                                                item.category === 'Research' ? 'bg-orange-100 text-orange-800' :
                                                    'bg-pink-100 text-pink-800'
                                        }`}>
                                        {item.category}
                                    </span>
                                </div>

                                <div className="text-xs text-gray-500 space-y-1">
                                    <div className="flex items-start">
                                        <span className="text-gray-400 mr-1">↳</span>
                                        <span className="line-clamp-1">{item.departmentDesc}</span>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="text-gray-400 mr-1">↳</span>
                                        <span className="line-clamp-1">{item.portfolioDesc}</span>
                                    </div>
                                </div>

                                {item.HERM && (
                                    <div className="mt-2 pt-2 border-t border-gray-100 flex justify-end">
                                        <span className="inline-flex items-center text-xs text-blue-600">
                                            View Canvas
                                            <ArrowRight className="w-3 h-3 ml-1" />
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Table View */
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Unit
                                        </th>
                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Department
                                        </th>
                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Portfolio
                                        </th>
                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Domain
                                        </th>
                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Code
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredData.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <div className="font-medium text-gray-900">{item.unitDesc}</div>
                                                <div className="text-xs text-gray-500">{item.unitCode}</div>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <div className="text-gray-700">{item.departmentDesc}</div>
                                                <div className="text-xs text-gray-500">{item.departmentCode}</div>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-gray-700">
                                                {item.portfolioDesc}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <span className={`${getCategoryColor(item.category)} text-white text-xs font-semibold px-2 py-1 rounded-full inline-block`}>
                                                    {item.category}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500 font-mono">
                                                {item.unit}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {filteredData.length === 0 && (
                    <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-3">
                            <BookOpen className="w-5 h-5 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No results found</h3>
                        <p className="text-sm text-gray-500 mb-4">
                            {searchTerm ? `No units match "${searchTerm}"` : 'No units match your filters'}
                        </p>
                        <button
                            onClick={clearFilters}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default OrganisationRaw;