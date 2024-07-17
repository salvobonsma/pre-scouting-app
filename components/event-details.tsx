import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {isPast} from "@/lib/utils";

dayjs.extend(relativeTime);

export default async function EventDetails(props: {
    event: { startDate: string, city: string | null, type: string },
    teams: number
}) {
    return (
          <>
              <div className={"flex justify-between"}>
                  <p className={"muted"}>
                      Time {isPast(props.event.startDate) ? "until" : "since"} event
                  </p>
                  <p>{
                      dayjs()
                            .to(props.event.startDate)
                            .replace("in", "")
                            .replace("ago", "")
                  }</p>
              </div>
              <div className={"flex justify-between"}>
                  <p className={"muted"}>Teams attending</p>
                  <p>{props.teams} teams</p>
              </div>
              <div className={"flex justify-between"}>
                  <p className={"muted"}>Location</p>
                  <p>{props.event.city}</p>
              </div>
              <div className={"flex justify-between"}>
                  <p className={"muted"}>Event type</p>
                  <p>{props.event.type}</p>
              </div>
          </>
    );
}