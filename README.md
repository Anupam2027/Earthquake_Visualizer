# 🌍 Earthquake Visualizer

A modern web application to **visualize real-time earthquake data worldwide**, built with **React, Vite, Tailwind CSS, and Leaflet**.  
It fetches live seismic activity from the **USGS Earthquake API** and provides an interactive map to explore earthquake magnitudes, depths, and locations.

🔗 **Live Demo**: [Earthquake Visualizer](https://earthquakevisualizer.vercel.app/)

---

## 🚀 Features

- 🌐 **Interactive World Map**
  - Built with [React Leaflet](https://react-leaflet.js.org/)  
  - Clustered earthquake markers for better visualization  

- 📊 **Dynamic Earthquake Data**
  - Powered by [USGS Earthquake API](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)  
  - Filter earthquakes by **last 1, 3, 7, 10, 20, or 30 days**  
  - Search by **custom date range** using calendar or manual input  

- 🗺 **Tectonic Plates Overlay**
  - Visualize global tectonic plate boundaries  

- 🔍 **Detailed Popups**
  - Location, magnitude, depth, and date/time of each earthquake  
  - Direct link to USGS for more info  

- 🎨 **Modern UI/UX**
  - Responsive layout (mobile, tablet, desktop)  
  - Dark/Light mode toggle  
  - Floating legend for earthquake magnitude colors  

- ⚡ **Performance Optimized**
  - Marker clustering  
  - Chunked loading for large datasets  

---

## 📸 Screenshots

### 🌍 Map with Earthquake Clusters
![Map Screenshot](https://i.ibb.co/YPRJwbX/map.png)

### 📊 Navbar with Filters
![Navbar Screenshot](https://i.ibb.co/jwFrMdn/navbar.png)

---

## 🛠 Tech Stack

- **Frontend Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)  
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)  
- **Maps & Visualization**: [React Leaflet](https://react-leaflet.js.org/), [Leaflet](https://leafletjs.com/), [react-leaflet-cluster](https://github.com/yuzhva/react-leaflet-markercluster)  
- **Date Picker**: [React DatePicker](https://reactdatepicker.com/)  
- **API**: [USGS Earthquake GeoJSON Feeds](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)  

---

## 📦 Installation & Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/Anupam2027/earthquake-visualizer.git
cd earthquake-visualizer
npm install
npm run dev

