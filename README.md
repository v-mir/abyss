# ABYSS — Hybrid Wallet (Prototype Starter Repo)

**Status:** Prototype UI + project scaffold produced by an AI-assisted founder session.
**Brand:** ABYSS by MIDAS
**Model:** Hybrid (open core / closed vault)

This archive contains:
- Frontend prototype (single-file React component)
- Product docs, pitch-deck (markdown)
- Backend / Vault Docker + Kubernetes examples
- MPC high-level design
- Brand guidelines + logo (PNG)
- CI example for GitHub Actions

**IMPORTANT**
This repository is a *prototype*. Cryptographic routines in the frontend are demos only (WebCrypto) and **must not** be used in production. Implement cryptography in the audited Rust core (abyss-core) and use hardware-backed signing for cold vaults.

## Next steps (recommended)
1. Create a private GitHub organization and repo structure.  
2. Move `abyss-core` (Rust) and `abyss-cold` (WASM + signed binary) to open-source repositories for audits.  
3. Keep `abyss-vault` (backend, MPC) in a private repo.  
4. Run security audits, third-party code review, and a bug bounty before launch.

