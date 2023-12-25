"use client";

import { Button, Divider, NavLink, createTheme } from "@mantine/core";
import buttonClasses from "@/styles/modules/Button.module.css";
import dividerClasses from "@/styles/modules/Divider.module.css";
import navLinkClasses from "@/styles/modules/NavLink.module.css";

export const theme = createTheme({
  primaryColor: "teal",
  components: {
    Divider: Divider.extend({
      classNames: {
        root: dividerClasses.root,
      },
    }),
    Button: Button.extend({
      classNames: {
        root: buttonClasses.root,
      },
    }),
    NavLink: NavLink.extend({
      classNames: {
        root: navLinkClasses.root,
        label: navLinkClasses.label,
      },
    }),
  },
  activeClassName: "",
});
