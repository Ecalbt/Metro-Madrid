const stations = [
  { id: "sol", name: "Sol", lat: 40.4169, lng: -3.7033 },
  { id: "granvia", name: "Gran Via", lat: 40.4203, lng: -3.7018 },
  { id: "callao", name: "Callao", lat: 40.4201, lng: -3.7058 },
  { id: "opera", name: "Opera", lat: 40.4182, lng: -3.7094 },
  { id: "tribunal", name: "Tribunal", lat: 40.4260, lng: -3.7011 },
  { id: "bilbao", name: "Bilbao", lat: 40.4290, lng: -3.7022 },
  { id: "alonso", name: "Alonso Martinez", lat: 40.4277, lng: -3.6956 },
  { id: "chueca", name: "Chueca", lat: 40.4229, lng: -3.6976 },
  { id: "banco", name: "Banco de Espana", lat: 40.4195, lng: -3.6936 },
  { id: "retiro", name: "Retiro", lat: 40.4203, lng: -3.6863 },
  { id: "atocha", name: "Atocha", lat: 40.4066, lng: -3.6894 },
  { id: "lavapies", name: "Lavapies", lat: 40.4086, lng: -3.7009 },
  { id: "embajadores", name: "Embajadores", lat: 40.4051, lng: -3.7027 },
  { id: "delicias", name: "Delicias", lat: 40.4004, lng: -3.6942 },
  { id: "arguelles", name: "Arguelles", lat: 40.4305, lng: -3.7157 },
  { id: "moncloa", name: "Moncloa", lat: 40.4346, lng: -3.7191 },
  { id: "plazaespana", name: "Plaza de Espana", lat: 40.4238, lng: -3.7114 },
  { id: "noviciado", name: "Noviciado", lat: 40.4253, lng: -3.7074 },
  { id: "cuatrocaminos", name: "Cuatro Caminos", lat: 40.4469, lng: -3.7037 },
  { id: "riosrosas", name: "Rios Rosas", lat: 40.4419, lng: -3.7016 },
  { id: "iglesia", name: "Iglesia", lat: 40.4351, lng: -3.6987 },
  { id: "castellana", name: "Gregorio Maranon", lat: 40.4380, lng: -3.6919 },
  { id: "nuevosministerios", name: "Nuevos Ministerios", lat: 40.4466, lng: -3.6924 },
  { id: "cuzco", name: "Cuzco", lat: 40.4584, lng: -3.6896 },
  { id: "plazacastilla", name: "Plaza de Castilla", lat: 40.4669, lng: -3.6892 },
  { id: "santiagobernabeu", name: "Santiago Bernabeu", lat: 40.4516, lng: -3.6904 },
  { id: "principepio", name: "Principe Pio", lat: 40.4210, lng: -3.7203 },
  { id: "puertatoledo", name: "Puerta de Toledo", lat: 40.4070, lng: -3.7110 },
  { id: "piramedes", name: "Piramedes", lat: 40.4026, lng: -3.7137 },
  { id: "legazpi", name: "Legazpi", lat: 40.3911, lng: -3.6950 },
  { id: "mendezalvaro", name: "Mendez Alvaro", lat: 40.3953, lng: -3.6781 },
  { id: "pacifico", name: "Pacifico", lat: 40.4012, lng: -3.6751 },
  { id: "manuelbecerra", name: "Manuel Becerra", lat: 40.4279, lng: -3.6693 },
  { id: "goya", name: "Goya", lat: 40.4248, lng: -3.6755 },
  { id: "velazquez", name: "Velazquez", lat: 40.4250, lng: -3.6831 },
  { id: "serrano", name: "Serrano", lat: 40.4254, lng: -3.6876 },
  { id: "colon", name: "Colon", lat: 40.4254, lng: -3.6910 },
  { id: "sevilla", name: "Sevilla", lat: 40.4181, lng: -3.6993 },
  { id: "sainzbaranda", name: "Sainz de Baranda", lat: 40.4150, lng: -3.6695 },
];

const edges = [
  edge("sol", "granvia", "Line 1"),
  edge("granvia", "tribunal", "Line 1"),
  edge("tribunal", "bilbao", "Line 1"),
  edge("sol", "lavapies", "Line 3"),
  edge("lavapies", "embajadores", "Line 3"),
  edge("embajadores", "delicias", "Line 3"),
  edge("sol", "callao", "Line 3"),
  edge("callao", "plazaespana", "Line 3"),
  edge("plazaespana", "arguelles", "Line 3"),
  edge("arguelles", "moncloa", "Line 3"),
  edge("sol", "opera", "Line 2"),
  edge("opera", "plazaespana", "Line 2"),
  edge("plazaespana", "noviciado", "Line 2"),
  edge("noviciado", "tribunal", "Line 2"),
  edge("granvia", "chueca", "Line 5"),
  edge("chueca", "alonso", "Line 5"),
  edge("alonso", "bilbao", "Line 4"),
  edge("sol", "banco", "Line 2"),
  edge("banco", "retiro", "Line 2"),
  edge("banco", "atocha", "Line 1"),
  edge("atocha", "delicias", "Line 1"),
  edge("atocha", "lavapies", "Line 1"),
  edge("opera", "callao", "Line 5"),
  edge("bilbao", "iglesia", "Line 1"),
  edge("iglesia", "riosrosas", "Line 1"),
  edge("riosrosas", "cuatrocaminos", "Line 1"),
  edge("alonso", "castellana", "Line 10"),
  edge("castellana", "nuevosministerios", "Line 10"),
  edge("nuevosministerios", "santiagobernabeu", "Line 10"),
  edge("santiagobernabeu", "cuzco", "Line 10"),
  edge("cuzco", "plazacastilla", "Line 10"),
  edge("arguelles", "principepio", "Line 6"),
  edge("principepio", "puertatoledo", "Line 5"),
  edge("puertatoledo", "piramedes", "Line 5"),
  edge("piramedes", "legazpi", "Line 5"),
  edge("legazpi", "delicias", "Line 3"),
  edge("legazpi", "mendezalvaro", "Line 6"),
  edge("mendezalvaro", "pacifico", "Line 6"),
  edge("pacifico", "sainzbaranda", "Line 6"),
  edge("sainzbaranda", "manuelbecerra", "Line 6"),
  edge("manuelbecerra", "goya", "Line 2"),
  edge("goya", "retiro", "Line 2"),
  edge("goya", "velazquez", "Line 4"),
  edge("velazquez", "serrano", "Line 4"),
  edge("serrano", "colon", "Line 4"),
  edge("colon", "alonso", "Line 4"),
  edge("sol", "sevilla", "Line 2"),
  edge("sevilla", "banco", "Line 2"),
].filter(Boolean);

const stationById = Object.fromEntries(stations.map((station) => [station.id, station]));
const lineColors = {
  "Line 1": "#00a3e0",
  "Line 2": "#e03131",
  "Line 3": "#f59f00",
  "Line 4": "#7b2cbf",
  "Line 5": "#2f9e44",
  "Line 6": "#868e96",
  "Line 10": "#1c7ed6",
};

let startId = null;
let goalId = null;
let startPoint = null;
let goalPoint = null;
let pickMode = null;
let activeStationId = null;
let pathEdgeKeys = new Set();
let forbiddenEdges = new Set();

const markers = new Map();
const edgeLayers = new Map();
let startPointMarker = null;
let goalPointMarker = null;
let startConnector = null;
let goalConnector = null;

const map = L.map("map", { zoomControl: true }).setView([40.4178, -3.7016], 14);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

drawEdges();
drawStations();
renderAll();
setTimeout(() => {
  map.invalidateSize();
  map.fitBounds(stations.map((station) => [station.lat, station.lng]), {
    padding: [36, 36],
  });
}, 0);

map.on("click", handleMapClick);
document.getElementById("pickStartBtn").addEventListener("click", () => setPickMode("start"));
document.getElementById("pickGoalBtn").addEventListener("click", () => setPickMode("goal"));
document.getElementById("findPathBtn").addEventListener("click", findAndRenderPath);
document.getElementById("resetBtn").addEventListener("click", resetSelections);

function edge(from, to, line, weight, validate = true) {
  if (validate && (!stations.some((s) => s.id === from) || !stations.some((s) => s.id === to))) {
    return null;
  }

  const fromStation = stations.find((station) => station.id === from);
  const toStation = stations.find((station) => station.id === to);
  const distance = weight ?? haversine(fromStation, toStation);
  return {
    id: edgeKey(from, to),
    from,
    to,
    line,
    weight: Number(distance.toFixed(2)),
  };
}

function drawStations() {
  stations.forEach((station) => {
    const marker = L.marker([station.lat, station.lng], {
      icon: buildStationIcon(station.id),
      title: station.name,
    }).addTo(map);

    marker.on("click", () => {
      activeStationId = station.id;
      marker
        .bindPopup(`<strong>${station.name}</strong><br>Bấm tuyến trong panel để cấm hoặc bỏ cấm.`)
        .openPopup();
      renderAll();
    });

    markers.set(station.id, marker);
  });
}

function drawEdges() {
  edges.forEach((metroEdge) => {
    const from = stationById[metroEdge.from];
    const to = stationById[metroEdge.to];
    const layer = L.polyline(
      [
        [from.lat, from.lng],
        [to.lat, to.lng],
      ],
      edgeStyle(metroEdge),
    ).addTo(map);

    layer.bindTooltip(
      `${from.name} - ${to.name}<br>${metroEdge.line}, ${metroEdge.weight} km`,
      { sticky: true },
    );
    layer.on("click", () => toggleForbidden(metroEdge.id));
    edgeLayers.set(metroEdge.id, layer);
  });
}

function setStart(stationId) {
  startId = stationId;
  startPoint = stationById[stationId];
  if (goalId === stationId) goalId = null;
  pathEdgeKeys = new Set();
  renderAll();
}

function setGoal(stationId) {
  goalId = stationId;
  goalPoint = stationById[stationId];
  if (startId === stationId) startId = null;
  pathEdgeKeys = new Set();
  renderAll();
}

function resetSelections() {
  startId = null;
  goalId = null;
  startPoint = null;
  goalPoint = null;
  pickMode = null;
  activeStationId = null;
  pathEdgeKeys = new Set();
  forbiddenEdges = new Set();
  removePointMarkers();
  renderAll();
}

function findAndRenderPath() {
  if (!startPoint || !goalPoint || !startId || !goalId) {
    document.getElementById("resultBox").textContent =
      "Vui lòng chọn đủ điểm đầu và điểm cuối trên bản đồ.";
    return;
  }

  const result = aStar(startId, goalId, forbiddenEdges);
  pathEdgeKeys = new Set(result.pathEdges.map((metroEdge) => metroEdge.id));
  renderAll();
  renderResult(result);
}

function setPickMode(mode) {
  pickMode = mode;
  renderPickMode();
}

function handleMapClick(event) {
  if (!pickMode) return;

  const point = { lat: event.latlng.lat, lng: event.latlng.lng };
  const nearestStation = findNearestStation(point);

  if (pickMode === "start") {
    startPoint = point;
    startId = nearestStation.id;
  } else {
    goalPoint = point;
    goalId = nearestStation.id;
  }

  pathEdgeKeys = new Set();
  pickMode = null;
  renderAll();
}

function aStar(start, goal, blockedEdges) {
  const openSet = new Set([start]);
  const cameFrom = new Map();
  const gScore = new Map(stations.map((station) => [station.id, Infinity]));
  const fScore = new Map(stations.map((station) => [station.id, Infinity]));
  const visitedOrder = [];

  gScore.set(start, 0);
  fScore.set(start, heuristic(start, goal));

  while (openSet.size > 0) {
    const current = getLowestFScore(openSet, fScore);
    visitedOrder.push(current);

    if (current === goal) {
      return reconstructPath(cameFrom, current, visitedOrder);
    }

    openSet.delete(current);

    getNeighbors(current).forEach(({ neighborId, metroEdge }) => {
      if (blockedEdges.has(metroEdge.id)) return;

      const tentativeGScore = gScore.get(current) + metroEdge.weight;
      if (tentativeGScore < gScore.get(neighborId)) {
        cameFrom.set(neighborId, { previous: current, edge: metroEdge });
        gScore.set(neighborId, tentativeGScore);
        fScore.set(neighborId, tentativeGScore + heuristic(neighborId, goal));
        openSet.add(neighborId);
      }
    });
  }

  return {
    found: false,
    pathStations: [],
    pathEdges: [],
    totalCost: 0,
    visitedOrder,
  };
}

function heuristic(fromId, toId) {
  return haversine(stationById[fromId], stationById[toId]);
}

function getLowestFScore(openSet, fScore) {
  return [...openSet].reduce((best, stationId) =>
    fScore.get(stationId) < fScore.get(best) ? stationId : best,
  );
}

function reconstructPath(cameFrom, current, visitedOrder) {
  const pathStations = [current];
  const pathEdges = [];

  while (cameFrom.has(current)) {
    const step = cameFrom.get(current);
    pathEdges.unshift(step.edge);
    current = step.previous;
    pathStations.unshift(current);
  }

  return {
    found: true,
    pathStations,
    pathEdges,
    totalCost: pathEdges.reduce((sum, metroEdge) => sum + metroEdge.weight, 0),
    visitedOrder,
  };
}

function getNeighbors(stationId) {
  return edges
    .filter((metroEdge) => metroEdge.from === stationId || metroEdge.to === stationId)
    .map((metroEdge) => ({
      neighborId: metroEdge.from === stationId ? metroEdge.to : metroEdge.from,
      metroEdge,
    }));
}

function renderAll() {
  renderSelections();
  renderPickMode();
  renderActiveStation();
  renderForbiddenList();
  updatePointMarkers();
  updateMarkerIcons();
  updateEdgeStyles();
}

function renderSelections() {
  document.getElementById("startStation").textContent =
    startPoint && startId ? `Gần nhất: ${stationById[startId].name}` : "Chưa chọn";
  document.getElementById("goalStation").textContent =
    goalPoint && goalId ? `Gần nhất: ${stationById[goalId].name}` : "Chưa chọn";
}

function renderPickMode() {
  const startButton = document.getElementById("pickStartBtn");
  const goalButton = document.getElementById("pickGoalBtn");
  const hint = document.getElementById("pickHint");

  startButton.classList.toggle("active", pickMode === "start");
  goalButton.classList.toggle("active", pickMode === "goal");

  if (pickMode === "start") {
    hint.textContent = "Click lên bản đồ để đặt điểm đầu. Hệ thống sẽ nối tới ga gần nhất.";
  } else if (pickMode === "goal") {
    hint.textContent = "Click lên bản đồ để đặt điểm cuối. Hệ thống sẽ nối tới ga gần nhất.";
  } else {
    hint.textContent = "Bấm nút chọn điểm rồi click một vị trí bất kỳ trên bản đồ.";
  }
}

function renderActiveStation() {
  const activeName = document.getElementById("activeStationName");
  const list = document.getElementById("neighborList");

  if (!activeStationId) {
    activeName.textContent = "Bấm vào một ga trên bản đồ.";
    list.innerHTML = "";
    return;
  }

  activeName.textContent = stationById[activeStationId].name;
  list.innerHTML = getNeighbors(activeStationId)
    .map(({ neighborId, metroEdge }) => renderEdgeCard(metroEdge, neighborId))
    .join("");
}

function renderForbiddenList() {
  const list = document.getElementById("forbiddenList");
  const blocked = edges.filter((metroEdge) => forbiddenEdges.has(metroEdge.id));

  if (blocked.length === 0) {
    list.className = "edge-list empty";
    list.textContent = "Chưa có tuyến bị cấm.";
    return;
  }

  list.className = "edge-list";
  list.innerHTML = blocked.map((metroEdge) => renderEdgeCard(metroEdge)).join("");
}

function renderEdgeCard(metroEdge, neighborId) {
  const from = stationById[metroEdge.from];
  const to = stationById[metroEdge.to];
  const neighbor = neighborId ? stationById[neighborId] : null;
  const isForbidden = forbiddenEdges.has(metroEdge.id);
  const title = neighbor
    ? `${stationById[activeStationId].name} -> ${neighbor.name}`
    : `${from.name} - ${to.name}`;
  const buttonLabel = isForbidden ? "Bỏ cấm" : "Cấm";
  const buttonClass = isForbidden ? "secondary" : "danger";

  return `
    <article class="edge-card ${isForbidden ? "forbidden" : ""}">
      <div>
        <p class="edge-title">${title}</p>
        <p class="edge-meta">${metroEdge.line} - ${metroEdge.weight.toFixed(2)} km</p>
      </div>
      <button type="button" class="${buttonClass}" onclick="toggleForbidden('${metroEdge.id}')">
        ${buttonLabel}
      </button>
    </article>
  `;
}

function renderResult(result) {
  const resultBox = document.getElementById("resultBox");

  if (!result.found) {
    resultBox.textContent =
      "Không tìm thấy đường đi phù hợp do các tuyến đường bị cấm.";
    return;
  }

  const stationNames = result.pathStations.map((id) => stationById[id].name);
  const usedLines = [...new Set(result.pathEdges.map((metroEdge) => metroEdge.line))];
  const startConnectorCost = haversine(startPoint, stationById[startId]);
  const goalConnectorCost = haversine(goalPoint, stationById[goalId]);
  const totalCost = result.totalCost + startConnectorCost + goalConnectorCost;

  resultBox.innerHTML = `
    <strong>Đường đi tối ưu:</strong>
    <ul>
      <li>Điểm đầu nối tới ga gần nhất: ${stationById[startId].name} (${startConnectorCost.toFixed(2)} km)</li>
      <li>Điểm cuối nối tới ga gần nhất: ${stationById[goalId].name} (${goalConnectorCost.toFixed(2)} km)</li>
      <li>${stationNames.join(" -> ")}</li>
      <li>Chi phí metro: ${result.totalCost.toFixed(2)} km</li>
      <li>Tổng chi phí gồm hai đoạn nối nét đứt: ${totalCost.toFixed(2)} km</li>
      <li>Số ga đi qua: ${result.pathStations.length}</li>
      <li>Tuyến metro cần dùng: ${usedLines.join(", ")}</li>
      <li>Số node A* đã mở rộng: ${result.visitedOrder.length}</li>
    </ul>
  `;
}

function updateMarkerIcons() {
  markers.forEach((marker, stationId) => {
    marker.setIcon(buildStationIcon(stationId));
  });
}

function updateEdgeStyles() {
  edges.forEach((metroEdge) => {
    const layer = edgeLayers.get(metroEdge.id);
    const shouldShow = isEdgeVisible(metroEdge);

    if (shouldShow && !map.hasLayer(layer)) {
      layer.addTo(map);
    } else if (!shouldShow && map.hasLayer(layer)) {
      layer.removeFrom(map);
    }

    layer.setStyle(edgeStyle(metroEdge));
  });
}

function updatePointMarkers() {
  startPointMarker = syncPointMarker(startPointMarker, startPoint, "S", "start-point");
  goalPointMarker = syncPointMarker(goalPointMarker, goalPoint, "G", "goal-point");
  startConnector = syncConnector(startConnector, startPoint, startId, "#2f9e44");
  goalConnector = syncConnector(goalConnector, goalPoint, goalId, "#c2255c");
}

function syncPointMarker(marker, point, label, className) {
  if (!point) {
    if (marker) marker.removeFrom(map);
    return null;
  }

  const icon = L.divIcon({
    className: "",
    html: `<span class="point-marker ${className}">${label}</span>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });

  if (!marker) {
    return L.marker([point.lat, point.lng], { icon }).addTo(map);
  }

  marker.setLatLng([point.lat, point.lng]);
  marker.setIcon(icon);
  return marker;
}

function syncConnector(connector, point, stationId, color) {
  if (!point || !stationId) {
    if (connector) connector.removeFrom(map);
    return null;
  }

  const station = stationById[stationId];
  const latlngs = [
    [point.lat, point.lng],
    [station.lat, station.lng],
  ];
  const style = {
    color,
    weight: 3,
    dashArray: "6 8",
    opacity: 0.9,
  };

  if (!connector) {
    return L.polyline(latlngs, style).addTo(map);
  }

  connector.setLatLngs(latlngs);
  connector.setStyle(style);
  if (!map.hasLayer(connector)) connector.addTo(map);
  return connector;
}

function removePointMarkers() {
  [startPointMarker, goalPointMarker, startConnector, goalConnector].forEach((layer) => {
    if (layer) layer.removeFrom(map);
  });
  startPointMarker = null;
  goalPointMarker = null;
  startConnector = null;
  goalConnector = null;
}

function buildStationIcon(stationId) {
  const classes = ["station-marker"];
  if (stationId === startId) classes.push("start");
  if (stationId === goalId) classes.push("goal");
  if (stationId === activeStationId) classes.push("active");

  return L.divIcon({
    className: "",
    html: `<span class="${classes.join(" ")}"></span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -9],
  });
}

function edgeStyle(metroEdge) {
  if (forbiddenEdges.has(metroEdge.id)) {
    return {
      color: "#d64545",
      weight: 5,
      dashArray: "8 8",
      opacity: 0.9,
    };
  }

  if (pathEdgeKeys.has(metroEdge.id)) {
    return {
      color: "#f59f00",
      weight: 8,
      dashArray: null,
      opacity: 0.95,
    };
  }

  return {
    color: lineColors[metroEdge.line] || "#0b7285",
    weight: 4,
    dashArray: null,
    opacity: 0.72,
  };
}

function isEdgeVisible(metroEdge) {
  if (pathEdgeKeys.has(metroEdge.id)) return true;
  if (!activeStationId) return false;
  return metroEdge.from === activeStationId || metroEdge.to === activeStationId;
}

function toggleForbidden(edgeId) {
  if (forbiddenEdges.has(edgeId)) {
    forbiddenEdges.delete(edgeId);
  } else {
    forbiddenEdges.add(edgeId);
  }
  pathEdgeKeys = new Set();
  renderAll();
}

function edgeKey(a, b) {
  return [a, b].sort().join("__");
}

function findNearestStation(point) {
  return stations.reduce((nearest, station) => {
    const distance = haversine(point, station);
    if (!nearest || distance < nearest.distance) {
      return { ...station, distance };
    }
    return nearest;
  }, null);
}

function haversine(a, b) {
  const earthRadiusKm = 6371;
  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);
  const lat1 = toRadians(a.lat);
  const lat2 = toRadians(b.lat);

  const value =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * earthRadiusKm * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
}

function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}
