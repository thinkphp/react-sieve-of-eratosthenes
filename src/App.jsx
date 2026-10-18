
import { useState } from "react";
import "./App.css";

function ciurulEratostene(n) {
  const prim = Array(n + 1).fill(true);
  const eliminari = Array(n + 1).fill(null);

  prim[0] = false;
  if (n >= 1) prim[1] = false;

  for (let p = 2; p * p <= n; p++) {
    if (prim[p]) {
      for (let multiplu = p * p;
           multiplu <= n;
           multiplu += p) {
        if (prim[multiplu]) {
          prim[multiplu] = false;
          eliminari[multiplu] = p;
        }
      }
    }
  }

  const prime = [];
  const compuse = [];

  for (let i = 2; i <= n; i++) {
    if (prim[i]) {
      prime.push(i);
    } else {
      compuse.push(i);
    }
  }

  return { prime, compuse, eliminari };
}

export default function App() {
  const [valoare, setValoare] = useState("30");
  const [limita, setLimita] = useState(30);
  const [rezultat, setRezultat] = useState(
    ciurulEratostene(30)
  );
  const [eroare, setEroare] = useState("");

  function genereaza(e) {
    e.preventDefault();

    const n = Number(valoare);

    if (
      !Number.isInteger(n) ||
      n < 2 ||
      n > 500
    ) {
      setEroare("Introdu un număr întreg între 2 și 500.");
      return;
    }

    setEroare("");
    setLimita(n);
    setRezultat(ciurulEratostene(n));
  }

  return (
    <main className="container">
      <h1>Ciurul lui Eratostene</h1>
      <p>
        Descoperă numerele prime prin eliminarea
        numerelor compuse.
      </p>

      <form onSubmit={genereaza}>
        <label htmlFor="limita">
          Introdu numărul maxim:
        </label>

        <input
          id="limita"
          type="number"
          min="2"
          max="500"
          step="1"
          value={valoare}
          onChange={(e) => setValoare(e.target.value)}
        />

        <button type="submit">Generează</button>
      </form>

      {eroare && <p className="eroare">{eroare}</p>}

      <section>
        <h2>Tabla numerelor</h2>
        <div className="tabla">
          {Array.from(
            { length: limita - 1 },
            (_, i) => i + 2
          ).map((numar) => {
            const estePrim =
              rezultat.prime.includes(numar);

            return (
              <div
                key={numar}
                className={
                  estePrim ? "numar prim" : "numar compus"
                }
                title={
                  estePrim
                    ? `${numar} este prim`
                    : `${numar} este compus`
                }
              >
                {numar}
                {!estePrim && (
                  <span className="eliminat">
                    ×
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2>Numere compuse eliminate</h2>
        <p>
          {rezultat.compuse.length > 0
            ? rezultat.compuse.join(", ")
            : "Nu există numere compuse."}
        </p>
      </section>

      <section>
        <h2>Numere prime finale</h2>
        <p className="lista-prime">
          {rezultat.prime.join(", ")}
        </p>
        <p>
          Total numere prime: {rezultat.prime.length}
        </p>
      </section>
    </main>
  );
}

