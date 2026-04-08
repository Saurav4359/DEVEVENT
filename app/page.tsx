import EventCard from "./components/EventCard";
import ExploreBtn from "./components/ExploreBtn";
import { IEvent } from "@/database/event.model";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type EventsResponse = {
  events: IEvent[];
};

export default async function Page() {
  if (!BASE_URL) {
    throw new Error("Missing NEXT_PUBLIC_BASE_URL environment variable.");
  }

  const response = await fetch(`${BASE_URL}/api/events`);
  const { events }: EventsResponse = await response.json();

  return (
    <>
      <section>
        <h1 className="text-center">
          The Hub For Every Dev <br /> Even you Can't Miss
        </h1>
        <p className="mt-5 text-center">
          Hackathons, Meetups, and Conferences, All In One Place
        </p>
        <ExploreBtn />
        <div className="mt-20 space-y-7">
          <h3>Featured Events</h3>
          <ul className="events">
            {events.length > 0 &&
              events.map((event: IEvent) => (
                <li key={event.title}>
                  <EventCard {...event} />
                </li>
              ))}
          </ul>
        </div>
      </section>
    </>
  );
}
