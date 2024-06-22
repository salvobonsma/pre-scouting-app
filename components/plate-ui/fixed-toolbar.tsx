import {withCn} from '@udecode/cn';

import {Toolbar} from './toolbar';

export const FixedToolbar = withCn(
      Toolbar,
      'supports-backdrop-blur:bg-background/60 w-full justify-between overflow-x-auto bg-background/95 backdrop-blur'
);
