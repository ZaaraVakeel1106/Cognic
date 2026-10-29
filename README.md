# Cognic

Cognic is a general-purpose, local-first project-aware learning studio. This initial scaffold contains a React + TypeScript + Vite workspace shell and a FastAPI service with health and Ollama status endpoints. It does not import or inspect repositories yet.

## Requirements

- Node.js 20.19+ or 22.12+
- Python 3.11+
- Ollama is optional. To see a connected model, run Ollama locally and have `llama3.2:3b` available. Cognic never downloads models.

## Windows setup

Open PowerShell in the repository root (`C:\Users\zaara\Cognic`) and install the frontend dependencies:

```powershell
Copy-Item .env.example backend\.env
Set-Location frontend
npm.cmd install
Set-Location ..
```

Create a Python virtual environment and install the backend dependencies:

```powershell
python -m venv backend\.venv
backend\.venv\Scripts\python.exe -m pip install -r backend\requirements.txt
```

## Run the app

In PowerShell, from the repository root, start the backend in one window:

```powershell
backend\.venv\Scripts\python.exe -m uvicorn main:app --app-dir backend --reload --host 127.0.0.1 --port 8000
```

Start the frontend in a second PowerShell window:

```powershell
Set-Location C:\Users\zaara\Cognic\frontend
npm.cmd run dev
```

Open the Vite URL printed in the second window (normally `http://localhost:5173`). The API is at `http://127.0.0.1:8000`; health is `GET /api/health` and Ollama status is `GET /api/ollama/status`.

## Local Ollama configuration

Edit `backend\.env` to set `OLLAMA_BASE_URL` and `OLLAMA_MODEL`. Defaults are `http://localhost:11434` and `llama3.2:3b`. The status endpoint reports Ollama as unavailable without preventing the app from running. To use the default model, install it separately with Ollama before starting Cognic; Cognic will not download it for you.

## Checks

```powershell
Set-Location C:\Users\zaara\Cognic\frontend
npm.cmd run build
Set-Location ..
backend\.venv\Scripts\python.exe -m compileall backend
```
