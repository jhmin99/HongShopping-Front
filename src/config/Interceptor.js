import axios from 'axios';

// axios의 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/', // API의 기본 URL
    withCredentials: true, // 요청에 자격 증명 정보를 포함
});

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use(
    (request) => {
        const userdetails = JSON.parse(sessionStorage.getItem('userdetails'));

        if (userdetails && userdetails.accessToken) {
            request.headers['Authorization'] = `Bearer ${userdetails.accessToken}`;
        }

        console.log(userdetails);
        return request; // Promise.resolve 제거
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 403) {
            sessionStorage.removeItem('userdetails'); // 403 에러 발생 시 세션 스토리지에서 사용자 정보 제거
            window.location = '/signin'; // 403 에러 발생 시 /signin 페이지로 리다이렉트
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
