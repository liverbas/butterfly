import React from 'react';
import { useQuery } from '@apollo/client';
import {GET_ASSOCIATIONS} from '../lib/query'


const Associations = () => {

    const { loading, error, data } = useQuery(GET_ASSOCIATIONS);

    console.log(data);
    return (
        <div>
            <h1>Hello from Associations</h1>
        </div>
    );
};

export default Associations;