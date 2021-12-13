import { v4 as uuidv4 } from 'uuid';

function saveBuild(buildName, userName, loggedInUserPrivilege, totalPrice, selectedComponents, loggedInUserEmail) {

  if (loggedInUserPrivilege === "admin") {

    fetch(`http://localhost:4000/api/SAVERACCOONBUILD`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "JWT": localStorage.getItem('jwtToken'),
      "USER_EMAIL": loggedInUserEmail,
      "BUILD_NAME": buildName,
      "BUILD_PRICE": totalPrice,
      "COMPONENT_LIST": selectedComponents,
      "USER_NAME" : userName,
      "BUILD_ID" : uuidv4()
    })})

  } else {

    fetch(`http://localhost:4000/api/SAVEBUILD`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "JWT": localStorage.getItem('jwtToken'),
      "USER_EMAIL": loggedInUserEmail,
      "BUILD_NAME": buildName,
      "BUILD_PRICE": totalPrice,
      "COMPONENT_LIST": selectedComponents,
      "USER_NAME" : userName,
      "BUILD_ID" : uuidv4()
    })})
  }
}

export default saveBuild