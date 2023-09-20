import { Redirect, Route } from 'react-router-dom';
import { hasAnyRoles, isAuthenticated, Permission } from '../../util/auth';



type Props = {
    children: React.ReactNode;
    path: string;
    permissions?: Permission[];
};

const PrivateRoute = ({ children, path, permissions = [] }: Props) => {
    return (
        <Route
            path={path}
            render={({ location }) =>
                !isAuthenticated() ? (
                    <Redirect
                        to={{
                            pathname: "/auth/signin",
                            state: { from: location },
                        }}
                    />
                ) : hasAnyRoles(permissions) ?
                    (
                        <Redirect to='/' />
                    ) : (
                        children
                    )
            }
        />
    );
};

export default PrivateRoute;
