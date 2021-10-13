
// 최대 5초 동안 기록하십시오.
// 웹 사이트에서 들을 수 있도록 사용자에게 녹음 미리 보기 표시(오디오 플레이어 만들기)
// 녹화가 완료되면 녹화를 시작하고 녹화를 다운로드하기 위한 버튼을 만듭니다.
const startBtn  = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const handleDownload = () => {
    const a = document.createElement("a");
    a.href = videoFile;
    a.download = "MyRecording.webm";
    document.body.appendChild(a);
    a.click();
}

const handleStop = () => {
  startBtn.innerText = "Download Recording";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleDownload);
  recorder.stop();
}

const handleStart = () => {
    startBtn.innerText = "Stop Recording";
    startBtn.removeEventListener("click", handleStart);
    startBtn.addEventListener("click", handleStop);
    
    recorder = new MediaRecorder(stream, {mineType: "video/webm"});
    // video.stop() 실행되었을 때 ondataavailable 함수가 수행됨
    recorder.ondataavailable = (e) => {
        console.log(e.data);
        // URL.createObjectURL: 브라우저의 메모리 상에 저장하고 브라우저가 그 파일에 접근할 수 있는 url을 제공
        videoFile = URL.createObjectURL(e.data);
        video.srcObject = null;
        video.src = videoFile;
        video.loop = true;
        video.play();
    }
    // recording start
    recorder.start();
    setTimeout(() => {
        handleStop();
        alert("You can record for 5 minute");
      }, 5000);
}

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  video.srcObject = stream;
  video.play();
}

init();

startBtn.addEventListener("click", handleStart);