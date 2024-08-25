'use client'

import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Label} from "@/components/ui/label";

export default function ExportDialog({eventId}: { eventId: number }) {
    const [exportType, setExportType] = useState("csv");

    return (
          <Dialog>
              <DialogTrigger asChild><Button className={"m-1.5"}>Export</Button></DialogTrigger>
              <DialogContent>
                  <DialogHeader>
                      <DialogTitle>Export</DialogTitle>
                  </DialogHeader>
                  <div className={"flex justify-end gap-3 items-center"}>
                      <Label htmlFor={"exportType"}>Export to:</Label>
                      <Select value={exportType} onValueChange={setExportType}>
                          <SelectTrigger id={"exportType"} className={"w-32"}>
                              <SelectValue/>
                          </SelectTrigger>
                          <SelectContent>
                              <SelectItem value={"csv"}>CSV</SelectItem>
                              <SelectItem disabled value={"pdf"}>PDF</SelectItem>
                          </SelectContent>
                      </Select>
                      <a href={`/api/export/${exportType}?eventId=${eventId}`}>
                          <Button>Export</Button>
                      </a>
                  </div>
              </DialogContent>
          </Dialog>
    );
}
