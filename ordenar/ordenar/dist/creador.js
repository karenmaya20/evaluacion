iniciar();

function iniciar(){
    esMobil = esPortable();		
	console.log("ready(), es un aparato mobil? "+esMobil);


if(esMobil){
mobilepro();
}else{
   
desktop();
}
}

function mobilepro(){

    var imagenes= document.getElementsByClassName("drift-demo-trigger");

    for(var i=0;i<imagenes.length;i++){
        console.log(i);
        var padre=imagenes[i].parentNode;
        padre.setAttribute('id','wrap'+(i+1));

        }


        for(var i=0;i<imagenes.length;i++){
            var viewer = new ViewBigimg()
            var wrap = document.getElementById('wrap'+(i+1))
            // console.log(viewer)
            wrap.onclick = function (e) {
              if (e.target.nodeName === 'IMG') {
             viewer.show(e.target.src.replace('.jpg', '-big.jpg'))
            
              }
            }
            }

}

function desktop(){
    var imagenes= document.getElementsByClassName("drift-demo-trigger");

    for(var i=0;i<imagenes.length;i++){
        console.log(i);
        var padre=imagenes[i].parentNode;
        console.log(padre);
        var contenido1=document.createElement('div');
        contenido1.className="detail b"+(i+1);
        console.log(contenido1);
        padre.appendChild(contenido1);
        imagenes[i].classList.add('a'+(i+1));
        }


    for(var i=0;i<imagenes.length;i++){
                new Drift(document.querySelector('.a'+(i+1)), {
            paneContainer: document.querySelector('.b'+(i+1)),
            inlinePane: 900,
            inlineOffsetY: -85,
            containInline: true,
            hoverBoundingBox: true
        });

        }
        


}

function esPortable() {
    if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
            || navigator.userAgent.match(/Opera Mini/i)
            || navigator.userAgent.match(/IEMobile/i)
            ) {
        return true;
    } else {
		return false;
	}
}