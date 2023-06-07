const recognition = new (window.webkitSpeechRecognition || window.SpeechRecognition )();

async function mic(id) {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(async function () {
            let speech = true;
            let transcript
            recognition.interimResults = true;

            if (speech) {
                await recognition.start();
            }

            return new Promise((resolve) => {
                recognition.addEventListener('result', (e) => {
                    transcript = new Array();
                    transcript = Array.from(e.results)
                        .map((result) => result[0])
                        .map((result) => result.transcript);
                    document.getElementById(`${id}`).innerHTML = transcript;

                });

                recognition.addEventListener('speechend', () => {
                    resolve(transcript);
                });
            });
        })
        .catch(function (error) {
            // Microphone permission denied or error occurred
            console.log('Error accessing microphone:', error);
        });
    
}