import {Separator} from "@/components/ui/separator";

export default function Hgroup(props: { h: string, p: string }) {
    return (
          <hgroup className={"mt"}>
              <h1>{props.h}</h1>
              <p className={"muted"}>{props.p}</p>
              <Separator/>
          </hgroup>
    )
}