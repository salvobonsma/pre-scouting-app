'use client'

import {useEffect} from 'react'
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

export default function Error({error, reset}: { error: Error & { digest?: string }, reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error])

    return (
          <div className={"h-screen flex justify-center items-center"}>
              <Card>
                  <CardHeader>
                      <CardTitle>Error</CardTitle>
                      <CardDescription>Something when wrong.</CardDescription>
                  </CardHeader>
                  <CardFooter className={"flex justify-end"}>
                      <Button onClick={() => window.location.reload()}>Try Again</Button>
                  </CardFooter>
              </Card>
          </div>
    )
}