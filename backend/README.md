ABYSS Vault (backend) — high-level

Components:
- API Gateway (auth, rate limiting)
- MPC Coordinator (handles key shares & signing requests)
- Storage (Postgres for metadata, Redis for sessions)
- Auditor & Telemetry (audit logs, alerts — keep logs minimal in Ghost mode)

Security:
- Hardened containers
- HSMs or KMS for critical secrets
- Strict RBAC
- WAF and DDoS protection

This README contains an example Dockerfile and Kubernetes manifest in the root of this archive.
