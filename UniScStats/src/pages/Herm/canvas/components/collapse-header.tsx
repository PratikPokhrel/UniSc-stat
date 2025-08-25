import { ChevronDown, ChevronUp } from "lucide-react";
import React from "react";
import { colorClasses } from "../styles/theme-colors";

const CollapseHeader = ({ toggleCategory, category, categoryId, items, expandedCategories }) => {
    const colors = colorClasses[category.color];
    return (
        <div
            className={`flex items-center p-2 rounded-md border ${colors.bg} ${colors.border} cursor-pointer`}
            onClick={() => toggleCategory(categoryId)}>
            <div className={`p-1.5 ${colors.accent} rounded-sm mr-2`}>
                {React.cloneElement(category.icon, { className: "w-3 h-3 text-white" })}
            </div>
            <div className="flex-1">
                <h3 className={`text-md font-medium ${colors.text}`}>{category.title}</h3>
            </div>
            <span className="text-xs text-gray-600 mr-2">
                {items?.length || 0} {(items?.length || 0) === 1 ? 'item' : 'items'}
            </span>
            {expandedCategories[categoryId] ? (
                <ChevronUp className="w-3.5 h-3.5 text-gray-500" />
            ) : (
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            )}
        </div>
    );
}
export default CollapseHeader;