import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        Add_New_Item: "Add New Item",
        Name: "Name",
        "User Name": "Username",
        Email: "Email",
        Phone: "Phone",
        Status: "Status",
        Submit: "Submit",
        user_list_heading: "List Item",
        add_user_heading: "Create New Item",
        edit_user_heading: "Edit Item",
        active: "Active",
        inactive: "Inactive",
        unknown: "Unknown",
        name_required: "Name is required.",
        username_required: "Username is required.",
        username_invalid_format:
          "Username must be at least 6 characters and contain letters and numbers.",
        email_required: "Email is required.",
        email_invalid_format: "Invalid email format.",
        phone_required: "Phone number is required.",
        phone_just_numbers:
          "Phone number must be at least 10 digits and contain only numbers.",
        status_invalid_value: "Invalid status value.",
        /* Fibonacci */
        fibonacci_heading: "Fibonacci",
        enter_a_number: "Enter a number",
        /* Collatz */
        collatz_heading: "Collatz Conjecture",
        calculate: "Calculate Cycles",
        /* validation */
        validation: {
          number_required: "Number is required.",
          integer: "Number must be an integer.",
          min_zero: "Number must be greater than 0.",
        },
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
