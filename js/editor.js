$(function(){
    var height = 20,
        size = 200,
        hover = 30,
        curveSegments = 4,
        bevelThickness = 2,
        bevelSize = 1.5,
        bevelSegments = 3,
        bevelEnabled = true,
        fontName = "optimer",
        font = "optimer", // helvetiker, optimer, gentilis, droid sans, droid serif
        fontWeight = "normal", // normal bold
        style = "normal"; // normal italic
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x8cc7de);
    
    // LIGHTS

    const dirLight = new THREE.DirectionalLight( 0xffffff, 0.125 );
    dirLight.position.set( 0, 0, 1 ).normalize();
    scene.add( dirLight );

    const pointLight = new THREE.PointLight( 0xffffff, 1.5 );
    pointLight.position.set( 0, 100, 90 );
    scene.add( pointLight );

    // Get text from hash

    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set( 0, 50, 700 );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio( window.devicePixelRatio );
    let neonContainer = document.querySelector('#neon');
    const loader = new THREE.FontLoader();
    var globalText;
    loader.load( 'js/node_modules/three/examples/fonts/droid/droid_sans_bold.typeface.json', function ( response ) {

        font = response;

        let neonText = new THREE.TextGeometry( "Your text",  {

            size: size,
            height: height,
            curveSegments: curveSegments,
            font: font,
            weight: fontWeight,
            style: style,
            bevelThickness: bevelThickness,
            bevelSize: bevelSize,
            bevelEnabled: bevelEnabled,
        } );
    
        neonText.computeBoundingBox();

        globalText = neonText;

        const centerOffset = - 0.5 * ( neonText.boundingBox.max.x - neonText.boundingBox.min.x );

        var material = new THREE.MeshBasicMaterial({color: "yellow"});
        var textGeo = new THREE.Mesh(neonText, material); 
        scene.add(textGeo);
        textGeo.position.x = centerOffset;
        textGeo.position.y = 30;
        textGeo.position.z = 0;
        // textGeo.rotation.x = 0;
        // textGeo.rotation.y = Math.PI * 2;

        // const dragControls = new THREE.DragControls( neonText, camera, renderer.domElement );

        // // add event listener to highlight dragged objects

        // dragControls.addEventListener( 'dragstart', function ( event ) {

        //     event.object.material.emissive.set( 0xaaaaaa );

        // } );

        // dragControls.addEventListener( 'dragend', function ( event ) {

        //     event.object.material.emissive.set( 0x000000 );

        // } );
        render();
    } );

    renderer.setSize( neonContainer.offsetWidth, neonContainer.offsetHeight );
    neonContainer.appendChild( renderer.domElement );
    function render() {
        renderer.render(scene, camera);
    }

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 5, 0);
    controls.update();
    controls.addEventListener('change', render);
    window.addEventListener('resize', render);

    render();

   
})