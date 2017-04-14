function calSize() {
	var clientWidth = window.innerWidth || document.documentElement.clientWidth;
	var size = clientWidth / (375 / 23.4375);
	document.documentElement.style.fontSize = size + "px";
}

calSize();

window.addEventListener("resize", calSize);
