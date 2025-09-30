import {
    templateCard,
    templateNoData,
    searchStadiums,
    fillOptionsForFilter,
    filterBySport
} from './utils.js';

const API_URL = "http://localhost:8000/";

const stadiumsList = document.getElementById("stadiums-list");

const addForm = document.getElementById("add-stadium-form");
const stadiumNameInput = document.getElementById("stadium-name");
const stadiumLocationInput = document.getElementById("stadium-location");
const stadiumCapacityInput = document.getElementById("stadium-capacity");
const stadiumSportInput = document.getElementById("stadium-sport");

const editForm = document.getElementById("edit-stadium-form");
const editNameInput = document.getElementById("edit-stadium-name");
const editLocationInput = document.getElementById("edit-stadium-location");
const editCapacityInput = document.getElementById("edit-stadium-capacity");
const editSportInput = document.getElementById("edit-stadium-sport");
const modalWindow = document.getElementById("modal");
const closeModalButton = document.getElementById("close-modal");
const modalOverlay = document.getElementById("modal-overlay");

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const resetButton = document.getElementById("reset-button");

const sortCapacityButton = document.getElementById("sort-capacity");
let sortAscending = false;

const filterSportSelect = document.getElementById("filter-sport");

const stadiums = [];

const renderStadiums = (stadiumsToRender) => {
    const sortedStadiums = [...stadiumsToRender];
    sortAscending ? sortedStadiums.sort((a, b) => a.capacity - b.capacity) : sortedStadiums.sort((a, b) => b.capacity - a.capacity);
    stadiumsList.innerHTML = sortedStadiums.map(templateCard).join('');
}

async function fetchStadiums() {
    try {
        const response = await fetch(`${API_URL}stadiums`);
        if (!response.ok) {
            throw new Error(`Error fetching stadiums: ${response.statusText}`);
        }
        const fetchedStadiums = await response.json();
        console.log(fetchedStadiums);
        stadiums.length = 0;
        stadiums.push(...fetchedStadiums);
    }
    catch (error) {
        console.error("Failed to fetch stadiums:", error);
        stadiumsList.innerHTML = templateNoData();
        return;
    }

    if (stadiums.length === 0) {
        stadiumsList.innerHTML = templateNoData();
        return;
    }

    renderStadiums(stadiums);
}

function getInputValues() {
    const stadium = {
        name: stadiumNameInput.value.trim(),
        country: stadiumLocationInput.value.trim(),
        capacity: parseInt(stadiumCapacityInput.value.trim(), 10),
        primary_sport: stadiumSportInput.value.trim()
    };
    if (!stadium.name || !stadium.country || !stadium.capacity || !stadium.primary_sport) {
        alert("Please fill in all fields correctly.");
        return null;
    }
    if (isNaN(stadium.capacity) || stadium.capacity <= 0) {
        alert("Please enter a valid positive number for capacity.");
        stadiumCapacityInput.focus();
        stadiumCapacityInput.value = "";
        return null;
    }
    if (stadium.name.length > 100) {
        alert("Stadium name is too long. Maximum length is 100 characters.");
        stadiumNameInput.focus();
        return null;
    }
    if (stadium.country.length > 100) {
        alert("Country name is too long. Maximum length is 100 characters.");
        stadiumLocationInput.focus();
        return null;
    }
    if (stadium.primary_sport.length > 100) {
        alert("Primary sport name is too long. Maximum length is 100 characters.");
        stadiumSportInput.focus();
        return null;
    }
    return stadium;
}

const clearInputValues = () => {
    stadiumNameInput.value = "";
    stadiumLocationInput.value = "";
    stadiumCapacityInput.value = "";
    stadiumSportInput.value = "";
};

addForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const newStadium = getInputValues();
    if (!newStadium) return;

    try {
        const response = await fetch(`${API_URL}stadiums`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newStadium)
        });

        if (!response.ok) {
            throw new Error(`Error adding stadium: ${response.statusText}`);
        }

        const addedStadium = await response.json();
        stadiums.push(addedStadium);
        clearInputValues();
        renderStadiums(stadiums);
    } catch (error) {
        console.error("Failed to add stadium:", error);
    }
});

stadiumsList.addEventListener("click", async (event) => {
    if (event.target.classList.contains("main__list-button--delete")) {
        const stadiumId = event.target.id.replace("delete-", "");
        try {
            const response = await fetch(`${API_URL}stadiums/${stadiumId}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error(`Error deleting stadium: ${response.statusText}`);
            }

            const index = stadiums.findIndex(stadium => stadium.id === stadiumId);
            if (index !== -1) {
                stadiums.splice(index, 1);
                renderStadiums(stadiums);
            }

        } catch (error) {
            console.error("Failed to delete stadium:", error);
        }
    }
    else if (event.target.classList.contains("main__list-button--edit")) {
        const stadiumId = event.target.id.replace("edit-", "");
        const stadium = stadiums.find(s => s.id === stadiumId);
        if (!stadium) {
            console.error("Stadium not found for editing:", stadiumId);
            return;
        }

        modalOverlay.style.display = "flex";
        modalWindow.style.display = "block";

        editNameInput.value = stadium.name;
        editLocationInput.value = stadium.country;
        editCapacityInput.value = stadium.capacity;
        editSportInput.value = stadium.primary_sport;

        const handleEditSubmit = async (e) => {
            e.preventDefault();
            const updatedStadium = {
                id: stadiumId,
                name: editNameInput.value.trim(),
                country: editLocationInput.value.trim(),
                capacity: parseInt(editCapacityInput.value.trim(), 10),
                primary_sport: editSportInput.value.trim()
            };

            try {
                const response = await fetch(`${API_URL}stadiums/${stadiumId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updatedStadium)
                });

                if (!response.ok) {
                    throw new Error(`Error updating stadium: ${response.statusText}`);
                }

                const updatedData = await response.json();
                const index = stadiums.findIndex(s => s.id === stadiumId);
                if (index !== -1) {
                    stadiums[index] = updatedData;
                    renderStadiums(stadiums);
                }

                modalOverlay.style.display = "none";
                modalWindow.style.display = "none";
                editForm.removeEventListener("submit", handleEditSubmit);
            }
            catch (error) {
                console.error("Failed to update stadium:", error);
            }
        };

        const closeModal = () => {
            modalOverlay.style.display = "none";
            modalWindow.style.display = "none";
            editForm.removeEventListener("submit", handleEditSubmit);
        };

        closeModalButton.addEventListener("click", closeModal);

        editForm.addEventListener("submit", handleEditSubmit);
    }

});

searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (!query) {
        renderStadiums(stadiums);
        return;
    }
    const filteredStadiums = searchStadiums(stadiums, query);
    renderStadiums(filteredStadiums);
});

resetButton.addEventListener("click", () => {
    searchInput.value = "";
    renderStadiums(stadiums);
});


sortCapacityButton.addEventListener("click", () => {
    sortAscending = !sortAscending;
    sortCapacityButton.textContent = sortAscending ? "Capacity ↓" : "Capacity ↑";
    renderStadiums(stadiums);
});


filterSportSelect.addEventListener("change", () => {
    const selectedSport = filterSportSelect.value;
    const filteredStadiums = filterBySport(stadiums, selectedSport);
    renderStadiums(filteredStadiums);
});


fetchStadiums().then(() => {
    fillOptionsForFilter(filterSportSelect, stadiums);
});