function deleteBuild(buildId, loggedInUserPrivilege) {

  if (loggedInUserPrivilege === "admin") {

    fetch(`http://localhost:4000/api/DELETERACCOONBUILD`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "JWT": localStorage.getItem('jwtToken'),
          "REMOVABLE_ID" : buildId
        })})

    } else {
      
    fetch(`http://localhost:4000/api/DELETEBUILD`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "JWT": localStorage.getItem('jwtToken'),
          "REMOVABLE_ID" : buildId
        })})
    }
    
}



export default deleteBuild