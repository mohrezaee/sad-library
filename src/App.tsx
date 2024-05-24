import {Authenticated, Refine} from '@refinedev/core'
import {RefineKbar, RefineKbarProvider} from '@refinedev/kbar'

import {
    ErrorComponent,
    notificationProvider,
    RefineSnackbarProvider,
    ThemedLayoutV2,
    ThemedTitleV2,
} from '@refinedev/mui'

import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import routerBindings, {
    DocumentTitleHandler,
    NavigateToResource,
    UnsavedChangesNotifier,
} from '@refinedev/react-router-v6'
import dataProvider from '@refinedev/simple-rest'
import {BrowserRouter, Outlet, Route, Routes} from 'react-router-dom'
import {authProvider} from './authProvider'
import {AppIcon} from './components/app-icon'
import {Header} from './components/header'
import {ColorModeContextProvider} from './contexts/color-mode'
import {BlogPostCreate, BlogPostEdit, BlogPostList, BlogPostShow} from './pages/books'
import {CategoryCreate, CategoryEdit, CategoryList, CategoryShow} from './pages/categories'
import {ForgotPassword} from './pages/forgotPassword'
import {Login} from './pages/login'
import {Register} from './pages/register'
import {BookDataprovider} from './dataproviders/BookDataprovider'
import {CategoryDataprovider} from './dataproviders/CategoryDataprovider'
import {UserDataprovider} from './dataproviders/UserDataprovider'
import {UserList, UserCreate, UserEdit, UserShow} from './pages/users'
import {LandingPage} from './pages/landing/landing'
import {Provider} from 'react-redux'
import {store} from './redux/store'
import {Book} from './pages/book/Book'
import {AppShell} from './components/AppShell'
import {Order} from './pages/order/Order'
import {OrderList} from './pages/orders'
import {OrderDataprovider} from './dataproviders/OrderDataprovider'

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <RefineKbarProvider>
                    <ColorModeContextProvider>
                        <CssBaseline />
                        <GlobalStyles styles={{html: {WebkitFontSmoothing: 'auto'}}} />
                        <RefineSnackbarProvider>
                            <Refine
                                dataProvider={{
                                    default: dataProvider('https://api.fake-rest.refine.dev'),
                                    books: new BookDataprovider(),
                                    categories: new CategoryDataprovider(),
                                    users: new UserDataprovider(),
                                    orders: new OrderDataprovider(),
                                }}
                                notificationProvider={notificationProvider}
                                authProvider={authProvider}
                                routerProvider={routerBindings}
                                resources={[
                                    {
                                        name: 'books',
                                        list: '/books',
                                        create: '/books/create',
                                        edit: '/books/edit/:id',
                                        show: '/books/show/:id',
                                        meta: {
                                            canDelete: true,
                                            dataProviderName: 'books',
                                        },
                                    },
                                    {
                                        name: 'landing',
                                        list: '/landing',
                                        meta: {
                                            dataProviderName: 'landing',
                                            hide: true,
                                        },
                                    },
                                    {
                                        name: 'categories',
                                        list: '/categories',
                                        create: '/categories/create',
                                        edit: '/categories/edit/:id',
                                        show: '/categories/show/:id',
                                        meta: {
                                            canDelete: true,
                                            dataProviderName: 'categories',
                                        },
                                    },
                                    {
                                        name: 'users',
                                        list: '/users',
                                        create: '/users/create',
                                        edit: '/users/edit/:id',
                                        show: '/users/show/:id',
                                        meta: {
                                            canDelete: true,
                                            dataProviderName: 'users',
                                        },
                                    },
                                    {
                                        name: 'orders',
                                        list: '/orders',
                                        create: '/orders/create',
                                        edit: '/orders/edit/:id',
                                        show: '/orders/show/:id',
                                        meta: {
                                            canDelete: true,
                                            dataProviderName: 'orders',
                                        },
                                    },
                                ]}
                                options={{
                                    syncWithLocation: true,
                                    warnWhenUnsavedChanges: true,
                                    useNewQueryKeys: true,
                                    projectId: '35WiPU-gUOVX3-XuK0Ef',
                                }}
                            >
                                <Routes>
                                    <Route
                                        element={
                                            // <Authenticated
                                            //     key="authenticated-inner"
                                            //     fallback={<CatchAllNavigate to="/login" />}
                                            // >
                                            <ThemedLayoutV2
                                                Header={() => <Header sticky />}
                                                Title={({collapsed}) => (
                                                    <ThemedTitleV2
                                                        collapsed={collapsed}
                                                        text="SAD Library"
                                                        icon={<AppIcon />}
                                                    />
                                                )}
                                            >
                                                <Outlet />
                                            </ThemedLayoutV2>
                                            // </Authenticated>
                                        }
                                    >
                                        <Route
                                            index
                                            element={<NavigateToResource resource="landing" />}
                                        />
                                        <Route path="/books">
                                            <Route index element={<BlogPostList />} />
                                            <Route path="create" element={<BlogPostCreate />} />
                                            <Route path="edit/:id" element={<BlogPostEdit />} />
                                            <Route path="show/:id" element={<BlogPostShow />} />
                                        </Route>
                                        <Route path="/categories">
                                            <Route index element={<CategoryList />} />
                                            <Route path="create" element={<CategoryCreate />} />
                                            <Route path="edit/:id" element={<CategoryEdit />} />
                                            <Route path="show/:id" element={<CategoryShow />} />
                                        </Route>
                                        <Route path="/users">
                                            <Route index element={<UserList />} />
                                            <Route path="create" element={<UserCreate />} />
                                            <Route path="edit/:id" element={<UserEdit />} />
                                            <Route path="show/:id" element={<UserShow />} />
                                        </Route>
                                        <Route path="/orders">
                                            <Route index element={<OrderList />} />
                                            <Route path="show/:id" element={<UserShow />} />
                                        </Route>
                                        <Route path="*" element={<ErrorComponent />} />
                                    </Route>
                                    <Route
                                        element={
                                            <Authenticated
                                                key="authenticated-outer"
                                                fallback={<Outlet />}
                                            >
                                                <NavigateToResource />
                                            </Authenticated>
                                        }
                                    >
                                        <Route path="/login" element={<Login />} />
                                        <Route path="/register" element={<Register />} />
                                        <Route
                                            path="/forgot-password"
                                            element={<ForgotPassword />}
                                        />
                                    </Route>
                                    <Route element={<AppShell />}>
                                        <Route path="/landing" element={<LandingPage />} />
                                        <Route path="/buy" element={<Order />} />
                                        <Route path="/book/:id" element={<Book />} />
                                    </Route>
                                </Routes>

                                <RefineKbar />
                                <UnsavedChangesNotifier />
                                <DocumentTitleHandler />
                            </Refine>
                        </RefineSnackbarProvider>
                    </ColorModeContextProvider>
                </RefineKbarProvider>
            </BrowserRouter>
        </Provider>
    )
}

export default App
