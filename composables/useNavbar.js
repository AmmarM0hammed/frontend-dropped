export const useNavbar = () => {
  const superItem = () => [
    {
      title: "لوحة العرض",
      icon: "solar:display-linear",
      path: "/display-board",
    },
    { title: "ملخص النظام", icon: "icon-park-outline:system", path: "/" },
    {
      title: "ادارة المنظومة",
      icon: "solar:display-linear",
      path: "/system-management",
    },
    {
      title: "ادارة الاجهزة",
      icon: "ph:devices-light",
      path: "/device-management",
      children: [
        { title: "الاجهزة", icon: "tabler:device-ipad-horizontal-bolt", path: "/device-management/device" },
        { title: "تعريف الجهاز", icon: "streamline:interface-id-thumb-mark-identification-password-touch-id-secure-fingerprint-finger-security", path: "/device-management/device-identification" },
        { title: "المنشأ", icon: "fluent-mdl2:open-source", path: "/device-management/origin" },
      ],
    },
    { title: "العملاء", icon: "ph:user", path: "/customer" },
    {
      title: "ادارة المناطق",
      icon: "ic:outline-place",
      path: "/region",
      children: [
        { title: "asd", icon: "ph:user", path: "/system-management" },
        { title: "العملاء", icon: "ph:user", path: "/customer" },
      ],
    },
    { title: "الشركات", icon: "f7:building-2", path: "/company" },
    { title: "ادارة المستخدمين", icon: "ph:user", path: "/users" },
    { title: "ادارة الفواتير", icon: "uil:bill", path: "/report" },
    // { title: "تسجيل الخروج", icon: "mdi-light:logout", path: "/logout" },
  ];

  return {
    superItem,
  };
};
