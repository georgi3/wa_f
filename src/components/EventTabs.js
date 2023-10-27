import React, {useMemo, useState} from "react";
import {Tab, Tabs} from 'react-bootstrap';
import {EventsCarousel} from "./EventsCarousel";
import { useLocation, useNavigate } from 'react-router-dom';

export function EventTabs({ events }) {
    const location = useLocation();
    const navigate = useNavigate();

    const initialActiveTab = new URLSearchParams(location.search).get('tab') || 'upcomingEvents';
    const [activeTab, setActiveTab] = useState(initialActiveTab);

    const upcomingEvents = useMemo(() => {
        const filteredEvents = events.filter((vEvent) => new Date(vEvent.datetime) > new Date());
        return filteredEvents.sort((event1, event2) => new Date(event1.datetime) - new Date(event2.datetime));
    }, [events]);

    const pastEvents = useMemo(() => {
        const filteredEvents = events.filter((vEvent) => new Date(vEvent.datetime) < new Date());
        return filteredEvents.sort((event1, event2) => new Date(event2.datetime) - new Date(event1.datetime));
    }, [events]);

    const handleTabChange = (eventKey) => {
        setActiveTab(eventKey);
        const newSearch = new URLSearchParams(location.search);
        newSearch.set('tab', eventKey);
        navigate({ ...location, search: newSearch.toString() });
    };

    return (
        <Tabs
            activeKey={activeTab}
            className="mb-3 d-flex justify-content-between event-tabs"
            justify
            onSelect={handleTabChange}
        >
            <Tab eventKey="upcomingEvents" title="Upcoming Events" tabClassName={"py-3"}>
                <EventsCarousel events={upcomingEvents} />
            </Tab>
            <Tab eventKey="pastEvents" title="Past Events" tabClassName={"py-3"}>
                <EventsCarousel events={pastEvents} />
            </Tab>
        </Tabs>
    );
}