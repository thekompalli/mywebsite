import React, { useMemo } from 'react';

const MermaidDiagram = ({ chart, className = '' }) => {
  const srcDoc = useMemo(() => {
    const encodedChart = JSON.stringify(chart);

    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Diagram</title>
    <style>
      html, body {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
        background: #f8fafc;
        font-family: sans-serif;
      }
      #wrapper {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: auto;
      }
      .diagram-container {
        min-width: 1280px;
        min-height: 720px;
        padding: 16px;
        box-sizing: border-box;
      }
      svg {
        width: 100%;
        height: auto;
      }
      .svg-pan-zoom_control {
        background: rgba(15, 23, 42, 0.75);
        color: #f8fafc;
        border-radius: 4px;
        font-size: 14px;
      }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/svg-pan-zoom@3.6.1/dist/svg-pan-zoom.min.js"></script>
  </head>
  <body>
    <div id="wrapper">
      <div id="diagram" class="diagram-container mermaid"></div>
    </div>
    <script>
      (function () {
        const chart = ${encodedChart};
        const container = document.getElementById('diagram');
        container.innerHTML = chart;

        mermaid.initialize({
          startOnLoad: false,
          theme: 'neutral',
          securityLevel: 'loose',
          flowchart: {
            useMaxWidth: true,
            htmlLabels: true
          }
        });

        mermaid.init(undefined, container);

        const svg = container.querySelector('svg');
        if (!svg) return;

        svg.style.width = '100%';
        svg.style.height = 'auto';

        const panZoom = window.svgPanZoom(svg, {
          zoomEnabled: true,
          controlIconsEnabled: true,
          fit: true,
          center: true,
          minZoom: 0.2,
          maxZoom: 10,
          zoomScaleSensitivity: 0.4,
          dblClickZoomEnabled: false,
          mouseWheelZoomEnabled: true,
          panEnabled: true,
          contain: false
        });

        const resize = () => {
          panZoom.resize();
          panZoom.fit();
          panZoom.center();
        };

        window.addEventListener('resize', resize);
      })();
    </script>
  </body>
</html>`;
  }, [chart]);

  return (
    <iframe
      title="Architecture diagram"
      className={`w-full rounded-2xl bg-transparent shadow-inner ${className}`}
      style={{
        minHeight: '80vh',
        height: '80vh',
        border: 'none'
      }}
      srcDoc={srcDoc}
      sandbox="allow-scripts allow-same-origin"
    />
  );
};

export default MermaidDiagram;
