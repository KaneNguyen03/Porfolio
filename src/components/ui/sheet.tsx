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
  const [isOpen, setIsOpen] = React.useState(false);
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
      className={className}
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
}: {
  children: React.ReactNode;
  className?: string;
  side?: "top" | "bottom" | "left" | "right";
}) => {
  const context = React.useContext(SheetContext);
  if (!context) throw new Error("SheetContent must be used within Sheet");

  const content = (
    <AnimatePresence>
      {context.open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "linear" }}
            onClick={() => context.setOpen(false)}
            className="fixed inset-0 z-[99] bg-slate-950/40"
            style={{ willChange: "opacity" }}
          />

          {/* Content */}
          <motion.div
            initial={{ x: side === "right" ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: side === "right" ? "100%" : "-100%" }}
            transition={{ 
              type: "spring", 
              damping: 30, 
              stiffness: 300,
              mass: 1,
              restDelta: 0.5 
            }}
            className={cn(
              "fixed z-[100] bg-white dark:bg-slate-950 shadow-2xl outline-none",
              "h-[100dvh] w-[280px] sm:w-[350px]",
              side === "right" && "inset-y-0 right-0 border-l border-slate-200 dark:border-slate-800",
              side === "left" && "inset-y-0 left-0 border-r border-slate-200 dark:border-slate-800",
              className,
            )}
            style={{ 
              willChange: "transform",
              transform: "translateZ(0)" // Force GPU layer
            }}
          >
            <button
              className="absolute right-4 top-4 p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95"
              onClick={() => context.setOpen(false)}
            >
              <X size={20} />
              <span className="sr-only">Close</span>
            </button>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  if (typeof document === "undefined") return null;
  return createPortal(content, document.body);
};
