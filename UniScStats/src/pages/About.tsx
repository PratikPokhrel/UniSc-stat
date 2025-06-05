import Header from '@/components/Header';
import { 
  Globe,
  BarChart2,
  Layers,
  Shield,
  Users,
  BookOpen,
  Search,
  Sliders,
  Download,
  Share2,
  Clock,
  GraduationCap,
  MapPin,
  Sun,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
  const navigate = useNavigate();
  return (
    <>
    <Header/>
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-amber-50">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow-sm border border-gray-200 mb-6">
            <Sun className="w-5 h-5 text-amber-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">UniSC Data Portal 3</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Discover <span className="text-amber-600">UniSC's</span> Institutional Analytics
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Empowering our university community with trusted, accessible data to drive innovation and decision-making.
          </p>
        </div>

        {/* Value Proposition */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <ValueCard
            icon={<BarChart2 className="w-8 h-8" />}
            title="Data-Driven Decisions"
            description="Support strategic planning with real-time institutional insights"
            color="amber"
          />
          <ValueCard
            icon={<Layers className="w-8 h-8" />}
            title="Unified Access"
            description="Single gateway to UniSC's authoritative data assets"
            color="orange"
          />
          <ValueCard
            icon={<Shield className="w-8 h-8" />}
            title="Quality Assurance"
            description="Curated datasets adhering to UniSC's governance standards"
            color="amber"
          />
        </div>

        {/* Experience Flow */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            How the Portal Works
          </h2>
          <div className="relative">
            {/* Timeline bar */}
            <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 h-full w-1 bg-amber-100"></div>
            
            <div className="space-y-16">
              <ExperienceStep
                icon={<Search className="w-6 h-6" />}
                title="Find"
                description="Locate datasets across different data sources either on cloud or on-premise through intuitive search and filters"
                side="left"
              />
              <ExperienceStep
                icon={<Sliders className="w-6 h-6" />}
                title="Analyze"
                description="Explore data with interactive visualizations and customizable dashboards"
                side="right"
              />
              <ExperienceStep
                icon={<Download className="w-6 h-6" />}
                title="Use"
                description="Easily export your data in multiple formats that are perfectly tailored and ready to integrate with your research workflows and tools."
                side="left"
              />
              <ExperienceStep
                icon={<Share2 className="w-6 h-6" />}
                title="Collaborate"
                description="Share findings across UniSC teams"
                side="right"
              />
            </div>
          </div>
        </div>

        {/* Governance Highlight */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 mb-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-10">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-50 text-amber-600 mb-4">
                <Shield className="w-5 h-5 mr-2" />
                <span className="font-medium">UniSC Data Governance</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Trusted Institutional Data
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our portal aligns with UniSC's Data Governance Policy, ensuring accuracy, security, and appropriate use.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mt-2 mr-3"></span>
                  <span className="text-gray-700">Managed by UniSC's Data Stewardship Committee</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mt-2 mr-3"></span>
                  <span className="text-gray-700">Regular quality audits and updates</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mt-2 mr-3"></span>
                  <span className="text-gray-700">Compliant with Australian privacy standards</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center mb-6">
                  <Users className="w-6 h-6 text-amber-500 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Who Uses This Portal</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  
                  <div className="bg-white p-4 rounded-lg shadow-xs border border-gray-100">
                    <h4 className="font-medium text-gray-900 mb-2">Faculty</h4>
                    <p className="text-sm text-gray-600">Curriculum and program insights</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-xs border border-gray-100">
                    <h4 className="font-medium text-gray-900 mb-2">Leadership</h4>
                    <p className="text-sm text-gray-600">Strategic planning support</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-xs border border-gray-100">
                    <h4 className="font-medium text-gray-900 mb-2">Administrators</h4>
                    <p className="text-sm text-gray-600">Operational decision-making</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-xs border border-gray-100">
                    <h4 className="font-medium text-gray-900 mb-2">Researchers</h4>
                    <p className="text-sm text-gray-600">Access to institutional benchmarks</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resources Section */}
       

        {/* Final CTA */}
        <div className="text-center bg-white rounded-2xl shadow-sm border border-gray-100 py-16 px-6">
          <div className="flex justify-center mb-4">
            <GraduationCap className="w-10 h-10 text-amber-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to explore UniSC's data?</h2>
         
          <a
           onClick={()=>navigate("/navigate")}
            className="inline-block px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg shadow-sm transition-colors"
          >
            Access the Portal
          </a>
        </div>
      </div>
    </div>
    </>
  );
};

// Component for value cards
const ValueCard = ({ icon, title, description, color }) => {
  const colorClasses = {
    amber: 'bg-amber-50 text-amber-600',
    orange: 'bg-orange-50 text-orange-600',
    yellow: 'bg-yellow-50 text-yellow-600'
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center hover:shadow-md transition-shadow">
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mx-auto mb-6 ${colorClasses[color]}`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

// Component for experience steps
const ExperienceStep = ({ icon, title, description, side }) => (
  <div className={`relative flex ${side === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'} items-start`}>
    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white border-4 border-amber-50 shadow-sm absolute left-0 md:left-1/2 md:-translate-x-8 z-10">
      <div className="text-amber-500">
        {icon}
      </div>
    </div>
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${side === 'left' ? 'ml-20 md:mr-20 md:ml-0' : 'ml-20 md:ml-20 md:mr-0'} md:w-5/12`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

// Component for resource cards
const ResourceCard = ({ icon, title, description, linkText }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center mb-4">
      <div className="p-2 rounded-lg bg-amber-50 text-amber-500 mr-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    </div>
    <p className="text-gray-600 mb-6">{description}</p>
    <a href="#" className="inline-flex items-center text-amber-600 font-medium">
      {linkText} <ChevronRight className="w-4 h-4 ml-1" />
    </a>
  </div>
);

export default AboutPage;