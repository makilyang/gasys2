module gui {
    export class PropsBar extends fairygui.GComponent {
        public static url: string = "ui://y1w8mpywr405t58";
        private _hided: boolean = false;

        public constructor() {
            super();
        }

        public show(arg: boolean = true): void {

            if (arg && this._hided) {
                let c = this.getTransition("t1")
                c.play();
                this._hided = false;
                 this.touchable = true;
            }
            else if (!this._hided) {
                let c = this.getTransition("t0")
                c.play();
                this._hided = true;
                this.touchable = false;
            }
        }
    }
}