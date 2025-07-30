import { useEffect, useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
    FiSearch,
    FiPlus,
    FiEdit2,
    FiTrash2,
    FiArchive,
    FiShield,
    FiChevronRight,
    FiBarChart2,
    FiBook,
    FiDatabase,
    FiHome,
    FiChevronDown,
    FiTable,
    FiUsers,
    FiEdit3,
    FiUpload,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { dataOwners, dataStewards } from '@/mock-data/domains';
import DataProductsPage from './Dataproduct';
import DataCatalog from '../data-catalog';
import AccessManagementSidebar from './AccessManagementSidebar';
import Loader from '@/components/ui/loader';
import { mockCollections, roleColors, roleDisplayNames } from '@/ts/types/business-domain-roles';
import { ErrorBar } from 'recharts';
import ErrorCard from '@/components/ui/error';
import AddBusinessDomainModal from './AddBusinessDomainModal';
import axios from 'axios';
import toastr from 'toastr';
import { BusinessDomainAPI } from '@/api/business-domain';

const GovernanceDomainsDashboard = () => {
    const [selectedDomain, setSelectedDomain] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDataProducts, setShowDataProducts] = useState(false);
    const [showCollections, setShowCollections] = useState(false);
    const [searchCollection, setSearchCollection] = useState("");
    const [filteredCollections, setfilteredCollections] = useState(mockCollections);
    const [domains, setDomains] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showAccessSidebar, setShowAccessSidebar] = useState(false);
    const [roleData, setRoleData] = useState<Record<string, any[]>>({});
    const [showAddDomainModal, setShowAddDomainModal] = useState(false);
    const [activeCollection, setActiveCollection] = useState(null);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [editedDescription, setEditedDescription] = useState('');
    const quillRef = useRef<ReactQuill>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchDomains = async () => {
            try {
                const response = await axios.get(BusinessDomainAPI.getAll);
                const data = response.data;

                setDomains(data.data);
                if (data.data.length > 0) {
                    setSelectedDomain(data.data[0]);
                }
            } catch (err) {
                const errorMessage = axios.isAxiosError(err)
                    ? err.response?.data?.message || err.message
                    : 'An unexpected error occurred';
                setError(errorMessage);
                console.error('Error fetching domains:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDomains();
    }, []);

    useEffect(() => {
        if (selectedDomain) {
            setEditedDescription(selectedDomain.description || '');
        }
    }, [selectedDomain]);

useEffect(() => {
    if (showAccessSidebar) {
        setShowAccessSidebar(false);
    }
}, [selectedDomain?.id]);


    useEffect(() => {
        const coll = mockCollections.filter(collection =>
            collection.name.toLowerCase().includes(searchCollection.toLowerCase())
        );
        setfilteredCollections(coll);
    }, [searchCollection]);

    useEffect(() => {
        if (selectedDomain && selectedDomain.id) {
            const fetchRoleData = async () => {
                try {
                    setLoading(true);
                    const response = await fetch(
                        `${BusinessDomainAPI.getPermissions}businessDomainId=${selectedDomain.id}`,
                        {
                            headers: {
                                'accept': 'text/plain'
                            }
                        }
                    );

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data = await response.json();

                    if (data.succeeded) {
                        setRoleData(data.data);
                    } else {
                        setError(data.messages.join(', '));
                    }
                } catch (err) {
                    setError(err instanceof Error ? err.message : 'An unknown error occurred');
                } finally {
                    setLoading(false);
                }
            };

            fetchRoleData();
        }
    }, [selectedDomain?.id]);

    const getUsersByRole = (roleData: any) => {
        const roleColorMap = {
            'Domain Owner': { bg: 'bg-indigo-100', text: 'text-indigo-800' },
            'Domain Steward': { bg: 'bg-purple-100', text: 'text-purple-800' },
            'Domain Reader': { bg: 'bg-blue-100', text: 'text-blue-800' },
            'Data Product Owner': { bg: 'bg-green-100', text: 'text-green-800' },
            'Data Catalog Reader': { bg: 'bg-gray-100', text: 'text-gray-800' }
        };

        return Object.entries(roleData).flatMap(([roleName, users]) => {
            const color = roleColorMap[roleName as keyof typeof roleColorMap] || roleColorMap['Domain Owner'];
            return (users as any[]).map(user => ({
                ...user,
                initials: `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`,
                ...color
            }));
        });
    };

    const filteredDomains = domains.filter(domain =>
        domain.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddDomain = async (formData: any) => {
        try {
            const response = await axios.post(BusinessDomainAPI.add, formData);

            if (response.status !== 200 && response.status !== 201) {
                throw new Error('Failed to create domain');
            }

            toastr.success('Domain created successfully!', 'Success');
            
            const fetchResponse = await axios.get(BusinessDomainAPI.getAll);
            setDomains(fetchResponse.data.data);
        } catch (error) {
            console.error('Error creating domain:', error);
            toastr.error('Failed to create domain. Please try again.', 'Error');
        }
    };

    const handleEditDescription = () => {
        setIsEditingDescription(true);
    };

    const handleSaveDescription = async () => {
        try {
            const response = await axios.put(`${BusinessDomainAPI.publish}${selectedDomain.id}`, {
                ...selectedDomain,
                description: editedDescription
            });

            if (response.data.succeeded) {
                setSelectedDomain({
                    ...selectedDomain,
                    description: editedDescription
                });
                setDomains(domains.map(domain => 
                    domain.id === selectedDomain.id 
                        ? {...domain, description: editedDescription} 
                        : domain
                ));
                toastr.success('Description updated successfully!', 'Success');
            } else {
                throw new Error(response.data.messages.join(', '));
            }
        } catch (error) {
            console.error('Error updating description:', error);
            toastr.error('Failed to update description. Please try again.', 'Error');
        } finally {
            setIsEditingDescription(false);
        }
    };

    const handlePublishDomain = async () => {
        try {
            const response = await axios.post(`${BusinessDomainAPI.publish}?businessDomainId=${selectedDomain.id}`, {});

            if (response.data.succeeded) {
                setSelectedDomain({
                    ...selectedDomain,
                    status: 'Published'
                });
                setDomains(domains.map(domain => 
                    domain.id === selectedDomain.id 
                        ? {...domain, status: 'Published'} 
                        : domain
                ));
                toastr.success('Domain published successfully!', 'Success');
            } else {
                throw new Error(response.data.messages.join(', '));
            }
        } catch (error) {
            console.error('Error publishing domain:', error);
            toastr.error('Failed to publish domain. Please try again.', 'Error');
        }
    };

    if (loading) 
        return <Loader />;

    if (error) 
        return <ErrorCard title='Error loading domains' onClose={() => window.location.reload()} error={error}/>;

    return (
        <div className="min-h-screen bg-gray-50 w-full">
            <main className="w-full px-6 py-6">
                <nav className="flex mb-6" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-2">
                        <li>
                            <div className="flex items-center">
                                <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-700 flex items-center">
                                    <FiHome className="mr-1" /> Home
                                </a>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <FiChevronRight className="h-5 w-5 text-gray-400" />
                                <a href="#" className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700">Governance</a>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <FiChevronRight className="h-5 w-5 text-gray-400" />
                                <span className="ml-2 text-sm font-medium text-indigo-600">Domains</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                <div className="mb-8">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                            <h2 className="text-3xl font-bold text-gray-900">Governance Domains</h2> {"|"}
                            <p className="text-gray-600">
                                Organize data products into meaningful groups and link them to business concepts.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center space-x-2 w-full md:w-1/3">
                        <div className="relative w-1/3">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiSearch className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Filter by keyword"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select
                            className="w-1/3 py-2 pl-3 pr-10 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={''}
                            onChange={(e) => {}}
                        >
                            <option value="">All Types</option>
                            <option value="type1">Master Data Domain</option>
                            <option value="type2">Reference Data Domain</option>
                            <option value="type3">Transactional Data Domain</option>
                        </select>
                    </div>
                    <div className="flex items-center space-x-4 w-full md:w-auto">
                        <span className="text-sm text-gray-500 whitespace-nowrap">{filteredDomains.length} governance domains</span>
                        <button
                            onClick={() => setShowAddDomainModal(true)}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <FiPlus className="mr-2" /> Add Domain
                        </button>
                        <div className="relative w-full md:w-auto">
                            <select className="appearance-none border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full">
                                <option>All owners</option>
                                <option>My domains</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <FiChevronDown className="h-4 w-4 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col xl:flex-row gap-6 w-full">
                    <div className="xl:w-1/4 w-full">
                        <div className="bg-white shadow rounded-lg overflow-hidden w-full">
                            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                                <h3 className="text-lg font-medium text-gray-900">All Domains</h3>
                            </div>
                            <ul className="divide-y divide-gray-200">
                                {filteredDomains.map((domain) => (
                                    <li key={domain.id}>
                                        <button
                                            onClick={() => {setSelectedDomain(domain)}}
                                            className={`w-full px-4 py-4 text-left hover:bg-gray-50 ${selectedDomain?.name === domain.name ? 'bg-indigo-50' : ''}`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="min-w-0">
                                                    <h4 className="text-sm font-medium text-gray-900 truncate">{domain.name}</h4>
                                                    <p className="text-sm text-gray-500 mt-1 truncate">{domain.type}</p>
                                                </div>
                                                <div className="flex items-center space-x-2 ml-2">
                                                    <span className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${domain.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                        {domain.status}
                                                    </span>
                                                    <FiChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
                                                </div>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="xl:w-3/4 w-full">
                        {selectedDomain && (
                            <div className="bg-white shadow rounded-lg overflow-hidden w-full">
                                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-lg font-medium text-gray-900">
                                                {selectedDomain.name}
                                            </h3>
                                            <span
                                                className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${selectedDomain.status === 'Published'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                    }`}
                                            >
                                                {selectedDomain.status}
                                            </span>
                                        </div>

                                        {selectedDomain?.status === 'Draft' && (
                                            <button
                                                onClick={handlePublishDomain}
                                                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded-md shadow-sm transition-colors duration-200"
                                            >
                                                <FiUpload className="w-3 h-3" />
                                                Publish
                                            </button>
                                        )}
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="relative group">
                                            <div className="flex -space-x-2">
                                                {getUsersByRole(roleData)
                                                    .slice(0, 6)
                                                    .map((user, index) => (
                                                        <div
                                                            key={`${user.userId}-${index}`}
                                                            className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${user.bg} ${user.text} font-medium border-2 border-white`}
                                                            title={`${user.firstName} ${user.lastName}`}
                                                        >
                                                            {user.initials}
                                                        </div>
                                                    ))}

                                                {Object.values(roleData).flat().length > 6 && (
                                                    <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 text-gray-600 font-medium border-2 border-white">
                                                        +{Object.values(roleData).flat().length - 6}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="hidden group-hover:block absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 p-4 border border-gray-200">
                                                <div className="space-y-3">
                                                    {Object.entries(roleData).map(([roleName, users]) => (
                                                        <div key={roleName}>
                                                            <h4 className="text-sm font-medium text-gray-500 mb-1">
                                                                {roleDisplayNames[roleName] || roleName}
                                                            </h4>
                                                            {users.length > 0 ? (
                                                                users.map((user) => (
                                                                    <div key={user.userId} className="flex items-center py-1">
                                                                        <div
                                                                            className={`inline-flex items-center justify-center h-6 w-6 rounded-full bg-${roleColors[roleName]}-100 text-${roleColors[roleName]}-800 font-medium text-xs mr-2`}
                                                                        >
                                                                            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                                                                        </div>
                                                                        <div>
                                                                            <span className="text-sm text-gray-700 block">
                                                                                {user.firstName} {user.lastName}
                                                                            </span>
                                                                            <span className="text-xs text-gray-500 block">
                                                                                {user.permissionLevel}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <div className="text-xs text-gray-400 py-1">
                                                                    No users assigned
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md">
                                            <FiUsers onClick={() => setShowAccessSidebar(true)} className="h-5 w-5" />
                                        </button>
                                        <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md">
                                            <FiEdit2 className="h-5 w-5" />
                                        </button>
                                        <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md">
                                            <FiArchive className="h-5 w-5" />
                                        </button>
                                        <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md">
                                            <FiTrash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="px-4 py-4 border-b border-gray-200">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        <div
                                            className="bg-gray-50 p-3 rounded-lg border border-transparent transition-all duration-200 hover:border-indigo-200 hover:shadow-md hover:bg-white cursor-pointer active:bg-indigo-50 active:border-indigo-300"
                                            onClick={() => navigate('/data-product')}
                                        >
                                            <div className="flex items-center">
                                                <div className="p-2 rounded-full bg-indigo-100 text-indigo-600 transition-all duration-200 group-hover:bg-indigo-200">
                                                    <FiDatabase className="h-5 w-5" />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-500 group-hover:text-indigo-600 transition-colors duration-200">
                                                        Data Products
                                                    </p>
                                                    <p className="text-xl font-semibold text-gray-900 group-hover:text-indigo-800 transition-colors duration-200">
                                                        34
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <div className="flex items-center">
                                                <div className="p-2 rounded-full bg-purple-100 text-purple-600">
                                                    <FiBook className="h-5 w-5" />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-500">Glossary Terms</p>
                                                    <p className="text-xl font-semibold text-gray-900">6</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <div className="flex items-center">
                                                <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                                                    <FiShield className="h-5 w-5" />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-500">Collections</p>
                                                    <p className="text-xl font-semibold text-gray-900">5</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <div className="flex items-center">
                                                <div className="p-2 rounded-full bg-green-100 text-green-600">
                                                    <FiBarChart2 className="h-5 w-5" />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-500">Data Quality</p>
                                                    <p className="text-xl font-semibold text-gray-900">85%</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-4 py-4 border-b border-gray-200">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="text-sm font-medium text-gray-900">Description</h4>
                                        {!isEditingDescription && (
                                            <button 
                                                onClick={handleEditDescription}
                                                className="text-sm text-indigo-600 hover:text-indigo-800"
                                            >
                                                <FiEdit3 className="inline mr-1" /> Edit
                                            </button>
                                        )}
                                    </div>
                                    
                                    {isEditingDescription ? (
                                        <div className="mb-4">
                                            <ReactQuill
                                                ref={quillRef}
                                                theme="snow"
                                                value={editedDescription}
                                                onChange={setEditedDescription}
                                                modules={{
                                                    toolbar: [
                                                        [{ 'header': [1, 2, false] }],
                                                        ['bold', 'italic', 'underline', 'strike'],
                                                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                                        ['link', 'clean']
                                                    ]
                                                }}
                                                className="bg-white rounded-lg"
                                            />
                                            <div className="mt-2 flex justify-end space-x-2">
                                                <button
                                                    onClick={() => setIsEditingDescription(false)}
                                                    className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={handleSaveDescription}
                                                    className="px-3 py-1 text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div 
                                            className="text-sm text-gray-600 quill-content" 
                                            dangerouslySetInnerHTML={{ __html: selectedDomain?.description || 'No description available' }}
                                        />
                                    )}
                                    
                                   

                                    <div className="mt-4">
                                        <h4 className="text-sm font-medium text-gray-900 mb-2">Characteristics</h4>
                                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                            <li>Mostly Reference Data</li>
                                            <li>Preferred Terms Only Glossary</li>
                                            <li>Some highly curated and shared Critical Data Elements as Master Data Products</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="px-4 py-4">
                                    <h4 className="text-sm font-medium text-gray-900 mb-3">Quick Actions</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        <button
                                            className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                                            onClick={() => { setShowCollections(false); setShowDataProducts(!showDataProducts) }}
                                        >
                                            <FiDatabase className="mr-2" />
                                            {showDataProducts ? 'Hide Data Products' : 'View Data Products'}
                                        </button>
                                        <button className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200"
                                            onClick={() => { setShowDataProducts(false); setShowCollections(!showCollections) }}
                                        >
                                            <FiTable className="mr-2" />{showCollections ? 'Hide Collections' : 'View Collections'}
                                        </button>
                                        <button className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200">
                                            <FiShield className="mr-2" /> Manage Policies
                                        </button>
                                    </div>
                                    {showDataProducts && (<div className="mt-4"><DataProductsPage /></div>)}
                                    {showCollections && (
                                        <div className="flex h-full border-t border-gray-200 mt-4">
                                            <div className="w-64 border-r border-gray-200 bg-gray-50 p-4 overflow-y-auto">
                                                <div className="mb-4">
                                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Collections</h3>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            placeholder="Search collections..."
                                                            onChange={(e) => setSearchCollection(e.target.value)}
                                                            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                        />
                                                        <svg
                                                            className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                        </svg>
                                                    </div>
                                                </div>

                                                <nav className="space-y-1">
                                                    {filteredCollections.map((collection) => (
                                                        <button
                                                            key={collection.id}
                                                            onClick={() => setActiveCollection(collection.id)}
                                                            className={`w-full text-left px-3 py-2 rounded-lg flex items-center transition-colors ${activeCollection === collection.id
                                                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                                                : 'hover:bg-gray-100 text-gray-700'
                                                                }`}
                                                        >
                                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                                                                {collection?.icon || (
                                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                                                                    </svg>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-medium">{collection.name}</p>
                                                                <p className="text-xs text-gray-500">{collection.itemCount} items</p>
                                                            </div>
                                                        </button>
                                                    ))}

                                                    <button className="w-full text-left px-3 py-2 rounded-lg flex items-center text-blue-600 hover:bg-blue-50 mt-4">
                                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                                        </svg>
                                                        New Collection
                                                    </button>
                                                </nav>
                                            </div>

                                            <div className="flex-1 p-6 overflow-y-auto bg-white">
                                                {activeCollection ? (
                                                    <div className="w-full">
                                                        <DataCatalog />
                                                    </div>
                                                ) : (
                                                    <div className="h-full flex flex-col items-center justify-center text-center py-12">
                                                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                                            <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                                                            </svg>
                                                        </div>
                                                        <h3 className="text-lg font-medium text-gray-900 mb-1">Select a collection</h3>
                                                        <p className="text-gray-500 max-w-md">
                                                            Choose a collection from the sidebar to view and manage its data assets
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
                {showAccessSidebar && <AccessManagementSidebar businessDomainId={selectedDomain?.id} onClose={() => setShowAccessSidebar(false)}  key={selectedDomain?.id} />}

                <AddBusinessDomainModal
                    isOpen={showAddDomainModal}
                    onClose={() => setShowAddDomainModal(false)}
                    onSave={handleAddDomain}
                />
            </main>
        </div>
    );
};

export default GovernanceDomainsDashboard;