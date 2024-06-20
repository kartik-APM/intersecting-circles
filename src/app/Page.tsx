import React, { useCallback, useEffect, useRef, useState } from "react";
import "../styles/Global.css";

function Page() {
  const [circles, setCircles] = useState([] as any);
  const myRef = useRef<HTMLElement | null>(null);

  const handleClick = useCallback((event: any) => {

    let numberOfCircle = document.querySelectorAll(".App div").length;
    if (numberOfCircle === 2) {
      const allCircles = document.querySelectorAll(".App div");
      allCircles.forEach((circle) => {
        circle.remove();
      });
      setCircles([]);
      return;
    }

    const X = event.clientX;
    const Y = event.clientY;
    var radius = gerRandomRadius();

    const circle = document.createElement("div");
    setCircles([...circles, { x: X, y: Y, radius }]);
    circle.style.width = `${radius * 2}px`;
    circle.style.height = `${radius * 2}px`;
    circle.style.borderRadius = "50%";
    circle.style.borderColor = "black";
    circle.style.borderWidth = "1px";
    circle.style.borderStyle = "solid";
    circle.style.position = "absolute";
    circle.style.left = `${X - radius}px`;
    circle.style.top = `${Y - radius}px`;

    const appDiv = document.querySelector(".App");
    appDiv?.appendChild(circle);

    numberOfCircle = document.querySelectorAll(".App div").length;
    if (numberOfCircle === 2) {
      const x1 = circles[0].x;
      const y1 = circles[0].y;
      const r1 = circles[0].radius;

      if (ifIntersecting(x1, y1, r1, X, Y, radius)) {
        console.log("Circles are intersecting");
      }
    }
  },[circles]);

  useEffect(() => {
    const node = myRef.current;
    node?.addEventListener("click", handleClick);
    return () => {
      node?.removeEventListener("click", handleClick);
    };
  }, [handleClick]);

  const ifIntersecting = (
    x1: number,
    y1: number,
    r1: number,
    x2: number,
    y2: number,
    r2: number
  ) => {
    const distance = Math.hypot(x2 - x1, y2 - y1);
    if (distance <= Math.abs(r1 - r2)) {
      // One circle is completely inside the other
      return false;
    } else if (distance <= r1 + r2) {
      // Circles are intersecting
      return true;
    } else {
      // Circles are not intersecting
      return false;
    }
  };

  const gerRandomRadius = () => {
    return Math.floor(Math.random() * (200 - 50 + 1) + 50);
  };

  return <div onClick={handleClick} className="App"></div>;
}

export default Page;
