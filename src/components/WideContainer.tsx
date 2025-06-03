// components/layout/WideContainer.tsx
import type { ReactNode } from "react";

type WideContainerProps = {
  children: ReactNode;
  className?: string;
};

const WideContainer = ({ children, className = "" }: WideContainerProps) => (
  <div className={`w-full max-w-[1140px] ${className}`}>{children}</div>
);

export default WideContainer;
