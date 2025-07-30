const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7000';


export  const UserAPI ={
    getDropDown: `${baseUrl}/api/Users/drop-down`,
}