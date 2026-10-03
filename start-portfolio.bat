@echo off
title Abhishek 3D Portfolio Launcher
echo ==============================================
echo  Launching Abhishek Kumar Ranjan 3D Portfolio
echo ==============================================
echo.
cd /d "%~dp0"
start "" "http://127.0.0.1:3000/"
node server.js
pause
