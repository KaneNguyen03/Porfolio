import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils";

const SheetContext = React.createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
} | null>(null);

export const Sheet = ({
  children,
  open,
  onOpenChange,
}: {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = React.useState(false); // Internal state if uncontrolled
  const state = open !== undefined ? open : isOpen;
  const setState = onOpenChange || setIsOpen;

  return (
    <SheetContext.Provider value={{ open: state, setOpen: setState }}>
      {children}
    </SheetContext.Provider>
  );
};

export const SheetTrigger = ({
  children,
  asChild,
  className,
}: {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}) => {
  const context = React.useContext(SheetContext);
  if (!context)
    throw new Error("SheetTrigger must be used within specific Sheet");

  // Handle asChild: clone the child and inject onClick
  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{
      onClick?: (e: React.MouseEvent) => void;
    }>;
    return React.cloneElement(child, {
      onClick: (e: React.MouseEvent) => {
        child.props.onClick?.(e);
        context.setOpen(true);
      },
    });
  }

  return (
    <button
      type="button"
      className={cn("bg-transparent", className)}
      onClick={() => context.setOpen(true)}
    >
      {children}
    </button>
  );
};

export const SheetContent = ({
  children,
  className,
  side = "right",
  forceMount = false,
}: {
  children: React.ReactNode;
  className?: string;
  side?: "top" | "bottom" | "left" | "right";
  forceMount?: boolean;
}) => {
  const context = React.useContext(SheetContext);
  if (!context) throw new Error("SheetContent must be used within Sheet");

  const variants = {
    initial: {
      x: side === "right" ? "100%" : side === "left" ? "-100%" : 0,
      y: side === "bottom" ? "100%" : side === "top" ? "-100%" : 0,
    },
    animate: { x: 0, y: 0 },
    exit: {
      x: side === "right" ? "100%" : side === "left" ? "-100%" : 0,
      y: side === "bottom" ? "100%" : side === "top" ? "-100%" : 0,
    },
  };

  const isVisible = forceMount || context.open;

  const content = (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          {context.open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => context.setOpen(false)}
              className="fixed inset-0 z-[99] bg-black/80 backdrop-blur-sm"
            />
          )}

          {/* Content */}
          {(forceMount || context.open) && (
            <motion.div
              variants={variants}
              initial="initial"
              animate={context.open ? "animate" : "initial"}
              exit="exit"
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className={cn(
                "fixed z-[100] gap-4 bg-white dark:bg-slate-950 p-6 shadow-lg",
                !context.open && "pointer-events-none invisible", // Hide if not open but force-mounted
                side === "right" &&
                  "inset-y-0 right-0 h-full w-3/4 border-l dark:border-slate-800 sm:max-w-sm",
                side === "left" &&
                  "inset-y-0 left-0 h-full w-3/4 border-r dark:border-slate-800 sm:max-w-sm",
                side === "top" &&
                  "inset-x-0 top-0 border-b dark:border-slate-800",
                side === "bottom" &&
                  "inset-x-0 bottom-0 border-t dark:border-slate-800",
                className,
              )}
            >
              <div className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                <X
                  className="h-4 w-4 cursor-pointer text-slate-500 dark:text-slate-400"
                  onClick={() => context.setOpen(false)}
                />
                <span className="sr-only">Close</span>
              </div>
              {children}
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );

  // SSR check
  if (typeof document === "undefined") return null;

  return createPortal(content, document.body);
};

export const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);

export const SheetTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn(
      "text-lg font-semibold text-slate-950 dark:text-white",
      className,
    )}
    {...props}
  />
);
