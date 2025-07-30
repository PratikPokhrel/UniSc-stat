const MaturityBadge = ({ level }) => {
        const colors = {
            'Initial': 'bg-red-100 text-red-800',
            'Managed': 'bg-yellow-100 text-yellow-800',
            'Defined': 'bg-blue-100 text-blue-800',
            'Quantitatively Managed': 'bg-purple-100 text-purple-800',
            'Optimizing': 'bg-green-100 text-green-800'
        };
        return (
            <span className={`text-xs px-2 py-1 rounded-full ${colors[level] || 'bg-gray-100'}`}>
                {level}
            </span>
        );
    };

    export default MaturityBadge;