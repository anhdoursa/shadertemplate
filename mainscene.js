(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  {
    877: function (t, e, i) {
      "use strict";
      i.r(e);
      i(96);
      var s = i(636),
        o = i(647),
        a = i(648),
        n = (i(69), i(649));
      class r {
        constructor(t, e, i, s, o) {
          let a =
            !(arguments.length > 5 && void 0 !== arguments[5]) || arguments[5];
          (this.enabled = !1),
            (this._godRaysEnabled = !0),
            (this.clock = o),
            (this.scene = t),
            (this.camera = e),
            (this.renderer = i),
            (this.menu = s),
            (this.enabled = a),
            (this.composer = new n.b(this.renderer));
          var r = new n.g(this.scene, this.camera);
          (r.renderToScreen = !1),
            this.composer.addPass(r),
            (this.noiseEffect = new n.f({ blendFunction: n.a.MULTIPLY }));
          const h = this.noiseEffect.blendMode,
            l = {
              enabled: this.enabled,
              abberationEnabled: !1,
              noiseEnabled: !0,
              noiseOpacity: 0.1,
              abberationOffsetX: 0.001,
              abberationOffsetY: 5e-4,
              "noise blend mode": h.blendFunction,
            };
          s &&
            (s.add(l, "enabled").onChange((t) => {
              (l.enabled = t), (this.enabled = t);
            }),
            s.add(l, "noise blend mode", n.a).onChange((t) => {
              this.noiseEffect.blendMode.setBlendFunction(Number(t));
            })),
            (this.noiseEffect.blendMode.opacity.value = l.noiseOpacity),
            s &&
              s
                .add(l, "noiseOpacity")
                .min(0)
                .max(1)
                .step(1e-4)
                .onChange((t) => {
                  this.noiseEffect.blendMode.opacity.value = t;
                });
        }
        get godRaysEnabled() {
          return this._godRaysEnabled;
        }
        set godRaysEnabled(t) {
          (this._godRaysEnabled = t),
            this._godRaysEnabled
              ? (this.composer.removePass(this.standardPass),
                this.composer.addPass(this.godrayPass),
                (this.standardPass.enabled = !1),
                (this.godrayPass.enabled = !0))
              : ((this.godrayPass.enabled = !1),
                (this.standardPass.enabled = !0),
                this.composer.removePass(this.godrayPass),
                this.composer.addPass(this.standardPass));
        }
        setupGodRaysAndSmaa(t, e) {
          const i = new n.d(this.camera, t, {
            height: 480,
            kernelSize: n.e.SMALL,
            density: 0.8,
            decay: 0.9,
            weight: 0.7,
            exposure: 0.9,
            samples: 35,
            clampMax: 1,
          });
          (this.godRaysEffect = i),
            (this.godrayPass = new n.c(this.camera, i, this.noiseEffect)),
            (this.standardPass = new n.c(this.camera, this.noiseEffect)),
            this.composer.addPass(this.godrayPass);
          const o = i.godRaysMaterial.uniforms,
            a = i.blendMode,
            r = new s.Color(),
            h = {
              resolution: i.height,
              blurriness: i.blurPass.kernelSize + 0,
              density: o.density.value,
              decay: o.decay.value,
              weight: o.weight.value,
              exposure: o.exposure.value,
              clampMax: o.clampMax.value,
              samples: i.samples,
              color: r.copyLinearToSRGB(t.material.color).getHex(),
              opacity: a.opacity.value,
              "blend mode": a.blendFunction,
            };
          if (this.menu) {
            let s = this.menu.addFolder("Eye Godrays");
            s.add(h, "resolution", [240, 360, 480, 720, 1080]).onChange((t) => {
              i.resolution.height = Number(t);
            }),
              s.add(this.godrayPass, "dithering"),
              s
                .add(h, "blurriness")
                .min(n.e.VERY_SMALL)
                .max(n.e.HUGE + 1)
                .step(1)
                .onChange((t) => {
                  (i.blur = t > 0), (i.blurPass.kernelSize = t - 1);
                }),
              s
                .add(h, "density")
                .min(0)
                .max(1)
                .step(0.01)
                .onChange((t) => {
                  o.density.value = t;
                }),
              s
                .add(h, "decay")
                .min(0)
                .max(1)
                .step(0.01)
                .onChange((t) => {
                  o.decay.value = t;
                }),
              s
                .add(h, "weight")
                .min(0)
                .max(1)
                .step(0.01)
                .onChange((t) => {
                  o.weight.value = t;
                }),
              s
                .add(h, "exposure")
                .min(0)
                .max(1)
                .step(0.01)
                .onChange((t) => {
                  o.exposure.value = t;
                }),
              s
                .add(h, "clampMax")
                .min(0)
                .max(1)
                .step(0.01)
                .onChange((t) => {
                  o.clampMax.value = t;
                }),
              s.add(i, "samples").min(15).max(200).step(1),
              s.addColor(h, "color").onChange((i) => {
                t.material.color.setHex(i).convertSRGBToLinear(),
                  e.color.setHex(i).convertSRGBToLinear();
              }),
              s
                .add(h, "opacity")
                .min(0)
                .max(1)
                .step(0.01)
                .onChange((t) => {
                  a.opacity.value = t;
                }),
              s.add(h, "blend mode", n.a).onChange((t) => {
                a.setBlendFunction(Number(t));
              }),
              s
                .add(t.position, "x")
                .min(-10)
                .max(10)
                .step(0.001)
                .onChange((e) => {
                  (t.position.x = e), t.updateMatrix();
                }),
              s
                .add(t.position, "y")
                .min(-10)
                .max(10)
                .step(0.001)
                .onChange((e) => {
                  (t.position.y = e), t.updateMatrix();
                }),
              s
                .add(t.position, "z")
                .min(-10)
                .max(10)
                .step(0.001)
                .onChange((e) => {
                  (t.position.z = e), t.updateMatrix();
                });
          }
          return i;
        }
        render() {
          this.composer.render(this.clock.getDelta());
        }
      }
      class h {
        constructor(t, e) {
          (this.totalProgress = 0),
            (this.initialized = !1),
            (this.progress = {
              startFOV: 15,
              endFOV: 110,
              focusZ: -200,
              endZ: -110,
            }),
            (this.currentFOV = -1),
            (this.initDepth = 0),
            (this._cameraLookAtPoint = new s.Vector3()),
            (this.camera = t),
            (this._cameraLookAtObject = e);
        }
        init() {
          (this.camera.position.z = this.progress.focusZ),
            (this.initDepth =
              2 * Math.tan(((this.progress.startFOV / 2) * Math.PI) / 180));
        }
        update(t, e, i, s) {
          this.initialized ||
            ((this.initialized = !0),
            (this.progress = {
              startFOV: i || this.camera.fov,
              endFOV: t,
              focusZ: this.camera.position.z,
              endZ: this.camera.position.z + e,
            }),
            this.init()),
            (this.currentFOV =
              this.progress.startFOV +
              (this.progress.endFOV - this.progress.startFOV) *
                (s || this.totalProgress));
          let o = 2 * Math.tan(((this.currentFOV / 2) * Math.PI) / 180);
          (this.camera.position.z =
            this.progress.endZ +
            ((this.progress.focusZ - this.progress.endZ) * this.initDepth) / o),
            (this.camera.fov = this.currentFOV);
        }
        getValues(t) {
          this.currentFOV =
            this.progress.startFOV +
            (this.progress.endFOV - this.progress.startFOV) * t;
          let e = 2 * Math.tan(((this.currentFOV / 2) * Math.PI) / 180);
          return {
            fov: this.currentFOV,
            z:
              this.progress.endZ +
              ((this.progress.focusZ - this.progress.endZ) * this.initDepth) /
                e,
          };
        }
        convertFovToZ(t) {
          return (
            1 / (2 * this.camera.aspect * Math.tan((t / 2) * (Math.PI / 180)))
          );
        }
        convertZToFov(t) {
          return (
            2 * Math.atan2(1, 2 * this.camera.aspect * t) * (180 / Math.PI)
          );
        }
      }
      var l = i(4),
        u = i(174),
        c = i(292),
        d = i(291),
        p = i(650),
        m = (i(651), i(285));
      function g(t, e) {
        var i = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var s = Object.getOwnPropertySymbols(t);
          e &&
            (s = s.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            })),
            i.push.apply(i, s);
        }
        return i;
      }
      function y(t, e, i) {
        return (
          e in t
            ? Object.defineProperty(t, e, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = i),
          t
        );
      }
      var f = 0;
      const v = !1;
      class x extends s.ShaderMaterial {
        constructor(t) {
          let e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null,
            i =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : "";
          var o = {
            focusNear: 9.14,
            focusFar: 11.34,
            focusFadeOutLength: 1,
            maxBlur: 0.34,
            minBlur: 0.14,
            minOpacity: 0.02,
            maxOpacity: 0.8,
            useFocusCenter: !1,
            focusCenter: 8,
            focusLength: 4,
            radiusScaleFactor: 1,
          };
          t &&
            (o = (function (t) {
              for (var e = 1; e < arguments.length; e++) {
                var i = null != arguments[e] ? arguments[e] : {};
                e % 2
                  ? g(i, !0).forEach(function (e) {
                      y(t, e, i[e]);
                    })
                  : Object.getOwnPropertyDescriptors
                  ? Object.defineProperties(
                      t,
                      Object.getOwnPropertyDescriptors(i)
                    )
                  : g(i).forEach(function (e) {
                      Object.defineProperty(
                        t,
                        e,
                        Object.getOwnPropertyDescriptor(i, e)
                      );
                    });
              }
              return t;
            })({}, o, {}, t));
          let a = {
            viewport: { value: m.a.RENDERER_HEIGHT / 1e3 },
            PIXEL_RATIO: { value: m.a.RENDERER_PIXEL_RATIO },
            focusNear: { value: o.focusNear },
            focusFar: { value: o.focusFar },
            focusFadeOutLength: { value: o.focusFadeOutLength },
            maxBlur: { value: o.maxBlur },
            minBlur: { value: o.minBlur },
            radiusScaleFactor: { value: o.radiusScaleFactor },
            minOpacity: { value: o.minOpacity },
            maxOpacity: { value: o.maxOpacity },
            color: { value: new s.Color(16777215) },
            pointTexture: { value: x.texCircleSolid },
            pointTextureAlpha: { value: x.texCircleAlpha },
          };
          if (
            (window.addEventListener("resize", () => {
              a.viewport.value = m.a.RENDERER_HEIGHT / 1e3;
            }),
            super({
              uniforms: a,
              depthWrite: !1,
              vertexShader:
                "attribute float size;\n            attribute vec3 customColor;\n\n            varying vec3 vColor;\n            varying float vAlpha;\n//            varying float vBlur;\n            uniform float focusNear;\n            uniform float PIXEL_RATIO;\n            uniform float focusFar;\n            uniform float maxBlur;\n            uniform float minBlur;\n            uniform float minOpacity;\n            uniform float maxOpacity;\n            uniform float focusFadeOutLength;\n            uniform float viewport;\n            uniform float radiusScaleFactor;\n\n            void main() {\n\n                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);\n\n                //float sizeCalc = smoothstep(focusNear, focusFar, -mvPosition.z);\n                float sizeCalc = 1.0;\n\n                if (-mvPosition.z < focusNear) {\n                    sizeCalc = smoothstep(focusNear - focusFadeOutLength, focusNear, -mvPosition.z);\n                    //                    sizeCalc = 0.0;\n                }\n                if (-mvPosition.z > focusFar) {\n                    sizeCalc = smoothstep(focusFar + focusFadeOutLength, focusFar, -mvPosition.z);\n                }\n                //\t\t\t\tgl_PointSize = size * ( focusNear / -mvPosition.z );\n                //                gl_PointSize = size;\n                sizeCalc = 1.0 - sizeCalc;\n                //gl_PointSize = size;\n\n                //                gl_PointSize *= ( scale / - mvPosition.z );\n                //                gl_PointSize = (size * minBlur + (size * maxBlur * sizeCalc));\n                //                vAlpha = clamp(sin(1.0 - ( focusNear / -mvPosition.z )), 0.05, 1.0);\n                vAlpha = min(max((1.0 - sizeCalc) * maxOpacity, minOpacity), maxOpacity);\n//                vAlpha = clamp(minOpacity, maxOpacity, (1.0 - sizeCalc) * maxOpacity); //Clamp has a bug in safari and iOS\n//                vBlur = 1.0 - sizeCalc;\n//                vBlur = 1.0;\n                if (vAlpha < 0.0001) {\n                    //This makes the GPU cull the vertex, increasing performance for non-visibe points:\n                    gl_PointSize = 0.0;\n                    gl_Position.z = 0.0;\n                } else {\n                    gl_PointSize = (viewport * (size * PIXEL_RATIO * minBlur + (size * PIXEL_RATIO * maxBlur * sizeCalc))) * radiusScaleFactor;\n                    gl_Position = projectionMatrix * mvPosition;\n                    vColor = customColor;\n                }\n                ".concat(
                  v
                    ? "\n                gl_PointSize = 3.0;\n                gl_Position = projectionMatrix * mvPosition;\n                vAlpha = 1.0;"
                    : "",
                  ";\n\n            }"
                ),
              fragmentShader:
                "\n                uniform vec3 color;\n                uniform sampler2D pointTexture;\n                uniform sampler2D pointTextureAlpha;\n\n                varying vec3 vColor;\n                varying float vAlpha;\n//                varying float vBlur;\n\n                //            vec4 mapTexelToLinear( vec4 value ) { return LinearToLinear( value) ; }\n                void main() {\n                    /*\n                                    if(vAlpha == 0.0) {\n                                        discard;\n                                    }*/\n\n                    vec4 tColor = texture2D(pointTexture, gl_PointCoord);\n                    vec4 tColorAlpha = texture2D(pointTextureAlpha, gl_PointCoord);\n\n                    //gl_FragColor = vec4(color * vColor / tColor.a, mix(tColorAlpha.a, tColor.a, vAlpha) * vAlpha) * tColor;\n\n                    //Equation from: http://eelpi.gotdns.org/blog.wiki.html [Premultiplied alpha]\n                    tColor.rgb = tColor.rgb + tColor.rgb * (1.0 - tColor.a);\n                    tColorAlpha.rgb = tColorAlpha.rgb + tColorAlpha.rgb * (1.0 - tColorAlpha.a);\n//                    gl_FragColor = vec4(vColor, mix(tColorAlpha.a, tColor.a, vBlur) * vAlpha);\n                    gl_FragColor = vec4(vColor, mix(tColorAlpha.a, tColor.a, vAlpha) * vAlpha);\n\n                }",
              transparent: !0,
            }),
            (this.dofParams = o),
            e)
          ) {
            f++;
            let t = e.addFolder("DOFPointsMaterial " + i + f);
            t
              .add(this.dofParams, "focusNear")
              .min(0.01)
              .max(200)
              .step(0.001)
              .onChange((t) => {
                this.uniforms.focusNear.value = t;
              }),
              t
                .add(this.dofParams, "focusFar")
                .min(0.01)
                .max(200)
                .step(0.001)
                .onChange((t) => {
                  this.uniforms.focusFar.value = t;
                }),
              t
                .add(this.dofParams, "focusFadeOutLength")
                .min(0.01)
                .max(100)
                .step(0.001)
                .onChange((t) => {
                  this.uniforms.focusFadeOutLength.value = t;
                }),
              t
                .add(this.dofParams, "minBlur")
                .min(0.001)
                .max(2)
                .step(0.01)
                .onChange((t) => {
                  this.uniforms.minBlur.value = t;
                }),
              t
                .add(this.dofParams, "maxBlur")
                .min(0.1)
                .max(2)
                .step(0.01)
                .onChange((t) => {
                  this.uniforms.maxBlur.value = t;
                }),
              t
                .add(this.dofParams, "minOpacity")
                .min(0)
                .max(1)
                .step(0.001)
                .onChange((t) => {
                  this.uniforms.minOpacity.value = t;
                }),
              t
                .add(this.dofParams, "radiusScaleFactor")
                .min(0)
                .max(1e3)
                .step(0.001)
                .onChange((t) => {
                  this.uniforms.radiusScaleFactor.value = t;
                }),
              t
                .add(this.dofParams, "maxOpacity")
                .min(0)
                .max(1)
                .step(0.001)
                .onChange((t) => {
                  this.uniforms.maxOpacity.value = t;
                }),
              t.add(this.dofParams, "useFocusCenter").onChange((t) => {
                (this.dofParams.useFocusCenter = t), this.updateFocusCenter();
              }),
              t
                .add(this.dofParams, "focusCenter")
                .min(0)
                .max(30)
                .step(0.001)
                .onChange((t) => {
                  this.focusCenter = t;
                }),
              t
                .add(this.dofParams, "focusLength")
                .min(0)
                .max(100)
                .step(0.001)
                .onChange((t) => {
                  this.focusLength = t;
                });
          }
          this.updateFocusCenter();
        }
        updateFocusCenter() {
          this.dofParams.useFocusCenter
            ? ((this.uniforms.focusNear.value =
                this.dofParams.focusCenter - 0.5 * this.dofParams.focusLength),
              (this.uniforms.focusFar.value =
                this.dofParams.focusCenter + 0.5 * this.dofParams.focusLength))
            : ((this.uniforms.focusNear.value = this.dofParams.focusNear),
              (this.uniforms.focusFar.value = this.dofParams.focusFar));
        }
        get focusCenter() {
          return this.dofParams.focusCenter;
        }
        set focusCenter(t) {
          (this.dofParams.focusCenter = t), this.updateFocusCenter();
        }
        get focusLength() {
          return this.dofParams.focusLength;
        }
        set focusLength(t) {
          (this.dofParams.focusLength = t), this.updateFocusCenter();
        }
      }
      class w {
        constructor(t) {
          let e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 0.01,
            i =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : 8,
            o =
              arguments.length > 3 && void 0 !== arguments[3]
                ? arguments[3]
                : 0,
            a =
              arguments.length > 4 && void 0 !== arguments[4]
                ? arguments[4]
                : 2 * Math.PI,
            n = arguments.length > 5 ? arguments[5] : void 0,
            r =
              arguments.length > 6 && void 0 !== arguments[6]
                ? arguments[6]
                : "ring",
            h =
              arguments.length > 7 && void 0 !== arguments[7]
                ? arguments[7]
                : new s.Color(524802),
            l =
              arguments.length > 8 && void 0 !== arguments[8]
                ? arguments[8]
                : null,
            u =
              arguments.length > 9 && void 0 !== arguments[9]
                ? arguments[9]
                : null;
          (this.geometry = new s.BufferGeometry()),
            this.buildGeometry(e, i, o, a, h),
            (this.material =
              u ||
              new x(
                "poi ring" === r
                  ? {
                      focusNear: 10,
                      focusFar: 40,
                      focusFadeOutLength: 50,
                      minBlur: 0.07,
                      minOpacity: 0,
                      maxOpacity: 0.8,
                      maxBlur: 0.2,
                    }
                  : l || {
                      focusNear: 30,
                      focusFar: 60,
                      focusFadeOutLength: 50,
                      minBlur: 0.1,
                      minOpacity: 0,
                      maxOpacity: 0.55,
                      maxBlur: 0.11,
                    },
                n,
                r
              )),
            (this.points = new s.Points(this.geometry, this.material)),
            t.add(this.points);
        }
        buildGeometry(t, e, i, o, a) {
          e = Math.max(3, e);
          const n = new s.Vector3(),
            r = [],
            h = new Float32Array(e),
            l = [];
          for (let s = 0; s < e; s++) {
            const u = i + (s / e) * o;
            (n.x = t * Math.cos(u)),
              (n.y = t * Math.sin(u)),
              r.push(n.x, n.y, n.z),
              l.push(a.r, a.g, a.b),
              (h[s] = 50);
          }
          this.geometry.setAttribute(
            "customColor",
            new s.Float32BufferAttribute(l, 3)
          ),
            this.geometry.setAttribute(
              "position",
              new s.Float32BufferAttribute(r, 3)
            ),
            this.geometry.setAttribute("size", new s.BufferAttribute(h, 1)),
            this.geometry.computeBoundingSphere();
        }
      }
      class C {
        constructor(t, e, i, o) {
          (this.group = new s.Object3D()),
            (this.pointCloudContainer = new s.Object3D()),
            (this.ringsGroup = new s.Group()),
            (this.rings = []),
            (this.eyeGeometryLoaded = (t) => {
              this.createRings(),
                (this.eye = t.scene.children[0]),
                (this.eye.name = "eye"),
                this.group.add(this.eye),
                (this.group.rotation.x = -0.961),
                (this.group.rotation.y = -0.08),
                (this.group.rotation.z = 0.2),
                (this.group.position.x = -0.11),
                (this.group.position.y = 0.83),
                (this.group.position.z = -298),
                (this.eye.material = new s.MeshStandardMaterial({
                  metalness: 0.12,
                  roughness: 0.55,
                  color: 7899597,
                  transparent: !0,
                  opacity: 0.97,
                  map: this.texture,
                  flatShading: !1,
                })),
                (this.texture.center.x = 0.5),
                (this.texture.center.y = 0.5),
                this.texture.repeat.set(4, 4),
                this.menu &&
                  this.menu
                    .add(this.texture.repeat, "x")
                    .min(1)
                    .max(10)
                    .step(0.01)
                    .onChange((t) => {
                      (this.texture.repeat.x = t), (this.texture.repeat.y = t);
                    }),
                l.b.to(this.texture, {
                  rotation: 2 * -Math.PI,
                  ease: "none",
                  repeat: -1,
                  duration: 200,
                });
              this.eye.material;
            }),
            (this.setupGeometry = (t, e, i) => {
              var o = new x(
                {
                  useFocusCenter: !0,
                  focusLength: 12.58,
                  focusCenter: 15.023,
                  focusFadeOutLength: 6,
                  minOpacity: 0,
                  maxOpacity: 0.534,
                  maxBlur: 0.15,
                  minBlur: 0.05,
                  radiusScaleFactor: 0.006,
                },
                this.menu,
                i
              );
              (this.pointCloudBelt = new s.Points(t, o)),
                (this.pointCloudBelt.renderOrder = 1),
                this.pointCloudBelt.scale.set(0.001, 0.001, 0.001),
                this.group.add(this.pointCloudBelt),
                l.b.to(this.pointCloudBelt.rotation, {
                  y: 2 * Math.PI,
                  repeat: -1,
                  yoyo: !1,
                  ease: "none",
                  duration: 200,
                }),
                (this.pointCloudBelt.name = i);
            }),
            (this.postEffects = e),
            (this.menu = i);
          var a = new s.Color(15384750).convertSRGBToLinear();
          const n = new s.PointLight(a);
          n.position.set(0.36, -2.454, 0);
          const r = new s.MeshBasicMaterial({
              color: a,
              transparent: !0,
              fog: !1,
            }),
            h = new s.SphereBufferGeometry(1.5, 32, 32);
          (this.sun = new s.Mesh(h, r)),
            this.sun.position.copy(n.position),
            this.sun.updateMatrix(),
            (this.sun.frustumCulled = !1),
            (this.sun.matrixAutoUpdate = !1),
            (this.sun.name = "sun"),
            this.group.add(this.pointCloudContainer),
            this.group.add(this.ringsGroup),
            this.group.add(this.sun),
            (this.godraysEffect = e.setupGodRaysAndSmaa(this.sun, n)),
            t.add(this.group),
            (this.texture = o.loadTexture("eye_texture.jpg")),
            o.loadGLTF("eye_singular.glb", this.eyeGeometryLoaded),
            o.addLoadItem({
              path: "particles/eye.drc",
              name: "eye_particles",
              doneCallback: this.setupGeometry,
            });
        }
        getIntroAnimation() {
          let t =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 6;
          const e = l.b.timeline();
          return (
            e.fromTo(
              this.sun.position,
              { x: -0.5, y: -0.72 },
              {
                x: this.sun.position.x,
                y: this.sun.position.y,
                duration: t,
                onUpdate: () => this.sun.updateMatrix(),
              },
              0
            ),
            e.from(
              this.godraysEffect.godRaysMaterial.uniforms.weight,
              { value: 1, duration: 1, ease: "power3.inOut" },
              0
            ),
            e.from(
              this.godraysEffect.godRaysMaterial.uniforms.exposure,
              { value: 1, duration: 1, ease: "power3.inOut" },
              0
            ),
            e.from(
              this.godraysEffect.godRaysMaterial.uniforms.decay,
              { value: 1, duration: 1, ease: "power3.inOut" },
              0
            ),
            e
          );
        }
        getScrollInAnimation() {
          let t =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 4;
          const e = l.b.timeline({ paused: !1 });
          e.to(
            this.group.position,
            { y: 0, x: 0, duration: t, ease: "sine.inOut" },
            0
          ),
            e.to(
              this.group.position,
              { z: "-=5.5", duration: 1.2 * t, ease: "power4.inOut" },
              0
            ),
            e.to(
              this.group.rotation,
              { x: 0.5 * -Math.PI, duration: t, ease: "sine.inOut" },
              0
            ),
            e.to(
              this.group.rotation,
              { y: 1, duration: 1.2 * t, ease: "sine.inOut" },
              0
            ),
            e.to(
              this.group.rotation,
              { z: -0.18, duration: t, ease: "sine.inOut" },
              0
            ),
            e.to(
              this.texture.repeat,
              { x: 7.5, y: 7.5, duration: 1.2 * t, ease: "power4.inOut" },
              0
            ),
            e.to(
              this.pointCloudContainer.rotation,
              { x: -0.5, duration: t, ease: "sine.inOut" },
              0
            );
          var i = 0.2 * t,
            s = l.b.timeline({ delay: 1.5 });
          return (
            s.to(
              this.pointCloudBelt.material.uniforms.maxOpacity,
              { value: 0, duration: 0.05 * t, ease: "sine.out" },
              0.2 * t
            ),
            s.to(
              this.godraysEffect.godRaysMaterial.uniforms.weight,
              { value: 1, duration: i, ease: "sine.out" },
              0.2 * t
            ),
            s.to(
              this.godraysEffect.godRaysMaterial.uniforms.exposure,
              { value: 1, duration: i, ease: "sine.out" },
              0.2 * t
            ),
            s.to(
              this.godraysEffect.godRaysMaterial.uniforms.decay,
              { value: 1, duration: i, ease: "sine.out" },
              0.2 * t
            ),
            s.to(
              this.eye.material,
              { opacity: 0, duration: 0.2 * t, ease: "power3.inOut" },
              0.25 * t
            ),
            s.to(
              this.sun.material,
              { opacity: 0, duration: 0.4 * t, ease: "power3.inOut" },
              0.25 * t
            ),
            s.to(
              this.group.position,
              { z: "+=90", duration: 0.6 * t, ease: "power4.inOut" },
              0.25 * t
            ),
            s.set(this.eye, { visible: !1 }, 0.45 * t),
            s.set(this.ringsGroup, { visible: !1 }, 0.25 * t),
            [e, s]
          );
        }
        createRings() {
          var t = new s.Color(16777215),
            e = {
              minBlur: 0.05,
              maxBlur: 0.1,
              minOpacity: 1,
              focusFadeOutLength: 7.77,
              focusFar: 13.11,
              focusNear: 8.7,
              maxOpacity: 1,
            };
          this.rings.push(
            new w(
              this.ringsGroup,
              2.93,
              Math.round(117.2),
              0,
              2 * Math.PI,
              this.menu,
              "eye ring",
              t,
              e
            )
          ),
            this.rings.push(
              new w(
                this.ringsGroup,
                4.1,
                Math.round(164),
                0,
                2 * Math.PI,
                this.menu,
                "eye ring",
                t,
                e
              )
            ),
            this.rings.push(
              new w(
                this.ringsGroup,
                5.4,
                Math.round(224),
                0,
                2 * Math.PI,
                this.menu,
                "eye ring",
                t,
                e
              )
            ),
            this.rings.push(
              new w(
                this.ringsGroup,
                7,
                Math.round(280),
                0,
                2 * Math.PI,
                this.menu,
                "eye ring",
                t,
                e
              )
            );
          (this.rings[0].points.position.y = 0),
            (this.rings[1].points.position.y = 0.65),
            (this.rings[2].points.position.y = 0.8),
            (this.rings[3].points.position.y = 0.05 + 0.8),
            this.rings.forEach((t, e) => {
              (t.points.rotation.x = 0.5 * -Math.PI),
                l.b.to(t.points.rotation, {
                  z: Math.PI,
                  duration: 50 + 10 * e,
                  repeat: -1,
                  ease: "none",
                });
            });
        }
      }
      class P {
        constructor(t, e) {
          let i =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : 0.2,
            s = arguments.length > 3 ? arguments[3] : void 0;
          (this.pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }),
            (this.mouse = {
              x: window.innerWidth / 2,
              y: window.innerHeight / 2,
            }),
            (this.resetTween = null),
            (this.raf = () => {
              const t = l.b.quickSetter(this.target, "x", "px"),
                e = l.b.quickSetter(this.target, "y", "px"),
                i = 1 - Math.pow(1 - this.speed, l.b.ticker.deltaRatio());
              this.MouseMoveTracker.mouse.originX >= this.bounds.left &&
              this.MouseMoveTracker.mouse.originX <= this.bounds.right &&
              this.MouseMoveTracker.mouse.originY >= this.bounds.top &&
              this.MouseMoveTracker.mouse.originY <= this.bounds.bottom
                ? ((this.mouse.x = this.MouseMoveTracker.mouse.x),
                  (this.mouse.y = this.MouseMoveTracker.mouse.y),
                  this.resetTween &&
                    (this.resetTween.kill(), (this.resetTween = null)))
                : null === this.resetTween &&
                  (this.resetTween = l.b.to(this.mouse, {
                    x: 0,
                    y: 0,
                    duration: 0.4,
                  })),
                (this.pos.x += (this.mouse.x - this.pos.x) * i),
                (this.pos.y += (this.mouse.y - this.pos.y) * i),
                t(this.pos.x),
                e(this.pos.y);
            }),
            (this.onWindowResize = () => {
              this.bounds = this.hitArea.getBoundingClientRect();
            }),
            (this.enable = () => {
              l.b.to(this.target, { opacity: 1, duration: 1 });
            }),
            (this.disable = () => {
              l.b.killTweensOf(this.target, "opacity"),
                l.b.to(this.target, { opacity: 0, duration: 0.15 }),
                l.b.ticker.remove(this.raf),
                window.removeEventListener("resize", this.onWindowResize);
            }),
            (this.MouseMoveTracker = t),
            (this.target = e),
            (this.speed = i),
            (this.hitArea = s);
          this.onWindowResize(),
            l.b.ticker.add(this.raf),
            window.addEventListener("resize", this.onWindowResize);
        }
      }
      class O {
        constructor(t, e) {
          (this.pos = new s.Vector3()),
            (this.container = document.querySelector(".ExploreButton")),
            (this.xSet = l.b.quickSetter(this.container, "x", "px")),
            (this.ySet = l.b.quickSetter(this.container, "y", "px")),
            (this.frustum = new s.Frustum()),
            (this.matrix = new s.Matrix4()),
            (this.sphere = new s.Sphere(this.pos, 6)),
            (this.clickHandler = (t) => (
              t.preventDefault(),
              this.gallery.visible ||
                (this.gallery.setGalleryItems(
                  this.main.currentExploreChapter.galleryImages
                ),
                this.gallery.show()),
              !1
            )),
            (this.gallery = t),
            (this.main = e),
            l.b.set(this.container, {
              opacity: 0,
              force3D: !0,
              visibility: "visible",
            }),
            this.container.addEventListener("click", this.clickHandler);
        }
        updateScreenPosition(t, e, i, s) {
          this.matrix.copy(e.projectionMatrix),
            this.matrix.multiply(e.matrixWorldInverse),
            this.frustum.setFromProjectionMatrix(this.matrix),
            (this.pos = this.pos.setFromMatrixPosition(t.matrixWorld)),
            this.frustum.intersectsSphere(this.sphere)
              ? (this.pos.project(e),
                (this.pos.x = this.pos.x * i + i),
                (this.pos.y = -this.pos.y * s + s),
                (this.pos.z = 0),
                this.xSet(this.pos.x),
                this.ySet(this.pos.y))
              : (this.xSet(-1e3), this.ySet(-1e3));
        }
      }
      i(44);
      const T = new s.Vector3(),
        b = new s.Matrix4();
      let S = [];
      function L(t, e) {
        return e[0] - t[0];
      }
      var A = i(874);
      class E {
        constructor(t) {
          (this.timeline = l.b.timeline({ paused: !0 })),
            l.b.registerPlugin(A.a);
          var e = t.querySelector("h1"),
            i = t.querySelectorAll("h1")[1],
            s = new A.a(e, { type: "chars", charsClass: "blurCharacter" }),
            o = new A.a(i, { type: "chars" });
          s.chars.forEach((t) => {
            t.innerHTML = "<span>".concat(t.innerText, "</span>");
          }),
            o.chars.forEach((t) => {
              t.innerHTML = "<span>".concat(t.innerText, "</span>");
            }),
            l.b.set(s.chars, { opacity: 0, force3D: !0 }),
            l.b.set(o.chars, { opacity: 1, force3D: !0 }),
            l.b.set(t, { visibility: "hidden" }),
            this.timeline.set(t, { visibility: "visible" }, 0),
            this.timeline.to(
              t.querySelector(".ChapterIntro-lead"),
              { opacity: 0, force3D: !0 },
              0
            ),
            this.timeline.to(
              t.querySelector(".ChapterIntro-number"),
              { opacity: 0, force3D: !0 },
              0
            ),
            this.timeline.to(
              s.chars,
              {
                stagger: {
                  each: 0.1,
                  from: "edges",
                  grid: "auto",
                  ease: "power2.inOut",
                },
                opacity: 1,
                ease: "quad.inOut",
                duration: 0.5,
                force3D: !0,
              },
              0
            ),
            this.timeline.to(
              s.chars,
              {
                stagger: {
                  each: 0.1,
                  from: "edges",
                  grid: "auto",
                  ease: "power2.inOut",
                },
                opacity: 0,
                duration: 0.5,
                force3D: !0,
              },
              0.5
            ),
            this.timeline.to(
              o.chars,
              {
                opacity: 0,
                stagger: {
                  each: 0.1,
                  from: "edges",
                  grid: "auto",
                  ease: "power2.inOut",
                },
                duration: 0.5,
                ease: "quad.inOut",
                force3D: !0,
              },
              0
            ),
            this.timeline.fromTo(
              s.chars,
              { x: 30, force3D: !0 },
              {
                x: 0,
                stagger: {
                  each: 0.1,
                  from: "edges",
                  grid: "auto",
                  ease: "power2.inOut",
                },
                duration: 0.5,
                ease: "quad.inOut",
                force3D: !0,
              },
              0
            ),
            this.timeline.set(t, { visibility: "hidden" });
        }
      }
      class I {
        constructor(t) {
          (this.timeline = l.b.timeline({ paused: !0 })),
            this.timeline.fromTo(
              t,
              { y: 80 },
              { y: 0, ease: "power3.out", duration: 0.35 },
              0
            ),
            this.timeline.to(
              t,
              { opacity: 1, ease: "sine.out", duration: 0.2 },
              0
            ),
            this.timeline.to(
              t,
              { opacity: 0, ease: "sine.out", duration: 0.2 },
              0.8
            );
        }
      }
      class _ {
        constructor(t, e, i, o, a, n, r, h, u, c, d) {
          (this.sortPoints = []),
            (this.chapterWrapper = new s.Object3D()),
            (this.exploreAnchor = new s.Object3D()),
            (this.rings = []),
            (this.currentChapterScrollProgress = 0),
            (this.duration = 1),
            (this.scrollProgress = 0),
            (this.SCROLL_LENGTH = 10),
            (this.CHAPTER_DISTANCE = m.a.CHAPTER_DISTANCE),
            (this.CHAPTER_OFFSET = 0),
            (this.galleryImages = []),
            (this.setupScrollTimeline = () => null),
            (this.setActiveExploreItem = () => {
              this.main.currentExploreChapter !== this &&
                ((this.main.currentExploreChapter = this),
                (this.main.activeExploreAnchor = this.exploreAnchor));
            });
          const p = d.dataset.exploreTitles.split("|||"),
            g = d.dataset.exploreDescriptions.split("|||");
          (this.galleryImages = d.dataset.exploreImages
            .split("|||")
            .map((t, e) => ({ url: t, title: p[e], description: g[e] }))),
            (this.index = u),
            (this.cameraWrapper = i),
            (this.menu = t),
            (this.camera = e),
            (this.mainGroup = o),
            (this.cameraLookAtPoint = a),
            (this.exploreButton = n),
            (this.chapterPOITitles = h),
            (this.main = c),
            (this.chapterWrapper.name = "Chapter " + u),
            (this.chapterWrapper.position.z = (u - 1) * this.CHAPTER_DISTANCE),
            this.mainGroup.add(this.chapterWrapper),
            (this.ringsMaterial = new x(
              {
                focusNear: 0.01,
                focusFar: 113,
                focusFadeOutLength: 7,
                minBlur: 0.08,
                minOpacity: 0,
                maxOpacity: 0.55,
                maxBlur: 0.1,
              },
              this.menu,
              "rings"
            )),
            (this.chapterIntroClass = new E(r)),
            this.chapterIntroClass.timeline.progress(1),
            (this.chapterPOIs = this.chapterPOITitles.map((t) => new I(t))),
            (this.scrollTimeline = l.b.timeline({ paused: !0 })),
            this.scrollTimeline.to(
              this,
              {
                currentChapterScrollProgress: 1,
                ease: "none",
                duration: this.duration,
              },
              0
            );
        }
        loadDone() {
          this.sortPointsData();
        }
        sortPointsData() {
          this.sortPoints.forEach((t) => {
            !(function (t, e) {
              b.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse),
                b.multiply(t.matrixWorld);
              const i = t.geometry;
              let o = i.getIndex();
              const a = i.getAttribute("position").array,
                n = a.length / 3;
              if (null === o) {
                const t = new Float32Array(n);
                for (let e = 0; e < n; e++) t[e] = e;
                (o = new s.BufferAttribute(t, 1)), i.setIndex(o);
              }
              S = [];
              for (let t = 0; t < n; t++)
                T.fromArray(a, 3 * t), T.applyMatrix4(b), S.push([T.z, t]);
              S.sort(L);
              const r = o.array;
              for (let t = 0; t < n; t++) r[t] = S[t][1];
              i.index.needsUpdate = !0;
            })(t, this.camera),
              (t.geometry = t.geometry.toNonIndexed());
          });
        }
        raf() {
          this.sortPointsData();
        }
        getLoadItems() {
          return null;
        }
        itemLoaded(t, e, i) {}
      }
      var M = i(638);
      class k {
        constructor(t) {
          var e = this;
          let i =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
          (this.currHoverIndex = -1),
            (this.mouseOver = (t) => {
              -1 !== this.currHoverIndex &&
                this.currHoverIndex !== t &&
                this.hideCurrentIndex(),
                (this.currHoverIndex = t),
                this.currImageHoverTimeline &&
                  (this.currImageHoverTimeline.kill(),
                  (this.currImageHoverTimeline = null)),
                (this.currImageHoverTimeline = l.b.timeline()),
                this.currImageHoverTimeline.to(
                  this.imagesComp[0],
                  { opacity: 0, duration: 0.25 },
                  0
                ),
                this.currImageHoverTimeline.to(
                  [this.imagesComp[2], this.imagesComp[1]],
                  { opacity: 0, duration: 0.3 },
                  0
                ),
                2 === this.index
                  ? (this.currImageHoverTimeline.to(
                      this.imagesComp[0],
                      {
                        yPercent: 0,
                        xPercent: -15,
                        ease: "power4.out",
                        duration: 1.2 / 1.6,
                      },
                      0
                    ),
                    this.currImageHoverTimeline.to(
                      this.imagesComp[2],
                      {
                        xPercent: -10,
                        yPercent: -5,
                        ease: "power4.out",
                        duration: 0.9375,
                      },
                      0
                    ),
                    this.currImageHoverTimeline.to(
                      this.imagesComp[1],
                      {
                        yPercent: 4,
                        xPercent: -20,
                        ease: "power4.out",
                        duration: 1,
                      },
                      0
                    ))
                  : (this.currImageHoverTimeline.to(
                      this.imagesComp[2],
                      { xPercent: 3, ease: "power4.out", duration: 1 },
                      0
                    ),
                    this.currImageHoverTimeline.to(
                      this.imagesComp[1],
                      { xPercent: -3, ease: "power4.out", duration: 1 },
                      0
                    )),
                l.b.killTweensOf(this.descriptions[this.currHoverIndex]),
                l.b.killTweensOf(this.imagesSingular[this.currHoverIndex]),
                l.b.to(this.descriptions[this.currHoverIndex], {
                  opacity: 1,
                  duration: 0.5,
                }),
                l.b.to(this.imagesSingular[this.currHoverIndex], {
                  opacity: 1,
                  duration: 2 === this.index ? 0.3 : 0.1,
                });
            }),
            (this.mouseOut = function (t) {
              let i =
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
              -1 !== e.currHoverIndex && e.hideCurrentIndex(i),
                (e.currHoverIndex = -1);
            }),
            (this.container = t),
            (this.index = i),
            (this.imagesComp = this.container.querySelectorAll(
              ".MakeChoice-images .MakeChoice-imageComp"
            )),
            (this.imagesSingular = this.container.querySelectorAll(
              ".MakeChoice-images .MakeChoice-imageSingular"
            )),
            (this.svg = this.container.querySelector(".MakeChoice-bgSVG")),
            (this.buttons =
              this.container.querySelectorAll(".MakeChoice-button")),
            (this.descriptions = this.container.querySelectorAll(
              ".MakeChoice-description"
            )),
            (this.descriptionWrapper = this.container.querySelector(
              ".MakeChoice-descriptions"
            )),
            (this.centerWrapper =
              this.container.querySelector(".MakeChoice-center")),
            (this.scrollIndicator = this.container.querySelector(
              ".MakeChoice-scrollIndicator"
            )),
            (this.choiceText =
              this.container.querySelector(".MakeChoice-text")),
            (this.scrollLine = this.container.querySelector(
              ".MakeChoice-scrollIndicator-line"
            )),
            (this.scrollLineBG = this.container.querySelector(
              ".MakeChoice-scrollIndicator-lineBG"
            )),
            (this.scrollLineDiamond = this.container.querySelector(
              ".MakeChoice-Diamond"
            )),
            (this.exploreNav = document.querySelector(".ExploreNav")),
            (this.inTimeline = l.b.timeline({ paused: !0 })),
            this.inTimeline.fromTo(
              this.svg,
              { opacity: 0 },
              { opacity: 1, duration: 1 },
              0
            ),
            this.inTimeline.fromTo(
              this.buttons,
              { opacity: 0 },
              { opacity: 1, duration: 1 },
              0
            ),
            this.inTimeline.fromTo(
              this.imagesComp[0],
              { opacity: 0 },
              { opacity: 1, duration: 0.6 },
              0
            ),
            2 === this.index
              ? (this.inTimeline.fromTo(
                  this.imagesComp[2],
                  { yPercent: 2, xPercent: 15 },
                  {
                    yPercent: 0,
                    xPercent: 0,
                    ease: "power4.out",
                    duration: 1.2,
                  },
                  0
                ),
                this.inTimeline.fromTo(
                  [this.imagesComp[2], this.imagesComp[1]],
                  { opacity: 0 },
                  { opacity: 1, duration: 0.4 },
                  0
                ),
                this.inTimeline.fromTo(
                  this.imagesComp[0],
                  { xPercent: 10, yPercent: 5 },
                  {
                    xPercent: 0,
                    yPercent: 0,
                    ease: "power4.out",
                    duration: 1.5,
                  },
                  0
                ),
                this.inTimeline.fromTo(
                  this.imagesComp[1],
                  { yPercent: -4, xPercent: 20 },
                  {
                    yPercent: 0,
                    xPercent: 0,
                    ease: "power4.out",
                    duration: 1.6,
                  },
                  0
                ))
              : (this.inTimeline.fromTo(
                  this.imagesComp[1],
                  { xPercent: -10 },
                  { xPercent: 0, ease: "power4.out", duration: 1.8 },
                  0
                ),
                this.inTimeline.fromTo(
                  this.imagesComp[0],
                  { yPercent: 5 },
                  { yPercent: 0, duration: 1.2 },
                  0
                ),
                this.inTimeline.fromTo(
                  [this.imagesComp[2], this.imagesComp[1]],
                  { opacity: 0 },
                  { opacity: 1, duration: 0.4 },
                  0
                ),
                this.inTimeline.fromTo(
                  this.imagesComp[2],
                  { xPercent: 10 },
                  { xPercent: 0, ease: "power4.out", duration: 1.5 },
                  0
                )),
            this.inTimeline.set(this.buttons, { pointerEvents: "auto" }),
            (this.timeline = l.b.timeline({ paused: !0 }));
          this.timeline.to(
            this.exploreNav,
            { opacity: 0, x: -100, duration: 0.1 },
            0
          );
          this.timeline.call(
            () => {
              this.mouseOut(-1, !0),
                this.inTimeline.pause(0),
                this.inTimeline.render(0);
            },
            null,
            0.2 + 0.1
          ),
            this.timeline.fromTo(
              this.centerWrapper,
              { opacity: 0 },
              { opacity: 1, duration: 0.05 },
              0.2 + 0.1
            ),
            this.timeline.fromTo(
              this.descriptionWrapper,
              { opacity: 0 },
              { opacity: 1, duration: 0.05 },
              0.2 + 0.1
            ),
            this.timeline.call(
              () => {
                this.playIn();
              },
              null,
              0.2 + 0.1
            ),
            this.timeline.fromTo(
              this.scrollIndicator,
              { opacity: 0, x: -80 },
              { opacity: 1, x: 0, duration: 0.1 },
              0.25
            ),
            this.timeline.fromTo(
              this.choiceText,
              { opacity: 0 },
              { opacity: 1, duration: 0.12 },
              0.25
            ),
            this.timeline.fromTo(
              this.choiceText,
              { x: () => (m.a.MainScene.width >= 768 ? -80 : 0) },
              { x: 0, duration: 0.15 },
              0.25
            ),
            this.timeline.fromTo(
              this.scrollLine,
              { scaleY: 0 },
              { scaleY: 1, ease: "none", duration: 0.55 },
              0.35
            );
          var s = l.b.timeline({ paused: !0 });
          s.to(
            this.scrollLine,
            { scaleY: 0, yPercent: 100, duration: 0.9, ease: "none" },
            0
          ),
            s.to(
              this.scrollLineBG,
              { scaleY: 0, yPercent: 100, duration: 0.9, ease: "none" },
              0
            ),
            s.to(this.scrollLine, { y: 16, duration: 0.1, ease: "none" }, 0.9),
            s.to(
              this.scrollLineBG,
              { y: 16, duration: 0.1, ease: "none" },
              0.9
            ),
            s.to(
              this.scrollIndicator,
              { opacity: 0, duration: 1, ease: "sine.out" },
              0
            ),
            s.to(
              this.scrollLineDiamond,
              { y: 300, duration: 0.9, ease: "none" },
              0
            ),
            s.to(
              this.scrollLineDiamond,
              { y: 316, duration: 0.1, ease: "none" },
              0.9
            ),
            s.to(
              this.choiceText,
              { opacity: 0, duration: 0.5, ease: "sine.out" },
              0
            ),
            s.to(this.choiceText, { y: 50, duration: 1, ease: "sine.out" }, 0),
            s.to(this.centerWrapper, { opacity: 0, duration: 0.3 }, 0.7),
            s.to(this.descriptionWrapper, { opacity: 0, duration: 0.3 }, 0.7),
            this.timeline.to(s, { progress: 1, duration: 0.1 }, 0.9),
            this.timeline.to(
              this.exploreNav,
              { opacity: 1, x: 0, duration: 0.07 },
              0.93
            ),
            this.timeline.set(this.container, { visibility: "visible" }, 0),
            this.timeline.set(this.container, { visibility: "hidden" }, 1),
            this.buttons.forEach((t, e) => {
              const i = e;
              t.addEventListener("mouseover", () => this.mouseOver(i), !1),
                t.addEventListener("mouseout", () => this.mouseOut(i), !1);
            });
        }
        hideCurrentIndex() {
          let t =
            arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
          l.b.killTweensOf(this.descriptions[this.currHoverIndex]),
            l.b.killTweensOf(this.imagesSingular[this.currHoverIndex]),
            l.b.to(this.descriptions[this.currHoverIndex], {
              opacity: 0,
              duration: t ? 0 : 0.35,
            }),
            l.b.to(this.imagesSingular[this.currHoverIndex], {
              opacity: 0,
              duration: t ? 0 : 2 === this.index ? 0.3 : 0.6,
            }),
            this.currImageHoverTimeline &&
              (this.currImageHoverTimeline.kill(),
              (this.currImageHoverTimeline = null)),
            (this.currImageHoverTimeline = l.b.timeline()),
            this.currImageHoverTimeline.to(
              this.imagesComp[0],
              { opacity: 1, duration: t ? 0 : 0.6 },
              0
            ),
            this.currImageHoverTimeline.to(
              [this.imagesComp[2], this.imagesComp[1]],
              { opacity: 1, duration: t ? 0 : 0.4 },
              0
            ),
            2 === this.index
              ? (this.currImageHoverTimeline.to(
                  this.imagesComp[0],
                  {
                    yPercent: 0,
                    xPercent: 0,
                    ease: "power4.out",
                    duration: t ? 0 : 1.2 / 1.6,
                  },
                  0
                ),
                this.currImageHoverTimeline.to(
                  this.imagesComp[2],
                  {
                    xPercent: 0,
                    yPercent: 0,
                    ease: "power4.out",
                    duration: t ? 0 : 0.9375,
                  },
                  0
                ),
                this.currImageHoverTimeline.to(
                  this.imagesComp[1],
                  {
                    yPercent: 0,
                    xPercent: 0,
                    ease: "power4.out",
                    duration: t ? 0 : 1,
                  },
                  0
                ))
              : (this.currImageHoverTimeline.to(
                  this.imagesComp[2],
                  { xPercent: 0, ease: "power4.out", duration: t ? 0 : 1 },
                  0
                ),
                this.currImageHoverTimeline.to(
                  this.imagesComp[1],
                  { xPercent: 0, ease: "power4.out", duration: t ? 0 : 1 },
                  0
                ));
        }
        playIn() {
          this.inTimeline.paused() && this.inTimeline.play();
        }
      }
      class F extends _ {
        constructor(t, e, i, o, a, n, r, u, c, d, p) {
          super(t, e, i, o, a, n, r, u, c, d, p),
            (this.planetLinkContainer = new s.Object3D()),
            (this.ringsWrapper = new s.Group()),
            (this.CHAPTER_OFFSET = 0.005),
            (this.SCROLL_LENGTH = 15),
            (this.itemLoaded = (t, e, i) => {
              if ("ship" === i) {
                var o = new x(
                  {
                    focusFadeOutLength: 4.87,
                    focusNear: 7.523,
                    focusFar: 11.934,
                    minOpacity: 0.016,
                    maxOpacity: 0.214,
                    maxBlur: 0.13,
                    minBlur: 0.12,
                  },
                  this.menu,
                  i
                );
                (a = new s.Points(t, o)).scale.set(0.01, 0.01, 0.01),
                  a.add(this.exploreAnchor),
                  this.exploreAnchor.position.set(-152.65, -25.95, -78.08),
                  (this._shipWrapper = new s.Object3D()),
                  this._shipWrapper.rotation.set(-0.34, 0.65, 0.36),
                  this._shipWrapper.add(a),
                  (this._ship = a),
                  this.sortPoints.push(a),
                  (this._shipWrapper.position.z = 12.5),
                  (a = this._shipWrapper);
              } else if ("space_station" === i) {
                o = new x(
                  {
                    useFocusCenter: !1,
                    focusNear: 10,
                    focusFar: 16,
                    focusFadeOutLength: 9.5,
                    minOpacity: 0,
                    maxOpacity: 0.016,
                    maxBlur: 0.2,
                    minBlur: 0.006,
                  },
                  this.menu,
                  i
                );
                (a = new s.Points(t, o)).scale.set(0.005, 0.005, 0.005),
                  this.sortPoints.push(a),
                  (this.spaceStation = a),
                  (this.spaceContainer = new s.Object3D()),
                  this.spaceContainer.position.set(-4.67, -9, -80),
                  this.spaceContainer.add(this.spaceStation),
                  l.b.to(a.rotation, {
                    y: 2 * Math.PI,
                    ease: "none",
                    repeat: -1,
                    duration: 200,
                  }),
                  l.b.to(a.position, {
                    y: 0.5,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: !0,
                    duration: 5,
                  }),
                  (a = this.spaceContainer);
              } else if ("planet_link" === i) {
                o = new x(
                  {
                    useFocusCenter: !1,
                    focusNear: 5.436,
                    focusFar: 0.01,
                    focusFadeOutLength: 35.4,
                    minOpacity: 0,
                    maxOpacity: 0.05,
                    maxBlur: 0.19,
                    minBlur: 0.08,
                  },
                  this.menu,
                  i
                );
                var a = new s.Points(t, o);
                this.sortPoints.push(a),
                  a.scale.set(0.005, 0.005, 0.005),
                  (this.planetLink = a),
                  (a.name = "planetLink"),
                  this.planetLinkContainer.add(this.planetLink),
                  this.planetLinkContainer.scale.set(-1, 1, 1),
                  this.planetLinkContainer.position.set(-2.2, -1.55, -21.1),
                  this.planetLinkContainer.rotation.set(0.28, -0.568, 0),
                  (a = this.planetLinkContainer);
              } else if ("planet_link_lines" === i) {
                (o = new x(
                  {
                    useFocusCenter: !1,
                    focusNear: 0.01,
                    focusFar: 12.2,
                    focusFadeOutLength: 0.485,
                    minOpacity: 0,
                    maxOpacity: 0.2,
                    maxBlur: 0.11,
                    minBlur: 0.1,
                  },
                  this.menu,
                  i
                )),
                  (a = new s.Points(t, o));
                this.sortPoints.push(a),
                  a.scale.set(0.005, 0.005, 0.005),
                  (a.name = "planetLink-lines"),
                  this.planetLinkContainer.add(a),
                  (a = this.planetLinkContainer);
              }
              (a.name = i), this.chapterWrapper.add(a);
            }),
            (this.setupScrollTimeline = () => {
              const t = this.duration;
              this.scrollTimeline.set(this.chapterWrapper, { visible: !1 }, 0),
                this.scrollTimeline.set(
                  this.chapterWrapper,
                  { visible: !0 },
                  0.001
                ),
                this.scrollTimeline.to(
                  this,
                  { scrollProgress: 1, ease: "none", duration: this.duration },
                  0
                ),
                this.scrollTimeline.fromTo(
                  this.chapterIntroClass.timeline,
                  { progress: 1 },
                  { progress: 0, ease: "none", duration: 0.1 * 0.45 },
                  0
                ),
                this.scrollTimeline.to(
                  this.chapterIntroClass.timeline,
                  { progress: 1, ease: "none", duration: 0.03 },
                  0.125
                ),
                this.scrollTimeline.fromTo(
                  this.ringsWrapper.position,
                  { z: 20 },
                  { z: 0, ease: "none", duration: 0.1 },
                  0
                ),
                this.scrollTimeline.from(
                  this.ringsMaterial.uniforms.maxOpacity,
                  { value: 0, duration: 0.05 },
                  0.1 * 0.45
                ),
                this.scrollTimeline.to(
                  this.dollyZoom7,
                  {
                    totalProgress: 1,
                    duration: 0.1 * 0.75,
                    ease: "power1.inOut",
                    onUpdate: () =>
                      this.dollyZoom7.update(15, 4.32207356734125, 55),
                  },
                  0
                ),
                this.scrollTimeline.to(
                  this.main.clusterCloud.material.uniforms.focusFar,
                  { value: 160, ease: "power1.inOut", duration: 0.1 * 0.75 },
                  0
                );
              const e = l.b.timeline({ paused: !0 });
              var i = l.b.timeline({ paused: !0 });
              i.to({ dummy: 0 }, { dummy: 1, duration: 100 }, 0),
                i.to(
                  this.ringsMaterial.uniforms.focusFar,
                  { value: 0.01, ease: "power1.inOut", duration: 4 },
                  0
                ),
                i.to(
                  this.ringsMaterial.uniforms.focusFadeOutLength,
                  { value: 24, ease: "sine.out", duration: 5 },
                  0
                ),
                i.to(
                  this.main.clusterCloud.material.uniforms.focusFar,
                  { value: 51, ease: "sine.out", duration: 4 },
                  0
                ),
                i.to(
                  this.main,
                  { mousePanAmount: 4, mouseMoveAmount: 1, duration: 10 },
                  0
                ),
                i.to(
                  this.dollyZoom,
                  {
                    totalProgress: 1,
                    duration: 7,
                    ease: "power1.inOut",
                    onUpdate: () => this.dollyZoom.update(110, 100, 15),
                  },
                  0
                ),
                i.to(
                  this.dollyZoom2,
                  {
                    totalProgress: 1,
                    duration: 12,
                    ease: "power1.inOut",
                    onUpdate: () => this.dollyZoom2.update(55, 3, 110),
                  },
                  10
                ),
                i.to(
                  this.dollyZoom3,
                  {
                    totalProgress: 1,
                    duration: 6,
                    ease: "sine.inOut",
                    onUpdate: () => this.dollyZoom3.update(110, 20, 55),
                  },
                  30
                ),
                i.to(
                  this.dollyZoom4,
                  {
                    totalProgress: 1,
                    duration: 12,
                    ease: "power1.inOut",
                    onUpdate: () => this.dollyZoom4.update(55, 3, 110),
                  },
                  40
                ),
                i.to(
                  this.dollyZoom5,
                  {
                    totalProgress: 1,
                    duration: 6,
                    ease: "sine.inOut",
                    onUpdate: () => this.dollyZoom5.update(110, 20, 55),
                  },
                  70
                ),
                i.to(
                  this.dollyZoom6,
                  {
                    totalProgress: 1,
                    duration: 10,
                    ease: "sine.inOut",
                    onUpdate: () => this.dollyZoom6.update(55, 8, 110),
                  },
                  80
                ),
                e.to(i, { progress: 1, ease: "none", duration: 0.9 * t }, 0),
                e.to(
                  this.spaceStation.material.uniforms.maxOpacity,
                  { value: 0.129, ease: "none", duration: 0.1 * t },
                  0.1
                ),
                e.to(
                  this.spaceStation.material.uniforms.minBlur,
                  { value: 0.08, ease: "none", duration: 0.1 * t },
                  0.1
                ),
                e.to(
                  this.spaceStation.material.uniforms.focusFadeOutLength,
                  { value: 9, ease: "none", duration: 0.1 * t },
                  0.1
                ),
                e.to(
                  this.spaceStation.material.uniforms.focusNear,
                  { value: 12, ease: "none", duration: 0.1 * t },
                  0.1
                ),
                e.to(
                  this.spaceContainer.position,
                  { y: -3.31, ease: "sine.out", duration: 0.2 * t },
                  0
                ),
                e.to(
                  this.spaceContainer.rotation,
                  { y: 0.28, ease: "sine.out", duration: 0.2 * t },
                  0
                ),
                e.to(
                  this.planetLinkContainer.position,
                  { x: 2.7, ease: "power1.inOut", duration: 0.2 * t },
                  0.4
                ),
                e.to(
                  this.planetLinkContainer.rotation,
                  { y: 0, x: 0, ease: "power1.inOut", duration: 0.2 * t },
                  0.4
                ),
                e.to(
                  this.planetLink.material.uniforms.focusFar,
                  { value: 37, ease: "none", duration: 0.2 * t },
                  0.4
                ),
                e.to(
                  this.chapterPOIs[0].timeline,
                  { progress: 1, ease: "none", duration: 0.25 * t },
                  0.08
                ),
                e.to(
                  this.chapterPOIs[1].timeline,
                  { progress: 1, ease: "none", duration: 0.25 * t },
                  0.4
                ),
                e.to(
                  this._shipWrapper.position,
                  { z: 16.95, ease: "power4.inOut", duration: 0.18 * t },
                  0.7
                ),
                e.fromTo(
                  this._ship.rotation,
                  { x: -0.27, y: -0.6, z: 1.659 },
                  {
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: "power2.inOut",
                    duration: 0.18 * t,
                  },
                  0.7
                ),
                e.fromTo(
                  this._ship.position,
                  { x: 2.04, y: 0, z: 300 },
                  {
                    x: 0.98,
                    y: -0.25,
                    z: -2.81,
                    ease: "power2.inOut",
                    duration: 0.15 * t,
                  },
                  0.7
                ),
                e.to(
                  this._ship.position,
                  { z: -19, ease: "power2.in", duration: 0.1 * t },
                  0.85
                ),
                e.to(
                  this._ship.rotation,
                  {
                    x: 0,
                    y: 0,
                    z: -0.23,
                    ease: "power4.in",
                    duration: 0.07 * t,
                  },
                  0.88
                ),
                e.to(
                  this._shipWrapper.rotation,
                  {
                    x: 0,
                    y: 0,
                    z: -0.14,
                    ease: "power4.in",
                    duration: 0.3 * t,
                  },
                  0.7
                ),
                e.fromTo(
                  this._ship.material.uniforms.minOpacity,
                  { value: 0 },
                  { value: 0.016, ease: "sine.out", duration: 0.18 * t },
                  0.7
                ),
                e.to(
                  this._ship.material.uniforms.maxBlur,
                  { value: 0.36, ease: "sine.out", duration: 0.1 * t },
                  0.9
                ),
                e.to(
                  this._ship.material.uniforms.focusNear,
                  { value: 9.76, duration: 0.1 * t },
                  0.9
                );
              var s = l.b.timeline({
                paused: !0,
                onUpdate: this.setActiveExploreItem,
              });
              s.set(
                this.exploreButton.container,
                { pointerEvents: "none", duration: 0 },
                0.19
              ),
                s.set(
                  this.exploreButton.container,
                  { pointerEvents: "auto", duration: 0 },
                  0.2
                ),
                s.fromTo(
                  this.exploreButton.container,
                  { opacity: 0 },
                  { opacity: 1, ease: "sine.out", duration: 0.2 },
                  0.2
                ),
                s.fromTo(
                  this.exploreButton.container,
                  { opacity: 1 },
                  { opacity: 0, ease: "sine.out", duration: 0.2 },
                  0.8
                ),
                s.set(
                  this.exploreButton.container,
                  { pointerEvents: "none", duration: 0 },
                  1
                ),
                e.to(s, { progress: 1, ease: "none", duration: 0.25 * t }, 0.7);
              const o = M.a.create(
                "custom",
                "M0,0 C0.632,0.674 0.656,0.708 0.786,0.854 0.852,0.928 0.918,1 1,1 "
              );
              return (
                e.to(
                  this.cameraWrapper.position,
                  { z: 252, ease: o, duration: this.duration },
                  0
                ),
                e.to(
                  this.cameraLookAtPoint.position,
                  {
                    z: 150 + this.CHAPTER_DISTANCE,
                    ease: o,
                    duration: this.duration,
                  },
                  0
                ),
                e.to(
                  this.main,
                  { mousePanAmount: 2, mouseMoveAmount: 2, duration: 0.1 },
                  0.9
                ),
                this.scrollTimeline.to(
                  e,
                  {
                    progress: 1,
                    duration: 0.88 * this.duration - 0.1,
                    ease: "none",
                  },
                  0.1
                ),
                this.scrollTimeline.to(
                  this.makeChoice.timeline,
                  {
                    progress: 1,
                    duration: 0.3 * this.duration - 0.06,
                    ease: "none",
                  },
                  0.76
                ),
                this.scrollTimeline.set(
                  this.chapterWrapper,
                  { visible: !0 },
                  0.999
                ),
                this.scrollTimeline.set(
                  this.chapterWrapper,
                  { visible: !1 },
                  1
                ),
                this.scrollTimeline
              );
            }),
            (this.dollyZoom = new h(this.camera, this.cameraLookAtPoint)),
            (this.dollyZoom2 = new h(this.camera, this.cameraLookAtPoint)),
            (this.dollyZoom3 = new h(this.camera, this.cameraLookAtPoint)),
            (this.dollyZoom4 = new h(this.camera, this.cameraLookAtPoint)),
            (this.dollyZoom5 = new h(this.camera, this.cameraLookAtPoint)),
            (this.dollyZoom6 = new h(this.camera, this.cameraLookAtPoint)),
            (this.dollyZoom7 = new h(this.camera, this.cameraLookAtPoint)),
            this.chapterWrapper.add(this.ringsWrapper),
            (this.makeChoice = new k(
              document.querySelectorAll(".MakeChoice")[1],
              2
            ));
        }
        getLoadItems() {
          return [
            ["particles/vzus/0.drc", "ship"],
            ["particles/spacestation/0.drc", "space_station"],
            ["particles/planet_link/0.drc", "planet_link"],
            ["particles/planet_link/lines.drc", "planet_link_lines"],
          ];
        }
        loadDone() {
          super.loadDone(), this.createChapterRings();
        }
        createChapterRings() {
          for (let t = 0; t < 15; t++) {
            const e = new w(
              this.ringsWrapper,
              10,
              100,
              0,
              2 * Math.PI,
              this.menu,
              "ring",
              new s.Color(524802),
              null,
              this.ringsMaterial
            );
            this.rings.push(e),
              (e.points.position.z = 20 - 10 * t),
              l.b.to(e.points.rotation, {
                z: Math.PI,
                duration: 50 + 10 * t,
                repeat: -1,
                ease: "none",
              });
          }
        }
      }
      var D = i(657),
        B = i(658);
      class z extends s.Loader {
        constructor(t) {
          super(),
            (this.loadItems = new Map()),
            (this.currentlyLoaded = 0),
            (this.additionalLoads = 0),
            (this.additionalLoadsCompleted = 0),
            (this.dracoLoader = new D.a()),
            (this.gltfLoader = new B.a()),
            (this.loadedPaths = []),
            (this.taskConfig = {
              attributeIDs: {
                position: "POSITION",
                color: "COLOR",
                size: "GENERIC",
              },
              attributeTypes: {
                position: "Float32Array",
                color: "Float32Array",
                size: "Float32Array",
              },
              useUniqueIDs: !1,
            }),
            (this.addLoadItem = (t) => {
              const e = t.path;
              this.loadItems.has(e)
                ? this.loadItems.get(e).push(t)
                : this.loadItems.set(e, [t]);
            }),
            (this.loadGLTF = (t, e) => {
              this.additionalLoads++,
                this.gltfLoader.load(
                  t,
                  (t) => {
                    this.additionalLoadsCompleted++, this.checkLoadDone(), e(t);
                  },
                  function (t) {},
                  function (t) {
                    console.log("An error happened", t);
                  }
                );
            }),
            (this.itemLoaded = (t, e) => {
              this.currentlyLoaded++,
                e.forEach((e) => e.doneCallback(t, e.path, e.name)),
                this.checkLoadDone();
            }),
            this.manager.setURLModifier((t) => "assets/home/" + t),
            (this.loadDoneCallback = t),
            this.dracoLoader.setDecoderPath("libs/draco/"),
            this.dracoLoader.setDecoderConfig({ type: "wasm" }),
            this.dracoLoader.preload(),
            this.gltfLoader.setDRACOLoader(this.dracoLoader);
        }
        setChapters(t) {
          (this.chapters = t),
            this.chapters.forEach((t) => {
              t.getLoadItems().forEach((e) => {
                const i = e[0],
                  s = { path: i, name: e[1], doneCallback: t.itemLoaded };
                this.loadItems.has(i)
                  ? this.loadItems.get(i).push(s)
                  : this.loadItems.set(i, [s]);
              });
            });
        }
        dracoLoad(t, e, i, o) {
          const a = new s.FileLoader(this.manager);
          a.setPath(this.path),
            a.setResponseType("arraybuffer"),
            a.setRequestHeader(this.requestHeader),
            a.setWithCredentials(this.withCredentials),
            a.load(
              t,
              (t) => {
                this.dracoLoader
                  .decodeGeometry(t, this.taskConfig)
                  .then(e)
                  .catch(o);
              },
              i,
              o
            );
        }
        startLoading() {
          this.loadItems.forEach((t) => {
            t[0].path.indexOf(".drc") > 0 &&
              this.dracoLoad(
                t[0].path,
                (e) => {
                  e.setAttribute("customColor", e.attributes.color),
                    e.deleteAttribute("color"),
                    this.itemLoaded(e, t);
                },
                function (t) {},
                function (t) {
                  console.log("An error happened"), console.log(t);
                }
              );
          });
        }
        checkLoadDone() {
          this.loadItems.size + this.additionalLoads ===
            this.currentlyLoaded + this.additionalLoadsCompleted &&
            this.loadDone();
        }
        loadDone() {
          this.dracoLoader.dispose(), this.loadDoneCallback();
        }
        loadTexture(t) {
          return (
            this.additionalLoads++,
            new s.TextureLoader().load(
              t,
              (t) => {
                this.additionalLoadsCompleted++, this.checkLoadDone();
              },
              function (t) {},
              function (t) {
                console.log("An error happened", t);
              }
            )
          );
        }
      }
      var R = i(659);
      l.b.registerPlugin(M.a, R.a);
      class W extends _ {
        constructor(t, e, i, o, a, n, r, u, c, d, p) {
          super(t, e, i, o, a, n, r, u, c, d, p),
            (this.SCROLL_LENGTH = 11),
            (this.planetShipsOrbitContainer = new s.Object3D()),
            (this.shipContainer = new s.Object3D()),
            (this.shipContainer2 = new s.Object3D()),
            (this.itemLoaded = (t, e, i) => {
              if ("planet_ships_orbit" === i) {
                var o = new x(
                    {
                      focusNear: 10,
                      focusFar: 16,
                      focusFadeOutLength: 9,
                      minBlur: 0.02,
                      maxBlur: 0.09,
                      minOpacity: 0,
                      maxOpacity: 0.126,
                    },
                    this.menu,
                    i
                  ),
                  a = new s.Points(t, o);
                this.sortPoints.push(a),
                  a.scale.set(-0.005, 0.005, 0.005),
                  (a.position.x = -5.57),
                  (a.position.z = -80),
                  (a.visible = !1),
                  (this.planetShipsOrbit = a),
                  this.planetShipsOrbitContainer.add(this.planetShipsOrbit),
                  (a = this.planetShipsOrbitContainer);
              } else if ("ship" === i) {
                (o = new x(
                  {
                    focusNear: 5.1,
                    focusFar: 29,
                    focusFadeOutLength: 2.6,
                    minBlur: 0.08,
                    maxBlur: 0.3,
                    minOpacity: 0,
                    maxOpacity: 0.192,
                    radiusScaleFactor: 100,
                  },
                  this.menu,
                  i
                )),
                  (a = new s.Points(t, o));
                (this.ship2 = new s.Points(t, o)),
                  this.sortPoints.push(this.ship2),
                  this.sortPoints.push(a),
                  a.scale.set(-1, 1, 1),
                  this.ship2.scale.set(-1, 1, 1),
                  (a.position.z = -25.96),
                  (a.rotation.x = -0.16),
                  (a.visible = !1),
                  (this.ship = a),
                  this.shipContainer.add(this.ship),
                  this.shipContainer2.position.set(-6.96, -2.78, -26),
                  this.shipContainer2.rotation.set(0, -2.81, 0),
                  this.shipContainer2.add(this.ship2),
                  this.chapterWrapper.add(this.shipContainer2),
                  (a = this.shipContainer);
              } else if ("planets" === i) {
                (o = new x(
                  {
                    minOpacity: 0,
                    minBlur: 0.04,
                    maxOpacity: 0.5,
                    maxBlur: 0.21,
                    focusNear: 3,
                    focusFar: 150,
                    focusFadeOutLength: 3.76,
                    radiusScaleFactor: 100,
                  },
                  this.menu,
                  i
                )),
                  (a = new s.Points(t, o));
                this.sortPoints.push(a),
                  (this.planets = a),
                  a.scale.set(-1, 1, 1),
                  (a.position.z = 80),
                  this.exploreAnchor.position.set(-11.87, 8.7, 18.9),
                  a.add(this.exploreAnchor),
                  (a.visible = !1);
              }
              (a.name = i), this.chapterWrapper.add(a);
            }),
            (this.setupScrollTimeline = () => {
              const t = this.duration;
              this.scrollTimeline.to(
                this.chapterIntroClass.timeline,
                { progress: 1, ease: "none", duration: 0.05 * t },
                0
              );
              const e = l.b.timeline({ paused: !0 });
              this.scrollTimeline.to(
                this,
                { scrollProgress: 1, ease: "none", duration: this.duration },
                0
              );
              var i = l.b.timeline({ paused: !0 });
              i.to({ dummy: 0 }, { dummy: 1, duration: 100 }, 0),
                i.to(
                  this.ringsMaterial.uniforms.focusFar,
                  { value: 0.01, ease: "sine.out", duration: 2 },
                  0
                ),
                i.to(
                  this.ringsMaterial.uniforms.focusFadeOutLength,
                  { value: 24, ease: "sine.out", duration: 2 },
                  0
                ),
                i.to(
                  this.main.clusterCloud.material.uniforms.focusFar,
                  { value: 51, ease: "sine.out", duration: 4 },
                  0
                ),
                i.to(
                  this.main,
                  { mousePanAmount: 6, mouseMoveAmount: 1, duration: 7 },
                  0
                ),
                i.to(
                  this.dollyZoom,
                  {
                    totalProgress: 1,
                    duration: 7,
                    ease: "sine.out",
                    onUpdate: () => this.dollyZoom.update(110, 100, 15),
                  },
                  0
                ),
                i.to(
                  this.dollyZoom2,
                  {
                    totalProgress: 1,
                    duration: 12,
                    ease: "power1.inOut",
                    onUpdate: () => this.dollyZoom2.update(55, 3, 110),
                  },
                  10
                ),
                i.to(
                  this.dollyZoom3,
                  {
                    totalProgress: 1,
                    duration: 6,
                    ease: "sine.inOut",
                    onUpdate: () => this.dollyZoom3.update(110, 20, 55),
                  },
                  30
                ),
                i.to(
                  this.dollyZoom4,
                  {
                    totalProgress: 1,
                    duration: 12,
                    ease: "power1.inOut",
                    onUpdate: () => this.dollyZoom4.update(55, 3, 110),
                  },
                  40
                ),
                i.to(
                  this.dollyZoom5,
                  {
                    totalProgress: 1,
                    duration: 6,
                    ease: "sine.inOut",
                    onUpdate: () => this.dollyZoom5.update(110, 20, 55),
                  },
                  70
                ),
                i.to(
                  this.dollyZoom6,
                  {
                    totalProgress: 1,
                    duration: 10,
                    ease: "sine.inOut",
                    onUpdate: () => this.dollyZoom6.update(55, 8, 110),
                  },
                  80
                ),
                e.to(i, { progress: 1, ease: "none", duration: 0.9 * t }, 0),
                e.to(
                  this.chapterPOIs[0].timeline,
                  { progress: 1, ease: "none", duration: 0.25 * t },
                  0.08
                ),
                e.to(
                  this.chapterPOIs[1].timeline,
                  { progress: 1, ease: "none", duration: 0.25 * t },
                  0.4
                ),
                e.to(
                  ".ScrollHelpIndicator",
                  {
                    opacity: 0,
                    yPercent: 100,
                    ease: "none",
                    duration: 0.02 * t,
                  },
                  0
                ),
                e.set(this.planetShipsOrbit, { visible: !0 }, 0),
                e.to(
                  this.planetShipsOrbit.material.uniforms.maxBlur,
                  { value: 0.21, duration: 0.16 },
                  0.2
                ),
                e.fromTo(
                  this.planetShipsOrbit.material.uniforms.maxOpacity,
                  { value: 0.027 },
                  { value: 0.3, duration: 0.16 },
                  0.1
                ),
                e.fromTo(
                  this.planetShipsOrbit.rotation,
                  { x: -0.15, y: -0.45 },
                  { x: 0.15, y: 0.45, duration: 0.45 },
                  0.05
                ),
                e.to(
                  this.planetShipsOrbit.position,
                  { y: -5.19, duration: 0.45 },
                  0.05
                ),
                e.set(this.planetShipsOrbit, { visible: !1 }, 0.3),
                e.set(this.ship, { visible: !0 }, 0.3),
                e.fromTo(
                  this.ship.rotation,
                  { z: -2 },
                  { z: 0, ease: "power1.inOut", duration: 0.4 * t },
                  0.3
                ),
                e.to(
                  this.ship.rotation,
                  { x: 0, ease: "power2.inOut", duration: 0.4 * t },
                  0.3
                ),
                e.fromTo(
                  this.ship.rotation,
                  { y: -0.37 },
                  { y: 0, ease: "power2.inOut", duration: 0.4 * t },
                  0.3
                ),
                e.fromTo(
                  this.ship.position,
                  { z: -5 },
                  { z: -30, ease: "power1.out", duration: 0.5 * t },
                  0.35
                ),
                e.fromTo(
                  this.ship.position,
                  { y: -5 },
                  { y: 0, ease: "power3.out", duration: 0.5 * t },
                  0.35
                ),
                e.fromTo(
                  this.shipContainer2.position,
                  { z: -30 },
                  { z: -26, ease: "power1.out", duration: 0.4 * t },
                  0.3
                ),
                e.fromTo(
                  this.ship2.position,
                  { z: 30 },
                  { z: -60, ease: "power1.out", duration: 0.4 * t },
                  0.3
                ),
                e.fromTo(
                  this.ship2.rotation,
                  { z: 1.06 },
                  { z: 0, ease: "power3.out", duration: 0.4 * t },
                  0.3
                ),
                e.set(this.ship2, { visible: !1 }, 0.5),
                e.fromTo(
                  this.ship.material.uniforms.minBlur,
                  { value: 0.02 },
                  { value: 0.08, ease: "none", duration: 0.2 * t },
                  0.3
                ),
                e.from(
                  this.ship.material.uniforms.maxOpacity,
                  { value: 0, ease: "none", duration: 0.04 * t },
                  0.3
                ),
                e.set(this.planetShipsOrbit, { visible: !1 }, 0.6),
                e.set(this.planets, { visible: !0 }, 0.6),
                e.fromTo(
                  this.planets.material.uniforms.maxOpacity,
                  { value: 0 },
                  { value: 0.137, ease: "none", duration: 0.05 * t },
                  0.65
                ),
                e.to(
                  this.planets.material.uniforms.maxOpacity,
                  { value: 0.578, ease: "none", duration: 0.05 * t },
                  0.74
                ),
                e.from(
                  this.planets.material.uniforms.radiusScaleFactor,
                  { value: 50, ease: "none", duration: 0.3 * t },
                  0.65
                ),
                e.fromTo(
                  this.planets.material.uniforms.minBlur,
                  { value: 0.001 },
                  { value: 0.045, ease: "none", duration: 0.25 * t },
                  0.65
                ),
                e.to(
                  this.planets.rotation,
                  { y: 0.71, ease: "power1.inOut", duration: 0.35 * t },
                  0.65
                ),
                e.to(
                  this.planets.position,
                  { z: 10, ease: "none", duration: 0.3 * t },
                  0.65
                ),
                e.to(
                  this.planets.position,
                  { y: 2, ease: "power1.inOut", duration: 0.3 * t },
                  0.65
                ),
                e.to(
                  this.planets.material.uniforms.focusNear,
                  { value: 20, ease: "none", duration: 0.15 * t },
                  0.65
                ),
                e.to(
                  this.planets.material.uniforms.focusFadeOutLength,
                  { value: 3, ease: "none", duration: 0.15 * t },
                  0.65
                ),
                e.to(
                  this.planets.material.uniforms.maxOpacity,
                  { value: 0, ease: "none", duration: 0.1 * t },
                  0.8
                ),
                e.set(this.planets, { visible: !1 }, 0.9);
              var s = l.b.timeline({
                paused: !0,
                onUpdate: this.setActiveExploreItem,
              });
              s.set(
                this.exploreButton.container,
                { pointerEvents: "none", duration: 0 },
                0.19
              ),
                s.set(
                  this.exploreButton.container,
                  { pointerEvents: "auto", duration: 0 },
                  0.2
                ),
                s.fromTo(
                  this.exploreButton.container,
                  { opacity: 0 },
                  { opacity: 1, ease: "sine.out", duration: 0.2 },
                  0.2
                ),
                s.fromTo(
                  this.exploreButton.container,
                  { opacity: 1 },
                  { opacity: 0, ease: "sine.out", duration: 0.2 },
                  0.8
                ),
                s.set(
                  this.exploreButton.container,
                  { pointerEvents: "none", duration: 0 },
                  1
                ),
                e.to(
                  s,
                  { progress: 1, ease: "none", duration: 0.25 * t },
                  0.62
                );
              const o = M.a.create(
                "custom",
                "M0,0 C0.632,0.674 0.656,0.708 0.786,0.854 0.852,0.928 0.918,1 1,1 "
              );
              return (
                e.to(
                  this.cameraWrapper.position,
                  { z: 130, ease: o, duration: this.duration },
                  0
                ),
                e.to(
                  this.cameraLookAtPoint.position,
                  { z: 150, ease: o, duration: this.duration },
                  0
                ),
                e.to(
                  this.main,
                  { mousePanAmount: 2, mouseMoveAmount: 2, duration: 0.1 },
                  0.9
                ),
                this.scrollTimeline.to(
                  e,
                  { progress: 1, duration: 0.88 * this.duration, ease: "none" },
                  0
                ),
                this.scrollTimeline.to(
                  this.makeChoice.timeline,
                  { progress: 1, duration: 0.3 * this.duration, ease: "none" },
                  0.7
                ),
                this.scrollTimeline.set(
                  this.chapterWrapper,
                  { visible: !0 },
                  0.999
                ),
                this.scrollTimeline.set(
                  this.chapterWrapper,
                  { visible: !1 },
                  1
                ),
                this.scrollTimeline
              );
            }),
            (this.dollyZoom = new h(this.camera, this.cameraLookAtPoint)),
            (this.dollyZoom2 = new h(this.camera, this.cameraLookAtPoint)),
            (this.dollyZoom3 = new h(this.camera, this.cameraLookAtPoint)),
            (this.dollyZoom4 = new h(this.camera, this.cameraLookAtPoint)),
            (this.dollyZoom5 = new h(this.camera, this.cameraLookAtPoint)),
            (this.dollyZoom6 = new h(this.camera, this.cameraLookAtPoint)),
            (this.makeChoice = new k(
              document.querySelectorAll(".MakeChoice")[0]
            ));
        }
        getLoadItems() {
          return [
            ["particles/planet_ships_orbit/0.drc", "planet_ships_orbit"],
            ["particles/pearce_ship/pearce.drc", "ship"],
            ["particles/multiple_planets/0.drc", "planets"],
          ];
        }
        loadDone() {
          super.loadDone(), this.createChapterRings();
        }
        createChapterRings() {
          for (let t = 0; t < 14; t++) {
            const e = new w(
              this.chapterWrapper,
              10,
              100,
              0,
              2 * Math.PI,
              this.menu,
              "ring",
              new s.Color(524802),
              null,
              this.ringsMaterial
            );
            this.rings.push(e),
              (e.points.position.z = 10 - 10 * t),
              l.b.to(e.points.rotation, {
                z: Math.PI,
                duration: 50 + 10 * t,
                repeat: -1,
                ease: "none",
              });
          }
        }
      }
      class Z {
        constructor(t, e, i, o) {
          (this.group = new s.Group()),
            (this.setupGeometry = (t, e, i) => {
              let o;
              for (let e = 0; e < this.chapters; e++) {
                const i = (e - 1) * m.a.CHAPTER_DISTANCE;
                for (let e = 0; e < 3; e++)
                  (o = new s.Points(t, this.material)).scale.set(0.1, 0.1, 0.1),
                    o.position.set(0, 0, i + e * (5087.172 / 10)),
                    l.b.to(o.rotation, {
                      z: 2 * Math.PI,
                      ease: "none",
                      repeat: -1,
                      duration: 200,
                    }),
                    l.b.to(o.position, {
                      z: "-=" + 5087.172 / 10,
                      ease: "none",
                      repeat: -1,
                      duration: 100,
                    }),
                    this.group.add(o);
              }
            }),
            (this.chapters = i),
            (this.container = e),
            (this.material = new x(
              {
                focusNear: 0.01,
                focusFar: 160,
                focusFadeOutLength: 28,
                maxBlur: 0.11,
                minBlur: 0.05,
                minOpacity: 0,
                maxOpacity: 0.28,
              },
              o,
              "ClusterCloud"
            )),
            this.container.add(this.group),
            t.addLoadItem({
              path: "particles/clusters/0.drc",
              name: "cluster",
              doneCallback: this.setupGeometry,
            });
        }
      }
      class N {
        constructor(t) {
          (this.container = document.querySelector(".ExploreNav")),
            (this.links = Array.from(this.container.querySelectorAll("a"))),
            (this.lines = Array.from(
              this.container.querySelectorAll(".ExploreNav-line")
            )),
            (this.linesInner = Array.from(
              this.container.querySelectorAll(".ExploreNav-lineInner")
            )),
            (this.linesProgress = Array.from(
              this.container.querySelectorAll(".ExploreNav-lineProgress")
            )),
            (this.diamonds = Array.from(
              this.container.querySelectorAll(".ExploreNav-diamond")
            )),
            (this.innerDiamonds = Array.from(
              this.container.querySelectorAll(".innerDiamond")
            )),
            (this.outerDiamonds = Array.from(
              this.container.querySelectorAll(".outerDiamond")
            )),
            (this.highlightDiamonds = Array.from(
              this.container.querySelectorAll(".highlightDiamond")
            )),
            (this.highlightDiamondOuters = Array.from(
              this.container.querySelectorAll(".highlightDiamondOuter")
            )),
            (this.diamondLabels = Array.from(
              this.container.querySelectorAll(".ExploreNav-diamond span")
            )),
            (this.linksTimeline = l.b.timeline({ paused: !0 })),
            (this.expandTime = 0.01),
            (this.ease = "sine.inOut"),
            (this.dummyTime = 0),
            (this.dummyTime2 = 0),
            (this.onResize = () => {
              window.innerWidth >= 768 && window.innerHeight >= 768
                ? this.buildLinksDisplaceTimeline(!1)
                : this.buildLinksDisplaceTimeline(!0);
            }),
            (this.gotoChapter = t);
        }
        setupTimeline(t) {
          (this.chapterLengths = t),
            (this.timeline = l.b.timeline({ paused: !0 })),
            this.timeline.to(this, { dummyTime: 1, duration: 1 }, 0),
            this.linksTimeline.to(this, { dummyTime2: 1, duration: 1 }, 0);
          var e = 0;
          const i = this.ease;
          t.forEach((t, s) => {
            let o = l.b.timeline({ paused: !0 });
            o.to(
              this.diamondLabels[s],
              { opacity: 1, duration: this.expandTime, ease: i },
              0
            ),
              o.to(
                this.highlightDiamonds[s],
                { opacity: 1, duration: this.expandTime, ease: i },
                0
              ),
              o.to(
                this.innerDiamonds[s],
                { opacity: 0, scale: 0.2, duration: this.expandTime, ease: i },
                0
              ),
              o.to(
                this.outerDiamonds[s],
                { opacity: 0, duration: this.expandTime, ease: i },
                0
              ),
              o.fromTo(
                this.highlightDiamondOuters[s],
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 0.2, duration: this.expandTime, ease: i },
                0
              ),
              o.to(
                this.linesInner[s],
                { yPercent: 0, duration: this.expandTime, ease: i },
                0
              ),
              o.to(
                this.linesProgress[s],
                { scaleY: 1, duration: 1 - this.expandTime, ease: "none" },
                0
              ),
              o.to(
                this.linesInner[s],
                { yPercent: -50, duration: this.expandTime, ease: i },
                1 - this.expandTime
              ),
              o.to(
                this.linesProgress[s],
                {
                  scaleY: 0.535,
                  opacity: 0,
                  duration: this.expandTime,
                  ease: i,
                },
                1 - this.expandTime
              ),
              o.to(
                this.diamondLabels[s],
                { opacity: 0, duration: this.expandTime, ease: i },
                1 - this.expandTime
              ),
              o.to(
                this.highlightDiamonds[s],
                { opacity: 0, duration: this.expandTime, ease: i },
                1 - this.expandTime
              ),
              o.to(
                this.innerDiamonds[s],
                { opacity: 1, scale: 1, duration: this.expandTime, ease: i },
                1 - this.expandTime
              ),
              o.to(
                this.outerDiamonds[s],
                { opacity: 1, duration: this.expandTime, ease: i },
                1 - this.expandTime
              ),
              o.to(
                this.highlightDiamondOuters[s],
                { scale: 0.8, opacity: 0, duration: this.expandTime, ease: i },
                1 - this.expandTime
              ),
              this.timeline.to(
                o,
                { progress: 1, ease: "none", duration: t },
                e
              ),
              (e += t);
          }),
            this.timeline.to(
              this.linksTimeline,
              { progress: 1, ease: "none", duration: 1 },
              0
            ),
            this.links.forEach((t, e) => {
              const i = e;
              t.addEventListener(
                "click",
                (t) => (t.preventDefault(), this.gotoChapter(i), !1)
              );
            }),
            window.addEventListener("resize", this.onResize),
            this.onResize();
        }
        buildLinksDisplaceTimeline() {
          let t =
            arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
          var e = 0,
            i = this.linksTimeline.progress();
          this.linksTimeline.pause(0).render(0).clear(),
            this.chapterLengths.forEach((i, s) => {
              let o = l.b.timeline({ paused: !0 });
              const a = this.links.slice(s + 1, this.lines.length + 1);
              o.to(
                a,
                { y: t ? 26 : 60, duration: this.expandTime, ease: this.ease },
                0
              ),
                o.to(
                  a,
                  { y: 0, duration: this.expandTime, ease: this.ease },
                  1 - this.expandTime
                ),
                this.linksTimeline.to(
                  o,
                  { progress: 1, ease: "none", duration: i },
                  e
                ),
                (e += i);
            }),
            this.linksTimeline.progress(i);
        }
      }
      class H extends _ {
        constructor(t, e, i, o, a, n, r, u, c, d, p) {
          super(t, e, i, o, a, n, r, u, c, d, p),
            (this.planetLinkContainer = new s.Object3D()),
            (this.ringsWrapper = new s.Group()),
            (this.CHAPTER_OFFSET = 0.005),
            (this.SCROLL_LENGTH = 15),
            (this.itemLoaded = (t, e, i) => {
              if ("asteroids" === i) {
                var o = new x(
                    {
                      minOpacity: 0,
                      minBlur: 0.02,
                      maxOpacity: 0.225,
                      maxBlur: 0.21,
                      focusNear: 11,
                      focusFar: 90,
                      focusFadeOutLength: 3.76,
                      radiusScaleFactor: 100,
                    },
                    this.menu,
                    i
                  ),
                  a = new s.Points(t, o);
                this.sortPoints.push(a),
                  (this.asteroids = a),
                  a.scale.set(-1, 1, 1),
                  a.position.set(-26.42, -2.03, -60),
                  a.rotation.set(-0.45, -0.35, 0),
                  (a.visible = !1),
                  this.chapterWrapper.add(a);
              } else if ("mining_station" === i) {
                o = new x(
                  {
                    focusNear: 9.7,
                    focusFar: 60,
                    focusFadeOutLength: 3.76,
                    minOpacity: 0,
                    maxOpacity: 0.7,
                    maxBlur: 0.28,
                    minBlur: 0.03,
                    radiusScaleFactor: 100,
                  },
                  this.menu,
                  i
                );
                (a = new s.Points(t, o)).scale.set(-1, 1, 1),
                  this.sortPoints.push(a),
                  (this.miningStation = a),
                  (this.miningStation.rotation.y = 0.5 * Math.PI),
                  (this.stationContainer = new s.Object3D()),
                  this.stationContainer.position.set(-5.7, -3.55, -8.83),
                  (this.stationContainer.rotation.y = 0.35),
                  this.stationContainer.add(this.miningStation);
                var n = new x(
                  {
                    focusNear: 9.7,
                    focusFar: 60,
                    focusFadeOutLength: 3.76,
                    minOpacity: 0,
                    maxOpacity: 0.7,
                    maxBlur: 0.28,
                    minBlur: 0.03,
                    radiusScaleFactor: 100,
                  },
                  this.menu,
                  i
                );
                (this.miningStation2 = new s.Points(t, n)),
                  this.miningStation2.scale.set(-1, 1, 1),
                  (this.miningStation2.name = "miningStation2"),
                  this.miningStation2.position.set(-4.28, -1.28, 36.32),
                  this.miningStation2.rotation.set(-0.45, -11.769, 0),
                  this.exploreAnchor.position.set(-4.9, 0.9, 3.53),
                  this.miningStation2.add(this.exploreAnchor),
                  this.sortPoints.push(this.miningStation2),
                  (a = this.stationContainer),
                  this.chapterWrapper.add(a),
                  this.chapterWrapper.add(this.miningStation2);
              } else if ("planet" === i) {
                o = new x(
                  {
                    focusNear: 9.7,
                    focusFar: 41,
                    focusFadeOutLength: 3.76,
                    minOpacity: 0,
                    maxOpacity: 0.589,
                    maxBlur: 0.12,
                    minBlur: 0.03,
                    radiusScaleFactor: 100,
                  },
                  this.menu,
                  i
                );
                (a = new s.Points(t, o)).scale.set(-1, 1, 1),
                  this.sortPoints.push(a),
                  (this.miningStationPlanet = a),
                  (this.miningStationPlanet.rotation.y = 0.5 * Math.PI + 0.35),
                  this.miningStationPlanet.position.set(-5.7, -3.55, -8.83),
                  this.chapterWrapper.add(a);
              }
              a.name = i;
            }),
            (this.setupScrollTimeline = () => {
              const t = this.duration;
              this.scrollTimeline.set(this.chapterWrapper, { visible: !1 }, 0),
                this.scrollTimeline.set(
                  this.chapterWrapper,
                  { visible: !0 },
                  0.001
                ),
                this.scrollTimeline.to(
                  this,
                  { scrollProgress: 1, ease: "none", duration: this.duration },
                  0
                ),
                this.scrollTimeline.fromTo(
                  this.chapterIntroClass.timeline,
                  { progress: 1 },
                  { progress: 0, ease: "none", duration: 0.1 * 0.45 },
                  0
                ),
                this.scrollTimeline.to(
                  this.chapterIntroClass.timeline,
                  { progress: 1, ease: "none", duration: 0.03 },
                  0.125
                ),
                this.scrollTimeline.fromTo(
                  this.ringsWrapper.position,
                  { z: 20 },
                  { z: 0, ease: "none", duration: 0.1 },
                  0
                ),
                this.scrollTimeline.from(
                  this.ringsMaterial.uniforms.maxOpacity,
                  { value: 0, duration: 0.05 },
                  0.1 * 0.45
                ),
                this.scrollTimeline.to(
                  this.dollyZoom7,
                  {
                    totalProgress: 1,
                    duration: 0.1 * 0.75,
                    ease: "power1.inOut",
                    onUpdate: () =>
                      this.dollyZoom7.update(15, 4.32207356734125, 55),
                  },
                  0
                ),
                this.scrollTimeline.to(
                  this.main.clusterCloud.material.uniforms.focusFar,
                  { value: 160, ease: "power1.inOut", duration: 0.1 * 0.75 },
                  0
                );
              const e = l.b.timeline({ paused: !0 });
              var i = l.b.timeline({ paused: !0 });
              i.to({ dummy: 0 }, { dummy: 1, duration: 100 }, 0),
                i.to(
                  this.ringsMaterial.uniforms.focusFar,
                  { value: 0.01, ease: "power1.inOut", duration: 4 },
                  0
                ),
                i.to(
                  this.ringsMaterial.uniforms.focusFadeOutLength,
                  { value: 24, ease: "sine.out", duration: 5 },
                  0
                ),
                i.to(
                  this.main.clusterCloud.material.uniforms.focusFar,
                  { value: 51, ease: "sine.out", duration: 4 },
                  0
                ),
                i.to(
                  this.main,
                  { mousePanAmount: 4, mouseMoveAmount: 1, duration: 10 },
                  0
                ),
                i.to(
                  this.dollyZoom,
                  {
                    totalProgress: 1,
                    duration: 7,
                    ease: "power1.inOut",
                    onUpdate: () => this.dollyZoom.update(110, 100, 15),
                  },
                  0
                ),
                i.to(
                  this.dollyZoom2,
                  {
                    totalProgress: 1,
                    duration: 12,
                    ease: "power1.inOut",
                    onUpdate: () => this.dollyZoom2.update(55, 3, 110),
                  },
                  10
                ),
                i.to(
                  this.dollyZoom3,
                  {
                    totalProgress: 1,
                    duration: 6,
                    ease: "sine.inOut",
                    onUpdate: () => this.dollyZoom3.update(110, 20, 55),
                  },
                  30
                ),
                i.to(
                  this.dollyZoom4,
                  {
                    totalProgress: 1,
                    duration: 12,
                    ease: "power1.inOut",
                    onUpdate: () => this.dollyZoom4.update(55, 3, 110),
                  },
                  40
                ),
                i.to(
                  this.dollyZoom5,
                  {
                    totalProgress: 1,
                    duration: 6,
                    ease: "sine.inOut",
                    onUpdate: () => this.dollyZoom5.update(110, 20, 55),
                  },
                  70
                ),
                i.to(
                  this.dollyZoom6,
                  {
                    totalProgress: 1,
                    duration: 10,
                    ease: "sine.inOut",
                    onUpdate: () => this.dollyZoom6.update(55, 8, 110),
                  },
                  80
                ),
                e.to(i, { progress: 1, ease: "none", duration: 0.9 * t }, 0),
                e.to(
                  this.chapterPOIs[0].timeline,
                  { progress: 1, ease: "none", duration: 0.25 * t },
                  0.08
                ),
                e.to(
                  this.chapterPOIs[1].timeline,
                  { progress: 1, ease: "none", duration: 0.25 * t },
                  0.4
                ),
                e.set(this.asteroids, { visible: !0 }, 0),
                e.fromTo(
                  this.asteroids.material.uniforms.maxOpacity,
                  { value: 0 },
                  { value: 0.578, ease: "none", duration: 0.1 * t },
                  0.05
                ),
                e.to(
                  this.asteroids.material.uniforms.minBlur,
                  { value: 0.04, ease: "none", duration: 0.35 * t },
                  0.1
                ),
                e.fromTo(
                  this.asteroids.rotation,
                  { y: -0.9 },
                  { y: 0.71, ease: "power1.inOut", duration: 0.5 * t },
                  0
                ),
                e.fromTo(
                  this.asteroids.position,
                  { y: -4 },
                  { y: 4, ease: "power1.inOut", duration: 0.5 * t },
                  0.05
                ),
                e.to(
                  this.asteroids.position,
                  { z: "+=3", ease: "power1.inOut", duration: 0.3 * t },
                  0.1
                ),
                e.to(
                  this.asteroids.material.uniforms.maxOpacity,
                  { value: 0, ease: "none", duration: 0.1 * t },
                  0.3
                ),
                e.set(this.asteroids, { visible: !1 }, 0.8),
                e.from(
                  this.miningStation.material.uniforms.maxOpacity,
                  { value: 0, ease: "none", duration: 0.1 * t },
                  0.4
                ),
                e.fromTo(
                  this.stationContainer.rotation,
                  { x: -0.09, y: 0 },
                  { x: 0, y: 0.95, ease: "power1.in", duration: 0.45 * t },
                  0.25
                ),
                e.to(
                  this.miningStationPlanet.position,
                  { z: -26.48, ease: "power1.inOut", duration: 0.2 * t },
                  0.6
                ),
                e.from(
                  this.miningStation2.material.uniforms.maxOpacity,
                  { value: 0, ease: "none", duration: 0.15 * t },
                  0.71
                ),
                e.from(
                  this.miningStation2.rotation,
                  { y: "+=1", ease: "power1.in", duration: 1 - 0.71 },
                  0.71
                ),
                e.to(
                  this.miningStation2.position,
                  { z: "-=10", ease: "power1.inOut", duration: 1 - 0.71 },
                  0.71
                ),
                e.to(
                  this.miningStation2.position,
                  { y: 6.375, ease: "power1.in", duration: 1 - 0.71 },
                  0.71
                ),
                e.to(
                  this.miningStation2.material.uniforms.maxOpacity,
                  { value: 0, ease: "none", duration: 0.01 * t },
                  0.99
                ),
                e.to(
                  this.miningStation2.material.uniforms.minBlur,
                  { value: 0.14, ease: "none", duration: 0.07 * t },
                  0.93
                ),
                e.to(
                  this.miningStation2.material.uniforms.maxBlur,
                  { value: 0.63, ease: "none", duration: 0.07 * t },
                  0.93
                ),
                e.to(
                  this.miningStation2.material.uniforms.focusNear,
                  { value: 40.019, ease: "none", duration: 0.07 * t },
                  0.93
                );
              var s = l.b.timeline({
                paused: !0,
                onUpdate: this.setActiveExploreItem,
              });
              s.set(
                this.exploreButton.container,
                { pointerEvents: "none", duration: 0 },
                0.19
              ),
                s.set(
                  this.exploreButton.container,
                  { pointerEvents: "auto", duration: 0 },
                  0.2
                ),
                s.to(
                  this.exploreButton.container,
                  { opacity: 1, ease: "sine.out", duration: 0.2 },
                  0.2
                ),
                s.to(
                  this.exploreButton.container,
                  { opacity: 0, ease: "sine.out", duration: 0.2 },
                  0.8
                ),
                s.set(
                  this.exploreButton.container,
                  { pointerEvents: "none", duration: 0 },
                  1
                ),
                e.to(s, { progress: 1, ease: "none", duration: 0.24 * t }, 0.7);
              const o = M.a.create(
                "custom",
                "M0,0 C0.632,0.674 0.656,0.708 0.786,0.854 0.852,0.928 0.918,1 1,1 "
              );
              return (
                e.to(
                  this.cameraWrapper.position,
                  {
                    z: 130 + 122 * (this.index - 1),
                    ease: o,
                    duration: this.duration,
                  },
                  0
                ),
                e.to(
                  this.cameraLookAtPoint.position,
                  {
                    z: 150 + this.CHAPTER_DISTANCE * (this.index - 1),
                    ease: o,
                    duration: this.duration,
                  },
                  0
                ),
                e.to(
                  this.main,
                  { mousePanAmount: 2, mouseMoveAmount: 2, duration: 0.1 },
                  0.9
                ),
                this.scrollTimeline.to(
                  e,
                  { progress: 1, duration: this.duration - 0.1, ease: "none" },
                  0.1
                ),
                this.scrollTimeline.set(
                  this.chapterWrapper,
                  { visible: !0 },
                  0.999
                ),
                this.scrollTimeline.set(
                  this.chapterWrapper,
                  { visible: !1 },
                  1
                ),
                this.scrollTimeline
              );
            }),
            (this.dollyZoom = new h(this.camera, this.cameraLookAtPoint)),
            (this.dollyZoom2 = new h(this.camera, this.cameraLookAtPoint)),
            (this.dollyZoom3 = new h(this.camera, this.cameraLookAtPoint)),
            (this.dollyZoom4 = new h(this.camera, this.cameraLookAtPoint)),
            (this.dollyZoom5 = new h(this.camera, this.cameraLookAtPoint)),
            (this.dollyZoom6 = new h(this.camera, this.cameraLookAtPoint)),
            (this.dollyZoom7 = new h(this.camera, this.cameraLookAtPoint)),
            this.chapterWrapper.add(this.ringsWrapper);
        }
        getLoadItems() {
          return [
            ["particles/mining_station/new2/0.drc", "mining_station"],
            ["particles/mining_station/planet/0.drc", "planet"],
            ["particles/multiple_asteroids/0.drc", "asteroids"],
          ];
        }
        loadDone() {
          super.loadDone(), this.createChapterRings();
        }
        createChapterRings() {
          for (let t = 0; t < 14; t++) {
            const e = new w(
              this.ringsWrapper,
              10,
              100,
              0,
              2 * Math.PI,
              this.menu,
              "ring",
              new s.Color(524802),
              null,
              this.ringsMaterial
            );
            this.rings.push(e),
              (e.points.position.z = 10 - 10 * t),
              l.b.to(e.points.rotation, {
                z: Math.PI,
                duration: 50 + 10 * t,
                repeat: -1,
                ease: "none",
              });
          }
        }
      }
      class G extends _ {
        constructor(t, e, i, o, a, n, r, u, c, d, p) {
          super(t, e, i, o, a, n, r, u, c, d, p),
            (this.ringsWrapper = new s.Group()),
            (this.CHAPTER_OFFSET = 0.01),
            (this.SCROLL_LENGTH = 15),
            (this.itemLoaded = (t, e, i) => {
              if ("cosmonaut" === i) {
                var o = new x(
                  {
                    useFocusCenter: !1,
                    focusNear: 7.5,
                    focusFar: 18.5,
                    focusFadeOutLength: 3.766,
                    minOpacity: 0,
                    maxOpacity: 0.335,
                    maxBlur: 0.46,
                    radiusScaleFactor: 100,
                    minBlur: 0.07,
                  },
                  this.menu,
                  i
                );
                (a = new s.Points(t, o)).scale.set(-1, 1, 1),
                  this.sortPoints.push(a),
                  (this.cosmonaut = a),
                  (this.cosmonaut.position.x = -3.8),
                  (this.cosmonautContainer = new s.Object3D()),
                  this.cosmonautContainer.position.set(0, -4.27, -13.76),
                  this.cosmonautContainer.add(this.cosmonaut),
                  l.b.to(this.cosmonaut.position, {
                    y: 0.5,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: !0,
                    duration: 5,
                  }),
                  (a = this.cosmonautContainer);
              } else if ("capital_ship" === i) {
                (this.capitalShipContainer = new s.Object3D()),
                  this.capitalShipContainer.position.set(0, 7, -20),
                  (this.capitalShipContainer2 = new s.Object3D()),
                  this.capitalShipContainer2.position.set(0, -0.63, 40),
                  (this.capitalShipContainer3 = new s.Object3D()),
                  this.capitalShipContainer3.position.set(0, -0.63, 40);
                o = new x(
                  {
                    useFocusCenter: !1,
                    focusNear: 10,
                    focusFar: 50,
                    focusFadeOutLength: 9.5,
                    minOpacity: 0,
                    maxOpacity: 0.214,
                    maxBlur: 0.2,
                    radiusScaleFactor: 100,
                    minBlur: 0.05,
                  },
                  this.menu,
                  i
                );
                (a = new s.Points(t, o)).scale.set(-1, 1, 1),
                  this.sortPoints.push(a),
                  (this.capitalShip = a),
                  (this.capitalShip2 = new s.Points(t, o)),
                  this.capitalShip2.scale.set(-1, 1, 1),
                  this.capitalShipContainer2.rotation.set(-0.08, 0.33, 0),
                  this.sortPoints.push(this.capitalShip2),
                  this.capitalShipContainer2.add(this.capitalShip2),
                  (this.capitalShip3 = new s.Points(t, o)),
                  this.capitalShip3.scale.set(-1, 1, 1),
                  this.capitalShipContainer3.rotation.set(-0.08, -0.33, 0),
                  this.sortPoints.push(this.capitalShip3),
                  this.capitalShipContainer3.add(this.capitalShip3),
                  (this.exploreAnchor.position.y = 2.8),
                  this.capitalShip.add(this.exploreAnchor),
                  this.capitalShipContainer.add(this.capitalShip),
                  this.chapterWrapper.add(this.capitalShipContainer2),
                  this.chapterWrapper.add(this.capitalShipContainer3),
                  (a = this.capitalShipContainer);
              } else if ("calico_yacht" === i) {
                var a;
                o = new x(
                  {
                    useFocusCenter: !1,
                    focusNear: 7.5,
                    focusFar: 18.5,
                    focusFadeOutLength: 3.766,
                    minOpacity: 0,
                    maxOpacity: 0.214,
                    maxBlur: 0.46,
                    radiusScaleFactor: 100,
                    minBlur: 0.05,
                  },
                  this.menu,
                  i
                );
                (a = new s.Points(t, o)).scale.set(-1, 1, 1),
                  this.sortPoints.push(a),
                  (this.calicoYacht = a),
                  (this.calicoYachtContainer = new s.Object3D()),
                  this.calicoYachtContainer.position.set(0, 0, -77),
                  (this.calicoYachtContainer.rotation.x = -1),
                  this.calicoYachtContainer.add(this.calicoYacht),
                  l.b.to(a.rotation, {
                    y: 2 * Math.PI,
                    ease: "none",
                    repeat: -1,
                    duration: 200,
                  }),
                  l.b.to(a.position, {
                    y: 0.5,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: !0,
                    duration: 5,
                  }),
                  (a = this.calicoYachtContainer);
              }
              (a.name = i), this.chapterWrapper.add(a);
            }),
            (this.setupScrollTimeline = () => {
              const t = this.duration;
              this.scrollTimeline.set(this.chapterWrapper, { visible: !1 }, 0),
                this.scrollTimeline.set(
                  this.chapterWrapper,
                  { visible: !0 },
                  0.001
                ),
                this.scrollTimeline.to(
                  this,
                  { scrollProgress: 1, ease: "none", duration: this.duration },
                  0
                ),
                this.scrollTimeline.fromTo(
                  this.chapterIntroClass.timeline,
                  { progress: 1 },
                  { progress: 0, ease: "none", duration: 0.1 * 0.45 },
                  0
                ),
                this.scrollTimeline.to(
                  this.chapterIntroClass.timeline,
                  { progress: 1, ease: "none", duration: 0.03 },
                  0.125
                ),
                this.scrollTimeline.fromTo(
                  this.ringsWrapper.position,
                  { z: 20 },
                  { z: 0, ease: "none", duration: 0.1 },
                  0
                ),
                this.scrollTimeline.from(
                  this.ringsMaterial.uniforms.maxOpacity,
                  { value: 0, duration: 0.05 },
                  0.1 * 0.45
                ),
                this.scrollTimeline.to(
                  this.dollyZoom7,
                  {
                    totalProgress: 1,
                    duration: 0.1 * 0.75,
                    ease: "power1.inOut",
                    onUpdate: () =>
                      this.dollyZoom7.update(15, 4.32207356734125, 55),
                  },
                  0
                ),
                this.scrollTimeline.to(
                  this.main.clusterCloud.material.uniforms.focusFar,
                  { value: 160, ease: "power1.inOut", duration: 0.1 * 0.75 },
                  0
                );
              const e = l.b.timeline({ paused: !0 });
              var i = l.b.timeline({ paused: !0 });
              i.to({ dummy: 0 }, { dummy: 1, duration: 100 }, 0),
                i.to(
                  this.ringsMaterial.uniforms.focusFar,
                  { value: 0.01, ease: "power1.inOut", duration: 4 },
                  0
                ),
                i.to(
                  this.ringsMaterial.uniforms.focusFadeOutLength,
                  { value: 24, ease: "sine.out", duration: 5 },
                  0
                ),
                i.to(
                  this.main.clusterCloud.material.uniforms.focusFar,
                  { value: 51, ease: "sine.out", duration: 4 },
                  0
                ),
                i.to(
                  this.main,
                  { mousePanAmount: 4, mouseMoveAmount: 1, duration: 10 },
                  0
                ),
                i.to(
                  this.dollyZoom,
                  {
                    totalProgress: 1,
                    duration: 7,
                    ease: "power1.inOut",
                    onUpdate: () => this.dollyZoom.update(110, 100, 15),
                  },
                  0
                ),
                i.to(
                  this.dollyZoom2,
                  {
                    totalProgress: 1,
                    duration: 12,
                    ease: "power1.inOut",
                    onUpdate: () => this.dollyZoom2.update(55, 3, 110),
                  },
                  10
                ),
                i.to(
                  this.dollyZoom3,
                  {
                    totalProgress: 1,
                    duration: 6,
                    ease: "sine.inOut",
                    onUpdate: () => this.dollyZoom3.update(110, 20, 55),
                  },
                  30
                ),
                i.to(
                  this.dollyZoom4,
                  {
                    totalProgress: 1,
                    duration: 12,
                    ease: "power1.inOut",
                    onUpdate: () => this.dollyZoom4.update(55, 3, 110),
                  },
                  40
                ),
                i.to(
                  this.dollyZoom5,
                  {
                    totalProgress: 1,
                    duration: 6,
                    ease: "sine.inOut",
                    onUpdate: () => this.dollyZoom5.update(110, 20, 55),
                  },
                  70
                ),
                i.to(
                  this.dollyZoom6,
                  {
                    totalProgress: 1,
                    duration: 10,
                    ease: "sine.inOut",
                    onUpdate: () => this.dollyZoom6.update(55, 8, 110),
                  },
                  80
                ),
                e.to(i, { progress: 1, ease: "none", duration: 0.9 * t }, 0),
                e.from(
                  this.calicoYacht.material.uniforms.maxOpacity,
                  { value: 0, ease: "none", duration: 0.1 * t },
                  0
                ),
                e.to(
                  this.calicoYachtContainer.position,
                  { z: -60, ease: "sine.inOut", duration: 0.25 * t },
                  0.2
                ),
                e.to(
                  this.calicoYacht.rotation,
                  { x: 0.91, ease: "sine.out", duration: 0.3 * t },
                  0.2
                ),
                e.from(
                  this.cosmonaut.material.uniforms.maxOpacity,
                  { value: 0, ease: "none", duration: 0.4 * t },
                  0.3
                ),
                e.fromTo(
                  this.cosmonaut.material.uniforms.focusFar,
                  { value: 31.785 },
                  { value: 25.785, ease: "none", duration: 0.2 * t },
                  0.3
                ),
                e.from(
                  this.cosmonaut.material.uniforms.maxBlur,
                  { value: 0.05, ease: "none", duration: 0.4 * t },
                  0.3
                ),
                e.fromTo(
                  this.cosmonautContainer.rotation,
                  { y: 0 },
                  { y: -0.438, ease: "none", duration: 0.5 * t },
                  0.3
                ),
                e.from(
                  this.cosmonautContainer.position,
                  { z: -26.307, y: -6.32, ease: "none", duration: 0.4 * t },
                  0.3
                ),
                e.fromTo(
                  this.cosmonaut.rotation,
                  { y: -0.95 },
                  { y: 1.35, ease: "power1.inOut", duration: 0.4 * t },
                  0.3
                ),
                e.to(
                  this.cosmonaut.position,
                  { x: 0.74, ease: "sine.inOut", duration: 0.4 * t },
                  0.3
                ),
                e.from(
                  this.capitalShip.material.uniforms.maxOpacity,
                  { value: 0, ease: "none", duration: 0.1 * t },
                  0.65
                ),
                e.to(
                  this.capitalShip.material.uniforms.focusFadeOutLength,
                  { value: 9, ease: "none", duration: 0.1 * t },
                  0.6
                ),
                e.to(
                  this.capitalShip.material.uniforms.focusNear,
                  { value: 12, ease: "none", duration: 0.1 * t },
                  0.6
                ),
                e.to(
                  this.capitalShipContainer.position,
                  { y: -0.63, z: 40, ease: "power3.out", duration: 0.2 * t },
                  0.7
                ),
                e.fromTo(
                  this.capitalShip2.position,
                  { z: -60, x: 16, y: 0 },
                  {
                    x: 12.77,
                    z: 5,
                    y: -5.22,
                    ease: "power3.out",
                    duration: 0.1 * t,
                  },
                  0.74
                ),
                e.fromTo(
                  this.capitalShip3.position,
                  { z: -60, x: -16, y: 0 },
                  {
                    x: -12.77,
                    z: 5,
                    y: -5.22,
                    ease: "power3.out",
                    duration: 0.1 * t,
                  },
                  0.75
                ),
                e.to(
                  this.capitalShip.position,
                  { z: -51, ease: "power3.in", duration: 0.1 * t },
                  0.9
                ),
                e.to(
                  this.capitalShip2.position,
                  { z: 51, ease: "power3.in", duration: 0.1 * t },
                  0.9
                ),
                e.to(
                  this.capitalShip3.position,
                  { z: 51, ease: "power3.in", duration: 0.1 * t },
                  0.9
                ),
                e.to(
                  this.chapterPOIs[0].timeline,
                  { progress: 1, ease: "none", duration: 0.25 * t },
                  0.08
                ),
                e.to(
                  this.chapterPOIs[1].timeline,
                  { progress: 1, ease: "none", duration: 0.25 * t },
                  0.4
                );
              var s = l.b.timeline({
                paused: !0,
                onUpdate: this.setActiveExploreItem,
              });
              s.set(
                this.exploreButton.container,
                { pointerEvents: "none", duration: 0 },
                0.19
              ),
                s.set(
                  this.exploreButton.container,
                  { pointerEvents: "auto", duration: 0 },
                  0.2
                ),
                s.to(
                  this.exploreButton.container,
                  { opacity: 1, ease: "sine.out", duration: 0.2 },
                  0.2
                ),
                s.to(
                  this.exploreButton.container,
                  { opacity: 0, ease: "sine.out", duration: 0.2 },
                  0.8
                ),
                s.set(
                  this.exploreButton.container,
                  { pointerEvents: "none", duration: 0 },
                  1
                ),
                e.to(s, { progress: 1, ease: "none", duration: 0.25 * t }, 0.7);
              const o = M.a.create(
                "custom",
                "M0,0 C0.632,0.674 0.656,0.708 0.786,0.854 0.852,0.928 0.918,1 1,1 "
              );
              return (
                e.to(
                  this.cameraWrapper.position,
                  {
                    z: 130 + 122 * (this.index - 1),
                    ease: o,
                    duration: this.duration,
                  },
                  0
                ),
                e.to(
                  this.cameraLookAtPoint.position,
                  {
                    z: 150 + this.CHAPTER_DISTANCE * (this.index - 1),
                    ease: o,
                    duration: this.duration,
                  },
                  0
                ),
                e.to(
                  this.main,
                  { mousePanAmount: 2, mouseMoveAmount: 2, duration: 0.1 },
                  0.9
                ),
                this.scrollTimeline.to(
                  e,
                  { progress: 1, duration: this.duration - 0.1, ease: "none" },
                  0.1
                ),
                this.scrollTimeline.set(
                  this.chapterWrapper,
                  { visible: !0 },
                  0.999
                ),
                this.scrollTimeline.set(
                  this.chapterWrapper,
                  { visible: !1 },
                  1
                ),
                this.scrollTimeline
              );
            }),
            (this.dollyZoom = new h(this.camera, this.cameraLookAtPoint)),
            (this.dollyZoom2 = new h(this.camera, this.cameraLookAtPoint)),
            (this.dollyZoom3 = new h(this.camera, this.cameraLookAtPoint)),
            (this.dollyZoom4 = new h(this.camera, this.cameraLookAtPoint)),
            (this.dollyZoom5 = new h(this.camera, this.cameraLookAtPoint)),
            (this.dollyZoom6 = new h(this.camera, this.cameraLookAtPoint)),
            (this.dollyZoom7 = new h(this.camera, this.cameraLookAtPoint)),
            this.chapterWrapper.add(this.ringsWrapper);
        }
        getLoadItems() {
          return [
            ["particles/capital_ship/0.drc", "capital_ship"],
            ["particles/calico_yacht/new/0.drc", "calico_yacht"],
            ["particles/cosmonaut/0.drc", "cosmonaut"],
          ];
        }
        loadDone() {
          super.loadDone(), this.createChapterRings();
        }
        createChapterRings() {
          for (let t = 0; t < 15; t++) {
            const e = new w(
              this.ringsWrapper,
              10,
              100,
              0,
              2 * Math.PI,
              this.menu,
              "ring",
              new s.Color(524802),
              null,
              this.ringsMaterial
            );
            this.rings.push(e),
              (e.points.position.z = 20 - 10 * t),
              l.b.to(e.points.rotation, {
                z: Math.PI,
                duration: 50 + 10 * t,
                repeat: -1,
                ease: "none",
              });
          }
        }
      }
      class U extends _ {
        constructor(t, e, i, o, a, n, r, u, c, d, p) {
          super(t, e, i, o, a, n, r, u, c, d, p),
            (this.ringsWrapper = new s.Group()),
            (this.CHAPTER_OFFSET = 0.01),
            (this.SCROLL_LENGTH = 15),
            (this.endScreen = document.querySelector(".EndScreen")),
            (this.endScreenItems =
              document.querySelectorAll(".EndScreen .fadeIn")),
            (this.itemLoaded = (t, e, i) => {
              if ("council_of_peace" === i) {
                var o = new x(
                  {
                    useFocusCenter: !1,
                    focusNear: 7.5,
                    focusFar: 18.5,
                    focusFadeOutLength: 3.766,
                    minOpacity: 0,
                    maxOpacity: 0.335,
                    maxBlur: 0.46,
                    radiusScaleFactor: 100,
                    minBlur: 0.07,
                  },
                  this.menu,
                  i
                );
                (a = new s.Points(t, o)).scale.set(-1, 1, 1),
                  this.sortPoints.push(a),
                  (this.councilOfPeace = a),
                  (this.councilOfPeaceContainer = new s.Object3D()),
                  this.councilOfPeaceContainer.position.set(0, -6.11, -31.85),
                  this.councilOfPeaceContainer.add(this.councilOfPeace),
                  l.b.to(this.councilOfPeace.position, {
                    y: 0.5,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: !0,
                    duration: 5,
                  }),
                  (a = this.councilOfPeaceContainer);
              } else if ("ustur_face" === i) {
                o = new x(
                  {
                    useFocusCenter: !1,
                    focusNear: 10,
                    focusFar: 50,
                    focusFadeOutLength: 9.5,
                    minOpacity: 0,
                    maxOpacity: 0.214,
                    maxBlur: 0.2,
                    radiusScaleFactor: 100,
                    minBlur: 0.05,
                  },
                  this.menu,
                  i
                );
                (a = new s.Points(t, o)).scale.set(-1, 1, 1),
                  this.sortPoints.push(a),
                  (this.usturFace = a),
                  (this.usturFaceContainer = new s.Object3D()),
                  this.usturFaceContainer.position.set(0, 7, -20),
                  this.usturFaceContainer.add(this.exploreAnchor),
                  this.exploreAnchor.position.set(3.81, 2.9, 0),
                  this.usturFace.add(this.exploreAnchor),
                  this.usturFaceContainer.add(this.usturFace),
                  (a = this.usturFaceContainer);
              } else if ("ustur" === i) {
                var a;
                o = new x(
                  {
                    useFocusCenter: !1,
                    focusNear: 7.5,
                    focusFar: 18.5,
                    focusFadeOutLength: 3.766,
                    minOpacity: 0,
                    maxOpacity: 0.236,
                    maxBlur: 0.46,
                    radiusScaleFactor: 100,
                    minBlur: 0.05,
                  },
                  this.menu,
                  i
                );
                (a = new s.Points(t, o)).scale.set(-1, 1, 1),
                  this.sortPoints.push(a),
                  (this.ustur = a),
                  (this.usturContainer = new s.Object3D()),
                  this.usturContainer.position.set(0, -2.79, -77),
                  (this.ustur.rotation.y = -0.8),
                  this.usturContainer.add(this.ustur),
                  l.b.to(this.ustur.position, {
                    y: 0.5,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: !0,
                    duration: 5,
                  }),
                  (a = this.usturContainer);
              }
              (a.name = i), this.chapterWrapper.add(a);
            }),
            (this.setupScrollTimeline = () => {
              const t = this.duration;
              this.scrollTimeline.set(this.chapterWrapper, { visible: !1 }, 0),
                this.scrollTimeline.set(
                  this.chapterWrapper,
                  { visible: !0 },
                  0.001
                ),
                this.scrollTimeline.to(
                  this,
                  { scrollProgress: 1, ease: "none", duration: this.duration },
                  0
                ),
                this.scrollTimeline.fromTo(
                  this.chapterIntroClass.timeline,
                  { progress: 1 },
                  { progress: 0, ease: "none", duration: 0.1 * 0.45 },
                  0
                ),
                this.scrollTimeline.to(
                  this.chapterIntroClass.timeline,
                  { progress: 1, ease: "none", duration: 0.03 },
                  0.125
                ),
                this.scrollTimeline.fromTo(
                  this.ringsWrapper.position,
                  { z: 20 },
                  { z: 0, ease: "none", duration: 0.1 },
                  0
                ),
                this.scrollTimeline.from(
                  this.ringsMaterial.uniforms.maxOpacity,
                  { value: 0, duration: 0.05 },
                  0.1 * 0.45
                ),
                this.scrollTimeline.to(
                  this.dollyZoom7,
                  {
                    totalProgress: 1,
                    duration: 0.1 * 0.75,
                    ease: "power1.inOut",
                    onUpdate: () =>
                      this.dollyZoom7.update(15, 4.32207356734125, 55),
                  },
                  0
                ),
                this.scrollTimeline.to(
                  this.main.clusterCloud.material.uniforms.focusFar,
                  { value: 160, ease: "power1.inOut", duration: 0.1 * 0.75 },
                  0
                );
              const e = l.b.timeline({ paused: !0 });
              var i = l.b.timeline({ paused: !0 });
              i.to({ dummy: 0 }, { dummy: 1, duration: 100 }, 0),
                i.to(
                  this.ringsMaterial.uniforms.focusFar,
                  { value: 0.01, ease: "power1.inOut", duration: 4 },
                  0
                ),
                i.to(
                  this.ringsMaterial.uniforms.focusFadeOutLength,
                  { value: 24, ease: "sine.out", duration: 5 },
                  0
                ),
                i.to(
                  this.main.clusterCloud.material.uniforms.focusFar,
                  { value: 51, ease: "sine.out", duration: 4 },
                  0
                ),
                i.to(
                  this.main,
                  { mousePanAmount: 4, mouseMoveAmount: 1, duration: 10 },
                  0
                ),
                i.to(
                  this.dollyZoom,
                  {
                    totalProgress: 1,
                    duration: 7,
                    ease: "power1.inOut",
                    onUpdate: () => this.dollyZoom.update(110, 100, 15),
                  },
                  0
                ),
                i.to(
                  this.dollyZoom2,
                  {
                    totalProgress: 1,
                    duration: 12,
                    ease: "power1.inOut",
                    onUpdate: () => this.dollyZoom2.update(55, 3, 110),
                  },
                  10
                ),
                i.to(
                  this.dollyZoom3,
                  {
                    totalProgress: 1,
                    duration: 6,
                    ease: "sine.inOut",
                    onUpdate: () => this.dollyZoom3.update(110, 20, 55),
                  },
                  30
                ),
                i.to(
                  this.dollyZoom4,
                  {
                    totalProgress: 1,
                    duration: 12,
                    ease: "power1.inOut",
                    onUpdate: () => this.dollyZoom4.update(55, 3, 110),
                  },
                  40
                ),
                i.to(
                  this.dollyZoom5,
                  {
                    totalProgress: 1,
                    duration: 6,
                    ease: "sine.inOut",
                    onUpdate: () => this.dollyZoom5.update(110, 20, 55),
                  },
                  70
                ),
                i.to(
                  this.dollyZoom6,
                  {
                    totalProgress: 1,
                    duration: 10,
                    ease: "sine.inOut",
                    onUpdate: () => this.dollyZoom6.update(55, 8, 110),
                  },
                  80
                ),
                e.to(i, { progress: 1, ease: "none", duration: 0.9 * t }, 0),
                e.from(
                  this.ustur.material.uniforms.maxOpacity,
                  { value: 0, ease: "none", duration: 0.1 * t },
                  0
                ),
                e.from(
                  this.ustur.material.uniforms.maxBlur,
                  { value: 0.1, ease: "none", duration: 0.3 * t },
                  0
                ),
                e.to(
                  this.usturContainer.position,
                  { z: -65, ease: "sine.in", duration: 0.3 * t },
                  0.1
                ),
                e.to(
                  this.ustur.rotation,
                  { x: 0, y: 0, ease: "sine.out", duration: 0.5 * t },
                  0
                ),
                e.to(
                  this.usturContainer.position,
                  { y: -2.643, ease: "sine.out", duration: 0.4 * t },
                  0
                ),
                e.to(
                  this.councilOfPeace.material.uniforms.focusFar,
                  { value: 35.785, ease: "none", duration: 0.3 * t },
                  0.1
                ),
                e.from(
                  this.councilOfPeace.material.uniforms.maxBlur,
                  { value: 0.05, ease: "none", duration: 0.4 * t },
                  0.3
                ),
                e.from(
                  this.councilOfPeace.material.uniforms.minBlur,
                  { value: 0.01, ease: "none", duration: 0.6 * t },
                  0.1
                ),
                e.fromTo(
                  this.councilOfPeace.rotation,
                  { y: 1.19 },
                  { y: 0, ease: "none", duration: 0.4 },
                  0.3
                ),
                e.to(
                  this.councilOfPeaceContainer.position,
                  { y: 0, ease: "power1.out", duration: 0.3 * t },
                  0.3
                ),
                e.to(
                  this.councilOfPeaceContainer.position,
                  { z: -12.95, ease: "none", duration: 0.4 * t },
                  0.3
                ),
                e.to(
                  this.councilOfPeaceContainer.position,
                  { y: 30, ease: "power1.in", duration: 0.1 * t },
                  0.6
                ),
                e.from(
                  this.usturFace.material.uniforms.maxOpacity,
                  { value: 0, ease: "none", duration: 0.1 * t },
                  0.65
                ),
                e.to(
                  this.usturFace.material.uniforms.focusFadeOutLength,
                  { value: 9, ease: "none", duration: 0.1 * t },
                  0.6
                ),
                e.to(
                  this.usturFace.material.uniforms.focusNear,
                  { value: 12, ease: "none", duration: 0.1 * t },
                  0.6
                ),
                e.to(
                  this.usturFaceContainer.position,
                  { y: -0.63, z: 40, ease: "power3.out", duration: 0.2 * t },
                  0.7
                ),
                e.to(
                  this.chapterPOIs[0].timeline,
                  { progress: 1, ease: "none", duration: 0.25 * t },
                  0.08
                ),
                e.to(
                  this.chapterPOIs[1].timeline,
                  { progress: 1, ease: "none", duration: 0.25 * t },
                  0.4
                );
              var s = l.b.timeline({
                paused: !0,
                onUpdate: this.setActiveExploreItem,
              });
              s.set(
                this.exploreButton.container,
                { pointerEvents: "none", duration: 0 },
                0.19
              ),
                s.set(
                  this.exploreButton.container,
                  { pointerEvents: "auto", duration: 0 },
                  0.2
                ),
                s.to(
                  this.exploreButton.container,
                  { opacity: 1, ease: "sine.out", duration: 0.2 },
                  0.2
                ),
                s.to(
                  this.exploreButton.container,
                  { opacity: 0, ease: "sine.out", duration: 0.2 },
                  0.8
                ),
                e.to(s, { progress: 1, ease: "none", duration: 0.25 * t }, 0.7);
              const o = M.a.create(
                "custom",
                "M0,0 C0.632,0.674 0.656,0.708 0.786,0.854 0.852,0.928 0.918,1 1,1 "
              );
              return (
                e.fromTo(
                  this.endScreenItems,
                  { opacity: 0 },
                  { opacity: 1, duration: 0.05 * t, force3D: !0 },
                  0.95
                ),
                e.set(this.endScreen, { pointerEvents: "auto" }, 0.955),
                e.to(
                  this.usturFaceContainer.position,
                  { x: 9.49, y: 4.56, ease: "power1.inOut", duration: 0.1 * t },
                  0.9
                ),
                e.to(
                  this.usturFaceContainer.rotation,
                  { y: 0.7, ease: "power2.inOut", duration: 0.12 * t },
                  0.88
                ),
                e.to(
                  this.usturFace.material.uniforms.focusNear,
                  { value: 23.65, ease: "power1.inOut", duration: 0.12 * t },
                  0.88
                ),
                e.to(
                  this.usturFace.material.uniforms.focusFadeOutLength,
                  { value: 2.723, ease: "power1.inOut", duration: 0.12 * t },
                  0.88
                ),
                e.to(
                  this.usturFace.material.uniforms.maxBlur,
                  { value: 0.35, ease: "power1.inOut", duration: 0.12 * t },
                  0.88
                ),
                e.to(
                  this.cameraWrapper.position,
                  {
                    z: 130 + 122 * (this.index - 1),
                    ease: o,
                    duration: this.duration,
                  },
                  0
                ),
                e.to(
                  this.cameraLookAtPoint.position,
                  {
                    z: 150 + this.CHAPTER_DISTANCE * (this.index - 1),
                    ease: o,
                    duration: this.duration,
                  },
                  0
                ),
                this.scrollTimeline.to(
                  e,
                  { progress: 1, duration: this.duration - 0.1, ease: "none" },
                  0.1
                ),
                this.scrollTimeline
              );
            }),
            (this.dollyZoom = new h(this.camera, this.cameraLookAtPoint)),
            (this.dollyZoom2 = new h(this.camera, this.cameraLookAtPoint)),
            (this.dollyZoom3 = new h(this.camera, this.cameraLookAtPoint)),
            (this.dollyZoom4 = new h(this.camera, this.cameraLookAtPoint)),
            (this.dollyZoom5 = new h(this.camera, this.cameraLookAtPoint)),
            (this.dollyZoom6 = new h(this.camera, this.cameraLookAtPoint)),
            (this.dollyZoom7 = new h(this.camera, this.cameraLookAtPoint)),
            this.chapterWrapper.add(this.ringsWrapper),
            l.b.set(this.endScreenItems, { opacity: 0, force3D: !0 });
        }
        getLoadItems() {
          return [
            ["particles/ustur/face/0.drc", "ustur_face"],
            ["particles/ustur/new/0.drc", "ustur"],
            ["particles/council_of_peace/0.drc", "council_of_peace"],
          ];
        }
        loadDone() {
          super.loadDone(), this.createChapterRings();
        }
        createChapterRings() {
          for (let t = 0; t < 16; t++) {
            const e = new w(
              this.ringsWrapper,
              10,
              100,
              0,
              2 * Math.PI,
              this.menu,
              "ring",
              new s.Color(524802),
              null,
              this.ringsMaterial
            );
            this.rings.push(e),
              (e.points.position.z = 30 - 10 * t),
              l.b.to(e.points.rotation, {
                z: Math.PI,
                duration: 50 + 10 * t,
                repeat: -1,
                ease: "none",
              });
          }
        }
      }
      var q = i(873),
        j = i(280),
        V = i(13);
      l.b.registerPlugin(j.a, q.a);
      class Y {
        constructor() {
          var t = this;
          (this.container = document.getElementById("LandingGallery")),
            (this.imageContainer = this.container.querySelector(
              ".LandingGallery-images"
            )),
            (this.imageContainerInner = this.container.querySelector(
              ".LandingGallery-imagesInner"
            )),
            (this.title = this.container.querySelector(
              ".LandingGallery-description h3"
            )),
            (this.descriptionWrapper = this.container.querySelector(
              ".LandingGallery-descriptionWrapper"
            )),
            (this.description = this.container.querySelector(
              ".LandingGallery-description p"
            )),
            (this.closeButton = this.container.querySelector(
              ".LandingGallery-close"
            )),
            (this.navButtons = this.container.querySelectorAll(
              ".LandingGallery-nav"
            )),
            (this.jumpNavContainer = this.container.querySelector(
              ".LandingGallery-jumpNav"
            )),
            (this.visible = !1),
            (this.width = 0),
            (this.progressWrap = l.b.utils.wrap(0, 1)),
            (this.wrapWidth = 0),
            (this.slides = []),
            (this.slideAnimation = l.b.to({}, {})),
            (this.slideDuration = 0.75),
            (this.currSnapIndex = 0),
            (this.currSnapX = 0),
            (this.totalSlides = 0),
            (this.jumpNavContainerAnchors = []),
            (this.onPress = () => {
              this.toggleCaption(!1), this.updateDraggable();
            }),
            (this.onRelease = () => {
              (this.draggable.isThrowing &&
                this.draggable.tween &&
                1 !== this.draggable.tween.progress()) ||
                this.toggleCaption(!0);
            }),
            (this.toggleCaption = function () {
              let e =
                  arguments.length > 0 &&
                  void 0 !== arguments[0] &&
                  arguments[0],
                i =
                  arguments.length > 1 &&
                  void 0 !== arguments[1] &&
                  arguments[1];
              e
                ? l.b.to(t.descriptionWrapper, {
                    opacity: 1,
                    duration: 0.2,
                    delay: i ? 0 : t.slideDuration,
                    onStart: () => {
                      (t.title.textContent = t.items[t.currSnapIndex].title),
                        (t.description.textContent =
                          t.items[t.currSnapIndex].description);
                    },
                  })
                : (l.b.killTweensOf(t.descriptionWrapper),
                  l.b.to(t.descriptionWrapper, { opacity: 0, duration: 0.2 }));
            }),
            (this.animateSlides = (t) => {
              let e = l.b.getProperty(this.proxy, "x");
              this.slideAnimation.isActive() &&
                (e = this.slideAnimation.vars.x),
                this.slideAnimation.kill();
              var i = this.snapX(e + t * this.width);
              (this.currSnapIndex = this.getSnapIndex(i)),
                (this.slideAnimation = l.b.to(this.proxy, {
                  x: i,
                  ease: "power3.inOut",
                  duration: this.slideDuration,
                  onUpdate: this.updateProgress,
                }));
            }),
            (this.resize = () => {
              this.items &&
                (this.draggable.tween && this.draggable.tween.progress(1),
                this.animateSlides(0),
                this.slideAnimation.progress(1)),
                (this.width = this.container.clientWidth),
                (this.snapX = l.b.utils.snap(this.width)),
                this.updateSize();
            }),
            (this.updateSize = () => {
              var t = l.b.getProperty(this.proxy, "x") / this.wrapWidth || 0;
              (this.wrapWidth = this.width * this.totalSlides),
                l.b.set(this.proxy, { x: t * this.wrapWidth });
            }),
            (this.updateDraggable = () => {
              this.slideAnimation.kill(),
                this.draggable.update(),
                this.updateProgress();
            }),
            (this.updateProgress = () => {
              this.animation.progress(
                this.progressWrap(
                  l.b.getProperty(this.proxy, "x") / this.wrapWidth
                )
              );
            }),
            (this.closeClickHandler = (t) => (
              t.preventDefault(), this.visible && this.hide(), !1
            )),
            (this.jumpAnchorClickHandler = (t) => {
              t.preventDefault();
              const e = t.currentTarget.slideIndex;
              this.killDragThrow(t);
              let i = l.b.getProperty(this.proxy, "x");
              this.slideAnimation.kill();
              let s = this.getSnapIndex(i, !1) - e;
              var o = this.snapX(i + s * this.width);
              return (
                (this.currSnapIndex = this.getSnapIndex(o)),
                (this.slideAnimation = l.b.to(this.proxy, {
                  x: o,
                  ease: "power3.inOut",
                  duration: this.slideDuration,
                  onUpdate: this.updateProgress,
                })),
                !1
              );
            }),
            this.closeButton.addEventListener("click", this.closeClickHandler),
            (this.proxy = document.createElement("div")),
            window.addEventListener("resize", this.resize),
            this.resize(),
            (this.draggable = new q.a(this.proxy, {
              trigger: m.a.IS_ANDROID ? this.imageContainer : this.container,
              inertia: !0,
              onPress: this.onPress,
              onRelease: this.onRelease,
              onDrag: this.updateProgress,
              onThrowUpdate: this.updateProgress,
              onThrowComplete: () => this.toggleCaption(!0, !0),
              snap: {
                x: (t) => (
                  (this.currSnapX = this.snapX(t)),
                  (this.currSnapIndex = this.getSnapIndex(this.currSnapX)),
                  this.currSnapX
                ),
              },
            })),
            this.navButtons[0].addEventListener(
              "click",
              (t) => (
                t.preventDefault(),
                this.killDragThrow(t),
                this.animateSlides(1),
                !1
              )
            ),
            this.navButtons[1].addEventListener(
              "click",
              (t) => (
                t.preventDefault(),
                this.killDragThrow(t),
                this.animateSlides(-1),
                !1
              )
            );
        }
        killDragThrow(t) {
          this.draggable.endDrag(t),
            this.draggable.tween && this.draggable.tween.progress(1);
        }
        getSnapIndex(t) {
          let e =
            !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
          e &&
            this.jumpNavContainerAnchors[this.currSnapIndex].classList.remove(
              "active"
            );
          let i = Math.round(
            (1 - this.progressWrap(t / this.wrapWidth)) * this.totalSlides
          );
          return (
            (i = i === this.totalSlides ? 0 : i),
            e && this.jumpNavContainerAnchors[i].classList.add("active"),
            i
          );
        }
        setGalleryItems(t) {
          this.items !== t &&
            ((this.items = t),
            this.slides.forEach((t) => this.imageContainerInner.removeChild(t)),
            this.jumpNavContainerAnchors.forEach((t) =>
              this.jumpNavContainer.removeChild(t)
            ),
            (this.jumpNavContainerAnchors = []),
            (this.slides = this.items.map((t, e) => {
              const i = document.createElement("img");
              (i.onload = () => {
                i.classList.add("loaded");
              }),
                (i.sizes = "100vw");
              const s = V.a.WEBP_SUPPORTED ? "webp" : "jpg";
              (i.srcset = ""
                .concat(t.url, "?w=2000&h=2000&q=80&fm=")
                .concat(s, " 1000w, ")
                .concat(t.url, "?w=4000&h=2880&q=80&fm=")
                .concat(s, " 4000w")),
                l.b.set(i, { xPercent: 100 * e }),
                this.imageContainerInner.appendChild(i);
              const o = document.createElement("a");
              return (
                (o.href = "#slide-" + e),
                (o.slideIndex = e),
                0 === e && o.classList.add("active"),
                o.addEventListener("click", this.jumpAnchorClickHandler),
                this.jumpNavContainerAnchors.push(o),
                this.jumpNavContainer.appendChild(o),
                i
              );
            })),
            (this.currSnapIndex = 0),
            (this.currSnapX = 0),
            (this.totalSlides = this.items.length),
            this.totalSlides > 0 &&
              ((this.title.textContent = this.items[0].title),
              (this.description.textContent = this.items[0].description)),
            (this.wrap = l.b.utils.wrap(-100, 100 * (this.totalSlides - 1))),
            l.b.set(this.proxy, { x: 0 }),
            this.totalSlides > 1
              ? (this.draggable.enable(),
                (this.animation = l.b.to(this.slides, {
                  xPercent: "+=" + 100 * this.slides.length,
                  duration: 1,
                  ease: "none",
                  paused: !0,
                  repeat: -1,
                  modifiers: { xPercent: this.wrap },
                })),
                this.container.classList.remove("single"))
              : (this.container.classList.add("single"),
                (this.animation = l.b.to({}, {})),
                this.draggable.disable()),
            this.updateSize(),
            this.updateDraggable(),
            this.updateProgress());
        }
        show() {
          (this.visible = !0),
            l.b.to(this.container, { duration: 0.5, autoAlpha: 1 });
        }
        hide() {
          (this.visible = !1),
            l.b.to(this.container, { duration: 0.5, autoAlpha: 0 });
        }
      }
      var X = i(660);
      class K {
        constructor() {
          (this.audioElement = document.getElementById("AmbientAudio")),
            (this.soundToggle = document.body.querySelector(".SoundMute")),
            (this.playing = !0),
            (this.enabled = !1),
            (this.loadAudio = () => {
              (this.audioElement.src = this.audioElement.dataset.src),
                this.soundToggle.addEventListener("click", this.toggleSound);
            }),
            (this.enableAudio = () => {
              this.audioElement.play(),
                (this.enabled = !0),
                window.removeEventListener("click", this.enableAudio),
                l.b.to(this.audioElement, { volume: 1, duration: 3 });
            }),
            (this.toggleSound = () => {
              this.playing
                ? ((this.playing = !1),
                  this.audioElement.pause(),
                  this.soundToggle.classList.add("off"))
                : ((this.playing = !0),
                  this.audioElement.play(),
                  this.soundToggle.classList.remove("off"));
            }),
            (this.audioElement.volume = 0),
            (m.a.AmbientAudio = this);
        }
        stop() {
          this.enabled && this.playing && this.audioElement.pause();
        }
        resume() {
          this.enabled && this.playing && this.audioElement.play();
        }
      }
      i.d(e, "MainScene", function () {
        return J;
      });
      class J {
        constructor(t) {
          var e = this;
          if (
            ((this._mainGroup = new s.Group()),
            (this.AppContainer = document.getElementById("App")),
            (this.ViewContainer = document.getElementById("ViewContainer")),
            (this.ScrollSpacer = document.getElementById("ScrollSpacer")),
            (this.MouseMoveTracker = new d.a()),
            (this.USE_SCROLL_TIMER = CSS.supports("contain", "content")),
            (this.cameraLookAtPoint = new s.Object3D()),
            (this._cameraLookAtVector = new s.Vector3()),
            (this.ambientValue = 0),
            (this.currentMasterScrollProgress = 0),
            (this.landingSkipped = !1),
            (this.chapterPOITitles = Array.from(
              document.querySelectorAll(".ChapterPOIs > div")
            )),
            (this.mouseMoveAmount = 0.2),
            (this.mousePanAmount = 5),
            (this.activeExploreAnchor = null),
            (this.chapters = []),
            (this.renderEffects = !0),
            (this.DEBUG_MODE = !1),
            (this.DebugHelpers = []),
            (this.SKIP_INTRO = new URLSearchParams(window.location.search).get(
              "skipIntro"
            )),
            (this.SKIP_LOAD_ANIMATION = new URLSearchParams(
              window.location.search
            ).get("skipLoadAni")),
            (this.chapterPositions = []),
            (this.scrollHeight = 0),
            (this.gallery = new Y()),
            (this.exploreButton = new O(this.gallery, this)),
            (this.requestAnimationFrameID = null),
            (this.ambientAudio = new K()),
            (this.scrollTriggerReady = !1),
            (this.scrollTrigger = null),
            (this.init = (t) => {
              (this.container = t),
                l.b.registerPlugin(u.a, c.ScrollToPlugin),
                m.a.USE_STICKY && !m.a.IS_SAFARI && (t.style.zIndex = "-1"),
                this.USE_SCROLL_TIMER ||
                  document.querySelector(".ScrollTimer").remove(),
                m.a.USE_STICKY
                  ? u.a.defaults({
                      scroller: this.AppContainer,
                      trigger: this.ScrollSpacer,
                    })
                  : document.documentElement.classList.add("non-sticky"),
                (this.loadManager = new z(this.loadDone)),
                l.b.set(".ChapterPOIs", { autoAlpha: 0 }),
                l.b.set(".BottomBar-right", { autoAlpha: 0 }),
                l.b.set(this.chapterPOITitles, { opacity: 0, force3D: !0 }),
                (this.ScrollSpacer.style.height = "auto"),
                (this.width = this.ViewContainer.clientWidth),
                (this.height = this.ViewContainer.clientHeight),
                l.b.to(this, {
                  ambientValue: 1,
                  duration: 4,
                  ease: "sine.inOut",
                  repeat: -1,
                  yoyo: !0,
                }),
                (this._camera = new s.PerspectiveCamera(
                  65,
                  this.width / this.height,
                  1,
                  200
                )),
                (this._scene = new s.Scene()),
                (this.cameraWrapper = new s.Object3D()),
                this.cameraWrapper.add(this._camera),
                this._scene.add(this.cameraWrapper),
                (this._scene.background = new s.Color(15854305)),
                (this.introDollyZoom = new h(
                  this._camera,
                  this.cameraLookAtPoint
                )),
                (this._renderer = new s.WebGLRenderer({
                  antialias: !this.renderEffects,
                  stencil: !this.renderEffects,
                  depth: !this.renderEffects,
                  powerPreference: "high-performance",
                  premultipliedAlpha: m.a.PREMULTIPLY_ALPHA,
                })),
                this._renderer.setPixelRatio(m.a.RENDERER_PIXEL_RATIO),
                this._renderer.setSize(this.width, this.height),
                (m.a.RENDERER_HEIGHT = this.height),
                (x.texCircleSolid = this.loadManager.loadTexture(
                  "circle_solid_32x32_premultiplied.png"
                )),
                (x.texCircleAlpha = this.loadManager.loadTexture(
                  "circle_alpha_32x32_premultiplied.png"
                )),
                (x.texCircleSolid.premultiplyAlpha = m.a.PREMULTIPLY_ALPHA),
                (x.texCircleAlpha.premultiplyAlpha = m.a.PREMULTIPLY_ALPHA),
                (this.postEffects = new r(
                  this._scene,
                  this._camera,
                  this._renderer,
                  this.menu,
                  this._clock,
                  this.renderEffects
                )),
                t.appendChild(this._renderer.domElement),
                this._scene.add(this._mainGroup),
                this._scene.add(this.cameraLookAtPoint),
                this.setupLights(),
                m.a.DEBUG && this.setupDebug();
              window.addEventListener("resize", () => this.onWindowResize()),
                (this.clusterCloud = new Z(
                  this.loadManager,
                  this._mainGroup,
                  2,
                  this.menu
                )),
                (this.exploreNav = new N(this.gotoChapter)),
                this.setupChapters(),
                (this.landingEnterHitArea = document.querySelector(
                  ".LandingEnter-hitArea"
                )),
                this.landingEnterHitArea.addEventListener(
                  "click",
                  this.enterLanding
                ),
                (this.diamondMouseEnter = new P(
                  this.MouseMoveTracker,
                  document.querySelector(".LandingEnter-largeDiamond"),
                  0.15,
                  this.landingEnterHitArea
                )),
                (this.clickMouseEnter = new P(
                  this.MouseMoveTracker,
                  document.querySelector(".LandingEnter"),
                  0.3,
                  this.landingEnterHitArea
                ));
            }),
            (this.loadDone = () => {
              (this._camera.position.z = -305),
                (this._camera.fov = 65),
                this.ambientAudio.loadAudio(),
                this.onWindowResize(!0),
                this.chapters.forEach((t) => t.loadDone()),
                this.playLoadDoneIntroAnimation(),
                (this.activeExploreAnchor = this.chapters[0].exploreAnchor),
                m.a.DEBUG && this.setupDebugControls();
            }),
            (this.animate = () => {
              (this.requestAnimationFrameID = requestAnimationFrame(
                this.animate
              )),
                m.a.DEBUG && this.stats.begin(),
                this.MouseMoveTracker.raf(),
                m.a.VIDEO_OPEN ||
                  V.a.MENU_OPEN ||
                  ((this._camera.position.x =
                    this.mouseMoveAmount * this.MouseMoveTracker.pos.xEased),
                  (this._camera.position.y =
                    this.mouseMoveAmount * this.MouseMoveTracker.pos.yEased),
                  this.postEffects.godRaysEffect &&
                    0 == this.landingSkipped &&
                    ((this.spotLight.position.y =
                      2.24 + 1 * this.MouseMoveTracker.pos.yEased),
                    (this.spotLight.position.x =
                      2.27 + 3 * this.MouseMoveTracker.pos.xEased),
                    (this.postEffects.godRaysEffect.godRaysMaterial.uniforms.decay.value =
                      0.88 +
                      0.05 *
                        (1 - this.MouseMoveTracker.pos.distanceFromCenter))),
                  (this.cameraLookAtPoint.position.x =
                    this.mousePanAmount *
                    (-1 * this.MouseMoveTracker.pos.xEased)),
                  (this.cameraLookAtPoint.position.y =
                    this.mousePanAmount *
                    (-1 * this.MouseMoveTracker.pos.yEased)),
                  this.cameraLookAtPoint.getWorldPosition(
                    this._cameraLookAtVector
                  ),
                  this._camera.lookAt(this._cameraLookAtVector),
                  this._camera.updateProjectionMatrix(),
                  this._camera.updateMatrixWorld(),
                  this.activeExploreAnchor &&
                    this.exploreButton.updateScreenPosition(
                      this.activeExploreAnchor,
                      this._camera,
                      this.widthHalf,
                      this.heightHalf
                    ),
                  this.DEBUG_MODE
                    ? (this._controls.update(),
                      this.DebugHelpers.forEach((t) => t.update()),
                      this._renderer.render(this._scene, this.debugCamera))
                    : this.postEffects.enabled
                    ? this.postEffects.render()
                    : this._renderer.render(this._scene, this._camera),
                  m.a.DEBUG && this.stats.end());
            }),
            (this.onWindowResize = function () {
              let t =
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
              var i = e.width,
                s = e.height;
              if (
                ((e.windowWidth = window.innerWidth),
                (e.windowHeight = window.innerHeight),
                (e.width = e.ViewContainer.clientWidth),
                (e.height = e.ViewContainer.clientHeight),
                (m.a.RENDERER_HEIGHT = e.height),
                (i != e.width || s != e.height || !0 === t) &&
                  ((e._camera.aspect = e.width / e.height),
                  !e.landingSkipped && e._camera.aspect >= 1.9
                    ? (e._camera.zoom = e._camera.aspect - 1.9 + 1 + 0.15)
                    : (e._camera.zoom = 1),
                  e._camera.updateProjectionMatrix(),
                  (e.widthHalf = e.width / 2),
                  (e.heightHalf = e.height / 2),
                  e._renderer.setSize(e.width, e.height),
                  e.postEffects.composer.setSize(e.width, e.height),
                  e.MouseMoveTracker.resize(),
                  e.scrollTriggerReady))
              ) {
                const t = e.scrollTrigger.progress;
                setTimeout(() => {
                  e.scrollTrigger.scroll(
                    t * u.a.maxScroll(e.scrollTrigger.scroller)
                  ),
                    e.scrollTrigger.getTween().progress(1),
                    u.a.update(),
                    e.scrollTrigger.refresh(),
                    u.a.update(),
                    e.scrollTrigger.scroll(
                      t * u.a.maxScroll(e.scrollTrigger.scroller)
                    ),
                    e.scrollTrigger.getTween().progress(1);
                }, 1);
              }
            }),
            (this.enableScroll = () => {
              (this.ScrollSpacer.style.display = "block"),
                (this.ScrollSpacer.style.height =
                  100 * this.scrollHeight + "%"),
                (this.ScrollSpacer.style.display = "none"),
                this.ScrollSpacer.offsetHeight,
                (this.ScrollSpacer.style.display = "block"),
                u.a.refresh(),
                (this.scrollTriggerReady = !0);
            }),
            (this.setupScrollTimeline = () => {
              const t = m.a.SCRUB_DURATION;
              if (
                (this.chapters.forEach(
                  (t) => (this.scrollHeight += t.SCROLL_LENGTH)
                ),
                this.USE_SCROLL_TIMER)
              ) {
                const i = document.querySelector(".ScrollTimer-time");
                var e = { time: parseFloat(i.textContent) };
                l.b.to(e, {
                  scrollTrigger: { scrub: t, start: "0%", end: "100%" },
                  time: "+=1001",
                  ease: "none",
                  onUpdate: () => {
                    i.textContent = e.time.toFixed(3);
                  },
                });
              }
              const i = l.b.timeline({
                scrollTrigger: { scrub: t, start: "0%", end: "100%" },
              });
              i.to(
                this,
                { currentMasterScrollProgress: 1, duration: 1, ease: "none" },
                0
              ),
                (this.scrollTrigger = i.scrollTrigger);
              this.chapters.length;
              let s = 0;
              var o = [],
                a = 0;
              this.chapters.forEach((t, e) => {
                const n = t.setupScrollTimeline(),
                  r = t.SCROLL_LENGTH / this.scrollHeight;
                this.chapterPositions.push(a),
                  (a += t.SCROLL_LENGTH),
                  o.push(r),
                  i.to(
                    n,
                    { progress: 1, ease: "none", duration: r },
                    s - t.CHAPTER_OFFSET
                  ),
                  (s += r);
              }),
                1 !== i.totalDuration() &&
                  console.warn(
                    "Total timeline length is not == 1, somethings wonky"
                  ),
                this.exploreNav.setupTimeline(o),
                i.to(
                  this.exploreNav.timeline,
                  { progress: 1, ease: "none", duration: i.totalDuration() },
                  0
                );
              let n = this._camera.position.clone(),
                r = this._camera.rotation.clone();
              this._camera.position.set(
                -0.09324138656189779,
                0.5441061764985087,
                -209.02427365941497
              ),
                this._camera.rotation.set(
                  3.1411942241032187,
                  0.0006787114349817719,
                  -3.141592383171151
                ),
                this._camera.updateProjectionMatrix(),
                this._camera.updateMatrixWorld(!0),
                this._camera.updateMatrix(),
                this._camera.updateWorldMatrix(!0, !0),
                this.chapters.forEach((t) => t.sortPointsData()),
                this._camera.position.copy(n),
                this._camera.rotation.copy(r),
                l.b.set(this.exploreButton.container, {
                  opacity: 0,
                  force3D: !0,
                });
            }),
            (this.gotoChapter = (t) => {
              if (t < this.chapters.length)
                var e =
                  0 === t
                    ? 0
                    : this.chapterPositions[t] * this.height +
                      0.8 * this.height;
              else e = this.scrollHeight * this.height;
              m.a.USE_STICKY
                ? l.b.to(this.AppContainer, { duration: 1, scrollTo: { y: e } })
                : l.b.to(window, { duration: 1, scrollTo: { y: e } });
            }),
            (this.enterLanding = () => {
              window.ROTATING_BANNERS
                ? window.ROTATING_BANNERS.selfDestroy()
                : l.b.to("#StickyOverlay .startScreenTrailer", {
                    autoAlpha: 0,
                    duration: 0.4,
                  }),
                this.landingEnterHitArea.removeEventListener(
                  "click",
                  this.enterLanding
                ),
                (this.landingEnterHitArea.style.display = "none"),
                (this.landingSkipped = !0),
                this.clickMouseEnter.disable(),
                this.diamondMouseEnter.disable(),
                this.ambientAudio.enableAudio();
              const t = this.chapters[0];
              l.b.to(".LandingMenuIntroWrapper", {
                autoAlpha: 0,
                duration: 0.4,
              });
              var e = l.b.timeline({
                paused: !0,
                onComplete: this.enableScroll,
              });
              e.add(this.eye.getScrollInAnimation()),
                e.to(
                  t.chapterIntroClass.timeline,
                  { progress: 0, duration: 2.5, ease: "sine.inOut" },
                  4
                ),
                e.to(".ExploreNav", { autoAlpha: 1, duration: 2 }, 3),
                e.to(".ChapterPOIs", { autoAlpha: 1, duration: 2 }, 3),
                e.to(".BottomBar-right", { autoAlpha: 1, duration: 2 }, 3),
                this.USE_SCROLL_TIMER &&
                  e.to(".ScrollTimer", { opacity: 1, duration: 2 }, 3),
                e.to(
                  this.introDollyZoom,
                  {
                    duration: 2,
                    ease: "power3.inOut",
                    totalProgress: 1,
                    onUpdate: () => this.introDollyZoom.update(15, -25),
                  },
                  3
                ),
                e.to(
                  this.cameraWrapper.position,
                  { z: 8, ease: "power4.inOut", duration: 4 },
                  3
                ),
                e.to(
                  this._camera,
                  { zoom: 1, duration: 2, ease: "power3.inOut" },
                  3
                ),
                e.to(
                  this,
                  {
                    mousePanAmount: 2,
                    mouseMoveAmount: 2,
                    duration: 2,
                    ease: "power3.inOut",
                  },
                  3
                ),
                e.to(".ScrollHelpIndicator", { opacity: 1, duration: 1 }, 6),
                e.from(
                  t.ringsMaterial.uniforms.maxOpacity,
                  { duration: 2, value: 0 },
                  3
                ),
                e.add(() => {
                  document.documentElement.classList.remove("darkMenu");
                }, 2.8),
                e.play(),
                this.SKIP_INTRO && e.timeScale(10);
            }),
            (this.kill = () => {
              cancelAnimationFrame(this.requestAnimationFrameID);
            }),
            X.a.isWebGLAvailable())
          )
            (this._clock = new s.Clock()),
              m.a.DEBUG && (this.menu = new a.a()),
              (m.a.MainScene = this),
              this.init(t),
              this.animate(),
              document.addEventListener(
                "visibilitychange",
                () => {
                  document.hidden
                    ? (this._clock.stop(), this.ambientAudio.stop())
                    : (this._clock.start(), this.ambientAudio.resume());
                },
                !1
              );
          else {
            const t = X.a.getWebGLErrorMessage();
            document.getElementById("TemplateLayer").children[0].appendChild(t);
          }
        }
        setupChapters() {
          const t = document.querySelectorAll(".ChapterIntro"),
            e = document.body.querySelectorAll(".ExploreNav a"),
            i = new W(
              this.menu,
              this._camera,
              this.cameraWrapper,
              this._mainGroup,
              this.cameraLookAtPoint,
              this.exploreButton,
              t[0],
              this.chapterPOITitles.splice(0, 2),
              1,
              this,
              e[0]
            ),
            s = new F(
              this.menu,
              this._camera,
              this.cameraWrapper,
              this._mainGroup,
              this.cameraLookAtPoint,
              this.exploreButton,
              t[1],
              this.chapterPOITitles.splice(0, 2),
              2,
              this,
              e[1]
            ),
            o = new H(
              this.menu,
              this._camera,
              this.cameraWrapper,
              this._mainGroup,
              this.cameraLookAtPoint,
              this.exploreButton,
              t[2],
              this.chapterPOITitles.splice(0, 2),
              3,
              this,
              e[2]
            ),
            a = new G(
              this.menu,
              this._camera,
              this.cameraWrapper,
              this._mainGroup,
              this.cameraLookAtPoint,
              this.exploreButton,
              t[3],
              this.chapterPOITitles.splice(0, 2),
              4,
              this,
              e[3]
            ),
            n = new U(
              this.menu,
              this._camera,
              this.cameraWrapper,
              this._mainGroup,
              this.cameraLookAtPoint,
              this.exploreButton,
              t[4],
              this.chapterPOITitles.splice(0, 2),
              5,
              this,
              e[4]
            );
          this.chapters.push(i),
            this.chapters.push(s),
            this.chapters.push(o),
            this.chapters.push(a),
            this.chapters.push(n),
            (this.eye = new C(
              this._scene,
              this.postEffects,
              this.menu,
              this.loadManager
            )),
            this.loadManager.setChapters(this.chapters),
            this.loadManager.startLoading();
        }
        setupLights() {
          (this.dirLight = new s.DirectionalLight(16777215, 0.49)),
            this.dirLight.position.set(0, 1, -10),
            this.dirLight.lookAt(0, 0, 0),
            this._scene.add(this.dirLight),
            (this.spotLight = new s.SpotLight(16777215, 1, 1)),
            (this.spotLight.intensity = 1.853),
            (this.spotLight.penumbra = 0),
            (this.spotLight.angle = 1.571),
            (this.spotLight.decay = -178),
            (this.spotLight.power = 5.58),
            this.spotLight.position.set(2.27, 2.24, -305),
            this._scene.add(this.spotLight);
        }
        playLoadDoneIntroAnimation() {
          this.setupScrollTimeline(),
            this.chapters[0].chapterIntroClass.timeline.progress(1);
          var t = l.b.timeline({
            paused: !0,
            ease: "power4.inOut",
            delay: 0,
            onComplete: () => {
              document.getElementById("Loading").remove(),
                this.SKIP_INTRO && setTimeout(this.enterLanding, 100);
            },
          });
          t.add(this.eye.getIntroAnimation(), 0),
            t.from(
              this._camera,
              {
                zoom: this._camera.zoom + 2,
                duration: 3,
                ease: "power3.inOut",
              },
              0
            ),
            t.fromTo(
              this._camera.position,
              { z: -300 },
              { z: -305, duration: 4 },
              0
            ),
            t.call(
              () => {
                this.diamondMouseEnter.enable(), this.clickMouseEnter.enable();
              },
              null,
              3
            ),
            t.set(this.landingEnterHitArea, { visibility: "visible" }, 4),
            (this.SKIP_LOAD_ANIMATION || this.SKIP_INTRO) && t.timeScale(10),
            t.add(() => {
              document.documentElement.classList.add("darkMenu");
            }, 1.3),
            document.body.classList.add("loaded"),
            t.play();
        }
        setupDebugControls() {
          var t = !0;
          window.addEventListener("keyup", (e) => {
            if (
              ("h" == e.key && document.body.classList.toggle("hide-debug"),
              "d" == e.key)
            ) {
              if (t) {
                t = !1;
                var i = new s.CameraHelper(this._camera);
                this.DebugHelpers.push(i),
                  this._scene.add(i),
                  this.debugCamera.position.copy(this._camera.position),
                  this.cameraLookAtPoint.add(
                    new s.Mesh(
                      new s.SphereBufferGeometry(1),
                      new s.MeshBasicMaterial({ color: 1672e4 })
                    )
                  );
              }
              (this.DEBUG_MODE = !this.DEBUG_MODE),
                this.DEBUG_MODE
                  ? document.body.classList.add("camera-debug")
                  : document.body.classList.remove("camera-debug"),
                (this._controls.enabled = this.DEBUG_MODE);
            }
          });
        }
        setupDebug() {
          document.body.classList.add("show-fps"),
            (this.debugCamera = new s.PerspectiveCamera(
              45,
              this.width / this.height,
              1,
              8e3
            )),
            this.menu
              .add(this._camera, "fov")
              .min(0)
              .max(179.99)
              .step(0.1)
              .onChange((t) => {
                (this._camera.fov = t), this._camera.updateProjectionMatrix();
              }),
            this.menu
              .add(this._camera, "far")
              .min(0)
              .max(200)
              .step(0.1)
              .onChange((t) => {
                (this._camera.far = t), this._camera.updateProjectionMatrix();
              }),
            (this.debugCamera.position.z = 300),
            (this._controls = new p.a(
              this.debugCamera,
              this._renderer.domElement
            )),
            this._controls.target.set(0, 0, 0),
            (this._controls.zoomSpeed = 0.1),
            (this._controls.enabled = this.DEBUG_MODE),
            (this.stats = Object(o.a)()),
            document.body.appendChild(this.stats.dom),
            this.menu.close(),
            (window.THREE = s),
            (window.scene = this._scene);
        }
      }
    },
  },
]);
