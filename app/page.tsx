"use client";

import { useMemo, useState } from "react";

type RecordItem = {
  id: string;
  title: string;
  era: string;
  theatre: string;
  objective: string;
  constraint: string;
  lesson: string;
  tags: string[];
};

const records: RecordItem[] = [
  { id: "M-01", title: "The narrow crossing", era: "Antiquity", theatre: "River crossing", objective: "Move a smaller force through a constrained route.", constraint: "Terrain compresses movement into one visible threshold.", lesson: "A narrow route changes the value of time, information, and formation.", tags: ["terrain", "movement"] },
  { id: "M-02", title: "The long supply line", era: "Early modern", theatre: "Logistics", objective: "Keep an expedition supplied beyond its base.", constraint: "Every extra mile increases exposure and coordination cost.", lesson: "Operational reach is limited by the system that feeds it.", tags: ["logistics", "reach"] },
  { id: "M-03", title: "The divided signal", era: "Industrial", theatre: "Command", objective: "Coordinate separate units under imperfect communication.", constraint: "Orders arrive late and local context moves faster than the plan.", lesson: "A resilient intent survives when a detailed instruction cannot.", tags: ["command", "information"] },
  { id: "M-04", title: "The defended ridge", era: "Modern", theatre: "Defence", objective: "Hold a position whose value comes from visibility.", constraint: "The position is strong only while observation remains clear.", lesson: "Defensive advantage is a relationship, not a permanent property.", tags: ["terrain", "defence"] },
  { id: "M-05", title: "The decoy route", era: "Contemporary", theatre: "Deception", objective: "Shape an opponent's expectation of where effort is landing.", constraint: "A signal must remain plausible without becoming the plan.", lesson: "Deception works through attention and cost, not theatrical surprise.", tags: ["deception", "information"] },
  { id: "M-06", title: "The pause before contact", era: "Contemporary", theatre: "Decision", objective: "Use a deliberate pause to improve the next choice.", constraint: "Waiting has a cost when the surrounding system keeps changing.", lesson: "A pause is strategic only when it buys better information.", tags: ["decision", "timing"] },
];

const eras = ["All eras", ...Array.from(new Set(records.map((record) => record.era)))];

export default function Home() {
  const [era, setEra] = useState("All eras");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(records[0].id);
  const filtered = useMemo(() => records.filter((record) => {
    const matchesEra = era === "All eras" || record.era === era;
    const haystack = `${record.title} ${record.theatre} ${record.tags.join(" ")}`.toLowerCase();
    return matchesEra && haystack.includes(query.toLowerCase());
  }), [era, query]);
  const selected = records.find((record) => record.id === selectedId) ?? filtered[0] ?? records[0];

  return (
    <main className="field-shell">
      <header className="topbar">
        <div className="brand-mark" aria-label="Military Strategy Database">MSD<span> / 01</span></div>
        <div className="topbar-note">EDUCATIONAL REFERENCE · SAMPLE DATASET</div>
        <div className="status-dot"><i /> indexed</div>
      </header>

      <section className="masthead">
        <div className="coordinate">13°45&apos;N / 100°30&apos;E</div>
        <h1>Military<br /><em>Strategy</em> Database</h1>
        <p>Compare the pressure points behind a campaign: objective, constraint, terrain, and the lesson that survives the map.</p>
      </section>

      <div className="workbench">
        <aside className="filter-rail" aria-label="Reference filters">
          <div className="rail-heading">INDEX / FILTER</div>
          <label htmlFor="record-search">Find a record</label>
          <input id="record-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="title or keyword" />
          <fieldset>
            <legend>Era</legend>
            {eras.map((item) => <button key={item} className={era === item ? "filter active" : "filter"} onClick={() => setEra(item)} aria-pressed={era === item}>{item}</button>)}
          </fieldset>
          <div className="scope-note"><strong>Scope note</strong><br />Self-authored study records. This is not operational guidance or a complete historical archive.</div>
        </aside>

        <section className="index-panel" aria-label="Strategy records">
          <div className="panel-title"><span>RECORD INDEX</span><b>{filtered.length.toString().padStart(2, "0")} ENTRIES</b></div>
          {filtered.map((record, index) => <button key={record.id} className={selected.id === record.id ? "record active" : "record"} onClick={() => setSelectedId(record.id)}>
            <span className="record-number">{String(index + 1).padStart(2, "0")}</span>
            <span className="record-main"><strong>{record.title}</strong><small>{record.theatre} / {record.era}</small></span>
            <span className="record-tags">{record.tags.join(" · ")}</span>
            <span className="arrow" aria-hidden="true">↗</span>
          </button>)}
          {filtered.length === 0 && <p className="empty">No records match this filter. Try a broader term.</p>}
        </section>

        <article className="brief-panel" aria-live="polite">
          <div className="brief-top"><span>{selected.id}</span><span>{selected.era.toUpperCase()}</span></div>
          <div className="map-mark" aria-hidden="true"><span /><span /><span /><span /><b>+</b></div>
          <p className="eyebrow">CASE BRIEF / {selected.theatre.toUpperCase()}</p>
          <h2>{selected.title}</h2>
          <dl>
            <div><dt>OBJECTIVE</dt><dd>{selected.objective}</dd></div>
            <div><dt>CONSTRAINT</dt><dd>{selected.constraint}</dd></div>
            <div><dt>LESSON</dt><dd>{selected.lesson}</dd></div>
          </dl>
          <div className="brief-footer"><span>READING STATUS</span><strong>REFERENCE ONLY</strong></div>
        </article>
      </div>
      <footer><span>Military Strategy Database / 2026</span><span>Designed as a study instrument, not a field manual.</span></footer>
    </main>
  );
}
