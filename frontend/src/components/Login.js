import { useEffect } from 'react'
import axios from 'axios'

function Login() {

    useEffect(() => {
        const url = new URL(window.location.href)
        const code = url.searchParams.get('code')
        fetchToken(code)
    }, [])

    const fetchToken = async (code) => {
        try {
            const response = await axios.post('http://localhost:4000/api/login', {authCode : code})
            localStorage.setItem('jwtToken', response.data.jwt)
            window.location.href = 'http://localhost:3000/login'
          } catch (error) {
            console.error(error)
            window.location.href = 'http://localhost:3000/login'
        }
    }

    return (
        <>
        
        </>
    )
}

export default Login