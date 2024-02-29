const miniGameWrapper = document.querySelectorAll('.mini__game')[0];


const Roulette = (function () {

    const rotationStopEventName = "rotationStop";
    const rotationStartEventName = "rotationStart";

    const rouletteClass = "roulette";
    const rouletteListClass = "roulette__list";
    const roulettePrizeClass = "roulette__prize";

    const PrizeNotFoundException = "Prize not found";
    const ItemsNotFoundException = "Items not found";
    const NotImplementedException = "Not implemented";
    const NotEnoughArgumentsException = "Not enough arguments";
    const ContainerUndefinedException = "Container was undefined";
    const RotationIsAlreadyActiveException = "Rotation is already active";

    const rotationTokens = new WeakMap();

    class Prize {

        constructor(element, index, spacing, width, height) {
            this.index = index;
            this.element = element;

            let wrapper = document.createElement("li");
            wrapper.classList.add(roulettePrizeClass);
            wrapper.style.marginRight = `${spacing}px`;
            // wrapper.style.minWidth = `${width}px`;
            // wrapper.style.minHeight = `${height}px`;
            wrapper.appendChild(element);

            this.wrapper = wrapper;
        }

    }

    class Roulette {

        constructor(container, options) {
            let {
                spacing = 10,
                acceleration = 350,
                fps = 40,
                selector = ":scope > *",
                stopCallback = null,
                startCallback = null
            } = options || {};

            let node =
                typeof container === "string" ?
                    document.querySelector(container) :
                    container instanceof HTMLElement ?
                        container :
                        container && container[0] instanceof HTMLElement ?
                            container[0] :
                            undefined;

            if (!node)
                throw ContainerUndefinedException;

            node.classList.add(rouletteClass);

            let list = document.createElement("ul");
            list.classList.add(rouletteListClass);

            let childNodes = [...node.querySelectorAll(selector)];
            if (!childNodes.length)
                throw ItemsNotFoundException;
            let injector = childNodes[0].parentElement
            let maxWidth = Math.max(...childNodes.map(x => x.clientWidth));
            let maxHeight = Math.max(...childNodes.map(x => x.clientHeight));
            let prizes = childNodes.map((el, i) => new Prize(el, i, spacing, maxWidth, maxHeight));
            for (let prize of prizes)
                list.appendChild(prize.wrapper);

            node.style.padding = `${spacing}px`;
            injector.appendChild(list);

            this.container = node;
            this.list = list;
            this.prizes = prizes;
            this.spacing = spacing;
            this.acceleration = acceleration;
            this.width = (spacing + maxWidth) * prizes.length;
            this.prizeWidth = maxWidth;
            this.fps = fps;
            rotationTokens.set(this, -1);

            if (startCallback)
                this.container.addEventListener(rotationStartEventName, startCallback);
            if (stopCallback)
                this.container.addEventListener(rotationStopEventName, stopCallback);
        }

        rotate(pixels = 0) {
            if (this.rotates)
                throw RotationIsAlreadyActiveException;
            if (pixels > 0)
                rotateForward.bind(this)(pixels);
            else if (pixels < 0)
                rotateBackward.bind(this)(pixels);
        }

        rotateTo(block, options) {
            if (this.rotates)
                throw RotationIsAlreadyActiveException;
            let numBlock = Number(block);
            let prize = Number.isNaN(numBlock) ? this.findPrize({ element: block }) : this.findPrize({ index: numBlock });
            if (!prize)
                throw PrizeNotFoundException;
            let { tracks = 0, time = 0, random = true, backward = false } = options || {};
            time |= 0;
            tracks |= 0;
            if (this.selectedPrize.index === prize.index && !time && !tracks)
                return;
            if (time)
                rotateByTime.bind(this)(prize, time, random, backward);
            else
                rotateByTracks.bind(this)(prize, tracks, random, backward);
        }

        findPrize(options) {
            let { index, element } = options || {};
            if ((typeof index !== "number" || Number.isNaN(index)) && !element)
                throw NotEnoughArgumentsException;
            return element ? this.prizes.find(x => x.element === element) : this.prizes[index];
        }

        stop() {
            if (this.rotates) {
                clearInterval(rotationTokens.get(this));
                rotationTokens.set(this, -1);
                this.container.dispatchEvent(new CustomEvent(rotationStopEventName, { detail: { prize: this.selectedPrize } }));
            }
        }

        get selectedPrize() {
            let afterCenterIndex =
                this.prizes.concat()
                    .sort((a, b) => a.wrapper.offsetLeft - b.wrapper.offsetLeft)
                    .find(prize => prize.wrapper.offsetLeft > this.center).index;
            return this.prizes[(this.prizes.length + afterCenterIndex - 1) % this.prizes.length];
        }

        get firstBlock() {
            return this.findPrize({ element: this.list.querySelector(`:scope > .${roulettePrizeClass} > *`) });
        }

        get lastBlock() {
            let nodes = this.list.querySelectorAll(`:scope > .${roulettePrizeClass} > *`);
            return this.findPrize({ element: nodes[nodes.length - 1] });
        }

        get rotates() {
            return rotationTokens.get(this) > -1;
        }

        get center() {
            return this.list.offsetLeft + this.list.clientWidth / 2;
        }

        static get version() {
            return "1.1.0";
        }
    }

    function rotateForward(pixels) {
        this.container.dispatchEvent(new CustomEvent(rotationStartEventName, { detail: { prize: this.selectedPrize } }));

        pixels = Math.abs(pixels);
        let starter = Math.abs(Number(this.firstBlock.wrapper.style.marginLeft.replace("px", "")));

        let k = this.acceleration;
        let v0 = Math.sqrt(2 * k * pixels);
        let totalTime = v0 / k;

        let intervalMS = 1000 / this.fps;
        let intervalS = intervalMS / 1000;

        let blockWidth = this.prizeWidth + this.spacing;
        let t = 0;
        let currentBlock = 0;
        let played = false;
        let halfBlock = this.spacing + this.prizeWidth / 2;

        let token = setInterval(() => {

            if (t > totalTime) {
                this.stop();
                return;
            }

            let currentPos = (starter + (v0 * t - k * t * t / 2)) % this.width;

            if (Math.floor(currentPos / blockWidth) != currentBlock) {
                let block = this.firstBlock;
                this.list.appendChild(block.wrapper);
                block.wrapper.style.marginLeft = "0px";
                currentBlock = (currentBlock + 1) % this.prizes.length;
                played = false;
            }
            let margin = currentPos % blockWidth;
            this.firstBlock.wrapper.style.marginLeft = `-${margin}px`;
            if (margin > halfBlock && !played) {
                played = true;
            }

            t += intervalS;

        }, intervalMS);

        rotationTokens.set(this, token);
    }

    function rotateBackward(pixels) {
        throw NotImplementedException;
    }

    function rotateByTracks(prize, tracks, random, backward) {
        const blockWidth = this.prizeWidth + this.spacing;
        let currentBlock = this.selectedPrize;
        let length = Math.round(tracks) * this.width;
        if (backward) {
            length *= -1;
        }
        else {
            let currentPosition = currentBlock.index * blockWidth + (this.center - currentBlock.wrapper.offsetLeft);
            let destination = prize.index * blockWidth + this.spacing + this.prizeWidth / 2;
            if (destination < currentPosition)
                length += this.width - (currentPosition - destination);
            else
                length += destination - currentPosition;
            if (random)
                length += Math.random() * this.prizeWidth * 0.8 - this.prizeWidth * 0.4;
        }
        this.rotate(length);
    }

    function rotateByTime(prize, time, random, backward) {
        let v0 = this.acceleration * time;
        let l = v0 * v0 / (2 * this.acceleration);
        let tracks = Math.ceil(l / this.width);
        rotateByTracks.bind(this)(prize, tracks, random, backward);
    }

    return Roulette;
})();

let options = {
    spacing: 16,
    acceleration: 360,
    fps: 40,
    selector: ":scope > *",
    stopCallback: function ({ detail: { prize } }) {
        prize.element.classList.add('active');
        miniGameWrapper.classList.add('active');
        let prizeEl = $(prize.element);
        let prizeImage = prizeEl.find('img').attr('src');
        $('.mini__game-prize').addClass('active');
        $('.game__box-needreg').addClass('show');
        $('.game__box-btn').addClass('hide');
        $('.js-prize-title').text(prizeEl.data('title'));
        $('.js-prize-image').css('background-image', 'url(' + prizeImage + ')');
        $('#prize_value').val(prizeEl.data('item'));

        $('.roulette__prize:first-child').css('margin-left', '0'); //hotfix

    },
    startCallback: function ({ detail: { prize } }) {
        let elements = document.getElementsByClassName('game__list-item');
        let elementsArr = [];
        if (elements.length) {
            elementsArr = Array.from(elements);
        }
        elementsArr.forEach((el) => {
            el.classList.remove('active')
        });
        $('.mini__game-prize').removeClass('active');
        $('.game__box-needreg').removeClass('show');
        $('.game__box-btn').addClass('hide');
    }
};

let roulette = new Roulette(".roulette", options);
const rouletteItems = document.getElementsByClassName('game__list-item');
const maxItems = rouletteItems.length;

document.getElementById("start").addEventListener("click", function (event) {
    event.preventDefault();
    miniGameWrapper.classList.remove('active');

    let randomIndex = Math.floor(Math.random() * (maxItems - 0 + 1) + 0);
    roulette.rotateTo(randomIndex, { tracks: 5, random: false });
});