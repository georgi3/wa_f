import React from "react";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {format, parseISO} from "date-fns";
import {handleLink} from "../utils/navigationUtils";

export function EventCard({allEvent}) {
    const isFutureEvent = new Date(allEvent.datetime) > new Date();
    const isFundraiser = Boolean(allEvent.description);
    const linkPath = isFundraiser ? `/activity/fundraising/${allEvent.id}` : `/activity/volunteer/${allEvent.id}`;
    const imageSrc = isFundraiser ? allEvent?.eventPoster : allEvent?.event_poster;
    const actionLabel = isFundraiser ? "See More" : (isFutureEvent ? "Volunteer" : "See More");

    return (
        <EventCardBase
            allEvent={allEvent}
            linkPath={linkPath}
            imageSrc={imageSrc}
            actionLabel={actionLabel}
        />
    );
}

function EventCardBase({ allEvent, linkPath, imageSrc, actionLabel }){
    return (
        <Card className="my-3 p-3 mx-1 text-light" style={{background: "none", borderColor: "#fff"}}>
            <Link onClick={handleLink} to={linkPath}>
                <Card.Img
                    style={{
                        "objectFit": "cover",
                        "borderRadius": 15,
                        "height": "30vh"
                    }}
                    src={imageSrc}
                    alt={`${allEvent?.title} Poster`}
                />
            </Link>
            <Card.Body>
                <Card.Title className="my-3" as="h5">
                    <strong>{allEvent?.title}</strong> <br/> <span className={"fs-6"}>Date: {allEvent.datetime ? format(parseISO(allEvent.datetime), "MMM dd, yyyy") : ""}</span>
                </Card.Title>
                <Link onClick={handleLink} to={linkPath} className={"w-100 btn btn-lg btn-light mt-3"}>
                    {actionLabel}
                </Link>
            </Card.Body>
        </Card>
    );
}