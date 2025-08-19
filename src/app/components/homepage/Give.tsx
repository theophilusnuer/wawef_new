"use-client";

import { FC } from "react";
import { Donate } from "../Donate";
import { Quote2 } from "./Quotes";


export const Give: FC = () => {
    return (
        <div id="donate-section" className="bg-[#DFF3E7] py-10">
            <Quote2 />
            <div className="px-4 md:px-10 max-w-[78rem] mx-auto">
                <Donate />
            </div>
        </div>
    )
}
