import React, { lazy, Suspense } from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import {
  IoIosAddCircle,
  IoIosHome,
  IoMdDocument,
  IoIosPeople,
  IoMdLogOut,
  IoMdContact,
  IoMdCube,
} from "react-icons/io";
import HomePage from "./views/Home";
import SignOutPage from "./views/SignOut";
// import ProfilePage from "./views/Profile";

const load = (Component) => (props) => (
  <Suspense fallback={<LinearProgress />}>
    <Component {...props} />
  </Suspense>
);

const ProfilePage = load(lazy(() => import("./views/Profile")));
const InformationDataPage = load(lazy(() => import("./views/InformationData")));
const PersonManagePage = load(lazy(() => import("./views/PersonManage")));

export const route = [
  {
    title: "หน้าแรก",
    color: "#3E86B8",
    bgcolor: "#93CCF3",
    router: "/index",
    icon: <IoIosHome size="30" />,
    menuStatus: false,
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
    component: PersonManagePage,
    role: 2,
  },
  {
    title: "รายงานข้อมูล",
    color: "#3E86B8",
    bgcolor: "#93CCF3",
    router: "/report",
    icon: <IoMdDocument size="30" />,
    menuStatus: true,
    component: HomePage,
    role: 3,
  },
  {
    title: "จัดการหน่วยงาน",
    color: "#3E86B8",
    bgcolor: "#93CCF3",
    router: "/works",
    icon: <IoMdCube size="30" />,
    menuStatus: true,
    component: HomePage,
    role: 1,
  },
  {
    title: "จัดการข้อมูลผู้ใช้",
    color: "#3E86B8",
    bgcolor: "#93CCF3",
    router: "/users",
    icon: <IoIosPeople size="30" />,
    menuStatus: true,
    component: HomePage,
    role: 1,
  },
  {
    title: "โปรไฟล์",
    color: "#3E86B8",
    bgcolor: "#93CCF3",
    router: "/profile",
    icon: <IoMdContact size="30" />,
    menuStatus: true,
    component: ProfilePage,
    role: 99.99,
  },
  {
    title: "ข้อมูลส่วนตัว",
    color: "#3E86B8",
    bgcolor: "#93CCF3",
    router: "/testtab",
    icon: <IoMdContact size="30" />,
    menuStatus: true,
    component: InformationDataPage,
    role: 99.99,
  },
  {
    title: "ออกจากระบบ",
    color: "#3E86B8",
    bgcolor: "#93CCF3",
    router: "/logout",
    icon: <IoMdLogOut size="30" color="#C85752" />,
    menuStatus: true,
    component: SignOutPage,
    role: null,
  },
];
