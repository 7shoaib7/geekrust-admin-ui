import { useEffect, useState } from "react";
import ReadOnlyRow from './ReadOnlyRow';
import EditableRow from './EditableRow';
import HandleParentCheckBox from "./HanldeParentCheckBox";
import "./UserRecordTable.css"
import "./ReadOnlyRow.css"
import { v4 as uuidv4 } from 'uuid';
import Box from '@mui/material/Box';
import { pink } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { Table, TableHead, TableRow, TableBody, TableCell } from '@mui/material'
import TablePagination from '@mui/material/TablePagination';
import axios from "axios";
import { useSnackbar } from "notistack";
import { TextField, InputAdornment, } from "@mui/material";
import { Search } from "@mui/icons-material";
import notfound from "../Assets/Images/NotFound.jpg"


/******************** UserTable Component   ********************/


const UserRecordTable = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [data, setData] = useState([]);
    const [restoreData, setRestoreData] = useState([]);

    const [filterData, setFilterData] = useState([])
    const [search, setSearch] = useState("")


    const [editRowId, setEditRowId] = useState(null)
    const [editRowData, setEditRowData] = useState({
        id: "",
        name: "",
        email: "",
        role: ""
    });

    const [checkedParent, setCheckedParent] = useState(false);

    const [checkedState, setCheckedState] = useState(
        new Array(46).fill(false)
    );


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);


    const fetchAdminData = async () => {
        try {
            const url =
                "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
            const response = await axios(url);
            const result = response.data;
            console.log(result);
            setData(result);
            setRestoreData(result);
        }
        catch (err) {
            console.log(err)
        }
    };
    useEffect(() => {
        fetchAdminData()
    }, [])

    /********************  Handling CheckBox and Delete Selected ********** */
    const handleOnChangeCheckBox = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>{
            if(index === position){
                return !item
            }
            else{
               return item
            }
        });
        setCheckedState(updatedCheckedState);
        // console.log(checkedState[position])
    };


    const deleteSelected = () => {
        let arr = []
        checkedState.forEach((item, index) => {
            if (item === true) {
                arr.push(index)
            }
        })

        const deleteSelectedData = data.filter((item, index) => !arr.includes(index))
        setData(deleteSelectedData)

        const deleteSelectedFilterData = filterData.filter((item, index) => !arr.includes(index))
        setFilterData(deleteSelectedFilterData)


        setCheckedState(checkedState.filter((item, index) => !arr.includes(index)))
        arr = []
        setCheckedParent(!checkedParent)
    }



    /*********************** Search Filter ********************/
    const searchFilter = (e) => {
        setSearch(e.target.value)
        const filter = data.filter((item) =>
            item.name.toLowerCase().indexOf(e.target.value) > -1 ||
            item.email.toLowerCase().indexOf(e.target.value) > -1 ||
            item.role.toLowerCase().indexOf(e.target.value) > -1
        )


        setFilterData(filter)
        setData(filter)

        if (e.target.value === "") {
            setData(restoreData)
        }

    }

    /********Handler for editing ,saving and deleting Row ********/
    const handleSaveRowData = (event) => {
        event.preventDefault()

        const toSaveRowData = {
            id: editRowData.id,
            name: editRowData.name,
            email: editRowData.email,
            role: editRowData.role
        }

        if (!validateInput(toSaveRowData)) return //validate before saving


        const newData = [...data]
        const index = data.findIndex((item) => item.id === editRowId)
        newData[index] = toSaveRowData
        setData(newData)
        setFilterData(newData)
        setEditRowId(null)
    }

    /***** Validating before saving RowData  ***/

    const validateInput = (data) => {
        if (!data.name) {
            enqueueSnackbar("Name is a required field", {
                variant: 'warning',
            })
            return false
        }

        if (!data.email) {
            enqueueSnackbar("Email is a required field", {
                variant: 'warning',
            })
            return false
        }
        if (!data.role) {
            enqueueSnackbar("Role is a required field", {
                variant: 'warning',
            })
            return false
        }

        return true
    };


    const handleCancelEditRowData = () => {
        setEditRowId(null)
    }

    const handleEditRowChange = (event) => {
        event.preventDefault()
        const key = event.target.name;
        const value = event.target.value;
        setEditRowData({ ...editRowData, [key]: value })
    }

    const onEdit = (event, item) => {
        event.preventDefault()
        setEditRowId(item.id)

        const RowDataValues = {
            id: item.id,
            name: item.name,
            email: item.email,
            role: item.role
        }
        setEditRowData(RowDataValues)

    }
    /**************************** */

    const onDelete = (id) => {
        const dataOnDlete = data.filter(item => item.id !== id);
        setData(dataOnDlete);
        const filterDataOnDelete = filterData.filter(item => item.id !== id);
        setFilterData(filterDataOnDelete)
    }

    /********************* **********************/

    return (
        <>
            {/*********************** Search Input ********************/}

            <TextField
                style={{ margin: '20px 0 20px 0' }}
                className="search-desktop"
                size="small"
                inputProps={{ style: { fontFamily: "Arial", color: "black" } }}
                InputProps={{
                    className: "search",
                    endAdornment: (
                        <InputAdornment position="end">
                            <Search sx={{ color: pink[800] }} />
                        </InputAdornment>
                    ),
                }}
                placeholder="Search by name,email or role"
                name="search"
                value={search}
                onChange={searchFilter}
            // onChange={(e) => setSearch(e.target.value)}
            />


            {/*********************** User Table********************/}
            <Box className="table"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    paddingLeft: 20,
                    paddingRight: 20,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                }}
            >

                <Table >
                    <TableHead style={{ background: 'silver' }}>
                        <TableRow>
                            <TableCell>
                                <HandleParentCheckBox
                                    checkedState={checkedState}
                                    setCheckedState={setCheckedState}
                                    checkedParent={checkedParent}
                                    setCheckedParent={setCheckedParent}
                                    page={page} 
                                    />
                            </TableCell>
                            <TableCell><b>Name</b></TableCell>
                            <TableCell><b>Email</b></TableCell>
                            <TableCell><b>Role</b></TableCell>
                            <TableCell><b>Actions</b></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {(search.length > 0 && filterData.length)
                            ? filterData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((item, index) => (
                                    <>
                                        {editRowId === item.id
                                            ? (<EditableRow
                                                key={uuidv4()}
                                                index={index}
                                                editRowData={editRowData}
                                                handleEditRowChange={handleEditRowChange}
                                                handleSaveRowData={handleSaveRowData}
                                                handleCancelEditRowData={handleCancelEditRowData}
                                                checkedState={checkedState}
                                                handleOnChangeCheckBox={handleOnChangeCheckBox}
                                            />)
                                            : (<ReadOnlyRow
                                                key={uuidv4()}
                                                index={index}
                                                item={item}
                                                onEdit={onEdit}
                                                onDelete={onDelete}
                                                checkedState={checkedState}
                                                handleOnChangeCheckBox={handleOnChangeCheckBox}
                                            />)}
                                    </>
                                ))

                            : (search.length > 0 && filterData.length === 0) ?
                                (<div>
                                    <h3 style={{ position: 'relative', left: 180 }}>No Data Found</h3>
                                    <img src={notfound} alt="404NotFound" style={{ width: '40%', margin: '80px 0 0 40%' }} />
                                </div>
                                )

                                : data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((item, index) => (
                                        <>
                                            {editRowId === item.id
                                                ? (<EditableRow
                                                    key={uuidv4()}
                                                    index={index}
                                                    editRowData={editRowData}
                                                    handleEditRowChange={handleEditRowChange}
                                                    handleSaveRowData={handleSaveRowData}
                                                    handleCancelEditRowData={handleCancelEditRowData}
                                                    checkedState={checkedState}
                                                    handleOnChangeCheckBox={handleOnChangeCheckBox}
                                                />)
                                                : (<ReadOnlyRow
                                                    key={uuidv4()}
                                                    index={index}
                                                    item={item}
                                                    onEdit={onEdit}
                                                    onDelete={onDelete}
                                                    checkedState={checkedState}
                                                    handleOnChangeCheckBox={handleOnChangeCheckBox}
                                                />)}
                                        </>
                                    ))
                        }
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>

                    {/*********************** Table Pagination ********************/}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width:'100%'
                        }}
                    >
                        {checkedState.some(item => item === true) ? <Button variant="contained" className="button" onClick={deleteSelected} size="small" startIcon={<DeleteIcon />} color="error">Delete Selected</Button> : null}
                        <TablePagination
                            sx={{
                                marginTop: 5,
                                position: 'relative',
                                left: 250
                            }}
                            component="div"
                            rowsPerPageOptions={[10, 15, 25]}
                            count={data.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            labelRowsPerPage={<span>Rows:</span>}
                            labelDisplayedRows={({ page }) => {
                                return `Page : ${page + 1}`
                            }}
                            backIconButtonProps={{ color: 'secondary' }}
                            nextIconButtonProps={{ color: 'secondary' }}
                            showFirstButton={true}
                            showLastButton={true}
                        />
                    </Box>
                </Table>
            </Box>
        </>

    )

}

export default UserRecordTable

// {checkedState.some(item => item === true) ? <Button variant="contained" className="button" onClick={deleteSelected} size="small" startIcon={<DeleteIcon />} color="error" style={{ position: 'absolute', right: '75%', top: '130%' }}>Delete Selected</Button> : null}