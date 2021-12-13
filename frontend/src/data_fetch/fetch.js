async function getJSONDataFromServer(setServerData, endPoint) {
    const response = await fetch(`http://localhost:4000/api/${endPoint}`)
    const data = await response.json()
    setServerData(data)
  }

export default getJSONDataFromServer