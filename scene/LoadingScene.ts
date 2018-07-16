class LoadingScene extends BaseScene {
	private _view: fairygui.GComponent;
	private _bar: gui.DyProgressBar;
	public constructor() {
		super();

	}

	public initialize() {
		if (!this._initialized) {
			this._view = fairygui.UIPackage.createObject("tduilite", "000 开始加载").asCom;
			fairygui.GRoot.inst.addChild(this._view);
			// this._view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
			// this._view.setSize(G.width * G.scale, G.height * G.scale);
			this._view.setSize(G.width , G.height);
			this._bar = this._view.getChild("n2") as gui.DyProgressBar;
			super.initialize();
		}
	}

	public show(callback: Function = null, args: any[] = null) {
		egret.log("args", args);
		this.loadResource(args);
		super.show(callback, args);

	}

	private async loadResource(args: any[]) {
		try {
			await RES.loadGroup("uiall", 0, this._bar);
			fairygui.UIPackage.addPackage("tdui");
			fairygui.UIObjectFactory.setPackageItemExtension(gui.LevelPort.url, gui.LevelPort);
			fairygui.UIObjectFactory.setPackageItemExtension(gui.BuildMenu.url, gui.BuildMenu);
			fairygui.UIObjectFactory.setPackageItemExtension(gui.shopCell.url, gui.shopCell);
			fairygui.UIObjectFactory.setPackageItemExtension(gui.talentCell.url, gui.talentCell);
			fairygui.UIObjectFactory.setPackageItemExtension(gui.PropsBar.url, gui.PropsBar);
			// if (args[0] == "editor") {
			// 	fairygui.UIPackage.addPackage("editor");
			// 	fairygui.UIObjectFactory.setPackageItemExtension(editor.ePath.url, editor.ePath);
			// }
			D.initmap();
			G.director.runWithCache("map", LevelScene);
			core.DataMgr.init();
		}
		catch (e) {
			console.error(e);
		}
	}

	public hide(callback: Function = null) {
		super.hide(callback);
		fairygui.GRoot.inst.removeChild(this._view);
		// this._view = null;
	}
}