import * as Yup from "yup";
import { setLocale } from "yup";

setLocale({
  mixed: {
    required: "This is a required field"
  },
  string: {
    email: "Please provide a valid email"
  }
});

export const yup = Yup;
