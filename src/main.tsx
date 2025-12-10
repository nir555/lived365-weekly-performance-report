import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { resetToSampleData } from "./lib/storage.ts";

// Make resetToSampleData available in console for debugging
(window as any).resetDemoData = resetToSampleData;

// Auto-initialize sample data if localStorage is empty
const stored = localStorage.getItem('lived365_weekly_data');
if (!stored || stored === '[]') {
  resetToSampleData();
  console.log('Sample data initialized. Reload the page to see the data.');
}

createRoot(document.getElementById("root")!).render(<App />);
