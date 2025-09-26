import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "w-full rounded-md border border-gray-600 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 text-base shadow-sm outline-none focus:outline-none focus:border-red-400 resize-none",
        className
      )}
      {...props}
    />
  );
}

export { Textarea }
