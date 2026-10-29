import os
from pathlib import Path
from typing import Any

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

load_dotenv(Path(__file__).resolve().parent / ".env")

OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434").rstrip("/")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3.2:3b")

app = FastAPI(title="Cognic API", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/api/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "service": "cognic-api"}


@app.get("/api/ollama/status")
async def ollama_status() -> dict[str, Any]:
    """Report local Ollama reachability and whether the configured model is present."""
    result: dict[str, Any] = {
        "base_url": OLLAMA_BASE_URL,
        "configured_model": OLLAMA_MODEL,
        "reachable": False,
        "model_available": False,
        "models": [],
    }

    try:
        async with httpx.AsyncClient(timeout=2.5) as client:
            response = await client.get(f"{OLLAMA_BASE_URL}/api/tags")
            response.raise_for_status()
            payload = response.json()
        model_entries = payload.get("models", []) if isinstance(payload, dict) else []
        model_names = [
            entry.get("name")
            for entry in model_entries
            if isinstance(entry, dict) and isinstance(entry.get("name"), str)
        ]
        result["reachable"] = True
        result["models"] = model_names
        result["model_available"] = OLLAMA_MODEL in model_names
    except (httpx.HTTPError, ValueError):
        # A missing or unhealthy local Ollama server should not take Cognic offline.
        pass

    return result
