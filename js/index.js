$(function(){
	function makePoke(){
		var poker=[]
		var colors=['h','s','c','d'];
		var table={}
		while(poker.length!=52){
			var n=Math.ceil(Math.random()*13);
			var c=Math.floor(Math.random()*4);//0-3
		    var po={
		    	color:colors[c],
		    	number:n
		    };
		    if(!table[po.color+po.number]){
		        poker.push(po);
		        table[colors[c]+n]=true;
		    }
		}
		return poker;
	}
	function setPoke(poker){
		// console.table(poker)
	    //七排 28张  +=1 ++
	    // i   j
	    var index=0;
	    //构建一个字典
		var dict={1:'A',2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:'T',11:'J',12:'Q',13:'K'}
		// 上面的
		for(var i=0;i<7;i++){//外层
			for(var j=0;j<i+1;j++){ //
			var pok=poker[index]
	        index+=1;
	    	$('<div>')
	    		 .attr('id',i+'_'+j)
    	         .attr('attr-number',pok.number)
    	         .css('background-image','url(./images/'+dict[pok.number]+pok.color+'.png)')
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
	      // 下面的
	      for(;index<poker.length;index++){
	      	var pok=poker[index];
	      	$('<div>').addClass('pai left')
             	.attr('attr-number',pok.number)
      			.css('background-image','url(./images/'+dict[pok.number]+pok.color+'.png)')
             	.appendTo($('.scene'))	
      			.delay(index*20)
      			.animate({
      			   left:180,
      			   top:432,
      			   opacity:1,
      			})
	      }
	}
	setPoke(makePoke());
	//右移动
	if($('.left').length){
		var zIn=0;
		    $('.scene').on('mousedown',false)
			$('.moveR').on('click',function(){
			   if(($('.left').last().offset().top)<420){//判断.left 的top
			   	$('.left').last().animate({top:'+=20'})
			    prev=null;
			   }
			$('.left').last()
				.css({zIndex:zIn++,})
				.animate({left:680})
				.queue(function(){
			$(this)
				.removeClass('left')
				.addClass('right')
				.dequeue();
				})
		})
	}
	// 左移动
		$('.moveL').on('click',function(){
		 var  number=0;
		 return function(){
		 	number++;
		 	if($('.left').length){return}
		 	if(number>=3){return}
			$('.right').each(function(i,v){
					$(this)
					.delay(i*50)
				    .animate({left:180})
				    .queue(function(){
					     $(this)
					    .removeClass('right')
					    .addClass('left')
					    .dequeue();
				  })
		 	})
		 }
	}())
	
	// 第一排能点击 如果压住返回
	function iscanc(prev){
		var ar=$(prev).attr('id').split('_');//['1',2]  5_1  6_1  6_2
		var x=parseInt(ar[0])+1;
		var y=parseInt(ar[1]);
		 if($('#'+x+'_'+y).length||$('#'+x+'_'+(y+1)).length){
		 	return false;
		 }else{
		 	return true;
		 }
	}
   // 获取自定义属性
    function getattr(el){
    	return parseInt($(el).attr('attr-number'));
     }
    var prev=null;
   /*
   点击消失        四种情况
   压住 直接返回
   13 消除  return
   第一张存储  开关的逻辑
   第二张
   */
    $('.scene').on('click','.pai',function(){
    	if($(this).attr('id')&&!iscanc(this)){return}//没当住的牌能点击&&有id还有左边的图片
       var number=getattr(this);
       $(this).css('border','2px solid orange') 
   	// 第一次点击
       if(number==13){
        	$(this).delay(300)
       		   .animate({top:'-=20'})
       		   .delay(400)
       		   .animate({left:800,top:0})
       	       .queue(function(){
       	       	  $(this).detach().dequeue();
       	       })
       	       return
       }
     // 第二次点击相等
       if(!prev){
	       	 prev=$(this);
	       	 prev.animate({top:'-=20'})
	        }else{
	       	 if(getattr(prev)+getattr(this)==13){//等于13
	       	 			prev.delay(400)
       	 	        $(this).animate({top:'-=20'})
       	 			prev.css('border','1px solid orange')
	       	     	        .add(this)
	       	  				.animate({left:800,top:0})
	       	  				.queue(function(){
	       	  					$(this).detach().dequeue();
	       	  				})
	       	    }else{//不等于13  点击同一张
	       	    	if(getattr(prev)==getattr(this)){
	       	    		$(this).css('border','none').animate({top:'+=20'})
	       	    	}else{
	       	    		//不等于13  点击两张
		       	    	prev.delay(400).animate({top:'+=20'}).queue(function(){
		       	    	    	$(this).css('border','none').dequeue()
		       	    	    })     
	  	       	    	$(this)
	  	       	    	    .css('border','2px solid orange')
	  	       	    	    .animate({top:'-=20'})
	  	       	    	    .queue(function(){
		       	    		$(this).css('border','none').animate({top:'+=20'}).dequeue()
		       	    	})
	       	    	}
  	       	    	    prev=null;
	       	    }
       	 prev=null;
       }
   })
// 发牌
	$('.read,.star').on('click',function(){
		$('.pai').remove();
		setPoke(makePoke());
		clearInterval(t)
		time(0,0)

	})
//计时	
    time(0,0)
    var t;
    function time(m,f){
		 var m=m;
		 var f=f;
		 f=f<10?'0'+f:f;
		  t=setInterval(function(){
		 	m++
		 	m=m<10?'0'+m:m;
		 	if(m>=60){m=0;
		 		f++;
		 		f=f<10?'0'+f:f;
		 	}
		 	$('.miao').text(m)
		 	$('.fen').text(f)
		 },1000)	
    }
})
