"use client";

import * as React from "react";
import type { ToastProps } from "@/components/ui/toast";

export type ToastActionElement = React.ReactElement<typeof import("./toast").ToastAction>;

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 1000;

type ToastState = {
  toasts: ToasterToast[];
};

const ADD_TOAST = "ADD_TOAST";
const UPDATE_TOAST = "UPDATE_TOAST";
const DISMISS_TOAST = "DISMISS_TOAST";
const REMOVE_TOAST = "REMOVE_TOAST";

type Action =
  | { type: typeof ADD_TOAST; toast: ToasterToast }
  | { type: typeof UPDATE_TOAST; toast: Partial<ToasterToast> & { id: string } }
  | { type: typeof DISMISS_TOAST; toastId?: string }
  | { type: typeof REMOVE_TOAST; toastId?: string };

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({ type: REMOVE_TOAST, toastId });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

const reducer = (state: ToastState, action: Action): ToastState => {
  switch (action.type) {
    case ADD_TOAST: {
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };
    }
    case UPDATE_TOAST: {
      return {
        ...state,
        toasts: state.toasts.map((toast) =>
          toast.id === action.toast.id ? { ...toast, ...action.toast } : toast,
        ),
      };
    }
    case DISMISS_TOAST: {
      if (action.toastId) {
        addToRemoveQueue(action.toastId);
      } else {
        state.toasts.forEach((toast) => addToRemoveQueue(toast.id));
      }

      return {
        ...state,
        toasts: state.toasts.map((toast) =>
          toast.id === action.toastId || action.toastId === undefined
            ? { ...toast, open: false }
            : toast,
        ),
      };
    }
    case REMOVE_TOAST: {
      return {
        ...state,
        toasts: state.toasts.filter(
          (toast) => toast.id !== action.toastId && action.toastId !== undefined,
        ),
      };
    }
    default:
      return state;
  }
};

const listeners: Array<(state: ToastState) => void> = [];
let memoryState: ToastState = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}

export function useToast() {
  const [state, setState] = React.useState<ToastState>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  return {
    ...state,
    toast: (props: Omit<ToasterToast, "id">) => {
      const id = Math.random().toString(36).slice(2, 9);
      const toast: ToasterToast = {
        open: true,
        id,
        ...props,
      };

      dispatch({ type: ADD_TOAST, toast });

      return {
        id,
        dismiss: () => dispatch({ type: DISMISS_TOAST, toastId: id }),
        update: (props: Partial<ToasterToast>) =>
          dispatch({ type: UPDATE_TOAST, toast: { id, ...props } }),
      };
    },
    dismiss: (toastId?: string) => dispatch({ type: DISMISS_TOAST, toastId }),
  };
}
