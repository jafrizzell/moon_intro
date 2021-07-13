import './main.css';
import Chat from 'twitch-chat-emotes';

// a default array of twitch channels to join
let channels = ['MOONMOON', 'Kyle'];

// the following few lines of code will allow you to add ?channels=channel1,channel2,channel3 to the URL in order to override the default array of channels
const query_vars = {};
const query_parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    query_vars[key] = value;
});
if (query_vars.channels) {
    channels = query_vars.channels.split(',');
}

// create our chat instance
const ChatInstance = new Chat({
    channels,
    duplicateEmoteLimit: 5,
    maximumEmoteLimiet: 1,
})

var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

var foreground = new Image();
foreground.src = "https://github.com/jafrizzell/moon_intro/blob/11de50d43478ffc8ad9038640a79b76d05bae936/src/mug.png?raw=true";
var lampOverlay = new Image();
lampOverlay.src = "https://github.com/jafrizzell/moon_intro/blob/main/src/lamp_overlay.png?raw=true";



let lastFrame = Date.now();
// Called once per frame
function draw() {
    window.requestAnimationFrame(draw);

    // number of seconds since the last frame was drawn
    const delta = (Date.now() - lastFrame) / 1000;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let o = emoteArray.length - 1; o >= 0; o--) {
        const emoteGroup = emoteArray[o];

        // Keep track of where we should be drawing the next emote per message
        let xOffset = 0;

        for (let i = 0; i < emoteGroup.emotes.length; i++) {
            const emote = emoteGroup.emotes[i];
            emoteGroup.y -= delta * 20 * (Math.random()+ 1);
            emoteGroun.x += 25 * delta
            // emoteGroup.x += (Math.random() * 10 * delta + emoteGroup.y ** 2 * 25);

            xOffset = emote.gif.canvas.width;
            ctx.drawImage(emote.gif.canvas, xOffset + emoteGroup.x, emoteGroup.y, 56, 56);

//             ctx.globalCompositeOperation = 'source-over';

        }

        // Delete a group after 10 seconds
        if (emoteGroup.spawn < Date.now() - 10000) {
            emoteArray.splice(o, 1);
        }
    }
    ctx.drawImage(lampOverlay, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(foreground, 0, 0, canvas.width, canvas.height);
    lastFrame = Date.now();
}

// add a callback function for when a new message with emotes is sent
const emoteArray = [];
var xArray = [0.09 * canvas.width, 0.1 * canvas.width, 1.1 * canvas.width];
ChatInstance.on("emotes", (emotes) => {
    if (emotes[0].id == 'NaM' || emotes[0].id == 'FishMoley') {}
    else {
        const randX = Math.floor(Math.random() * xArray.length);
        emoteArray.push({
            emotes,
            x: xArray[randX],
            y: Math.floor(0.65 * canvas.height),
            spawn: Date.now()
        })
    }
})

draw();
