# Weather-Now 🌤️

A modern **React + Vite** web app to fetch and display current weather based on your location. The app first attempts **high-accuracy geolocation**, and falls back to **IP-based location** if geolocation fails. It fetches live weather data from **Open-Meteo API**, including temperature, wind speed, weather condition, and hourly humidity.  

---

## Features

- Detect user location via **Geolocation API** with fallback to **IP-based location**  
- Fetch **current weather**:  
  - Temperature (`temperature_2m`)  
  - Wind speed (`wind_speed_10m`)  
  - Weather condition (`weathercode`)  
- Fetch **hourly humidity**  
- Map Open-Meteo numeric weather codes to **human-readable conditions**  
- Display location as **city, region, country** or fallback to latitude/longitude  
- Responsive, clean UI with TailwindCSS  

---

## Demo

- Development preview in CodeSandbox: *(replace with your URL if available)*  
- Production URL via Vercel/Netlify: *(replace with your deployed URL)*  

---

## Tech Stack

- **Frontend:** React, Vite, TailwindCSS  
- **API:** Open-Meteo for weather, IPAPI for fallback geolocation  
- **Bundler:** Vite  

---

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/weather-now.git
cd weather-now
```
2. **Install dependencies**
```bash
pnpm install
# or
npm install
```
3. **Run the development server**
```bash
pnpm run dev
# or
npm run dev
```
4. **Open in browser**
Go to http://localhost:5173 (or the URL provided by Vite/CodeSandbox)

## Build for Production
```bash
pnpm run build
pnpm run preview
```
* `build` generates a `dist/` folder with optimized static files.
* `preview` serves the build locally to check before deployment.
## Folder Structure

```cshap
weather-now/
├─ public/
├─ src/
│  ├─ components/
│  │  ├─ Navbar.jsx
│  │  └─ WeatherCard.jsx
│  ├─ App.jsx
│  └─ main.jsx
├─ package.json
└─ vite.config.js
```

## Customization
* Update `weatherDescriptions` object in `src/components/WeatherWidget.jsx` to modify weather code mappings.
## Notes
* Requires a modern browser for Geolocation API
* Node.js v20+ recommended for running Vite locally