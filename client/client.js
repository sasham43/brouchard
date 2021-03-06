angular.module('brouchard', []);

// var socket = io();

angular.module('brouchard').controller('MainController', ['$http', '$interval', function($http, $interval){
  var mc = this;

  // file upload
  mc.previewFile = function(){
    var preview = document.querySelector('img'); //selects the query named img
       var file    = document.querySelector('input[type=file]').files[0]; //sames as here
       var reader  = new FileReader();

       reader.onloadend = function () {
           preview.src = reader.result;
       }

       if (file) {
           reader.readAsDataURL(file); //reads the data as a URL
       } else {
           preview.src = "";
       }
  };

  var neural = new synaptic.Architect.Perceptron(2,15,3);
  // var worker = null; // ?
  var index = 0; // ?
  var image_data = null;
  var canvas = null;
  var context = null;
  // var size = 125 * 125;
  var iteration = 0; // ?
  // var to = null; // ?
  var px = null;

  var dynamicRate = null;

  var getData = function(imageObj){
    canvas = canvas || document.getElementById('output');
    context = context || canvas.getContext('2d');

    context.drawImage(imageObj, 0, 0);
    var imageData = context.getImageData(0, 0, 125, 125);
    return imageData.data;
  };

  var train = mc.train = function(){
    // lstm = new synaptic.Architect.LSTM(2, 15, 3);
    image_data = getData(document.getElementById('input'));
    console.log('training...');
    paint();
  };

  var iterate = function(){
    for(var x = 0; x < 125; x++){
      for(var y = 0; y < 125; y++){
        var dynamicRate = .01/(1+0.0005*iteration);
        px = pixel(input, x, y);
        neural.activate([x/125, y/125]);
        neural.propagate(dynamicRate, pixel(image_data, x, y));
      }
    }
    paint();
  };

  var pixel = function(data, x, y){
    var red = data[((125 * y) + x) * 4];
    var green = data[((125 * y) + x) * 4 + 1];
    var blue = data[((125 * y) + x) * 4 + 2];
    return [red/255, green/255, blue/255];
  };

  var paint = function(){
    // console.log('painting...');
    iteration++;
    var imageData = context.getImageData(0,0,125,125);
    for (var x = 0; x < 125; x++){
      for (var y = 0; y < 125; y++){
        var rgb = neural.activate([x/125,y/125]);
        imageData.data[((125 * y) + x) * 4] = (rgb[0] )* 255;
        imageData.data[((125 * y) + x) * 4 + 1] = (rgb[1] ) * 255;
        imageData.data[((125 * y) + x) * 4 + 2] = (rgb[2] ) * 255;
      }
    }
    context.putImageData(imageData,0,0);

    requestAnimationFrame(iterate);
  };

  // $interval(function(){
  //   // console.log('dynamicRate:', dynamicRate);
  //   console.log('iteration:', iteration);
  // }, 3000);

  console.log('main controller loaded.');
}]);
