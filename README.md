# LiveD365 - Weekly Performance Portal

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Node.js](https://img.shields.io/badge/node-18+-green.svg)](https://nodejs.org/)

A comprehensive weekly performance tracking and reporting application built with React, TypeScript, and Tailwind CSS. Track metrics across Marketing, Client, Resource, and Modification categories with real-time analytics and persistent storage.

## 📋 About This Project

LiveD365 is a performance management tool designed to help teams track and analyze weekly metrics across multiple categories:

- **Marketing**: Email campaigns, content creation, client outreach
- **Client**: Requirements, feedback, deliverables, communication
- **Resource**: Team allocation, utilization, availability
- **Mod**: Modifications, updates, enhancements

The application provides both weekly and monthly analytics views with visual performance charts, note-taking capabilities, and persistent data storage.

## ✨ Features

- 📊 **Weekly & Monthly Views**: Toggle between detailed weekly metrics and aggregated monthly analytics
- 📈 **Performance Charts**: Visual representation of metrics with trend analysis
- 📝 **Notes & Comments**: Add contextual notes to any metric for better documentation
- 🗓️ **Week Navigation**: Easy selection and navigation between different weeks
- 🌙 **Dark Mode**: Full dark mode support for comfortable viewing
- 💾 **Local Data Persistence**: All data stored locally using browser storage
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- ✅ **Sample Data**: Pre-loaded realistic data for immediate testing

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- **npm** or **bun** package manager

### Installation

1. Clone the repository:
```sh
git clone https://github.com/nir555/Lived365_weekly_report.git
cd Lived365_weekly_report
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npm run dev
```

The app will be available at `http://localhost:5173` (or the next available port).

### Available Scripts

```sh
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting checks
npm run lint
```

## 🛠️ Technology Stack

| Technology | Version | Purpose |
|---|---|---|
| **React** | 18.3 | UI framework |
| **TypeScript** | 5.8 | Type safety |
| **Vite** | 5.4 | Build tool & dev server |
| **Tailwind CSS** | 3.4 | Styling & dark mode |
| **Shadcn UI** | Latest | Component library |
| **React Router** | v6 | Client-side routing |
| **React Query** | @tanstack/react-query | Data management |
| **Lucide Icons** | Latest | Icon system |
| **date-fns** | Latest | Date manipulation |

## 💾 Data Management

All metrics and notes are stored in the browser's **localStorage**:

- **Weekly Data**: Stored with week start date as key
- **Notes**: Associated with specific metric fields for context
- **Sample Data**: Automatically loaded on first use with 9 weeks of realistic data (Oct-Dec 2025)

### Reset to Sample Data

Open the browser console and run:
```js
window.resetDemoData()
```

This will clear all data and reload the sample dataset.

## 🎨 UI Components

The app uses **Shadcn UI** components for a consistent design system:
- Tabs, Select, Input, Button, Textarea
- Card, Dialog, Tooltip, Dropdown Menu
- Charts for data visualization
- Responsive sidebar and navigation

## 📊 Sample Data

The application comes pre-loaded with sample data containing:
- **9 weeks** of performance data (Oct 6 - Dec 5, 2025)
- **4 categories**: Marketing, Client, Resource, Mod
- **20+ metrics** across all categories
- **Sample notes** demonstrating the note feature

## 🔧 Development

### Setup Dev Environment

```sh
# Install dependencies
npm install

# Start dev server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Code Quality

```sh
# Run ESLint checks
npm run lint
```

### File Watching

The Vite dev server automatically watches for file changes and hot-reloads the browser.

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Usage

### Dashboard View
- Select month using month navigation arrows
- Toggle between Weekly and Monthly views
- Click on a week to see detailed metrics
- Click on metric cards to see notes

### Weekly Entry
- Navigate to the week you want to enter data for
- Input metrics in each section
- Add notes to any metric field
- Data is automatically saved

### Monthly Analytics
- Switch to Monthly view to see aggregated data
- View performance trends across the entire month
- All notes are searchable in the search box

## 🚀 Deployment

### Deploy to Vercel

The project is configured for deployment on Vercel:

```sh
npm run build
```

The `vercel.json` file contains routing configuration for SPA routing.

### Environment Variables

Currently, the app uses no external APIs - all data is stored locally. No environment variables needed.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Nir Patel**
- GitHub: [@nir555](https://github.com/nir555)

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Issues & Bug Reports

Found a bug? Please open an issue on GitHub with:
- Description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)

## 📚 Learn More

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com)
- [React Router](https://reactrouter.com)

## ⭐ Support

If you found this project helpful, please consider giving it a star on GitHub!

---

**Last Updated**: December 2025

- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
