module gui {
	export class DyProgressBar extends fairygui.GProgressBar implements RES.PromiseTaskReporter {
		public static url: string = "ui://lk73k1zmokx47";

		public constructor() {
			super();
		}

		public onProgress(current: number, total: number): void {
			this.value =  Math.round(current / total * 100);
			// this.textField.text = `Loading...${current}/${total}`;
			// this.value = current;
			// this.max = total;
		}
	}
}