import vertShaderSrc from './simple.vert.js';
import fragShaderSrc from './simple.frag.js';
import WebGPU from './lib/webgpu.js';

class Scene {
    constructor(gpu) {
        this.program = gpu.createProgram(vertShaderSrc, fragShaderSrc);

        this.triangle1 = gpu.createShape([
            [
                0.0, 0.0, 0.0, 1.0,
                -0.18, 0.45, 0.0, 1.0,
                0.0, 0.7, 0.0, 1.0,
            ],
            [
                1.0, 0.0, 0.0, 1.0,
                1.0, 0.0, 0.0, 1.0,
                1.0, 0.0, 0.0, 1.0,
            ],
        ], 3);

        this.triangle2 = gpu.createShape([
            [
                0.0, 0.0, 0.0, 1.0,
                0.18, 0.45, 0.0, 1.0,
                0.0, 0.7, 0.0, 1.0,
            ],
            [
                1.0, 1.0, 0.0, 1.0,
                1.0, 1.0, 0.0, 1.0,
                1.0, 1.0, 0.0, 1.0,
            ],
        ], 3);

        this.tail1 = gpu.createShape([
            [
                0.0, 0.0, 0.0, 1.0,
                -0.05, -0.0625, 0.0, 1.0,
                0.0, -0.125, 0.0, 1.0,
            ],
            [
                0.5, 0.0, 0.8, 1.0,
                0.5, 0.0, 0.8, 1.0,
                0.5, 0.0, 0.8, 1.0,
            ]
        ], 3);

        this.tail2 = gpu.createShape([
            [
                0.0, -0.125, 0.0, 1.0,
                0.05, -0.1875, 0.0, 1.0,
                0.0, -0.25, 0.0, 1.0,
            ],
            [
                0.2, 0.5, 0.9, 1.0,
                0.2, 0.5, 0.9, 1.0,
                0.2, 0.5, 0.9, 1.0,
            ]
        ], 3);
    }

    draw(gpu) {
        gpu.draw(this.program, this.triangle1);
        gpu.draw(this.program, this.triangle2);
        gpu.draw(this.program, this.tail1);
        gpu.draw(this.program, this.tail2);
    }
}

class Main {
    async init() {
        this.gpu = await WebGPU.createCanvas('#glcanvas', 1024, 768, {
        clearColor: { r: 167 / 255, g: 199 / 255, b: 231 / 255, a: 1 },});

        this.scene = new Scene(this.gpu);
    }

    draw() {
        this.gpu.start();
        this.scene.draw(this.gpu);
        this.gpu.finish();

        requestAnimationFrame(this.draw.bind(this));
    }
}

try {
    const app = new Main();
    await app.init();
    app.draw();

} catch (error) {
    console.error(error);
    document.body.insertAdjacentHTML('beforeend', `<p>${error.message}</p>`);
}
