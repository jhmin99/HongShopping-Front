import React, { useState } from 'react';
import { verifyIdentification, signUp } from '../utils/UserUtils';
import '../css/SignUp.css'
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';


function SignUp() {
    // 입력값과 관련된 state 정의
    const [userId, setUserId] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userConfirmPassword, setUserConfirmPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [userBirthDate, setUserBirthDate] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [responseMessage_ID, setResponseMessage_ID] = useState('');
    const [responseMessage_SignUp, setResponseMessage_SignUp] = useState('');

    // 아이디 중복 체크 함수
    const handleVerifyIdentification = async () => {
        setIsLoading(true);
        try {
            const message = await verifyIdentification(userId);
            setResponseMessage_ID(message);
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
            setResponseMessage_SignUp(message);
        } catch (error) {
            // 그 외 에러
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container>
            <p className='title'>
                SignUp
            </p>
            <Form>



                {/* 아이디 입력 필드 */}
                <div>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="userId">ID</Form.Label>
                        <Form.Control type="text"
                            id="userId"
                            value={userId}
                            onChange={(event) => setUserId(event.target.value)}
                            disabled={isLoading} // 로딩 중에는 입력 비활성화
                            required
                            placeholder="Enter ID" />
                        <button type="button" onClick={handleVerifyIdentification} disabled={isLoading}>
                            verify ID
                        </button>
                        {responseMessage_ID && <p>{responseMessage_ID}</p>}
                    </Form.Group>
                    {/* 중복 확인 버튼 */}
                    {/* 응답 또는 오류 메시지 출력 */}
                    
                </div>
                {/* 비밀번호 입력 필드 */}
                <div>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="userPassword">Password</Form.Label>
                        <Form.Control type="password"
                            id="userPassword"
                            value={userPassword}
                            onChange={(event) => setUserPassword(event.target.value)}
                            disabled={isLoading}
                            required
                            placeholder="Password" />
                    </Form.Group>
                </div>
                {/* 비밀번호 확인 입력 필드 */}
                <div>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="userConfirmPassword">Confirm Password</Form.Label>
                        <Form.Control type="password"
                            id="userConfirmPassword"
                            value={userConfirmPassword}
                            onChange={(event) => setUserConfirmPassword(event.target.value)}
                            disabled={isLoading}
                            required
                            placeholder="Confirm Password" />
                    </Form.Group>

                </div>
                {/* 이름 입력 필드 */}
                <div>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="userName">Name</Form.Label>
                        <Form.Control type="text"
                            id="userName"
                            value={userName}
                            onChange={(event) => setUserName(event.target.value)}
                            disabled={isLoading}
                            required
                            placeholder="Name" />
                    </Form.Group>
                </div>
                {/* 생년월일 입력 필드 */}
                <div>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="userBirthDate">BirthDate</Form.Label>
                        <Form.Control type="date"
                            id="userBirthDate"
                            value={userBirthDate}
                            onChange={(event) => setUserBirthDate(event.target.value)}
                            disabled={isLoading}
                            required
                        />
                    </Form.Group>

                </div>
                {/* 핸드폰 번호 입력 필드 */}
                <div>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="userBirthDate">PhoneNumber</Form.Label>
                        <Form.Control type="text"
                            id="userPhoneNumber"
                            value={userPhoneNumber}
                            onChange={(event) => setUserPhoneNumber(event.target.value)}
                            disabled={isLoading}
                            required
                            placeholder="PhoneNumber (exclude '-')"
                        />
                    </Form.Group>
                </div>
                {/* 회원 가입 버튼 */}
                <button type="button" onClick={handleSignUp} disabled={isLoading}>
                    submit
                </button>
            </Form>

            {/* 응답 또는 오류 메시지 출력 */}
            {responseMessage_SignUp && <p>{responseMessage_SignUp}</p>}
        </Container>
    );
}

export default SignUp;
