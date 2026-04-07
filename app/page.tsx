import ExploreBtn from "./components/ExploreBtn";

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
          [1,2,3,4,5].map((event)=> (
            <li key={event}> Event {event}</li>
          ))
        }
      </ul>
    </div>
  </section>
   </>
  );
}
