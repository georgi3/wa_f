import React, {useEffect, useMemo, useState} from "react";
import {useParams} from "react-router-dom";
import {MainLayout} from "../components/MainLayout";
import VolunteeringFutureEvent from "../components/VolunteeringFutureEvent";
import VolunteeringPastEvent from "../components/VolunteeringPastEvent";
async function fetchEvent({ id }) {
    const response = await fetch(`/api/events/volunteering/${id}`);
    return await response.json();
}
export default function VolunteeringEventScreen(){
    const [vEvent, setVEvent] = useState({});
    const { id } = useParams()

    useEffect( () => {
        (async() => {
            const eventData = await fetchEvent({ id });
            setVEvent(eventData)
        })()
    }, [id]);

    const EVENT_DATE = new Date(vEvent?.datetime);
    const NOW_IN_MS = new Date().getTime();
    const DATE_DIFFERENCE_IN_MS = EVENT_DATE.getTime() - NOW_IN_MS;
    const dateTimeDifference = NOW_IN_MS + DATE_DIFFERENCE_IN_MS;
    const isFutureEvent = useMemo(() => new Date(vEvent.datetime) > new Date(), [vEvent])

    return(
        <MainLayout>
            {
                isFutureEvent
                ?
                    <VolunteeringFutureEvent vEvent={vEvent} dateTimeDifference={dateTimeDifference} />
                :
                    <VolunteeringPastEvent vEvent={vEvent} />
            }
        </MainLayout>
    )
}

