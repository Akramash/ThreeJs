import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Loader from '../components/Loader';
import Island from '../models/Island';
import Ocean from '../models/Ocean';
import Fish from '../models/Fish';
import Diver from '../models/Diver';
const Home = () => {
  const [isRotating, setisRotating] = useState(false);
  const adjustIslandForScreenSize = () => {
    let screenScale = null 
    let screenPosition = [0, -25, -12.5];
    let rotation = [0.1,5.8,0]

    if(window.innerWidth < 768){
      screenScale = [0.9,0.9,0.9];
    } else{
      screenScale = [1, 1, 1];      
    }

    return [screenScale, screenPosition, rotation];
  }

  const adjustDiverForScreenSize = () => {
    let screenScale, screenPosition;

    if(window.innerWidth < 768){
        screenScale = [7, 7, 7]; // Increased from 5 for smaller screens
        screenPosition = [1, 1, 1]; // Adjusted Z to bring closer
    } else{
        screenScale = [5, 5, 5]; // Significantly increased from 10 for larger screens
        screenPosition = [0, -2, 0]; // Adjusted Z to bring closer     
    }

    return [screenScale, screenPosition];
  }

  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
  const [diverScale, diverPosition] = adjustDiverForScreenSize();
  return (
    <section className={`w-full h-screen relative ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}>
      <Canvas 
        className='w-full h-screen bg-transparent'
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1,1,1]} intensity={2} />
          <ambientLight intensity={0.25} />
          {<hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={2}/>}

          <Fish />
          <Ocean />
          <Island 
            scale={islandScale}
            position={islandPosition}
            rotation={islandRotation}
            isRotating={isRotating}
            setisRotating={setisRotating}
          
          />
          <Diver
            isRotating={isRotating}
            scale={diverScale}
            position={diverPosition}
            rotation={[0, 20, 0]}
          
          />
        </Suspense>


      </Canvas>
    </section>
  )
}

export default Home