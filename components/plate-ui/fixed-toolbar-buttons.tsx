import React from 'react';

import {MARK_BOLD, MARK_ITALIC, MARK_STRIKETHROUGH, MARK_UNDERLINE,} from '@udecode/plate-basic-marks';
import {useEditorReadOnly} from '@udecode/plate-common';

import {Icons} from '@/components/icons';

import {MarkToolbarButton} from './mark-toolbar-button';
import {ToolbarGroup} from './toolbar';
import {TurnIntoDropdownMenu} from './turn-into-dropdown-menu';
import {ModeDropdownMenu} from "@/components/plate-ui/mode-dropdown-menu";

export function FixedToolbarButtons({modeDropdown}: {
    modeDropdown: boolean
}) {
    const readOnly = useEditorReadOnly();

    return (
          <div className="w-full overflow-hidden">
              <div
                    className="flex flex-wrap"
                    style={{
                        transform: 'translateX(calc(-1px))',
                    }}
              >
                  {!readOnly && (
                        <>
                            <ToolbarGroup noSeparator>
                                <TurnIntoDropdownMenu/>
                            </ToolbarGroup>

                            <ToolbarGroup>
                                <MarkToolbarButton nodeType={MARK_BOLD} tooltip="Bold (⌘+B)">
                                    <Icons.bold/>
                                </MarkToolbarButton>
                                <MarkToolbarButton nodeType={MARK_ITALIC} tooltip="Italic (⌘+I)">
                                    <Icons.italic/>
                                </MarkToolbarButton>
                                <MarkToolbarButton
                                      nodeType={MARK_UNDERLINE}
                                      tooltip="Underline (⌘+U)"
                                >
                                    <Icons.underline/>
                                </MarkToolbarButton>

                                <MarkToolbarButton
                                      nodeType={MARK_STRIKETHROUGH}
                                      tooltip="Strikethrough (⌘+⇧+M)"
                                >
                                    <Icons.strikethrough/>
                                </MarkToolbarButton>
                            </ToolbarGroup>
                        </>
                  )}

                  <div className="grow"/>

                  {modeDropdown && (<ModeDropdownMenu/>)}
              </div>
          </div>
    );
}
