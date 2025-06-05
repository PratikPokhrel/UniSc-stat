import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    RadialBarChart,RadialBar,
    PolarAngleAxis,PieChart,
    Pie,Cell,Tooltip
} from 'recharts';
import { ReportData, reports } from './data';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { Download } from 'lucide-react';

const academicReleases = [
    {
        id: "reviews-dashboard",
        title: "Reviews Dashboard",
        date: "23 Apr 2025",
        description: "Overview of review activities and schedules with program analysis",
        type: "Governance & Compliance "
    },
    {
        id: "program-compliance-tracker",
        title: "Program Compliance Tracker",
        date: "19 Apr 2025",
        description: "Tracks regulatory and accreditation compliance for academic programs",
        type: "Governance & Compliance "
    },
    {
        id: "course-feedback-analysis",
        title: "Course Feedback Analysis",
        date: "15 Apr 2025",
        description: "Aggregated sentiment and scores from student evaluations across all faculties",
        type: "Governance & Compliance "
    },
    {
        id: "graduate-outcomes-dashboard",
        title: "Graduate Outcomes Dashboard",
        date: "10 Apr 2025",
        description: "Visualisation of graduate employment, further study, and satisfaction rates",
        type: "Governance & Compliance "
    }
];

const MetaDataDashboard = () => {
    const { id } = useParams<{ id: string }>();
    const [selectedReportId, setSelectedReportId] = useState(academicReleases[0].id);
    const [report, setReport] = useState<ReportData | undefined>(undefined);
    const [searchTerm, setSearchTerm] = useState('');


    const activeId = id || selectedReportId;

    useEffect(() => {
        const foundReport = reports.find(e => e.id === activeId);
        setReport(foundReport);
    }, [activeId]);

    // Filter reports based on search term
    const filteredReports = academicReleases.filter(report =>
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const foundReport = reports.find(e => e.id === activeId);
        setReport(foundReport);
    }, [activeId]);


    // Add this function to your component
    const handleDownloadQualityReport = async () => {
        try {
            // Create a new PDF document
            const pdfDoc = await PDFDocument.create();
            const page = pdfDoc.addPage([595, 842]); // A4 size (595 × 842 points)

            // Embed fonts
            const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
            const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

            // Colors
            const primaryColor = rgb(0.05, 0.3, 0.6); // Dark blue
            const secondaryColor = rgb(0.8, 0.1, 0.1); // Red
            const accentColor = rgb(0, 0.5, 0.2); // Green
            const textColor = rgb(0.2, 0.2, 0.2); // Dark gray

            // Add header with logo and title
            const logoPath = window.location.origin + '/assets/images/usc_logo.jpeg';

            // 2. Fetch and embed the image
            let logoImage;

            const response = await fetch(logoPath);
            const imageBytes = await response.arrayBuffer();
            logoImage = await pdfDoc.embedJpg(imageBytes); // Use embedJpg for JPEG files

            page.drawImage(logoImage, {
                x: 50,
                y: page.getHeight() - 80,
                width: 50,
                height: 50,
            });

            page.drawText('ACADEMIC QUALITY REPORT', {
                x: 110,
                y: page.getHeight() - 60,
                size: 20,
                font: fontBold,
                color: primaryColor,
            });

            page.drawText(`Generated: ${new Date().toLocaleDateString()}`, {
                x: 110,
                y: page.getHeight() - 85,
                size: 10,
                font: font,
                color: textColor,
            });

            // Add divider line
            page.drawLine({
                start: { x: 50, y: page.getHeight() - 100 },
                end: { x: page.getWidth() - 50, y: page.getHeight() - 100 },
                thickness: 2,
                color: primaryColor,
            });

            // Report title section
            page.drawText(report.title, {
                x: 50,
                y: page.getHeight() - 140,
                size: 16,
                font: fontBold,
                color: primaryColor,
            });

            // Main content sections
            let yPosition = page.getHeight() - 180;

            // Data Quality Section
            drawSectionHeader(page, 'DATA QUALITY METRICS', yPosition, fontBold, primaryColor);
            yPosition -= 30;

            // Quality score with visual indicator
            const qualityScore = quality_metadata.data_quality_score;
            page.drawText(`Data Quality Score:`, {
                x: 50,
                y: yPosition,
                size: 12,
                font: font,
                color: textColor,
            });

            page.drawText(`${qualityScore}%`, {
                x: 180,
                y: yPosition,
                size: 14,
                font: fontBold,
                color: qualityScore > 75 ? accentColor : secondaryColor,
            });

            // Draw quality meter
            page.drawRectangle({
                x: 220,
                y: yPosition - 5,
                width: 200,
                height: 10,
                borderWidth: 1,
                borderColor: rgb(0.8, 0.8, 0.8),
                color: rgb(0.95, 0.95, 0.95),
            });

            page.drawRectangle({
                x: 220,
                y: yPosition - 5,
                width: (200 * qualityScore) / 100,
                height: 10,
                color: qualityScore > 75 ? accentColor : secondaryColor,
            });

            yPosition -= 30;

            // Compliance Section
            drawSectionHeader(page, 'COMPLIANCE STANDARDS', yPosition, fontBold, primaryColor);
            yPosition -= 30;

            const complianceData = [
                { name: 'ISO 8000-61', value: 65 },
                { name: 'UniSC DQF v2.1', value: 35 }
            ];

            complianceData.forEach(item => {
                page.drawText(`• ${item.name}:`, {
                    x: 50,
                    y: yPosition,
                    size: 12,
                    font: font,
                    color: textColor,
                });

                page.drawText(`${item.value}%`, {
                    x: 180,
                    y: yPosition,
                    size: 12,
                    font: fontBold,
                    color: item.value > 50 ? accentColor : secondaryColor,
                });

                yPosition -= 20;
            });

            // Ownership Section
            yPosition -= 10;
            drawSectionHeader(page, 'DATA OWNERSHIP', yPosition, fontBold, primaryColor);
            yPosition -= 30;

            page.drawText(`Data Owner: ${data_ownership.data_owner}`, {
                x: 50,
                y: yPosition,
                size: 12,
                font: font,
                color: textColor,
            });
            yPosition -= 20;

            page.drawText(`Data Steward: ${data_ownership.data_steward}`, {
                x: 50,
                y: yPosition,
                size: 12,
                font: font,
                color: textColor,
            });
            yPosition -= 20;

            page.drawText(`Retention Policy: ${data_ownership.retention_policy}`, {
                x: 50,
                y: yPosition,
                size: 12,
                font: font,
                color: textColor,
            });

            // Footer
            page.drawText('Confidential - For Internal Use Only', {
                x: 50,
                y: 50,
                size: 10,
                font: font,
                color: rgb(0.5, 0.5, 0.5),
            });

            // Save the PDF
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            // Trigger download
            const a = document.createElement('a');
            a.href = url;
            a.download = `quality-report-${report.id}.pdf`;
            document.body.appendChild(a);
            a.click();

            // Clean up
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 100);

        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    }

    // Helper function for section headers
    const drawSectionHeader = (page, text, y, font, color) => {
        page.drawText(text, {
            x: 50,
            y: y,
            size: 14,
            font: font,
            color: color,
            underline: true,
        });

        page.drawLine({
            start: { x: 50, y: y - 5 },
            end: { x: page.getWidth() - 50, y: y - 5 },
            thickness: 0.5,
            color: rgb(0.8, 0.8, 0.8),
        });
    };
    if (!report) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-lg font-medium text-gray-600">Loading report data...</div>
            </div>
        );
    }

    const { data_governance, technical_metadata } = report;
    const { data_ownership, data_lineage, provenance, quality_metadata } = data_governance;

    const qualityData = [{
        name: 'Score',
        value: quality_metadata.data_quality_score,
        fill: '#4CAF50'
    }];

    const complianceData = [
        { name: 'ISO 8000-61', value: 65 },
        { name: 'UniSC DQF v2.1', value: 35 }
    ];

    const COLORS = ['#3F51B5', '#2196F3'];
    const transformationHistory = data_lineage.transformation_history;

    return (
        <div className="flex min-h-screen bg-gray-50 text-xs bg-[#F2F2F2]">
            {/* Sidebar with report list */}
            <div className="w-82 bg-white shadow-md overflow-y-auto">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold">Academic Reports</h2>
                    <p className="text-xs text-gray-500 mt-1">{filteredReports.length} reports available</p>
                </div>

                {/* Simple Search Bar */}
                <div className="px-4 py-2 border-b border-gray-200">
                    <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Search reports..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="space-y-2 p-2">
                    {filteredReports.map((item) => (
                        <div
                            key={item.id}
                            className={`p-3 rounded-lg cursor-pointer transition border border-gray-100 ${activeId === item.id
                                ? 'bg-blue-50 border-blue-200'
                                : 'hover:bg-gray-50'
                                }`}
                            onClick={() => setSelectedReportId(item.id)}
                        >
                            <div className="flex items-start justify-between">
                                <h3 className="font-medium font-bold text-sm">{item.title}</h3>
                                <span className="text-xs font-bold text-gray-400">{item.date}</span>
                            </div>
                            <p className="text-xs mt-1 text-gray-600 line-clamp-2">{item.description}</p>
                            <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">
                                {item.type}
                            </span>
                        </div>
                    ))}
                </div>
            </div>


            {/* Main dashboard content */}
            <div className="flex-1 px-4 py-6 overflow-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl shadow p-4 mb-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-xl font-semibold">{report.title}</h1>
                            <p className="text-xs text-blue-100 mt-1">{report.description}</p>
                        </div>

                        {/* Download Report Button */}
                        <button
                            onClick={handleDownloadQualityReport}
                            className="flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50  px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.04]">
                            <Download className="h-5 w-5" />
                            <span className="font-medium">Download Report</span>
                        </button>
                    </div>

                    <div className="flex gap-2 mt-3 text-sm">
                        <span className="bg-amber-500 px-2 py-0.5 rounded-full">
                            {technical_metadata.sensitivity_class}
                        </span>
                        <span className="bg-purple-600 px-2 py-0.5 rounded-full">
                            Version {technical_metadata.schema_version}
                        </span>
                        <span className="bg-green-600 px-2 py-0.5 rounded-full">
                            Last updated: {report.last_update}
                        </span>
                    </div>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {/* Left Column - Metrics */}
                    <div className="md:col-span-2 space-y-4">
                        {/* Data Quality */}
                        <Card className="h-[250px]">
                            <h2 className="text-base font-semibold mb-2">Data Quality</h2>
                            <div className="border-b border-gray-200 mb-3"></div>
                            <div className="flex justify-center h-[140px]">
                                <RadialBarChart
                                    width={200}
                                    height={140}
                                    innerRadius="70%"
                                    outerRadius="90%"
                                    data={qualityData}
                                    startAngle={180}
                                    endAngle={0}
                                >
                                    <PolarAngleAxis
                                        type="number"
                                        domain={[0, 100]}
                                        angleAxisId={0}
                                        tick={false}
                                    />
                                    <RadialBar
                                        background
                                        dataKey="value"
                                        cornerRadius={6}
                                        fill="#4CAF50"
                                    />
                                    <text
                                        x={100}
                                        y={70}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        className="text-base font-semibold fill-gray-700"
                                    >
                                        {qualityData[0].value}%
                                    </text>
                                </RadialBarChart>
                            </div>
                            <p className="text-center text-gray-500 text-sm mt-1">
                                Last tested: {"2024-04-15"} by{' '}
                                <b>{"IAU"}</b>
                            </p>
                        </Card>

                        {/* Compliance Standards */}
                        <Card className="h-[250px]">
                            <h2 className="text-base font-semibold mb-2">Compliance Standards</h2>
                            <div className="border-b border-gray-200 mb-3"></div>
                            <div className="flex justify-center h-[140px]">
                                <PieChart width={120} height={120}>
                                    <Pie
                                        data={complianceData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={50}
                                        innerRadius={35}
                                        fill="#8884d8"
                                        dataKey="value"
                                        isAnimationActive={true}
                                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                                        labelLine={false}
                                    >
                                        {complianceData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index % COLORS.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value) => [`${value}%`]}
                                        contentStyle={{
                                            fontSize: '0.75rem',
                                            borderRadius: '4px',
                                            padding: '4px 8px'
                                        }}
                                    />
                                    <text
                                        x="50%"
                                        y="50%"
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        className="text-xs font-semibold"
                                    >
                                        Compliance
                                    </text>
                                </PieChart>
                            </div>
                            <div className="flex justify-center gap-4 mt-1">
                                {complianceData.map((entry, index) => (
                                    <div key={index} className="flex items-center">
                                        <div
                                            className="w-2 h-2 rounded-full mr-1"
                                            style={{ backgroundColor: COLORS[index] }}
                                        />
                                        <span className="text-sm text-gray-600">{entry.name}</span>
                                    </div>
                                ))}
                            </div>
                           
                        </Card>
                    </div>

                    {/* Middle Column - Metadata */}
                    <div className="md:col-span-2 space-y-4">
                        {/* Data Ownership */}
                        <Card>
                            <h2 className="text-base font-semibold mb-2">Data Ownership</h2>
                            <div className="border-b border-gray-200 mb-3"></div>
                            <div className="grid grid-cols-1 gap-3">
                                <InfoBlock
                                    label="Data Owner"
                                    content={data_ownership.data_owner}
                                />
                                <InfoBlock
                                    label="Data Steward"
                                    content={data_ownership.data_steward}
                                />
                                <InfoBlock
                                    label="Retention Policy"
                                    content={data_ownership.retention_policy}
                                />

                            </div>
                        </Card>

                        {/* Provenance */}
                        <Card>
                            <h2 className="text-base font-semibold mb-2">Provenance</h2>
                            <div className="border-b border-gray-200 mb-3"></div>
                            <div className="grid grid-cols-1 gap-3">
                                <InfoBlock
                                    label="Acquisition Date"
                                    content={provenance.acquisition_date}
                                />
                                <InfoBlock
                                    label="Source Contact"
                                    content={provenance.source_contact}
                                />
                                <InfoBlock
                                    label="Update Frequency"
                                    content={provenance.update_frequency}
                                />

                            </div>
                        </Card>

                        {/* Technical Metadata */}
                        <Card>
                            <h2 className="text-base font-semibold mb-2">Technical Metadata</h2>
                            <div className="border-b border-gray-200 mb-3"></div>
                            <div className="grid grid-cols-1 gap-3">
                                <InfoBlock
                                    label="Schema Version"
                                    content={technical_metadata.schema_version}
                                />
                                <InfoBlock
                                    label="Refresh Schedule"
                                    content={technical_metadata.refresh_schedule}
                                />
                                <InfoBlock
                                    label="Sensitivity Class"
                                    content={technical_metadata.sensitivity_class}
                                />
                                <div>
                                    <h3 className="text-xs font-medium text-gray-700">Access Audit</h3>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Column - Data Lineage */}
                    <div className="md:col-span-1">
                        <Card>
                            <h2 className="text-base font-semibold mb-2">Data Lineage</h2>
                            <div className="border-b border-gray-200 mb-3"></div>
                            <div className="mb-2">
                                <p className="text-xs font-medium mb-1">
                                    <strong>Origin:</strong> {data_lineage.origin_system}
                                </p>
                                <p className="text-xs text-gray-600 mb-3">
                                    {data_lineage.extract_process}
                                </p>
                                <p className="text-xs font-medium text-gray-700 mb-2">
                                    Transformation History:
                                </p>
                                <div className="space-y-2 pl-2 border-l-2 border-blue-300">
                                    {transformationHistory.map((item, index) => (
                                        <div key={index} className="pl-3 relative">
                                            <div className="absolute -left-[9px] top-[9px] w-2 h-2 bg-blue-500 rounded-full"
                                                style={{ transform: 'translateX(1px)' }}
                                            />
                                            <p className="text-xs text-gray-400">{item.date}</p>
                                            <p className="text-xs">{item.description}</p>
                                            {item.duration && (
                                                <p className="text-xs text-gray-500">
                                                    Duration: {item.duration} days
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <a
                                className="text-blue-600 hover:underline text-xs mt-2 block">
                                View full lineage report
                            </a>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Card component
const Card = ({ children, className = '' }: {
    children: React.ReactNode;
    className?: string
}) => (
    <div className={`bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 ${className}`}>
        {children}
    </div>
);

// Info block component
const InfoBlock = ({ label, content }: {
    label: string;
    content: string
}) => (
    <div>
        <h3 className="text-xs font-medium text-gray-700">{label}</h3>
        <p className="text-gray-600 whitespace-pre-line text-sm mt-0.5">
            {content}
        </p>
    </div>
);

export default MetaDataDashboard;