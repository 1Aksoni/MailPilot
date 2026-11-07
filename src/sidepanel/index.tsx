import React from 'react'
import { createRoot } from 'react-dom/client'
import './sidepanel.css'
import SidePanelApp from './App'

const container = document.getElementById('sidepanel-root')!
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <SidePanelApp />
  </React.StrictMode>
)