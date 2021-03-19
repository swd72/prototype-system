import React, { useContext } from "react";
// import { Container } from "reactstrap";
import Tabs from "react-responsive-tabs";
import PersonalInformation from "../components/PersonalInformation";
import Address from "../components/Address";
import Education from "../components/Education";
import { AuthContext } from "../provider/AuthProvider";
import Training from "../components/Training";
import Prolicense from "../components/Prolicense";
import Insignia from "../components/Insignia";
import Amnesty from "../components/Amnesty";

export default function InformationData(props) {
  const { user } = useContext(AuthContext);

  const presidents = [
    {
      name: "ข้อมูลส่วนตัว",
      biography: <PersonalInformation person_id={user.person_id} admin_state={true} />,
    },
    { name: "ที่อยู่", biography: <Address person_id={user.person_id} /> },
    { name: "ประวัติการศึกษา", biography: <Education person_id={user.person_id} /> },
    { name: "ประวัติการอบรม", biography: <Training person_id={user.person_id} /> },
    { name: "ข้อมูลใบประกอบวิชาชีพ", biography: <Prolicense person_id={user.person_id} /> },
    {
      name: "ข้อมูลเครื่องราชอิสริยาภรณ์",
      biography: <Insignia person_id={user.person_id} />,
    },
    { name: "ข้อมูลการได้รับโทษ", biography: <Amnesty person_id={user.person_id} /> },
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
      xxxx
      <Tabs items={getTabs()} transformWidth={0} showMore={false} />
    </div>
  );
}
