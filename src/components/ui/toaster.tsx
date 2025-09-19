'use client';

import React from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && (
                <ToastTitle>
                  {typeof title === 'string'
                    ? title
                    : React.isValidElement(title)
                    ? title
                    : JSON.stringify(title)}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription>
                  {typeof description === 'string'
                    ? description
                    : React.isValidElement(description)
                    ? description
                    : JSON.stringify(description)}
                </ToastDescription>
              )}
            </div>
            {action && React.isValidElement(action) ? action : null}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
