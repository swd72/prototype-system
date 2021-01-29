import React from "react";
import { Container } from "reactstrap";
import Tabs from "react-responsive-tabs";

export default function InformationData(props) {
  const presidents = [
    { name: "ข้อมูลส่วนตัว", biography: " first Name" },
    { name: "ที่อยู่", biography: "..." },
    { name: "ประวัติการศึกษา", biography: "..." },
    { name: "ประวัติการอบรม", biography: "..." },
    { name: "ข้อมูลใบประกอบวิชาชีพ", biography: "..." },
    { name: "ข้อมูลเครื่องราชอิสริยาภรณ์", biography: "..." },
    { name: "ข้อมูลการได้รับโทษ", biography: "..." },
    { name: "ข้อมูลการลา", biography: "..." },
  ];

  const getTabs = () => {
    return presidents.map((president, index) => ({
      title: president.name,
      getContent: () => president.biography,
      key: index,
      tabClassName: "tab",
      panelClassName: "panel",
    }));
  };

  return (
    <div>
      <Container className="py-3">
        <Tabs items={getTabs()} transformWidth={0} showMore={false} />
      </Container>
    </div>
  );
}
