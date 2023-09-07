const API_URL = "http://localhost:3000/api";

const requests = {
  GET: async (callback) => {
    const response = await fetch(`${API_URL}/transcribe`);
    const data = await response.json();
    if (callback) {
      callback(data);
    }
  },
  PUT: async (payload, callback) => {
    const response = await fetch(`${API_URL}/translate`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (callback) {
      callback(data);
    }
  },
};


window.onload = () => {
  console.group("Window loaded");

  // Elements
  const formGet = document.getElementById("form-get");
  const resultGet = document.getElementById("result-get");
  const formPut = document.getElementById("form-put");
  const resultPut = document.getElementById("result-put");

  // Event Listeners
  formGet.addEventListener("submit", (event) => {
    event.preventDefault();
    requests.GET((data) => {
      resultGet.innerHTML = JSON.stringify(data, null, 2);
    });
  });
  formPut.addEventListener("submit", (event) => {
    event.preventDefault();
    requests.PUT(
      JSON.parse(event.currentTarget.payload.value),
      (data) => {
        resultPut.innerHTML = JSON.stringify(data, null, 2);
      }
    );
  });

  console.groupEnd();
};