import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from "./App";

function render() {

  const container = document.getElementById('root');
  if (!container) throw new Error('Root not found');
  const root = createRoot(container);
  root.render(<App />, );
}

render();