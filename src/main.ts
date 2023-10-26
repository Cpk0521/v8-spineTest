import { Assets, Application} from 'pixi.js';
import { Spine } from '@play-co/spine'

async function createApp(preference: 'webgl' | 'webgpu'){
    const app = new Application();

    await app.init({
        preference,
        backgroundAlpha: 1,
        backgroundColor: 0x999999,
        width: 1136,
        height: 640,
        antialias: true,
        hello : true,
    });

    (globalThis as any).__PIXI_APP__ = app;

    if (document.getElementById("v8App")) {
        document.getElementById("v8App")!.remove();
    }

    (app.canvas as HTMLCanvasElement).setAttribute("id", "v8App")
    document.body.appendChild(app.canvas as HTMLCanvasElement);

    let resize = () => {
        let height = document.documentElement.clientHeight;
        let width = document.documentElement.clientWidth;

        let ratio = Math.min(width / 1136, height / 640);

        let resizedX = 1136 * ratio;
        let resizedY = 640 * ratio;

        app.canvas.style!.width = resizedX + 'px';
        app.canvas.style!.height = resizedY + 'px';
    }

    resize();
    window.onresize = resize;

    return app;
}

(async () => {
    const app = await createApp('webgpu');

    Assets.add({alias: 'modelskel', src: 'https://viewer.shinycolors.moe/spine/idols/stand/1040210030/data.json'});
    Assets.add({alias: 'modelatlas', src: 'https://viewer.shinycolors.moe/spine/idols/stand/1040210030/data.atlas'});

    await Assets.load(['modelskel', 'modelatlas'])

    const model = Spine.from({
        skeleton : 'modelskel',
        atlas : 'modelatlas',
        scale : 0.25
    })

    model.x = 1136/2;
    model.y = 640/2;

    app.stage.addChild(model);
})()

