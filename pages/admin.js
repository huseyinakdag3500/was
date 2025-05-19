import { useEffect, useState } from "react";
import TurkiyeMap from "../components/TurkiyeMap";

const sehirIsimleri = {
  "01": "Adana",
  "02": "Adıyaman",
  "03": "Afyonkarahisar",
  "04": "Ağrı",
  "05": "Amasya",
  "06": "Ankara",
  "07": "Antalya",
  "08": "Artvin",
  "09": "Aydın",
  "10": "Balıkesir",
  "11": "Bilecik",
  "12": "Bingöl",
  "13": "Bitlis",
  "14": "Bolu",
  "15": "Burdur",
  "16": "Bursa",
  "17": "Çanakkale",
  "18": "Çankırı",
  "19": "Çorum",
  "20": "Denizli",
  "21": "Diyarbakır",
  "22": "Edirne",
  "23": "Elazığ",
  "24": "Erzincan",
  "25": "Erzurum",
  "26": "Eskişehir",
  "27": "Gaziantep",
  "28": "Giresun",
  "29": "Gümüşhane",
  "30": "Hakkâri",
  "31": "Hatay",
  "32": "Isparta",
  "33": "Mersin",
  "34": "İstanbul",
  "35": "İzmir",
  "36": "Kars",
  "37": "Kastamonu",
  "38": "Kayseri",
  "39": "Kırklareli",
  "40": "Kırşehir",
  "41": "Kocaeli",
  "42": "Konya",
  "43": "Kütahya",
  "44": "Malatya",
  "45": "Manisa",
  "46": "Kahramanmaraş",
  "47": "Mardin",
  "48": "Muğla",
  "49": "Muş",
  "50": "Nevşehir",
  "51": "Niğde",
  "52": "Ordu",
  "53": "Rize",
  "54": "Sakarya",
  "55": "Samsun",
  "56": "Siirt",
  "57": "Sinop",
  "58": "Sivas",
  "59": "Tekirdağ",
  "60": "Tokat",
  "61": "Trabzon",
  "62": "Tunceli",
  "63": "Şanlıurfa",
  "64": "Uşak",
  "65": "Van",
  "66": "Yozgat",
  "67": "Zonguldak",
  "68": "Aksaray",
  "69": "Bayburt",
  "70": "Karaman",
  "71": "Kırıkkale",
  "72": "Batman",
  "73": "Şırnak",
  "74": "Bartın",
  "75": "Ardahan",
  "76": "Iğdır",
  "77": "Yalova",
  "78": "Karabük",
  "79": "Kilis",
  "80": "Osmaniye",
  "81": "Düzce",
};

export default function Admin() {
  const [colors, setColors] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [pickerColor, setPickerColor] = useState("#ff0000");


  useEffect(() => {
    fetch("/api/colors")
      .then((res) => res.json())
      .then(setColors);
  }, []);


  function handleRegionClick(plakaKodu) {
    const idStr = plakaKodu.toString().padStart(2, "0");
    setSelectedId(idStr);
    setPickerColor(colors[idStr] || "#ff0000");
  }


  async function saveColor() {
    if (!selectedId) return;
    await fetch('/api/colors', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer selamCetin123' 
  },
  body: JSON.stringify({ id: selectedId, color: pickerColor }),
})

    setColors({ ...colors, [selectedId]: pickerColor });
    setSelectedId(null);
  }

  return (
    <div className="container">
      <h1 style={{ fontSize: "1.5rem", color: "#0070f3" }}>Was Harita - Admin
        
      </h1>

      <div className="map-container">
        <TurkiyeMap
          colors={colors}
          onRegionClick={handleRegionClick}
          selectedId={selectedId}
        />
      </div>

      {selectedId && (
        <div className="picker-panel">
          <h2>Seçilen Şehir:</h2>
          <p className="city-name">{sehirIsimleri[selectedId] || "Bilinmiyor"}</p>

          <input
            type="color"
            value={pickerColor}
            onChange={(e) => setPickerColor(e.target.value)}
            className="color-picker"
          />
          <button onClick={saveColor} className="save-button">
            Kaydet
          </button>
          <button onClick={() => setSelectedId(null)} className="cancel-button">
            İptal
          </button>
        </div>
      )}
<style jsx global>{`
  body {
    background-color:rgb(0, 0, 0); /* İstediğin renk kodunu buraya yaz */
  }
`}</style>

      <style jsx>{`
      
  .container {
    max-width: 900px;
    margin: 30px auto;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    text-align: center;
    padding: 0 20px;
    position: relative;
  }

  h1 {
    color: #222;
    margin-bottom: 20px;
  }

  .map-container {
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 15px;
    background: #fafafa;
    box-shadow: 0 2px 8px rgb(0 0 0 / 0.1);
    margin-bottom: 25px;
  }

  .picker-panel {
    position: fixed;
    top: 20px;
    left: 20px;
    background: #fff;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.15);
    min-width: 280px;
    z-index: 1000;
    text-align: left;
  }

  .city-name {
    font-size: 22px;
    font-weight: 700;
    margin: 10px 0 20px 0;
    color: #0070f3;
  }

  .color-picker {
    width: 120px;
    height: 50px;
    border: none;
    cursor: pointer;
    margin-bottom: 20px;
    border-radius: 6px;
    box-shadow: 0 0 5px #0070f3aa;
    transition: box-shadow 0.2s ease-in-out;
  }

  .color-picker:hover {
    box-shadow: 0 0 8px #0070f3dd;
  }

  .save-button,
  .cancel-button {
    padding: 10px 20px;
    font-size: 16px;
    margin: 0 8px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    transition: background-color 0.25s ease;
  }

  .save-button {
    background-color: #0070f3;
    color: white;
  }

  .save-button:hover {
    background-color: #005bb5;
  }

  .cancel-button {
    background-color: #ccc;
    color: #333;
  }

  .cancel-button:hover {
    background-color: #999;
    color: white;
  }

  @media (max-width: 600px) {
    .picker-panel {
      position: static;
      margin-top: 20px;
      min-width: 100%;
      box-shadow: none;
    }

    .color-picker {
      width: 100%;
    }

    .save-button,
    .cancel-button {
      width: 48%;
      margin: 5px 1%;
      font-size: 14px;
    }
  }
`}</style>

    </div>
  );
}
