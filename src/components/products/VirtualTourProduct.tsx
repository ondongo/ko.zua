"use client"
import React, { useState } from "react";
import {
  ReactPhotoSphereViewer,
 
} from "react-photo-sphere-viewer";

import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
import "@photo-sphere-viewer/markers-plugin/index.css"
function VirtualTourProduct() {
  //const photoSphereRef = React.createRef();
  const [markersManager, setMarkerManager] = useState<any>();
  const pSRef = React.useCallback((node: any) => {
    const markersPlugs = node?.getPlugin(MarkersPlugin);
    setMarkerManager(markersPlugs);
  }, []);

  React.useEffect(() => {
    if (markersManager) {
      console.log(markersManager);
      markersManager.on("select-marker", (e: any, marker: any, data: any) => {
        console.log("asd");
      });
      markersManager.on("over-marker", (e: any, marker: any) => {
        console.log(`Cursor is over marker ${marker.id}`);
      });
    }
  }, [markersManager]);

  const plugins: any = [
    [
      MarkersPlugin,
      {
        // list of markers
        markers: [
          {
            // image marker that opens the panel when clicked
            id: "image",
            longitude: 0.33,
            latitude: 0.1,
            image: "pin-blue.png",
            width: 32,
            height: 32,
            anchor: "bottom center",
            tooltip: "Mountain peak. <b>Click me!</b>",
          },
          {
            // image marker rendered in the 3D scene
            id: "imageLayer",
            imageLayer: "drone.png",
            width: 220,
            height: 220,
            longitude: 13.5,
            latitude: -0.1,
            tooltip: "Image embedded in the scene",
          },
        ],
      },
    ],
  ];

  const handleClick = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <ReactPhotoSphereViewer
        ref={pSRef}
        src="/images/ptest.jpeg"
        height={"100vh"}
        width={"100%"}
        littlePlanet={false}
        onClick={handleClick}
        plugins={plugins}
      ></ReactPhotoSphereViewer>
    </div>
  );
}

export default VirtualTourProduct;
