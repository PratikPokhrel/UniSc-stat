const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7000';

export  const DataProductsAPI ={
    getAll: `${baseUrl}/api/data-products`,
    add: `${baseUrl}/api/data-products`,
    publish: `${baseUrl}/api/BusinessDomain/publish`,
    getPermissions  :`${baseUrl}/api/BusinessDomain/permission?`,
    getDropDown : `${baseUrl}/api/BusinessDomain/drop-down`
}
