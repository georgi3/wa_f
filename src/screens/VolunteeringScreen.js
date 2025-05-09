import React, {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import MyNavbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import {Link} from "react-router-dom";
import volunteeringHero from "../assets/images/volunteering/hero/volunteeringHero.jpg"
import {HashLink} from "react-router-hash-link";
import {format, parseISO} from "date-fns";
import VolunteerPositionLink from "../components/VolunteerPositionLink";
import profileImgDNE from "../assets/images/svg/unknown_user_icon.svg";
import * as PropTypes from "prop-types";
import {handleLink} from "../utils/navigationUtils";

async function fetchTopVolunteers() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/top-volunteers`);
    return await response.json();
}


TopVolunteers.propTypes = {volunteers: PropTypes.arrayOf(PropTypes.any)};
export default function VolunteeringScreen() {
    const [topVolunteers, setTopVolunteers] = useState([]);

    useEffect(() => {
        (async() => {
            const data = await fetchTopVolunteers();
            setTopVolunteers(data);
        })()
    }, []);

    return (
        <>
            <MyNavbar />
            <HeroOverlay backgroundImage={volunteeringHero} />
            <Container>
                <Row className={"d-flex flex-row "}>
                    <Col className={"py-3"} sm={12} lg={6}>
                        <p className={"text-center lead fs-3"}>Find out more about our Weekly Volunteering events, what volunteering positions we offer and their responsibilities.</p>
                        <Container className={"d-flex justify-content-center py-3"}>
                            <Link to={"/activity/weekly-volunteering"} onClick={handleLink} className={"w-75 btn btn-lg btn-outline-info"}>Let's go!</Link>
                        </Container>
                        <p className={"text-center lead pt-3 fs-3"}>Check out <Link onClick={handleLink} to={"/activity"} className={"text-info text-decoration-none"}>other events </Link>.</p>
                    </Col>
                    <Col className={"py-3"} sm={12} lg={6}>
                        <p className={"text-center lead fs-2"}>Our proudest volunteers this month!</p>
                        <TopVolunteers volunteers={topVolunteers} />
                    </Col>
                </Row>
            </Container>
            <Container className={"px-0 mx-0 py-2 my-3"} fluid>
                <h3 id={"startVolunteeringId"} className={"transitioning-background-primary text-center text-light fw-light fs-2"}>Please select the upcoming event you would like to volunteer for!</h3>
                <VolunteeringOptions />
            </Container>
            <Footer />
        </>
    )
}

function HeroOverlay({backgroundImage}) {
    return (
        <div className="hero-overlay shadow-lg" style={{ backgroundImage: `url(${backgroundImage})`}}>
            <Container>
                <Row>
                    <Col className={"hero-text"}>
                        <h1 className={"lead fs-1"}>Volunteering</h1>
                        <p className={"lead fs-4 fw-light"}>Thank you for choosing to volunteer with our team!</p>
                        <div className={""}>
                            <HashLink to={"#startVolunteeringId"} className={"w-50 btn btn-lg btn-outline-light"}>Jump in!</HashLink>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

async function fetchEvents() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/events/volunteering`);
    const data = await response.json();

    const currentDate = new Date();

    // Filter out past events
    const filteredEvents = data.filter((event) => {
        const eventDate = new Date(event.datetime);
        return eventDate >= currentDate;
    });

    // Sort the filtered events by date in ascending order
    filteredEvents.sort((event1, event2) => {
        const date1 = new Date(event1.datetime);
        const date2 = new Date(event2.datetime);
        return date1 - date2;
    });
    return filteredEvents;
}



function VolunteeringOptions(){
    const [vEvents, setEvents] = useState([]);
    const [vCities, setCities] = useState([]);
    const [city, setCity] = useState("");

    useEffect(() => {
        (async() => {
            const data = await fetchEvents();
            setEvents(data);
            setCity(data[0]?.city || "Montreal");
            const Cities = data.map(event => event.city);
            const uniqueCities = [...new Set(Cities)];
            setCities(uniqueCities);
        })()
    }, []);
    if (vEvents.length === 0) {
        return (
            <Container className={"d-flex justify-content-center align-content-center my-5 mx-0 px-lg-1"} fluid>
                <p>Currently no upcoming events are displayed. Please check later!</p>
            </Container>
        )
    }
    return (
      <Container
        className={"d-flex justify-content-center flex-wrap my-5 mx-0 px-lg-1"}
        fluid
      >
        <ul
          className={"mb-3 nav nav-tabs d-flex justify-content-center w-100"}
          role="tablist"
        >
            {vCities.map((cit) => {
                return (
                    <li className={"nav-item flex-fill justify-content-center align-center text-center m-2"} role="presentation" key={cit} style={{maxWidth: "550px"}}>
                        <button
                            type="button"
                            className={`fs-3 text-decoration-none fw-light border btn btn-outline-info py-2 px-5 w-100 ${ city === cit ? "active" : ""}`}
                            onClick={() => setCity(cit)}
                        >
                            {cit}
                        </button>
                    </li>
                )
            })}
        </ul>
        {vEvents.map((e) => {
          if (e.city !== city) return;
          const currentDate = new Date();
          const eventDate = new Date(e?.datetime);
          // Subtract 4 days from the event date
          const dateFourDaysBeforeEvent = new Date(eventDate);
          dateFourDaysBeforeEvent.setDate(eventDate.getDate() - 4);
          const closeApplication = dateFourDaysBeforeEvent <= currentDate;
          return (
            <Col
              lg={4}
              md={6}
              sm={12}
              className={
                "align-content-center justify-content-center text-center flex-fill my-2"
              }
              style={{ maxWidth: "550px" }}
              key={e?.id}
            >
              <div className={"border m-1 h-100"}>
                <Container className={"p-1"}>
                  <Link
                    onClick={handleLink}
                    to={`/activity/volunteer/${e?.id}`}
                    as={"h2"}
                    className={
                      "d-flex justify-content-center  fs-3 text-decoration-none fw-light border btn btn-outline-info"
                    }
                  >
                    {e?.title}
                  </Link>
                  <p className={"text-dark text-center py-2 fs-4 fw-light"}>
                    {e.datetime
                      ? format(parseISO(e.datetime), "MMM/dd/yyyy")
                      : ""}
                  </p>
                  <Container className={"d-flex justify-content-between"}>
                    <Container>
                      <ul className={"lead fs-5  px-0"}>
                        <li
                          className={
                            "list-unstyled d-flex justify-content-between py-0 border-bottom"
                          }
                        >
                          <span>Day:</span>{" "}
                          <span>
                            {e.datetime
                              ? format(parseISO(e.datetime), "eeee")
                              : ""}
                          </span>
                        </li>
                        <li
                          className={
                            "list-unstyled d-flex justify-content-between py-0 border-bottom"
                          }
                        >
                          <span>Time:</span>{" "}
                          <span>
                            {e.datetime
                              ? format(parseISO(e.datetime), "HH:mm")
                              : ""}
                          </span>
                        </li>
                        <li
                          className={
                            "list-unstyled d-flex justify-content-between py-0 border-bottom"
                          }
                        >
                          <span>Location:</span> <span>{e?.location}</span>
                        </li>
                        {closeApplication === true ? (
                          <div className={"text-center py-3"}>
                            Application Process is Closed
                          </div>
                        ) : (
                          <>
                            <li
                              className={
                                "list-unstyled d-flex justify-content-between py-0 fw-normal"
                              }
                            >
                              <span>Required Volunteers:</span>
                            </li>
                            <li className={"list-unstyled"}>
                              <VolunteerPositionLink
                                positionName="Drivers"
                                positionsLeft={e?.drivers_left}
                                applicationCount={e?.driver_count}
                                positionLimit={e?.driver_num}
                                eventId={e?.id}
                              />
                            </li>
                            <li className={"list-unstyled"}>
                              <VolunteerPositionLink
                                positionName="Cooks"
                                positionsLeft={e?.cooks_left}
                                applicationCount={e?.cook_count}
                                positionLimit={e?.cook_num}
                                eventId={e?.id}
                              />
                            </li>
                            <li className={"list-unstyled"}>
                              <VolunteerPositionLink
                                positionName="Servers"
                                positionsLeft={e?.servers_left}
                                applicationCount={e?.server_count}
                                positionLimit={e?.servers_num}
                                eventId={e?.id}
                              />
                            </li>
                            {e?.dishwashers_left !== 0 ? (
                              <li className={"list-unstyled"}>
                                <VolunteerPositionLink
                                  positionName="Dishwashers"
                                  positionsLeft={e?.dishwashers_left}
                                  applicationCount={e?.dishwasher_count}
                                  positionLimit={e?.dishwashers_num}
                                  eventId={e?.id}
                                />
                              </li>
                            ) : null}
                            {e?.photographers_left !== 0 ||
                            e?.photographer_count >= 3 ? (
                              <li className={"list-unstyled"}>
                                <VolunteerPositionLink
                                  positionName="Photographers"
                                  positionsLeft={e?.photographers_left}
                                  applicationCount={e?.photographer_count}
                                  positionLimit={e?.photographers_num}
                                  eventId={e?.id}
                                />
                              </li>
                            ) : null}
                          </>
                        )}
                      </ul>
                    </Container>
                  </Container>
                </Container>
              </div>
            </Col>
          );
        })}
      </Container>
    );
}

function TopVolunteers({ volunteers }) {
    return(
        <Container className={"d-flex justify-content-center flex-row flex-wrap my-3"}>
            {
                volunteers.map(member => {
                    return(
                        <div className={"text-center"} key={member?.id}>
                            <Link onClick={handleLink} to={`/user-profile/${member?.id}`} className={"text-decoration-none "}>
                                <Container className={"zoom"}>
                                    {member?.profile_picture ? (
                                        <img src={member?.profile_picture} className={"img-profile-small"} alt="Profile Picture"/>
                                    ) : (
                                        <img src={profileImgDNE} className={"img-profile-small"} alt="Profile Picture"/>
                                    )}
                                </Container>
                                <h4 className={"lead fs-4"}>{member?.name}</h4>
                            </Link>
                            <div>
                                <p className={"py-0 my-0"}>Volunteering Time: </p>
                                <p className={"lead text-info"}>{member?.volunteering_hours_last_30} hours</p>
                            </div>
                        </div>
                    )})
            }
        </Container>
    )
}
