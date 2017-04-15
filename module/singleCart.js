// 单个购物车对象

function singleCart(obj) {
	this.id = obj.item_id;
	this.price = obj.specfoods[0].price;
	this.num = obj.num || 0;
	this.name = obj.name;

	this.imgF = obj.image_path.substring(0, 1);
	this.imgS = obj.image_path.substring(1, 3);
	this.imgStyle = obj.image_path.substring(32);
	this.imgPath = obj.image_path.substring(3);

	this.description = obj.description;
	this.month_sales = obj.month_sales;
	this.satisfy_rate = obj.satisfy_rate;
}

singleCart.prototype.plus = function() {
	this.num++;
}

singleCart.prototype.minus = function() {
	this.num--;
}

singleCart.prototyep.render = function() {
	console.log(this.name);

	str += 
		'<div class="food-info">' +
			'<div class="food-img">' +
			'<img src="//fuss10.elemecdn.com/' + this.imgF + '/' + this.imgS + '/' + this.imgPath + '.' + imgStyle + '?imageMogr/format/webp/" alt="商家图片" />' +
			'</div>' +
			'<div class="food-detail">' +
				'<div class="food-name">' +
					this.name +
				'</div>' +
				'<div class="des">' +
					this.description +
				'</div>' +
				'<div class="food-sales">' +
					'月售' + this.month_sales + '份 好评率' + this.satisfy_rate + '%' +
				'</div>' +
				'<div class="food-price">' +
					'<span class="price-item">￥<span>' + this.price + '</span></span>' + 
					'<span class="minus">-</span>' + 
					'<span class="num">0</span>' +
					'<span class="plus">+</span>' +
				'</div>' +
			'</div>' +
		'</div>';

	return str;

}

singleCart.prototyep.renderCart = function() {
	var str = 
}