import React, { useState, useEffect} from "react";
import axios from "axios";
import AddSnack from './addSnack.js';
import { DataGrid } from '@material-ui/data-grid';

const columns = [

    { field: 'name', headerName: 'Item', width: 300},
    { field: 'price', headerName: 'price', width: 130 },
  ];
  

const fetchURL = "https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/concessions";
function DisplaySnacks() {

    const [state, setState] = useState({
        s: "",
        snacks: [],
        selected: undefined})

        useEffect(() => {
            async function fetchData() {
                const request = await axios.get(fetchURL);
                console.log(request.data);
                setState(prevState =>{

                    return {...prevState, snacks:request.data}
                  })
                // return request;
              }
            fetchData();
        }, [fetchURL]);
    return (
        <div>
        <AddSnack/>
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid rows={state.snacks} columns={columns} pageSize={15} checkboxSelection />
        </div>
        </div>
        
    )
}

export default DisplaySnacks
