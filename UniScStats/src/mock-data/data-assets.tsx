import { FiBarChart2, FiDatabase, FiFile, FiFileText, FiServer } from "react-icons/fi";

 export const dataAssets = [
  { 
    name: 'Student_Enrollment', 
    type: 'SQL Table', 
    source: 'Azure SQL Database',
    icon: <FiDatabase className="text-blue-500" size={16} />,
    size: '',
    frequency: ''
  },
  { 
    name: 'Course_Catalog', 
    type: 'Cosmos DB', 
    source: 'Azure Cosmos DB',
    icon: <FiServer className="text-purple-500" size={16} />
  },
  { 
    name: 'Student_Profiles', 
    type: 'JSON Files', 
    source: 'Blob Storage',
    icon: <FiFile className="text-green-500" size={16} />
  },
  { 
    name: 'Faculty_Data', 
    type: 'Delta Lake', 
    source: 'Azure Data Lake',
    icon: <FiDatabase className="text-cyan-500" size={16} />
  },
  { 
    name: 'Enrollment_Trends', 
    type: 'Power BI Dataset', 
    source: 'Power BI Service',
    icon: <FiBarChart2 className="text-orange-500" size={16} />
  },
  { 
    name: 'Student_Performance', 
    type: 'Parquet Files', 
    source: 'ADLS Gen2',
    icon: <FiFileText className="text-indigo-500" size={16} />
  }
];