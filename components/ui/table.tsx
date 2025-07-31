import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { cn } from "@/lib/utils";

const Table = React.forwardRef<
  React.ElementRef<typeof Table>,
  React.ComponentPropsWithoutRef<typeof Table>
>(({ className, ...props }, ref) => (
  <Table
    ref={ref}
    className={cn("w-full", className)}
    {...props}
  />
));

Table.displayName = "Table";

export {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
};
