export default function App() {
  return (
    <div className="page">
      <header className="header">
        <span className="logo">ABYSS</span>
        <span className="status">● offline</span>
      </header>

      <main className="main">
        <div className="vault">
          <h2>Vault</h2>
          <p className="hint">
            Secure environment not initialized
          </p>

          <button className="primary">
            Initialize Vault
          </button>
        </div>
      </main>

      <footer className="footer">
        Abyss UI · v0.1
      </footer>
    </div>
  )
}
