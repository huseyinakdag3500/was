import { useEffect, useState } from "react";
import TurkiyeMap from "../components/TurkiyeMap";
import Countdown from "../components/Countdown";

export default function Home() {
  const [colors, setColors] = useState({});

  useEffect(() => {
    fetch("/api/colors")
      .then((res) => res.json())
      .then(setColors);
  }, []);

  return (
    <div className="container">
      <h1>Was Harita</h1>

      <div className="map-wrapper">
        <TurkiyeMap colors={colors} />
      </div>
      <div className="container">
        <div className="countdown">
          <Countdown />
        </div>
      </div>
      <style jsx global>{`
        body {
          background-color: rgb(0, 0, 0);
        }
      `}</style>

      <style jsx>{`
        body {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .countdown {
        position:fixed;;
          top: 0;
          right: 0;
        }
        .container {
        max-width:1300px;
          margin: 40px auto;
          text-align: center;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          padding: 0 20px;
          color: #222;
        }
        h1 {
          font-weight: 800;
          font-size: 2.8rem;
          margin-bottom: 10px;
          color: #0070f3;
        }
        .subtitle {
          font-size: 1.2rem;
          color: #555;
          margin-bottom: 30px;
        }
        .map-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          border: 0px solid #ddd;
          border-radius: 12px;
          padding: 15px;
          background: rgb(0, 0, 0);
          box-shadow: 0 3px 12px rgb(0 0 0 / 0.1);
        }
        @media (max-width: 600px) {
          h1 {
            font-size: 2rem;
          }
          .subtitle {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
