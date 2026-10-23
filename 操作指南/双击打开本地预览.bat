@echo off
chcp 65001 >nul
python "%~dp0serve.py"
if errorlevel 1 pause
