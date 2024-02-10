const API_URL = "https://reqres.in/api/users";

let userInfoData = [];
const userContainer = document.getElementById("user-container");

async function getUserInfo() {
  try {
    const data = await fetch(API_URL);
    const dataInJson = await data.json();
    userInfoData = dataInJson.data;
    generateAllCards(userInfoData)
  } catch (error) {
    console.log("There was an error", error);
    userInfoData = [];
  }
}

function createCardUI(user) {
  let cardUI = `
    <div class="card  m-4" style="width: 18rem;">
  <img src=${user.avatar} class="card-img-top" alt="...">
  <div class="card-body">
    <h1>${user.first_name} ${user.last_name}</h1>
    <p class="card-text">${user.email}</p>
  </div>
  <button class="btn btn-primary">Get Details</button>
</div>
    `;

  userContainer.innerHTML += cardUI;
}

function generateAllCards(userData = []) {
    for(let i = 0 ; i < userData.length; i++) {
        createCardUI(userData[i]);
    }
}


async function getAdditionalDetails(userId) {
  try {
      const response = await fetch(`${API_URL}/${userId}`);
      const userData = await response.json();
      displayAdditionalDetails(userData);
    } catch (error) {
      console.log("There was an error", error);
    }
  }

  function displayAdditionalDetails(user) {
    const userClickedInfo = document.getElementById("user-clicked-info");
    userClickedInfo.innerHTML = `
      <h2>Additional Details</h2>
      <p>ID: ${user.data.id}</p>
      <p>Name: ${user.data.first_name} ${user.data.last_name}</p>
      <p>Email: ${user.data.email}</p>
      <img src="${user.data.avatar}" alt="User Avatar">
    `;
  }

  userContainer.addEventListener("click", async (event) => {
      const userId = event.target.dataset.userId;
      await getAdditionalDetails(userId);
    }
  );

  getUserInfo();