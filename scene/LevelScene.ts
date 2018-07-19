class LevelScene extends BaseScene {
	private _view: fairygui.GComponent;
	private _c1: fairygui.Controller;
	private _btn2: fairygui.GButton;
	private _btn3: fairygui.GButton;
	private _btn4: fairygui.GButton;
	private _btn5: fairygui.GButton;
	private _tfscore: fairygui.GTextField;
	public constructor() {
		super();

	}

	public initialize() {
		if (!this._initialized) {
			this._view = fairygui.UIPackage.createObject("tdui1", "002 大地图").asCom;
			fairygui.GRoot.inst.addChild(this._view);
			// this._view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
			// this._view.setSize(G.width * G.scale, G.height * G.scale);
			this._view.setSize(G.width, G.height);
			this._btn2 = this._view.getChild("n53").asButton;
			this._btn2.addEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
			this._btn3 = this._view.getChild("n49").asButton;
			this._btn3.addEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
			this._btn4 = this._view.getChild("n45").asButton;
			this._btn4.addEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
			this._btn5 = this._view.getChild("n62").asButton;
			this._btn5.addEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);

			this._tfscore = this._view.getChild("n52").asTextField;
			super.initialize();
		}
	}


	private onClick(e: egret.TouchEvent) {
		let ui;
		switch (e.currentTarget) {
			case this._btn2:
				ui = new gui.RankUI;
				break;
			case this._btn3:
				ui = new gui.ShopUI;
				break;
			case this._btn4:
				ui = new gui.TalentUI;
				break;
			case this._btn5:
				var data = {
                count: 0.01,
                extString: "makeRecharge"
				}				
				window["BlackCat"].SDK.makeRecharge(data, function(res){
					console.log('[BlackCat]', 'makeRecharge.callback.function.res => ', res)
				})
				break;
		}
	}

	public show(callback: Function = null, args: any[] = null) {
		super.show(callback, args);
		if (G.bgSoundChancel)
			G.bgSoundChancel.stop();
		if (G.bgMuz)
			G.bgSoundChancel = G.bgMuz.play(0, 1);
		this._tfscore.text = String(DyEngine.DyMath.toNumber(G.sd.score));
		let h5api = window['h5api'];
		let t = DyEngine.DyMath.toNumber(G.sd.tt);
		egret.log("ads:", h5api, t);
		if (h5api && h5api.canPlayAd() && t < 10)
			this._btn5.visible = true;
		else
			this._btn5.visible = false;

	}

	public hide(callback: Function = null) {
		super.hide(callback);
		fairygui.GRoot.inst.removeChild(this._view);
		this._btn2.removeEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
		this._btn3.removeEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
		this._btn4.removeEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
		this._btn5.removeEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
		// this._view = null;
	}
}