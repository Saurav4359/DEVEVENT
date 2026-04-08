import BookEvent from "@/app/components/bookEvent";
import { Divide } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

const EventDetailsItem = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => {
  return (
    <div className="flex-row-gap-2 items-center">
      <img src={icon} alt={alt} width={17} height={17} />
      <p>{label}</p>
    </div>
  );
};

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
  <div className="agenda">
    <h2>Agenda</h2>
    <ul>
      {agendaItems.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);

const EventTags =({tags}: {tags : string[]})=> (
  <div className="flex flex-row gap-1.5 flex-wrap">{tags.map((tag)=>(
        <div className="pill" key={tag}>{tag}</div>
  ))}</div>
)
const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{
    slug?: string;
  }>;
}) => {
  const { slug } = await params;
  const request = await fetch(`${BASE_URL}/api/events/${slug}`);
   
  const {
    event: {
      description,
      image,
      overview,
      date,
      time,
      location,
      mode,
      agenda,
      audience,
      Organizer,
      tags
    },
  } = await request.json();
  if (!description) {
    return notFound();
  }
   const bookings = 10;
  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p className="">{description}</p>
      </div>
      <div className="details">
        {/* left side event content  */}
        <div className="content">
          <img
            src={image}
            alt="Event banner"
            width={800}
            height={800}
            className="banner"
          />
          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <h2>{overview}</h2>
          </section>
          <section className="flex-col-gap-2">
            <h2>Events Details</h2>
            <EventDetailsItem
              icon="/icons/calendar.svg"
              alt="calendar"
              label={date}
            />
            <EventDetailsItem
              icon="/icons/clock.svg"
              alt="clock"
              label={time}
            />
            <EventDetailsItem
              icon="/icons/pin.svg"
              alt="pin"
              label={location}
            />
            <EventDetailsItem icon="/icons/mode.svg" alt="mode" label={mode} />
            <EventDetailsItem
              icon="/icons/audience.svg"
              alt="audience"
              label={audience}
            />
          </section>

          <EventAgenda agendaItems={agenda} />
          <section className="flex-col-gap-2">
            <h2>About the Organizer</h2>
            <p>{Organizer}</p>
          </section>
         
         <EventTags tags={tags}/>

        </div>
        {/* right side event content  */}
        <aside className="booking">
         <div className="signup-card">
          <h2>Book Your Spot</h2>
          {bookings > 0 ? (
            <p className="text-sm">
              Join {bookings} people who have already booked the spot!
            </p>
          ): ( 
            <p className="text-sm">
              Be the first to book your spot!
            </p>
          )}

          <BookEvent/>
         </div>
        </aside>
      </div>
    </section>
  );
};

export default EventDetailsPage;
