import { useState, useRef, useEffect } from "react";

const MultiSelectDropdown = ({ entityId, selectedUsers = [], onSelectionChange, teamMembers }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleUser = (user) => {
        const isSelected = selectedUsers.find(u => u.id === user.id);
        let newSelection;

        if (isSelected) {
            newSelection = selectedUsers.filter(u => u.id !== user.id);
        } else {
            newSelection = [...selectedUsers, user];
        }

        onSelectionChange(entityId, newSelection);
    };

    const removeUser = (userId) => {
        const newSelection = selectedUsers.filter(u => u.id !== userId);
        onSelectionChange(entityId, newSelection);
    };

    // 🔹 Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <div
                className="min-h-12 w-full p-3 border border-gray-300 rounded-lg bg-white cursor-pointer hover:border-gray-400 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedUsers.length === 0 ? (
                    <div className="text-gray-500 text-sm flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        Select users to assign...
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-2">
                        {selectedUsers.map(user => (
                            <div key={user.id} className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs ${user.color}`}>
                                <span className="font-medium">{user.name}</span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeUser(user.id);
                                    }}
                                    className="ml-1 hover:bg-white hover:bg-opacity-30 rounded-full p-0.5"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {teamMembers?.map(user => {
                        const isSelected = selectedUsers.find(u => u.id === user.id);
                        return (
                            <div
                                key={user.id}
                                className={`p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 ${isSelected ? 'bg-blue-50' : ''}`}
                                onClick={() => toggleUser(user)}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-sm text-gray-900">{user.name}</span>
                                            {isSelected && (
                                                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            )}
                                        </div>
                                        <div className="text-xs text-gray-600">{user.role}</div>
                                        <div className="text-xs text-gray-500">{user.email}</div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MultiSelectDropdown;
