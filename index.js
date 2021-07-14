/**
 * @description 消息提醒框
 * @param {String, String, Integer, Function} title, icon, duration, callBack
 * @return Object instance ShowMessage
 */
export default class ShowMessage {
	constructor({ title, icon, duration = 2500, cb }) {
		if (!title) {
			throw new Error('title can not be null')
		}
		this.title = title
		this.icon = icon ? icon.toLowerCase() : null
		icon && (this.icon = icon.toLowerCase())
		this.messageBox = document.createElement('div')
		this.messageTitle = document.createElement('span')
		this.iconsMaping = new Map()
			.set(
				'success',
				`<i style="width: 24px; height: 24px; margin-right: 14px;"><svg t="1606792068551" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3273" width="24" height="24"><path d="M384 716.501333l445.866667-445.866666a21.333333 21.333333 0 0 1 30.165333 30.186666L407.466667 753.365333c-2.154667 2.133333-4.650667 3.733333-7.296 4.778667a21.333333 21.333333 0 0 1-32.341334 2.56l-211.2-211.2a21.333333 21.333333 0 1 1 30.165334-30.186667L384 716.501333z" p-id="3274" fill="#ffffff"></path></svg></i>`
			)
			.set(
				'failed',
				`<i style="width: 24px; height: 24px; margin-right: 14px;"><svg t="1606792223721" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4382" width="24" height="24"><path d="M512 0C229.691077 0 0 229.671385 0 512s229.691077 512 512 512 512-229.671385 512-512S794.308923 0 512 0z m0 984.615385C251.411692 984.615385 39.384615 772.588308 39.384615 512S251.411692 39.384615 512 39.384615s472.615385 212.027077 472.615385 472.615385-212.027077 472.615385-472.615385 472.615385z" fill="#ffffff" p-id="4383"></path><path d="M703.153231 320.846769a19.672615 19.672615 0 0 0-27.844923 0L512 484.155077l-163.308308-163.308308a19.672615 19.672615 0 1 0-27.844923 27.844923L484.155077 512l-163.308308 163.308308a19.672615 19.672615 0 1 0 27.844923 27.844923L512 539.844923l163.308308 163.308308a19.633231 19.633231 0 0 0 27.844923 0 19.672615 19.672615 0 0 0 0-27.844923L539.844923 512l163.308308-163.308308a19.672615 19.672615 0 0 0 0-27.844923z" fill="#ffffff" p-id="4384"></path></svg></i>`
			)
			.set(
				'warning',
				`<i style="width: 24px; height: 24px; margin-right: 14px;"><svg t="1606792346493" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6165" width="24" height="24"><path d="M512.911 1021.999c-68.712 0-135.387-13.465-198.17-40.02-60.625-25.643-115.066-62.346-161.81-109.089C106.188 826.146 69.485 771.706 43.842 711.08c-26.555-62.783-40.02-129.457-40.02-198.17 0-68.712 13.465-135.387 40.02-198.17 25.643-60.626 62.345-115.066 109.089-161.81 46.743-46.744 101.184-83.446 161.81-109.089 62.784-26.556 129.458-40.02 198.17-40.02 68.713 0 135.387 13.464 198.17 40.02 60.626 25.643 115.066 62.345 161.811 109.089 46.743 46.744 83.446 101.184 109.089 161.81 26.555 62.784 40.02 129.458 40.02 198.17 0 68.713-13.465 135.387-40.02 198.17-25.643 60.626-62.346 115.066-109.089 161.811-46.744 46.743-101.185 83.446-161.811 109.089C648.298 1008.534 581.624 1021.999 512.911 1021.999zM512.911 67.821c-245.423 0-445.089 199.666-445.089 445.089 0 245.423 199.666 445.089 445.089 445.089S958 758.333 958 512.91C958 267.487 758.334 67.821 512.911 67.821z" p-id="6166" fill="#ffffff"></path><path d="M510 671c-17.673 0-32-14.327-32-32L478 206c0-17.673 14.327-32 32-32s32 14.327 32 32l0 433C542 656.673 527.673 671 510 671z" p-id="6167" fill="#ffffff"></path><path d="M510.5 797.5m-31.5 0a31.5 31.5 0 1 0 63 0 31.5 31.5 0 1 0-63 0Z" p-id="6168" fill="#ffffff"></path></svg></i>`
			)
		this.duration = duration
		this.cb = cb || null
		this._render()
	}

	_render() {
		this.messageTitle.innerText = this.title
		this.messageBox.style = `
            display: flex;
            align-items: center;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            max-width: 90%;
            padding: .8rem 1.8rem;
            font-size: 16px;
            color: #fff;
            background-color: rgba(0, 0, 0, .55);
            border-radius: 6px;
            z-index: 99999;
        `
		this.messageTitle.style = `
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        `

		if (this.icon && this.iconsMaping.get(this.icon)) {
			this.messageBox.innerHTML = this.iconsMaping.get(this.icon)
			this.messageBox.appendChild(this.messageTitle)
		} else {
			this.messageBox.appendChild(this.messageTitle)
		}

		document.body.appendChild(this.messageBox)

		setTimeout(() => {
			document.body.removeChild(this.messageBox)
			this.cb && this.cb()
		}, this.duration)
	}
}
