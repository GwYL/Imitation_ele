// 单个购物车对象

function singleCart(obj) {
	this.id = obj.item_id; // 商品ID
	this.price = obj.specfoods[0].price; // 商品价格
	this.num = obj.num || 0; // 商品数量
	this.name = obj.name; // 商品名称

	this.imgF = obj.image_path.substring(0, 1);
	this.imgS = obj.image_path.substring(1, 3);
	this.imgStyle = obj.image_path.substring(32);
	this.imgPath = obj.image_path.substring(3); // 商品图片路径

	this.description = obj.description; // 商品描述
	this.month_sales = obj.month_sales; // 商品月销售额
	this.satisfy_rate = obj.satisfy_rate; // 商品好评率
}

singleCart.prototype.plus = function() { // 加
	this.num++;
}

singleCart.prototype.minus = function() { // 减
	this.num--;
}

singleCart.prototype.render = function() { // 商品信息渲染
	console.log(this.name);

	str = 
		'<div class="food-info" data-itemid="' + this.id + '">' +
			'<div class="food-img">' +
			'<img src="//fuss10.elemecdn.com/' + this.imgF + '/' + this.imgS + '/' + this.imgPath + '.' + this.imgStyle + '?imageMogr/format/webp/" alt="商家图片" />' +
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

singleCart.prototype.renderCart = function() { // 购物车商品信息渲染

	var str = 
		'<li class="cart-info" data-itemId="' + this.id + '">' +
			'<p>' + this.name + '</p>' +
			'<p>￥<span>' + this.price + '</span></p>' +
			'<p>' +
				'<span class="minus">-</span>' +
				'<span class="num">' + this.num + '</span>' +
				'<span class="plus">+</span>' +
			'</p>' +
		'</li>';

	return str;

}