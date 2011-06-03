var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(function() {
  var DAMPEN, SURFACE_HEIGHT, SURFACE_WIDTH, X_RESOLUTION, Y_RESOLUTION, defer;
  X_RESOLUTION = 20;
  Y_RESOLUTION = 20;
  SURFACE_WIDTH = 400;
  SURFACE_HEIGHT = 400;
  DAMPEN = .9;
  defer = function(t, f) {
    return setTimeout(f, t);
  };
  return {
    init: function() {
      return document.onselectstart = function() {
        return false;
      };
    },
    render: function() {
      return "<div class='container'></div>";
    },
    bind: {
      afterRender: function() {
        return defer(50, __bind(function() {
          var camLight, camera, container, height, planeMaterial, planeMaterialWire, pointLight, render, renderer, sCount, scene, surface, surfaceVerts, update, vertex, width;
          container = this.$('.container');
          width = container.width() - 15;
          height = container.height() - 15;
          renderer = new THREE.WebGLRenderer();
          camera = new THREE.TrackballCamera({
            fov: 25,
            aspect: width / height,
            near: 50,
            far: 1e300,
            rotateSpeed: .1,
            noZoom: false,
            noPan: false,
            staticMoving: false,
            dynamicDampingFactor: 0.3,
            minDistance: 500 * 1.1,
            maxDistance: 1000 * 10,
            domElement: renderer.domElement
          });
          camera.rotateCamera = function() {};
          /*
                oldRotate = camera.rotateCamera
                camera.rotateCamera = ->
                  {x,y,z} = @target.position
                  {cx,cy,cz} = @position
                  console.log "x:#{x} y:#{y} z:#{z} -- cx:#{cx} cy:#{cy} cz:#{cz} "
                  oldRotate.apply this
                */
          scene = new THREE.Scene();
          $(window).resize(function() {
            if (camera) {
              width = container.width() - 15;
              height = container.height() - 15;
              renderer.setSize(width, height);
              camera.aspect = width / height;
              camera.updateProjectionMatrix();
              camera.screen.width = width;
              camera.screen.height = height;
              camera.radius = (width + height) / 4;
              return camera.updateProjectionMatrix();
            }
          });
          camera.position.x = -441.873;
          camera.position.y = 480.997;
          camera.position.z = 508.444;
          camera.target.position.x = 5.5;
          camera.target.position.y = -60;
          camera.target.position.z = 4.78;
          renderer.setSize(width, height);
          container.append(renderer.domElement);
          planeMaterial = new THREE.MeshLambertMaterial({
            color: 0x486F93,
            shading: THREE.SmoothShading
          });
          planeMaterialWire = new THREE.MeshLambertMaterial({
            color: 0xFFFFFF,
            wireframe: true,
            opacity: .2,
            shading: THREE.SmoothShading
          });
          surface = new THREE.Mesh(new THREE.Plane(SURFACE_WIDTH, SURFACE_HEIGHT, X_RESOLUTION, Y_RESOLUTION), [planeMaterial]);
          surface.rotation.x = -Math.PI * .5;
          surface.overdraw = true;
          surfaceVerts = surface.geometry.vertices;
          sCount = surfaceVerts.length;
          while (sCount--) {
            vertex = surfaceVerts[sCount];
            vertex.springs = [];
            vertex.velocity = new THREE.Vector3();
            if (vertex.position.x > (-SURFACE_WIDTH * .5)) {
              vertex.springs.push({
                start: sCount,
                end: sCount - 1
              });
            }
            if (vertex.position.x < (SURFACE_WIDTH * .5)) {
              vertex.springs.push({
                start: sCount,
                end: sCount + 1
              });
            }
            if (vertex.position.y < (SURFACE_HEIGHT * .5)) {
              vertex.springs.push({
                start: sCount,
                end: sCount - (X_RESOLUTION + 1)
              });
            }
            if (vertex.position.y > (-SURFACE_HEIGHT * .5)) {
              vertex.springs.push({
                start: sCount,
                end: sCount + (X_RESOLUTION + 1)
              });
            }
          }
          scene.addChild(surface);
          surface = new THREE.Mesh(new THREE.Plane(SURFACE_WIDTH, SURFACE_HEIGHT, X_RESOLUTION, Y_RESOLUTION), [planeMaterialWire]);
          surface.rotation.x = -Math.PI * .5;
          surface.overdraw = true;
          surface.position.y += .5;
          scene.addChild(surface);
          pointLight = new THREE.PointLight(0xFFFFFF, .6);
          pointLight.position.x = 50;
          pointLight.position.y = 100;
          pointLight.position.z = -50;
          scene.addLight(pointLight);
          camLight = new THREE.PointLight(0xFFFFFF, 1, 1200);
          camLight.position.x = camera.position.x;
          camLight.position.y = camera.position.y;
          camLight.position.z = camera.position.z;
          scene.addLight(camLight);
          render = function() {
            camLight.position.x = camera.position.x;
            camLight.position.y = camera.position.y;
            camLight.position.z = camera.position.z;
            if (renderer) {
              renderer.render(scene, camera);
            }
            return update();
          };
          update = function() {
            var acceleration, extension, orbitValue, s, spring, springs, v;
            orbitValue = 0;
            camera.update();
            v = surfaceVerts.length;
            while (v--) {
              vertex = surfaceVerts[v];
              acceleration = new THREE.Vector3(0, 0, -vertex.position.z * 1);
              springs = vertex.springs;
              s = springs.length;
              vertex.velocity.addSelf(acceleration);
              while (s--) {
                spring = springs[s];
                extension = surfaceVerts[spring.start].position.z - surfaceVerts[spring.end].position.z;
                acceleration = new THREE.Vector3(0, 0, extension * 1 * 50);
                surfaceVerts[spring.end].velocity.addSelf(acceleration);
                surfaceVerts[spring.start].velocity.subSelf(acceleration);
              }
              vertex.position.addSelf(vertex.velocity);
              vertex.velocity.multiplyScalar(DAMPEN);
            }
            surface.geometry.computeFaceNormals(true);
            surface.geometry.__dirtyVertices = true;
            surface.geometry.__dirtyNormals = true;
            return requestAnimationFrame(render);
          };
          return update();
        }, this));
      }
    }
  };
});