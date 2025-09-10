import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  BarChart3, 
  ChevronDown, RefreshCw, ChevronRight} from 'lucide-react';
import organizationalData from '../academic-structure/org_unit_data.jsx';
import RenderCapabilityMatrix from './capability-matrix.js';
import RenderSystemHealth from './system-health.js';
import RenderRadarCard from './radar-chart.js';
import RenderGovernanceTrend from './governance-trend.js';
import RenderDataQualityGrid from './data-quality-grid.js';
import RenderCAUDITHERMSummary from './herm-summary.js';
import { DataAssetByDimension } from './data-asset-by-dimension.js';
import { capabilityMaturityData, dataQualityMetrics, governanceTrend, hermBreakdown, systemHealthData } from './data.js';

const DQDashboard = () => {
  const [widgets, setWidgets] = useState([
    { id: 'strategy-management', type: 'doughnut', title: 'Strategy & Planning Management', value: '91.5%', color: 'bg-green-100', draggable: false },
    { id: 'information-management', type: 'doughnut', title: 'Information & Data Management', value: '84.3%', color: 'bg-amber-100', draggable: false },
    { id: 'analytics-insights', type: 'doughnut', title: 'Analytics & Business Intelligence', value: '88.7%', color: 'bg-purple-100', draggable: false },
    { id: 'business-management', type: 'doughnut', title: 'Business & Operations Management', value: '85.1%', color: 'bg-indigo-100', draggable: false },
    { id: 'data-quality', type: 'metrics-grid', title: 'IAU Data Quality Indicators', draggable: true },
    { id: 'capability-maturity', type: 'radar', title: 'Capability Maturity Matrix', draggable: true },
    { id: 'application-health', type: 'chart', title: 'System Health & Performance', draggable: true },
    { id: 'governance-score', type: 'area', title: 'Governance Performance Trend', draggable: true },
    { id: 'risk-assessment', type: 'risk', title: 'Risk Management', draggable: true },
    { id: 'herm-framework-summary', type: 'herm-summary', title: 'HERM Framework Summary', draggable: true },
  ]);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);


  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(widgets);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setWidgets(items);
  };


  const renderWidget = (widget) => {
    switch (widget.type) {
      case 'doughnut':
        return <RenderRadarCard hermBreakdown={hermBreakdown} widget={widget} />;
      case 'radar':
        return <RenderCapabilityMatrix capabilityMaturityData={capabilityMaturityData} />;
      case 'chart':
        return <RenderSystemHealth systemHealthData={systemHealthData} />;
      case 'area':
        return <RenderGovernanceTrend governanceTrend={governanceTrend} systemHealthData={systemHealthData} />;
      case 'risk':
        return <DataAssetByDimension />
      case 'metrics-grid':
        return <RenderDataQualityGrid dataQualityMetrics={dataQualityMetrics} />;
      case 'herm-summary':
        return <RenderCAUDITHERMSummary organizationalData={organizationalData} />;
      default:
        return <div>Unknown widget type</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-">
      <div className="max-w-8xl mx-auto my-auto">
        <div className="mb-4">
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <a href="#" className="hover:text-blue-600">Home</a>
            <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
            <a href="#" className="hover:text-blue-600">Dashboards</a>
            <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
            <span className="text-gray-800 font-medium">Governance</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-blue-100 p-4 rounded-lg mr-4 border border-blue-200">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                  <span className='text-blue-600'> IAU </span> Data Quality Dashboard
                </h3>
                <p className="text-gray-600">Insights & Analytics Unit </p>
                <div className="flex items-center mt-2 space-x-3 text-sm">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">ORG_L3_279</span>
                  <div className="hidden md:flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                    <span> Operational</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full items-center mb-2">
            <div className="flex flex-wrap items-center gap-3 ml-auto">
              <div className="flex items-center space-x-2">
                <select className="px-2 py-1.5 border border-gray-300 rounded-md bg-white text-xs focus:ring-1 focus:ring-blue-200 focus:border-blue-500">
                  <option>Current Quarter</option>
                  <option>Last Quarter</option>
                  <option>Year to Date</option>
                  <option>Custom Range</option>
                </select>
              </div>


              <button
                className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="h-4 w-4" />
              </button>

              <div className="relative group">
                <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-xs flex items-center">
                  Generate Report
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg hidden group-hover:block z-10">
                  <div className="py-1">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => alert("PDF Generation is not implemented yet")}>PDF</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => alert("Excel Generation is not implemented yet")}>Excel</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => alert("CSV Generation is not implemented yet")}>CSV</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="widgets" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                {widgets.map((widget, index) => {
                  if (widget.draggable) {
                    return (
                      <Draggable key={widget.id} draggableId={widget.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`transition-all duration-300 ${animate ? 'opacity-0 animate-fade-in' : 'opacity-100'
                              } ${widget.type === 'radar' ||
                                widget.type === 'herm-summary' ||
                                widget.type === 'chart' ||
                                widget.type === 'area' ||
                                widget.type === 'risk' ||
                                widget.type === 'metrics-grid'
                                ? 'md:col-span-2 lg:col-span-2'
                                : ''
                              }`}
                            style={{
                              animationDelay: `${index * 100}ms`,
                              animationFillMode: 'forwards',
                              ...provided.draggableProps.style
                            }}
                          >
                            <div {...provided.dragHandleProps}>
                              {renderWidget(widget)}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  } else {
                    return (
                      <div
                        key={widget.id}
                        className={`transition-all duration-300 ${animate ? 'opacity-0 animate-fade-in' : 'opacity-100'
                          }`}
                        style={{
                          animationDelay: `${index * 100}ms`,
                          animationFillMode: 'forwards'
                        }}
                      >
                        {renderWidget(widget)}
                      </div>
                    );
                  }
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default DQDashboard;