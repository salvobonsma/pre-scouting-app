import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Separator} from "@/components/ui/separator";
import NewEvent from "@/lib/generate/new-event";

export default async function Home() {
    await NewEvent("2024wasam", 2024, "test3");

    return (
          <>
              <div className={"flex justify-between mt-14"}>
                  <h1>Events</h1>
                  <Link href={"/new-event"}><Button>New Event</Button></Link>
              </div>
              <Separator />
              <p className={"text-center muted mt-8"}>No events have been pre-scouted for, yet.</p>
          </>
    );
}
