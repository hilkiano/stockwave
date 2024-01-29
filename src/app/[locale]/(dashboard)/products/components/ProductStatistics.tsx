"use client";

import StatisticSegment, {
  StatisticData,
} from "@/components/reusable/StatisticSegment";
import { showError } from "@/services/errorHandler";
import { getProductStats } from "@/services/statisticService";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";

type ProductStatisticsType = {
  total: number;
  total_active: number;
};

function ProductStatistics() {
  const {
    data: stats,
    isLoading,
    isError,
    error: statsError,
  } = useQuery<
    JsonSuccessResponseType<JsonSuccessResponseType<ProductStatisticsType>>
  >({
    queryKey: ["productStats"],
    queryFn: getProductStats,
  });

  const tError = useTranslations("ErrorHandler");
  const t = useTranslations("Page.Products");

  useEffect(() => {
    if (isError) {
      showError(tError("modal_title"), statsError);
    }
  }, [isError, tError, statsError]);

  let data: StatisticData[] | null = null;
  if (stats) {
    data = Object.entries(stats.result).map(([key, value]) => {
      return {
        type: "number",
        title: t(key),
        data: value as number | string,
      };
    });
  }

  return (
    <StatisticSegment
      className="hidden md:grid"
      data={data}
      isLoading={isLoading}
      loaderCount={data ? data.length : 2}
    />
  );
}

export default ProductStatistics;
