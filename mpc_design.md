# MPC design (high-level) — ABYSS Vault

Goal: avoid single point of compromise by splitting signing authority across multiple parties.

Core ideas:
- Use threshold signatures (MPC) so that no single service holds the full private key.
- Parties:
  1. User device (edge)
  2. Vault service (cloud)
  3. Recovery/escrow (encrypted, offline)
- Threshold example: 2-of-3 to sign transactions.
- Communication:
  - Use secure channels (TLS 1.3)
  - Authentication: mutual TLS + ephemeral session keys
- Key generation:
  - Use distributed key generation (DKG) protocols
  - Avoid any dealer model in production
- Auditability:
  - Keep minimal logs; for Ghost mode, store only zero-knowledge proofs of actions if needed.

References:
- GG18, Lindell protocols, FROST (2020), and existing open-source implementations.
