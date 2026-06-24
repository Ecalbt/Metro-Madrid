const metroData = window.METRO_DATA;
const stations = metroData.stations;
const edges = metroData.edges;
const stationById = Object.fromEntries(stations.map((station) => [station.id, station]));
const lineColors = metroData.lineColors;

let startId = null;
let goalId = null;
let startPoint = null;
let goalPoint = null;
let pickMode = null;
let activeStationId = null;
let pathEdgeKeys = new Set();
let forbiddenEdges = new Set();
let showAllLines = false;

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
document.getElementById("toggleLinesBtn").addEventListener("click", toggleShowAllLines);

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
  showAllLines = false;
  removePointMarkers();
  renderAll();
}

function findAndRenderPath() {
  if (!startPoint || !goalPoint || !startId || !goalId) {
    showNotify(
      "warning",
      "Thiếu thông tin",
      "Vui lòng chọn đủ điểm đầu và điểm cuối trên bản đồ trước khi tìm đường."
    );
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
  renderToggleButton();
  renderLineLegend();
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
    const blockedCount = forbiddenEdges.size;
    showNotify(
      "error",
      "Không tìm thấy đường đi",
      `Thuật toán A* không thể tìm được đường đi từ <strong>${stationById[startId].name}</strong> đến <strong>${stationById[goalId].name}</strong>.<br><br>` +
      (blockedCount > 0
        ? `Hiện có <strong>${blockedCount}</strong> tuyến bị cấm. Hãy thử bỏ cấm một số tuyến rồi tìm lại.`
        : `Hai ga này có thể không nằm trên cùng một mạng lưới liên thông.`)
    );
    resultBox.innerHTML = `<span style="color:var(--danger);font-weight:600">✕ Không tìm thấy đường đi.</span>`;
    return;
  }

  const stationNames = result.pathStations.map((id) => stationById[id].name);
  const usedLines = [...new Set(result.pathEdges.map((metroEdge) => metroEdge.line))];
  const lineSegments = buildLineSegments(result);
  const startConnectorCost = haversine(startPoint, stationById[startId]);
  const goalConnectorCost = haversine(goalPoint, stationById[goalId]);
  const totalCost = result.totalCost + startConnectorCost + goalConnectorCost;

  resultBox.innerHTML = `
    <div class="result-header">Đường đi tối ưu</div>

    <div class="result-stats">
      <div class="stat-card">
        <span class="stat-value">${totalCost.toFixed(2)}</span>
        <span class="stat-label">km tổng</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">${result.pathStations.length}</span>
        <span class="stat-label">ga đi qua</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">${usedLines.length}</span>
        <span class="stat-label">tuyến</span>
      </div>
    </div>

    <div class="result-connectors">
      <div class="connector-info start-connector">
        <span class="connector-dot start"></span>
        <span>Điểm đầu → <strong>${stationById[startId].name}</strong> (${startConnectorCost.toFixed(2)} km)</span>
      </div>
    </div>

    <div class="route-timeline">
      ${lineSegments.map((seg, i) => renderTimelineSegment(seg, i, lineSegments.length)).join("")}
    </div>

    <div class="result-connectors">
      <div class="connector-info goal-connector">
        <span class="connector-dot goal"></span>
        <span><strong>${stationById[goalId].name}</strong> → Điểm cuối (${goalConnectorCost.toFixed(2)} km)</span>
      </div>
    </div>

    <details class="route-details">
      <summary>Xem toàn bộ ga</summary>
      <p class="full-route">${stationNames.join(" → ")}</p>
    </details>
  `;
}

function buildLineSegments(result) {
  if (result.pathEdges.length === 0) return [];

  return result.pathEdges.reduce((segments, metroEdge, index) => {
    const fromStation = stationById[result.pathStations[index]];
    const toStation = stationById[result.pathStations[index + 1]];
    const lastSegment = segments[segments.length - 1];

    if (!lastSegment || lastSegment.line !== metroEdge.line) {
      segments.push({
        line: metroEdge.line,
        stations: [fromStation.name, toStation.name],
      });
      return segments;
    }

    lastSegment.stations.push(toStation.name);
    return segments;
  }, []);
}

function renderTimelineSegment(segment, index, total) {
  const color = lineColors[segment.line] || "#0b7285";
  const isFirst = index === 0;
  const isLast = index === total - 1;

  const stationDots = segment.stations.map((name, i) => {
    const isSegFirst = i === 0;
    const isSegLast = i === segment.stations.length - 1;
    const isTransfer = (isSegFirst && !isFirst) || (isSegLast && !isLast);
    const dotClass = isTransfer ? "timeline-dot transfer" : "timeline-dot";

    return `
      <div class="timeline-stop">
        <span class="${dotClass}" style="border-color:${color}; ${isTransfer ? 'background:' + color : ''}"></span>
        <span class="timeline-stop-name${isTransfer ? ' transfer-name' : ''}">${name}</span>
      </div>
    `;
  }).join("");

  const transferLabel = !isLast
    ? `<div class="transfer-badge">🔄 Chuyển tuyến</div>`
    : "";

  return `
    <div class="timeline-segment">
      <div class="timeline-line-badge" style="background:${color}">
        ${segment.line}
      </div>
      <div class="timeline-track" style="--line-color:${color}">
        ${stationDots}
      </div>
    </div>
    ${transferLabel}
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
      color: "#1e40af",
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
  if (showAllLines) return true;
  if (!activeStationId) return false;
  return metroEdge.from === activeStationId || metroEdge.to === activeStationId;
}

function toggleShowAllLines() {
  showAllLines = !showAllLines;
  renderAll();
}

function renderToggleButton() {
  const btn = document.getElementById("toggleLinesBtn");
  btn.textContent = showAllLines ? "Ẩn tất cả tuyến" : "Hiện tất cả tuyến";
  btn.classList.toggle("active", showAllLines);
}

function renderLineLegend() {
  const legend = document.getElementById("lineLegend");
  const list = document.getElementById("lineLegendList");

  if (!showAllLines) {
    legend.style.display = "none";
    return;
  }

  legend.style.display = "";

  const lineNames = Object.keys(lineColors);
  list.innerHTML = lineNames.map((lineName) => {
    const color = lineColors[lineName];
    return `
      <div class="line-legend-item">
        <span class="line-color-swatch" style="background:${color}"></span>
        <span class="line-legend-name">${lineName}</span>
      </div>
    `;
  }).join("");
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

// ── Notification Modal ──

const WARNING_ICON = `
  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
  <line x1="12" y1="9" x2="12" y2="13"/>
  <line x1="12" y1="17" x2="12.01" y2="17"/>
`;

const ERROR_ICON = `
  <circle cx="12" cy="12" r="10"/>
  <line x1="15" y1="9" x2="9" y2="15"/>
  <line x1="9" y1="9" x2="15" y2="15"/>
`;

function showNotify(type, title, message) {
  const overlay = document.getElementById("notifyOverlay");
  const iconWrap = document.getElementById("notifyIconWrap");
  const icon = document.getElementById("notifyIcon");
  const titleEl = document.getElementById("notifyTitle");
  const messageEl = document.getElementById("notifyMessage");
  const closeBtn = document.getElementById("notifyCloseBtn");

  iconWrap.className = "notify-icon-wrap " + type;
  icon.innerHTML = type === "error" ? ERROR_ICON : WARNING_ICON;
  titleEl.textContent = title;
  messageEl.innerHTML = message;
  closeBtn.className = "notify-close-btn " + type;

  overlay.classList.add("visible");
}

function closeNotify(event) {
  if (event && event.target !== document.getElementById("notifyOverlay")) return;
  document.getElementById("notifyOverlay").classList.remove("visible");
}
