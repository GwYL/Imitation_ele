var cartView = {
	name: "购物车列表模块",
	init: function() {
		this.bindEvent();
	},
	bindEvent: function() {
		var me = this;

		$(".cart-view").on("click", ".plus", function(event) {

			var closestDom = $(this).closest(".cart-info");

			var curId = closestDom.data('itemId');

			var curModule = me.list[curId];

			curModule.plus();

			// 动态加载购物车列表数据

			var selector = '[data-itemId="' + curId + '"]';

			Store(location.hash.split("-")[1], cartView.list);

		})

		$(".cart-view").on("click", ".minus", function(event) {

			var closestDom = $(this).closest(".cart-info");

			var curId = closestDom.data('itemId');

			var curModule = me.list[curId];

			curModule.minus();

			// 动态加载购物车列表数据

			var selector = '[data-itemId="' + curId + '"]';

			$(selector).find(".num").html(curModule.num);

			if(curModule.num === 0) {

				delete cartView.list[curModule.id];

				closestDom.remove();
			}

			Store(location.hash.split("-")[1], cartView.list);
			
		})


	},
	clear: function() {

		for(var key in this.list) {

			this.list[key].num = 0;

			var selector = '[data-itemId="' + this.list[key].id + '"]';

			$(selector).find(".num").html(this.list[key].num);

			$(".cart-view").hide();

			this.dom.html("");

			delete this.list[key];

		}
	},
	render: function() { // 渲染购物车

		var str = '';

		console.log(this.list);

		for(var key in this.list) {

			str += this.list[key].renderCart();

		}

		this.dom.html(str);

	}
}