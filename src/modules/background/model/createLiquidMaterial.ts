import * as THREE from 'three';

export function createLiquidMaterial(theme: string | undefined) {
  return new THREE.ShaderMaterial({
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

      float noise(vec2 p) {
        return
          sin(p.x) +
          sin(p.y) +
          sin((p.x + p.y) * 0.6);
      }

      void main() {
        vec2 uv = vUv;

        uv.y -= uScroll * 0.15;
      
        vec2 p = uv * 8.0;

        // cursor influence
        float dist = distance(uv, uMouse);
        float radius = 0.35;
        float falloff = smoothstep(radius, 0.0, dist);
        vec2 offset = (uv - uMouse) * falloff * 2.0;

        float n =
          sin(p.x + offset.x + uTime) +
          sin(p.y + offset.y - uTime) +
          sin((p.x + p.y) * 0.6 + uTime);

        // contour lines (only edges)
        float bands = abs(fract(n * 1.2) - 0.5);
        float edge = smoothstep(0.46, 0.5, bands);

        vec3 darkBg = vec3(0.06);
        vec3 darkLines = vec3(0.2);

        vec3 lightBg = vec3(1.0);
        vec3 lightLines = vec3(0.02);

        vec3 bg = mix(lightBg, darkBg, uTheme);
        vec3 lines = mix(lightLines, darkLines, uTheme);

        vec3 color = mix(bg, lines, edge);

        gl_FragColor = vec4(color, 0.18);
      }
    `
  });
}
