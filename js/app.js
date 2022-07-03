let life = document.querySelector('.life__anim');

function amin(){
    life.classList.toggle('active');
    setTimeout(() => amin(), 500);
}

setTimeout(() => amin(), 500);

let keys = document.querySelectorAll('.key');

keys.forEach(element => {
    element.style.width = random(27, 33) + "%";
});

function random (min, max){
    return Math.floor(Math.random()*(max-min+1))+min;
}

console.log(random(10, 50))

let header = document.querySelectorAll('.header__btn');
header.forEach(element => {
    let blockClass = element.getAttribute('data-block');
    let block = document.querySelector(blockClass);
    element.addEventListener('click', function(){
        block.scrollIntoView({block: "center", behavior: "smooth"})
    })
});

document.addEventListener('scroll', function(){
    header.forEach(element => {
        let blockClass = element.getAttribute('data-block');
        let block = document.querySelector(blockClass);
        let scroll = offsetPosition(block);
        if(window.pageYOffset > scroll && window.pageYOffset > (element.offsetHeight+scroll) ) {
            element.classList.add('active');
        } else {
            element.classList.remove('active');
        }
    });
})

function offsetPosition(element) {
    var offsetLeft = 0, offsetTop = 0;
    do {
        offsetLeft += element.offsetLeft;
        offsetTop  += element.offsetTop;
    } while (element = element.offsetParent);
    return offsetTop;
}

let key = document.querySelectorAll('.key');

key.forEach(element => {
    element.addEventListener('mouseover', ()=>{
        element.classList.add('active')
    });
    element.addEventListener('mouseout', ()=>{
        element.classList.remove('active')

    })
});