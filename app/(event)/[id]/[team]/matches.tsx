import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

import {Separator} from "@/components/ui/separator";
import React from "react";

export default function Matches() {
    return (
          <Tabs defaultValue={"table"}>
              <div className={"flex justify-start sm:justify-between items-center mt"}>
                  <h1>Matches</h1>
                  <TabsList className={"hidden sm:block translate-y-[-3px]"}>
                      <TabsTrigger value={"table"}>Table</TabsTrigger>
                      <TabsTrigger value={"carousel"}>Carousel</TabsTrigger>
                  </TabsList>
              </div>
              <Separator/>
              <TabsList className={"sm:hidden w-full mt-sm"}>
                  <TabsTrigger className={"flex-1"} value={"table"}>Table</TabsTrigger>
                  <TabsTrigger className={"flex-1"} value={"carousel"}>Carousel</TabsTrigger>
              </TabsList>
              <TabsContent value={"table"}>
              </TabsContent>
              <TabsContent value={"carousel"}>Change your password here.</TabsContent>
          </Tabs>
    )
}