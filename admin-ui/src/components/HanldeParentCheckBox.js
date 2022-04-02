import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';


const HandleParentCheckBox = ({ checkedState, setCheckedState, checkedParent, setCheckedParent, page }) => {



    if (checkedParent === false) {
        if (checkedState.some(item => item === true)) {
            setCheckedParent(true)
        }
    }
    if (checkedParent === true) {
        if (checkedState.every(item => item === false)) {
            setCheckedParent(false)
        }
    }


    /******Handle Parent CheckBox ***/
    const handleParentCheckBox = () => {
        setCheckedParent(!checkedParent)


        if (page === 1 || page === 2 || page === 3 || page === 4 || page === 5) {
            let checkTrue = []
            checkedState.forEach((item, index) => {
                if (index < 10) {
                    checkTrue.push(item)
                }
            })

            let someCheck = checkTrue.some(item => item === true)
            let everyCheck = checkTrue.every(item => item === true)

            if (checkedParent === false) {
                setCheckedParent(true)
                let check = checkedState.map((item, index) => {
                    if (index < 10) {
                        return !item
                    }
                    else {
                        return item
                    }
                })
                setCheckedState(check)

            }
            if (checkedParent === true) {
                if (someCheck) {
                    setCheckedParent(true)
                    let check = checkedState.map((item, index) => {
                        if (index < 10) {
                            return item === true ? item : !item
                        }
                        else {
                            return item
                        }
                    })
                    setCheckedState(check)
                }
                if (everyCheck) {
                    setCheckedParent(!checkedParent)
                    let unCheck = checkedState.map((item, index) => {
                        if (index < 10) {
                            return !item
                        }
                        else {
                            return item
                        }
                    })
                    setCheckedState(unCheck)
                }
            }

        }

    }


    return (
        <>
            <Checkbox sx={{
                color: pink[800],
                '&.Mui-checked': {
                    color: pink[600],
                },
            }}
                indeterminate={true}
                size="medium"
                checked={checkedParent}
                onChange={handleParentCheckBox}
            />
        </>
    )



}

export default HandleParentCheckBox