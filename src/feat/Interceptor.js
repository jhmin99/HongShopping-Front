import axios from 'axios';
import { getCookie } from '../utils/CookieUtils'; // 쿠키 유틸리티 import 추가

// axios의 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api', // API의 기본 URL
    withCredentials: true, // 요청에 자격 증명 정보를 포함
});

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use(
    (config) => {
        // 세션 스토리지에서 userdetails 가져오기
        const userdetails = sessionStorage.getItem('userdetails');
        const token = getCookie('XSRF-TOKEN'); // CSRF 토큰 가져오기

        // 요청 헤더에 CSRF 토큰 추가
        if (token) {
            config.headers['X-XSRF-TOKEN'] = token;
        }

        // userdetails가 존재하면 Authorization 헤더 추가
        if (userdetails) {
            config.headers['Authorization'] = `Basic ${JSON.parse(userdetails)}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
