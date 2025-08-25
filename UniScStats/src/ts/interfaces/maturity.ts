export interface AssessmentHistory {
    [orgUnit: string]: {
        [domainId: string]: {
            [capabilityIndex: string]: Array<{
                level: number;
                timestamp: string;
                assessor: string;
                assessorRole: string;
                notes?: string;
            }>;
        };
    };
}

export interface AssessmentHistoryPanelProps {
    history: AssessmentHistory;
    domainId: string;
    capabilityIndex: number;
    selectedOrgUnit: string;
}