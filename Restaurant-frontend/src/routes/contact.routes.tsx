// src/routes/contactRoutes.tsx
// src/routes/contactRoutes.tsx
import type { RouteObject } from "react-router-dom";
import ContactUs from "../pages/Contact";

const contactRoutes: RouteObject[] = [
  {
    path: "/contact",
    element: <ContactUs />,
  },
];

export default contactRoutes;
