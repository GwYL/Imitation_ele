var rListModule = Object.create(addressModule);

rListModule = $.extend(rListModule, {
	name: "商品列表页面模块",
	dom: $("#rList"),
	bindEvent: function() {
		// 监听滚动事件
		var me = this;
		window.addEventListener("scroll", debounce(function() {
			if(window.scrollY + window.innerHeight === me.dom.height()) {
				me.loadList(me.hash);
			}
		}));

		var lis = $("#position li");
		// 调用轮播图的初始化方法
		Swipe(document.getElementById('mySwipe'), {
		  auto: false,
		  continuous: true,
		  callback: function(pos) {
		  	// 当滑动结束后 所需要执行的方法
		  	// console.log(pos); // pos当前滑动板块的索引值
		  	lis.eq(pos).addClass('cur');
		  	lis.eq(pos).siblings().removeClass('cur');
		  }
		});
	},
	initCount: 0,
	reset: function() {
		$("#lists").html("");
		this.initCount = 0;	
		this.dom.removeClass("noData");	
	},	
	loadList: function(hash, flag) {
		this.hash = hash;
		var me = this;
		if (flag) {
			this.reset();
		}
		var lat = hash.split("-")[1];
		var lng = hash.split("-")[2];
		var geohash = hash.split("-")[3];

		$.ajax({
			url: "/shopping/restaurants",
			type: "get",
			data: {
				latitude: lat,
				longitude: lng,
				offset: this.initCount,
				limit: 20,
				extras: ['activities'],
				terminal: 'h5'
			},
			success: function(res) {
				console.log("success", res);
				if (res.length === 0) {
					me.dom.addClass("noData");
				}
				me.initCount += 20;
				var str = "";
				for(var i = 0; i < res.length; i++) {
					var imgF = res[i].image_path.substring(0, 1),
						imgS = res[i].image_path.substring(1, 3),
						imgStyle = res[i].image_path.substring(32),
						distant = res[i].distance,
						distance = null;

					if (distant >= 1000) {
						var dis = distant;
						distant = dis.toString();
						distance = distant.substring(0, 1) + "." + distant.substring(1, 3) + "km";
					} else {
						distance = distant + "m";
					}


					str += 
						'<li>' +
							'<div class="left-img">' +
								'<img src="//fuss10.elemecdn.com/' + imgF + '/' + imgS + '/' + res[i].image_path.substring(3) + '.' + imgStyle + '?imageMogr/format/webp/" alt="商家图片" />' +
							'</div>' +
							'<div class="right-price">' +
								'<div class="right-title">' +
									'<div>' +
										'<span class="brand">品牌</span>' +
										'<span class="item-name"><a href="#detail-' + res[i].id + '-' + res[i].latitude + '-' + res[i].longitude + '">' + res[i].name + '</a></span>' +
									'</div>' +
									'<p>' +
										'<span class="protect">保</span>' +
										'<span class="ticket">票</span>' +
										'<span class="standard">准</span>' +
									'</p>' +
								'</div>' +
								'<div class="right-info">' +
									'<div>' +
										'<img src="imgs/star.gif" alt="评分">' +
										'<span class="score">' + res[i].rating + '</span>' +
										'月售<span class="sales-num">' + res[i].recent_order_num + '</span>单 ' +
									'</div>' +
									'<p>' +
										'<span class="on-time">准时达</span>' +
										'<span class="mango">蜂鸟专送</span>' +
									'</p>' +
								'</div>' +
								'<div class="right-num">' +
									'<div>' +
										'￥<span class="money">' + res[i].piecewise_agent_fee.rules[0].price + '</span>起送/' +
										'<span class="cost">' + res[i].piecewise_agent_fee.tips + '</span>' +
									'</div>' +
									'<p>' +
										'<span class="distant">' + distance + '</span>' +
										'<span class="timeout">' + res[i].order_lead_time + '分钟</span>' +
									'</p>' +
								'</div>' +
							'</div>' +
						'</li>';
					
				}
				$("#lists").append(str);

				me.loadRoll(geohash);
				
			}
		})
	},
	loadRoll: function(geohash) { // 加载轮播图信息
		//
		$.ajax({
			url: "v2/index_entry",
			type: "get",
			data: {
				geohash: geohash,
				group_type: 1,
				flags: ["F"]
			},
			success: function(res) {
				console.log(res);
			}
		})
	}
})