import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { contacts } from '@/mock-data/contacts';
import { dataAssets } from '@/mock-data/data-assets';
import { 
  FiDatabase, FiFile, FiServer, FiEdit2, FiSend, FiTrash2, 
  FiPlus, FiUser, FiUsers, FiMail, FiPhone, FiX, FiBarChart2, 
  FiFileText, FiSearch 
} from 'react-icons/fi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface DataProduct {
  createdOn: string;
  updatedOn: string | null;
  id: string;
  name: string;
  description: string;
  type: string;
  status: string;
  businessDomainName: string;
}

interface ApiResponse {
  data: DataProduct;
  messages: string[];
  succeeded: boolean;
  messageType: string;
}

const UserAvatar = ({ firstName, lastName }) => {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  
  return (
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-medium text-sm">
      {initials}
    </div>
  );
};

const ContactCard = ({ firstName, lastName, role, email, phone ='' }) => {
  return (
    <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
      <UserAvatar firstName={firstName} lastName={lastName} />
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-gray-900 truncate">{firstName} {lastName}</h4>
        <p className="text-xs text-gray-500 mb-0.5">{role}</p>
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <FiMail className="mr-1.5 flex-shrink-0" size={12} />
          <span className="truncate">{email}</span>
        </div>
        {phone && (
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <FiPhone className="mr-1.5 flex-shrink-0" size={12} />
            <span>{phone}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const RichTextEditor = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'bullet' }],
      ['clean']
    ],
  };

  return (
    <div className="border border-gray-300 rounded-lg">
      <ReactQuill
        value={value}
        onChange={onChange}
        modules={modules}
        theme="snow"
        className="text-sm"
      />
    </div>
  );
};

const PurviewDataProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<DataProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [assignedAccess, setAssignedAccess] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form state for editable fields
  const [description, setDescription] = useState('');
  const [useCases, setUseCases] = useState(
    `<ul>
      <li>Predict enrollment numbers for upcoming semesters using historical trends and demographic data</li>
      <li>Identify at-risk programs with declining enrollment to inform strategic decisions</li>
      <li>Optimize class scheduling based on demand patterns and student preferences</li>
      <li>Analyze student retention rates across different programs and demographics</li>
      <li>Generate reports for accreditation bodies and government compliance</li>
    </ul>`
  );

  useEffect(() => {
    const fetchDataProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get<ApiResponse>(
          `https://localhost:7000/api/data-products/${id}`,
          {
            headers: {
              'accept': 'text/plain'
            }
          }
        );

        if (response.data.succeeded) {
          setProduct(response.data.data);
          setDescription(response.data.data.description || '');
        } else {
          setError(response.data.messages.join(', ') || 'Failed to load data product');
        }
      } catch (err) {
        setError('Failed to fetch data product. Please try again.');
        console.error('Error fetching data product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDataProduct();
    }
  }, [id]);

  // Mock search function (kept static as before)
  const handleSearch = (query) => {
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    const mockResults = [
      { id: 1, type: 'user', firstName: 'Andrei', lastName: 'Stoian', email: 'andrei@usc.edu.au' },
      { id: 2, type: 'user', firstName: 'Jane', lastName: 'Smith', email: 'jane@usc.edu.au' },
      { id: 3, type: 'department', name: 'Insights and Analytics Unit (IAU)', description: 'IAU team' },
      { id: 4, type: 'department', name: 'IT team', description: 'IT team' },
      { id: 5, type: 'user', firstName: 'Alex', lastName: 'Johnson', email: 'alex@example.com' },
      ...contacts.map(contact => ({ 
        ...contact, 
        type: 'user',
        id: `contact-${contact.firstName}-${contact.lastName}`
      }))
    ].filter(item => 
      (item.firstName && `${item.firstName} ${item.lastName}`.toLowerCase().includes(query.toLowerCase())) ||
      (item.lastName && item.lastName.toLowerCase().includes(query.toLowerCase())) ||
      (item.email && item.email.toLowerCase().includes(query.toLowerCase())) 
    );
    
    setSearchResults(mockResults);
    setShowSearchResults(true);
  };

  const handleAssignAccess = (item) => {
    if (!assignedAccess.some(assigned => assigned.id === item.id)) {
      setAssignedAccess([...assignedAccess, item]);
    }
    setSearchQuery('');
    setShowSearchResults(false);
  };

  const removeAssignedAccess = (id) => {
    setAssignedAccess(assignedAccess.filter(item => item.id !== id));
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-center p-4">
          {error}
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Data product not found</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      {/* Page Header - Full width */}
      <div className="sticky top-0 z-10 flex justify-between items-center p-4 border-b border-gray-200 bg-white w-full">
       <div className="flex items-center">
  <h1 className="text-2xl font-bold text-gray-900 mr-3">{product.name}</h1>
  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
    {product.businessDomainName}
  </span>
  <span className={`px-2.5 py-0.5 ${
    product.status === 'Published' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-yellow-100 text-yellow-800'
  } text-xs font-medium rounded-full`}>
    {product.status}
  </span>
</div>

        <div className="flex space-x-2">
          <button 
            className="flex items-center px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50"
            onClick={toggleEditMode}
          >
            <FiEdit2 className="mr-1.5" size={14} />
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          <button className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
            <FiSend className="mr-1.5" size={14} />
            Publish
          </button>
          <button className="flex items-center px-3 py-1.5 bg-white border border-red-200 text-red-600 rounded-lg text-sm hover:bg-red-50">
            <FiTrash2 className="mr-1.5" size={14} />
            Delete
          </button>
        </div>
      </div>

      {/* Main Content - Full width with proper spacing */}
      <div className="w-full px-8 py-6">
        {/* Full width grid container */}
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,3fr)_minmax(300px,1fr)] gap-8 w-full">
          {/* Left Column - Main Content (3/4 width) */}
          <div className="space-y-6">
            {/* Description Card */}
            <div className="border border-gray-200 rounded-lg p-6 w-full bg-white">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Description</h2>
              {isEditing ? (
                <RichTextEditor
                  value={description}
                  onChange={setDescription}
                />
              ) : (
                <div 
                  className="text-sm text-gray-700" 
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              )}
            </div>

            {/* Use Cases Card */}
            <div className="border border-gray-200 rounded-lg p-6 w-full bg-white">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Use cases</h2>
              {isEditing ? (
                <RichTextEditor
                  value={useCases}
                  onChange={setUseCases}
                />
              ) : (
                <div 
                  className="text-sm text-gray-700" 
                  dangerouslySetInnerHTML={{ __html: useCases }}
                />
              )}
            </div>

            {/* Data Assets Section (kept static as requested) */}
            <div className="border border-gray-200 rounded-lg p-6 w-full bg-white">
              <div className="flex justify-between items-center mb-4 w-full">
                <h2 className="text-lg font-semibold text-gray-800">Data assets ({dataAssets.length})</h2>
                <button className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                  <FiPlus className="mr-1.5" size={14} />
                  Add data source
                </button>
              </div>

              {/* Data assets grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
                {dataAssets.map((asset, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow w-full">
                    <div className="flex items-start w-full">
                      <div className="p-2 bg-gray-50 rounded-lg mr-3">
                        {asset.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">{asset.name}</h3>
                        <p className="text-xs text-gray-600">{asset.type}</p>
                        <p className="text-xs text-gray-500 mt-1 truncate">{asset.source}</p>
                        <div className="mt-2 flex justify-between items-center">
                          <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full">
                            {asset?.frequency}
                          </span>
                          <span className="text-xs text-gray-500">
                            {asset?.size}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Metadata (1/4 width) */}
          <div className="space-y-6">
            {/* Access Management Card (kept static as before) */}
            <div className="border border-gray-200 rounded-lg p-6 w-full bg-white">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Manage Access</h2>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {assignedAccess.map(item => (
                  <div key={item.id} className="flex items-center bg-gray-50 rounded-full px-3 py-1 text-sm">
                    {item.type === 'user' ? (
                      <>
                        <UserAvatar firstName={item.firstName} lastName={item.lastName} />
                        <span className="ml-2 mr-1">{item.firstName} {item.lastName}</span>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-600">
                          <FiUsers className="h-3 w-3" />
                        </div>
                        <span className="ml-2 mr-1">{item.name}</span>
                      </>
                    )}
                    <button 
                      onClick={() => removeAssignedAccess(item.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <FiX className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="relative w-full">
                <div className="flex items-center">
                  <FiSearch className="absolute left-3 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      handleSearch(e.target.value);
                    }}
                    onFocus={() => searchQuery && setShowSearchResults(true)}
                    onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                    placeholder="Search users or departments..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                {/* Search Results Dropdown */}
                {showSearchResults && searchResults.length > 0 && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {searchResults.map(item => (
                      <div
                        key={item.id}
                        onMouseDown={() => handleAssignAccess(item)}
                        className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        {item.type === 'user' ? (
                          <>
                            <UserAvatar firstName={item.firstName} lastName={item.lastName} />
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">{item.firstName} {item.lastName}</div>
                              <div className="text-xs text-gray-500">{item.email}</div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex-shrink-0 h-8 w-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                              <FiUsers className="h-4 w-4" />
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">{item.name}</div>
                              <div className="text-xs text-gray-500">{item.description}</div>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Properties Card */}
            <div className="border border-gray-200 rounded-lg p-6 w-full bg-white">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Properties</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-wider mb-1">Owner</p>
                  <div className="flex items-center">
                    <UserAvatar firstName="Insights" lastName="Analytics" />
                    <p className="text-sm font-medium text-gray-800 ml-2">Insights and Analytics Unit (IAU)</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-wider mb-1">Domain</p>
                  <p className="text-sm font-medium text-gray-800">{product.businessDomainName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-wider mb-1">Type</p>
                  <p className="text-sm font-medium text-gray-800">{product.type || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-wider mb-1">Created</p>
                  <p className="text-sm font-medium text-gray-800">
                    {new Date(product.createdOn).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-wider mb-1">Last updated</p>
                  <p className="text-sm font-medium text-gray-800">
                    {product.updatedOn 
                      ? new Date(product.updatedOn).toLocaleDateString() 
                      : 'Never'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-wider mb-1">Quality score</p>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mr-2">
                      <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                    <span className="text-xs font-medium text-gray-700">92%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contacts Card (kept static as requested) */}
            <div className="border border-gray-200 rounded-lg p-6 w-full bg-white">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Contacts ({contacts.length})</h2>
              <div className="space-y-3">
                {contacts.map((contact, index) => (
                  <ContactCard key={index} {...contact} />
                ))}
              </div>
            </div>

            {/* Tags Card (kept static as before) */}
            <div className="border border-gray-200 rounded-lg p-6 w-full bg-white">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Tags</h2>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">Education</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">Analytics</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">Enrollment</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">Student Data</span>
                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">Reporting</span>
                <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full font-medium">Dashboards</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurviewDataProductPage;