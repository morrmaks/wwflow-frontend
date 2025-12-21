import * as THREE from 'three';

import { isMobileDevice } from '@/shared/lib/utils';

import { createLiquidMaterial } from './createLiquidMaterial';

function createCamera() {
  return new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
}

function createRenderer(container: HTMLDivElement) {
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  return renderer;
}

function createMesh(theme?: string) {
  const material = createLiquidMaterial(theme);
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);

  return { mesh, material };
}

function createMouseController(container: HTMLDivElement) {
  const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

  const onMouseMove = (e: MouseEvent) => {
    const rect = container.getBoundingClientRect();
    mouse.tx = (e.clientX - rect.left) / rect.width;
    mouse.ty = 1 - (e.clientY - rect.top) / rect.height;
  };

  if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', onMouseMove, { passive: true });
  }

  return {
    mouse,
    dispose: () => {
      window.removeEventListener('mousemove', onMouseMove);
    }
  };
}

function createAnimator(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.Camera,
  material: THREE.ShaderMaterial,
  mouse: { x: number; y: number; tx: number; ty: number }
) {
  let raf: number;

  const animate = () => {
    material.uniforms.uTime.value += 0.003;

    mouse.x += (mouse.tx - mouse.x) * 0.08;
    mouse.y += (mouse.ty - mouse.y) * 0.08;
    material.uniforms.uMouse.value.set(mouse.x, mouse.y);

    renderer.render(scene, camera);
    raf = requestAnimationFrame(animate);
  };

  animate();

  return {
    dispose: () => cancelAnimationFrame(raf)
  };
}

function createResizeHandler(renderer: THREE.WebGLRenderer) {
  let lastSize: string | null = null;

  return (width: number, height: number) => {
    const finalHeight = isMobileDevice() ? window.screen.height : height;

    const key = `${width}x${finalHeight}`;
    if (key === lastSize) return;
    lastSize = key;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, finalHeight, true);
  };
}

export function createLiquidScene(container: HTMLDivElement, theme?: string) {
  const scene = new THREE.Scene();
  const camera = createCamera();
  const renderer = createRenderer(container);

  const { mesh, material } = createMesh(theme);
  scene.add(mesh);

  const mouseController = createMouseController(container);
  const animator = createAnimator(renderer, scene, camera, material, mouseController.mouse);

  const resize = createResizeHandler(renderer);

  const setTheme = (theme?: string) => {
    material.uniforms.uTheme.value = theme === 'dark' ? 1 : 0;
  };

  const setScroll = (scrollY: number) => {
    material.uniforms.uScroll.value = scrollY;
  };

  return {
    resize,
    setTheme,
    setScroll,
    dispose: () => {
      animator.dispose();
      mouseController.dispose();
      renderer.dispose();
      material.dispose();
      container.removeChild(renderer.domElement);
    }
  };
}

export type LiquidScene = ReturnType<typeof createLiquidScene>;
