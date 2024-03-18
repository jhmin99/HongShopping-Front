import React, { useState } from 'react';
import { verifyIdentification, signUp } from '../utils/UserUtils';
import '../css/SignUp.css'
function SignUp() {
    // 입력값과 관련된 state 정의
    const [userId, setUserId] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userConfirmPassword, setUserConfirmPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [userBirthDate, setUserBirthDate] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    // 아이디 중복 체크 함수
    const handleVerifyIdentification = async () => {
        setIsLoading(true);
        try {
            const message = await verifyIdentification(userId);
            setResponseMessage(message);
        } catch (error) {
            // 그 외 에러
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    // 회원 가입 함수
    const handleSignUp = async () => {
        setIsLoading(true);
        try {
            const signUpDto = {
                identification: userId,
                password: userPassword,
                confirmPassword: userConfirmPassword,
                name: userName,
                birthDate: userBirthDate,
                phoneNumber: userPhoneNumber
            }; // 사용자 데이터 생성
            const message = await signUp(signUpDto);
            setResponseMessage(message);
        } catch (error) {
            // 그 외 에러
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="App">
            <form>
                {/* 아이디 입력 필드 */}
                <div>
                <label htmlFor="userId">아이디:</label>
                <input
                    type="text"
                    id="userId"
                    value={userId}
                    onChange={(event) => setUserId(event.target.value)}
                    disabled={isLoading} // 로딩 중에는 입력 비활성화
                    required
                />
                {/* 중복 확인 버튼 */}
                <button type="button" onClick={handleVerifyIdentification} disabled={isLoading}>
                    중복 확인
                </button>
                </div>
                {/* 비밀번호 입력 필드 */}
                <div>
                <label htmlFor="userPassword">비밀번호:</label>
                <input
                    type="password"
                    id="userPassword"
                    value={userPassword}
                    onChange={(event) => setUserPassword(event.target.value)}
                    disabled={isLoading}
                    required
                />
                </div>
                {/* 비밀번호 확인 입력 필드 */}
                <div>
                <label htmlFor="userConfirmPassword">비밀번호 확인:</label>
                <input
                    type="password"
                    id="userConfirmPassword"
                    value={userConfirmPassword}
                    onChange={(event) => setUserConfirmPassword(event.target.value)}
                    disabled={isLoading}
                    required
                />
                </div>
                {/* 이름 입력 필드 */}
                <div>
                <label htmlFor="userName">이름:</label>
                <input
                    type="text"
                    id="userName"
                    value={userName}
                    onChange={(event) => setUserName(event.target.value)}
                    disabled={isLoading}
                    required
                />
                </div>
                {/* 생년월일 입력 필드 */}
                <div>
                <label htmlFor="userBirthDate">생년월일:</label>
                <input
                    type="date"
                    id="userBirthDate"
                    value={userBirthDate}
                    onChange={(event) => setUserBirthDate(event.target.value)}
                    disabled={isLoading}
                    required
                />
                </div>
                {/* 핸드폰 번호 입력 필드 */}
                <div>
                <label htmlFor="userPhoneNumber">핸드폰 번호:</label>
                <input
                    type="text"
                    id="userPhoneNumber"
                    value={userPhoneNumber}
                    onChange={(event) => setUserPhoneNumber(event.target.value)}
                    disabled={isLoading}
                    required
                />
                </div>
                {/* 회원 가입 버튼 */}
                <button type="button" onClick={handleSignUp} disabled={isLoading}>
                    회원 가입
                </button>
            </form>

            {/* 응답 또는 오류 메시지 출력 */}
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
}

export default SignUp;
