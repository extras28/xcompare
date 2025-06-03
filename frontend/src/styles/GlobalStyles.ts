import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    src: url('/assets/fonts/roboto/Roboto-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Roboto';
    src: url('/assets/fonts/roboto/Roboto-Bold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  :root {
    --app-bg-light: #f8fafc;
    --app-bg-dark: #0f172a;
    --component-bg-light: #ffffff;
    --component-bg-dark: #1e293b;
    --sidebar-bg-light: #ffffff;
    --sidebar-bg-dark: #1e293b;
    --diff-bg-light: #ffebee;
    --diff-text-light: #c62828;
    --diff-bg-dark: #311b1b;
    --diff-text-dark: #ff8a80;
  }

  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    font-size: 13px;
    font-family: 'Roboto', Arial, sans-serif;
    overflow-x: hidden;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  [data-bs-theme="dark"] {
    --bs-body-bg: var(--app-bg-dark);
    --bs-tertiary-bg: var(--component-bg-dark);

    .card {
      border-color: var(--bs-border-color);
      background-color: var(--bs-tertiary-bg);
    }

    .card-header.bg-primary {
      background-color: var(--bs-primary) !important;
    }

    .card-header.bg-success {
      background-color: var(--bs-success) !important;
    }
  }

  [data-bs-theme="light"] {
    --bs-body-bg: var(--app-bg-light);
    --bs-tertiary-bg: var(--component-bg-light);

    .card {
      border-color: var(--bs-border-color);
      background-color: var(--bs-tertiary-bg);
    }
  }

  #root {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: row;
  }

  /* Form controls */
  .form-label, .form-control, .btn, .upload-form, .mb-3 {
    font-size: 13px !important;
  }

  .form-control {
    padding: 3px 8px;
    height: 2rem;
  }

  .btn {
    padding: 6px 0;
  }

  /* Media queries */
  @media (max-width: 768px) {
    .compare-row {
      flex-direction: column;
    }
  }

  @media (max-width: 991.98px) {
    .sidebar {
      position: fixed;
      left: 0;
      top: 0;
      min-width: 80vw;
      max-width: 90vw;
      width: 80vw;
      height: 100vh;
      z-index: 1050;
    }
  }
`;
