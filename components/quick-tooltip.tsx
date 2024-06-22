'use client'

import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import React, {ReactNode} from "react";

export default function QuickTooltip({trigger, content}: {
    trigger: ReactNode,
    content: ReactNode
}) {
    return (
          <TooltipProvider delayDuration={100}>
              <Tooltip>
                  <TooltipTrigger>{trigger}</TooltipTrigger>
                  <TooltipContent>{content}</TooltipContent>
              </Tooltip>
          </TooltipProvider>
    );
}