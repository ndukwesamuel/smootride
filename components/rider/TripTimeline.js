import React from "react";
import Timeline from "react-native-timeline-flatlist";

const Triptimeline = ({ wayPoints }) => {
  // console.log({ wayPoints });

  return (
    <Timeline
      innerCircle={"dot"}
      lineColor="#005091"
      circleColor="#007cc2"
      timeContainerStyle={{ minWidth: 52, marginTop: 0 }}
      descriptionStyle={{ color: "gray" }}
      data={wayPoints}
      titleStyle={{ color: "gray", fontSize: 14 }}
      timeStyle={{
        textAlign: "center",
        backgroundColor: "#005091",
        color: "white",
        padding: 2,
        borderRadius: 13,
      }}
      options={{
        style: { marginTop: 5 },
      }}
    />
  );
};

export default Triptimeline;
