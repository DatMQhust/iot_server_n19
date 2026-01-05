# Hướng dẫn kết nối Frontend - Backend IoT

Tài liệu này hướng dẫn cách gọi API và danh sách các thiết bị trong hệ thống.

## Base URL
`http://localhost:3000/api` (hoặc port server đang chạy)

## Danh sách Device Name và Sensor Type tương ứng
Sử dụng các cặp `deviceName` và `sensorType` sau:

| Device Name | Sensor Type | Mô tả |
|-------------|-------------|-------|
| `cam_bien_anh_sang` | `light` | Cảm biến ánh sáng |
| `den_led` | `led` | Đèn LED |
| `cam_bien_nhiet_do` | `temperature` | Cảm biến nhiệt độ |
| `cam_bien_do_am` | `humidity` | Cảm biến độ ẩm |
| `air_quality` | `co2`, `nh3`, `nox`, `alcohol`, `benzene` | Cảm biến chất lượng không khí |
| `quat` | `fan` | Quạt |
| `may_bom` | `pump` | Máy bơm |

## Các API chính

### 1. Lấy dữ liệu cảm biến mới nhất
- **Method:** `GET`
- **Route:** `/sensor/get-latest/:deviceName`
- **Ví dụ:** `GET /sensor/get-latest/cam_bien_nhiet_do`

### 2. Lấy lịch sử dữ liệu
- **Method:** `GET`
- **Route:** `/sensor-data/history/:deviceName`
- **Ví dụ:** `GET /sensor-data/history/air_quality`

### 3. Điều khiển thiết bị (Gửi lệnh)
- **Method:** `POST`
- **Route:** `/sensor/change-status`
- **Body:**
  ```json
  {
    "deviceName": "den_led",
    "sensorType": "led", 
    "value": 1 
  }
  ```
  *(Lưu ý: value thường là 1 (ON) hoặc 0 (OFF) cho các thiết bị điều khiển)*

### 4. Lấy danh sách tất cả thiết bị
- **Method:** `GET`
- **Route:** `/all-devices`
