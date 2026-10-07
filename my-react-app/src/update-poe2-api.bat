@echo off
setlocal EnableExtensions DisableDelayedExpansion

rem Save this BAT anywhere in your React project.
rem JSON files are saved next to it in the ApiDataBase folder.
set "LEAGUE=Forbidden Rites"
set "API_URL=https://poe.ninja/poe2/api/economy/exchange/current/overview"
set "OUTPUT_DIR=%~dp0ApiDataBase"
set "DOWNLOAD_ID=%RANDOM%-%RANDOM%"
set /a SUCCESS=0, FAILED=0
set "EXIT_CODE=0"

curl.exe --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: curl.exe was not found. Install curl and add it to PATH.
    set "EXIT_CODE=1"
    goto :finish
)

if not exist "%OUTPUT_DIR%\" mkdir "%OUTPUT_DIR%" 2>nul
if not exist "%OUTPUT_DIR%\" (
    echo ERROR: Cannot create folder "%OUTPUT_DIR%".
    set "EXIT_CODE=1"
    goto :finish
)

echo League: %LEAGUE%
echo Output: "%OUTPUT_DIR%"
echo.

for %%T in (Currency Fragments Abyss UncutGems LineageSupportGems Essences SoulCores Idols Runes Ritual Expedition Delirium Breach Verisium) do call :download "%%T"

echo.
echo Finished. Updated: %SUCCESS% / 14. Failed: %FAILED%.
if not "%FAILED%"=="0" set "EXIT_CODE=1"
goto :finish

:download
set "TYPE=%~1"
set "TARGET_FILE=%OUTPUT_DIR%\%~1.json"
set "TEMP_FILE=%OUTPUT_DIR%\%~1.json.%DOWNLOAD_ID%.tmp"
echo Downloading %TYPE%...

rem --data-urlencode correctly encodes spaces and other query characters.
rem Download to a temporary file so failed requests do not replace old JSON.
curl.exe --fail --location --silent --show-error ^
    --connect-timeout 15 --max-time 120 --retry 2 --retry-delay 2 ^
    --get --data-urlencode "league=%LEAGUE%" ^
    --data-urlencode "type=%TYPE%" ^
    --header "Accept: application/json" ^
    --output "%TEMP_FILE%" "%API_URL%"
if errorlevel 1 goto :download_failed

if not exist "%TEMP_FILE%" goto :download_failed
for %%F in ("%TEMP_FILE%") do if %%~zF EQU 0 goto :download_failed

move /y "%TEMP_FILE%" "%TARGET_FILE%" >nul 2>&1
if errorlevel 1 goto :download_failed

set /a SUCCESS+=1 >nul
echo OK: %TYPE%.json
echo.
exit /b 0

:download_failed
set /a FAILED+=1 >nul
echo ERROR: Could not update %TYPE%.json. Previous file, if any, was kept.
if exist "%TEMP_FILE%" del /q "%TEMP_FILE%" >nul 2>&1
echo.
exit /b 0

:finish
echo.
pause
endlocal & exit /b %EXIT_CODE%
