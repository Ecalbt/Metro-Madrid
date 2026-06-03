# Madrid Metro A* Pathfinder

Ứng dụng web demo tìm đường đi trong hệ thống Metro Madrid bằng thuật toán A*. Người dùng có thể chọn điểm đầu, điểm cuối trên bản đồ, xem các ga metro gần nhất, cấm một số đoạn tuyến, rồi tìm đường đi phù hợp nhất.

## Cách Mở Ứng Dụng

Chạy server tĩnh trong thư mục project:

```bash
python3 -m http.server 5173
```

Sau đó mở trình duyệt tại:

```text
http://localhost:5173
```

Lưu ý: ứng dụng cần internet để tải bản đồ nền OpenStreetMap và thư viện Leaflet.

## Cách Sử Dụng

### 1. Xem Bản Đồ

Khi mở ứng dụng, bản đồ sẽ hiển thị các ga Metro Madrid. Mặc định chỉ hiện các ga, chưa hiện toàn bộ đường nối để bản đồ dễ nhìn hơn.

### 2. Chọn Điểm Đầu

1. Bấm nút `Chọn điểm đầu`.
2. Click vào một vị trí bất kỳ trên bản đồ.
3. Ứng dụng sẽ tự tìm ga gần nhất với điểm bạn chọn.
4. Một đường nét đứt sẽ nối từ điểm đầu tới ga gần nhất.

### 3. Chọn Điểm Cuối

1. Bấm nút `Chọn điểm cuối`.
2. Click vào vị trí muốn đến trên bản đồ.
3. Ứng dụng sẽ tự tìm ga gần nhất với điểm cuối.
4. Một đường nét đứt sẽ nối từ điểm cuối tới ga gần nhất.

### 4. Xem Các Tuyến Từ Một Ga

Bấm vào một ga trên bản đồ để xem các tuyến nối trực tiếp từ ga đó tới các ga lân cận.

Danh sách bên phải sẽ hiển thị:

- Ga hiện tại.
- Ga lân cận.
- Tên tuyến metro.
- Khoảng cách giữa hai ga.

### 5. Cấm Một Tuyến

Sau khi bấm vào một ga, các tuyến nối từ ga đó sẽ hiện trên bản đồ và trong danh sách bên phải.

Để cấm một tuyến:

1. Bấm vào tuyến trên bản đồ, hoặc bấm nút `Cấm` trong danh sách.
2. Tuyến bị cấm sẽ chuyển thành màu đỏ và nét đứt.
3. Khi tìm đường, A* sẽ không đi qua tuyến bị cấm đó.

Để bỏ cấm:

1. Bấm lại vào tuyến đang bị cấm, hoặc bấm nút `Bỏ cấm`.
2. Tuyến sẽ trở lại trạng thái bình thường.

### 6. Tìm Đường

Sau khi chọn đủ điểm đầu và điểm cuối, bấm:

```text
Tìm đường A*
```

Ứng dụng sẽ tìm đường đi tối ưu giữa hai ga gần nhất với điểm đầu và điểm cuối.

## Cách Đọc Kết Quả

Sau khi tìm đường, kết quả bên phải sẽ hiển thị:

- Ga gần nhất với điểm đầu.
- Ga gần nhất với điểm cuối.
- Đường đi theo từng line metro.
- Toàn bộ danh sách ga đi qua.
- Chi phí metro.
- Tổng chi phí gồm cả hai đoạn nối nét đứt.
- Số ga đi qua.
- Các tuyến metro cần dùng.
- Số node A* đã mở rộng.

Ví dụ:

```text
Line 1: PUERTA DEL SOL -> GRAN VIA
Line 5: GRAN VIA -> CHUECA -> ALONSO MARTINEZ
Line 10: ALONSO MARTINEZ -> GREGORIO MARAÑON -> NUEVOS MINISTERIOS
```

Cách hiểu:

- Đi Line 1 từ `PUERTA DEL SOL` đến `GRAN VIA`.
- Đổi sang Line 5 từ `GRAN VIA` đến `ALONSO MARTINEZ`.
- Đổi sang Line 10 để đi tiếp tới `NUEVOS MINISTERIOS`.

## Màu Sắc Trên Bản Đồ

- Chấm tròn: ga metro.
- Đường nét đứt từ điểm chọn tới ga: đoạn nối tới ga gần nhất.
- Đường xanh đậm: đường đi tối ưu tìm được.
- Đường đỏ nét đứt: tuyến đang bị cấm.
- Các màu khác: màu của từng line metro.

## Khi Không Tìm Thấy Đường

Nếu các tuyến bị cấm làm cho không còn đường đi phù hợp, ứng dụng sẽ hiển thị:

```text
Không tìm thấy đường đi phù hợp do các tuyến đường bị cấm.
```

Khi đó bạn có thể:

- Bỏ cấm một số tuyến.
- Chọn lại điểm đầu hoặc điểm cuối.
- Bấm `Đặt lại` để xóa toàn bộ lựa chọn.

## Nút Đặt Lại

Bấm `Đặt lại` để xóa:

- Điểm đầu.
- Điểm cuối.
- Ga đang xem.
- Danh sách tuyến bị cấm.
- Đường đi đã tìm được.

## Dữ Liệu Metro

Ứng dụng đang dùng dữ liệu Metro Madrid gồm:

- 264 ga.
- 297 đoạn nối.
- 16 tuyến: Line 1-12, Line R, Line ML1, Line ML2, Line ML3.

Khoảng cách giữa các ga được tính bằng khoảng cách địa lý Haversine, đơn vị km.

## Ghi Chú

Đây là website demo cho bài tập Intro AI. Kết quả tìm đường phù hợp để minh họa thuật toán A*, nhưng chưa tính đầy đủ các yếu tố thực tế như thời gian chờ tàu, lịch chạy tàu, phí đổi tuyến hoặc tình trạng vận hành hiện tại.
