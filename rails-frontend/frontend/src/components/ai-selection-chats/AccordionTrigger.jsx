import * as React from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons"
import * as Accordion from "@radix-ui/react-accordion";
import classNames from "classnames";
export default function AccordionTrigger({children, className, ...props}) {
    return (
        <Accordion.Header className="AccordionHeader">
            <Accordion.Trigger
                className={classNames("nav-button",
                    "AccordionTrigger",
                    className
                )}
                {...props}
                >
                    <span>{children}</span>
                    
                    <ChevronDownIcon
                        className="AccordionChevron"
                        aria-hidden
                    />
            </Accordion.Trigger>
        </Accordion.Header>
    );
}