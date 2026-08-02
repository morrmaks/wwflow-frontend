import * as THREE from 'three';

export function createLiquidMaterial(theme: string | undefined) {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uTheme: { value: theme === 'dark' ? 1 : 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      precision highp float;

      uniform float uTime;
      uniform float uScroll;
      uniform float uTheme;
      uniform vec2 uMouse;

      varying vec2 vUv;

      float ribbon(
        vec2 uv,
        float baseY,
        float width,
        float phase,
        float speed,
        float length,
        float period
      ) {
        float flowX = uv.x - uTime * speed + phase;
        float segmentX = fract(flowX / period) * period;
        float segmentMask =
          smoothstep(0.0, 0.12, segmentX) *
          (1.0 - smoothstep(length - 0.12, length, segmentX));
        float waveX = uv.x - uTime * speed;
        float baseCenter =
          baseY +
          sin(waveX * 3.2 + phase) * 0.038 +
          sin(waveX * 5.1 + phase * 1.4) * 0.018;
        float mouseX = abs(uv.x - uMouse.x);
        float mouseY = abs(baseCenter - uMouse.y);
        float mouseFalloff = smoothstep(0.38, 0.0, mouseX) * smoothstep(0.22, 0.0, mouseY);
        float center =
          baseCenter +
          (baseCenter - uMouse.y) * mouseFalloff * 0.75 +
          sin((uv.x - uMouse.x) * 16.0 + uTime * 0.45 + phase) * mouseFalloff * 0.02;
        float d = abs(uv.y - center);
        float edgeSoftness = 0.009;
        float pushedWidth = width * (1.0 - mouseFalloff * 0.18);
        float smokeTear = 1.0 - mouseFalloff * 0.5;

        return segmentMask *
          smokeTear *
          (1.0 - smoothstep(pushedWidth - edgeSoftness, pushedWidth + edgeSoftness, d));
      }

      void main() {
        vec2 uv = vUv;
        uv.y -= uScroll * 0.08;

        float r1 = ribbon(uv, 0.2, 0.02, 0.17, 0.42, 0.68, 1.34);
        float r2 = ribbon(uv, 0.34, 0.013, 0.73, 0.5, 0.48, 1.08);
        float r3 = ribbon(uv, 0.48, 0.03, 1.41, 0.36, 0.74, 1.57);
        float r4 = ribbon(uv, 0.63, 0.023, 2.28, 0.46, 0.55, 1.23);
        float r5 = ribbon(uv, 0.76, 0.016, 3.06, 0.54, 0.42, 0.96);
        float field = clamp(max(max(max(max(r1, r2), r3), r4), r5), 0.0, 1.0);

        vec3 lightRibbon = vec3(0.22, 0.66, 0.92);
        vec3 darkRibbon = vec3(0.36, 0.44, 0.95);
        vec3 lightRibbonAlt = vec3(0.31, 0.74, 0.88);
        vec3 darkRibbonAlt = vec3(0.44, 0.36, 0.88);
        vec3 colorMain = mix(lightRibbon, darkRibbon, uTheme);
        vec3 colorAlt = mix(lightRibbonAlt, darkRibbonAlt, uTheme);
        vec3 color =
          colorMain * max(max(r1, r3), r5) +
          colorAlt * max(r2, r4);
        color /= max(field, 0.001);
        float alpha = mix(1.0, 0.34, uTheme) * step(0.08, field);

        gl_FragColor = vec4(color, alpha);
      }
    `
  });
}
