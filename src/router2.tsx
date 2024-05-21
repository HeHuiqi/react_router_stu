import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
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
//通过路由组件创建路由
const router2 = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<Root />}
            loader={rootLoader}
            action={rootAction}
            errorElement={<ErrorPage />}
        >
            <Route errorElement={<ErrorPage />}>
                <Route index element={<Welcome />} />
                <Route
                    path="contacts/:contactId"
                    element={<Contact />}
                    loader={contactLoader}
                    action={contactAction}
                />
                <Route
                    path="contacts/:contactId/edit"
                    element={<EditContact />}
                    loader={contactLoader}
                    action={editAction}
                />
                <Route
                    path="contacts/:contactId/destroy"
                    action={destroyAction}
                />
            </Route>
        </Route>
    )
);
console.log('router2:', router2)

export default function HqRouterProvider2() {
    return (
        <>
            <RouterProvider router={router2}></RouterProvider>
        </>
    );
};