import EventCard from "./components/EventCard";
import ExploreBtn from "./components/ExploreBtn";


const Events = [
  {image : '/images/event1.png', title : 'Event 1'},
    {image : '/images/event2.png', title : 'Event 2'},

]
export default function Page() {
  return (
   <>
  <section>
    <h1 className="text-center">The Hub For Every Dev <br/> Even you Can't Miss </h1>
    <p className="mt-5 text-center">Hackathons, Meetups, and Conferences, All In One Place</p>
    <ExploreBtn/>
    <div className="mt-20 space-y-7">
      <h3>Featured Events</h3>
      <ul className="events">
        {
          Events.map((event)=> (
            <li key={event.title}> <EventCard {... event}/></li>
          ))
        }
      </ul>
    </div>
  </section>
   </>
  );
}
