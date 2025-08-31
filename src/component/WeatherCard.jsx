import React, { useEffect, useState } from "react";
import { MapPin, Droplet, Wind } from "lucide-react";
import { toast } from "sonner";

const weatherDescriptions = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snow fall",
  73: "Moderate snow fall",
  75: "Heavy snow fall",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm (slight or moderate)",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};

const WeatherCard = () => {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState({
    temperature: null,
    wind: null,
    humidity: null,
    condition: "",
    location: "",
  });

  // Live clock
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch location + weather
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        let lat, lon, city, region, country;

        // 1️⃣ Try Geolocation API first
        if (navigator.geolocation) {
          const geoPromise = new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
              (pos) => resolve(pos.coords),
              (err) => reject(err),
              {
                enableHighAccuracy: true, // GPS if available
                timeout: 5000, // 15s timeout
                maximumAge: 0, // don't use cached coords
              }
            );
          });

          try {
            const coords = await geoPromise;
            lat = coords.latitude;
            lon = coords.longitude;
          } catch (geoError) {
            console.warn(
              "Geolocation failed:",
              geoError.code,
              geoError.message
            );
            // fallback to IP lookup
          }
        }

        // 2️⃣ Fallback to IP-based lookup if geolocation unavailable
        if (!lat || !lon) {
          // toast.info("Using IP-based location lookup.");
          const ipRes = await fetch("https://ipapi.co/json/");
          const ipData = await ipRes.json();
          lat = ipData.latitude;
          lon = ipData.longitude;
          city = ipData.city;
          region = ipData.region;
          country = ipData.country_name;
        }

        // 3️⃣ Fetch weather data from Open-Meteo
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,weathercode&hourly=relative_humidity_2m`
        );
        const weatherData = await weatherRes.json();

        const current = weatherData.current;
        const hourly = weatherData.hourly;
        const humidity = hourly?.relative_humidity_2m?.[0] ?? null;

        // 4️⃣ Update state
        setWeather({
          temperature: current.temperature_2m,
          wind: current.wind_speed_10m,
          humidity,
          condition: weatherDescriptions[current.weathercode] || "Unknown",
          location:
            city && region && country
              ? `${city}, ${region}, ${country}`
              : `${lat.toFixed(2)}, ${lon.toFixed(2)}`,
        });
      } catch (err) {
        console.error("Weather fetch failed:", err);
        toast.error("Failed to fetch weather data. Please try again later.");
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="bg-[#1a1a1a] text-[#c9c9c9] rounded-2xl shadow-lg p-6 w-[400px] space-y-4">
      {/* Location */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <MapPin size={18} className="text-sky-400" />
          <span className="text-sm truncate max-w-[250px]">
            {weather.location || "Fetching location..."}
          </span>
        </div>
      </div>

      {/* Weather Now */}
      <div className="flex justify-between items-center bg-[#222] p-4 rounded-xl">
        <div>
          <p className="text-sm text-sky-400">Now</p>
          <h3 className="font-semibold text-white">
            {weather.condition || "Loading..."}
          </h3>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-white">
            {weather.temperature !== null ? `${weather.temperature}°` : "--"}
          </p>
          <p className="text-xs">
            {weather.wind !== null ? `${weather.wind} km/h wind` : "--"}
          </p>
        </div>
      </div>

      {/* Clock */}
      <div className="bg-[#222] p-4 rounded-xl text-center">
        <p className="text-xs text-gray-400">
          {time.toLocaleDateString(undefined, {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </p>
        <p className="text-3xl font-bold text-white mt-1">
          {time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </p>
      </div>

      {/* Humidity + Wind */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#222] p-4 rounded-xl flex items-center gap-2">
          <Droplet size={18} className="text-sky-400" />
          <div>
            <p className="text-xs">Humidity</p>
            <p className="font-semibold text-white">
              {weather.humidity !== null ? `${weather.humidity}%` : "--"}
            </p>
          </div>
        </div>
        <div className="bg-[#222] p-4 rounded-xl flex items-center gap-2">
          <Wind size={18} className="text-sky-400" />
          <div>
            <p className="text-xs">Wind</p>
            <p className="font-semibold text-white">
              {weather.wind !== null ? `${weather.wind} km/h` : "--"}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="text-xs text-center text-gray-500">
        Data via Open-Meteo • Location via GPS/IP
      </p>
    </div>
  );
};

export default WeatherCard;
