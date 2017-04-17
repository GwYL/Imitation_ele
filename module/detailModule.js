var detailModule = Object.create(addressModule);

detailModule = $.extend(detailModule, {
	name: "商品详情页面模块",
	dom: $("#detail"),
	cartList: {
		// 该对象用于缓存购物车的所有实例
	},
	init: function() {
		this.bindEvent();
		cartView.init();
	},
	bindEvent: function() {
		//
		var me = this;

		$(".clear").on("click", function() {

			cartView.clear();

		})

		$(".detail-catalog").on("click", "li", function(event) {
			//
			$(this).addClass("active");

			$(this).siblings().removeClass("active");

			var selector = '[data-title="' + $(this).text() + '"]';

			var ele = $(selector).get(0);

			rightScroll.scrollToElement(ele, 500);
		})

		// 购物车列表视图
		var cartViewDom = $(".cart-view"); 

		$(".cart-layer").click(function() {

			cartViewDom.hide();

			$(".cart-layer").hide();

		})

		$(".cart").click(function() {

			cartViewDom.toggle();

			$(".cart-layer").show();

			cartView.render();

		})

		// 购物车数量加减事件绑定
		$(".right-pane").on("click", ".plus", function(event) {

			var closestDom = $(this).closest(".food-info");

			var curId = closestDom.data('itemid');

			var curModule = me.cartList[curId];
			
			curModule.plus();

			// 动态加载购物车列表数据
			cartView.list[curModule.id] = curModule;

			var selector = '[data-itemid="' + curId + '"]';

			$(selector).find(".num").html(curModule.num);

			Store(location.hash.split("-")[1], cartView.list);

		})

		$(".right-pane").on("click", ".minus", function(event) {

			var closestDom = $(this).closest(".food-info");

			var curId = closestDom.data('itemid');

			var curModule = me.cartList[curId];

			curModule.minus();

			if(curModule.num === 0) {

				delete cartView.list[curModule.id];

			}

			// 动态加载购物车列表数据
			var selector = '[data-itemid="' + curId + '"]';

			$(selector).find(".num").html(curModule.num);

			Store(location.hash.split("-")[1], cartView.list);

		})

	},
	loadInfo: function(hash) {
		// 加载信息
		this.shopId = hash.split("-")[1];
		this.lat = hash.split("-")[2];
		this.lng = hash.split("-")[3];
		this.loadHeaderInfo();
		this.loadfoodInfo();

	},
	reset: function() {

		this.cartList = {};

		var id = location.hash.split("-")[1];

		cartView.list = Store(id);

	},
	loadHeaderInfo: function() {
		$.ajax({
			url: "shopping/restaurant/" + this.shopId,
			type: "get",
			data: {
				extras:['activities', 'album', 'identification', 'statistics'],
				latitude: this.lat,
				longitude: this.lng
			},
			success: function(res) {
				console.log(res);
				var str = '';
				
				var imgF = res.image_path.substring(0, 1),
					imgS = res.image_path.substring(1, 3),
					imgStyle = res.image_path.substring(32);

				str = 
					'<div class="back"><a href="#address">&lt;</a></div>' +
					'<div class="detail-header-info">' +
						'<div class="header-img">' +
						'<img src="//fuss10.elemecdn.com/' + imgF + '/' + imgS + '/' + res.image_path.substring(3) + '.' + imgStyle + '?imageMogr/format/webp/" alt="商家图片" />' +
						'</div>' +
						'<div class="header-info">' +
							'<div class="header-name">' + res.name + '</div>' +
							'<div class="ways">' +
								'<span class="amazon">蜂鸟专送 / </span>' +
								'<span class="send-time">' + res.order_lead_time + '分钟直达 / </span>' +
								'<span class="send-money">' + res.piecewise_agent_fee.tips + '</span>' +
							'</div>' +
							'<div class="notice">' +
								'<p class="notice-info">公告: ' + res.promotion_info + '</p>' +
							'</div>' +
							'<div><a id="header_detail" href="">&gt;</a></div>' +
						'</div>	' +
					'</div>' +
					'<div class="detail-active">' +
					'<div class="news">' + res.activities[0].description + '</div>' +
					'<span class="active-num">' + res.activities.length + '个活动</span>' +
					'</div>';

				$(".detail-header").html(str);

				if (typeof leftScroll !== 'undefined' || typeof rightScroll !== 'undefined') {
					leftScroll.destroy();
					rightScroll.destroy();
				}

				window.leftScroll = new IScroll(".left-pane", {
					scrollbars: true, // 进行滚动条的展示
					bounce: true
				})

				window.rightScroll = new IScroll(".right-pane", {
					scrollbars: true,
					bounce: true,
					probeType: 2 // 1, 2, 3 设置滚动条的灵敏度
				})
				
				var foodItem = $(".detail-info li");
				console.log(foodItem);
				var listItem = $(".detail-catalog li");

				$(".detail-catalog li").eq(0).addClass("active");

				var heightList = [];

				var sum = 0;

				for (var i = 0; i < foodItem.length; i++) {
					sum += foodItem.eq(i).height();
					heightList.push(sum);
				}
				console.log(heightList);

				rightScroll.on("scroll", function() {

					var offsetY = Math.abs(rightScroll.y); // 拿到滚动偏移距离

					for (var i = 0; i < heightList.length; i++) {
						// rightScroll.y
						if (offsetY < heightList[i]) {
							listItem.eq(i).addClass("active");
							listItem.eq(i).siblings().removeClass("active");
							break;
						}
					}
				})
			}
		})
	},
	loadfoodInfo: function() {
		var me = this;
		$.ajax({
			url: '/shopping/v2/menu?restaurant_id=' + this.shopId,
			tyep: "get",
			success: function(res) {
				//
				console.log('食物数据： ', res);

				var catalogStr = "";
				var foodStr = "";

				for (var i = 0; i < res.length; i++) {

					catalogStr += '<li>' + res[i].name + '</li>';

					foodStr += 
						'<li>' +
							'<div id="nav_title" data-title="' + res[i].name + '">' +
								res[i].name +   
								'<span class="nav-info">' + res[i].description + '</span>' +
							'</div>' + 
							me.renderFood(res[i].foods) +
						'</li>';
				}
				$(".detail-catalog").html(catalogStr);
				$(".detail-info").html(foodStr);

			},
			error: function() {
				//
				console.log("error...");
			}
		})
	},
	renderFood: function(data) {

		var str = "";
		
		for(var i = 0; i < data.length; i++) {

			for(var key in cartView.list) {

				if (cartView.list[key].id === data[i].item_id.toString()) {

					data[i].num = cartView.list[key].num;

					console.log(cartView.list);

					var cart = new singleCart(data[i]);

					cartView.list[key] = cart;

				}

			}

			var cart = new singleCart(data[i]);

			str += cart.render();

			this.cartList[cart.id] = cart;

		}

		return str;

	}
})