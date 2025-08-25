import { Dispatch, FC, SetStateAction } from "react";

interface Props {
    setShowHelp: Dispatch<SetStateAction<boolean>>;
    maturityLevels : any[];
}

const HelpGuide: FC<Props> = ({maturityLevels, setShowHelp }) => {
    return (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Assessment Help Guide</h3>
                    <button
                        onClick={() => setShowHelp(false)}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        aria-label="Close help dialog"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="prose prose-sm max-w-none">
                    <section className="mb-6">
                        <h4 className="font-semibold text-lg mb-2">Assessment Process</h4>
                        <ol className="list-decimal pl-5 space-y-2">
                            <li>Select a domain from the left panel</li>
                            <li>Review each capability statement carefully</li>
                            <li>Click the maturity level that best matches your current organizational state</li>
                            <li>The system automatically saves your assessment</li>
                            <li>View historical assessments using the version history panel</li>
                        </ol>
                    </section>

                    <section className="mb-6">
                        <h4 className="font-semibold text-lg mb-2">Maturity Level Definitions</h4>
                        <div className="space-y-3">
                            {maturityLevels.map(level => (
                                <div key={level.level} className="border-l-4 border-blue-200 pl-4 py-1">
                                    <div className="font-medium">
                                        Level {level.level}: <span className="text-blue-600">{level.name}</span>
                                    </div>
                                    <p className="text-gray-600 text-sm">{level.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default HelpGuide;