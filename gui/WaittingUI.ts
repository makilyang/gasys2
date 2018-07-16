module gui {
    export class WaittingUI {
        public static inst: WaittingUI;
        private _view: fairygui.GComponent;
        private _inited: boolean;

        public constructor() {
        }


        public static make(sec: number = 3000): WaittingUI {

            if (WaittingUI.inst == null) {
                WaittingUI.inst = new WaittingUI();
            }
            WaittingUI.inst.create(sec);
            return WaittingUI.inst;
        }

        public static hide() {
            if (WaittingUI.inst) {
                WaittingUI.inst.onClose();
            }
        }

        public create(sec: number) {
            if (!this._inited) {
                this._view = fairygui.UIPackage.createObject("tdui1", "等待面板").asCom;
                this._view.setSize(G.width , G.height);
            }
            fairygui.GRoot.inst.addChild(this._view);
            egret.setTimeout(this.onClose, this, sec)
        }

        public onClose(): void {
            if (this._view.parent)
                this._view.parent.removeChild(this._view);
        }
    }
}