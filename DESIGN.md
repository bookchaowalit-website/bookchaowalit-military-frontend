# Design direction — Field Manual Index

The interface feels like a well-used field manual: olive ink, warm paper,
registration marks, map-grid lines, and precise monospace labels. The page is
an index first, with the reference record opening beside it rather than a
generic hero followed by cards.

- Palette: paper `#f2efe5`, ink `#1c241c`, olive `#65734d`, rust `#a34f32`.
- Typography: monospace for coordinates and labels; sturdy sans for reading.
- Structure: left rail for filters, dense index table, right-side selected brief.
- Interaction: selecting a record updates the brief without losing the index.
- Responsive rule: the rail becomes a horizontal filter strip and the brief
  follows the selected record on small screens.
- Motion: one map-grid reveal on load; selection changes use a short ink-fade.
