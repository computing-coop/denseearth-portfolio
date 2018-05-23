
//raster.fitBounds(view.bounds, true);

//raster.position = view.center;
// var group = new Group();


// var group = new Group();


var values = {
  paths: 5,
  minPoints: 5,
  maxPoints: 15,
  minRadius: 90,
  maxRadius: 300
};

var hitOptions = {
  segments: true,
  stroke: true,
  fill: true,
  tolerance: 5
};




createPaths();


function createPaths() {
  var radiusDelta = values.maxRadius - values.minRadius;
  var pointsDelta = values.maxPoints - values.minPoints;
  for (var i = 0; i < values.paths; i++) {

    var radius = values.minRadius + Math.random() * radiusDelta;
    var points = values.minPoints + Math.floor(Math.random() * pointsDelta);
    var path = createBlob(view.size * Point.random(), radius, points);
    var path2 = path.clone();

    var lightness = (Math.random() - 0.5) * 0.4 + 0.4;
    var hue = Math.random() * 360;
    path.fillColor = {
      hue: hue,
      saturation: 1,
      lightness: lightness
    };

    //path.contour = true;

    path.strokeColor = 'black';
    path.strokeBounds = 20;
    path2.strokeColor = 'red';
    path2.strokeBounds = 20;
    var raster = new Raster('img/image_01.png');

    path.addChild(raster);

    raster.position.x = path.position.x;
    raster.position.y = path.position.y;
    raster.selected = true;
    //raster.fitBounds(view.bounds, false);

    path.clipMask = true;
    var group3 = new Group({
      children: [raster, path]
    });


  }




}
;

function createBlob(center, maxRadius, points) {

  var path = new Path();
  path.closed = true;
  for (var i = 0; i < points; i++) {
    var delta = new Point({
      length: (maxRadius * 0.5) + (Math.random() * maxRadius * 0.5),
      angle: (360 / points) * i
    });
    path.add(center + delta);

  }
  path.smooth();
  return path;


}


var segment,
  path;
var movePath = false;


function onMouseDown(event) {


  ////
  // var path3 = new Path.Circle(event.point, 50);
  // var raster = new Raster('img/image_01.png');
  // path3.fillColor = 'black';
  //
  // path3.clipMask = true;
  // var group3 = new Group({
  //   children: [path3, raster]
  // });
  ////


  segment = path = null;
  var hitResult = project.hitTest(event.point, hitOptions);
  if (!hitResult)
    return;

  if (event.modifiers.shift) {
    if (hitResult.type == 'segment') {
      hitResult.segment.remove();
    }
    ;
    return;
  }

  if (hitResult) {
    path = hitResult.item;
    if (hitResult.type == 'segment') {
      segment = hitResult.segment;
    } else if (hitResult.type == 'stroke') {
      var location = hitResult.location;
      segment = path.insert(location.index + 1, event.point);
      path.smooth();

    }
  }
  movePath = hitResult.type == 'fill';
  if (movePath)
    project.activeLayer.addChild(hitResult.item);

}




function onMouseMove(event) {
  project.activeLayer.selected = false;
  if (event.item)
    event.item.selected = true;


}


function onMouseDrag(event) {
  if ( (segment) ) {
    segment.point += event.delta;
    path.smooth();
  } else if (path) {
    path.position += event.delta;
  }

  removeOnDrag(raster);

}





// window.addEventListener("resize", function() {
//   var c = document.getElementById('canvas');
// // c.style.width = window.innerWidth + 'px';
// // c.style.height = window.innerHeight + 'px';
// });
