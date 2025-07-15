import React from 'react';
import useUserRole from '../../hooks/useUserRole';
import LoadingSpinner from '../../components/Shared/Loading/LoadingSpinner';
import DashboardUser from './DashboardUser/DashboardUser';
import DashboardAdmin from './DashboardAdmin/DashboardAdmin';
import Forbidden from '../Forbidden/Forbidden';

const DahsBoardHomePage = () => {
    const {role,roleLoading} = useUserRole()

    if (roleLoading) {
        return <LoadingSpinner />
    }
    if (role === 'user') {
        return <DashboardUser />
    } else if ( role === 'admin') {
        return <DashboardAdmin />
    } else{
        return <Forbidden />
    }
};

export default DahsBoardHomePage;