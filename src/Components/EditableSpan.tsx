
import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    value:string
    onChange:(newTitle:string)=>void
}

export const EditableSpan = ({value,onChange}:EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false)

    const [title, setTitle] = useState(value)

    const activeEditMode = () => {
        setEditMode(true)
    }

    const activeViewMode = () => {
        setEditMode(false)
        onChange(title)
    }

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <input
            autoFocus
            value={title}
            onBlur={activeViewMode}
            onChange={onChangeHandler}
        />
        : <span onDoubleClick={activeEditMode}>{value}</span>
}