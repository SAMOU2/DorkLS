const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(2.5, 64, 64);
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg');
const material = new THREE.MeshPhongMaterial({ 
    map: earthTexture,
    shininess: 5,
    bumpScale: 0.05
});

const earth = new THREE.Mesh(geometry, material);
scene.add(earth);

const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
sunLight.position.set(5, 3, 5);
scene.add(sunLight);

const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
scene.add(ambientLight);

camera.position.z = 6;

function animate3D() {
    requestAnimationFrame(animate3D);
    earth.rotation.y += 0.0015;
    renderer.render(scene, camera);
}
animate3D();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

const resultsArea = document.getElementById('scan-results');
const mockUrls = [
    "http://target-shop.com/prod.php?id=88",
    "https://db-server.net/view.php?user=admin",
    "http://portal.edu/search.php?query=test",
    "https://api-vulnerable.io/v1/get?file=config"
];

function addResult() {
    const randomUrl = mockUrls[Math.floor(Math.random() * mockUrls.length)];
    const div = document.createElement('div');
    div.style.marginBottom = "8px";
    div.style.color = "#fff";
    div.innerHTML = `<span style="color: #00ffcc;">[+] FOUND:</span> ${randomUrl}`;
    
    resultsArea.appendChild(div);

    if (resultsArea.childNodes.length > 6) {
        resultsArea.removeChild(resultsArea.firstChild);
    }
}

setInterval(addResult, 2000);