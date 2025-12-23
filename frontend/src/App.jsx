export default function App() {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>ABYSS</h1>

      <div style={styles.card}>
        <p>🔐 Vault status: inactive</p>
        <button style={styles.button}>Initialize</button>
      </div>

      <p style={styles.footer}>
        Abyss UI • React + Vite • GitHub Pages
      </p>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#050505',
    color: '#e5e5e5',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    fontFamily: 'monospace',
  },
  title: {
    fontSize: 48,
    letterSpacing: 4,
  },
  card: {
    padding: 24,
    border: '1px solid #222',
    borderRadius: 8,
    minWidth: 280,
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
    padding: '10px 16px',
    background: '#0ff',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  footer: {
    opacity: 0.5,
    fontSize: 12,
  },
}
