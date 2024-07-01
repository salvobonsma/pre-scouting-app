'use client';

import {withProps} from '@udecode/cn';
import {createPlugins, Plate, PlateLeaf, RenderAfterEditable} from '@udecode/plate-common';
import {createBlockquotePlugin, ELEMENT_BLOCKQUOTE} from '@udecode/plate-block-quote';
import {createHorizontalRulePlugin, ELEMENT_HR} from '@udecode/plate-horizontal-rule';
import {createLinkPlugin, ELEMENT_LINK} from '@udecode/plate-link';
import {createTogglePlugin, ELEMENT_TOGGLE} from '@udecode/plate-toggle';
import {createColumnPlugin, ELEMENT_COLUMN} from '@udecode/plate-layout';
import {createParagraphPlugin, ELEMENT_PARAGRAPH} from '@udecode/plate-paragraph';
import {
    createHeadingPlugin,
    ELEMENT_H1,
    ELEMENT_H2,
    ELEMENT_H3,
    ELEMENT_H4,
    ELEMENT_H5,
    ELEMENT_H6
} from '@udecode/plate-heading';
import {createTablePlugin, ELEMENT_TABLE, ELEMENT_TD, ELEMENT_TH, ELEMENT_TR} from '@udecode/plate-table';
import {createTodoListPlugin, ELEMENT_TODO_LI} from '@udecode/plate-list';
import {
    createBoldPlugin,
    createItalicPlugin,
    createStrikethroughPlugin,
    createSubscriptPlugin,
    createSuperscriptPlugin,
    createUnderlinePlugin,
    MARK_BOLD,
    MARK_ITALIC,
    MARK_STRIKETHROUGH,
    MARK_SUBSCRIPT,
    MARK_SUPERSCRIPT,
    MARK_UNDERLINE
} from '@udecode/plate-basic-marks';
import {createHighlightPlugin, MARK_HIGHLIGHT} from '@udecode/plate-highlight';
import {createKbdPlugin, MARK_KBD} from '@udecode/plate-kbd';
import {createIndentPlugin} from '@udecode/plate-indent';
import {createIndentListPlugin} from '@udecode/plate-indent-list';
import {createLineHeightPlugin} from '@udecode/plate-line-height';
import {createCaptionPlugin} from '@udecode/plate-caption';
import {createAutoformatPlugin} from '@udecode/plate-autoformat';
import {createBlockSelectionPlugin} from '@udecode/plate-selection';
import {createExitBreakPlugin, createSoftBreakPlugin} from '@udecode/plate-break';
import {createNodeIdPlugin} from '@udecode/plate-node-id';
import {createResetNodePlugin} from '@udecode/plate-reset-node';
import {createDeletePlugin} from '@udecode/plate-select';
import {createTabbablePlugin} from '@udecode/plate-tabbable';
import {createTrailingBlockPlugin} from '@udecode/plate-trailing-block';
import {createDeserializeDocxPlugin} from '@udecode/plate-serializer-docx';
import {createDeserializeCsvPlugin} from '@udecode/plate-serializer-csv';
import {createDeserializeMdPlugin} from '@udecode/plate-serializer-md';

import {BlockquoteElement} from '@/components/plate-ui/blockquote-element';
import {HrElement} from '@/components/plate-ui/hr-element';
import {LinkElement} from '@/components/plate-ui/link-element';
import {LinkFloatingToolbar} from '@/components/plate-ui/link-floating-toolbar';
import {ToggleElement} from '@/components/plate-ui/toggle-element';
import {ColumnElement} from '@/components/plate-ui/column-element';
import {HeadingElement} from '@/components/plate-ui/heading-element';
import {ParagraphElement} from '@/components/plate-ui/paragraph-element';
import {TableElement} from '@/components/plate-ui/table-element';
import {TableRowElement} from '@/components/plate-ui/table-row-element';
import {TableCellElement, TableCellHeaderElement} from '@/components/plate-ui/table-cell-element';
import {TodoListElement} from '@/components/plate-ui/todo-list-element';
import {HighlightLeaf} from '@/components/plate-ui/highlight-leaf';
import {KbdLeaf} from '@/components/plate-ui/kbd-leaf';
import {Editor} from '@/components/plate-ui/editor';
import {FixedToolbar} from '@/components/plate-ui/fixed-toolbar';
import {FixedToolbarButtons} from '@/components/plate-ui/fixed-toolbar-buttons';
import {FloatingToolbar} from '@/components/plate-ui/floating-toolbar';
import {FloatingToolbarButtons} from '@/components/plate-ui/floating-toolbar-buttons';
import * as React from "react";

const plugins = createPlugins(
      [
          createBlockquotePlugin(),
          createHorizontalRulePlugin(),
          createLinkPlugin({
              renderAfterEditable: LinkFloatingToolbar as RenderAfterEditable,
          }),
          createTogglePlugin(),
          createColumnPlugin(),
          createParagraphPlugin(),
          createHeadingPlugin(),
          createTablePlugin(),
          createTodoListPlugin(),
          createBoldPlugin(),
          createItalicPlugin(),
          createUnderlinePlugin(),
          createStrikethroughPlugin(),
          createSubscriptPlugin(),
          createSuperscriptPlugin(),
          createHighlightPlugin(),
          createKbdPlugin(),
          createIndentPlugin({
              inject: {
                  props: {
                      validTypes: [
                          ELEMENT_PARAGRAPH,
                          // ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_BLOCKQUOTE, ELEMENT_CODE_BLOCK
                      ],
                  },
              },
          }),
          createIndentListPlugin({
              inject: {
                  props: {
                      validTypes: [
                          ELEMENT_PARAGRAPH,
                          // ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_BLOCKQUOTE, ELEMENT_CODE_BLOCK
                      ],
                  },
              },
          }),
          createLineHeightPlugin({
              inject: {
                  props: {
                      defaultNodeValue: 1.5,
                      validNodeValues: [1, 1.2, 1.5, 2, 3],
                      validTypes: [
                          ELEMENT_PARAGRAPH,
                          // ELEMENT_H1, ELEMENT_H2, ELEMENT_H3
                      ],
                  },
              },
          }),
          createCaptionPlugin({
              options: {
                  pluginKeys: [
                      // ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED
                  ]
              },
          }),
          createAutoformatPlugin({
              options: {
                  rules: [
                      // Usage: https://platejs.org/docs/autoformat
                  ],
                  enableUndoOnDelete: true,
              },
          }),
          createBlockSelectionPlugin({
              options: {
                  sizes: {
                      top: 0,
                      bottom: 0,
                  },
              },
          }),
          createExitBreakPlugin({
              options: {
                  rules: [
                      {
                          hotkey: 'mod+enter',
                      },
                      {
                          hotkey: 'mod+shift+enter',
                          before: true,
                      },
                      {
                          hotkey: 'enter',
                          query: {
                              start: true,
                              end: true,
                              // allow: KEYS_HEADING,
                          },
                          relative: true,
                          level: 1,
                      },
                  ],
              },
          }),
          createNodeIdPlugin(),
          createResetNodePlugin({
              options: {
                  rules: [
                      // Usage: https://platejs.org/docs/reset-node
                  ],
              },
          }),
          createDeletePlugin(),
          createSoftBreakPlugin({
              options: {
                  rules: [
                      {hotkey: 'shift+enter'},
                      {
                          hotkey: 'enter',
                          query: {
                              allow: [
                                  // ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE, ELEMENT_TD
                              ],
                          },
                      },
                  ],
              },
          }),
          createTabbablePlugin(),
          createTrailingBlockPlugin({
              options: {type: ELEMENT_PARAGRAPH},
          }),
          createDeserializeDocxPlugin(),
          createDeserializeCsvPlugin(),
          createDeserializeMdPlugin(),
      ],
      {
          components: {
              [ELEMENT_BLOCKQUOTE]: BlockquoteElement,
              [ELEMENT_HR]: HrElement,
              [ELEMENT_LINK]: LinkElement,
              [ELEMENT_TOGGLE]: ToggleElement,
              [ELEMENT_COLUMN]: ColumnElement,
              [ELEMENT_H1]: withProps(HeadingElement, {variant: 'h1'}),
              [ELEMENT_H2]: withProps(HeadingElement, {variant: 'h2'}),
              [ELEMENT_H3]: withProps(HeadingElement, {variant: 'h3'}),
              [ELEMENT_H4]: withProps(HeadingElement, {variant: 'h4'}),
              [ELEMENT_H5]: withProps(HeadingElement, {variant: 'h5'}),
              [ELEMENT_H6]: withProps(HeadingElement, {variant: 'h6'}),
              [ELEMENT_PARAGRAPH]: ParagraphElement,
              [ELEMENT_TABLE]: TableElement,
              [ELEMENT_TR]: TableRowElement,
              [ELEMENT_TD]: TableCellElement,
              [ELEMENT_TH]: TableCellHeaderElement,
              [ELEMENT_TODO_LI]: TodoListElement,
              [MARK_BOLD]: withProps(PlateLeaf, {as: 'strong'}),
              [MARK_HIGHLIGHT]: HighlightLeaf,
              [MARK_ITALIC]: withProps(PlateLeaf, {as: 'em'}),
              [MARK_KBD]: KbdLeaf,
              [MARK_STRIKETHROUGH]: withProps(PlateLeaf, {as: 's'}),
              [MARK_SUBSCRIPT]: withProps(PlateLeaf, {as: 'sub'}),
              [MARK_SUPERSCRIPT]: withProps(PlateLeaf, {as: 'sup'}),
              [MARK_UNDERLINE]: withProps(PlateLeaf, {as: 'u'}),
          },
      }
);

export default function RichTextarea({initialValue, readOnly, modeDropdown, onChange}: {
    modeDropdown?: boolean
    readOnly?: boolean,
    initialValue?: { id: string, type: string, children: { text: string }[] }[],
    onChange?: ((value: { id: string, type: string, children: { text: string }[] }[]) => void)
}) {
    return (
          <Plate plugins={plugins} initialValue={initialValue} readOnly={readOnly} onChange={onChange}>
              <FixedToolbar>
                  <FixedToolbarButtons modeDropdown={modeDropdown ?? false}/>
              </FixedToolbar>
              <Editor focusRing={false}/>
              <FloatingToolbar>
                  <FloatingToolbarButtons/>
              </FloatingToolbar>
          </Plate>
    );
}