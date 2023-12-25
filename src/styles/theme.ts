"use client";

import {
  Button,
  Card,
  Divider,
  NavLink,
  PasswordInput,
  Select,
  TextInput,
  createTheme,
} from "@mantine/core";
import { generateColors } from "@mantine/colors-generator";
import buttonClasses from "@/styles/modules/Button.module.css";
import dividerClasses from "@/styles/modules/Divider.module.css";
import navLinkClasses from "@/styles/modules/NavLink.module.css";
import selectClasses from "@/styles/modules/Select.module.css";
import cardClasses from "@/styles/modules/Card.module.css";
import textInputClasses from "@/styles/modules/TextInput.module.css";
import passwordInputClasses from "@/styles/modules/PasswordInput.module.css";

export const theme = createTheme({
  primaryColor: "stockwave",
  colors: {
    stockwave: generateColors("#9D519F"),
    tomato: generateColors("#F06418"),
  },
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
      defaultProps: {
        radius: "xl",
      },
    }),
    NavLink: NavLink.extend({
      classNames: {
        root: navLinkClasses.root,
        label: navLinkClasses.label,
      },
    }),
    Select: Select.extend({
      classNames: {
        input: selectClasses.input,
        dropdown: selectClasses.dropdown,
        option: selectClasses.option,
      },
      defaultProps: {
        checkIconPosition: "right",
        comboboxProps: {
          transitionProps: { transition: "fade", duration: 100 },
        },
      },
    }),
    Card: Card.extend({
      classNames: {
        root: cardClasses.root,
      },
    }),
    TextInput: TextInput.extend({
      classNames: {
        input: textInputClasses.input,
        error: textInputClasses.error,
      },
      defaultProps: {
        radius: "md",
      },
    }),
    PasswordInput: PasswordInput.extend({
      classNames: {
        input: passwordInputClasses.input,
        error: passwordInputClasses.error,
      },
      defaultProps: {
        radius: "md",
      },
    }),
  },
  activeClassName: "",
});
