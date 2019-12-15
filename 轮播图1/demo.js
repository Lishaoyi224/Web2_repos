
class Scroll {
    constructor() {
        this.imgArr = [
            "./img/b1.png",
            "./img/b2.png",
            "./img/b3.png",
            "./img/b4.png",
            "./img/b5.png",
        ];

        this.scrollTimer = null;
        this.index = 1;
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

        scroll.scrollHeader();
        scroll.scrollResize();

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

        document.querySelectorAll(".num-item").forEach((item) => {
            const num = item.innerHTML;
            item.addEventListener("click", () => {
                scroll.clickNum(num);
            });
        });
    }

    scrollRun(isPrev) {
        const scroll = this;

        const scrollListHTML = document.querySelector(".dsd-scroll ul");
        let leftDistance = parseInt(scrollListHTML.style.left) - 1200;

        if (isPrev) {
            leftDistance = parseInt(scrollListHTML.style.left) + 1200;
        }

        animate(scrollListHTML, { left: leftDistance }, () => {
            if (leftDistance == 0) {
                scrollListHTML.style.left = (- 10 * 1200 / 2) + "px";
            } else if (leftDistance == (1 - 10) * 1200) {
                scrollListHTML.style.left = (1 - 10 / 2) * 1200 + "px";
            }
        });

    }

    scrollResize() {
        const scroll = this;

        const scrollListHTML = document.querySelector(".dsd-scroll ul");

        scrollListHTML.querySelectorAll(".scroll").forEach((adItemHTML) => {
            adItemHTML.style.width = 1200 + "px";
            scrollListHTML.appendChild(adItemHTML.cloneNode(true));
        });

        scrollListHTML.style.width = 10 * 1200 + "px";
        scrollListHTML.style.left = -10 * 1200 / 2 + "px";
    }

    clickNum(num) {
        const scroll = this;

        const scrollListHTML = document.querySelector(".dsd-scroll ul");
        scrollListHTML.style.left = - num * 1200 + "px";
    }

    scrollHeader() {
        const scroll = this;
        let rightDistance = -320;
        let timer = setInterval(() => {
            rightDistance += 2;
            document.querySelector(".warn-text span").style.right = rightDistance + "px";
            if (rightDistance > 1080) {
                rightDistance = -320;
            }
        }, 100);
    }
}

const myScroll = new Scroll();
window.onload = () => {
    myScroll.initScroll();

}
