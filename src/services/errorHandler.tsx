import { Code, ScrollArea } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import React from "react";

/**
 * Show Error to UI depends from the error code.
 *
 * @param title
 * @param error
 */
export const showError = (title: string, error: Error) => {
  const errorObj = error.cause as JsonFailedResponseType;

  if (errorObj.code === 500) {
    modals.open({
      centered: true,
      size: "xl",
      title: title,
      children: (
        <div className="grid grid-cols-1 gap-2">
          <p className="text-red-500 font-bold my-0">{errorObj.message}</p>
          {errorObj.trace && (
            <ScrollArea h={300}>
              <Code block>{errorObj.trace}</Code>
            </ScrollArea>
          )}
        </div>
      ),
    });
  } else {
    notifications.show({
      icon: <i className="ti ti-exclamation-circle"></i>,
      color: "red",
      title: title,
      message: `${errorObj.code}: ${errorObj.message}`,
    });
  }
};
