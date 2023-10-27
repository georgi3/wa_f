import React from "react";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {format, parseISO} from "date-fns";
import {handleLink} from "../utils/navigationUtils";

export function EventCard({allEvent}) {
    const isFutureEvent = new Date(allEvent.datetime) > new Date();
    const isFundraiser = allEvent.description
    return(
        <>
            {
                isFundraiser
                ?
                    <FundraiserCard allEvent={allEvent} isFutureEvent={isFutureEvent}  />
                :
                    <VolunteerCard allEvent={allEvent} isFutureEvent={isFutureEvent} />
            }
        </>
    )
}

function FundraiserCard({ allEvent, isFutureEvent }){
    return(
        <Card className="my-3 p-3 mx-1 text-light" style={{background: "none", borderColor: "#fff"}}>
            <Link
                onClick={handleLink}
                to={`/activity/fundraising/${allEvent.id}`}>
                <Card.Img style={{
                    "objectFit": "cover",
                    "borderRadius": 15,
                    "height": "30vh"
                }} src={allEvent?.eventPoster} alt={`${allEvent?.title} Poster`}/>
            </Link>
            <Card.Body>
                <Card.Title className="" as="h5">
                    <strong>{allEvent?.title}</strong> <br/> <span className={"fs-6"}>Date: {allEvent.datetime ? format(parseISO(allEvent.datetime), 'MMM dd, yyyy') : ''}</span>
                </Card.Title>
                <Link onClick={handleLink} to={`/activity/fundraising/${allEvent.id}`}
                      className={"w-100 btn btn-lg btn-light mt-3"}
                >
                    See More
                </Link>
            </Card.Body>
        </Card>
    )
}
function VolunteerCard({ allEvent, isFutureEvent }){
    return(
        <Card className="my-3 p-3 mx-1 text-light" style={{background: "none", borderColor: "#fff"}}>
            <Link
                onClick={handleLink}
                to={`/activity/volunteer/${allEvent.id}`}>
                <Card.Img style={{
                    "objectFit": "cover",
                    "borderRadius": 15,
                    "height": "30vh"
                }} src={allEvent?.event_poster} alt={`${allEvent?.title} Poster`}/>
            </Link>
            <Card.Body>
                <Card.Title className={"my-3"} as="h5">
                    <strong>{allEvent?.title}</strong> <br/> <span className={"fs-6"}>Date: {allEvent.datetime ? format(parseISO(allEvent.datetime), 'MMM dd, yyyy') : ''}</span>
                </Card.Title>
                <Link onClick={handleLink} to={`/activity/volunteer/${allEvent.id}`}
                      className={"w-100 btn btn-lg btn-light mt-3"}>
                    {
                        isFutureEvent
                            ?
                            "Volunteer"
                            :
                            "See More"
                    }
                </Link>
            </Card.Body>
        </Card>
    )
}