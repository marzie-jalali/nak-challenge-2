import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Global } from "@emotion/react";
import { globalStyles } from "./styles/global";
import "./index.css";
import "./i18n";
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Global styles={globalStyles} />
    <App />
  </StrictMode>,
)
