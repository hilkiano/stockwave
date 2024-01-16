import { NextIntlClientProvider, useMessages } from "next-intl";
import pick from "lodash/pick";
import RegisterStep from "./components/RegisterStep";
import React from "react";
import { getPlans } from "@/services/planService";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Page() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["plans"],
    queryFn: getPlans,
  });

  return <PageContent queryClient={queryClient} />;
}

const PageContent = ({ queryClient }: { queryClient: QueryClient }) => {
  const messages = useMessages();

  return (
    <React.Fragment>
      <NextIntlClientProvider
        messages={pick(messages, ["Page.Register", "ErrorHandler"])}
      >
        <HydrationBoundary state={dehydrate(queryClient)}>
          <RegisterStep />
        </HydrationBoundary>
      </NextIntlClientProvider>
    </React.Fragment>
  );
};
