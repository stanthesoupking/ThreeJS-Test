/**
 * Three.JS Test
 */

import * as THREE from 'three';

var camera, scene, renderer, raycaster;
var buildingGeometry, buildingMaterial, buildingMesh;
var groundGeometry, groundMaterial, groundMesh;
var light;

const SCREEN_DIM = {
    width: 800,
    height: 600
};

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(70, SCREEN_DIM.width / SCREEN_DIM.height, 0.01, 100);
    camera.position.z = 2.0;
    camera.position.y = 3.0;
    camera.rotateX(-1.0);
    camera.updateMatrixWorld();

    raycaster = new THREE.Raycaster();

    scene = new THREE.Scene();

    buildingGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    buildingMaterial = new THREE.MeshStandardMaterial();
    buildingMesh = new THREE.Mesh(buildingGeometry, buildingMaterial);
    buildingMesh.position.y = 0.25;
    buildingMesh.castShadow = true;
    buildingMesh.name = 'Building';
    scene.add(buildingMesh);

    groundGeometry = new THREE.PlaneGeometry(10.0, 10.0);
    groundMaterial = new THREE.MeshStandardMaterial();
    groundMaterial.color.setRGB(0, 1.0, 0);
    groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    groundMesh.setRotationFromAxisAngle(new THREE.Vector3(1, 0, 0), - Math.PI / 2.0);
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(0.5, 0.8, 0.3);
    light.castShadow = true;
    scene.add(light);

    var ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(ambientLight);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.setClearColor(new THREE.Color(0x80bfff));
    renderer.setSize(SCREEN_DIM.width, SCREEN_DIM.height);
    document.getElementsByClassName('application-context')[0].appendChild(renderer.domElement);

    renderer.domElement.addEventListener("click", (event) => {
        doClick(
            new THREE.Vector2(
                (event.offsetX / SCREEN_DIM.width) * 2 - 1,
                - (event.offsetY / SCREEN_DIM.height) * 2 + 1
            )
        );
    });
}

function animate() {

    requestAnimationFrame(animate);

    renderer.render(scene, camera);

}

function doClick(mousePos) {
    raycaster.setFromCamera(mousePos, camera);
    var intersects = raycaster.intersectObjects( scene.children );
    
    let selectBuilding = false;
    for (let x of intersects) {
        if (x.object.name === 'Building') {
            selectBuilding = true;
        }
    }

    if (selectBuilding) {
        buildingMaterial.color = new THREE.Color(0xff0000);
    } else {
        buildingMaterial.color = new THREE.Color(0xffffff)
    }
}