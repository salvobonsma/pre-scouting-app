import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";

export default function Back({link, display}: { link: string, display: string }) {
    return (
          <a href={link}>
              <Button variant={"link"} type={"button"} className={"text-lg p-0 my-6"}>
                  <ArrowLeft className={"mr-1"}/>{display}
              </Button>
          </a>
    );
}