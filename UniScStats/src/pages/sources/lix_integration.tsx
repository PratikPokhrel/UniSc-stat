import React, { useState, useMemo, useEffect } from 'react';
import { Search, Users, ArrowRight, Database, Target, ChevronDown, ChevronRight, GitBranch, Network, AlertCircle, Building, Zap, X, User } from 'lucide-react';
import { SOURCE_DATA } from './source_data';
import { DEST_DATA } from './dest_data';
import * as XLSX from 'xlsx';


const LIXIntegrationsCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [selectedSME, setSelectedSME] = useState('Omer Yezdani');
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [integrations, setIntegrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSMEForModal, setSelectedSMEForModal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample data for fallback
  const sampleData = [];

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load XLSX library dynamically
        const loadXLSX = () => {
          return new Promise((resolve, reject) => {
            if (window.XLSX) {
              resolve(window.XLSX);
              return;
            }

            const script = document.createElement("script");
            script.src =
              "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
            script.onload = () => resolve(window.XLSX);
            script.onerror = reject;
            document.head.appendChild(script);
          });
        };

        const XLSX: any = await loadXLSX();

        // ✅ Fetch file from public folder instead of window.fs
        const response = await fetch("/master_copy1.xlsx");
        const arrayBuffer = await response.arrayBuffer();

        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const worksheet = workbook.Sheets["LIX Integrations"];
        if (!worksheet) {
          throw new Error("LIX Integrations sheet not found");
        }

        const range = XLSX.utils.decode_range(worksheet["!ref"]);

        function getCellValue(row: number, col: number) {
          const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
          const cell = worksheet[cellAddress];
          return cell && cell.v !== undefined ? cell.v : null;
        }

        // Extract data
        const extractedIntegrations: any[] = [];
        let currentIntegration: any = null;

        for (let row = 1; row <= range.e.r; row++) {
          const parentName = getCellValue(row, 0); // Column A - ParentDisplay Name
          const sourceAPI = getCellValue(row, 1); // Column B - API Source
          const sourceSME = getCellValue(row, 2); // Column C - SME (source)
          const sourceUnit = getCellValue(row, 3); // Column D - Unit (source)
          const destName = getCellValue(row, 4); // Column E - Name (destination system)
          const destSME1 = getCellValue(row, 5); // Column F - SME (destination)
          const destUnit1 = getCellValue(row, 6); // Column G - UNIT (destination)
          const destAPISource = getCellValue(row, 7); // Column H - API Source (destination)
          const destAPIEndpoint = getCellValue(row, 8); // Column I - API Destination
          const purpose = getCellValue(row, 9); // Column J - Purpose
          const destSME2 = getCellValue(row, 10); // Column K - SME (additional)
          const destUnit2 = getCellValue(row, 11); // Column L - UNIT (additional)

          if (parentName) {
            if (currentIntegration) {
              extractedIntegrations.push(currentIntegration);
            }

            currentIntegration = {
              id: extractedIntegrations.length + 1,
              parentName,
              source: {
                apiSource: sourceAPI,
                sme: sourceSME,
                unit: sourceUnit,
              },
              connections: [],
            };

            if (
              destName ||
              destSME1 ||
              destUnit1 ||
              destAPISource ||
              destAPIEndpoint ||
              purpose ||
              destSME2 ||
              destUnit2
            ) {
              currentIntegration.connections.push({
                systemName: destName,
                sme: destSME1 || destSME2,
                unit: destUnit1 || destUnit2,
                apiSource: destAPISource,
                apiDestination: destAPIEndpoint,
                purpose,
              });
            }
          } else {
            if (
              currentIntegration &&
              (destName ||
                destSME1 ||
                destUnit1 ||
                destAPISource ||
                destAPIEndpoint ||
                purpose ||
                destSME2 ||
                destUnit2)
            ) {
              currentIntegration.connections.push({
                systemName: destName,
                sme: destSME1 || destSME2,
                unit: destUnit1 || destUnit2,
                apiSource: destAPISource,
                apiDestination: destAPIEndpoint,
                purpose,
              });
            }
          }
        }

        if (currentIntegration) {
          extractedIntegrations.push(currentIntegration);
        }

        console.log("✅ Successfully loaded", extractedIntegrations.length, "integrations");
        setIntegrations(extractedIntegrations);
        setLoading(false);
      } catch (err) {
        console.error("Error loading data:", err);
        setError(err.message);
        setIntegrations(sampleData);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const uniqueUnits = useMemo(() => {
    const units = new Set();
    integrations.forEach(integration => {
      if (integration.source.unit) units.add(integration.source.unit);
      integration.connections.forEach(conn => {
        if (conn.unit) units.add(conn.unit);
      });
    });
    return Array.from(units).sort();
  }, [integrations]);

  const uniqueSMEs = useMemo(() => {
    const smes = new Set();
    integrations.forEach(integration => {
      if (integration.source.sme) smes.add(integration.source.sme);
      integration.connections.forEach(conn => {
        if (conn.sme) smes.add(conn.sme);
      });
    });

    return Array.from(smes).sort();
  }, [integrations]);

  console.log(uniqueSMEs)

  const filteredIntegrations = useMemo(() => {
    return integrations.filter(integration => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = !searchTerm ||
        integration.parentName.toLowerCase().includes(searchLower) ||
        integration.source.apiSource?.toLowerCase().includes(searchLower) ||
        integration.source.sme?.toLowerCase().includes(searchLower) ||
        integration.connections.some(conn =>
          conn.systemName?.toLowerCase().includes(searchLower) ||
          conn.apiDestination?.toLowerCase().includes(searchLower) ||
          conn.purpose?.toLowerCase().includes(searchLower) ||
          conn.sme?.toLowerCase().includes(searchLower)
        );

      const matchesUnit = !selectedUnit ||
        integration.source.unit === selectedUnit ||
        integration.connections.some(conn => conn.unit === selectedUnit);

      const matchesSME = !selectedSME ||
        integration.source.sme === selectedSME ||
        integration.connections.some(conn => conn.sme === selectedSME);

      return matchesSearch && matchesUnit && matchesSME;
    });
  }, [integrations, searchTerm, selectedUnit, selectedSME]);

  const toggleCard = (id) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  const getUnitColor = (unit) => {
    const colors = {
      'SSE': 'bg-blue-50 text-blue-700 border-blue-200',
      'IT': 'bg-green-50 text-green-700 border-green-200',
      'Marketing and Communications': 'bg-purple-50 text-purple-700 border-purple-200',
      'CSALT': 'bg-orange-50 text-orange-700 border-orange-200',
      'Library Services': 'bg-teal-50 text-teal-700 border-teal-200',
      'People & Culture': 'bg-pink-50 text-pink-700 border-pink-200',
      'ASU': 'bg-indigo-50 text-indigo-700 border-indigo-200',
      'Campus Development': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'DVC(R&I)': 'bg-red-50 text-red-700 border-red-200',
      'IAU': 'bg-cyan-50 text-cyan-700 border-cyan-200',
      'DVC(A)': 'bg-violet-50 text-violet-700 border-violet-200',
      'SSU': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'Advancement': 'bg-rose-50 text-rose-700 border-rose-200',
      'Finance Services': 'bg-amber-50 text-amber-700 border-amber-200',
      'International': 'bg-lime-50 text-lime-700 border-lime-200'
    };
    return colors[unit] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  // Function to handle SME click
  const handleSMEClick = (smeName) => {
    setSelectedSMEForModal(smeName);
    setIsModalOpen(true);
  };

  // Function to get all data for a specific SME
  const getSMEData = (smeName) => {
    if (!smeName) return { sources: [], destinations: [] };

    // Filter SOURCE_DATA for the SME
    const sources = SOURCE_DATA.filter(item =>
      item.SME && item.SME.toLowerCase() === smeName.toLowerCase()
    );

    // Filter DEST_DATA for the SME
    const destinations = DEST_DATA.filter(item =>
      item.SME && item.SME.toLowerCase() === smeName.toLowerCase()
    );

    return { sources, destinations };
  };


  const TreeView = ({ integrations, handleSMEClick, getUnitColor }) => {
    const [expanded, setExpanded] = useState<Set<string>>(new Set());

    const toggle = (id: string) => {
      const next = new Set(expanded);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      setExpanded(next);
    };

    return (
      <div className="space-y-4">
        {integrations.map((integration) => (
          <div
            key={integration.id}
            className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* Parent Row */}
            <div
              className="flex items-center p-4 cursor-pointer hover:bg-gray-50/60 transition-colors"
              onClick={() => toggle(integration.id)}
            >
              <div className="flex items-center flex-1 space-x-3">
                {expanded.has(integration.id) ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}

                <Database className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">
                  {integration.parentName}
                </h3>

                <span className="ml-2 text-xs text-gray-500">
                  {integration.connections.length} Destinations
                </span>
              </div>

              {/* Unit + SME */}
              <div className="flex items-center space-x-2">
                {/* Unit */}
                {integration.source.unit && (
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium border ${getUnitColor(
                      integration.source.unit
                    )}`}
                  >
                    {integration.source.unit}
                  </span>
                )}

                {/* SME with avatar */}
                {integration.source.sme && (
                  <div
                    className="flex items-center space-x-2 text-xs text-gray-800 bg-gray-100 px-2 py-1 rounded-md hover:bg-blue-50 hover:text-blue-700 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSMEClick(integration.source.sme);
                    }}
                  >
                    {/* Avatar with initials */}
                    <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-semibold">
                      {integration.source.sme
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </div>
                    {/* SME name */}
                    <span className="font-medium">{integration.source.sme}</span>
                  </div>
                )}
              </div>

            </div>

            {/* Children Tree */}
            {expanded.has(integration.id) && (
              <div className="ml-8 pl-4  pb-4 rounded-lg shadow-sm">
                <div className="flex flex-wrap gap-6 items-start">
                  {integration.connections.map((conn, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col space-y-2 min-w-[220px] border border-blue-200 rounded-lg p-3 bg-gray-50 shadow-sm"
                    >
                      {/* System Name */}
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-gray-900">
                          {conn.systemName || "Unnamed System"}
                        </span>
                      </div>

                      <div className="text-xs text-gray-600 space-y-2">
                        {/* API Destination */}
                        <div className="flex items-center">
                          <Zap className="w-3 h-3 mr-2 text-yellow-500" />
                          API Destination:
                          <span className="font-medium text-gray-800 ml-1">
                            {conn.apiDestination || "Not specified"}
                          </span>
                        </div>

                        {/* Purpose */}
                        {conn.purpose && <div>Purpose: {conn.purpose}</div>}

                        {/* SME with Avatar */}
                        {conn.sme && (
                          <div
                            className="flex items-center cursor-pointer hover:text-blue-600"
                            onClick={() => handleSMEClick(conn.sme)}
                          >
                            <Users className="w-4 h-4 mr-1" />
                            {/* Avatar with initials */}
                            <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[11px] font-semibold mr-2">
                              {conn.sme
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                            </div>
                            SME: <span className="text-blue-700">{"  "}{conn.sme}</span>
                          </div>
                        )}

                        {/* Unit + API Source in same row */}
                        {(conn.unit || conn.apiSource) && (
                          <div className="flex items-center justify-between gap-2">
                            {conn.unit && (
                              <span
                                className={`inline-block px-2 py-0.5 rounded-full text-xs border ${getUnitColor(
                                  conn.unit
                                )}`}
                              >
                                {conn.unit}
                              </span>
                            )}

                            {conn.apiSource && (
                              <div className="flex items-center text-[11px] text-gray-700 bg-gray-50 border border-gray-100 rounded px-2 py-0.5">
                                <Network className="w-3 h-3 mr-1 text-blue-500" />
                                {conn.apiSource}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            )}

          </div>
        ))}
      </div>
    );
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
            <Network className="absolute inset-0 m-auto h-8 w-8 text-blue-600" />
          </div>
          <p className="text-gray-600 font-medium">Loading LIX Integrations...</p>
          <p className="text-gray-500 text-sm mt-1">Processing cascading data structure</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-10 shadow-sm">
        <div className="w-full mx-auto px-6 py-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              {/* Heading */}
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                  <GitBranch className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">
                  <span className="text-blue-600">UniSC</span> LIX Integrations Catalog
                </h1>
              </div>

              {/* Subheading */}
              <p className="text-gray-600 text-base">
                A comprehensive overview of university data integration mappings and their interconnections
              </p>

              {/* Error / Info message */}
              {error && (
                <div className="mt-3 ml-11 flex items-center space-x-2 text-amber-600 text-sm bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Sample data shown - {error}</span>
                </div>
              )}
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap gap-3 items-end">
            <div className="relative flex-1 min-w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search integrations, systems, SMEs, or purposes..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-gray-900 placeholder-gray-400 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative">
              <select
                className="px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-gray-900 text-sm appearance-none pr-8"
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
              >
                <option value="">All Units</option>
                {uniqueUnits.map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>

            <div className="relative">
              <select
                className="px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-gray-900 text-sm appearance-none pr-8"
                value={selectedSME}
                onChange={(e) => setSelectedSME(e.target.value)}
              >
                <option value="">All SMEs</option>
                {uniqueSMEs.map(sme => (
                  <option key={sme} value={sme}>{sme}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="w-full mx-auto px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {filteredIntegrations.length} Integration{filteredIntegrations.length !== 1 ? 's' : ''} Found
          </h2>
          {/* <button
            onClick={() => {
              if (expandedCards.size === filteredIntegrations.length) {
                setExpandedCards(new Set());
              } else {
                setExpandedCards(new Set(filteredIntegrations.map(i => i.id)));
              }
            }}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center space-x-2 px-3 py-1 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <span>{expandedCards.size === filteredIntegrations.length ? 'Collapse All' : 'Expand All'}</span>
          </button> */}
        </div>

        <div className="space-y-4">
          {filteredIntegrations.map((integration) => (
            <TreeView
              key={integration.id}
              integrations={[integration]}
              handleSMEClick={handleSMEClick}
              getUnitColor={getUnitColor}
            />
          ))}
        </div>

        {filteredIntegrations.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 max-w-md mx-auto">
              <Database className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No integrations found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters</p>
            </div>
          </div>
        )}
      </div>

      {/* SME Details Modal */}
      {isModalOpen && selectedSMEForModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-scaleIn">

            {/* Header */}
            <div className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-2xl border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold text-gray-900">{selectedSMEForModal}</h2>
                  </div>
                  {getSMEData(selectedSMEForModal).sources[0].UNIT && (
                    <p className={`mt-1 inline-block px-2 py-1 text-base font-semibold rounded border ${getUnitColor(getSMEData(selectedSMEForModal).sources[0].UNIT)}`}>
                      {getSMEData(selectedSMEForModal).sources[0].UNIT}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:shadow">
                <X className="w-4 h-4 text-gray-500 hover:text-gray-700" />
              </button>
            </div>
            {/* Content */}
            <div className="overflow-y-auto p-5 flex-1 space-y-6">

              {/* Data Sources */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-blue-100 p-2 rounded-lg flex items-center justify-center">
                    <Database className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="text-md font-semibold text-gray-900">Data Sources</h3>
                  <span className="ml-2 bg-blue-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                    {getSMEData(selectedSMEForModal).sources.length}
                  </span>
                </div>

                {getSMEData(selectedSMEForModal).sources.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3">
                    {getSMEData(selectedSMEForModal).sources.map((source, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl bg-neutral-50 shadow-md p-3 hover:shadow-md transition-shadow duration-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          {["API Source", "API Destination", "Name", "UNIT"].map((field, i) => (
                            <div key={i} className="space-y-0.5">
                              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
                                {field === "API Source" ? "Source System" : field === "API Destination" ? "Destination" : field === "Name" ? "Interface Name" : "Unit"}
                              </div>
                              <div className="flex items-center gap-1 text-gray-900 font-medium">
                                {field.includes("API") && <div className={`w-2 h-2 ${field === "API Source" ? "bg-blue-500" : "bg-green-500"} rounded-full`}></div>}
                                {source[field]}
                              </div>
                            </div>
                          ))}
                          {source.Purpose && (
                            <div className="md:col-span-2 pt-1 border-t border-gray-100 space-y-1">
                              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Purpose</div>
                              <div className="text-sm text-gray-900">{source.Purpose}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 bg-gray-50 rounded-xl shadow-sm">
                    <Database className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">No data sources found for this SME</p>
                  </div>
                )}
              </div>

              {/* Data Destinations */}
              <div className=''>
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-green-100 p-2 rounded-lg flex items-center justify-center">
                    <Target className="w-4 h-4 text-green-600" />
                  </div>
                  <h3 className="text-md font-semibold text-gray-900">Data Destinations</h3>
                  <span className="ml-2 bg-green-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                    {getSMEData(selectedSMEForModal).destinations.length}
                  </span>
                </div>

                {getSMEData(selectedSMEForModal).destinations.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3 ">
                    {getSMEData(selectedSMEForModal).destinations.map((dest, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm p-4 rounded-xl bg-gradient-to-r from-neutral-100 to-neutral-200 shadow-md">
                          {["API Source", "API Destination", "Name", "Unit"].map((field, i) => (
                            <div key={i} className="space-y-0.5">
                              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
                                {field === "API Source" ? "Source System" : field === "API Destination" ? "Destination" : field === "Name" ? "Interface Name" : "Unit"}
                              </div>
                              <div className="flex items-center gap-1 text-gray-900 font-medium">
                                {field.includes("API") && <div className={`w-2 h-2 ${field === "API Source" ? "bg-blue-500" : "bg-green-500"} rounded-full`}></div>}
                                {dest[field]}
                              </div>
                            </div>
                          ))}
                          {dest.Purpose && (
                            <div className="md:col-span-2 pt-1 border-t border-gray-100 space-y-1">
                              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Purpose</div>
                              <div className="text-sm text-gray-900">{dest.Purpose}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 bg-gray-50 rounded-xl shadow-sm">
                    <Target className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">No data destinations found for this SME</p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium shadow-sm hover:shadow"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LIXIntegrationsCatalog;