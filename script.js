document.addEventListener("DOMContentLoaded", function () {
  const urlAPI = "https://restcountries.com/v3.1/region/europe";
  const card = document.querySelector(".cardsFlag");
  const countrySearch = document.querySelector(".countrySearch");
  const darkModeButton = document.querySelector(".toggle-dark-mode");

  async function searchData(data, input) {
    return data.filter((item) => {
      const searchTerm = input.toLowerCase();
      return item.name.common.toLowerCase().includes(searchTerm);
    });
  }

  async function getData() {
    try {
      const res = await axios.get(urlAPI);
      const countries = res.data;
      card.innerHTML = "";
      countries.forEach((item) => {
        renderCountryCard(item);
      });
      countrySearch.addEventListener("input", async (event) => {
        event.preventDefault();
        const searchTerm = countrySearch.value.trim();
        const filteredData = await searchData(countries, searchTerm);
        renderCountries(filteredData);
      });
    } catch (error) {
      console.error("Error. Xatoooo:", error);
    }
  }

  function renderCountryCard(item) {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
            <img class="flagImage" src="${item.flags.svg}" alt="">
            <div class="intoFlag">
                <p class="flagName">${item.name.common}</p>
                <div class="flagInfo">
                    <p class="population">Population: ${item.population}</p>
                    <p class="region">Region: ${item.region}</p>
                    <p class="capital">Capital: ${item.capital}</p>
                </div>
            </div>`;
    card.append(div);
  }

  function renderCountries(data) {
    card.innerHTML = "";
    data.forEach((item) => {
      renderCountryCard(item);
    });
  }

  darkModeButton.addEventListener("click", toggleDarkMode);

  function toggleDarkMode(event) {
    event.preventDefault();
    const body = document.body;
    const isDarkMode = body.classList.contains("dark-mode");
    body.classList.toggle("dark-mode", !isDarkMode);

    if (isDarkMode) {
      darkModeButton.textContent = "Light Mode";
      localStorage.setItem("themeMode", "light");
    } else {
      darkModeButton.textContent = "Dark Mode";
      localStorage.setItem("themeMode", "dark");
    }
  }

  function setInitialThemeMode() {
    const savedThemeMode = localStorage.getItem("themeMode");
    if (savedThemeMode === "dark") {
      document.body.classList.add("dark-mode");
      darkModeButton.textContent = "Dark Mode";
    } else {
      document.body.classList.remove("dark-mode");
      darkModeButton.textContent = "Dark Mode";
    }
  }

  setInitialThemeMode();
  getData();
  
});
