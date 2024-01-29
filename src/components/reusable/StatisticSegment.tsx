"use client";

import React from "react";
import { SimpleGrid, SimpleGridProps } from "@mantine/core";
import { useLocale } from "next-intl";

export type StatisticData = {
  type: "number";
  title: string;
  data: number | string;
};

type StatisticSegmentProps = {
  data: StatisticData[] | null;
  isLoading?: boolean;
  loaderCount?: number;
};

const NumericData = ({ data }: { data: number }) => {
  const locale = useLocale();

  return <h2 className="my-0">{Intl.NumberFormat(locale).format(data)}</h2>;
};

const StatisticSegment = React.forwardRef<
  HTMLDivElement,
  SimpleGridProps & StatisticSegmentProps
>(({ data, isLoading, loaderCount, ...props }, ref) => {
  return (
    <SimpleGrid ref={ref} cols={{ base: 1, sm: 2, md: 4 }} {...props}>
      {isLoading ? (
        Array.from(Array(loaderCount).keys()).map((e, idx) => (
          <div
            key={idx}
            className="h-[90px] bg-slate-300/40 dark:bg-slate-800/50 rounded-lg animate-pulse"
          />
        ))
      ) : data ? (
        data.map((d, idx) => (
          <div
            key={idx}
            className="p-4 bg-slate-300/40 dark:bg-slate-800/50 rounded-lg"
          >
            <p className="my-0 opacity-75 dark:opacity-55 text-sm">{d.title}</p>
            {d.type === "number" ? (
              <NumericData data={d.data as number} />
            ) : (
              <></>
            )}
          </div>
        ))
      ) : (
        <></>
      )}
    </SimpleGrid>
  );
});

StatisticSegment.displayName = "StatisticSegment";

export default StatisticSegment;
