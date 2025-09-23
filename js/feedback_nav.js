const carousel_left_img = document.getElementById('feedback_carousel_left_img');
const carousel_right_img = document.getElementById('feedback_carousel_right_img');
const carousel_card = document.getElementById('feedback_card');


let dots = [];


for (let i = 1; i <= 4; i++) {
    const dot = document.getElementById(`dot${i}`);
    dots.push(dot);
}

let activeIndex = 0;

function updateDots(newActiveIndex) {
    dots[activeIndex].src = 'assets/dot.svg';
    dots[newActiveIndex].src = 'assets/active_dot.svg';
    activeIndex = newActiveIndex;
}

function updateRightArrow(newActiveIndex) {
    if (newActiveIndex === dots.length - 1) {
        carousel_right_img.src = 'assets/right_arrow.svg';
    }
    else {
        carousel_right_img.src = 'assets/right_active_arrow.svg';
    }
}

function updateLeftArrow(newActiveIndex) {
    if (newActiveIndex === 0) {
        carousel_left_img.src = 'assets/left_arrow.svg';
    }
    else {
        carousel_left_img.src = 'assets/left_active_arrow.svg';
    }
}

function animateCard(direction) {
    carousel_card.classList.add(`changing-${direction}-in`);
    setTimeout(() => {
        carousel_card.classList.remove(`changing-${direction}-in`);
        carousel_card.classList.add(`changing-${direction}-out`);

        setTimeout(() => {
            carousel_card.classList.remove(`changing-${direction}-out`);
        }, 400);
    }, 400);
}

updateLeftArrow(activeIndex);
updateRightArrow(activeIndex);
updateDots(activeIndex);

carousel_left_img.addEventListener('click', function () {
    if (activeIndex > 0) {
        const newActiveIndex = activeIndex - 1;
        updateDots(newActiveIndex);
        updateLeftArrow(newActiveIndex);
        updateRightArrow(newActiveIndex);
        animateCard('left');
    }
});

carousel_right_img.addEventListener('click', function () {
    if (activeIndex < dots.length - 1) {
        const newActiveIndex = activeIndex + 1;
        updateDots(newActiveIndex);
        updateLeftArrow(newActiveIndex);
        updateRightArrow(newActiveIndex);
        animateCard('right');
    }
});