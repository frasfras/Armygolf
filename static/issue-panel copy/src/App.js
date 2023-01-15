import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import Ground from './components/Ground';
// import ClubBase from './components/ClubBase';
// import ClubPipe from './components/ClubPipe';
// import DetermineLie from './components/DetermineLie';




const skyAndGroundWidth = 300;

const Sky = () => {
    const skyStyle = {
      fill: '#30abef',
    };
    const gameHeight = 320;
    return (
      <rect
        style={skyStyle}
        x={skyAndGroundWidth / -2}
        y={100 - gameHeight}
        width="100%"
        height={gameHeight}
      />
    );
  };
  const CannonBall = (props) => {
    const ballStyle = {
      fill: '#777',
      stroke: '#444',
      strokeWidth: '2px',
    };
    return (
      <ellipse
        style={ballStyle}
        cx={props.position.x}
        cy={props.position.y}
        rx="16"
        ry="16"
      />
    );
  };
  const Canvas = (props) => {
    const viewBox = [300 / -2, 100 - 720, 300, 720];
    return (
      <svg
        id="aliens-go-home-canvas"
        preserveAspectRatio="xMaxYMax none"
        onMouseMove={props.trackMouse}
        viewBox={viewBox}
      >
        <Sky />
        <Ground />
        <circle cx={0} cy={0} r={50} />
         {/* <ClubPipe rotation="{props.angle}" /> */}
        {/* <ClubBase /> */}
        <CannonBall position={{x: 0, y: -100}}/> 
      </svg>
    )
  }
  
function App () {
 const [data, setData] = useState(null);

  useEffect(() => {
    invoke('getText', { example: 'my-invoke-variable' }).then(setData);
    // const self = this;
    // setInterval(() => {
    //   self.props.moveObjects(self.canvasMousePosition);
    // }, 10);
  }, []);
 
 
  
        
//  var lengthYards = data + "%";
  return (
    <div> 
      {data ? data : 'Loading...'}
      <svg 
       width="100%" height="50px">
        <g class="bars">
          <rect fill="#ff0000" width="100%" height="25px"></rect>
          <rect fill="#00ff00" width="50%" height="25px"></rect>
        </g>
     
      </svg> 
      <Canvas />
    </div>
  );
 
}


export default App;
