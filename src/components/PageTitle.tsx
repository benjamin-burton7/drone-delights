// components/PageTitle.tsx
import type { ReactNode } from "react";

type PageTitleProps = {
  children: ReactNode;
};

const PageTitle = ({ children }: PageTitleProps) => (
  <h1 className="pt-[110px] mb-8 text-center font-futura text-6xl md:text-8xl">
    {children}
  </h1>
);

export default PageTitle;
