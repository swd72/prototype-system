import React, { useState, useContext } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import PersonalInformation from "../components/PersonalInformation";
import Address from "../components/Address";
import Education from "../components/Education";
import { AuthContext } from "../provider/AuthProvider";
import Training from "../components/Training";
import Prolicense from "../components/Prolicense";
import Insignia from "../components/Insignia";
import Amnesty from "../components/Amnesty";

const Example = (props) => {
  const [activeTab, setActiveTab] = useState(1);
  const { user } = useContext(AuthContext);

  const presidents = [
    { name: "ข้อมูลส่วนตัว", biography: <PersonalInformation person_id={user.person_id} editor={true} /> },
    { name: "ที่อยู่", biography: <Address person_id={user.person_id} editor={true} /> },
    { name: "ประวัติการศึกษา", biography: <Education person_id={user.person_id} editor={true} /> },
    { name: "ประวัติการอบรม", biography: <Training person_id={user.person_id} editor={true} /> },
    { name: "ข้อมูลใบประกอบวิชาชีพ", biography: <Prolicense person_id={user.person_id} editor={true} /> },
    { name: "ข้อมูลเครื่องราชอิสริยาภรณ์", biography: <Insignia person_id={user.person_id} /> },
    { name: "ข้อมูลการได้รับโทษ", biography: <Amnesty person_id={user.person_id} /> },
    { name: "ข้อมูลการลา", biography: "...ข้อมูลการลา" },
  ];

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const getNavItem = () => {
    return presidents.map((president, index) => (
      <NavItem key={`NavItem${index}`}>
        <NavLink
          className={classnames({ active: activeTab === index + 1 })}
          style={{ cursor: "pointer", borderStyle: "solid", borderColor: "gray" }}
          onClick={() => {
            toggle(index + 1);
          }}
        >
          {president.name}
        </NavLink>
      </NavItem>
    ));
  };

  const getTabPane = () => {
    return presidents.map((president, index) => (
      <TabPane key={`tabpane${index}`} tabId={index + 1}>
        {president.biography}
      </TabPane>
    ));
  };

  return (
    <div>
      <Nav tabs>
        {getNavItem()}
      </Nav>
      <TabContent activeTab={activeTab}>
        {getTabPane()}
      </TabContent>
    </div>
  );
};

export default Example;
