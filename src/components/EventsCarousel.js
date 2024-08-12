import React, { useState, useEffect } from "react";
import {EventCard} from "./EventCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

export function EventsCarousel({events}) {
    const [city, setCity] = useState("");
    const [cities, setCities] = useState([]);

    useEffect(() => {
        if (cookies.get("city")) {
            setCity(cookies.get("city"));
        } else {
            setCity("Montreal");
        }

        const _cities = events.map(event => event.city);
        const uniqueCities = [...new Set(_cities)];
        if (uniqueCities.length < 1) uniqueCities.push("Montreal");
        setCities(uniqueCities);
    }, [events]);

    return (
      <>
        <div className="w-100 text-right d-flex justify-content-end">
            <select
            className="fw-light border btn btn-outline-primary text-light w-100 py-2 px-5"
            onChange={(e) => {
                setCity(e.target.value);
                cookies.set("city", e.target.value);
            }}
            value={city}
            >
            {cities.map((_city) => {
                return (
                <option key={_city} value={_city}>
                    {_city}
                </option>
                );
            })}
            </select>
        </div>

        <Carousel responsive={responsive}>
          {events.map((allEvent) => {
            if (allEvent.city !== city) {
              return null;
            }
            return (
              <EventCard
                className="p-3 mx-3 d-flex"
                key={allEvent.id}
                allEvent={allEvent}
              />
            );
          })}
        </Carousel>
      </>
    );
}
