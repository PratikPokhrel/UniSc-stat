import React, { useState, useEffect } from 'react';
import { SOURCE_DATA } from './source_data';
import { DEST_DATA } from './dest_data';
import {
    Search,
    BarChart3,
    Filter,
    X,
    ChevronDown,
    ChevronUp,
    Zap,
    CheckCircle,
    AlertCircle,
    Mail,
    MessageCircle,
    User,
    Frown,
    Star,
    Copy,
    Key,
    Calendar,
    Database,
    Activity,
    ClipboardList,
    FileText,
    ArrowRight,
    Server,
    DatabaseIcon,
    Eye,
    Info
} from 'lucide-react';

const DataSources = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [selectedUnit, setSelectedUnit] = useState('All');
    const [selectedSME, setSelectedSME] = useState('All');
    const [selectedItem, setSelectedItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [dataView, setDataView] = useState('destination'); // 'source' or 'destination'

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => {
            const initialData = dataView === 'source' ? SOURCE_DATA : DEST_DATA;
            setData(initialData);
            setFilteredData(initialData);
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [dataView]);

    const _units = [...new Set(data.map(item => (dataView === 'source' ? item.UNIT : item.Unit)).filter(Boolean))]
    const _smes = [...new Set(data.map(item => item.SME).filter(Boolean))];

    const units = ['All', ..._units.sort((a, b) => a.localeCompare(b))];
    const smes = ['All', ..._smes.sort((a, b) => a.localeCompare(b))];

    useEffect(() => {
        let result = data;

        if (searchTerm) {
            const lowerCaseSearch = searchTerm.toLowerCase();
            result = result.filter(item =>
                Object.values(item).some(val =>
                    val !== null && val !== undefined && val.toString().toLowerCase().includes(lowerCaseSearch)
                )
            );
        }

        if (selectedUnit !== 'All') {
            result = result.filter(item => item.UNIT === selectedUnit);
        }

        if (selectedSME !== 'All') {
            result = result.filter(item => item.SME === selectedSME);
        }

        setFilteredData(result);
    }, [searchTerm, selectedUnit, selectedSME, data]);

    const openDetails = (item) => {
        setSelectedItem(item);
    };

    const closeDetails = () => {
        setSelectedItem(null);
    };

    const toggleDataView = () => {
        setIsLoading(true);
        setDataView(prevView => prevView === 'source' ? 'destination' : 'source');
        setSearchTerm('');
        setSelectedUnit('All');
        setSelectedSME('All');
    };

    // Generate user avatar based on name
    const getUserAvatar = (name) => {
        if (!name || name === 'Unknown') {
            return <User className="w-5 h-5" />;
        }

        const names = name.split(' ');
        let initials = '';

        if (names.length === 1) {
            initials = names[0].charAt(0);
        } else {
            initials = names[0].charAt(0) + names[names.length - 1].charAt(0);
        }

        return (
            <div className="flex items-center justify-center w-6 h-6 bg-pink-100 text-pink-700 rounded-full text-xs font-medium">
                {initials.toUpperCase()}
            </div>
        );
    };

    // Skeleton loader component
    const SkeletonCard = () => (
        <div className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
            <div className="flex justify-between items-start mb-3">
                <div className="h-5 bg-gray-200 rounded-full w-16"></div>
                <div className="h-5 bg-gray-200 rounded-full w-20"></div>
            </div>
            <div className="h-6 bg-gray-300 rounded mb-3"></div>
            <div className="h-4 bg-gray-200 rounded mb-3"></div>
            <div className="border-t border-b border-gray-100 py-3 mb-3">
                <div className="flex justify-between">
                    <div>
                        <div className="h-3 bg-gray-200 rounded w-8 mb-1"></div>
                        <div className="h-4 bg-gray-300 rounded w-14"></div>
                    </div>
                    <div>
                        <div className="h-3 bg-gray-200 rounded w-8 mb-1"></div>
                        <div className="h-4 bg-gray-300 rounded w-14"></div>
                    </div>
                </div>
            </div>
            <div className="h-9 bg-gray-200 rounded"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="w-full mx-auto">
                {/* Modern Header */}
                <header className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                                <BarChart3 className="w-5 h-5 text-white" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-800"><span className="text-blue-600">UniSC</span> Data Hub</h1>
                        </div>

                    </div>
                    <p className="text-gray-600 text-base">Discover and manage all data interfaces, sources and APIs across university departments</p>
                </header>


                {/* Sleek Search and Filters */}
                <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-3 items-end">
                        {/* Toggle Switch */}
                        <div className="w-full md:w-auto">
                            <label className="block text-sm font-medium  mb-1">
                                View Mode
                            </label>
                            <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg ">
                                <span className={`text-sm font-medium ${dataView === 'source' ? 'text-blue-700' : 'text-gray-500'}`}>
                                    Source
                                </span>

                                <div
                                    onClick={toggleDataView}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${dataView === 'source' ? 'bg-blue-500' : 'bg-purple-500'
                                        }`}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${dataView === 'source' ? 'translate-x-6' : 'translate-x-1'
                                        }`} />
                                </div>

                                <span className={`text-sm font-medium ${dataView === 'destination' ? 'text-purple-700' : 'text-gray-500'}`}>
                                    Destination
                                </span>
                            </div>
                        </div>

                        {/* Search Input */}
                        <div className="flex-1 min-w-0">
                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                Search {dataView === 'source' ? 'Data Sources' : 'Data Destinations'}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder={`Search by name, description, or technology...`}
                                    className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Unit Filter */}
                        <div className="w-full md:w-40">
                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                Filter by Unit
                            </label>
                            <select
                                className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                value={selectedUnit}
                                onChange={(e) => setSelectedUnit(e.target.value)}
                            >
                                {units.map(unit => (
                                    <option key={unit} value={unit}>{unit}</option>
                                ))}
                            </select>
                        </div>

                        {/* SME Filter */}
                        <div className="w-full md:w-40">
                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                Filter by SME
                            </label>
                            <select
                                className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                value={selectedSME}
                                onChange={(e) => setSelectedSME(e.target.value)}
                            >
                                {smes.map(sme => (
                                    <option key={sme} value={sme}>{sme}</option>
                                ))}
                            </select>
                        </div>

                        {/* Clear Button */}
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedUnit('All');
                                setSelectedSME('All');
                            }}
                            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center"
                            title="Clear filters"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>


                {/* Results Header */}
                <div className="mb-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">
                            {dataView === 'source' ? 'Data Interfaces' : 'Destination Interfaces'}
                        </h2>
                        <p className="text-gray-500 text-sm">
                            {dataView === 'source'
                                ? 'Browse and manage university data sources'
                                : 'Browse and manage university data destinations'}
                        </p>
                    </div>
                    <div className="bg-white px-3 py-1.5 rounded-md border border-gray-200 text-sm">
                        <span className="text-gray-600">Showing </span>
                        <span className="font-medium text-blue-600">{filteredData.length}</span>
                        <span className="text-gray-600"> of {data.length} {dataView === 'source' ? 'sources' : 'destinations'}</span>
                    </div>
                </div>

                {/* Modern Data Cards Grid - 4 cards per row */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {[...Array(8)].map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                ) : filteredData.length === 0 ? (
                    <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Frown className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-700 mb-2">No {dataView === 'source' ? 'data sources' : 'data destinations'} found</h3>
                        <p className="text-gray-500 mb-4 text-sm">Try adjusting your search criteria or filters</p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedUnit('All');
                                setSelectedSME('All');
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center mx-auto"
                        >
                            <Filter className="w-4 h-4 mr-1" />
                            Clear all filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredData.map((item, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-lg border border-gray-200 p-3 transition-all hover:shadow-md flex flex-col"
                            >
                                {/* Header */}
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[11px] font-medium px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                                        {item.Type || 'Unknown'}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">
                                    {item.Name || 'N/A'}
                                </h3>

                                {/* API Source → Destination */}
                                <div className="flex items-center text-gray-600 mb-2 text-xs">
                                    <Zap className="w-3.5 h-3.5 text-blue-500 mr-1" />
                                    <span className="truncate">
                                        {item['API Source']} → {item['API Destination'] || 'N/A'}
                                    </span>
                                </div>

                                {/* SME + UNIT + Icon */}
                                <div className="border-t border-gray-100 pt-2">
                                    <div className="grid grid-cols-2 gap-2 items-center">
                                        {/* SME */}
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase font-medium mb-0.5">SME</p>
                                            <div className="flex items-center">
                                                {getUserAvatar(item.SME)}
                                                <p className="font-medium text-blue-600 truncate text-[10px] ml-1.5">
                                                    {item.SME || 'Not specified'}
                                                </p>
                                            </div>
                                        </div>

                                        {/* UNIT + Icon on same row */}
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="text-[10px] text-gray-500 uppercase font-medium mb-0.5">UNIT</p>
                                                <p className="font-medium text-blue-600 truncate text-[10px]">
                                                    {dataView === 'source' ? item.UNIT : item?.Unit}
                                                </p>
                                            </div>
                                            <Info
                                                onClick={() => openDetails(item)}
                                                className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700 transition ml-2 flex-shrink-0"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                )}

                {/* Details Popup Modal */}
                {selectedItem && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm transition-all duration-200">
                        <div
                            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col border border-gray-200"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="bg-white p-5 border-b border-gray-200">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1 min-w-0 pr-4">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{selectedItem.Name}</h3>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="text-xs font-medium px-2 py-1 rounded-md bg-blue-100 text-blue-700">
                                                {selectedItem.Type}
                                            </span>
                                            {/* <span className={`text-xs font-medium px-2 py-1 rounded-md ${selectedItem['Quality Seal'] === 'BROKEN_QUALITY_SEAL' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                                {selectedItem['Quality Seal'] === 'BROKEN_QUALITY_SEAL' ? (
                                                    <AlertCircle className="w-3 h-3 inline mr-1" />
                                                ) : (
                                                    <CheckCircle className="w-3 h-3 inline mr-1" />
                                                )}
                                                {selectedItem['Quality Seal'] === 'BROKEN_QUALITY_SEAL' ? 'Needs Attention' : 'Validated'}
                                            </span> */}
                                            <span className="text-xs font-medium px-2 py-1 rounded-md bg-gray-100 text-gray-700">
                                                {dataView === 'source' ? 'Source' : 'Destination'}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={closeDetails}
                                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded-full transition-all"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-5">
                                {/* API Flow with smooth visualization */}
                                <div className="mb-6">
                                    <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                                        <Zap className="w-4 h-4 text-blue-500 mr-2" />
                                        Data Flow
                                    </h4>
                                    <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100">
                                        <div className="text-center flex-1">
                                            <div className="text-xs uppercase tracking-wide font-medium text-gray-500 mb-1">Source</div>
                                            <div className="text-sm font-medium text-gray-800 bg-white py-2 px-3 rounded-md border border-blue-200 shadow-sm">
                                                {selectedItem['API Source'] || 'Not specified'}
                                            </div>
                                        </div>

                                        <div className="px-4 flex flex-col items-center">
                                            <div className="w-12 h-0.5 bg-blue-300 mb-1"></div>
                                            <ArrowRight className="w-5 h-5 text-blue-500" />
                                            <div className="w-12 h-0.5 bg-blue-300 mt-1"></div>
                                        </div>

                                        <div className="text-center flex-1">
                                            <div className="text-xs uppercase tracking-wide font-medium text-gray-500 mb-1">Destination</div>
                                            <div className="text-sm font-medium text-gray-800 bg-white py-2 px-3 rounded-md border border-purple-200 shadow-sm">
                                                {selectedItem['API Destination'] || 'Not specified'}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                    {/* Ownership */}
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="text-sm font-medium text-gray-700 mb-3">Ownership</h4>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    {getUserAvatar(selectedItem.SME)}
                                                    <div className="ml-3">
                                                        <div className="text-xs text-gray-500">SME</div>
                                                        <div className="text-md font-medium text-gray-800">{selectedItem.SME || 'Not specified'}</div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-1">
                                                    <button
                                                        onClick={() => {
                                                            const email = `${selectedItem.SME.replace(/\s+/g, '.').toLowerCase()}@usc.edu.au`;
                                                            window.open(`mailto:${email}?subject=Question about ${selectedItem.Name}&body=Hello ${selectedItem.SME},%0D%0A%0D%0AI have a question regarding the ${selectedItem.Name} data interface.`);
                                                        }}
                                                        className="p-2 bg-white border border-gray-300 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 rounded-md transition-all"
                                                        title="Send email"
                                                    >
                                                        <Mail className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => alert(`Opening Microsoft Teams chat with ${selectedItem.SME}`)}
                                                        className="p-2 bg-white border border-gray-300 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 rounded-md transition-all"
                                                        title="Teams chat"
                                                    >
                                                        <MessageCircle className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500">Unit</div>
                                                <div className="text-sm font-medium text-gray-800">{dataView == 'source' ? selectedItem.UNIT : selectedItem?.Unit}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="text-sm font-medium text-gray-700 mb-3">Status</h4>
                                        <div className="space-y-3">
                                            <div>
                                                <div className="text-xs text-gray-500">Current Status</div>
                                                <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${selectedItem.Status === 'Active' ? 'bg-green-100 text-green-800' : selectedItem.Status === 'In Development' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                                                    {selectedItem.Status || 'Unknown'}
                                                </div>
                                            </div>
                                            {selectedItem.Count && (
                                                <div>
                                                    <div className="text-xs text-gray-500">Data Volume</div>
                                                    <div className="text-sm font-medium text-gray-800">{selectedItem.Count} records</div>
                                                </div>
                                            )}
                                            <div>
                                                <div className="text-xs text-gray-500">Last Updated</div>
                                                <div className="text-sm font-medium text-gray-800">{selectedItem.LastUpdated || 'Not specified'}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Purpose and Description */}
                                <div className="grid grid-cols-1 gap-4 mb-5">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                            <FileText className="w-4 h-4 text-gray-500 mr-2" />
                                            Purpose
                                        </h4>
                                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedItem.Purpose || 'Not specified'}</p>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                            <ClipboardList className="w-4 h-4 text-gray-500 mr-2" />
                                            Description
                                        </h4>
                                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedItem.Description || 'Not provided'}</p>
                                    </div>
                                </div>

                                {/* System ID */}
                                {/* <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                        <Key className="w-4 h-4 text-gray-500 mr-2" />
                                        System ID
                                    </h4>
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs font-mono text-gray-600 bg-white p-2 rounded-md border border-gray-200 break-all flex-1 mr-2">
                                            {selectedItem.ID}
                                        </p>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(selectedItem.ID);
                                                alert('System ID copied to clipboard!');
                                            }}
                                            className="p-2 bg-white border border-gray-300 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-all"
                                            title="Copy to clipboard"
                                        >
                                            <Copy className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div> */}
                            </div>

                            {/* Footer with action buttons */}
                            <div className="flex justify-end items-center p-4 border-t border-gray-200 bg-blue-50">
                                <button
                                    onClick={closeDetails}
                                    className="px-4 py-2 bg-green-100 text-green-900 hover:bg-green-200 rounded-lg transition-colors text-sm font-medium"
                                >
                                    Close
                                </button>
                            </div>



                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DataSources;