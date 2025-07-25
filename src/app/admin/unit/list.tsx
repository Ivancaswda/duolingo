import React from 'react'
import {Datagrid, List, TextField, ReferenceField} from 'react-admin'
const UnitList = () => {
    return (
        <List>
            <Datagrid rowClick='edit'>
                <TextField source='id'/>
                <TextField source='title'/>
                <TextField source='description'/>
                <ReferenceField source='courseId' reference='courses'/>
                <TextField source="order"/>
            </Datagrid>
        </List>
    )
}
export default UnitList
