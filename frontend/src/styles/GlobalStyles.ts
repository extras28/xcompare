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
    
    .excel-table th {
      background-color: var(--bs-secondary-bg) !important;
      color: var(--bs-emphasis-color) !important;
      border-color: var(--bs-border-color);
    }

    .excel-table td {
      background-color: var(--bs-tertiary-bg);
      color: var(--bs-body-color);
      border-color: var(--bs-border-color);
    }

    .card {
      border-color: var(--bs-border-color);
      background-color: var(--bs-tertiary-bg);
    }

    .diff-cell {
      background-color: var(--diff-bg-dark) !important;
      color: var(--diff-text-dark) !important;
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
    
    .excel-table th {
      background-color: var(--bs-secondary-bg) !important;
      color: var(--bs-emphasis-color) !important;
      border-color: var(--bs-border-color);
    }

    .excel-table td {
      background-color: var(--bs-tertiary-bg);
      color: var(--bs-body-color);
      border-color: var(--bs-border-color);
    }

    .card {
      border-color: var(--bs-border-color);
      background-color: var(--bs-tertiary-bg);
    }

    .diff-cell {
      background-color: var(--diff-bg-light) !important;
      color: var(--diff-text-light) !important;
    }

    .card-header.bg-primary {
      background-color: var(--bs-primary) !important;
    }

    .card-header.bg-success {
      background-color: var(--bs-success) !important;
    }
  }

  #root {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: row;
  }

  .excel-table { 
    font-size: 13px; 
    border-collapse: collapse; 
    margin-bottom: 24px; 
    width: 100%;
  }

  .excel-table th, .excel-table td {
    padding: 4px 8px;
    text-align: left;
    white-space: nowrap;
    max-width: 400px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .excel-table td {
    word-break: break-all;
    cursor: pointer;
  }

  .excel-table th {
    font-weight: 600;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .excel-table-wrapper {
    overflow: auto;
    width: 100%;
    max-height: 500px;
    border-radius: 4px;
  }

  .diff-cell {
    position: relative;
  }

  .diff-cell:hover::after {
    content: attr(title);
    position: absolute;
    left: 0;
    top: 100%;
    background: var(--bs-tertiary-bg);
    color: var(--bs-body-color);
    padding: 8px;
    border-radius: 4px;
    z-index: 2;
    white-space: normal;
    max-width: 300px;
    border: 1px solid var(--bs-border-color);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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
