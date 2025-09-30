import { l as useAuth, k as useLanguage, j as jsxRuntimeExports, B as Button, v as Badge, cf as Input, a7 as Tabs, a8 as TabsList, a9 as TabsTrigger, ao as Users, r as Clock, aa as Shield, ae as TabsContent, al as ScrollArea, C as Card, a2 as Avatar, a3 as AvatarImage, a4 as AvatarFallback, aB as MessageCircle, b3 as X, cg as en, ch as es, ci as UserService } from "./index-CZYVfY9K.js";
import { u as useNavigate, r as reactExports } from "./vendor-CYUu28OS.js";
import { D as DropdownMenu, a as DropdownMenuTrigger, E as EllipsisVertical, b as DropdownMenuContent, c as DropdownMenuItem } from "./dropdown-menu-D_fKQ3sK.js";
import { A as ArrowLeft } from "./arrow-left-BjTckGNp.js";
import { S as Star } from "./star-ah6ajVvg.js";
import { C as Check } from "./check-CPZybvMl.js";
import "./circle-vE8yasc-.js";
const FriendsScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language } = useLanguage();
  const t = language === "en" ? en.friends : es.friends;
  reactExports.useState({});
  const [friends, setFriends] = reactExports.useState([]);
  const [friendRequests, setFriendRequests] = reactExports.useState([]);
  const [stats, setStats] = reactExports.useState({
    total_friends: 0,
    pending_requests: 0,
    sent_requests: 0,
    blocked_users: 0
  });
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(true);
  const userService = UserService.getInstance();
  const [activeTab, setActiveTab] = reactExports.useState("friends");
  reactExports.useEffect(() => {
    if (user?.id) {
      loadAllData();
    }
  }, [user?.id]);
  const loadAllData = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const [friendsData, requestsData, statsData] = await Promise.all([
        userService.getFriends(user.id),
        userService.getFriendRequests(user.id),
        userService.getFriendsStats(user.id)
      ]);
      setFriends(friendsData);
      setFriendRequests(requestsData);
      setStats(statsData);
    } catch (error) {
      console.error("Error loading friends data:", error);
    } finally {
      setLoading(false);
    }
  };
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = /* @__PURE__ */ new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1e3 * 60));
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };
  const handleAcceptRequest = async (requestId) => {
    if (!user?.id) return;
    try {
      const success = await userService.acceptFriendRequest(requestId, user.id);
      if (success) {
        loadAllData();
      }
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };
  const handleDeclineRequest = async (requestId) => {
    if (!user?.id) return;
    try {
      const success = await userService.declineFriendRequest(requestId, user.id);
      if (success) {
        loadAllData();
      }
    } catch (error) {
      console.error("Error declining friend request:", error);
    }
  };
  const handleCancelRequest = async (requestId) => {
    if (!user?.id) return;
    try {
      const success = await userService.cancelFriendRequest(requestId, user.id);
      if (success) {
        loadAllData();
      }
    } catch (error) {
      console.error("Error canceling friend request:", error);
    }
  };
  const handleRemoveFriend = async (friendId) => {
    if (!user?.id) return;
    try {
      const success = await userService.removeFriend(user.id, friendId);
      if (success) {
        loadAllData();
      }
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };
  const handleBlockUser = async (userId) => {
    if (!user?.id) return;
    try {
      const success = await userService.blockUser(user.id, userId);
      if (success) {
        loadAllData();
      }
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };
  const handleSendMessage = (userId) => {
    console.log("Send message to:", userId);
  };
  const handleViewProfile = (userId) => {
    navigate(`/profile?user=${userId}`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", children: t.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-sm", children: friends.length })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-b", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { clipPath: "url(#clip0_3111_32645)", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M15.02 3.01001C14.18 2.37001 13.14 2 12 2C9.24 2 7 4.24 7 7C7 9.76 9.24 12 12 12C14.76 12 17 9.76 17 7", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M3.40997 22C3.40997 18.13 7.26 15 12 15", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M18.2 21.4C19.9673 21.4 21.4 19.9673 21.4 18.2C21.4 16.4327 19.9673 15 18.2 15C16.4327 15 15 16.4327 15 18.2C15 19.9673 16.4327 21.4 18.2 21.4Z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M22 22L21 21", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("clipPath", { id: "clip0_3111_32645", children: /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "24", height: "24", fill: "white" }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: t.search,
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          className: "pl-10"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: activeTab, onValueChange: (value) => setActiveTab(value), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 tabs-container", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "flex w-full overflow-x-auto scrollbar-hide gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "friends", className: "tab-trigger", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: t.allFriends }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs flex-shrink-0 ml-auto badge", children: friends.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "requests", className: "tab-trigger", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: t.requests }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs flex-shrink-0 ml-auto badge", children: friendRequests.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "suggestions", className: "tab-trigger", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: t.suggestions })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "blocked", className: "tab-trigger", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: t.blocked })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "friends", className: "flex-1 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-full", children: friends.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-32 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-12 h-12 mx-auto mb-4 opacity-50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: t.noFriends })
      ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: friends.map((friend) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "w-12 h-12", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: friend.friend_info.avatar_url }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: friend.friend_info.username?.charAt(0).toUpperCase() || "U" })
            ] }),
            friend.friend_info.is_online && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium", children: friend.friend_info.full_name || friend.friend_info.username }),
              friend.friend_info.is_online ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs text-green-600", children: t.online }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: t.lastSeen(formatTime(friend.friend_info.last_seen || "")) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "@",
              friend.friend_info.username
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => handleSendMessage(friend.friend_id),
              className: "flex items-center gap-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
                t.sendMessage
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "w-4 h-4" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuItem, { onClick: () => handleViewProfile(friend.friend_id), children: t.viewProfile }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => handleRemoveFriend(friend.friend_id), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", className: "mr-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { clipPath: "url(#clip0_3111_32644)", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M15.02 3.01001C14.18 2.37001 13.14 2 12 2C9.24 2 7 4.24 7 7C7 9.76 9.24 12 12 12C14.76 12 17 9.76 17 7", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M3.40997 22C3.40997 18.13 7.26 15 12 15C12.96 15 13.89 15.13 14.76 15.37", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M22 18C22 18.32 21.96 18.63 21.88 18.93C21.79 19.33 21.63 19.72 21.42 20.06C20.73 21.22 19.46 22 18 22C16.97 22 16.04 21.61 15.34 20.97C15.04 20.71 14.78 20.4 14.58 20.06C14.21 19.46 14 18.75 14 18C14 16.92 14.43 15.93 15.13 15.21C15.86 14.46 16.88 14 18 14C19.18 14 20.25 14.51 20.97 15.33C21.61 16.04 22 16.98 22 18Z", stroke: "currentColor", strokeWidth: "1.5", strokeMiterlimit: "10", strokeLinecap: "round", strokeLinejoin: "round" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M19.49 17.9805H16.51", stroke: "currentColor", strokeWidth: "1.5", strokeMiterlimit: "10", strokeLinecap: "round", strokeLinejoin: "round" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("clipPath", { id: "clip0_3111_32644", children: /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "24", height: "24", fill: "white" }) }) })
                ] }),
                t.remove
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => handleBlockUser(friend.friend_id), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", className: "mr-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { clipPath: "url(#clip0_3111_32723)", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M11.9999 14C6.98991 14 2.90991 17.36 2.90991 21.5C2.90991 21.78 3.12991 22 3.40991 22H20.5899C20.8699 22 21.0899 21.78 21.0899 21.5C21.0899 17.36 17.0099 14 11.9999 14Z", fill: "currentColor" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M15.71 3.66C14.81 2.64 13.47 2 12 2C10.6 2 9.32 2.57 8.41 3.51C7.54 4.41 7 5.65 7 7C7 7.94 7.26 8.82 7.73 9.57C7.98 10 8.3 10.39 8.68 10.71C9.55 11.51 10.71 12 12 12C13.83 12 15.41 11.02 16.28 9.57C16.54 9.14 16.74 8.66 16.85 8.16C16.95 7.79 17 7.4 17 7C17 5.72 16.51 4.55 15.71 3.66ZM13.87 7.92H10.13C9.61 7.92 9.19 7.5 9.19 6.98C9.19 6.46 9.61 6.04 10.13 6.04H13.87C14.39 6.04 14.81 6.46 14.81 6.98C14.81 7.5 14.39 7.92 13.87 7.92Z", fill: "currentColor" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("clipPath", { id: "clip0_3111_32723", children: /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "24", height: "24", fill: "white" }) }) })
                ] }),
                t.block
              ] })
            ] })
          ] })
        ] })
      ] }) }, friend.id)) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "requests", className: "flex-1 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-full", children: friendRequests.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-32 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-12 h-12 mx-auto mb-4 opacity-50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: t.noRequests })
      ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: friendRequests.map((request) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "w-12 h-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: request.requester_info?.avatar_url }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: (request.requester_info?.full_name?.charAt(0) || request.requester_info?.username?.charAt(0))?.toUpperCase() || "U" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium", children: request.requester_info?.full_name || request.requester_info?.username || "Unknown User" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "@",
              request.requester_info?.username || "unknown"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatTime(request.created_at) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: request.request_type === "incoming" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => handleAcceptRequest(request.id),
              className: "flex items-center gap-1 text-green-600 hover:text-green-700",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }),
                t.accept
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => handleDeclineRequest(request.id),
              className: "flex items-center gap-1 text-red-600 hover:text-red-700",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }),
                t.decline
              ]
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => handleCancelRequest(request.id),
            className: "flex items-center gap-1 text-gray-600 hover:text-gray-700",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }),
              t.cancel
            ]
          }
        ) })
      ] }) }, request.id)) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "suggestions", className: "flex-1 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-32 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-12 h-12 mx-auto mb-4 opacity-50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: t.noSuggestions })
      ] }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "blocked", className: "flex-1 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-32 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-12 h-12 mx-auto mb-4 opacity-50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: t.noBlocked })
      ] }) }) }) })
    ] })
  ] });
};
export {
  FriendsScreen as default
};
