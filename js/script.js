document.addEventListener('DOMContentLoaded', init, false);

function init() {
    loadImages();
    blogFrame.addEventListener('load', () => {
        resizeIFrameToFitContent(blogFrame);
        self.setInterval(() => resizeIFrameToFitContent(blogFrame), 1000);
    });
}

function resizeIFrameToFitContent(iFrame) {
    iFrame.height = iFrame.contentWindow.document.body.scrollHeight
}

async function loadImages(maxImages = Infinity) {
    const response = await fetch('images.json');
    let images = await response.json();
    images = images.slice(images.length - maxImages);
    console.log(images);
    let gallery = document.getElementsByClassName('gallery')[0];
    let html = '';
    for (let image of images) {
        let color = generateRandomColor({ r: 255, g: 255, b: 255 });
        let imageUrl = image.url.split('?dl=0')[0];

        if (image.type === "video") {
            html += `
            <div class='media-container'>
                <video src="${imageUrl}?dl=1" controls></video>
            </div>`;
        } else {
            html += `
            <div class="media-container" style="background-color: rgba(${color.r}, ${color.g}, ${color.b}, 1)">
                <a href="${imageUrl}?dl=0">
                    <div class="foto" style="background-image:url(${imageUrl}?dl=1)"></div>
                </a>
            </div>`;
        }
    }
    gallery.innerHTML = html;
}

function generateRandomColor(mix) {
    let red = Math.random() * 256;
    let green = Math.random() * 256;
    let blue = Math.random() * 256;

    // mix the color
    if (mix !== null) {
        red = (red + mix.r) / 2;
        green = (green + mix.r) / 2;
        blue = (blue + mix.r) / 2;
    }

    return {
        r: Math.floor(red),
        g: Math.floor(green),
        b: Math.floor(blue)
    };
}
