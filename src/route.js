import React from "react";
import Loadable from "react-loadable";
import LoadingBar from "react-top-loading-bar";
import {
  IoIosAddCircle,
  IoIosHome,
  IoMdDocument,
  // IoIosFingerPrint,
  IoIosPeople,
  IoMdLogOut,
  IoMdContact,
  IoMdCube
} from "react-icons/io";

import HomePage from './views/Home'
// import SignInPage from './views/SignIn'
// import ProfilePage from './views/Profile'

function Loading(props) {
  const refresh = () => {
    window.location.reload(false);
  };
  if (props.error) {
    return (
      <div className="text-center text-danger">
        Error! ...{" "}
        <strong style={{ cursor: "pointer" }} onClick={refresh}>
          คลิ๊ก
        </strong>{" "}
        หรือ กด <strong>Ctrl+F5</strong>{" "}
      </div>
    );
  } else if (props.timedOut) {
    return (
      <div className="text-center">
        โปรแกรมใช้เวลาโหลด package นานเกินไป ...{" "}
        <strong
          style={{ cursor: "pointer" }}
          onClick={refresh}
          className="text-danger"
        >
          คลิ๊ก
        </strong>{" "}
        หรือ กด <strong>Ctrl+F5</strong>{" "}
      </div>
    );
  } else if (props.pastDelay) {
    return <LoadingBar progress={50} />
  } else if (props.isLoading) {
    return <LoadingBar progress={20} />
  } else {
    return null;
  }
}

const ProfilePage = Loadable({
  loader: () => import("./views/Profile"),
  loading: (propsLoad) => <Loading {...propsLoad} />,
  timeout: 5000,
});

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
    title: "บันทึกข้อมูล",
    color: "#3E86B8",
    bgcolor: "#93CCF3",
    router: "/dtlinsert",
    icon: <IoIosAddCircle size="30" />,
    menuStatus: true,
    component: HomePage,
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
    role: null,
  },
  // {
  //   title: "เข้าสู่ระบบ",
  //   color: "#3E86B8",
  //   bgcolor: "#93CCF3",
  //   router: "/login",
  //   icon: <IoIosFingerPrint size="30" />,
  //   menuStatus: false,
  //   component: SignInPage,
  //   role: null,
  // },
  {
    title: "ออกจากระบบ",
    color: "#3E86B8",
    bgcolor: "#93CCF3",
    router: "/logout",
    icon: <IoMdLogOut size="30" color="red" />,
    menuStatus: true,
    component: HomePage,
    role: null,
  },
  
];
