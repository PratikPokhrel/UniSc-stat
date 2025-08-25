import { FC } from "react";

interface Props {
     maturityLevels : any[];
}

export const MaturityReference: FC<Props> = ({ maturityLevels}) => {
    return (<div className="bg-white shadow rounded-lg overflow-hidden mt-6">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">DMBOK (Data Management Body of Knowledge) maturity levels</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {maturityLevels.map((level) => (
                    <div key={level.level} className={`p-4 rounded-lg border-2 ${level.color}`}>
                        <div className="font-bold text-lg mb-1">Level {level.level}</div>
                        <div className="font-medium mb-2">{level.name}</div>
                        <div className="text-sm">{level.description}</div>
                    </div>
                ))}
            </div>
        </div>
    </div>)
}