var btn = document.getElementById('butt');
let mediaRecorder = null;
let i = 0;

function tremerBotao() {
    btn.classList.add('botao');
}
function pararBotao() {
    btn.classList.remove('botao');
}

function captarAudio() {
    if (!navigator.getUserMedia && !navigator.webkitGetUserMedia &&
        !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
        alert('O navegador não suporta a gravação de audio! ;(');
    }
    if (navigator.mediaDevices || navigator.mediaDevices.getDisplayMedia) {
        navigator.mediaDevices.getUserMedia({
            audio: true
        })
            .then(stream => {
                //Ao iniciar
                tremerBotao();

                let chunk = [];
            
                mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.ondataavailable = data => {
                    chunk.push(data.data);
                }
                mediaRecorder.start();
                //Ao parar vai acontecer
                mediaRecorder.onstop = () => {
                    const blob = new Blob(chunk, {
                        type: 'audio/ogg; codecs=opus'
                    });
                    const reader = new window.FileReader();
                    reader.readAsDataURL(blob);
                    reader.onload = () => {
                        try {
                            const audio = document.createElement('audio');
                        audio.src = reader.result;
                        audio.controls = true;
                        $('body').append(audio);//ao inves de append aqui o audio sera enviado para outro lugar
                        }
                        catch {
                            alert("Erro ao criar arquivo de audio")
                        }
                    }

                    pararBotao();
                }
            })
    }
}
/*
btn.addEventListener('click', () => {
    i++;
    console.log(i)
    if (i === 1) {
        captarAudio();
    } else {
        mediaRecorder.stop()
        i = 0;
    }
});
*/

btn.addEventListener('click', () => {
    i++;
    if (i === 1) {
            captarAudio()
    } else {
        if (mediaRecorder) {
            try {
                mediaRecorder.stop();
                i = 0;
            }
            catch {
                alert("Erro ao acionar botão de stop")
            }
            
        }
        
    }
});



