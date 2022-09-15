import Calendar from "react-calendar";
import { useState } from "react";

export default function Orders() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="app">
      <h1 className="header">All orders</h1>
      <div className="calendar-container">
        <Calendar onChange={setDate} value={date} locale="he" />
      </div>
      <div className="text-center">Selected date: {date.toDateString()}</div>
    </div>
  );
}
