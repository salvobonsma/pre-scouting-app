'use client'

import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import React, {ReactNode} from "react";

export default function QuickTooltip({trigger, content}: {
    trigger: ReactNode,
    content: ReactNode
}) {
    return (
          <Tooltip>
              <TooltipTrigger type="button">{trigger}</TooltipTrigger>
              <TooltipContent>{content}</TooltipContent>
          </Tooltip>
    );
}