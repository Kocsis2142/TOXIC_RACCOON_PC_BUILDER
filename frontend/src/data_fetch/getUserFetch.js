import Axios from 'axios'

function getUserFetch(jwtToken, setUserInfo, setLoggedInUserName, setLoggedInPrivilege, setLoggedInUserEmail) {
  Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/api/userToken",
      headers: {
        jwt : jwtToken
      }
    }).then((res) => {
      if (!res.data.jwtIsValid) {
        setUserInfo(null)
        setLoggedInUserName(null)
        setLoggedInPrivilege(null)
        setLoggedInUserEmail(null)
      }
    });
}

export default getUserFetch