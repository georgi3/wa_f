import {Col, Container, Row} from "react-bootstrap";
import React from "react";

export default function DoubleColumn({items}) {
    return(
        <Container>
            <Row className={"lead "}>
                {items.map((item, index) => (
                    <Col key={index} md={6}>
                        <ul>
                            <li>{item}</li>
                        </ul>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}