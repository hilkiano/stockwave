import FilterSegment from "@/components/reusable/FilterSegment";
import React from "react";
import { NextIntlClientProvider, useMessages } from "next-intl";
import pick from "lodash/pick";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getProductStats } from "@/services/statisticService";
import ProductStatistics from "./components/ProductStatistics";
import ProductToolbar from "./components/ProductToolbar";
import { getProductList } from "@/services/productService";
import ProductList from "./components/ProductList";

export default async function Page() {
  const statsQuery = new QueryClient();
  await statsQuery.prefetchQuery({
    queryKey: ["productStats"],
    queryFn: getProductStats,
  });

  const listQuery = new QueryClient();
  await listQuery.prefetchQuery({
    queryKey: ["productList"],
    queryFn: getProductList,
  });

  return <PageContent statsQuery={statsQuery} listQuery={listQuery} />;
}

type ProductPageType = {
  statsQuery: QueryClient;
  listQuery: QueryClient;
};

function PageContent({ statsQuery, listQuery }: ProductPageType) {
  const messages = useMessages();

  return (
    <div className="flex mt-3 gap-3">
      <div className="hidden md:flex">
        <NextIntlClientProvider messages={pick(messages, ["Filter"])}>
          <FilterSegment className="w-[280px]" />
        </NextIntlClientProvider>
      </div>
      <div className="grow overflow-auto">
        {/* STATISTICS */}
        <HydrationBoundary state={dehydrate(statsQuery)}>
          <NextIntlClientProvider
            messages={pick(messages, ["Page.Products", "ErrorHandler"])}
          >
            <ProductStatistics />
          </NextIntlClientProvider>
        </HydrationBoundary>
        {/* TOOLBAR */}
        <NextIntlClientProvider messages={pick(messages, ["Page.Products"])}>
          <ProductToolbar className="mt-2 md:mt-4" />
        </NextIntlClientProvider>
        {/* LIST */}
        <HydrationBoundary state={dehydrate(listQuery)}>
          <NextIntlClientProvider
            messages={pick(messages, ["Page.Products", "ErrorHandler"])}
          >
            <ProductList className="mt-2 md:mt-4" />
          </NextIntlClientProvider>
        </HydrationBoundary>
      </div>
    </div>
  );
}
