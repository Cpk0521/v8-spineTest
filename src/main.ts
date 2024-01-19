import { Assets, Application} from 'pixi.js';
import { Spine } from '@pixi/spine-pixi'

async function createApp(preference: 'webgl' | 'webgpu'){
    const app = new Application();

    await app.init({
        preference,
        backgroundAlpha: 1,
        backgroundColor: 0x999999,
        width: 1334,
        height: 750,
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

        let ratio = Math.min(width / 1334, height / 750);

        let resizedX = 1334 * ratio;
        let resizedY = 750 * ratio;

        app.canvas.style!.width = resizedX + 'px';
        app.canvas.style!.height = resizedY + 'px';
    }

    resize();
    window.onresize = resize;

    return app;
}

(async () => {
    const app = await createApp('webgpu');

    Assets.add({alias: 'modelskel', src: 'https://raw.githubusercontent.com/nan0521/WDS-Adv-Resource/main/spine/10201.skel'});
    Assets.add({alias: 'modelatlas', src: 'https://raw.githubusercontent.com/nan0521/WDS-Adv-Resource/main/spine/10201.atlas'});

    await Assets.load(['modelskel', 'modelatlas'])

    const model = Spine.from({
        skeleton : 'modelskel',
        atlas : 'modelatlas',
        scale : 0.2
    })

    model.x = app.screen.width/2;
    model.y = 620;

    app.stage.addChild(model);
})()

