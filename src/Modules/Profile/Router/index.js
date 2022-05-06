const ProfileLayout = () => import("../Layout/ProfileLayout.vue");
const Profile = () => import("../Views/Profile.vue");

export default [
  {
    name: "profile",
    path: "/profile",
    component: ProfileLayout,
    children: [
      {
        name: "profile-main",
        path: "main",
        component: Profile,
      },
    ],
  },
];
