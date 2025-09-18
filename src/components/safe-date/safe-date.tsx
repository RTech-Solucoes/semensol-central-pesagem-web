import { useEffect, useState } from "react";

interface SafeDateProps {
  dateString: string;
  options?: Intl.DateTimeFormatOptions;
}

export function SafeDate({ dateString, options }: SafeDateProps) {
  const [formatted, setFormatted] = useState("");
  useEffect(() => {
    setFormatted(new Date(dateString).toLocaleString("pt-BR", options));
  }, [dateString, options]);
  return <>{formatted}</>;
}
