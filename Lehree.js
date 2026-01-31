const MAX_VOTES_PER_CATEGORY = 5;

function updateCategoryButtons(categoryName) {
    const section = document.querySelector(`.category-section[data-category="${categoryName}"]`);
    const buttons = section.querySelectorAll(".voteBtn");
    const totalVotesInCat = parseInt(localStorage.getItem("totalVotes_" + categoryName)) || 0;

    buttons.forEach((btn, index) => {
        const hasVotedThis = localStorage.getItem(`voted_${categoryName}_${index}`) === "true";
        
        if (hasVotedThis) {
            btn.disabled = true;
            btn.innerText = "Gestimmt";
        } else if (totalVotesInCat >= MAX_VOTES_PER_CATEGORY) {
            btn.disabled = true;
            btn.innerText = "Limit voll";
        }
    });
}

document.querySelectorAll(".category-section").forEach(section => {
    const categoryName = section.getAttribute("data-category");
    const buttons = section.querySelectorAll(".voteBtn");
    const displays = section.querySelectorAll(".counter");

    buttons.forEach((btn, index) => {
        const display = displays[index];
        const storageKeyCount = `count_${categoryName}_${index}`;
        const storageKeyVoted = `voted_${categoryName}_${index}`;

        let count = parseInt(localStorage.getItem(storageKeyCount)) || 0;
        display.innerText = "Stimmen: " + count;

        btn.addEventListener("click", () => {
            let totalVotesInCat = parseInt(localStorage.getItem("totalVotes_" + categoryName)) || 0;

            if (totalVotesInCat < MAX_VOTES_PER_CATEGORY && localStorage.getItem(storageKeyVoted) !== "true") {
                count++;
                totalVotesInCat++;

                localStorage.setItem(storageKeyCount, count);
                localStorage.setItem(storageKeyVoted, "true");
                localStorage.setItem("totalVotes_" + categoryName, totalVotesInCat);

                display.innerText = "Stimmen: " + count;
                updateCategoryButtons(categoryName);
            }
        });
    });

    updateCategoryButtons(categoryName);
});



function resetVotes() {
    localStorage.clear();
    location.reload();
}


