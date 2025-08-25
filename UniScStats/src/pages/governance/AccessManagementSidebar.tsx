import { BusinessDomainAPI } from '@/api/business-domain';
import { UserAPI } from '@/api/user';
import ErrorCard from '@/components/ui/error';
import Loader from '@/components/ui/loader';
import UniSCButton from '@/components/ui/unisc-button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { 
  FiUsers, 
  FiShield, 
  FiDatabase, 
  FiBook,
  FiEye,
  FiX,
  FiChevronRight,
  FiPlus,
  FiTrash2
} from 'react-icons/fi';
import Select from 'react-select';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

// Configure Toastr
toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: true,
  progressBar: true,
  positionClass: 'toast-top-right',
  preventDuplicates: false,
  showDuration: 300,
  hideDuration: 1000,
  timeOut: 5000,
  extendedTimeOut: 1000,
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut'
};

// Role mapping configuration
const ROLE_MAPPING = {
  'Governance Domain Owners': 'Domain Owner',
  'Governance Domain Readers': 'Domain Reader',
  'Data Product Owners': 'Data Product Owner',
  'Data Stewards': 'Domain Steward',
  'Data Catalog Readers': 'Data Catalog Reader'
};

// Type definitions
type UserRoleDto = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  permissionLevel: string;
  assignmentDate: string;
};

type UserDropdownItem = {
  value: string;
  label: string;
  email : string;
};

type ApiResponse = {
  data: Record<string, UserRoleDto[]>;
  messages: string[];
  succeeded: boolean;
  messageType: string;
};

type RoleConfig = {
  title: string;
  icon: React.ReactNode;
  color: string;
  description: string;
};

const AccessManagementSidebar = ({ 
  onClose,
  businessDomainId 
}: { 
  onClose: () => void,
  businessDomainId: string 
}) => {
  const [roleData, setRoleData] = useState<Record<string, UserRoleDto[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<UserDropdownItem[]>([]);
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [isAssigning, setIsAssigning] = useState(false);
  const [viewAllRole, setViewAllRole] = useState<string | null>(null);

  // Role configuration
  const rolesConfig: Record<string, RoleConfig> = {
    'Governance Domain Owners': {
      title: 'Governance Domain Owners',
      icon: <FiShield className="h-5 w-5" />,
      color: 'indigo',
      description: 'Can create governance domain metadata and assign other governance domain permissions.'
    },
    'Governance Domain Readers': {
      title: 'Governance Domain Readers',
      icon: <FiEye className="h-5 w-5" />,
      color: 'blue',
      description: 'Governance Domain Readers can read metadata across all governance domains.'
    },
    'Data Product Owners': {
      title: 'Data Product Owners',
      icon: <FiDatabase className="h-5 w-5" />,
      color: 'purple',
      description: 'Can create and update data products within a governance domain.'
    },
    'Data Stewards': {
      title: 'Data Stewards',
      icon: <FiUsers className="h-5 w-5" />,
      color: 'green',
      description: 'Can create and update business concepts and policies within a governance domain.'
    },
    'Data Catalog Readers': {
      title: 'Data Catalog Readers',
      icon: <FiBook className="h-5 w-5" />,
      color: 'gray',
      description: 'Can view all published governance domains and business concepts within.'
    }
  };

  // Fetch role permissions data
  useEffect(() => {
    const fetchRoleData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${BusinessDomainAPI.getPermissions}businessDomainId=${businessDomainId}`,
          {
            headers: {
              'accept': 'text/plain'
            }
          }
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: ApiResponse = await response.json();
        
        if (data.succeeded) {
          const transformedData: Record<string, UserRoleDto[]> = {};
          
          Object.keys(ROLE_MAPPING).forEach(uiRole => {
            transformedData[uiRole] = [];
          });
          
          Object.entries(data.data).forEach(([apiRole, users]) => {
            const uiRole = Object.entries(ROLE_MAPPING).find(
              ([_, dbRole]) => dbRole === apiRole
            )?.[0];
            
            if (uiRole) {
              transformedData[uiRole] = users;
            }
          });
          
          setRoleData(transformedData);
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
  }, [businessDomainId]);

  // Fetch users dropdown data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${UserAPI.getDropDown}`,
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
        
        const mappedUsers = data.data.map((user: {value: string, name: string, email: string}) => ({
          value: user.value,
          label: user.name,
          email: user.email
        }));
        
        setUsers(mappedUsers);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users');
      }
    };

    fetchUsers();
  }, []);

  const handleUserSelection = async (roleName: string, selectedOption: any) => {
    if (!selectedOption) return;

    setIsAssigning(true);
    try {
      const dbRoleName = ROLE_MAPPING[roleName as keyof typeof ROLE_MAPPING];

      const response = await fetch(
        `${BusinessDomainAPI.getPermissions}domainId=${businessDomainId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'accept': 'text/plain'
          },
          body: JSON.stringify({
            domainId: businessDomainId,
            roleName: dbRoleName,
            userId: selectedOption.value,
            permissions: 5
          })
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.succeeded) {
        const selecteduser = users.find(e => e.value == selectedOption.value);
        toastr.success(`${selecteduser?.label} has been successfully assigned as a ${roleName}`, 'Success');
        // Refresh the role data
        const roleResponse = await fetch(`${BusinessDomainAPI.getPermissions}businessDomainId=${businessDomainId}`,{headers: {'accept': 'text/plain'}});
        const roleData = await roleResponse.json();

        if (roleData.succeeded) {
          const transformedData: Record<string, UserRoleDto[]> = {};

          Object.keys(ROLE_MAPPING).forEach(uiRole => {
            transformedData[uiRole] = [];
          });

          Object.entries(roleData.data).forEach(([apiRole, users]) => {
            const uiRole = Object.entries(ROLE_MAPPING).find(
              ([_, dbRole]) => dbRole === apiRole
            )?.[0];

            if (uiRole) {
              transformedData[uiRole] = users as UserRoleDto[];
            }
          });

          setRoleData(transformedData);
        }

        setActiveRole(null);
      } else {
        throw new Error(result.messages.join(', '));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to assign user');
    } finally {
      setIsAssigning(false);
    }
  };


const handleRemoveUser = async (roleName: string, userId: string) => {
  if (!confirm('Are you sure you want to remove this user?')) return;

  try {
    const dbRoleName = ROLE_MAPPING[roleName as keyof typeof ROLE_MAPPING];

    const deleteResponse = await axios.delete(
      `${BusinessDomainAPI.getPermissions}domainId=${businessDomainId}&userId=${userId}&roleName=${dbRoleName}`,
      {
        headers: {
          'accept': 'text/plain'
        }
      }
    );

    const result = deleteResponse.data;

    if (result.succeeded) {
      const removedUser = roleData[roleName]?.find(user => user.userId === userId);
      if (removedUser) {
        toastr.success(
          `${removedUser.firstName} ${removedUser.lastName} has been removed from ${roleName}`,
          'Success'
        );
      }

      // Refresh the role data
      const roleResponse = await axios.get(
        `${BusinessDomainAPI.getPermissions}businessDomainId=${businessDomainId}`,
        {
          headers: {
            'accept': 'text/plain'
          }
        }
      );

      const roleDataResponse = roleResponse.data;

      if (roleDataResponse.succeeded) {
        const transformedData: Record<string, UserRoleDto[]> = {};

        Object.keys(ROLE_MAPPING).forEach(uiRole => {
          transformedData[uiRole] = [];
        });

        Object.entries(roleDataResponse.data).forEach(([apiRole, users]) => {
          const uiRole = Object.entries(ROLE_MAPPING).find(
            ([_, dbRole]) => dbRole === apiRole
          )?.[0];

          if (uiRole) {
            transformedData[uiRole] = users as UserRoleDto[];
          }
        });

        setRoleData(transformedData);
      }
    } else {
      throw new Error(result.messages.join(', '));
    }
  } catch (err) {
    toastr.error(
      err instanceof Error ? err.message : 'Failed to remove user',
      'Error'
    );
  }
};

  const UserAvatar = ({ user, size = 'md', showDelete = false, roleName = '' }: { 
    user: UserRoleDto, 
    size?: 'sm' | 'md' | 'lg',
    showDelete?: boolean,
    roleName?: string
  }) => {
    const sizeClasses = {
      sm: 'h-6 w-6 text-xs',
      md: 'h-8 w-8 text-sm',
      lg: 'h-10 w-10 text-base'
    };
    
    const color = rolesConfig[
      Object.keys(ROLE_MAPPING).find(key => ROLE_MAPPING[key] === user.permissionLevel) || ''
    ]?.color || 'gray';
    
    const bgColor = `bg-${color}-100`;
    const textColor = `text-${color}-800`;
    
    return (
      <div className="relative group">
        <div 
          className={`inline-flex items-center justify-center rounded-full ${bgColor} ${textColor} ${sizeClasses[size]} font-medium border-2 border-white`}
          title={`${user.firstName} ${user.lastName} (${user.email})`}
        >
          {user.firstName.charAt(0)}{user.lastName.charAt(0)}
        </div>
        {showDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveUser(roleName, user.userId);
            }}
            className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <FiTrash2 className="h-3 w-3" />
          </button>
        )}
      </div>
    );
  };

  
  if (loading) return <Loader/>;
  
  if (error) return <ErrorCard error={error} title='Error loading permissions:' onClose={onClose}/>;

  return (
    <div className="fixed inset-y-0 right-0 w-1/3 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out translate-x-0">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800">Manage Access</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {Object.entries(rolesConfig).map(([roleName, config]) => {
            const assignedUsers = roleData[roleName] || [];
            
            return (
              <div key={roleName} className="mb-6">
                <div className="flex items-start mb-3">
                  <div className={`p-2 rounded-lg bg-${config.color}-100 text-${config.color}-600 mr-3`}>
                    {config.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-1">{roleName}</h3>
                        <p className="text-sm text-gray-600">{config.description}</p>
                      </div>
                      <button 
                        onClick={() => setActiveRole(activeRole === roleName ? null : roleName)}
                        className="flex items-center text-sm text-indigo-600 hover:text-indigo-800"
                      >
                        <FiPlus className="mr-1" /> Add 
                      </button>
                    </div>
                    
                    {/* User assignment dropdown */}
                    {activeRole === roleName && (
                      <div className="mt-3 mb-3">
                        <Select
                          options={users.map(user => ({
                            value: user.value, // or whatever unique identifier you use
                            label: `${user.label} (${user.email})` // Combine name and email
                          }))}
                          onChange={(selected) => handleUserSelection(roleName, selected)}
                          value={null}
                          className="basic-select"
                          classNamePrefix="select"
                          placeholder="Select a user..."
                          noOptionsMessage={() => "No users available"}
                          isLoading={users.length === 0 || isAssigning}
                          isClearable={false}
                          isSearchable
                        />

                        <UniSCButton
                          onClick={() => setActiveRole(null)}
                          className="mt-2 px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300"
                        >
                          Cancel
                        </UniSCButton>
                      </div>
                    )}
                    
                    {/* Assigned users */}
                    <div className="mt-2 flex items-center flex-wrap gap-2">
                      <div className="flex -space-x-2">
                        {assignedUsers.slice(0, 5).map((user) => (
                          <UserAvatar 
                            key={user.userId} 
                            user={user} 
                            size="lg"
                            showDelete={true}
                            roleName={roleName}
                          />
                        ))}
                        {assignedUsers.length > 5 && (
                          <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 text-gray-600 font-medium text-xs border-2 border-white">
                            +{assignedUsers.length - 5}
                          </div>
                        )}
                        {assignedUsers.length === 0 && (
                          <span className="text-sm text-gray-500">No users assigned</span>
                        )}
                      </div>
                      {assignedUsers.length > 0 && (

                        <UniSCButton icon={FiChevronRight} iconPosition='right'
                        rounded='md'
                          onClick={() => setViewAllRole(roleName)}
                          className="ml-2 text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
                        >
                          View all
                        </UniSCButton>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Users Modal */}
        {viewAllRole && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-1/3 max-h-[80vh] flex flex-col">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  {viewAllRole} - All Users ({roleData[viewAllRole]?.length || 0})
                </h3>
                <button 
                  onClick={() => setViewAllRole(null)}
                  className="p-1 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <ul className="divide-y divide-gray-200">
                  {roleData[viewAllRole]?.map((user) => (
                    <li key={user.userId} className="py-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <UserAvatar user={user} size="md" />
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveUser(viewAllRole, user.userId)}
                        className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50"
                        title="Remove user"
                      >
                        <FiTrash2 className="h-5 w-5" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
                <UniSCButton
                  onClick={onClose}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Close
                </UniSCButton>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
          <UniSCButton
            onClick={onClose}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Done
          </UniSCButton>
        </div>
      </div>
    </div>
  );
};

export default AccessManagementSidebar;