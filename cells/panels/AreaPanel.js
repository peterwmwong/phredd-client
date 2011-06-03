var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(function() {
  var DAMPEN, SURFACE_HEIGHT, SURFACE_WIDTH, XRES, XRES2, YRES, YRES2, defer, getGridXY, projector;
  XRES = 20;
  YRES = 20;
  XRES2 = XRES / 2;
  YRES2 = XRES / 2;
  SURFACE_WIDTH = 400;
  SURFACE_HEIGHT = 400;
  DAMPEN = .9;
  projector = new THREE.Projector();
  defer = function(t, f) {
    return setTimeout(f, t);
  };
  getGridXY = function(surfaceName) {
    return function(ev) {
      var container, h, intersects, p, ray, surf, sx, sy, vector, w, _ref;
      surf = this[surfaceName];
      container = this.$('.container');
      w = container.width();
      h = container.height();
      sx = ev.offsetX || (ev.clientX - 220);
      sy = ev.offsetY || ev.clientY;
      vector = new THREE.Vector3((sx / w) * 2 - 1, -(sy / h) * 2 + 1, 0.5);
      projector.unprojectVector(vector, this.camera);
      ray = new THREE.Ray(this.camera.position, vector.subSelf(this.camera.position).normalize());
      intersects = ray.intersectObject(this.surface);
      if (p = (_ref = intersects[0]) != null ? _ref.point : void 0) {
        if (surf != null) {
          surf.position.x = Math.floor((p.x / SURFACE_WIDTH) * XRES) * XRES + XRES2;
        }
        return surf != null ? surf.position.z = Math.floor((p.z / SURFACE_HEIGHT) * YRES) * YRES + XRES2 : void 0;
      } else {
        return surf != null ? surf.position.x = -5000 : void 0;
      }
    };
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
      mousemove: getGridXY('hoverSurface'),
      click: getGridXY('selSurface'),
      afterRender: function() {
        return defer(1000, __bind(function() {
          var c, camLight, camera, container, height, hoverSurface, pointLight, render, renderer, sCount, scene, selSurface, surface, surfaceVerts, update, vertex, width;
          container = this.$('.container');
          width = container.width();
          height = container.height();
          renderer = new THREE.WebGLRenderer();
          THREE.TrackballCamera.prototype.STATE = {
            NONE: -1,
            ROTATE: 1,
            ZOOM: 2,
            PAN: 0
          };
          camera = this.camera = new THREE.TrackballCamera({
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
              width = container.width();
              height = container.height();
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
          surface = this.surface = new THREE.Mesh(new THREE.Plane(SURFACE_WIDTH, SURFACE_HEIGHT, XRES, YRES), [
            new THREE.MeshLambertMaterial({
              color: 0x486F93,
              shading: THREE.SmoothShading
            })
          ]);
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
                end: sCount - (XRES + 1)
              });
            }
            if (vertex.position.y > (-SURFACE_HEIGHT * .5)) {
              vertex.springs.push({
                start: sCount,
                end: sCount + (XRES + 1)
              });
            }
          }
          scene.addChild(surface);
          surface = new THREE.Mesh(new THREE.Plane(SURFACE_WIDTH, SURFACE_HEIGHT, XRES, YRES), [
            new THREE.MeshLambertMaterial({
              color: 0xFFFFFF,
              wireframe: true,
              opacity: .2,
              shading: THREE.SmoothShading
            })
          ]);
          surface.rotation.x = -Math.PI * .5;
          surface.overdraw = true;
          surface.position.y += .5;
          scene.addChild(surface);
          hoverSurface = this.hoverSurface = new THREE.Mesh(new THREE.Plane(XRES, YRES, XRES, YRES), [
            new THREE.MeshPhongMaterial({
              color: c = 0x555555,
              specular: c,
              ambient: c,
              opacity: 0.5,
              shading: THREE.SmoothShading
            })
          ]);
          this.hoverSurface.rotation.x = -Math.PI * .5;
          this.hoverSurface.overdraw = true;
          this.hoverSurface.position.x = -5000;
          this.hoverSurface.position.y = 1;
          scene.addChild(this.hoverSurface);
          selSurface = this.selSurface = new THREE.Mesh(new THREE.Plane(XRES, YRES, XRES, YRES), [
            new THREE.MeshPhongMaterial({
              color: 0xFF0000,
              specular: 0xFF0000,
              ambient: 0xFF0000,
              opacity: 0.0,
              shading: THREE.SmoothShading
            })
          ]);
          this.selSurface.rotation.x = -Math.PI * .5;
          this.selSurface.overdraw = true;
          this.selSurface.position.x = -5000;
          this.selSurface.position.y = 1;
          scene.addChild(this.selSurface);
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
          render = (function() {
            var isSelUp;
            isSelUp = true;
            return function() {
              var opacity;
              camLight.position.x = camera.position.x;
              camLight.position.y = camera.position.y;
              camLight.position.z = camera.position.z;
              opacity = selSurface.materials[0].opacity;
              if (0 > opacity || .3 < opacity) {
                isSelUp = !isSelUp;
              }
              if (isSelUp) {
                opacity += .01;
              } else {
                opacity -= .01;
              }
              selSurface.materials[0].opacity = opacity;
              if (renderer) {
                renderer.render(scene, camera);
              }
              return update();
            };
          })();
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