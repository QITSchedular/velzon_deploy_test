function voice(btnid, textid) {

    btnid.addEventListener('click', function () {
        var speech = true;
        window.SpeechRecognition = window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.interimResults = true;

        recognition.addEventListener('result', e => {
            const transcript = Array.from(e.results)
                .map(result => result[0])
                .map(result => result.transcript)

            textid.innerHTML = transcript;
        })

        if (speech == true) {
            recognition.start();
        }
    })
}
