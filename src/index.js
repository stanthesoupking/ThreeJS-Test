/**
 * Three.JS Test
 */

import * as THREE from 'three';

var camera, scene, renderer;
var geometry, material, mesh, light;

const SCREEN_DIM = {
    width: 800,
    height: 600
};

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(70, SCREEN_DIM.width / SCREEN_DIM.height, 0.01, 10);
    camera.position.z = 1;

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    material = new THREE.MeshStandardMaterial();

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    light = new THREE.PointLight();
    light.position.set(-1.0, 2.0, 2.0);
    scene.add(light);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(SCREEN_DIM.width, SCREEN_DIM.height);
    document.getElementsByClassName('application-context')[0].appendChild(renderer.domElement);
}

function animate() {

    requestAnimationFrame(animate);

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;

    renderer.render(scene, camera);

}