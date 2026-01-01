import * as React from 'react';

import { cn } from '../../lib/utils';

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn('text-sm font-semibold leading-none text-slate-700 dark:text-slate-200', className)}
      {...props}
    />
  )
);
Label.displayName = 'Label';

export { Label };
