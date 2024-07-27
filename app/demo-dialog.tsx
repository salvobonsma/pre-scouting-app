'use client'

import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";

export default function DemoDialog() {
    return (
          <Dialog defaultOpen>
              <DialogContent>
                  <DialogHeader>
                      <DialogTitle>Welcome to the pre-scouting-app demo!</DialogTitle>
                      <DialogDescription>
                          Some actions are limited to lessen server and API loads.
                      </DialogDescription>
                  </DialogHeader>
              </DialogContent>
          </Dialog>

    )
}