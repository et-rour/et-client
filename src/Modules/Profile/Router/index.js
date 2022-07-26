const ProfileLayout = () =>
  import(/* webpackChunkName: "ProfileLayout" */ "../Layout/ProfileLayout.vue");
const Profile = () =>
  import(/* webpackChunkName: "Profile" */ "../Views/Profile.vue");

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
