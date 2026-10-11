@echo off
setlocal
cd /d "%~dp0"

echo [1/3] Checking Node.js...
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js 18 or newer is required. Install it from https://nodejs.org and run start.bat again.
  pause
  exit /b 1
)

if not exist node_modules (
  echo [2/3] Installing project dependencies...
  call npm install
  if errorlevel 1 (
    echo npm install failed. Check your internet connection and try again.
    pause
    exit /b 1
  )
) else (
  echo [2/3] Dependencies found.
)

echo [3/3] Starting the portfolio. Your browser will open automatically.
call npm run dev -- --open
