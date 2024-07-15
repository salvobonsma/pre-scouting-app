import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";
import Link from "next/link";

export default function Back({link, display}: { link: string, display: string }) {
    return (
          <Link href={link}>
              <Button variant={"link"} type={"button"} className={"text-lg p-0 my-6"}>
                  <ArrowLeft className={"mr-1"}/>{display}
              </Button>
          </Link>
    );
}