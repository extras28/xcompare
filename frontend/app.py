from flask import Flask, render_template_string, request
import requests
import io
import pandas as pd

app = Flask(__name__)

HTML = '''
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>So sánh file Excel</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="/static/assets/fontawesomes/version_6_pro/css/all.css" rel="stylesheet">
  <style>
    @font-face {
      font-family: 'Roboto';
      src: url("{{ url_for('static', filename='assets/fonts/roboto/Roboto-Regular.ttf') }}") format('truetype');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Roboto';
      src: url("{{ url_for('static', filename='assets/fonts/roboto/Roboto-Bold.ttf') }}") format('truetype');
      font-weight: 700;
      font-style: normal;
      font-display: swap;
    }
    html, body {
      height: 100%;
      margin: 0;
      padding: 0;
      font-size: 13px;
      font-family: 'Roboto', Arial, sans-serif;
    }
    body, .d-flex.flex-row.h-100 {
      min-height: 100vh;
      height: 100vh;
      overflow: hidden;
      font-size: 13px;
      display: flex;
      flex-direction: row;
    }
    .sidebar {
      min-width: 180px;
      max-width: 220px;
      background: var(--bs-body-bg);
      border-right: 1.5px solid var(--bs-border-color-translucent);
      box-shadow: 2px 0 8px rgba(25, 118, 210, 0.04);
      min-height: 100vh;
      height: 100vh;
      overflow: hidden;
      font-size: 13px;
      position: relative;
      z-index: 2;
      transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), min-width 0.2s, max-width 0.2s, padding 0.2s;
      display: flex;
      flex-direction: column;
    }
    .sidebar-hidden {
      transform: translateX(-100%);
      min-width: 0 !important;
      max-width: 0 !important;
      padding: 0 !important;
      border: none !important;
    }
    .header-bar {
      width: 100%;
      background: var(--bs-primary);
      color: var(--bs-light);
      font-size: 1.1rem;
      font-weight: 600;
      padding: 10px 16px;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--bs-primary-border-subtle);
      position: relative;
      z-index: 3;
      min-height: 48px;
    }
    .header-bar .sidebar-toggle-btn, .header-bar .theme-toggle-btn {
      color: var(--bs-light) !important;
      background: none !important;
    }
    [data-bs-theme="light"] .header-bar .sidebar-toggle-btn,
    [data-bs-theme="light"] .header-bar .theme-toggle-btn {
      color: var(--bs-light) !important;
      background: none !important;
    }
    .sidebar-toggle-btn, .theme-toggle-btn {
      background: none;
      border: none;
      color: var(--bs-light);
      font-size: 1.3rem;
      margin-right: 10px;
      cursor: pointer;
      padding: 2px 6px;
      border-radius: 4px;
      transition: background 0.2s, color 0.2s;
    }
    [data-bs-theme="light"] .sidebar-toggle-btn,
    [data-bs-theme="light"] .theme-toggle-btn {
      color: var(--bs-primary);
      background: rgba(0,0,0,0.04);
    }
    [data-bs-theme="light"] .sidebar-toggle-btn:hover,
    [data-bs-theme="light"] .theme-toggle-btn:hover {
      background: rgba(0,0,0,0.10);
    }
    .main-content {
      display: flex;
      flex-direction: column;
      height: 100vh;
      min-width: 0;
      flex: 1 1 0%;
    }
    .header-bar {
      position: sticky;
      top: 0;
      z-index: 100;
    }
    main.flex-grow-1.d-flex.flex-column {
      flex: 1 1 0%;
      min-height: 0;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .content-header {
      position: sticky;
      top: 48px; /* height of .header-bar */
      z-index: 99;
      background: var(--bs-body-bg);
      padding: 16px 16px 0 16px;
    }
    .messages {
      flex: 1 1 0%;
      min-height: 0;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 12px;
      background: none;
      /* smooth scroll */
      scroll-behavior: smooth;
    }
    .message {
      background: var(--bs-info-bg-subtle);
      border-radius: 7px;
      padding: 10px;
      font-size: 13px;
      white-space: pre-wrap;
      word-break: break-word;
      border: 1px solid var(--bs-primary);
      color: var(--bs-body-color);
    }
    .form-label, .form-control, .btn, .upload-form, .mb-3 {
      font-size: 13px !important;
    }
    .form-control {
      padding: 3px 8px;
      height: 2rem;
      font-size: 13px;
    }
    .btn {
      padding: 6px 0;
      font-size: 13px;
    }
    .theme-toggle-btn i {
      font-size: 1.3rem;
      vertical-align: middle;
    }
    .sidebar-toggle-btn i {
      font-size: 1.3rem;
      vertical-align: middle;
    }
    .diff-cell { background: #ffe066 !important; }
    .excel-table { font-size: 13px; border-collapse: collapse; margin-bottom: 24px; }
    .excel-table th, .excel-table td {
      border: 1px solid #bbb;
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
      background: #f1f3f4;
      font-weight: 700;
    }
    .excel-table td {
      word-break: break-all;
    }
    .excel-table-wrapper {
      overflow-x: auto;
      width: 100%;
    }
    @media (min-width: 768px) {
      .compare-row {
        display: flex;
        flex-direction: row;
        gap: 16px;
      }
      .compare-col {
        flex: 1 1 0;
        min-width: 0;
      }
    }
    @media (max-width: 767.98px) {
      .compare-row {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .compare-col {
        width: 100%;
      }
    }
    @media (max-width: 991.98px) { /* Bootstrap md breakpoint */
      .d-flex.flex-row.h-100 {
        flex-direction: column;
      }
      .sidebar {
        position: fixed;
        left: 0;
        top: 0;
        min-width: 80vw;
        max-width: 90vw;
        width: 80vw;
        height: 100vh;
        z-index: 1050;
        box-shadow: 2px 0 16px rgba(25, 118, 210, 0.12);
        transform: translateX(-100%);
        transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), min-width 0.2s, max-width 0.2s, padding 0.2s;
        border-right: 1.5px solid var(--bs-border-color-translucent);
        background: var(--bs-body-bg);
      }
      .sidebar.sidebar-hidden {
        transform: translateX(-100%);
      }
      .sidebar:not(.sidebar-hidden) {
        transform: translateX(0);
      }
      .main-content {
        width: 100vw;
        min-width: 0;
      }
      .header-bar {
        position: sticky;
        top: 0;
        z-index: 100;
        font-size: 1rem;
        padding: 8px 8px;
      }
      .content-header, .messages {
        padding-left: 6px;
        padding-right: 6px;
      }
      main.flex-grow-1 {
        height: auto;
        min-height: auto;
      }
      .sidebar-toggle-btn {
        display: inline-block !important;
      }
    }
    @media (max-width: 575.98px) { /* Bootstrap sm breakpoint */
      .header-bar {
        font-size: 0.95rem;
        padding: 6px 4px;
      }
      .sidebar {
        min-width: 100vw;
        max-width: 100vw;
        width: 100vw;
        padding: 0 2px;
      }
      .sidebar-header {
        font-size: 1rem;
        padding: 10px 6px 6px 6px;
      }
      .content-header {
        font-size: 1rem;
        padding: 8px 6px 0 6px;
      }
      .messages {
        padding: 6px;
        gap: 6px;
      }
      .message {
        font-size: 12px;
        padding: 6px;
      }
      .form-label, .form-control, .btn, .upload-form, .mb-3 {
        font-size: 12px !important;
      }
      .form-control {
        height: 1.5rem;
        padding: 2px 4px;
      }
      .btn {
        padding: 4px 0;
        font-size: 12px;
      }
    }
    @media (min-width: 992px) { /* Bootstrap md and up */
      .sidebar {
        transform: translateX(0) !important;
        position: relative;
        min-width: 180px;
        max-width: 220px;
        width: 200px;
      }
      .sidebar-toggle-btn#sidebar-close-btn {
        display: none !important;
      }
    }
    @media (max-width: 991.98px) {
      .sidebar-toggle-btn#sidebar-close-btn {
        display: inline-block !important;
      }
    }
    /* Dark mode: cải thiện màu header card/bảng */
    [data-bs-theme="dark"] .card-header.bg-primary {
      background-color: #1976d2 !important; /* Deep blue */
      color: #fff !important;
      border-bottom: 1px solid #1565c0;
    }
    [data-bs-theme="dark"] .card-header.bg-success {
      background-color: #388e3c !important; /* Deep green */
      color: #fff !important;
      border-bottom: 1px solid #2e7031;
    }
    [data-bs-theme="dark"] .excel-table th {
      background: #263238 !important; /* Blue-grey dark */
      color: #fff !important;
      border-bottom: 1px solid #37474f;
    }
    [data-bs-theme="dark"] .excel-table td {
      background: #181c20;
      color: #e0e0e0;
    }
    /* Optional: subtle border for card in dark mode */
    [data-bs-theme="dark"] .card {
      border: 1.5px solid #37474f;
      background: #23272b;
    }
    /* Optional: make diff-cell more visible in dark mode */
    [data-bs-theme="dark"] .diff-cell {
      background: #ffe066cc !important;
      color: #222 !important;
    }
  </style>
  <script>
    let sidebarVisible = true;
    function setTheme(theme) {
      document.documentElement.setAttribute('data-bs-theme', theme);
      localStorage.setItem('theme', theme);
      updateThemeIcon();
    }
    function toggleThemeBtn() {
      const current = document.documentElement.getAttribute('data-bs-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    }
    function updateThemeIcon() {
      const btn = document.getElementById('theme-toggle-btn');
      const theme = document.documentElement.getAttribute('data-bs-theme');
      btn.querySelector('i').className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
      btn.title = theme === 'dark' ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối';
    }
    function toggleSidebar() {
      sidebarVisible = !sidebarVisible;
      const sidebar = document.getElementById('sidebar');
      const closeBtn = document.getElementById('sidebar-close-btn');
      const headerBtn = document.getElementById('sidebar-toggle-btn');
      if (sidebarVisible) {
        sidebar.classList.remove('sidebar-hidden');
        if (window.innerWidth < 992 && closeBtn) closeBtn.style.display = 'inline-block';
      } else {
        sidebar.classList.add('sidebar-hidden');
        if (closeBtn) closeBtn.style.display = 'none';
      }
      updateSidebarIcon();
    }
    function updateSidebarIcon() {
      const btn = document.getElementById('sidebar-toggle-btn');
      const closeBtn = document.getElementById('sidebar-close-btn');
      btn.querySelector('i').className = sidebarVisible ? 'fa-solid fa-bars' : 'fa-solid fa-bars-staggered';
      btn.title = sidebarVisible ? 'Ẩn thanh công cụ' : 'Hiện thanh công cụ';
      // Đồng bộ icon X ở sidebar
      if (closeBtn) closeBtn.style.display = (window.innerWidth < 992 && sidebarVisible) ? 'inline-block' : 'none';
    }
    window.onload = function() {
      let theme = localStorage.getItem('theme');
      if (!theme) {
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      setTheme(theme);
      updateThemeIcon();
      updateSidebarIcon();
      if (window.innerWidth < 992) {
        sidebarVisible = false;
        document.getElementById('sidebar').classList.add('sidebar-hidden');
        updateSidebarIcon();
      }
    }
    window.onresize = function() {
      if (window.innerWidth < 992) {
        if (sidebarVisible) {
          sidebarVisible = false;
          document.getElementById('sidebar').classList.add('sidebar-hidden');
          updateSidebarIcon();
        }
      } else {
        sidebarVisible = true;
        document.getElementById('sidebar').classList.remove('sidebar-hidden');
        updateSidebarIcon();
      }
    }
  </script>
</head>
<body>
    <div class="d-flex flex-row h-100 w-100">
      <aside id="sidebar" class="sidebar d-flex flex-column">
        <div class="sidebar-header d-flex align-items-center justify-content-between">
          <span>Công cụ</span>
          <button id="sidebar-close-btn" class="sidebar-toggle-btn d-md-none" type="button" onclick="toggleSidebar()" title="Đóng thanh công cụ" style="display:none;"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="flex-grow-1 p-4">
          <form class="upload-form" method="post" enctype="multipart/form-data">
            <div class="mb-3">
              <label class="form-label">File 1</label>
              <input class="form-control" type="file" name="file1" required>
            </div>
            <div class="mb-3">
              <label class="form-label">File 2</label>
              <input class="form-control" type="file" name="file2" required>
            </div>
            <button class="btn btn-primary w-100" type="submit">So sánh</button>
          </form>
        </div>
      </aside>
      <div class="main-content flex-grow-1 d-flex flex-column h-100">
        <div class="header-bar">
          <button id="sidebar-toggle-btn" class="sidebar-toggle-btn" type="button" onclick="toggleSidebar()" title="Ẩn/hiện thanh công cụ"><i class="fa-solid fa-bars"></i></button>
          <span>So sánh file Excel</span>
          <button id="theme-toggle-btn" class="theme-toggle-btn" type="button" onclick="toggleThemeBtn()"><i class="fa-solid fa-moon"></i></button>
        </div>
        <main class="flex-grow-1 d-flex flex-column">
          <div class="content-header">Kết quả so sánh</div>
          <div class="messages">
            {% if table1 and table2 %}
              <div class="mt-2"><b>Chi tiết các ô khác nhau:</b></div>
              <ul style="font-size:13px;">
                {% for d in diffs %}
                  <li>Dòng {{ d.row }}, cột '{{ d.column }}': File 1 = '{{ d.value1 }}', File 2 = '{{ d.value2 }}'</li>
                {% endfor %}
              </ul>
              <div class="compare-row mt-3">
                <div class="compare-col">
                  <div class="card shadow-sm mb-3">
                    <div class="card-header bg-primary text-white"><b>File 1</b></div>
                    <div class="card-body p-2 excel-table-wrapper">
                      <table class="excel-table w-100">
                        <thead>
                          <tr>
                            {% for col in columns %}<th>{{ col }}</th>{% endfor %}
                          </tr>
                        </thead>
                        <tbody>
                          {% for row_idx in range(table1|length) %}
                            <tr>
                              {% for col in columns %}
                                {% set cell_diff = (row_idx, col) in diff_cells %}
                                <td class="{% if cell_diff %}diff-cell{% endif %}" title="{{ table1[row_idx][col] }}">{{ table1[row_idx][col] }}</td>
                              {% endfor %}
                            </tr>
                          {% endfor %}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div class="compare-col">
                  <div class="card shadow-sm mb-3">
                    <div class="card-header bg-success text-white"><b>File 2</b></div>
                    <div class="card-body p-2 excel-table-wrapper">
                      <table class="excel-table w-100">
                        <thead>
                          <tr>
                            {% for col in columns %}<th>{{ col }}</th>{% endfor %}
                          </tr>
                        </thead>
                        <tbody>
                          {% for row_idx in range(table2|length) %}
                            <tr>
                              {% for col in columns %}
                                {% set cell_diff = (row_idx, col) in diff_cells %}
                                <td class="{% if cell_diff %}diff-cell{% endif %}" title="{{ table2[row_idx][col] }}">{{ table2[row_idx][col] }}</td>
                              {% endfor %}
                            </tr>
                          {% endfor %}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            {% elif diff_error %}
              <div class="message bg-danger text-light">{{ diff_error }}</div>
            {% else %}
              <div class="message" style="background:var(--bs-light); color:var(--bs-primary); font-weight:600; border:1px solid var(--bs-primary);">Hãy tải lên hai file Excel để so sánh nội dung, giống như trò chuyện với ChatGPT!</div>
            {% endif %}
          </div>
        </main>
      </div>
    </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
'''

BACKEND_URL = 'http://localhost:5000/api/compare'

@app.route('/', methods=['GET', 'POST'])
def index():
    table1 = table2 = columns = diffs = diff_cells = diff_error = None
    if request.method == 'POST':
        files = {'file1': request.files['file1'], 'file2': request.files['file2']}
        try:
            resp = requests.post(BACKEND_URL, files=files)
            result = resp.json()
            if 'error' in result:
                diff_error = result['error']
            else:
                table1 = result.get('table1')
                table2 = result.get('table2')
                columns = result.get('columns')
                diffs = result.get('diffs')
                diff_cells = set((d['row']-1, d['column']) for d in diffs)
        except Exception as e:
            diff_error = f"Error: {e}"
    return render_template_string(HTML, table1=table1, table2=table2, columns=columns, diffs=diffs, diff_cells=diff_cells, diff_error=diff_error)

if __name__ == '__main__':
    app.run(port=8000, debug=True)
