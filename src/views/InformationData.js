import React, { useContext } from "react";
import { Container } from "reactstrap";
import Tabs from "react-responsive-tabs";
import PersonalInformation from "../components/PersonalInformation";
import { AuthContext } from "../provider/AuthProvider";

export default function InformationData(props) {
  const { user } = useContext(AuthContext);

  const presidents = [
    {
      name: "ข้อมูลส่วนตัว",
      biography: <PersonalInformation person_id={user.person_id} admin_state={true}/>,
    },
    { name: "ที่อยู่", biography: "...ที่อยู่" },
    { name: "ประวัติการศึกษา", biography: "...ประวัติการศึกษา" },
    { name: "ประวัติการอบรม", biography: "...ประวัติการอบรม" },
    { name: "ข้อมูลใบประกอบวิชาชีพ", biography: "...ข้อมูลใบประกอบวิชาชีพ" },
    {
      name: "ข้อมูลเครื่องราชอิสริยาภรณ์",
      biography: "...ข้อมูลเครื่องราชอิสริยาภรณ์",
    },
    { name: "ข้อมูลการได้รับโทษ", biography: "...ข้อมูลการได้รับโทษ" },
    { name: "ข้อมูลการลา", biography: "...ข้อมูลการลา" },
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
