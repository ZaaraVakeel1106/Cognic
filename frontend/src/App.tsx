import { useEffect, useState } from 'react'

type OllamaStatus = {
  configured_model: string
  reachable: boolean
  model_available: boolean
}

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000'

function App() {
  const [ollama, setOllama] = useState<OllamaStatus | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    fetch(`${API_BASE}/api/ollama/status`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Status request failed')
        return response.json() as Promise<OllamaStatus>
      })
      .then(setOllama)
      .catch(() => setOllama(null))
    return () => controller.abort()
  }, [])

  const modelLabel = ollama?.model_available
    ? 'MODEL READY'
    : ollama?.reachable
      ? 'MODEL NOT FOUND'
      : 'OLLAMA OFFLINE'

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#home" aria-label="Cognic home">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span>cognic<span className="brand-period">.</span></span>
        </a>

        <div className="workspace-label">YOUR WORKSPACE</div>
        <nav className="primary-nav" aria-label="Main navigation">
          <a className="nav-link active" href="#workspace"><span className="nav-icon grid-icon" aria-hidden="true">⌘</span>Workspace</a>
          <a className="nav-link disabled" href="#library" aria-disabled="true"><span className="nav-icon" aria-hidden="true">▤</span>Library<span className="nav-soon">SOON</span></a>
        </nav>

        <div className="sidebar-bottom">
          <div className="local-card">
            <div className="local-card-head"><span className={`status-dot ${ollama?.model_available ? 'online' : ''}`} /> LOCAL ENGINE</div>
            <div className="model-name">{ollama?.configured_model ?? 'llama3.2:3b'}</div>
            <div className="model-status">{modelLabel}</div>
          </div>
          <div className="sidebar-foot"><span className="privacy-mark">◈</span> Your code stays yours.</div>
        </div>
      </aside>

      <section className="main-area" id="workspace">
        <header className="topbar">
          <div className="breadcrumb"><span>Workspace</span><span className="crumb-slash">/</span><strong>Overview</strong></div>
          <div className="topbar-right"><span className="local-badge"><span className="status-dot" /> LOCAL FIRST</span><span className="avatar" aria-label="Your workspace">C</span></div>
        </header>

        <div className="content">
          <div className="eyebrow"><span className="eyebrow-line" /> A BETTER WAY TO UNDERSTAND CODE</div>
          <div className="intro-grid">
            <div>
              <h1>Learn the code.<br /><span>Own the craft.</span></h1>
              <p className="intro-copy">A quiet space to turn any project into a path for learning. Start with the code you care about; build understanding one idea at a time.</p>
            </div>
            <div className="orbit-art" aria-hidden="true">
              <div className="orbit orbit-one"><span className="orbit-node node-one" /><span className="orbit-node node-two" /></div>
              <div className="orbit orbit-two"><span className="orbit-node node-three" /></div>
              <div className="orbit-core"><span className="core-glyph">c.</span></div>
              <span className="orbit-caption">IDEAS IN MOTION <span>✳</span></span>
            </div>
          </div>

          <section className="launch-panel" aria-labelledby="launch-title">
            <div className="panel-index"><span>01</span><span className="index-rule" /></div>
            <div className="launch-content">
              <div className="launch-kicker">FIRST, PICK A PROJECT</div>
              <h2 id="launch-title">Bring a codebase<br />you want to understand.</h2>
              <p>Small or sprawling, familiar or brand new. Cognic is being built to help you explore projects on your terms.</p>
              <div className="launch-note"><span className="note-icon">↗</span><span>Project workspace is taking shape</span><span className="note-rule" /><span className="note-soon">COMING NEXT</span></div>
            </div>
            <div className="panel-decoration" aria-hidden="true"><div className="decoration-ring ring-a" /><div className="decoration-ring ring-b" /><span>01—∞</span></div>
          </section>

          <div className="bottom-row">
            <div className="principle"><span className="principle-number">A</span><div><strong>Grounded in your project</strong><span>Learn from real code, at your pace.</span></div></div>
            <div className="principle"><span className="principle-number">B</span><div><strong>Private by default</strong><span>Local tools. Your files stay yours.</span></div></div>
            <div className="build-stamp"><span>COGNIC STUDIO</span><span>FOUNDATION · 2026</span></div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
