import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root, {
    loader as rootLoader, action as rootAction
} from './routes/root';

import ErrorPage from './ErrorPage';
import Contact, {
    loader as contactLoader,
    action as contactAction,
} from './routes/contact';
import EditContact, {
    action as editAction,
} from "./routes/edit";

import { action as destroyAction } from "./routes/destroy";
import Welcome from './routes/welcome';

//通过对象配置创建路由，推荐
const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        loader: rootLoader,
        action: rootAction,
        children: [
            {
                errorElement: <ErrorPage></ErrorPage>,
                children: [
                    { index: true, element: <Welcome /> },
                    {
                        path: "contacts/:contactId",
                        element: <Contact />,
                        loader: contactLoader,
                        action: contactAction,
                    }
                ],
            },
            {
                path: "contacts/:contactId/edit",
                element: <EditContact />,
                loader: contactLoader,
                action: editAction,
            },
            {
                path: "contacts/:contactId/destroy",
                action: destroyAction,
                //发生异常时会显示这个页面
                errorElement: <div>Oops! There was an error.</div>
            },
        ],
    },

]);

console.log('router:', router)


export default function HqRouterProvider() {
    return (
        <>
            <RouterProvider router={router}></RouterProvider>
        </>
    );
};