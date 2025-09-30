import { j as jsxRuntimeExports, B as Button, ce as NotificationsCenter } from "./index-CZYVfY9K.js";
import { u as useNavigate } from "./vendor-CYUu28OS.js";
import { A as ArrowLeft } from "./arrow-left-BjTckGNp.js";
const NotificationsPage = () => {
  const navigate = useNavigate();
  const handleNotificationClick = (notification) => {
    switch (notification.source_type) {
      case "social":
        navigate(`/community?post=${notification.source_id}`);
        break;
      case "observation":
        navigate(`/main?observation=${notification.source_id}`);
        break;
      case "incident":
        navigate(`/main?incident=${notification.source_id}`);
        break;
      case "profile":
        navigate(`/profile?user=${notification.actor_id}`);
        break;
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "ghost",
        size: "sm",
        onClick: () => navigate(-1),
        className: "flex items-center gap-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
          "Back"
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationsCenter, { onNotificationClick: handleNotificationClick }) })
  ] });
};
export {
  NotificationsPage as default
};
