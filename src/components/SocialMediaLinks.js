import React from "react";
import {Container} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function SocialMediaLinks({ socials }){
    return (
        <Container className='text-center pt-3 mb-3' fluid>
            {
                socials?.map((social) => (
                        <a key={social.href} className={`pt-3 mx-2 ${social.color}`} target={social.target} href={social.href}><FontAwesomeIcon size="xl" icon={social.icon}/></a>
                    )
                )
            }
        </Container>
    )
}