# Madrid Metro A* Pathfinder

Demo web cho bài tập lớn Intro AI: mô hình hóa mạng Metro Madrid từ dữ liệu GTFS của CRTM thành đồ thị và dùng thuật toán A* để tìm đường đi ngắn nhất khi có thể cấm một số đoạn nối trực tiếp giữa hai ga.

## Cách chạy

Mở `index.html` bằng trình duyệt, hoặc chạy server tĩnh:

```bash
python3 -m http.server 5173
```

Sau đó mở `http://localhost:5173`.

Ứng dụng dùng Leaflet và OpenStreetMap qua CDN, nên máy cần internet để tải thư viện và nền bản đồ.

## Cập nhật dữ liệu Metro Madrid

Các file GTFS tải về nằm trong thư mục `api/`. Để sinh lại dữ liệu cho website, chạy:

```bash
python3 tools/build_metro_data.py
```

Script sẽ đọc `stops.txt`, `routes.txt`, `trips.txt`, `stop_times.txt` và sinh file `data/metro-madrid.js`. File hiện tại có 230 ga, 262 cạnh và 13 tuyến metro.

## Chức năng

- Hiển thị các ga Metro Madrid từ dữ liệu GTFS CRTM trên bản đồ.
- Mỗi ga là một node, mỗi đoạn nối giữa hai ga là một edge.
- Chọn điểm đầu và điểm cuối bằng cách click hai vị trí bất kỳ trên bản đồ.
- Hệ thống tự tìm ga gần nhất với mỗi điểm và nối bằng đường nét đứt.
- Bấm vào ga để xem các tuyến nối đến ga lân cận.
- Cấm hoặc bỏ cấm từng edge riêng lẻ.
- A* bỏ qua các edge nằm trong `forbiddenEdges`.
- Mặc định chỉ hiện ga. Edge chỉ hiện khi bấm vào một ga, hoặc khi edge thuộc đường đi tối ưu.
- Highlight đường đi tối ưu trên bản đồ.
- Hiển thị tổng chi phí, số ga đi qua, các line metro cần dùng và số node đã mở rộng.

## Cấu trúc code chính

- `stations`: danh sách ga, gồm `id`, `name`, `lat`, `lng`.
- `edges`: danh sách cạnh, gồm `from`, `to`, `line`, `weight`.
- `data/metro-madrid.js`: dữ liệu sinh tự động từ GTFS, được load trước `script.js`.
- `tools/build_metro_data.py`: script convert GTFS sang cấu trúc graph dùng trong web.
- `startPoint`, `goalPoint`: hai điểm bất kỳ người dùng click trên bản đồ.
- `startId`, `goalId`: ga gần nhất với hai điểm đó, dùng làm node bắt đầu/kết thúc cho A*.
- `forbiddenEdges`: `Set` lưu id các edge bị cấm.
- `aStar(start, goal, blockedEdges)`: thuật toán A*.
- `heuristic(fromId, toId)`: dùng khoảng cách Haversine giữa tọa độ hai ga.
- `getNeighbors(stationId)`: lấy các cạnh nối từ một ga đến ga lân cận.
- `findNearestStation(point)`: tìm ga gần nhất với điểm bất kỳ trên bản đồ.
- `renderResult(result)`: hiển thị đường đi tối ưu và thống kê.

## Giải thích khi bảo vệ

Bài toán subway có thể mô hình hóa thành đồ thị vì hệ thống metro gồm các điểm dừng và các đoạn nối giữa chúng. Mỗi ga là một node vì đó là trạng thái/vị trí mà người dùng có thể đứng. Mỗi đoạn nối trực tiếp giữa hai ga là một edge vì tàu có thể đi từ ga này sang ga kia. Edge cần trọng số để biểu diễn chi phí di chuyển, ví dụ khoảng cách hoặc thời gian.

Trong giao diện hiện tại, người dùng không bắt buộc click đúng vào ga. Người dùng chọn hai điểm bất kỳ trên bản đồ. Hệ thống dùng khoảng cách Haversine để tìm ga gần nhất với từng điểm, vẽ hai đoạn nối nét đứt, rồi chạy A* giữa hai ga gần nhất đó.

A* phù hợp vì mục tiêu là tìm đường đi tối ưu từ ga xuất phát đến ga đích trên đồ thị có trọng số. Dijkstra chỉ dùng chi phí thực tế `g(n)` từ start đến node hiện tại. A* dùng thêm heuristic `h(n)` để ước lượng chi phí còn lại đến goal, nên việc tìm kiếm được hướng về phía đích.

Công thức:

```text
f(n) = g(n) + h(n)
```

Trong đó `g(n)` là chi phí đã đi thật, `h(n)` là chi phí ước lượng còn lại, và `f(n)` là độ ưu tiên của node trong quá trình mở rộng. A* luôn chọn node có `f(n)` nhỏ nhất.

Tuyến bị cấm được xử lý ngay trước khi xét cạnh:

```js
if (blockedEdges.has(metroEdge.id)) return;
```

Nếu edge nằm trong `forbiddenEdges`, thuật toán bỏ qua edge đó. Nếu không, thuật toán tiếp tục tính `tentativeGScore` và cập nhật đường đi như bình thường.

Nếu heuristic không vượt quá chi phí thực tế còn lại, A* sẽ tìm được đường đi tối ưu. Trong project này heuristic là khoảng cách Haversine theo tọa độ latitude/longitude.
