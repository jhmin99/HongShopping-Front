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

        return request;
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
    async (error) => {
        const originalRequest = error.config;
        const userdetails = JSON.parse(sessionStorage.getItem('userdetails'));

        // Access token 만료 시
        if (error.response && error.response.status === 401 && !originalRequest._retry && userdetails && userdetails.refreshToken) {
            originalRequest._retry = true;

            try {
                // Refresh token을 사용하여 새로운 access token 요청
                const response = await axiosInstance.post('/api/refresh-token', {
                    refreshToken: userdetails.refreshToken
                });

                // 새로운 access token을 세션에 저장
                userdetails.accessToken = response.data.accessToken;
                sessionStorage.setItem('userdetails', JSON.stringify(userdetails));

                // 원래의 요청을 새로운 access token으로 다시 시도
                originalRequest.headers['Authorization'] = `Bearer ${userdetails.accessToken}`;
                await axiosInstance(originalRequest);

                // 새로운 access token이 유효하므로 /home으로 리다이렉션
                window.location = '/home';
                return;
            } catch (refreshError) {
                // Refresh token 만료 시 세션 스토리지를 비우고 로그인 페이지로 리다이렉션
                if (refreshError.response && refreshError.response.status === 403) {
                    sessionStorage.removeItem('userdetails');
                    window.location = '/signin';
                }
                return Promise.reject(refreshError);
            }
        }

        // 기타 에러 처리
        return Promise.reject(error);
    }
);

export default axiosInstance;
