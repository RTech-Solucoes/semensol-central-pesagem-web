import React from "react";
import {
  Table as HeroTable,
  TableHeader as HeroTableHeader,
  TableColumn as HeroTableColumn,
  TableBody as HeroTableBody,
  TableRow as HeroTableRow,
  TableCell as HeroTableCell,
} from "@heroui/table";
import { cn } from "@/lib/utils";

const Table = React.forwardRef<
  React.ElementRef<typeof HeroTable>,
  React.ComponentPropsWithoutRef<typeof HeroTable>
>(({ className, ...props }, ref) => (
  <HeroTable
    ref={ref}
    className={cn("w-full", className)}
    {...props}
  />
));

Table.displayName = "Table";

export {
  Table,
  HeroTableHeader as TableHeader,
  HeroTableColumn as TableColumn,
  HeroTableBody as TableBody,
  HeroTableRow as TableRow,
  HeroTableCell as TableCell,
};
