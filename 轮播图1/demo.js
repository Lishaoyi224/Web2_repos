
class Scroll {
    constructor() {
        this.imgArr = [
            "./img/b1.png",
            "./img/b2.png",
            "./img/b3.png",
            "./img/b4.png",
            "./img/b5.png",
        ];

        this.scrollContainerWidth = 1200;
        this.scrollTimer = null;
    }

    initScroll() {
        const scroll = this;
        let scrollListHTML = document.querySelector(".dsd-scroll ul");

        scroll.imgArr.map((item) => {
            const li = document.createElement('li');
            li.className = 'scroll';
            li.style.backgroundImage = `url('${item}')`;

            scrollListHTML.appendChild(li);
        });

        scroll.scrollResize(true);

        clearInterval(this.scrollTimer);
        this.scrollTimer = setInterval(() => {
            this.scrollRun();
        }, 3000);

        document.querySelector('.scroll-prev').addEventListener("click", () => {
            this.scrollRun("prev");
        });

        document.querySelector('.scroll-next').addEventListener("click", () => {
            this.scrollRun();
        });
    }

    scrollRun(isPrev) {
        const scroll = this;
        const scrollContainerWidth = 1200;
        const scrollListHTML = document.querySelector(".dsd-scroll ul");
        let leftDistance = parseInt(scrollListHTML.style.left) - scrollContainerWidth;

        if (isPrev) {
            leftDistance = parseInt(scrollListHTML.style.left) + scrollContainerWidth;
        }

        if ($('.dsd-scroll ul').is(':animated')) {
            return;
        }

        $('.dsd-scroll ul').animate({ left: leftDistance }, 1000, () => {
            if (leftDistance == 0) {
                scrollListHTML.style.left = (- scroll.scrollLength * scrollContainerWidth / 2) + "px";
            } else if (leftDistance == (1 - scroll.scrollLength) * scrollContainerWidth) {
                scrollListHTML.style.left = (1 - scroll.scrollLength / 2) * scrollContainerWidth + "px";
            }
        });
    }

    scrollResize() {
        const scroll = this;
        const scrollContainerWidth = 1200;

        const scrollListHTML = document.querySelector(".dsd-scroll ul");

        scrollListHTML.querySelectorAll(".scroll").forEach((adItemHTML) => {
            adItemHTML.style.width = scrollContainerWidth + "px";
            scrollListHTML.appendChild(adItemHTML.cloneNode(true));
        });

        scroll.scrollLength = scrollListHTML.querySelectorAll(".scroll").length;
        scrollListHTML.style.width = scroll.scrollLength * scrollContainerWidth + "px";
        scrollListHTML.style.left = -scroll.scrollLength * scrollContainerWidth / 2 + "px";
    }
}

const myScroll = new Scroll();
window.onload = () => {
    myScroll.initScroll();

}
