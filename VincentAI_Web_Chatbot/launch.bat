@echo off
echo Setting up VincentAI Chatbot...
echo.

:: Step 1: Install requirements
echo Installing requirements...
pip install -r requirements.txt
echo.

:: Step 2: Check if model exists, if not, download
if not exist model (
    echo Model folder not found, downloading model...
    python setup_model.py
    echo Model downloaded.
) else (
    echo Model folder exists. Skipping download.
)
echo.

:: Step 3: Launch Flask server
echo Starting VincentAI Chatbot server...
python app.py
pause