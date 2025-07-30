import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Select from 'react-select';
import axios from 'axios';
import { BusinessDomainAPI } from '@/api/business-domain';
import { UserAPI } from '@/api/user';
import { DataProductsAPI } from '@/api/data-products';
import toastr from 'toastr';


interface BusinessDomain {
    value: string;
    name: string;
}

interface Owner {
    value: string;
    name: string;
}

interface NewDataProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    reload :() =>void;
}

interface FormData {
    name: string;
    description: string;
    type: string;
    businessDomain: string;
    owners: string[];
}

const NewDataProductModal: React.FC<NewDataProductModalProps> = ({ isOpen, onClose, reload }) => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        description: '',
        type: '',
        businessDomain: '',
        owners: []
    });
    const [businessDomains, setBusinessDomains] = useState<BusinessDomain[]>([]);
    const [owners, setOwners] = useState<Owner[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            fetchInitialData();
        }
    }, [isOpen]);

    const fetchInitialData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch business domains and owners in parallel
            const [domainsResponse, ownersResponse] = await Promise.all([
                axios.get<{ data: BusinessDomain[] }>(BusinessDomainAPI.getDropDown),
                axios.get<{ data: Owner[] }>(UserAPI.getDropDown) 
            ]);

            setBusinessDomains(domainsResponse.data.data);
            setOwners(ownersResponse.data.data);
        } catch (err) {
            setError('Failed to load required data. Please try again.');
            console.error('Error fetching initial data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Prepare the payload according to the API specification
            const payload = {
                name: formData.name,
                description: formData.description,
                type: formData.type,
                tags: "", // Add tags if needed, or remove if not required
                businessDomainId: formData.businessDomain,
                ownerIds: formData.owners
            };

            // Make the API call with proper headers
            const response = await axios.post(DataProductsAPI.add, payload, {
                headers: {
                    'accept': 'text/plain',
                    'Content-Type': 'application/json'
                }
            });

            reload();
            onClose();
                    toastr.success(`${formData.name} has been created successfully`, 'Success');
            
            // You might want to add a success message or refresh the parent component's data here
        } catch (err) {
            let errorMessage = 'Failed to create data product. Please try again.';

            if (axios.isAxiosError(err)) {
                // Handle Axios-specific errors
                if (err.response) {
                    errorMessage = err.response.data || errorMessage;
                } else if (err.request) {
                    errorMessage = 'No response received from server. Please check your connection.';
                }
            }

            setError(errorMessage);
            console.error('Error submitting form:', err);
        }
    };

    if (!isOpen) return null;

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
                    <div className="text-red-500 mb-4">{error}</div>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 rounded-md text-gray-700"
                    >
                        Close
                    </button>
                    <button
                        onClick={fetchInitialData}
                        className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-md"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">New Data Product</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <ReactQuill
                                    theme="snow"
                                    value={formData.description}
                                    onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
                                    className="border border-gray-300 rounded-md"
                                />
                            </div>

                            <div>
                                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                                    Type *
                                </label>
                                <select
                                    id="type"
                                    name="type"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select a type</option>
                                    <option value="Datasets">Datasets</option>
                                    <option value="Dashboard/Report">Dashboard/Report</option>
                                    <option value="Operational">Operational</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="businessDomain" className="block text-sm font-medium text-gray-700 mb-1">
                                    Business Domain *
                                </label>
                                <Select
                                    id="businessDomain"
                                    required
                                    options={businessDomains.map(domain => ({
                                        value: domain.value,
                                        label: domain.name
                                    }))}
                                    value={businessDomains.find(d => d.value === formData.businessDomain) ? {
                                        value: formData.businessDomain,
                                        label: businessDomains.find(d => d.value === formData.businessDomain)?.name || ''
                                    } : null}
                                    onChange={(selectedOption) => {
                                        setFormData(prev => ({
                                            ...prev,
                                            businessDomain: selectedOption?.value || ''
                                        }));
                                    }}
                                    className="basic-select"
                                    classNamePrefix="select"
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            borderColor: '#d1d5db',
                                            minHeight: '42px',
                                            '&:hover': { borderColor: '#d1d5db' },
                                            '&:focus-within': {
                                                borderColor: '#6366f1',
                                                boxShadow: '0 0 0 1px #6366f1'
                                            }
                                        })
                                    }}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Owners *
                                </label>
                                <Select
                                    isMulti
                                    required
                                    options={owners.map(owner => ({
                                        value: owner.value,
                                        label: `${owner.name}`
                                    }))}
                                    value={formData.owners.map(ownerId => {
                                        const owner = owners.find(o => o.value === ownerId);
                                        return owner ? { value: owner.value, label: `${owner.name}` } : null;
                                    }).filter(Boolean)}
                                    onChange={(selectedOptions) => {
                                        setFormData(prev => ({
                                            ...prev,
                                            owners: selectedOptions.map(option => option.value)
                                        }));
                                    }}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            borderColor: '#d1d5db',
                                            minHeight: '42px',
                                            '&:hover': { borderColor: '#d1d5db' },
                                            '&:focus-within': {
                                                borderColor: '#6366f1',
                                                boxShadow: '0 0 0 1px #6366f1'
                                            }
                                        }),
                                        multiValue: (base) => ({
                                            ...base,
                                            backgroundColor: '#e0e7ff'
                                        }),
                                        multiValueLabel: (base) => ({
                                            ...base,
                                            color: '#4f46e5'
                                        }),
                                        multiValueRemove: (base) => ({
                                            ...base,
                                            color: '#4f46e5',
                                            ':hover': {
                                                backgroundColor: '#4f46e5',
                                                color: 'white'
                                            }
                                        })
                                    }}
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewDataProductModal;