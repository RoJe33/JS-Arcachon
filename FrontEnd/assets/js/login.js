// LOGIN

// Poste des données à l'API
const postToAPI = async (url, body) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      return { data: await response.json(), status: response.status };
    } catch (error) {
      console.error("Une erreur est survenue", error);
      return null;
    }
  };
  
  // Gère la soumission du formulaire de connexion
  const handleFormSubmission = async (event) => {
    event.preventDefault();
    const email = document.querySelector("#mail").value;
    const password = document.querySelector("#password").value;
    const response = await postToAPI("http://localhost:5678/api/users/login", {
      email,
      password,
    });
  
    if (response && response.status === 200) {
      localStorage.setItem("user", JSON.stringify(response.data.userId));
      localStorage.setItem("token", response.data.token);
      location.href = "index.html";
    } else {
      document.getElementById("error-message").textContent =
        "Identifiant ou mot de passe incorrect";
    } 
  };

  const form = document.getElementById("formLogin");

if (form) {
    form.addEventListener("submit", handleFormSubmission);
  }

  