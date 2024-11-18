"use client";

import {
  DialogContent as DesktopDialogContent,
  DialogDescription as DesktopDialogDescription,
  DialogFooter as DesktopDialogFooter,
  DialogHeader as DesktopDialogHeader,
  DialogTitle as DesktopDialogTitle,
  Dialog,
  DialogClose,
  DialogOverlay,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
} from "@/components/ui/drawer";
import useMediaQuery from "@/hooks/use-media-query";
import { DialogPortal, DialogTrigger } from "@radix-ui/react-dialog";
import * as React from "react";

const DEFAULT_DESKTOP_MEDIA_QUERY = "(min-width: 768px)";

const ResponsiveDialogContext = React.createContext<{ isDesktop: boolean }>({
  isDesktop: true,
});

const ResponsiveDialog: React.FC<
  React.ComponentPropsWithoutRef<typeof Dialog> & {
    mediaQuery?: string;
  }
> = ({ children, mediaQuery = DEFAULT_DESKTOP_MEDIA_QUERY, ...props }) => {
  const isDesktop = useMediaQuery(mediaQuery);
  const DialogComponent = isDesktop ? Dialog : Drawer;

  return (
    <ResponsiveDialogContext.Provider value={{ isDesktop }}>
      <DialogComponent {...props}>{children}</DialogComponent>
    </ResponsiveDialogContext.Provider>
  );
};

const ResponsiveDialogContent = React.forwardRef<
  React.ElementRef<typeof DesktopDialogContent>,
  React.ComponentPropsWithoutRef<typeof DesktopDialogContent>
>((props, ref) => {
  const { isDesktop } = React.useContext(ResponsiveDialogContext);

  if (isDesktop) {
    return <DesktopDialogContent {...props} ref={ref} />;
  }
  return <DrawerContent {...props} ref={ref} />;
});
ResponsiveDialogContent.displayName = "ResponsiveDialogContent";

const ResponsiveDialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogOverlay>,
  React.ComponentPropsWithoutRef<typeof DialogOverlay>
>((props, ref) => {
  const { isDesktop } = React.useContext(ResponsiveDialogContext);

  if (isDesktop) {
    return <DialogOverlay {...props} ref={ref} />;
  }
  return <DrawerOverlay {...props} ref={ref} />;
});
ResponsiveDialogOverlay.displayName = "ResponsiveDialogOverlay";

const ResponsiveDialogHeader = (
  props: React.HTMLAttributes<HTMLDivElement>
) => {
  const { isDesktop } = React.useContext(ResponsiveDialogContext);

  if (isDesktop) {
    return <DesktopDialogHeader {...props} />;
  }
  return <DrawerHeader {...props} />;
};
ResponsiveDialogHeader.displayName = "ResponsiveDialogHeader";

const ResponsiveDialogFooter = (
  props: React.HTMLAttributes<HTMLDivElement>
) => {
  const { isDesktop } = React.useContext(ResponsiveDialogContext);

  if (isDesktop) {
    return <DesktopDialogFooter {...props} />;
  }
  return <DrawerFooter {...props} />;
};
ResponsiveDialogFooter.displayName = "ResponsiveDialogFooter";

const ResponsiveDialogTitle = React.forwardRef<
  React.ElementRef<typeof DesktopDialogTitle>,
  React.ComponentPropsWithoutRef<typeof DesktopDialogTitle>
>((props, ref) => {
  const { isDesktop } = React.useContext(ResponsiveDialogContext);

  if (isDesktop) {
    return <DesktopDialogTitle {...props} ref={ref} />;
  }
  return <DrawerTitle {...props} ref={ref} />;
});
ResponsiveDialogTitle.displayName = "ResponsiveDialogTitle";

const ResponsiveDialogDescription = React.forwardRef<
  React.ElementRef<typeof DesktopDialogDescription>,
  React.ComponentPropsWithoutRef<typeof DesktopDialogDescription>
>((props, ref) => {
  const { isDesktop } = React.useContext(ResponsiveDialogContext);

  if (isDesktop) {
    return <DesktopDialogDescription {...props} ref={ref} />;
  }
  return <DrawerDescription {...props} ref={ref} />;
});
ResponsiveDialogDescription.displayName = "ResponsiveDialogDescription";

const ResponsiveDialogClose = DialogClose;
const ResponsiveDialogPortal = DialogPortal;
const ResponsiveDialogTrigger = DialogTrigger;

export {
  ResponsiveDialog,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogOverlay,
  ResponsiveDialogPortal,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
};
