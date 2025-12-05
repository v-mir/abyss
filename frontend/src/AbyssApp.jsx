import React, { useState, useEffect } from "react";

// ABYSS - frontend prototype component (single-file)
// NOTE: Production must integrate audited core and secure crypto libraries.

export default function AbyssApp() {
  const [lang, setLang] = useState("EN");
  const [mode, setMode] = useState("SECURE");
  const [status, setStatus] = useState("idle");
  const [publicKey, setPublicKey] = useState(null);
  const [privateJwk, setPrivateJwk] = useState(null);
  const [coldFileUrl, setColdFileUrl] = useState(null);
  const [vaultSession, setVaultSession] = useState(false);

  useEffect(() => {
    return () => {
      if (coldFileUrl) URL.revokeObjectURL(coldFileUrl);
    };
  }, [coldFileUrl]);

  async function generateColdWallet() {
    setStatus("generating");
    try {
      const kp = await window.crypto.subtle.generateKey(
        { name: "ECDSA", namedCurve: "P-256" },
        true,
        ["sign", "verify"]
      );
      const pub = await window.crypto.subtle.exportKey("jwk", kp.publicKey);
      const priv = await window.crypto.subtle.exportKey("jwk", kp.privateKey);
      setPublicKey(pub);
      setPrivateJwk(priv);

      const payload = {
        type: "abyss-cold-vault",
        createdAt: new Date().toISOString(),
        mode: mode,
        public: pub,
        private: priv,
        metadata: { createdBy: "MIDAS (prototype)" },
      };

      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      setColdFileUrl(url);
      setStatus("ready");
    } catch (e) {
      console.error(e);
      setStatus("error");
    }
  }

  function downloadColdWallet() {
    if (!coldFileUrl) return;
    const a = document.createElement("a");
    a.href = coldFileUrl;
    a.download = `abyss_cold_vault_${new Date().toISOString()}.abys.json`;
    a.click();
  }

  function wipeSensitive() {
    setPrivateJwk(null);
    setPublicKey(null);
    setStatus("idle");
    if (coldFileUrl) {
      URL.revokeObjectURL(coldFileUrl);
      setColdFileUrl(null);
    }
  }

  function toggleVault() {
    setVaultSession((s) => !s);
  }

  const LogoSVG = ({ size = 72 }) => (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="g" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#1b001f" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#050505" stopOpacity="1" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" rx="16" fill="url(#g)" />
      <circle cx="100" cy="100" r="74" stroke="#C7B27C" strokeWidth="1.6" fill="#050505" />
      <line x1="100" y1="26" x2="100" y2="120" stroke="#C7B27C" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="100" cy="136" r="6" fill="#C7B27C" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050505] via-[#0f0f12] to-[#081018] text-gray-100 antialiased font-sans">
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-transparent flex items-center justify-center">
            <LogoSVG size={56} />
          </div>
          <div>
            <div className="text-2xl font-semibold tracking-wide">ABYSS <span className="text-sm text-[#C7B27C]">by MIDAS</span></div>
            <div className="text-xs text-gray-400">Absolute Control. Absolute Silence.</div>
          </div>
        </div>

        <nav className="flex items-center gap-4">
          <button onClick={() => setLang(lang === "EN" ? "RU" : "EN")} className="px-3 py-1 rounded-md bg-[#111214] text-sm border border-gray-800">{lang}</button>
          <div className="px-3 py-1 rounded-md text-sm text-gray-400">{vaultSession ? "Vault: connected" : "Vault: offline"}</div>
          <button onClick={toggleVault} className="px-4 py-2 rounded-md bg-[#C7B27C] text-black font-medium">{vaultSession ? (lang === "EN" ? "Sign out" : "Выйти") : (lang === "EN" ? "Sign in" : "Войти")}</button>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-10">
          <div>
            <h1 className="text-5xl font-extrabold leading-tight">{lang === "EN" ? "ABYSS — The depth of your security" : "ABYSS — Глубина твоей безопасности"}</h1>
            <p className="mt-4 text-gray-300 max-w-xl">{lang === "EN" ? `Hybrid wallet: Cold storage on any USB + Custodial vault with MPC. Ghost, Decoy, Dead-man switch. Designed for everyone — simple for a newcomer, powerful for an investor.` : `Гибридный кошелёк: холодное хранение на любой USB + кастодиальный Vault с MPC. Режимы Ghost, Decoy, Dead-man switch. Для всех — просто и надёжно.`}</p>

            <div className="mt-6 flex gap-3">
              <a className="inline-flex items-center gap-2 px-5 py-3 bg-[#C7B27C] text-black rounded-md font-semibold" href="#download">{lang === "EN" ? "Download" : "Скачать"}</a>
              <a className="inline-flex items-center gap-2 px-5 py-3 border border-gray-800 rounded-md text-sm" href="#roadmap">{lang === "EN" ? "Roadmap" : "Дорожная карта"}</a>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 max-w-md">
              <div className="p-4 bg-[#0b0b0d] rounded-md border border-gray-800">
                <div className="text-sm text-gray-400">{lang === "EN" ? "Mode" : "Режим"}</div>
                <div className="mt-2 flex gap-2">
                  {['NORMAL','SECURE','ANON','GHOST'].map(m => (
                    <button key={m} onClick={() => setMode(m)} className={`px-3 py-1 rounded-md text-sm ${mode===m? 'bg-[#C7B27C] text-black' : 'bg-transparent border border-gray-800 text-gray-300'}`}>{m}</button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-[#0b0b0d] rounded-md border border-gray-800">
                <div className="text-sm text-gray-400">{lang === "EN" ? "Security" : "Безопасность"}</div>
                <div className="mt-2 text-sm text-gray-300">{lang === "EN" ? "MPC back-end, offline signing, AES+Argon2 (core)." : "MPC, оффлайн-подпись, AES+Argon2 (ядро)."}</div>
              </div>
            </div>
          </div>

          <div className="bg-[#070708] p-6 rounded-2xl border border-gray-800">
            <h3 className="text-lg font-semibold">{lang === "EN" ? "Quick Demo Wallet" : "Демо-кошелёк"}</h3>
            <p className="mt-2 text-sm text-gray-400">{lang === "EN" ? "This demo shows Cold wallet creation and a mock Vault session. Replace crypto with audited core before production." : "Демо показывает создание холодного кошелька и тестовую сессию Vault. Перед продакшеном заменить крипто на аудированный core."}</p>

            <div className="mt-4 grid gap-3">
              <div className="flex gap-2">
                <button onClick={generateColdWallet} className="flex-1 px-4 py-2 rounded-md bg-[#111214] border border-gray-700">{lang === "EN" ? "Create Cold Wallet" : "Создать холодный кошелёк"}</button>
                <button onClick={downloadColdWallet} disabled={!coldFileUrl} className={`px-4 py-2 rounded-md ${coldFileUrl? 'bg-[#C7B27C] text-black' : 'bg-gray-800 text-gray-500'}`}>{lang === "EN" ? "Download Vault" : "Скачать файл"}</button>
              </div>

              <div className="p-3 bg-[#050506] rounded-md border border-gray-800 text-sm">
                <div className="text-xs text-gray-400">{lang === "EN" ? "Status" : "Статус"}: <span className="text-[#C7B27C]">{status}</span></div>
                <div className="mt-2 text-xs text-gray-300">{publicKey ? <pre className="text-xs max-h-24 overflow-auto">{JSON.stringify(publicKey, null, 2)}</pre> : (lang === "EN" ? "No public key yet." : "Публичный ключ не создан.")}</div>
              </div>

              <div className="flex gap-2">
                <button onClick={wipeSensitive} className="flex-1 px-4 py-2 rounded-md bg-[#2b2b2d]">{lang === "EN" ? "Wipe Sensitive Data" : "Стереть данные"}</button>
                <button onClick={() => alert('Simulated offline sign: replace with real signing flow in core.')} className="px-4 py-2 rounded-md bg-[#111214] border border-gray-700">{lang === "EN" ? "Sign Transaction (demo)" : "Подписать TX (демо)"}</button>
              </div>

            </div>

            <div className="mt-6 text-xs text-gray-500">
              {lang === "EN" ? 'Demo notes: This is a UI prototype. Cryptographic operations must be implemented in ABYSS Core (Rust), cold file must be encrypted.' : 'Примечание: прототип UI. Крипто-операции нужно реализовать в ABYSS Core (Rust), файл холодного кошелька должен быть зашифрован.'}
            </div>

          </div>
        </section>

        <section id="download" className="py-10">
          <div className="bg-[#070708] rounded-2xl p-6 border border-gray-800">
            <h2 className="text-2xl font-semibold">{lang === "EN" ? "Download ABYSS" : "Скачать ABYSS"}</h2>
            <p className="mt-2 text-sm text-gray-400">{lang === "EN" ? "Installers for demo: Windows / macOS / Linux. Cold build runs from any USB." : "Установщики: Windows / macOS / Linux. Холодная версия работает с любой USB."}</p>
            <div className="mt-4 flex gap-3">
              <a className="px-4 py-2 rounded-md bg-[#111214] border border-gray-700">{lang === "EN" ? "Windows" : "Windows"}</a>
              <a className="px-4 py-2 rounded-md bg-[#111214] border border-gray-700">{lang === "EN" ? "macOS" : "macOS"}</a>
              <a className="px-4 py-2 rounded-md bg-[#111214] border border-gray-700">{lang === "EN" ? "Linux" : "Linux"}</a>
            </div>
          </div>
        </section>

        <section id="roadmap" className="py-10">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-5 bg-[#070708] rounded-md border border-gray-800">
              <h3 className="font-semibold">{lang === "EN" ? "Phase 0 - Core" : "Фаза 0 - Ядро"}</h3>
              <ul className="mt-2 text-sm text-gray-300 list-disc list-inside">
                <li>Rust core (open)</li>
                <li>Cold USB app (open)</li>
                <li>Documentation + audits</li>
              </ul>
            </div>
            <div className="p-5 bg-[#070708] rounded-md border border-gray-800">
              <h3 className="font-semibold">{lang === "EN" ? "Phase 1 - Vault" : "Фаза 1 - Vault"}</h3>
              <ul className="mt-2 text-sm text-gray-300 list-disc list-inside">
                <li>MPC backend (closed)</li>
                <li>Mobile apps + Web</li>
                <li>Beta & audits</li>
              </ul>
            </div>
            <div className="p-5 bg-[#070708] rounded-md border border-gray-800">
              <h3 className="font-semibold">{lang === "EN" ? "Phase 2 - Launch" : "Фаза 2 - Запуск"}</h3>
              <ul className="mt-2 text-sm text-gray-300 list-disc list-inside">
                <li>Ghost & Decoy</li>
                <li>Inheritance tools</li>
                <li>Marketing & partnerships</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="p-6 bg-[#050506] rounded-md border border-gray-800">
            <h3 className="text-lg font-semibold">{lang === "EN" ? "Pitch Deck (starter)" : "Pitch Deck (старт)"}</h3>
            <ol className="mt-3 text-sm text-gray-300 list-decimal list-inside">
              <li>{lang === "EN" ? "Problem & market" : "Проблема и рынок"}</li>
              <li>{lang === "EN" ? "Solution: ABYSS hybrid wallet" : "Решение: гибридный кошелёк ABYSS"}</li>
              <li>{lang === "EN" ? "Go-to-market & distribution" : "Выход на рынок"}</li>
              <li>{lang === "EN" ? "Business model: Vault fees, Pro, White-label" : "Модель: комиссии, Pro, White-label"}</li>
              <li>{lang === "EN" ? "Roadmap & team" : "Дорожная карта и команда"}</li>
            </ol>
          </div>
        </section>

        <footer className="py-10 text-center text-gray-500">
          <div>ABYSS by MIDAS — {new Date().getFullYear()}</div>
          <div className="text-xs mt-2">{lang === "EN" ? "Prototype UI — not for production. Contact: founder@abyss.example (simulated)" : "Прототип UI — не для продуктивного использования. Контакт: founder@abyss.example (симуляция)"}</div>
        </footer>

      </main>
    </div>
  );
}
