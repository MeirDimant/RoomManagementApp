import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { useState, useEffect } from "react";
import { getContent, getEntity } from "../../API/content";
import { Box, Button, Typography } from "@mui/material";

export default function Orders() {
  const [roomsNums, setRoomsNums] = useState([]);
  const [error, setError] = useState(undefined);
  const [selectedRoom, setSelectedRoom] = useState(undefined);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getRoomsNums = async () => {
      const response = await getContent("rooms");
      if (response && response.data) {
        setRoomsNums(response.data);
        if (response.data.length > 0) {
          setSelectedRoom(response.data[0]);
        }
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
        const orders = response.data.attributes.orders.data;
        setOrders(
          orders.map((order) => ({
            startDate: new Date(order.attributes.checkIn),
            endDate: new Date(order.attributes.checkOut),
            key: "" + order.id,
          }))
        );
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
      <Typography sx={{ mt: 2 }} variant="h3" component="div">
        All orders
      </Typography>

      <div className="calendar-container">
        <DateRange
          showSelectionPreview={false}
          showDateDisplay={false}
          ranges={orders}
          onChange={() => {}}
        />
      </div>
      {roomsNums && (
        <Box sx={{ "& .MuiButton-root": { ml: 1 } }}>
          <Typography
            sx={{ mb: 1, textDecoration: "underline" }}
            variant="h6"
            component="div"
          >
            Rooms
          </Typography>

          {roomsNums.map((room, index) => (
            <Button
              key={index}
              variant="outlined"
              size="medium"
              onClick={() => {
                setSelectedRoom(room);
              }}
            >
              {room.attributes.RoomNum}
            </Button>
          ))}
        </Box>
      )}
    </div>
  );
}
