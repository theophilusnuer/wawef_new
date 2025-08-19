import { FC } from "react"
import { Quote3 } from "./Quotes"



export const ImpactNumbers: FC = () => {
    return (
        <div className="py-10">
            <Quote3 />
            <div className="py-8 px-4 md:px-10 max-w-[78rem] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-[#27AE60] sm:px-16">
                    {/* Communities */}
                    <div>
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                            2
                        </h3>
                        <p className="md:text-lg mt-2">
                            Communities Served
                        </p>
                    </div>

                    {/* Projects */}
                    <div>
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                           2
                        </h3>
                        <p className="md:text-lg mt-2">
                            Projects Completed
                        </p>
                    </div>

                    {/* Lives */}
                    <div>
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                            500
                        </h3>
                        <p className="md:text-lg mt-2">
                            Lives Impacted
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
