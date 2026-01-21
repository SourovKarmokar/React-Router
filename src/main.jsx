import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import ErrorPage from "./Error";
import Contact from "./Contact";
import { deleteContactAction, getContactLoader, getContactsloader } from "./loaders/contactsLoader";
import { createContactAction, editContactAction, updateContactFavorite } from "./actions/contactsActions";
import EditContact from "./EditContact";
import Index from "./index"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: getContactsloader,
    action: createContactAction,
    children: [
      {
        errorElement: <ErrorPage/>,
        children: [
      {
        index: true,
        element: <Index/>
      },
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: getContactLoader,
        action: updateContactFavorite,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact/>,
        loader: getContactLoader,
        action: editContactAction,
      },
      {
        path: "contacts/:contactId/destroy",
        action: deleteContactAction,
        errorElement: <div>Oops! There was an contact!.</div>,
      },
    ],
      }
    ]
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
