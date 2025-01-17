let selectedPlayers = [];

fetch("players.json")
    .then(response => response.json())
    .then(data => {
        const menContainer = document.getElementById("men-players");
        data.men.forEach(player => {
            const playerDiv = createPlayerButton(player);
            menContainer.appendChild(playerDiv);
        });
    });

function createPlayerButton(player) {
    const playerDiv = document.createElement("div");
    playerDiv.classList.add("player-card");

    const playerImg = document.createElement("img");
    playerImg.src = player.photo;
    playerImg.alt = `${player.name} photo`;
    playerImg.classList.add("player-photo");
    playerImg.onclick = () => openPlayerStats(player);

    const playerButton = document.createElement("button");
    playerButton.innerText = player.name;
    playerButton.onclick = () => openPlayerStats(player);

    playerDiv.appendChild(playerImg);
    playerDiv.appendChild(playerButton);

    const compareCheckbox = document.createElement("input");
    compareCheckbox.type = "checkbox";
    compareCheckbox.onclick = () => selectPlayerForComparison(player);
    playerDiv.appendChild(compareCheckbox);

    return playerDiv;
}

function openPlayerStats(player) {
    localStorage.setItem("selectedPlayer", JSON.stringify(player));
    window.open("player-stats.html", "_blank");
}

function selectPlayerForComparison(player) {
    const index = selectedPlayers.findIndex(p => p.name === player.name);
    if (index > -1) {
        selectedPlayers.splice(index, 1);
    } else if (selectedPlayers.length < 2) {
        selectedPlayers.push(player);
    } else {
        alert("Only two players can be selected for comparison.");
    }
}

function openComparisonPage() {
    if (selectedPlayers.length === 2) {
        localStorage.setItem("comparisonPlayers", JSON.stringify(selectedPlayers));
        window.open("comparison.html", "_blank");
    } else {
        alert("Select two players to compare.");
    }
}
