var Aim = function (imgSrc, audioSrc) {
    if ( ! (this instanceof Aim) ) {
        return new Aim(imgSrc, audioSrc);
    }

    var self = this,
        img = new Image();

    this._img = img;
    this._audio = new Audio(audioSrc);

    img.onload = function () {
        self._init();
    }

    img.src = imgSrc;
}
        Aim.prototype._init = function () 
        {
            var self = this,
            canvas = self._canvas = document.createElement('canvas'),
            ctx = self._ctx = canvas.getContext('2d'),
            canvasDocOffset;
            self._bindDraw = self._draw.bind(self);
            self._nightVisionOn = true;
            self._isMoving = false;
            document.getElementsByTagName('div')[0].appendChild(canvas);
            canvas.width = self._img.width;
            canvas.height = self._img.height;
            canvas.style.cursor = 'none';
            canvasDocOffset = self._getCanvasDocOffset();
            ctx.drawImage(self._img, 0, 0);
            self._x = self._img.width/2;
            self._y = self._img.height/2;
            self._draw();
            canvas.addEventListener('mousedown', function canvasMouseDown(e) {
            self._audio.currentTime = 0;
            self._audio.play();
            e.preventDefault();
         });

    canvas.addEventListener('mousemove', function canvasMouseMove(e) 
    {
        self._x = e.pageX - canvasDocOffset.left;
        self._y = e.pageY - canvasDocOffset.top;
        if ( self._isMoving ) 
        {
            return;
        }
        self._isMoving = true;
        self._draw();
         });
        canvas.addEventListener('mouseout', function canvasMouseOut() {
        self._isMoving = false;
    });
    }
    Aim.prototype._draw = function () 
    {
        var canvas = this._canvas,
        ctx = this._ctx,
        x = this._x,
        y = this._y;
        ctx.drawImage(this._img, 0, 0);
        ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
        ctx.beginPath();
        ctx.arc(x, y, 100, 0, 2 * Math.PI);
        ctx.rect(canvas.width, 0, -canvas.width, canvas.height);
            if ( !this._nightVisionOn ) 
            {
                ctx.shadowColor = '#999';
                ctx.shadowBlur = 100;
            }
            else
            {
              ctx.shadowColor = 'rgba(0, 253, 39, 0.5)';
                ctx.shadowBlur = 800;
            }
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
            ctx.beginPath();
            ctx.moveTo(x - 100, y);
            ctx.lineTo(x - 10,  y)
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y - 100);
            ctx.lineTo(x,  y - 10);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x + 10, y);
            ctx.lineTo(x + 100,  y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y + 10);
            ctx.lineTo(x,  y + 100);
            ctx.stroke();
            ctx.beginPath();
            ctx.fillStyle = "rgba(255, 0, 0, 1)";
            ctx.arc(x, y, 2, 0, 2 * Math.PI);
            ctx.fill();
                if ( !this._isMoving )
                {
                    return;
                }
        requestAnimationFrame(this._bindDraw);
    }

        Aim.prototype.toggleNightVision = function () 
        {
            this._nightVisionOn = !this._nightVisionOn;
        }

        Aim.prototype._getCanvasDocOffset = function () 
        {
            var el = this._canvas,
                x = 0,
                y = 0;

            while( el ) {
                x += el.offsetLeft;
                y += el.offsetTop;

                el = el.offsetParent;
        }
            return { left: x, top: y };
}
                    window.imgAim = Aim(document.getElementsByTagName('img')[0].src,
                    document.getElementsByTagName('audio')[0].src)
/*
 ██████╗  ██████╗ ██╗   ██╗███████╗██╗  ██╗ █████╗ ███╗   ██╗     ██████╗ █████╗ ██████╗ ██████╗ ████████╗
██╔═══██╗██╔════╝ ██║   ██║╚══███╔╝██║  ██║██╔══██╗████╗  ██║    ██╔════╝██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝
██║   ██║██║  ███╗██║   ██║  ███╔╝ ███████║███████║██╔██╗ ██║    ██║     ███████║██████╔╝██████╔╝   ██║   
██║   ██║██║   ██║██║   ██║ ███╔╝  ██╔══██║██╔══██║██║╚██╗██║    ██║     ██╔══██║██╔══██╗██╔══██╗   ██║   
╚██████╔╝╚██████╔╝╚██████╔╝███████╗██║  ██║██║  ██║██║ ╚████║    ╚██████╗██║  ██║██║  ██║██║  ██║   ██║   
 ╚═════╝  ╚═════╝  ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝     ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   
                                                                     ██                                     
 ██████╗ ███████╗███████╗██████╗  ██████╗ ██████╗ ██████╗ 
██╔══██╗██╔════╝██╔════╝██╔══██╗██╔════╝██╔═══██╗██╔══██╗
██║  ██║█████╗  █████╗  ██████╔╝██║     ██║   ██║██║  ██║ ----------------------------------------------
██║  ██║██╔══╝  ██╔══╝  ██╔═══╝ ██║     ██║   ██║██║  ██║ 
██████╔╝███████╗███████╗██║     ╚██████╗╚██████╔╝██████╔╝
╚═════╝ ╚══════╝╚══════╝╚═╝      ╚═════╝ ╚═════╝ ╚═════╝ 

 ██████╗ █████╗ ██████╗ ████████╗     █████╗ ██████╗ ██████╗ 
██╔════╝██╔══██╗██╔══██╗╚══██╔══╝    ██╔══██╗██╔══██╗██╔══██╗
██║     ███████║██████╔╝   ██║       ███████║██████╔╝██████╔╝
██║     ██╔══██║██╔══██╗   ██║       ██╔══██║██╔═══╝ ██╔═══╝ 
╚██████╗██║  ██║██║  ██║   ██║       ██║  ██║██║     ██║     
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝       ╚═╝  ╚═╝╚═╝     ╚═╝     
*/