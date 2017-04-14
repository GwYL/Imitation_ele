function debounce(func, wait) {
	var timer = null;
	wait = 600;

	return function() {
		var arg = arguments;

		var later = function() {
			func.apply(null, arg);
		}

		clearTimeout(timer);
		tiemr = setTimeout(function() {
			later();
		}, wait || 400);
	}
}

var addressModule = {
	name: "商品地址搜索页面模块",
	dom: $("#address"),
	init: function() {
		this.bindEvent();
	},
	loadList: function() {
		$.ajax({
			url: '/bgs/poi/search_poi_nearby',
			type: 'get',
			data: {
				keyword: $("#addr").val(),
				offset: 0,
				limit: 20
			},
			success: function(res) {
				console.log(res);
				var str = "";
				for (var i = 0; i < res.length; i++) {
					str += '<div><a href="#rList-' + res[i].latitude + '-' + res[i].longitude + '">'+ res[i].name + '</a></div>';
					str += '<p>' + res[i].address + '</p>';
				}
				$(".content").html(str);
			},
			error: function() {
				console.log("GG!");
			}
		})
	},
	bindEvent: function() {

		var me = this;

		$("#addr").on("input", debounce(function(event) {
			// console.log(event);
			me.loadList();
		}))

		$("#btn").click(function() {
			$.ajax({
				url: "/waimai?qt=poisug&wd=%E7%A7%91%E5%8D%8E&cb=suggestion_1491961133008&cid=75&b=&type=0&newmap=1&ie=utf-8",
				type: "get",
				dataType: "json",
				success: function(res) {
					console.log(res);
					var str = "";
					for(var i = 0, len = res.s.length; i < len; i++) {
						str += "<li>" + res.s[i] + "</li>";
					}
					$(".content").html(str);
				},
				error: function() {
					console.log("error");
				}
			})
		})
	},
	enter: function() {
		this.dom.show();
	},
	leave: function() {
		this.dom.hide();
	}
}