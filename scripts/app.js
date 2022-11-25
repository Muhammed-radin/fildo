var videoPlayer = document.getElementById("videoPlayer");
var fid = document.createElement("video");

function openVideo() {
    document.getElementById("openManager").click();
    closeModelVideo();
}

document.getElementById("openManager").addEventListener("change", function (e) {
    console.log(e);
    document.getElementById("videoPlayer").src = window.URL.createObjectURL(
        this.files[0]
    );
    videoPlayer.currentTime = 0;
    isPlaying = false;
    document.getElementById("playingSeek").max = videoPlayer.duration;
    document.getElementById("playingSeek").value = 0;

    var obj = { time: 0, video: JSON.stringify(this.files[0]) };
    localStorage.setItem("video", JSON.stringify(this.files[0]));
});

document.getElementById("playingSeek").addEventListener("change", function () {
    videoPlayer.currentTime = document.getElementById("playingSeek").value;
});

document.getElementById("playingSeek").addEventListener("click", function () {
    isPlaying = false;
    setTimeout(function () {
        isPlaying = true;
    }, 1000);
    // pauseVideo()
});

var isPlaying = false;

function openModelVideo() {
    document.querySelector(".model").style.display = "block";
}

function closeModelVideo() {
    document.querySelector(".model").style.display = "none";
    document.querySelector(".model-head-text").innerHTML = "Choose a method";
    document.querySelector(
        ".model-body"
    ).innerHTML = `<div class="model-content" onclick="openVideo()">
    <p>Browse Video</p>
    <span><ion-icon name="folder-outline"></ion-icon></span>
</div>
<div class="model-content" onclick="openWithVideoUrl()">
    <p>Open With Url</p>
    <span
        ><ion-icon name="chevron-forward-outline"></ion-icon
    ></span>
</div>`;
}

document
    .querySelector(".close-model-btn")
    .addEventListener("click", function () {
        closeModelVideo();
    });

function openWithVideoUrl() {
    document.querySelector(".model-body").innerHTML = `
    <div class="model-input">
    <input type="url" placeholder="paste your video url" id="urlVideo">
    </div>
    <div class="model-content center-text dark" onclick="sumbitUrl()">
                    <p>Sumbit</p>
                </div>`;
}
var history = [];

if (localStorage.getItem("history")) {
    histroy = JSON.parse(localStorage.getItem("history"));
} else {
    histroy = [];
}

function sumbitUrl() {
    if (localStorage.getItem("history")) {
        histroy = JSON.parse(localStorage.getItem("history"));
    } else {
        histroy = [];
    }

    videoPlayer.src = document.getElementById("urlVideo").value;
    videoPlayer.currentTime = 0;
    document.getElementById("playingSeek").max = videoPlayer.duration;
    document.getElementById("playingSeek").value = 0;
    histroy.push(document.getElementById("urlVideo").value);
    localStorage.setItem("history", JSON.stringify(histroy));
    closeModelVideo();
    useSubProgress();
}

function startHistory() {
    document.querySelector(".model").style.display = "block";
    document.querySelector(".model-head-text").innerHTML = "History of urls";
    document.querySelector(".model-body").innerHTML = "";
    var nowHistory = "";
    if (localStorage.getItem("history")) {
        JSON.parse(localStorage.getItem("history")).forEach((v, i) => {
            nowHistory += `
        <div class="model-content" onclick="setVideoFromHistroy('${v}')">
        <p>${v}</p>
        <span><ion-icon name="chevron-forward-outline"></ion-icon></span>
    </div>`;
        });
    } else {
        nowHistory = `
        <div class="model-content">
        <p class="center-text">No History Found..!</p>
        <span><ion-icon name=""></ion-icon></span>
    </div>`;
    }

    document.querySelector(".model-body").innerHTML = nowHistory;
}

function setVideoFromHistroy(url) {
    videoPlayer.src = url;
    videoPlayer.currentTime = 0;
    isPlaying = false;
    document.getElementById("playingSeek").max = videoPlayer.duration;
    document.getElementById("playingSeek").value = 0;
    document.querySelector(".model").style.display = "none";
}

function useSubProgress() {
    var style = document.createElement("style");
    style.innerHTML = `
    #progress {
        top: 0;
        left: 95%;
        transform: translate(0px, 0px);
    }

    #progress img {
        width: 30px;
        height: 30px;
    }
    `;
    document.head.appendChild(style);
    document.getElementById("progress").style.left =
        window.innerWidth - 41 + "px";
}

var isProgressing = false;

videoPlayer.onprogress = function (e) {
    isProgressing = true;
};

setInterval(function () {
    isProgressing = false;
}, 2000);

function playVideo() {
    if (
        document.getElementById("videoPlayer").src == null ||
        document.getElementById("videoPlayer").src == undefined ||
        document.getElementById("videoPlayer").src == false
    ) {
    } else {
        videoPlayer.play();
        isPlaying = true;
        document.getElementById("playBtn").style.display = "none";
        document.getElementById("pauseBtn").style.display = "block";
    }
}

function pauseVideo() {
    videoPlayer.pause();
    isPlaying = false;
    document.getElementById("playBtn").style.display = "block";
    document.getElementById("pauseBtn").style.display = "none";
}

document.getElementById("pauseBtn").style.display = "none";
document.getElementById("playBtn").onclick = playVideo;
document.getElementById("pauseBtn").onclick = pauseVideo;

setInterval(function () {
    if (
        document.getElementById("videoPlayer").src == null ||
        document.getElementById("videoPlayer").src == undefined ||
        document.getElementById("videoPlayer").src == false
    ) {
        document.querySelector(".null-play").style.display = "block";
    } else {
        document.querySelector(".null-play").style.display = "none";
        document.getElementById("playingSeek").max = videoPlayer.duration;

        if (videoPlayer.playing || isPlaying) {
            document.getElementById("playingSeek").value =
                videoPlayer.currentTime;
        }
    }
    if (document.getElementById("urlVideo")) {
        document
            .getElementById("urlVideo")
            .addEventListener("keyup", function (e) {
                if (e.keyCode == 13) {
                    sumbitUrl();
                }
            });
    }

    if (Math.trunc(videoPlayer.currentTime) > 60) {
        Math.trunc(videoPlayer.currentTime - 60);
    }
    document.querySelector(".timer").innerHTML =
        Math.trunc(videoPlayer.currentTime / 60) +
        ":" +
        Math.trunc(
            videoPlayer.currentTime > 60
                ? Math.trunc(
                      videoPlayer.currentTime -
                          Math.trunc(videoPlayer.currentTime / 60) * 60
                  )
                : Math.trunc(videoPlayer.currentTime)
        ).toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
        });
    if (isProgressing) {
        document.getElementById("progress").style.display = "block";
    } else {
        document.getElementById("progress").style.display = "none";
    }

    videoPlayer.volume = document.getElementById("soundControll").value / 100;
    if (document.getElementById("soundControll").value / 100 == 0) {
        document.getElementById("volumeIcon").name = "volume-mute-outline";
    } else {
        document.getElementById("volumeIcon").name = "volume-medium-outline";
    }
}, 500);

document.getElementById("volumeIcon").onclick = function () {
    document.getElementById("soundControll").value = 0;
};

videoPlayer.onerror = function (err) {
    alert("error: faild to load");
};

function fullscreenit() {
    openFullscreena(document.querySelector("html"));
    function openFullscreena(elem) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            /* IE11 */
            elem.msRequestFullscreen();
        }
    }
}

// var facingMode = "user"; // Can be 'user' or 'environment' to access back or front camera (NEAT!)
// var constraints = {
//   audio: false,
//   video: {
//    facingMode: facingMode
//   }
// };

// /* Stream it to video element */
// navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
//   videoPlayer.srcObject = stream;
// });