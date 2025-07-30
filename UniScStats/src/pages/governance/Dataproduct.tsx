import { useState, useEffect } from 'react';
import {
    FiGrid, FiList, FiRefreshCw, FiPlus, FiChevronDown,
    FiSearch, FiDatabase
} from 'react-icons/fi';
import PurviewDataProductModal from './DataProductDetails';
import { useNavigate } from 'react-router-dom';
import NewDataProductModal from './NewDataProductModal';
import 'react-quill/dist/quill.snow.css';
import { BusinessDomainAPI } from '@/api/business-domain';
import { DataProductsAPI } from '@/api/data-products';


interface DataProduct {
    id: string;
    name: string;
    description: string;
    status: string;
    businessDomainName: string;
    type: string;
}

interface ApiResponse {
    data: DataProduct[];
    messages: string[];
    succeeded: boolean;
    messageType: string;
}

interface BusinessDomain {
    value: string;
    name: string;
}

interface BusinessDomainsResponse {
    data: BusinessDomain[];
    messages: string[];
    succeeded: boolean;
    messageType: string;
}

const DataProductsPage = () => {
    const [viewMode, setViewMode] = useState<'table' | 'card'>('card');
    const [selectedProduct, setSelectedProduct] = useState<DataProduct | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataProducts, setDataProducts] = useState<DataProduct[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<DataProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchText, setSearchText] = useState('');
    const [selectedDomain, setSelectedDomain] = useState<string>('');
    const [businessDomains, setBusinessDomains] = useState<BusinessDomain[]>([]);
    const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState('');



    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch business domains first
                const domainsResponse = await fetch(BusinessDomainAPI.getDropDown);
                if (!domainsResponse.ok) {
                    throw new Error(`HTTP error! status: ${domainsResponse.status}`);
                }
                const domainsData: BusinessDomainsResponse = await domainsResponse.json();

                if (domainsData.succeeded) {
                    setBusinessDomains(domainsData.data);
                } else {
                    setError(domainsData.messages.join(', '));
                }

                // Then fetch data products
                const productsResponse = await fetch(DataProductsAPI.getAll);
                if (!productsResponse.ok) {
                    throw new Error(`HTTP error! status: ${productsResponse.status}`);
                }
                const productsData: ApiResponse = await productsResponse.json();

                if (productsData.succeeded) {
                    setDataProducts(productsData.data);
                    setFilteredProducts(productsData.data);
                } else {
                    setError(productsData.messages.join(', '));
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
      
        const hasFilters = searchText || selectedDomain || statusFilter;
        hasFilters ? filterProducts() : setFilteredProducts(dataProducts);

    }, [searchText, selectedDomain, statusFilter, dataProducts]);

    const filterProducts = async () => {
            try {
                // Build query parameters
                const params = new URLSearchParams();

                if (searchText) params.append('searchText', searchText);
                if (selectedDomain) params.append('businessDomainId', selectedDomain);
                if (statusFilter) params.append('status', statusFilter);

                const url = `${DataProductsAPI.getAll}?${params.toString()}`;
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data: ApiResponse = await response.json();

                if (data.succeeded) {
                    setFilteredProducts(data.data);
                    setError(null);
                } else {
                    throw new Error(data.messages.join(', '));
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
                setFilteredProducts([]);
            }
        };


    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`;
    };

    const handleProductClick = (product: DataProduct) => {
        navigate(`/data-product-details/${product.id}`);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const handleDomainChange = (domainId: string) => {
        setSelectedDomain(domainId);
    };

    // Static owner data (temporary)
    const staticOwners = [
        { id: 1, firstName: 'John', lastName: 'Doe' },
        { id: 2, firstName: 'Jane', lastName: 'Smith' },
        { id: 3, firstName: 'Robert', lastName: 'Johnson' }
    ];

    // Static last updated date (temporary)
    const staticLastUpdated = new Date('2023-06-15');

    if (loading) return <div className="min-h-screen bg-[#F9FAFB] p-6">Loading...</div>;
    if (error) return <div className="min-h-screen bg-[#F9FAFB] p-6">Error: {error}</div>;

    return (
        <div className="min-h-screen bg-[#F9FAFB] p-6">
            {/* Modal for product details */}
            {isModalOpen && selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="w-full max-w-6xl max-h-[85vh] relative">
                        <button
                            onClick={closeModal}
                            className="absolute -bottom-12 right-0 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                            aria-label="Close modal"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <PurviewDataProductModal onClose={closeModal} />
                    </div>
                </div>
            )}

            {/* Header section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Data Products</h1>
                    <p className="text-gray-600 mt-1">
                        Manage groups of data assets packaged together for specific use cases.
                    </p>
                </div>
                <div className="flex space-x-3">
                    <button className="flex items-center px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm text-sm"
                        onClick={() => setIsNewProductModalOpen(true)}>
                        <FiPlus className="mr-1.5" size={14} />
                        New data product
                    </button>
                    <button
                        className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => {
                            setSearchText('');
                            setSelectedDomain('');
                        }}
                    >
                        <FiRefreshCw className="mr-2" />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Filters and search */}
            <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div className="flex flex-wrap gap-2">
                    <div className="relative">
                        <select
                            value={selectedDomain}
                            onChange={(e) => handleDomainChange(e.target.value)}
                            className="appearance-none flex items-center px-3 py-1.5 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 text-sm transition-colors shadow-sm pr-8"
                        >
                            <option value="">Domain: All</option>
                            {businessDomains.map((domain) => (
                                <option key={domain.value} value={domain.value}>
                                    {domain.name}
                                </option>
                            ))}
                        </select>
                        <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Status Dropdown */}
                    <div className="relative">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="appearance-none flex items-center px-3 py-1.5 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 text-sm transition-colors shadow-sm pr-8"
                        >
                            <option value="">Status: All</option>
                            <option value="Draft">Draft</option>
                            <option value="Published">Published</option>
                        </select>
                        <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Other filters */}
                    {[
                        { label: 'Owner: All', icon: <FiChevronDown /> },
                        { label: 'Type: All', icon: <FiChevronDown /> }
                    ].map((filter, i) => (
                        <button
                            key={i}
                            className="flex items-center px-3 py-1.5 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 text-sm transition-colors shadow-sm"
                        >
                            {filter.label}
                            {filter.icon}
                        </button>
                    ))}
                </div>

                <div className="flex items-center space-x-3">
                    <div className="relative w-64">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search data products..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                            value={searchText}
                            onChange={handleSearchChange}
                        />
                    </div>

                    <div className="flex border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                        <button
                            onClick={() => setViewMode('table')}
                            className={`p-2 ${viewMode === 'table' ? 'bg-gray-100 text-indigo-600' : 'bg-white text-gray-500 hover:bg-gray-50'} transition-colors`}
                            title="Table view"
                        >
                            <FiList className="h-5 w-5" />
                        </button>
                        <button
                            onClick={() => setViewMode('card')}
                            className={`p-2 ${viewMode === 'card' ? 'bg-gray-100 text-indigo-600' : 'bg-white text-gray-500 hover:bg-gray-50'} transition-colors`}
                            title="Card view"
                        >
                            <FiGrid className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Data display */}
            {viewMode === 'table' ? (
                <div className="space-y-4">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => handleProductClick(product)}
                            className="bg-white rounded-lg border border-gray-200 hover:border-indigo-200 hover:shadow-md transition-all duration-200 cursor-pointer p-5"
                        >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                {/* Left side - Main info */}
                                <div className="flex items-start space-x-4 flex-1 min-w-0">
                                    <div className="flex-shrink-0 h-12 w-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                                        <FiDatabase className="h-5 w-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h3>
                                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                                {product.businessDomainName}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right side - Metadata */}
                                <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start md:items-end lg:items-center gap-4">
                                    {/* Owners */}
                                    <div className="flex items-center">
                                        <div className="flex -space-x-2">
                                            {staticOwners.slice(0, 3).map((owner, i) => (
                                                <div
                                                    key={i}
                                                    className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white text-indigo-600 font-medium border-2 border-indigo-100 shadow-sm"
                                                    title={`${owner.firstName} ${owner.lastName}`}
                                                >
                                                    {getInitials(owner.firstName, owner.lastName)}
                                                </div>
                                            ))}
                                            {staticOwners.length > 3 && (
                                                <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 text-gray-600 text-xs font-medium border-2 border-white">
                                                    +{staticOwners.length - 3}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Status and Quality */}
                                    <div className="flex items-center space-x-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${product.status === 'Published'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {product.status}
                                        </span>

                                        <div className="flex items-center space-x-2">
                                            <div className="w-20 bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="h-2 rounded-full bg-green-500"
                                                    style={{ width: '85%' }}
                                                ></div>
                                            </div>
                                            <span className="text-sm text-gray-600">85%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Footer */}
                    <div className="px-4 py-3 bg-gray-50 rounded-lg text-sm text-gray-500 text-center">
                        Showing {filteredProducts.length} of {filteredProducts.length} items
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => handleProductClick(product)}
                            className="bg-white rounded-lg border border-gray-200 hover:border-indigo-200 hover:shadow-sm transition-all duration-150 cursor-pointer"
                        >
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex-shrink-0 h-8 w-8 bg-indigo-50 rounded-md flex items-center justify-center text-indigo-600">
                                        <FiDatabase className="h-4 w-4" />
                                    </div>
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${product.status === 'Published'
                                        ? 'bg-green-50 text-green-700'
                                        : 'bg-yellow-50 text-yellow-700'
                                        }`}>
                                        {product.status}
                                    </span>
                                </div>

                                <h3 className="text-sm font-medium text-gray-900 truncate mb-1">
                                    {product.name}
                                </h3>

                                <div className="flex items-center text-xs text-gray-500 space-x-2 mb-2">
                                    <span className="truncate">
                                        {product.businessDomainName}
                                    </span>
                                    <span>•</span>
                                    <span className="truncate">{product.type ? product.type : 'N/A'}</span>
                                    <span>•</span>
                                    <span className="truncate">12 assets</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="flex -space-x-1">
                                        {staticOwners.slice(0, 3).map((owner, i) => (
                                            <div
                                                key={i}
                                                className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-white text-indigo-600 text-[10px] font-medium border border-indigo-100"
                                                title={`${owner.firstName} ${owner.lastName}`}
                                            >
                                                {getInitials(owner.firstName, owner.lastName)}
                                            </div>
                                        ))}
                                        {staticOwners.length > 3 && (
                                            <div className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-gray-50 text-gray-500 text-[10px] font-medium border border-gray-100">
                                                +{staticOwners.length - 3}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center space-x-1">
                                        <div className="w-10 bg-gray-100 rounded-full h-1">
                                            <div
                                                className="h-1 rounded-full bg-green-400"
                                                style={{ width: '85%' }}
                                            ></div>
                                        </div>
                                        <span className="text-[10px] text-gray-500">85%</span>
                                    </div>
                                </div>

                                <div className="mt-2 text-[10px] text-gray-400">
                                    Updated {staticLastUpdated.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </div>
                            </div>
                        </div>
                    ))}

                    <NewDataProductModal
                        isOpen={isNewProductModalOpen}
                        onClose={() => setIsNewProductModalOpen(false)}
                        reload={()=>filterProducts()}
                        businessDomains={businessDomains}
                        owners={staticOwners}
                    />
                </div>
            )}
        </div>
    );
};

export default DataProductsPage;