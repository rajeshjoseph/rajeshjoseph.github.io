gsap.registerPlugin(Observer);

let sections = document.querySelectorAll("section"),
  images = document.querySelectorAll(".bg"),
  headings = gsap.utils.toArray(".section-heading"),
  outerWrappers = gsap.utils.toArray(".outer"),
  innerWrappers = gsap.utils.toArray(".inner"),
  currentIndex = -1,
  animating;

gsap.set(outerWrappers, { yPercent: 100 });
gsap.set(innerWrappers, { yPercent: -100 });

function gotoSection(index, direction) {
    if (index >= sections.length) {
        return
    }

    if (currentIndex == 0 && direction == -1 ) {
        return
    }

    animating = true;
    let fromTop = direction === -1,
        dFactor = fromTop ? -1 : 1,
        tl = gsap.timeline({
            defaults: { duration: 1.25, ease: "power1.inOut" },
            onComplete: () => animating = false
        });
    if (currentIndex >= 0) {
        // The first time this function runs, current is -1
        gsap.set(sections[currentIndex], { zIndex: 0 });
        tl.to(images[currentIndex], { yPercent: -15 * dFactor })
            .set(sections[currentIndex], { autoAlpha: 0 });
    }
    gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
    tl.fromTo([outerWrappers[index], innerWrappers[index]], {
        yPercent: i => i ? -100 * dFactor : 100 * dFactor
    }, {
        yPercent: 0
    }, 0)
        .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)


    currentIndex = index;
}

Observer.create({
    type: "wheel,touch,pointer",
    wheelSpeed: -1,
    onDown: () => !animating && gotoSection(currentIndex - 1, -1),
    onUp: () => !animating && gotoSection(currentIndex + 1, 1),
    tolerance: 5,
    preventDefault: true
});

gotoSection(0, 1);

function scrollToSection() {
    gotoSection(3, 1);
}


const ham = document.querySelector(".ham");
const menu = document.querySelector('ul.main-menu');
const links = menu.querySelectorAll('li');
const contact = document.querySelector(".contact");

var tl = gsap.timeline({ paused: true });

tl.to(menu, {
    duration: 1,
    opacity: 1,
    height: '30vh', // change this to 100vh for full-height menu
    ease: 'expo.inOut',
})
tl.from(links, {
    duration: 1,
    opacity: 0,
    y: 10,
    stagger: 0.1,
    ease: 'expo.inOut',
}, "-=0.5");

tl.reverse();

ham.addEventListener('click', () => {
    tl.reversed(!tl.reversed());
});

document.addEventListener('click', (event) => {
    if (!ham.contains(event.target)) {
        tl.reversed(true);
    }

    if (contact.contains(event.target)) {
        scrollToSection()
    }
});

// original: https://codepen.io/BrianCross/pen/PoWapLP
// horizontal version: https://codepen.io/GreenSock/pen/xxWdeMK

