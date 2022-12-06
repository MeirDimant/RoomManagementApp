import { Calendar } from "react-date-range";
import { useState, useEffect } from "react";
import { getContent, getEntity } from "../API/content";

export default function Orders() {
  const [oneDate, setOneDate] = useState(new Date());
  const [date, setDate] = useState([new Date(), new Date()]);
  const [roomsNums, setRoomsNums] = useState([]);
  const [error, setError] = useState(undefined);
  const [selectedRoom, setSelectedRoom] = useState(undefined);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getRoomsNums = async () => {
      const response = await getContent("rooms");
      if (response && response.data) {
        setRoomsNums(response.data);
      } else {
        setError(response);
      }
    };

    getRoomsNums();
  }, []);

  useEffect(() => {
    const getOrdersByRoom = async () => {
      const query = {
        populate: "*",
      };
      const response = await getEntity("rooms", selectedRoom.id, query);
      if (
        response &&
        response.data &&
        response.data.attributes &&
        response.data.attributes.orders &&
        response.data.attributes.orders.data
      ) {
        setOrders(response.data.attributes.orders.data);
      } else {
        setError(response);
      }
    };
    if (selectedRoom) {
      getOrdersByRoom();
    }
  }, [selectedRoom]);

  if (error) console.log(error);

  return (
    <div className="orders">
      <h1 className="header">All orders</h1>
      {roomsNums && (
        <div>
          <p>
            Rooms:
            {roomsNums.map((room, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedRoom(room);
                }}
              >
                {room.attributes.RoomNum}
              </button>
            ))}
          </p>
        </div>
      )}

      <div className="calendar-container">
        <Calendar date={oneDate} onChange={setOneDate} />
      </div>
      <div className="text-center">Selected date: {oneDate.toDateString()}</div>
    </div>
  );
}
