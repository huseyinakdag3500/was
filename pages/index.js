import { useEffect, useState } from "react";
import TurkiyeMap from "../components/TurkiyeMap";


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
    <style jsx global>{`
  body {
    background-color:rgb(0, 0, 0); /* İstediğin renk kodunu buraya yaz */
  }
`}</style>

      <style jsx>{`
        .container {
          max-width: 900px;
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
          border: 1px solid #ddd;
          border-radius: 12px;
          padding: 15px;
          background: #fafafa;
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
