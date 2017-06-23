var fruitObj = function()
 {
    this.alive = [];
    this.x = [];
    this.y = [];
    this.aneNO = [];
    this.l = [];
    this.spd = [];
    this.fruitType= [];
    this.orange = new Image();
    this.blue = new Image();
}
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function()
 {
    for (var i = 0; i < this.num; i++) 
    {
        this.alive[i] = true;
        this.x[i] = 0;
        this.y[i] = 0;
        this.aneNO[i] = 0;
        this.spd[i] = Math.random() * 0.017 + 0.003;//[0.003,0.02]
        this.fruitType[i]="";
    }
    this.orange.src = "./src/fruit.png";
    this.blue.src = "./src/blue.png";
}

fruitObj.prototype.draw = function()
 {
    for (var i = 0; i < this.num; i++)
     {
     	
        if (this.alive[i])
         {
         	if(this.fruitType[i] =="blue")
         	{
         		var pic= this.blue;
         	}
         	else
         	{
         		var pic = this.orange;
         	}
            if (this.l[i] <= 10) //r
            {	
            	var NO = this.aneNO[i];
            	this.x[i] = ane.headx[NO];
            	this.y[i] = ane.heady[NO];
                this.l[i] += this.spd[i] * deltaTime;
                
            } 
            else 
            {
                this.y[i] -= this.spd[i] * 7 * deltaTime;
                //ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
            }
            	ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
            if (this.y[i] < 10) 
            {
                this.alive[i] = false;
            }
        }
    }
}
 
fruitObj.prototype.born = function(i) 
{
    this.aneNO[i] = Math.floor(Math.random()* ane.num);
    this.l[i] = 0;
    this.alive[i]=true;
    var ran =Math.random();
    if(ran<0.3)
    {
    	 this.fruitType[i]="blue";
	}
	else
	{
		this.fruitType[i]="orange";
	}
 }

fruitObj.prototype.dead = function(i)
{
	this.alive[i]= false;
}
//规定果实的数量
function fruitMonitor()
{
	var num=0;
	for(var i=0;i<fruit.num;i++)
	{
		if(fruit.alive[i]) num++;
	}
	if(num<20)
	{
		sendFruit();
		return;
	}
}
//果实的出生
function sendFruit()
{
	for(var i =0;i<fruit.num;i++)
	{
		if(!fruit.alive[i])
		{
			fruit.born(i);
			return;
		}
	}
}