import { useNavigate } from 'react-router-dom'

function Home() {
    let navigate = useNavigate();

    return (
        <button onClick={() => { navigate('/signup') }}>회원가입</button>
    )
}

export default Home;