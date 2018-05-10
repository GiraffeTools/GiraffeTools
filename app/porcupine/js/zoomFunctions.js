export default function () {
  "use strict";

  let zoomFunctions = document.getElementById('zoomContainer');
  let canvas = document.getElementById('jsplumbContainer');
  let zoomIn = document.getElementById('icon-plus');
  let zoomOut = document.getElementById('icon-minus');

  if (!canvas) { return; }

  let params = {
    x: getQueryVariable('x'),
    y: getQueryVariable('y'),
    zoom: getQueryVariable('zoom')
  };

  let current = {};
  current.x = params.x ? parseFloat(params.x) : $(canvas).data('x');
  current.y = params.y ? parseFloat(params.y) : $(canvas).data('y');
  current.zoom = params.zoom ? parseFloat(params.zoom) : $(canvas).data('zoom');

  canvas.x = 0;
  canvas.y = 0;
  canvas.scale = 1;
  canvas.updateContainerPosition = function () {
    canvas.style.left = canvas.x + 'px';
    canvas.style.top = canvas.y + 'px';
  };
  canvas.updateContainerScale = function () {
    canvas.style.transform = 'scale(' + canvas.scale + ')'
  };

  canvas.updateContainerPosition();
  canvas.updateContainerScale();

  zoomFunctions.addEventListener('gestureend', function (e) {
    if (e.scale < 1.0) {
      onZoom(current.zoom * 1.2);
    } else if (e.scale > 1.0) {
      onZoom(current.zoom / 1.2);
    }
  }, false);

  let dragging = false;
  let state = { click: false, pan: false };
  let previousMousePosition;

  zoomFunctions.onmousedown = function (e) {
    e.preventDefault();
    dragging = true;
    state.click = true;
    previousMousePosition = { x: e.pageX, y: e.pageY };
  };

  window.onmouseup = function () {
    dragging = false;
  };

  zoomFunctions.ondragstart = function (e) {
    e.preventDefault();
  };

  zoomFunctions.onmousemove = function (e) {
    if (state.click) {
      state.pan = true;
    }
    if (dragging) {
      canvas.style.transitionDuration = "0s";
      canvas.x += e.pageX - previousMousePosition.x;
      canvas.y += e.pageY - previousMousePosition.y;
      canvas.updateContainerPosition();
      previousMousePosition = { x: e.pageX, y: e.pageY };
    }
  };

  window.onkeypress = function (e) {
    if (e.key == '-') {
      onZoom(current.zoom * 1.2);
    }
    else if (e.key == '=') {
      onZoom(current.zoom / 1.2);
    }
  }

  zoomOut.onclick = function () {
    onZoom(current.zoom * 1.2);
  };

  zoomIn.onclick = function () {
    onZoom(current.zoom / 1.2);
  };

  state.onLoaded = function () {
    let minX = Number.MAX_SAFE_INTEGER,
      minY = Number.MAX_SAFE_INTEGER,
      maxX = Number.MIN_SAFE_INTEGER,
      maxY = Number.MIN_SAFE_INTEGER;

    for (let i = 0; i < canvas.childNodes.length; ++i) {
      const node = canvas.childNodes[i];
      const x = parseInt(node.style.left);
      const y = parseInt(node.style.top);
      if (minX > x) minX = x;
      if (minY > y) minY = y;
      if (maxX < x + node.offsetWidth) maxX = x + node.offsetWidth;
      if (maxY < y + node.offsetHeight) maxY = y + node.offsetHeight;
    }

    const scaleX = zoomFunctions.offsetWidth / (maxX - minX + 25);
    const scaleY = zoomFunctions.offsetHeight / (maxY - minY + 25);
    const scale = Math.min(scaleX, scaleY);
    canvas.x = 0 - minX;
    canvas.y = 0 - minY;
    onZoom(1 / scale);
  }

  function onZoom(zoom) {
    canvas.scale = 1 / zoom;
    canvas.x = canvas.x * current.zoom * canvas.scale;
    canvas.y = canvas.y * current.zoom * canvas.scale;
    canvas.style.transitionDuration = "0.1s";
    canvas.updateContainerPosition();
    canvas.updateContainerScale();
    current.zoom = zoom;
    instance.setZoom(canvas.scale);
  }

  function getQueryVariable(id) {
    let params = window.location.search.substring(1).split("&");
    for (let i = 0; i < params.length; i++) {
      let p = params[i].split("=");
      if (p[0] == id) {
        return p[1];
      }
    }
    return (false);
  }

  return state;
}
