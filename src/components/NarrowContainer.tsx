// components/layout/NarrowContainer.tsx
import type { ReactNode } from "react";

type NarrowContainerProps = {
  children: ReactNode;
  className?: string;
};

const NarrowContainer = ({
  children,
  className = "",
}: NarrowContainerProps) => (
  <div
    className={`w-full max-w-[548px] px-4  md:px-0 md:pt-0 min-h-[388px] max-h-[388px]  md:min-h-[436px] bg-white rounded-2xl relative flex flex-col justify-between ${className}`}
  >
    {children}
  </div>
);

export default NarrowContainer;
