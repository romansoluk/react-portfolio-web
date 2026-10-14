import {useCallback, useEffect, useRef, useState} from 'react';
import WaterWave from 'react-water-wave';
import image from '../public/img_4.jpg'; // replace with your own picture; same-origin only

const SCROLL_DROP_EVERY = 350; // ms between drops while scrolling
const IDLE_DROP_EVERY = 5800; // ms between faint drops when nothing is happening
const REBAKE_DELAY = 100; // ms to wait after resize / text changes before re-drawing
const MAX_TEXTURE = 4096; // px, longest side of the generated picture
const INK = 'rgb(2 0 0 / 0.53)'; // colour of the text drawn into the picture


const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function hasWebGLFloat() {
    try {
        const gl = document.createElement('canvas').getContext('webgl');
        return Boolean(gl && gl.getExtension('OES_texture_float'));
    } catch {
        return false;
    }
}

let imagePromise;
function loadImage() {
    imagePromise ??= new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = image;
    });
    return imagePromise;
}

/**
 * Draws the picture (cover-fitted to the box) and then every [data-water-text]
 * element's text onto one canvas. The DOM does the layout: each word's position
 * is read from the browser, so the drawn text lines up with the real text.
 * The result is handed to react-water-wave, so ripples bend the text too.
 */
async function bakeScene(box, content, img) {
    const boxRect = box.getBoundingClientRect();
    const w = Math.round(boxRect.width);
    const h = Math.round(boxRect.height);
    if (!w || !h) return null;

    const dpr = Math.min(window.devicePixelRatio || 1, 2, MAX_TEXTURE / Math.max(w, h));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const cover = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    const dw = img.naturalWidth * cover;
    const dh = img.naturalHeight * cover;
    ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);

    await document.fonts?.ready;

    ctx.fillStyle = INK;
    ctx.textBaseline = 'alphabetic';
    const range = document.createRange();

    content.querySelectorAll('[data-water-text]').forEach((el) => {
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
            // Style comes from the text's own element (e.g. each <p>), not the wrapper.
            const style = getComputedStyle(node.parentElement);
            ctx.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
            if ('letterSpacing' in ctx) {
                ctx.letterSpacing = style.letterSpacing === 'normal' ? '0px' : style.letterSpacing;
            }
            const ascent =
                ctx.measureText('M').fontBoundingBoxAscent ?? parseFloat(style.fontSize) * 0.8;

            for (const match of node.nodeValue.matchAll(/\S+/g)) {
                range.setStart(node, match.index);
                range.setEnd(node, match.index + match[0].length);
                const rect = range.getClientRects()[0];
                if (!rect) continue;
                ctx.fillText(match[0], rect.left - boxRect.left, rect.top - boxRect.top + ascent);
            }
        }
    });

    return new Promise((resolve) =>
        canvas.toBlob((blob) => resolve(blob ? URL.createObjectURL(blob) : null), 'image/png')
    );
}

// Lives inside WaterWave's render prop so it can use the `methods` it provides.
function WaterContent({ methods, contentRef, children }) {
    const methodsRef = useRef(methods);
    methodsRef.current = methods;

    useEffect(() => {
        if (reducedMotion) return undefined;

        const dropAt = (xFraction, yPixels, strength) => {
            const el = contentRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            methodsRef.current.drop({
                x: rect.width * xFraction,
                y: yPixels - rect.top,
                radius: 22,
                strength,
            });
        };

        // Scrolling: capture phase also catches the inner .project-panel scroller.
        let lastScroll = 0;
        const onScroll = () => {
            const now = performance.now();
            if (now - lastScroll < SCROLL_DROP_EVERY) return;
            lastScroll = now;
            dropAt(0.1 + Math.random() * 0.8, window.innerHeight * (0.25 + Math.random() * 0.5), 0.05);
        };
        window.addEventListener('scroll', onScroll, { capture: true, passive: true });

        // Idle: a faint drop now and then so the water never looks frozen.
        const idle = setInterval(() => {
            dropAt(0.1 + Math.random() * 0.8, window.innerHeight * (0.2 + Math.random() * 0.6), 0.012);
        }, IDLE_DROP_EVERY);

        return () => {
            window.removeEventListener('scroll', onScroll, { capture: true });
            clearInterval(idle);
        };
    }, [contentRef]);

    // The library only resizes on window resize; tell it when the box itself changes.
    useEffect(() => {
        const el = contentRef.current;
        if (!el || typeof ResizeObserver === 'undefined') return undefined;
        const observer = new ResizeObserver(() => methodsRef.current.updateSize?.());
        observer.observe(el);
        return () => observer.disconnect();
    }, [contentRef]);

    return (
        <div ref={contentRef} className="underwater-content">
            {children}
        </div>
    );
}

export default function Underwater({ children }) {
    const contentRef = useRef(null);
    const [aspectRatio, setAspectRatio] = useState(1.6);
    const [bakedUrl, setBakedUrl] = useState(null);
    const [supported] = useState(() => !reducedMotion && hasWebGLFloat());

    // Size the box to the picture's own proportions so the whole image is shown.
    useEffect(() => {
        loadImage().then((img) => setAspectRatio(img.naturalWidth / img.naturalHeight));
    }, []);

    const bake = useCallback(async () => {
        const content = contentRef.current;
        if (!content) return;
        const img = await loadImage();
        const url = await bakeScene(content.parentElement, content, img);
        if (url) setBakedUrl(url);
    }, []);

    // Re-draw whenever the box resizes or the text changes.
    useEffect(() => {
        const content = contentRef.current;
        if (!supported || !content) return undefined;

        let timer;
        const schedule = () => {
            clearTimeout(timer);
            timer = setTimeout(bake, REBAKE_DELAY);
        };
        schedule();

        const resize = new ResizeObserver(schedule);
        resize.observe(content.parentElement);
        const mutations = new MutationObserver(schedule);
        mutations.observe(content, { childList: true, subtree: true, characterData: true });
        document.fonts?.ready.then(schedule);

        return () => {
            clearTimeout(timer);
            resize.disconnect();
            mutations.disconnect();
        };
    }, [supported, bake]);

    // Free the previous generated picture once a new one replaces it.
    useEffect(() => {
        if (!bakedUrl) return undefined;
        return () => URL.revokeObjectURL(bakedUrl);
    }, [bakedUrl]);

    return (
        <WaterWave
            style={{ aspectRatio }}
            imageUrl={bakedUrl ?? image}
            dropRadius={24}
            perturbance={0.04}
            resolution={384}
            interactive={!reducedMotion}
            className={`underwater ${bakedUrl ? 'is-baked' : ''}`}
        >
            {(methods) => (
                <WaterContent methods={methods} contentRef={contentRef}>
                    {children}
                </WaterContent>
            )}
        </WaterWave>
    );
}