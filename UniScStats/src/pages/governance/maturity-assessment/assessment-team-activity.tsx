import { User, Users } from "lucide-react";
import { FC } from "react"
import organizationalData from './../academic-structure/org_unit_data.jsx';

interface Props {
    selectedOrgUnit?: string;
    assessmentHistory?: any;
}

export const AssessmentTeamActivity: FC<Props> = ({ selectedOrgUnit, assessmentHistory }) => {

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <Users className="h-5 w-5 text-blue-500 mr-2" />
                    Assessment Team Activity
                </h3>
            </div>
            <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {organizationalData[selectedOrgUnit].teamMembers.map((member: any) => {
                        const memberAssessments = Object.values(assessmentHistory[selectedOrgUnit] || {})
                            .flatMap((domain: any) => Object.values(domain))
                            .flatMap((capabilities: any) => Object.values(capabilities))
                            .filter((assessment: any) => assessment.assessor === member.name);

                        return (
                            <div
                                key={member.id}
                                className="bg-white rounded-lg border border-gray-200 hover:border-blue-200 transition-all shadow-xs hover:shadow-sm overflow-hidden"
                            >
                                <div className="p-4">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 bg-blue-50 rounded-lg p-3 mr-4">
                                            <User className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="text-base font-medium text-gray-900 truncate">{member.name}</h4>
                                                    <p className="text-sm text-gray-500 mt-1">{member.role}</p>
                                                </div>
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    {memberAssessments.length} assessments
                                                </span>
                                            </div>

                                            <div className="mt-4 space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Department</span>
                                                    <span className="font-medium text-gray-700">{member.department}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Last Activity</span>
                                                    <span className="font-medium text-gray-700">
                                                        {memberAssessments.length > 0 ? (
                                                            <time dateTime={(memberAssessments[memberAssessments.length - 1] as any).timestamp}>
                                                                {new Date((memberAssessments[memberAssessments.length - 1] as any).timestamp).toLocaleDateString()}
                                                            </time>
                                                        ) : (
                                                            'No activity'
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}
