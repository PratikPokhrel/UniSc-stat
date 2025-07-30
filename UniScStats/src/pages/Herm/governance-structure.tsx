import React, { useState } from 'react';
import { FaSitemap, FaListUl, FaInfoCircle } from 'react-icons/fa';
import UniversityOrgChart from './governance-strucure-tree';
import VerticalOrgChart from './governance-structure-list';
import { Search } from 'lucide-react';

const GovernanceStructure = () => {
    const [activeView, setActiveView] = useState('tree'); 
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="min-h-screen bg-gray-50 w-full">
            {/* Header Section - Combined with view controls */}
            <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/80 sticky top-0 z-50 shadow-sm">
                <div className="max-w-full mx-auto px-6 py-4">
                    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
                        {/* Title Section */}
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3">
                                <div>
                                    <h1 className="text-2xl font-bold">
                                        <span className="text-blue-600 text-3xl">UniSC</span>
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600"> Academic Governance Structure</span>
                                    </h1>
                                    <p className="text-sm text-gray-500">Discover the University's Organizational Structure and Reporting Lines</p>
                                </div>
                            </div>
                        </div>

                        {/* Search and View Controls */}
                        <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-3 w-full md:w-auto">
                            {/* Search Bar */}
                            <div className="relative flex-grow max-w-md">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Search organisation units..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* View Toggle Buttons */}
                            <div className="flex items-center space-x-3">
                                <div className="inline-flex rounded-md shadow-sm" role="group">
                                    <button
                                        type="button"
                                        onClick={() => setActiveView('tree')}
                                        className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-l-lg border focus:z-10 focus:ring-1 focus:ring-blue-500 ${
                                            activeView === 'tree'
                                                ? 'bg-blue-600 text-white border-blue-600'
                                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        <FaSitemap className="mr-2" />
                                        <span>Tree</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setActiveView('block')}
                                        className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-r-lg border focus:z-10 focus:ring-1 focus:ring-blue-500 ${
                                            activeView === 'block'
                                                ? 'bg-blue-600 text-white border-blue-600'
                                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        <FaListUl className="mr-2" />
                                        <span>List</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="w-full px-4 sm:px-2 py-2 mt-1">
                {/* View Content - Full Width */}
                 <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 w-full">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <FaInfoCircle className="h-5 w-5 text-blue-400" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-blue-800">About this view</h3>
                            <div className="mt-2 text-sm text-blue-700">
                                <p>
                                    {activeView === 'tree'
                                        ? 'The tree view shows the hierarchical relationship between organizational units. Click on nodes to expand or collapse sections.'
                                        : 'The block view provides a flat list of all organizational units with their details. Use search to quickly find specific units.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${activeView === 'tree' ? 'bg-white': 'bg-gray-50'} shadow rounded-lg overflow-hidden w-full`}>
                    <div className="px-4 py-5 sm:p-6 w-full">
                        {activeView === 'tree' ? 
                            <UniversityOrgChart searchTerm={searchTerm} /> : 
                            <VerticalOrgChart initialSearchTerm={searchTerm} />
                        }
                    </div>
                </div>
                {/* Info Section */}
               
            </main>
        </div>
    );
};

export default GovernanceStructure;