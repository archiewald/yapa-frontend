import * as Yup from "yup";
import { setLocale } from "yup";

setLocale({
  mixed: {
    required: "This is a required field"
  }
});

export default Yup;
