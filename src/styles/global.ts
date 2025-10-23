import { css } from "@emotion/react";

export const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: "Inter", "Segoe UI", sans-serif;
    background-color: #f9fafb;
    color: #333;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  button {
    cursor: pointer;
  }
  input, select, button {
    font-family: inherit;
  }
`;