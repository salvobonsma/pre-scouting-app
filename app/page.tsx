'use client'

import {Separator} from "@/components/ui/separator";
import NewEventDialog from "@/components/new-event-dialog";

export default function Home() {
    return (
          <>
              <div className={"flex justify-between mt-14"}>
                  <h1>Events</h1>
                  <NewEventDialog/>
              </div>
              <Separator />
              <p className={"text-center muted mt-8"}>No events have been pre-scouted for, yet.</p>
          </>
    );
}
