import { CSSProperties } from "react";
import { useTheme } from "../app/hooks";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  style?: CSSProperties;
}

export default function Skeleton({
  width = "100%",
  height = "1rem",
  borderRadius = "4px",
  className = "",
  style = {},
}: SkeletonProps) {
  const { theme } = useTheme();

  return (
    <div
      className={`animate-pulse ${className}`}
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: theme.primaryDark,
        ...style,
      }}
    />
  );
}
