import React from "react";
import {Container, Col} from "react-bootstrap";
import unknownUser from "../assets/images/svg/unknown_user_icon.svg"
import {Link} from "react-router-dom";
import { handleLink } from "../utils/navigationUtils";


export default function UserDisplay({ users, areVolunteers }){
    return(
        <Container className={"d-flex flex-row flex-wrap my-5"}>
            {
                users.map(member => {
                    return(
                        <Col xxl={2} xl={3} lg={3} md={4} sm={6}
                             className={"align-content-center justify-content-center text-center"}
                             key={member?.id}>
                            <Link onClick={handleLink} to={`/user-profile/${member?.id}`} className={" text-decoration-none"}>
                                <Container className={"zoom"}>
                                    <img
                                        src={member?.profile_picture ? member.profile_picture : unknownUser}
                                        width={"100%"}
                                        className={"img-profile"}
                                        alt={member?.profile_picture ? "User's" : "Unknown User"}
                                    />
                                </Container>
                                <h4 className={"lead fs-4"}>{member?.name}</h4>
                            </Link>
                            <AreVolunteersDisplay areVolunteers={areVolunteers} member={member}/>
                        </Col>
                    )
                })
            }
        </Container>
    )
}

function AreVolunteersDisplay({member, areVolunteers}){
    return(
        <div>
            {
                (areVolunteers)
                    ?
                    (
                        <div>
                            <p className={"text-muted"}>{member?.assigned_position}</p>
                            {
                                (member?.testimonial)
                                    ? <p className={""}>"{member?.testimonial}"</p>
                                    : <p className={""}></p>
                            }
                        </div>
                    )
                    :
                    (
                        <p className={""}>{member?.community_position}</p>
                    )
            }
        </div>
    )
}