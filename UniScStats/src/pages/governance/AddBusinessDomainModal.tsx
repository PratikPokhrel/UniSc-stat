import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FiX, FiUpload, FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { BusinessDomainAPI } from '@/api/business-domain';

const DOMAIN_TYPES = [
    { value: 'master', label: 'Master Data Domain' },
    { value: 'reference', label: 'Reference Data Domain' },
    { value: 'transactional', label: 'Transactional Data Domain' },
    { value: 'analytical', label: 'Analytical Data Domain' },
];

const AddBusinessDomainModal = ({
    isOpen,
    onClose,
    onSave
}: {
    isOpen: boolean,
    onClose: () => void,
    onSave: (domain: any) => void
}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [parentDomain, setParentDomain] = useState('');
    const [parentDomainOptions, setParentDomainOptions] = useState([])


      useEffect(() => {
        const fetchParentDomains = async () => {
            try {
                const res = await fetch(BusinessDomainAPI.getDropDown);
                const json = await res.json();
                console.log(json.data)
                setParentDomainOptions(json.data);
            } catch (error) {
                console.error('Failed to load business domains:', error);
            }
        };

        fetchParentDomains();
    }, []);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const data = {
                name,
                description,
                type,
                parentDomainId: parentDomain || null // optional if you're including parent domain
            };

            await onSave(data); // Assumes onSave handles the POST logic
            setName('');
            setDescription('');
            setType('');
            setParentDomain('');
            onClose();
        } catch (error) {
            console.error('Error saving domain:', error);
        } finally {
            setIsSubmitting(false);
        }
    };


  

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[1000] overflow-y-auto">
                    {/* Background overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-[1001]"
                        aria-hidden="true"
                        onClick={onClose}
                    />

                    {/* Modal panel */}
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 z-[1002]">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-2xl w-full relative z-[1003]"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                        >
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-xl leading-6 font-semibold text-gray-900">
                                        Add New Business Domain
                                    </h3>
                                    <button
                                        onClick={onClose}
                                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                    >
                                        <FiX className="h-6 w-6" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                                    {/* Domain Name Field */}
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                            Domain Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                    </div>

                                    {/* Description Field */}
                                    <div>
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                            Description *
                                        </label>
                                        <ReactQuill
                                            value={description}
                                            onChange={setDescription}
                                            modules={{
                                                toolbar: [
                                                    ['bold', 'italic', 'underline'],
                                                    [{ list: 'ordered' }, { list: 'bullet' }],
                                                    ['link'],
                                                    ['clean']
                                                ]
                                            }}
                                            className="mt-1 bg-white rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                            theme="snow"
                                        />
                                    </div>

                                    {/* Domain Type Dropdown */}
                                    <div>
                                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                            Domain Type *
                                        </label>
                                        <div className="mt-1 relative">
                                            <select
                                                id="type"
                                                value={type}
                                                onChange={(e) => setType(e.target.value)}
                                                className="appearance-none block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                required
                                            >
                                                <option value="">Select a domain type</option>
                                                {DOMAIN_TYPES.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                <FiChevronDown className="h-5 w-5 text-gray-400" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Parent Domain Dropdown */}
                                    {/* Parent Domain Dropdown */}
                                    <div>
                                        <label htmlFor="parentDomain" className="block text-sm font-medium text-gray-700">
                                            Parent Domain (optional)
                                        </label>
                                        <div className="mt-1 relative">
                                            <select
                                                id="parentDomain"
                                                value={parentDomain}
                                                onChange={(e) => setParentDomain(e.target.value)}
                                                className="appearance-none block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            >
                                                <option value="">No parent</option>
                                                {parentDomainOptions.map((domain) => (
                                                    <option key={domain.value} value={domain.value}>
                                                        {domain.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                <FiChevronDown className="h-5 w-5 text-gray-400" />
                                            </div>
                                        </div>
                                    </div>


                                    {/* Actions */}
                                    <div className="pt-4 flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? 'Creating...' : 'Create Domain'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>

    );
};

export default AddBusinessDomainModal;