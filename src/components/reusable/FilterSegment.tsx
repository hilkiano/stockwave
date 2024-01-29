"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type FilterSegmentProps = React.HTMLProps<HTMLDivElement>;

const FilterSegment = React.forwardRef<HTMLDivElement, FilterSegmentProps>(
  ({ className, ...props }, ref) => {
    const t = useTranslations("Filter");

    return (
      <div
        ref={ref}
        style={{ backdropFilter: "blur(20px)" }}
        className={cn("px-3 py-3 w-[260px]", className)}
        {...props}
      >
        <p className="my-0 font-bold opacity-55 flex items-center">
          <i className="ti ti-filter me-2"></i>
          {t("header")}
        </p>
      </div>
    );
  }
);

FilterSegment.displayName = "FilterSegment";

export default FilterSegment;
