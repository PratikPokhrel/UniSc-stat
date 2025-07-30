// Map database role names to display names
export const roleDisplayNames: Record<string, string> = {
    'Domain Owner': 'Domain Owners',
    'Domain Reader': 'Domain Readers',
    'Data Product Owner': 'Data Product Owners',
    'Domain Steward': 'Data Stewards',
    'Data Catalog Reader': 'Data Catalog Readers'
};

// Role colors mapping
export const roleColors: Record<string, string> = {
    'Domain Owner': 'indigo',
    'Domain Reader': 'blue',
    'Data Product Owner': 'purple',
    'Domain Steward': 'green',
    'Data Catalog Reader': 'gray'
};

// Mock collections data
export const mockCollections = [
    { id: '1', name: 'BI Reports', itemCount: 67, icon: '' },
    { id: '2', name: 'Course Catalog', itemCount: 5 },
    { id: '3', name: 'Faculty Records', itemCount: 3 },
    { id: '4', name: 'Research Data', itemCount: 12 },
    { id: '5', name: 'Administration', itemCount: 6 },
];