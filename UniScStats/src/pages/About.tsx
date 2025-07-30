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
  ChevronRight,
  Database,
  Network,
  ShieldCheck,
  Bookmark,
  Award
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  return (
    <>
    <Header/>
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow-sm border border-blue-100 mb-6 animate-fade-in">
            <div className="relative">
              <Sun className="w-5 h-5 text-blue-500 mr-2" />
            </div>
            <span className="text-sm font-medium text-blue-700">UniSC Data Portal 3.0</span>
          </div>
         <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
  <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">UniSC Data Governance</span>
  <div className="text-md text-gray-500 mt-2">
    Powered by industry standards including CAUDIT HERM
  </div>
</h1>
          {/* HERM Badge */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center bg-white px-4 py-2 rounded-lg shadow-xs border border-blue-100">
              <Award className="w-5 h-5 text-blue-500 mr-2" />
              <span className="text-sm font-medium text-blue-700">Certified HERM Implementation</span>
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <ValueCard
            icon={<Database className="w-8 h-8" />}
            title="HERM-Compliant"
            description="Structured according to CAUDIT's relational model standards"
            color="blue"
            pulse
          />
          <ValueCard
            icon={<Network className="w-8 h-8" />}
            title="Integrated Data Fabric"
            description="Seamless entity relationships across all university domains"
            color="cyan"
            pulse
          />
          <ValueCard
            icon={<ShieldCheck className="w-8 h-8" />}
            title="Governance First"
            description="End-to-end data lifecycle management per HERM guidelines"
            color="blue"
            pulse
          />
        </div>

        {/* Experience Flow */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            The HERM Data Journey
          </h2>
          <div className="relative">
            {/* Animated timeline bar */}
            <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-200 to-cyan-200">
              <div className="absolute top-0 left-0 w-full h-0 bg-blue-400 animate-timeline-progress"></div>
            </div>
            
            <div className="space-y-16">
              <ExperienceStep
                icon={<Bookmark className="w-6 h-6" />}
                title="Standardized Metadata"
                description="All datasets tagged with HERM classification schemas for consistent discovery"
                side="left"
                color="blue"
              />
              <ExperienceStep
                icon={<Network className="w-6 h-6" />}
                title="Relational Mapping"
                description="Pre-defined entity relationships mirroring HERM core domains"
                side="right"
                color="cyan"
              />
              <ExperienceStep
                icon={<Shield className="w-6 h-6" />}
                title="Governance Controls"
                description="Automated policy enforcement aligned with HERM best practices"
                side="left"
                color="blue"
              />
              <ExperienceStep
                icon={<Share2 className="w-6 h-6" />}
                title="Interoperability"
                description="Ready for integration with other HERM-compliant systems"
                side="right"
                color="cyan"
              />
            </div>
          </div>
        </div>

        {/* Governance Highlight */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 mb-24 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-blue-100 opacity-30"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-cyan-100 opacity-20"></div>
          
          <div className="flex flex-col md:flex-row items-center relative z-10">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-10">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-600 mb-4">
                <Shield className="w-5 h-5 mr-2" />
                <span className="font-medium">HERM Governance Framework</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Institutional Data Integrity
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our implementation of CAUDIT's HERM ensures data quality across all university domains.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-600 mr-3">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700">HERM-compliant data modeling</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-600 mr-3">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700">Standardized entity relationships</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-600 mr-3">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700">Automated quality checks</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <div className="bg-gray-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-center mb-6">
                  <Users className="w-6 h-6 text-blue-500 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">HERM Data Domains</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-xs border border-blue-50 hover:border-blue-100 transition-colors">
                    <h4 className="font-medium text-gray-900 mb-2">Academic</h4>
                    <p className="text-sm text-gray-600">Courses, programs, learning</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-xs border border-blue-50 hover:border-blue-100 transition-colors">
                    <h4 className="font-medium text-gray-900 mb-2">Research</h4>
                    <p className="text-sm text-gray-600">Grants, outputs, impact</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-xs border border-blue-50 hover:border-blue-100 transition-colors">
                    <h4 className="font-medium text-gray-900 mb-2">People</h4>
                    <p className="text-sm text-gray-600">Staff, students, partners</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-xs border border-blue-50 hover:border-blue-100 transition-colors">
                    <h4 className="font-medium text-gray-900 mb-2">Finance</h4>
                    <p className="text-sm text-gray-600">Budget, expenditure, assets</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center bg-white rounded-2xl shadow-sm border border-gray-100 py-16 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-cyan-50 opacity-30"></div>
          <div className="relative z-10">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-blue-100 text-blue-600">
                <GraduationCap className="w-8 h-8" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Experience HERM-Powered Data Governance</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Join the growing community of data-informed decision makers at UniSC.
            </p>
            <button
              onClick={() => navigate("/navigate")}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-medium rounded-lg shadow-md transition-all transform hover:-translate-y-1"
            >
              Access HERM Portal
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

// Enhanced Value Card with pulse animation
const ValueCard = ({ icon, title, description, color, pulse = false }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    cyan: 'bg-cyan-50 text-cyan-600',
    amber: 'bg-amber-50 text-amber-600'
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center hover:shadow-md transition-all transform hover:-translate-y-1 relative overflow-hidden">
      {pulse && (
        <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-blue-400 opacity-10 animate-ping"></div>
      )}
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mx-auto mb-6 ${colorClasses[color]} transition-colors ${pulse ? 'animate-pulse-slow' : ''}`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

// Enhanced Experience Step with color coding
const ExperienceStep = ({ icon, title, description, side, color = "blue" }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600 border-blue-200',
    cyan: 'bg-cyan-100 text-cyan-600 border-cyan-200'
  };
  
  return (
    <div className={`relative flex ${side === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'} items-start`}>
      <div className={`flex items-center justify-center w-16 h-16 rounded-full bg-white border-4 ${colorClasses[color]} shadow-sm absolute left-0 md:left-1/2 md:-translate-x-8 z-10`}>
        {icon}
      </div>
      <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${side === 'left' ? 'ml-20 md:mr-20 md:ml-0' : 'ml-20 md:ml-20 md:mr-0'} md:w-5/12 hover:shadow-md transition-shadow`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default About;