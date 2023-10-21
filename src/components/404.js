import React from "react";
import {Container} from "react-bootstrap";

export default function NotFound (){
    return(
        <Container className={"py-5"}>
            <h3 className={"text-center lead fs-1"}>Sorry, it seems you have followed a bad link.</h3>
        </Container>

    )
}