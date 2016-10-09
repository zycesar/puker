$(function(){
	function makePoke(){
		var poker=[]
		//构建一个字典
		var dict={1:'A',2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:'T',11:'J',12:'Q',13:'K'}
		var colors=['h','s','c','d'];
		var table={}
		while(poker.length!=52){
			var n=Math.ceil(Math.random()*13);
			var c=Math.floor(Math.random()*4);//0-3
		    var po={
		    	color:colors[c],
		    	number:dict[n]
		    };
		    if(!table[po.color+po.number]){
		        poker.push(po);
		        table[colors[c]+dict[n]]=true;
		    }
		}
		return poker;
	}
	function setPoke(){
		
 		var poker=makePoke();
		// console.table(poker)
	    //七排 28张  +=1 ++
	    // i   j
	    var index=0;
		for(var i=0;i<7;i++){//外层
			for(var j=0;j<i+1;j++){ //
			var pok=poker[index]
	        index+=1;
	    	$('<div>')
    	         // .attr('id',)
    	         .css('background-image','url(./images/'+pok.number+pok.color+'.png)')
    	         .addClass('pai')
    	         .appendTo($('.scene'))
    	         .delay(index*20)
    	         .animate({
    	         	top:i*40,
    			 	left:(6-i)*74+j*146,
    			 	/*
    			 	0    1 left  left值的一半
					1    2
					2    3
					3    4 
					4    5
					5    6
					6    7
    			 	*/
    			 	opacity:1
    	         })
		      }
	      }
	      for(;index<poker.length;index++){
	      	var pok=poker[index];
	      	$('<div>').addClass('pai left')
	      			.css('background-image','url(./images/'+pok.number+pok.color+'.png)')
	             	.appendTo($('.scene'))	
	      			.delay(index*20)
	      			.animate({
	      			   left:180,
	      			   top:432,
	      			   opacity:1,

	      			})
	      }
	}
	setPoke();
	// 函数的作用域
	// 地址和值
	//闭包是
	// 函数在定义的时候会记录自己可见范围内的所有变量
	// 只记录地址，不记录值
	// 记录的顺序是由近到远
	// 所有的记录组成以一个链条
	/*叫做函数的作用域链
	函数在调用的时候，会查看作用域链
	辅助自己正确的解释执行函数内部的代码
	JS中函数的这个特性导出闭包概念
	通常用来构造一个更强大的概念或者用来获取一些中间状态的值
	eval 将字符串中的js代码解析执行
	*/
	//左右移动
	if($('.left').length){
	var z=0;

		$('.moveR').on('click',function(){
		$('.left').last().css({
			zIndex:z++,
		}).animate({
			left:680
		}).queue(function(){
		$(this).addClass('right').removeClass('left').dequeue();
		})
	})
	}
	var index=0;
	if(index>3){return}
	if(index<3){
		$('.moveL').on('click',function(){
		index++;
		$('.right').each(function(i,v){
				$(v).delay(index*200)
			    .animate({
				left:180
			    }).queue(function(){
			   $(this).removeClass('right').addClass('left').dequeue();
			})
		})
		   
	})
	}
   //点击消失
   $()

	

	
})
