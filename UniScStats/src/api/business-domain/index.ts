const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7000';

export  const BusinessDomainAPI ={
    getAll: `${baseUrl}/api/BusinessDomain`,
    add: `${baseUrl}/api/BusinessDomain`,
    publish: `${baseUrl}/api/BusinessDomain/publish`,
    getPermissions  :`${baseUrl}/api/BusinessDomain/permission?`,
    getDropDown : `${baseUrl}/api/BusinessDomain/drop-down`
}