$(function() {
	$("header nav>ul>li:has(ul)").hover(function() {
		$(this).children("ul").stop(true, true).slideDown(400);
	}, function() {
		$(this).children("ul").stop(true, true).slideUp(400);
	});
	$("#contains .left>ul>li:eq(0)>a").find("span").html("-");
	$("#contains .left>ul>li:eq(0)>ul").css("display", "block");
	$("#contains .left>ul>li>a").click(function() {
		$("#contains .left>ul>li>a").find("span").html("+");
		$("#contains .left>ul>li>ul").stop(true).slideUp(500);
		$(this).next("ul").stop(true).slideDown(500);
		$(this).find("span").html("-");
	});
	//换肤
	$(function() {
		var $li = $("#skin li");
		$li.click(function() {
			switchSkin(this.id);
		});
		var cookie_skin = $.cookie("MyCssSkin");
		if(cookie_skin) {
			switchSkin(cookie_skin);
		}
	});

	function switchSkin(skinName) {
		$("#" + skinName).addClass("selected") //当前<li>元素选中
			.siblings().removeClass("selected"); //去掉其他同辈<li>元素的选中
		$("#cssfile").attr("href", "css/skin/" + skinName + ".css"); //设置不同皮肤
		$.cookie("MyCssSkin", skinName, {
			path: '/',
			expires: 10
		});
	}
	//01 新闻滚动 

	var $this = $(".p");
	var scrollTimer;
	$this.hover(function() {
		clearInterval(scrollTimer);
	}, function() {
		scrollTimer = setInterval(function() {
			scrollNews($this);
		}, 1000);
	}).trigger("mouseleave");

	function scrollNews(obj) {
		var $self = obj.find(":first");
		var lineHeight = $self.find("p:first").height(); //获取行高
		$self.animate({
			"marginTop": -lineHeight + "px"
		}, 600, function() {
			$self.css({
				marginTop: 0
			}).find("p:first").appendTo($self); //appendTo能直接移动元素
		})
	}

	//02 模块展开和折叠 

	$(".new h2").toggle(function() {
		var $self = $(this);
		$self.next().stop().slideToggle(300, function() {
			$self.find("span").html("+");
		});
	}, function() {
		var $self = $(this);
		$self.next().stop().slideToggle(300, function() {
			$self.find("span").html("-");
		});
	})

	//图片左右滑动
	var page = 1; //默认当前的页面是1
	var i = 6; //每版6个图片
	var len = $(".list ul li").length; //li的数量 

	var page_count = Math.ceil(len / i); //总页数(只要不是整数，就往大的方向取最小的整数)

	var none_unit_width = 990 /*$(".list").width()*/ ; //获取框架内容的宽度,不带单位
	var $parent = $(".list ul"); //获取li的宽度和(实际宽度)
	//向右 按钮
	$(".goRight").click(function() {

		if(!$parent.is(":animated")) {
			if(page == page_count) { //已经到最后一个版面了,如果再向后，必须跳转到第一个版面。
				$parent.animate({
					left: 0
				}, 800); //通过改变left值，跳转到第一个版面
				page = 1;
			} else {
				$parent.animate({
					left: '-=' + none_unit_width
				}, 800); //通过改变left值，达到每次换一个版面
				page++;
			}
			console.log(page);
		}
	});
	//往左 按钮
	$(".goLeft").click(function() {

		if(!$parent.is(":animated")) {

			if(page == 1) { //已经到第一个版面了,如果再向前，必须跳转到最后一个版面。
				$parent.animate({
					left: '-=' + none_unit_width * (page_count - 1)
				}, 800); //通过改变left值，跳转到最后一个版面
				page = page_count;

			} else {
				$parent.animate({
					left: '+=' + none_unit_width
				}, 800); //通过改变left值，达到每次换一个版面
				page--;
			}

		}
	});
	/*点小图看大图*/
	$(".pro_detail_left ul li").eq(0).css("border", "1px solid #0d61b8");
	$(".pro_detail_left ul li img").livequery("click", function() {
		$(this).parent().css("border", "1px solid #0d61b8");
		$(this).parent().siblings().css("border", "none");
		var imgSrc = $(this).attr("src"); //图片路径
		var i = imgSrc.lastIndexOf("."); //返回.最后出现的位置
		var unit = imgSrc.substring(i); //文件扩展名
		imgSrc = imgSrc.substring(0, i); //文件主名
		
		
		var imgSrc_small = imgSrc + "_small" + unit;
		var imgSrc_big = imgSrc + "_big" + unit;
		$("#bigImg").attr({
			"src": imgSrc_small,
			"jqimg": imgSrc_big
		});
		$("#bigImg2").attr({
			"src": imgSrc_small,
			"jqimg": imgSrc_big
		});
	});
	$(".tabs ul li:eq(0) p").css("display", "block").prev().css("background", "#ddd");
	$(".tabs ul li h4").hover(function() {
		$(this).css("background", "#ddd")
			.parent().siblings().find("h4").css("background", "none");
		$(".tabs ul li p").css("display", "none");
		$(this).siblings().css("display", "block");
	})
	/*衣服颜色切换*/

	$(".color_change ul li img").click(function() {
		var imgSrc = $(this).attr("src"); //images/blue.jpg
		var i = imgSrc.lastIndexOf("."); //11
		var unit = imgSrc.substring(i); //.jpg

		imgSrc = imgSrc.substring(0, i); //images/blue

		var imgSrc_small = imgSrc + "_one_small" + unit; //images/blue_one_small.jpg

		var imgSrc_big = imgSrc + "_one_big" + unit; //images/blue_one_big.jpg
		$("#bigImg").attr({
			"src": imgSrc_small,
			"jqimg": imgSrc_big
		}); //一个大box
		$("#bigImg2").attr({
			"src": imgSrc_small,
			"jqimg": imgSrc_big
		}); //一个大box
		$("#thickImg").attr("href", imgSrc_big);
		var alt = $(this).attr("alt");
		$(".color_change strong").text(alt);
		var imgsrc_one = imgSrc + "_one" + unit;
		var imgsrc_two = imgSrc + "_two" + unit;
		var imgsrc_thr = imgSrc + "_three" + unit;

		$(".pro_detail_left ul.imgList li").eq(0).find("img").attr({
			"src": imgsrc_one
		});
		$(".pro_detail_left ul.imgList li").eq(1).find("img").attr({
			"src": imgsrc_two
		});
		$(".pro_detail_left ul.imgList li").eq(2).find("img").attr({
			"src": imgsrc_thr
		});

	});
});
/*衣服尺寸选择*/
$(function() {
	$(".pro_size li span").click(function() {
		$(this).parents("ul").siblings("strong").text($(this).text());
	})
})
/*数量和价格联动*/
$(function() {
	var $span = $("div.pro_price span");
	var price = $span.text();
	$("#num_sort").change(function() {
		var num = $(this).val();
		var amount = num * price;
		$span.text("￥" + amount);
	}).change();
	//通过修改样式来显示不同的星级
	$("ul.rating li a").click(function() {
		var title = $(this).attr("title");
		alert("您给此商品的评分是：" + title);
		var cl = $(this).parent().attr("class");
		$(this).parent().parent().removeClass().addClass("rating " + cl + "star");
		$(this).blur(); //去掉超链接的虚线框
		return false;
	})
})
/*最终购买输出*/
$(function() {
	var $product = $(".shp_detail");
	$("#cart a").click(function() {
		var pro_name = $product.find("h3:first").text();
		var pro_size = $product.find(".pro_size strong").text();
		var pro_color = $(".color_change strong").text();
		var pro_num = $product.find("#num_sort").val();
		var pro_price = $product.find(".pro_price span").text();
		var dialog = " 感谢您的购买。\n您购买的\n" +
			"产品是：" + pro_name + "；\n" +
			"尺寸是：" + pro_size + "；\n" +
			"颜色是：" + pro_color + "；\n" +
			"数量是：" + pro_num + "；\n" +
			"总价是：" + pro_price + ".";
		if(confirm(dialog)) {
			alert("您已经下单!");
		}
		return false; //避免页面跳转
	})
})