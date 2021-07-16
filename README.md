# ShowMessage 简单易用的轻量级前端消息提示工具

### Introduction

简单易用的轻量级前端消息提示工具

### Installation

```sh
npm install show-message
```

### Usage

```js
import showMessage from 'show-message'

showMessage({
  title: 'This is a test message.', // 消息标题
  icon: 'success', // 携带图标 success, failed, warning
  duration: 2500, // 持续时间
  cb() {
	  console.log('消息提醒完成')
  }, // 提醒结束后的回调函数
})
```

### Use in static pages

```html
<script src="dist/show-message.js"></script>
```

```js
showMessage({
  title: 'This is a test message.', // 消息标题
  icon: 'success', // 携带图标 success, failed, warning
  duration: 2500, // 持续时间
  cb() {
	  console.log('消息提醒完成')
  }, // 提醒结束后的回调函数
})
```

### LICENSE

MIT@[Pork](https://github.com/porkio)
