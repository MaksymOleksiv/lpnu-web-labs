function templateCard(stadium) {
    return `<li class="main__list-item" id="item-${stadium.id}">
                    <div class="main__list-item-info">
                        <h3 class="main__list-item-title">${stadium.name} <span class="main__list-item-location">(${stadium.country})</span></h3>
                        <p class="main__list-item-details">Capacity: ${stadium.capacity} | Primary Sport: ${stadium.primary_sport}</p>
                    </div>
                    <div class="main__list-item-actions">
                        <button class="main__list-button main__list-button--edit" id="edit-${stadium.id}">Edit</button>
                        <button class="main__list-button main__list-button--delete" id="delete-${stadium.id}">Delete</button>
                    </div>
                </li>`;

}

function templateNoData() {
    return `<div class="main__list-empty">
                <span class="main__list-empty-text">No Stadium Found. Use the form above to add the first one!</span>
            </div>`;
}

function searchStadiums(stadiums, query) {
    query = query.trim().toLowerCase();
    if (!query) return stadiums;
    return stadiums.filter(stadium =>
        stadium.name.toLowerCase().includes(query) ||
        stadium.country.toLowerCase().includes(query) ||
        stadium.primary_sport.toLowerCase().includes(query) ||
        stadium.capacity.toString().includes(query)
    );
}

function filterBySport(stadiums, sport) {
    if (!sport || sport === "all") return stadiums;
    return stadiums.filter(stadium => stadium.primary_sport.toLowerCase() === sport.toLowerCase());
}


function getUniqueSports(stadiums) {
    const sportsSet = new Set(stadiums.map(stadium => stadium.primary_sport));
    return Array.from(sportsSet);
}

function fillOptionsForFilter(filterSportElement, stadiums) {
    const sports = getUniqueSports(stadiums);
    filterSportElement.innerHTML = `<option value="all">All Sports</option>` + sports.map(sport => `<option value="${sport}">${sport}</option>`).join('');
}

export { templateCard, templateNoData, searchStadiums, filterBySport, fillOptionsForFilter };