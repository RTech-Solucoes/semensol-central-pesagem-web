/* Types */

import { ListCollection } from "@chakra-ui/react";

export type Size = "sm" | "md" | "lg" | undefined;

export type InputVariant = "outline" | "subtle" | "flushed" | undefined;

export type SelectVariant = "outline" | "subtle" | undefined;

/* Interfaces */

export interface SelectOption {
  label: string,
  value: any,
  group?: string
}