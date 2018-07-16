module core {
	export class DyGLoader extends fairygui.GLoader {
		public constructor() {
			super();
		}

		private imgLoadHandler(evt: egret.Event): void {
			var loader: egret.ImageLoader = evt.currentTarget;
			var bmd: egret.BitmapData = loader.data;
			var texture: egret.Texture = new egret.Texture();
			texture.bitmapData = bmd;
			this.onExternalLoadSuccess(texture);
		}
	}
	DyGLoader.prototype.loadExternal = function () {
		var imgLoader: egret.ImageLoader = new egret.ImageLoader;
		imgLoader.once(egret.Event.COMPLETE, this.imgLoadHandler, this);
		imgLoader.crossOrigin = "anonymous";
		imgLoader.load(this.url);
	}
}