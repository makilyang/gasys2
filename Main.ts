//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        if (egret.Capabilities.isMobile) {
            this.stage.scaleMode = egret.StageScaleMode.FIXED_WIDE;

        }
        G.isMobile = egret.Capabilities.isMobile;
        // egret.log("isMobile", egret.Capabilities.isMobile);

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
            if (G.bgSoundChancel) {
                G.bgSoundChancel.stop();
            }
            if (G.figSndChancel) {
                G.figSndChancel.stop();
            }
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
            if (G.bgMuz) {
                G.bgSoundChancel = G.bgMuz.play();
            }
            if (G.figMuz) {
                G.figSndChancel = G.bgMuz.play();
            }
        }

        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        egret.ImageLoader.crossOrigin = "anonymous";
        await this.loadResource();
        // const result = await RES.getResAsync("description_json");
        this.createGameScene();
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);
        // this._engine = DyEngine.Engine.getInstance();
        // this.stage.addEventListener(egret.Event.ENTER_FRAME, this.onLoop, this);

    }

    // private _engine:DyEngine.Engine;
    // private onLoop(e: egret.Event): void {
    //     this._engine.update();
    // }
    private async loadResource() {
        try {
            const loadingView = new LoadingUI(this.stage.stageWidth, this.stage.stageHeight);
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadConfig("https://ys2.yccdlwl.com/resource/out.res.json", "https://ys2.yccdlwl.com/resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
        egret.ImageLoader.crossOrigin = "anonymous";
        fairygui.UIPackage.addPackage("tduilite");
        fairygui.UIConfig.defaultFont = "宋体";
        // G.init(this.stage.stageWidth, this.stage.stageHeight);
        G.init(422, 750, this.stage.stageWidth, this.stage.stageHeight);
        egret.log("sc", this.stage.stageWidth, this.stage.stageHeight);
        // fairygui.UIConfig.verticalScrollBar = fairygui.UIPackage.getItemURL("Basic", "ScrollBar_VT");
        // fairygui.UIConfig.horizontalScrollBar = fairygui.UIPackage.getItemURL("Basic", "ScrollBar_HZ");
        // fairygui.UIConfig.popupMenu = fairygui.UIPackage.getItemURL("Basic", "PopupMenu");
        // fairygui.UIConfig.buttonSound = fairygui.UIPackage.getItemURL("Basic", "click");
        fairygui.UIObjectFactory.setPackageItemExtension(gui.DyProgressBar.url, gui.DyProgressBar);
        //egret.log("set loader:", typeof (core.DyGLoader))
        fairygui.UIObjectFactory.setLoaderExtension(core.DyGLoader);
        let pad: number = this.stage.stageWidth - (G.width * G.scale);
        var enging: DyEngine.Engine = DyEngine.Engine.getInstance();
        enging.x = pad * 0.5;
        let shape: egret.Shape = new egret.Shape();
        shape.graphics.lineStyle(0x000000);
        shape.graphics.beginFill(0x00ff00);
        shape.graphics.drawRect(enging.x, enging.x, G.width * G.scale, G.height * G.scale);//this.stage.stageWidth, this.stage.stageHeight);
        shape.graphics.endFill();
        enging.mask = shape;
        enging.scaleX = enging.scaleY = G.scale;
        this.stage.addChild(enging);
        this.stage.addChild(shape);
        fairygui.GRoot.inst.displayObject.x = pad * 0.5;
        // fairygui.GRoot.inst.width = G.width;
        // fairygui.GRoot.inst.height = this.stage;
        fairygui.GRoot.inst.scaleX = G.scale;
        fairygui.GRoot.inst.scaleY = G.scale;


        this.stage.addChild(fairygui.GRoot.inst.displayObject);
        G.director.runWithCache("mainmenu", MainMenu);
        var png: egret.Bitmap = this.createBitmapByName("mask_png");
        png.x = 0;
        png.y = 0;
        png.width = G.width;
        png.height = this.stage.stageHeight;
        png.fillMode = egret.BitmapFillMode.REPEAT
        this.stage.addChildAt(png, 0);
        // fairygui.GRoot.inst.displayListContainer.addChild(png);
        // _view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);

    }

    /**
  * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
  * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
  */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}
