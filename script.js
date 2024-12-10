document.querySelector('.fridge').addEventListener('click', function() {
    alert("ERR0R: freezer empty.buy more icecream");
});

const kitchenBg = document.querySelector('.kitchen-bg');
for (let i = 0; i < 400; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    kitchenBg.appendChild(tile);
}
$(".tile").on('click', function() {
    $(this).toggleClass("clicked");
});

$('.tile').on('mouseenter', function() {
    $(this).css({
        'animation': 'hoverStay 3s linear infinite alternate',
        'animation-fill-mode': 'forwards'
    });
});

$('.tile').on('mouseleave', function() {
    $(this).css({
        'animation-play-state': 'paused'
    });
});
