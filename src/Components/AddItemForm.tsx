import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField, Typography} from "@mui/material";
import {AddBox} from "@mui/icons-material";

type addItemFormPropType = {
    addItem:(title:string)=>void
}

export const AddItemForm = React.memo((props:addItemFormPropType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<JSX.Element|null>(null)

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const errorMessage = <Typography variant={'h6'}> Title is required</Typography>

    const addItemHandler = () => {
        if(title.trim() !== ''){
            props.addItem(title)
            setTitle('')
        }else{
            setError(errorMessage)
        }
    }

    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if(error !== null){
            setError(null)
        }
        if(e.key === 'Enter'){
            props.addItem(title)
        }
    }

    return (
        <div>
            <TextField
                value={title}
                label={'Enter new title'}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton color={'primary'} onClick={addItemHandler}>
                <AddBox/>
            </IconButton>
        </div>
    )

})