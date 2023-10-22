import React, {useEffect, useMemo, useState} from "react";
import {useParams} from "react-router-dom";
import { MainLayout } from "../components/MainLayout";
import {faFacebook, faInstagram, faLinkedin, faTiktok, faTwitter} from "@fortawesome/free-brands-svg-icons";
import FundraisingFutureEvent from "../components/FundraisingFutureEvent";
import FundraisingPastEvent from "../components/FundraisingPastEvent";

async function fetchFundraisingEvent({ id }) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/events/fundraising/${id}`);
    return await response.json();
}


export default function FundraiserEventScreen(){
    const [frEvent, setFrEvent] = useState({});
    const { id } = useParams();

    useEffect(() => {
        (async () => {
            const data = await fetchFundraisingEvent({ id });
            setFrEvent({...data, socialMediaList: parseSocialMedia(data)});
        })();
    }, [id]);


    const EVENT_DATE = new Date(frEvent?.datetime);
    const NOW_IN_MS = new Date().getTime();
    const DATE_DIFFERENCE_IN_MS = EVENT_DATE.getTime() - NOW_IN_MS;
    const dateTimeDifference = NOW_IN_MS + DATE_DIFFERENCE_IN_MS;
    const isFutureEvent = useMemo(() => new Date(frEvent.datetime) > new Date(), [frEvent])

    return(
        <MainLayout>
         {
                isFutureEvent
                    ?
                        <FundraisingFutureEvent frEvent={frEvent} dateTimeDifference={dateTimeDifference} />
                    :
                        <FundraisingPastEvent frEvent={frEvent}  />
            }
        </MainLayout>
    )
}


function parseSocialMedia(frEvent) {
    const socialMediaList = [];
    const socialList = ["igLink", "tiktokLink", "fbLink", "linkedInLink", "twitterLink"];
    const socialDict = {
        igLink: faInstagram,
        tiktokLink: faTiktok,
        fbLink: faFacebook,
        linkedInLink: faLinkedin,
        twitterLink: faTwitter
    };

    socialList.forEach((social) => {
        if (frEvent[social]) {
            socialMediaList.push({
                icon: socialDict[social],
                href: frEvent[social],
                color: "text-info",
                target: "_blank"
            });
        }
    });
    return socialMediaList;
}

