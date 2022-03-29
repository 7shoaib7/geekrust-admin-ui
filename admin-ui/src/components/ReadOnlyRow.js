import Checkbox from '@mui/material/Checkbox';

import { pink } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TableRow, TableCell } from '@mui/material'



const ReadOnlyRow = ({ index,item, onEdit, onDelete,checkedState,handleOnChangeCheckBox }) => {

    const toggle =(val) => {
       if(val===true){
           return "row selected"
       }
       else{
           return "row"
       }
    }
    
    return ( 
            <TableRow className={toggle(checkedState[index])}>
                <TableCell><Checkbox sx={{
                    color: pink[800],
                    '&.Mui-checked': {
                        color: pink[600],
                    },
                }}
                id={`custom-checkbox-${index}`}
                checked={checkedState[index]}
                onChange={() => handleOnChangeCheckBox(index)}
                /></TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell >
                    <EditIcon style={{ marginRight: 10, color: pink[800], cursor: 'pointer' }} onClick={(event) => onEdit(event, item)} />
                    <DeleteIcon style={{ color: pink[800], cursor: 'pointer' }} onClick={() => onDelete(item.id)} />
                </TableCell>
            </TableRow>
    
    )
}

export default ReadOnlyRow