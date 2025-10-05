import { useEffect, useState } from 'react';

function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const centiseconds = Math.floor((ms % 1000) / 10);
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(minutes)}:${pad(seconds)}.${pad(centiseconds)}`;
}

function Stopwatch() {
  const [time, setTime] = useState(0);     
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setTime(t => t + 10), 10);
    return () => clearInterval(id);
  }, [running]);

  const toggle = () => setRunning(r => !r);
  const reset = () => { setRunning(false); setTime(0); };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', display: 'grid', gap: 12, placeItems: 'center' }}>
      <h1>Stopwatch</h1>
      <div style={{ fontSize: 48, fontVariantNumeric: 'tabular-nums' }}>{formatTime(time)}</div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={toggle}>{running ? 'Stop' : 'Start'}</button>
        <button onClick={reset} disabled={!running && time === 0}>Reset</button>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <Stopwatch />
    </main>
  );
}