import Link from 'next/link'
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

export default function NotFound() {
    return (
          <div className={"h-screen flex justify-center items-center"}>
              <Card>
                  <CardHeader>
                      <CardTitle>Not Found</CardTitle>
                      <CardDescription>Could not find what you were looking for.</CardDescription>
                  </CardHeader>
                  <CardFooter className={"flex justify-end"}>
                      <Link href={"/"}><Button>Return Home</Button></Link>
                  </CardFooter>
              </Card>
          </div>
    )
}