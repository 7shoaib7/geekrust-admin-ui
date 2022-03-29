import Checkbox from '@mui/material/Checkbox';
import { pink} from '@mui/material/colors';
import { v4 as uuidv4 } from 'uuid';
import SaveIcon from '@mui/icons-material/Save';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import {TableRow,  TableCell } from '@mui/material'
import TextField from '@mui/material/TextField';


const EditableRow = ({ index,editRowData, handleEditRowChange, handleSaveRowData,handleCancelEditRowData,checkedState,handleOnChangeCheckBox }) => {
  
    return (
        <>
            <TableRow key={uuidv4()}>
                <TableCell><Checkbox sx={{
                    color: pink[800],
                    '&.Mui-checked': {
                        color: pink[600],
                    },
                }}
                id={`custom-checkbox-${index}`}
                checked={checkedState[index]}
                onChange={() => handleOnChangeCheckBox(index)}
                />{editRowData.id}</TableCell>
                <TableCell>
                    <TextField  size="small" required={true} id="outlined-basic" label="Name" variant="outlined" name="name" value={editRowData.name} onChange={handleEditRowChange} />
                </TableCell>
                <TableCell>
                    <TextField   size="small" required={true} id="outlined-basic" label="Email" variant="outlined" name="email" value={editRowData.email} onChange={handleEditRowChange} />
                </TableCell>
                <TableCell>
                    <TextField   size="small" required={true} id="outlined-basic" label="Role" variant="outlined" name="role" value={editRowData.role} onChange={handleEditRowChange} />
                </TableCell>
                <TableCell >
                    <SaveIcon style={{ marginRight: 10, color: pink[800], cursor: 'pointer' }} onClick={handleSaveRowData} />
                    <CancelPresentationIcon style={{ color: pink[800], cursor: 'pointer' }} onClick={handleCancelEditRowData} />
                </TableCell>
            </TableRow>
        </>
    )
}

export default EditableRow