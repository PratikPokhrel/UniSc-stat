import { AlertTriangle, CheckCircle, Clock } from "lucide-react";

   const RiskBadge = ({ level }) => {
        const colors = {
            'Low': 'bg-green-100 text-green-800',
            'Medium': 'bg-yellow-100 text-yellow-800',
            'High': 'bg-red-100 text-red-800'
        };
        const icons = {
            'Low': <CheckCircle className="w-3 h-3" />,
            'Medium': <Clock className="w-3 h-3" />,
            'High': <AlertTriangle className="w-3 h-3" />
        };
        return (
            <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${colors[level] || 'bg-gray-100'}`}>
                {icons[level]}
                {level} Risk
            </span>
        );
    };

    export default RiskBadge;