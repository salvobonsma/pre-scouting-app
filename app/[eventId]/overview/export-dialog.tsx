'use client'

import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Label} from "@/components/ui/label";
import ExportCSV from "@/lib/database/export-csv"; // Adjust the path to where your ExportCSV function is located

export default function ExportDialog({eventId}: { eventId: number }) {
    const [exportType, setExportType] = useState("csv");

    async function downloadCSV() {
        try {
            const buffer = await ExportCSV(eventId);
            const blob = new Blob([buffer], {type: 'application/zip'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'matches.zip';
            document.body.appendChild(a);
            a.click();
            URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error downloading CSV:', error);
        }
    }

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
                      <Button onClick={downloadCSV}>Export</Button>
                  </div>
              </DialogContent>
          </Dialog>
    );
}
