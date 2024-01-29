"use client";

import { showError } from "@/services/errorHandler";
import { getProductList } from "@/services/productService";
import { SimpleGrid, SimpleGridProps } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";

const ProductList = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ ...props }, ref) => {
  const tError = useTranslations("ErrorHandler");
  const t = useTranslations("Page.Products");

  const {
    data: products,
    isLoading,
    isError,
    error: productError,
  } = useQuery<JsonSuccessResponseType<ListResultType<ProductModelType>>>({
    queryKey: ["productList"],
    queryFn: getProductList,
  });

  useEffect(() => {
    if (isError) {
      showError(tError("modal_title"), productError);
    }
  }, [isError, tError, productError]);

  return (
    <div ref={ref} {...props}>
      {isLoading ? (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>
          {Array.from(Array(4).keys()).map((e, idx) => (
            <div
              key={idx}
              className="h-[350px] bg-slate-300/40 dark:bg-slate-800/50 rounded-lg animate-pulse"
            />
          ))}
        </SimpleGrid>
      ) : products ? (
        products.result.rows.length > 0 ? (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>
            {products.result.rows.map((d, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-300/40 dark:bg-slate-800/50 rounded-lg"
              >
                {d.name}
              </div>
            ))}
          </SimpleGrid>
        ) : (
          <h4 className="my-0 text-center font-semibold mt-8 opacity-75">
            {t("no_data")}
          </h4>
        )
      ) : (
        <></>
      )}
    </div>
  );
});

ProductList.displayName = "ProductList";

export default ProductList;
