// const UserAvatar = ({ user, size = 'md' }: { user: UserRoleDto, size?: 'sm' | 'md' | 'lg' }) => {
//     const sizeClasses = {
//         sm: 'h-6 w-6 text-xs',
//         md: 'h-8 w-8 text-sm',
//         lg: 'h-10 w-10 text-base'
//     };

//     const color = rolesConfig[
//         Object.keys(ROLE_MAPPING).find(key => ROLE_MAPPING[key] === user.permissionLevel) || ''
//     ]?.color || 'gray';

//     const bgColor = `bg-${color}-100`;
//     const textColor = `text-${color}-800`;

//     return (
//         <div
//             className={`inline-flex items-center justify-center rounded-full ${bgColor} ${textColor} ${sizeClasses[size]} font-medium border-2 border-white`}
//             title={`${user.firstName} ${user.lastName} (${user.email})`}
//         >
//             {user.firstName.charAt(0)}{user.lastName.charAt(0)}
//         </div>
//     );
// };

// export default UserAvatar;