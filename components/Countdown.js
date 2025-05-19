import { useEffect, useState } from "react";

export default function Countdown() {
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const calculateDaysLeft = () => {
      const today = new Date();
      const target = new Date("2025-08-08T00:00:00");
      const diffTime = target - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysLeft(diffDays);
    };

    calculateDaysLeft(); 
  }, []);

  return (
    <div className="countdown">
      <p>📅 {daysLeft} gün kaldı.</p>
      <style jsx>{`
        .countdown {
          background-color: #f0f4ff;
          color: #1a3b8b;
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 18px;
          font-weight: bold;
          display: inline-block;
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
}
