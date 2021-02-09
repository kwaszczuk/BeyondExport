function resizeCanvas(canvas: HTMLCanvasElement, targetWidth?: number, targetHeight?: number) {
    if (targetWidth && canvas.width > canvas.height && canvas.width > targetWidth) {
        canvas.height *= targetWidth / canvas.width;
        canvas.width = targetWidth;
    } else if (targetHeight && canvas.height > targetHeight) {
        canvas.width *= targetHeight / canvas.height;
        canvas.height = targetHeight;
    }
}

const CORS_PROXY_URL: string = "https://beyond-export-cors.herokuapp.com";
function proxyCORS(url: string): string {
    return `${CORS_PROXY_URL}/${url}`;
}

interface GetImageBlobOptions {
    maxHeight?: number,
    maxWidth?: number
}

export function getImageBlob(img: HTMLImageElement, options: GetImageBlobOptions): Promise<Blob> {
    return new Promise(resolve => {
        let c: HTMLCanvasElement = document.createElement('canvas');

        c.width = img.naturalWidth;
        c.height = img.naturalHeight;

        let { maxWidth, maxHeight } = options;

        if (maxHeight || maxWidth) {
            resizeCanvas(c, maxWidth, maxHeight);
        }

        let ctx = c.getContext('2d'); 
        ctx.drawImage(img, 0, 0, c.width, c.height);

        c.toBlob(resolve, 'image/jpeg');
    });
}

export function downloadImage(url: string): Promise<HTMLImageElement> {
    return new Promise(resolve => {
        let image: HTMLImageElement = new Image;

        image.onload = _ => { resolve(image); };
        image.crossOrigin = 'Anonymous';
        image.src = proxyCORS(url);
    });
}