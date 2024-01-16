"use client";

import {
  Button,
  Card,
  Checkbox,
  Code,
  Divider,
  Modal,
  NavLink,
  PasswordInput,
  Select,
  Stepper,
  TextInput,
  Textarea,
  Notification,
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
import stepperClasses from "@/styles/modules/Stepper.module.css";
import modalClasses from "@/styles/modules/Modal.module.css";
import codeClasses from "@/styles/modules/Code.module.css";
import checkboxClasses from "@/styles/modules/Checkbox.module.css";
import notificationClasses from "@/styles/modules/Notification.module.css";

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
    Textarea: Textarea.extend({
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
        innerInput: passwordInputClasses.input,
        error: passwordInputClasses.error,
      },
      defaultProps: {
        radius: "md",
      },
    }),
    Stepper: Stepper.extend({
      classNames: {
        stepIcon: stepperClasses.stepIcon,
      },
    }),
    Modal: Modal.extend({
      classNames: {
        content: modalClasses.content,
        header: modalClasses.header,
      },
      defaultProps: {
        radius: "md",
      },
    }),
    Code: Code.extend({
      classNames: {
        root: codeClasses.root,
      },
    }),
    Checkbox: Checkbox.extend({
      classNames: {
        input: checkboxClasses.input,
      },
    }),
    Notification: Notification.extend({
      classNames: {
        root: notificationClasses.root,
      },
      styles: {
        root: {
          backdropFilter: "blur(5px)",
        },
      },
      defaultProps: {
        withBorder: true,
        radius: "md",
      },
    }),
  },
  activeClassName: "",
});
