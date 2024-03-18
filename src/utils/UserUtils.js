import axios from 'axios';

// 아이디 중복 체크 함수
async function verifyIdentification(signUpDto_getIdentification) {
    try {
        const response = await axios.post('/api/users/check-id', { identification: signUpDto_getIdentification });
        // 아이디 사용가능
        return response.data.statusMessage;
    } catch (error) {
        // 중복된 아이디
        if (error.response && error.response.status === 400 && error.response.data.statusMessage) {
            return error.response.data.statusMessage;
        } else if (error.response && error.response.status === 400 && error.response.data.identification) {
            return error.response.data.identification;
        } else {
            // 유효성 검사 실패 or 내부 서버 에러
            throw error;
        }
    }
}

// 회원 가입 함수
async function signUp(signUpDto) {
    try {
        const response = await axios.post('/api/users', signUpDto);
        // 회원가입 성공
        return response.data.statusMessage;
    } catch (error) {
        // 비밀번호 불일치 or 불가한 생년월일 
        if (error.response && error.response.status === 400 && error.response.data.statusMessage) {
            return error.response.data.statusMessage;
        } else if (error.response && error.response.status === 400) {
            const errorFields = [];
            // 각 에러 필드에 대한 정보를 배열에 저장
            if (error.response.data.identification) {
                errorFields.push(`아이디: ${error.response.data.identification}`);
            }
            if (error.response.data.password) {
                errorFields.push(`비밀번호: ${error.response.data.password}`);
            }
            if (error.response.data.confirmPassword) {
                errorFields.push(`비밀번호 확인: ${error.response.data.confirmPassword}`);
            }
            if (error.response.data.name) {
                errorFields.push(`이름: ${error.response.data.name}`);
            }
            if (error.response.data.birthDate) {
                errorFields.push(`생년월일: ${error.response.data.birthDate}`);
            }
            if (error.response.data.phoneNumber) {
                errorFields.push(`핸드폰 번호: ${error.response.data.phoneNumber}`);
            }
            // 에러 메시지 조합
            return `${errorFields.join('\n')}`;
        }
        else {
            // 내부 서버 에러
            return error.response.data.errorMessage;
        }
    }
}

export { verifyIdentification, signUp };
