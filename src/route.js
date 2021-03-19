import React, { lazy, Suspense } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { IoIosAddCircle, IoIosHome, IoMdLogOut, IoMdContact } from "react-icons/io";
import HomePage from "./views/Home";
import SignOutPage from "./views/SignOut";

const load = (Component) => (props) => (
  <Suspense fallback={<LinearProgress />}>
    <Component {...props} />
  </Suspense>
);

// const ProfilePage = load(lazy(() => import("./views/Profile")));
const PersonManagePage = load(lazy(() => import("./views/PersonManage")));
const InformationComponentPage = load(lazy(() => import("./views/InformationComponent")));
const EditPersonPage = load(lazy(() => import("./views/EditPersonPage")));

export const route = [
  {
    title: "หน้าแรก",
    color: "#3E86B8",
    bgcolor: "#93CCF3",
    router: "/index",
    icon: <IoIosHome size="30" />,
    menuStatus: false,
    sideStatus: true,
    component: HomePage,
    role: null,
  },
  {
    title: "ข้อมูลบุคลากร",
    color: "#3E86B8",
    bgcolor: "#93CCF3",
    router: "/person",
    icon: <IoIosAddCircle size="30" />,
    menuStatus: true,
    sideStatus: true,
    component: PersonManagePage,
    role: 2,
  },
  {
    title: "แก้ไขข้อมูลบุคลากร",
    color: "#3E86B8",
    bgcolor: "#93CCF3",
    router: "/hrmedit",
    icon: <IoIosAddCircle size="30" />,
    menuStatus: false,
    sideStatus: false,
    component: EditPersonPage,
    role: 2,
  },
  // {
  //   title: "โปรไฟล์",
  //   color: "#3E86B8",
  //   bgcolor: "#93CCF3",
  //   router: "/profile",
  //   icon: <IoMdContact size="30" />,
  //   menuStatus: true,
  //   component: ProfilePage,
  //   role: 99.99,
  // },
  {
    title: "ข้อมูลส่วนตัว",
    color: "#3E86B8",
    bgcolor: "#93CCF3",
    router: "/information",
    icon: <IoMdContact size="30" />,
    menuStatus: true,
    sideStatus: true,
    component: InformationComponentPage,
    role: 99.99,
  },
  {
    title: "ออกจากระบบ",
    color: "#3E86B8",
    bgcolor: "#93CCF3",
    router: "/logout",
    icon: <IoMdLogOut size="30" color="#C85752" />,
    menuStatus: true,
    sideStatus: true,
    component: SignOutPage,
    role: null,
  },
];
