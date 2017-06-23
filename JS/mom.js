var momObj = function()
{
	this.x;
	this.y;
	this.angle;

	this.momTailTimer = 0;
	this.momTailCount = 0;

	this.momEyeTimer = 0;
	this.momEyeCount = 0;
	this.momEyeInterval = 1000;

	this.momBodyCount = 0;

}
momObj.prototype.init = function()
{
	this.x = canWidth*0.5;
	this.y = canHeight*0.5;
	this.angle=0;
}
momObj.prototype.draw= function()
{
	//lerp x,y
	this.x = lerpDistance(mx,this.x,0.9);
	this.y = lerpDistance(my,this.y,0.9);

	//delta angle
	//Math atan2(y,x)
	var deltaY = my - this.y;
	var deltaX = mx - this.x;
	var beta = Math.atan2(deltaY,deltaX)+Math.PI;//-PI ,PI;如果没加'+Math.PI',则是尾部跟随鼠标移动,

	//lerp angle
	this.angle = lerpAngle(beta,this.angle,0.69);

	//大鱼的尾
	this.momTailTimer += deltaTime;
	if(this.momTailTimer > 50)
	{
		this.momTailCount = (this.momTailCount +1) % 8;
		this.momTailTimer %= 50;
	}

	//eye
	this.momEyeTimer += deltaTime;
	if(this.momEyeTimer>this.momEyeInterval)
	{
		this.momEyeCount = (this.momEyeCount +1) % 2;
		this.momEyeTimer %= this.momEyeInterval;
		if(this.momEyeCount == 0)
		{
			this.momEyeInterval = Math.random()*1500 + 2000;
		}
		else
		{
			this.momEyeInterval =200;
		}

	}

	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);

	var momTailCount = this.momTailCount;
	ctx1.drawImage(momTail[momTailCount], -momTail[momTailCount].width*0.5+30, -momTail[momTailCount].height*0.5);
	
	var momBodyCount= this.momBodyCount;
	if(data.double == 1)//判断果实的颜色
	{
		ctx1.drawImage(momBodyOra[momBodyCount], -momBodyOra[momBodyCount].width*0.5, -momBodyOra[momBodyCount].height*0.5);
	}
	else
	{
		ctx1.drawImage(momBodyblue[momBodyCount], -momBodyblue[momBodyCount].width*0.5, -momBodyblue[momBodyCount].height*0.5);
	}
	
	var momEyeCount=this.momEyeCount;
	ctx1.drawImage(momEye[momEyeCount], -momEye[momEyeCount].width*0.5, -momEye[momEyeCount].height*0.5);

	ctx1.restore();
}
