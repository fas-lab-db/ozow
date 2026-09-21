(function () {

    const overlay =
        document.getElementById(
            'orange-splash-overlay'
        );

    const startButton =
        document.getElementById(
            'start-app-btn'
        );

    if (!overlay || !startButton) {
        return;
    }

    async function requestAppFullscreen() {

        const elem =
            document.documentElement;

        const request =
            elem.requestFullscreen ||
            elem.webkitRequestFullscreen ||
            elem.msRequestFullscreen;

        if (!request) {
            return;
        }

        try {

            await request.call(elem);

        } catch (error) {

            console.log(
                'Fullscreen request was not allowed:',
                error
            );

        }
    }


    async function startApp() {

        if (startButton.disabled) {
            return;
        }

        startButton.disabled = true;

        await requestAppFullscreen();

        overlay.classList.add(
            'splash-hidden'
        );

        setTimeout(() => {

            overlay.style.display =
                'none';

        }, 450);

    }


    startButton.addEventListener(
        'click',
        startApp
    );

})();