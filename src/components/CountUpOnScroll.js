import React from "react";
import VisibilitySensor from "react-visibility-sensor";
import CountUp from "react-countup";


export function CountUpOnScroll({end, prefix="", separator=" ", start=0}){
    const time = 1.5;
    return(
        <CountUp start={0} end={end} duration={time} prefix={prefix} separator={separator} redraw={true}>
            {
                ({ countUpRef, start}) => (
                    <VisibilitySensor onChange={start} delayedCall>
                        <span ref={countUpRef} />
                    </VisibilitySensor>

                )
            }
        </CountUp>
    )
}