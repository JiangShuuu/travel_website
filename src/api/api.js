import axios from "axios";
import jsSHA from "jssha";

const apiClient = axios.create({
  baseURL: "https://ptx.transportdata.tw/MOTC/v2/Tourism/",
  withCredentials: false,
});

// 請求攔截器
apiClient.interceptors.request.use((config) => {
  config.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...getAuthorizationHeader(),
  };
  return config;
});

export default {
  getCityScenicSpot(city) {
    return apiClient.get(`/ScenicSpot/${city}`, {
      params: {
        $format: "JSON",
      },
    });
  },
  getCityRestaurant(city) {
    return apiClient.get(`/Restaurant/${city}`, {
      params: {
        $format: "JSON",
      },
    });
  },
  getCityHotel(city) {
    return apiClient.get(`/Hotel/${city}`, {
      params: {
        $format: "JSON",
      },
    });
  },
  getCityActivity(city, month) {
    return apiClient.get(`/Activity/${city}`, {
      params: {
        $filter: `month(StartTime) eq ${month} or month(EndTime) eq ${
          month - 1
        }`,
        $format: "JSON",
      },
    });
  },
  getScenicSpot(city) {
    return apiClient.get(`/ScenicSpot/${city}`, {
      params: {
        $format: "JSON",
      },
    });
  },
  // getRestaurant(city, id) {
  //   return apiClient.get(`/Restaurant/${city}`, {
  //     params: {
  //       $filter: `ID eq '${id}'`,
  //       $format: "JSON",
  //     },
  //   });
  // },
  // getHotel(city, id) {
  //   return apiClient.get(`/Hotel/${city}`, {
  //     params: {
  //       $filter: `ID eq '${id}'`,
  //       $format: "JSON",
  //     },
  //   });
  // },
  // getNearSites(lat, lon, distance) {
  //   return apiClient.get(
  //     "/ScenicSpot?$top=10&$spatialFilter=nearby(" +
  //       lat +
  //       "%2C%20" +
  //       lon +
  //       "%2C%20" +
  //       distance +
  //       ")&$format=JSON"
  //   );
  // },
  // getNearRestaurant(lat, lon, distance) {
  //   return apiClient.get(
  //     "/Restaurant?$top=10&$spatialFilter=nearby(" +
  //       lat +
  //       "%2C%20" +
  //       lon +
  //       "%2C%20" +
  //       distance +
  //       ")&$format=JSON"
  //   );
  // },
  // getNearHotel(lat, lon, distance) {
  //   return apiClient.get(
  //     "/Hotel?$top=10&$spatialFilter=nearby(" +
  //       lat +
  //       "%2C%20" +
  //       lon +
  //       "%2C%20" +
  //       distance +
  //       ")&$format=JSON"
  //   );
  // },
};

function getAuthorizationHeader() {
  //  填入自己 ID、KEY 開始
  let AppID = "33ecd324d4084707a62413c23a1ece29";
  let AppKey = "JtRAJIiLPKb-dYO-WLhQfteqgeU";
  //  填入自己 ID、KEY 結束
  let GMTString = new Date().toGMTString();
  let ShaObj = new jsSHA("SHA-1", "TEXT");
  ShaObj.setHMACKey(AppKey, "TEXT");
  ShaObj.update("x-date: " + GMTString);
  let HMAC = ShaObj.getHMAC("B64");
  let Authorization =
    'hmac username="' +
    AppID +
    '", algorithm="hmac-sha1", headers="x-date", signature="' +
    HMAC +
    '"';
  return { Authorization: Authorization, "X-Date": GMTString };
}
