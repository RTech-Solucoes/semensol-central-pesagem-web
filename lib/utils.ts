import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {usePathname} from "next/navigation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const selectedClasses = (
  isSelected: boolean,
  classesSelected: string,
  classesUnselected?: string,
): string => isSelected ? classesSelected : classesUnselected ?? ""