import ReactDOM from 'react-dom/client'
import './index.css'
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import Root, { loader as rootLoader, action as rootAction } from './routes/root';
import ErrorPage from './error-page';
import Contact, { loader as contactLoader, action as contactAction } from './routes/contact';
import EditContact, { action as editAction } from './routes/edit';
import { action as deleteAction } from './routes/delete';
import Index from './routes';

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		loader: rootLoader,
		action: rootAction,
		children: [
			{
				errorElement: <ErrorPage/>,
				children: [
					{
						index: true,
						element: < Index />
					},
					{
						path: "contacts/:contactId",
						element: <Contact />,
						loader: contactLoader,
						action: contactAction
					},
					{
						path: "contacts/:contactId/edit",
						element: <EditContact />,
						loader: contactLoader,
						action: editAction
					},
					{
						path: 'contacts/:contactId/delete',
						action: deleteAction,
						errorElement: <div>There was an error while deleting.</div>
					}
				]
			}
		]
	}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<RouterProvider router={router} />
)