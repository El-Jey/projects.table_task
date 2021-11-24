const routes = [
    {
        path: "/",
        redirect: "/projects"
    },
    {
        path: "/projects",
        name: "MainApp",
        component: () => import("@/Pages/Projects/index.vue"),
    },
    {
        path: "/profile",
        redirect: "/projects"
    },
    {
        path: "/settings",
        redirect: "/projects"
    },
    {
        path: "/logout",
        redirect: "/projects"
    },
    {
        path: "/contacts",
        redirect: "/projects"
    },
    {
        path: "/privacy",
        redirect: "/projects"
    },
    {
        path: "*",
        name: "NotFound",
        component: () => import("@/Pages/NotFound/index.vue")
    }
];

export default routes;