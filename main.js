function main(){

  audioCtx = new AudioContext();
  analyser = audioCtx.createAnalyser();
  buffer = new Uint8Array(analyser.fftSize);

  cvs = document.getElementById("cvs");
  ctx = cvs.getContext('2d');
  cvs.width = 640;
  cvs.height= 480;
  width = cvs.width;
  height = cvs.height;
  var src = navigator.mozGetUserMedia({video:false,audio:true},
      function(stream){

        var src = audioCtx.createMediaStreamSource(stream);    
        src.connect(analyser);
        analyser.connect(audioCtx.destination);
        window.setInterval(loop,100); 
      },function(err){
        console.log(err);
      });



}

function loop(){
  analyser.getByteTimeDomainData(buffer);
  ctx.clearRect(0,0,1000,1000);
  ctx.beginPath();
  ctx.moveTo(0,0);
  for(var i=0;i<buffer.length;i++){
    ctx.lineTo(i,buffer[i]);
  }
  ctx.stroke();
  buffer = new Uint8Array(analyser.fftSize);
}
