import { Button, ButtonGroup, Checkbox, Chip, FormControl, Input, InputAdornment, InputLabel, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import React from "react";
import { Header, HeaderType } from "../../modal/Header";
import { Operator, TableDataSet } from "../../modal/TableDataSet";
import MenuFilter from "./menu/Filter";
import MenuColumn from "./menu/MenuColumn";
import SearchIcon from '@mui/icons-material/Search';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { AddBox, AddOutlined } from "@mui/icons-material";
interface ExpenseTableProps {
    dataset?: TableDataSet<Object>,
    showActionCallback?: (row: any) => void,
    editActionCallback?: (row: any) => void,
    deleteActionCallback?: (row: any) => void,
    addActionCallback?: () => void,
}

export default function ExpenseTable(props: ExpenseTableProps) {
    const [refresh, setRefresh] = React.useState<boolean>(false);

    const toggleHiddenColumn = (header: Header) => {
        props.dataset?.toggleHiddenColumn(header);
        setRefresh(!refresh);
    }

    const handleFilter = (column: string, operator: Operator, value: string) => {
        props.dataset?.applyFilter(column, operator, value);
        setRefresh(!refresh);
    }

    const showButton = (index: number) => {
        props.showActionCallback?.(props.dataset?.getIndexedData(index));
    }

    const editButton = (index: number) => {
        props.editActionCallback?.(props.dataset?.getIndexedData(index));
    }

    const deleteButton = (index: number) => {
        props.deleteActionCallback?.(props.dataset?.getIndexedData(index));
    }

    const formatData = (data: string): string => {
        return data.replaceAll(',', ' , ')
    }

    const renderSearch = () => {
        return (
            <>
                <FormControl variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                        Search
                    </InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </>
        );
    }

    return (
        <>
            <Paper sx={{ width: '100%' }}>
                <Toolbar>
                    <Typography
                        key={'1'}
                        sx={{ flex: '1 1 100%' }}
                        variant="body1"
                        id="tableTitle"
                        component="div"
                    >
                        <MenuColumn toggleHiddenColumn={(header: Header) => toggleHiddenColumn(header)} columns={props.dataset?.getAllColumns()}></MenuColumn>
                        <MenuFilter handleFilter={(column: string, operator: Operator, value: string) => handleFilter(column, operator, value)} columns={props.dataset?.getColumns()}></MenuFilter>
                    </Typography>
                    <Typography
                        key={'2'}
                        sx={{ flex: 'initial' }}
                        variant="body1"
                        id="tableTitle"
                        component="div"
                    >
                        {renderSearch()}
                    </Typography>
                    <Typography
                        key={'3'}
                        sx={{ flex: 'initial' }}
                        variant="body1"
                        id="tableTitle"
                        component="div"
                    >
                        {(props.dataset?.action && props.dataset?.action.add) && <Button startIcon={<AddOutlined></AddOutlined>} sx={{ marginLeft: '24px' }} onClick={() => props.addActionCallback?.()} variant="contained">Add</Button>}
                    </Typography>
                </Toolbar>
                <TableContainer component={Paper}>
                    <Table size="small" stickyHeader aria-label="simple table">
                        <TableHead key={'header-1'}>
                            <TableRow key={'header-1-row'} hover={true}>
                                {
                                    props.dataset?.getColumns().
                                        map(
                                            (header: Header, idx: number) => <TableCell key={`header-1-row-${idx}`} align="center" >{header.alias}</TableCell>
                                        )
                                }
                                {props.dataset?.action && <TableCell key={'header-action'} align="center">Action</TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                props.dataset?.getRows().
                                    map((rows: Array<string>, indexRow: number) =>
                                        <TableRow key={`row-${indexRow}`} hover={true} sx={props.dataset?.getRowStyle(props.dataset?.rows[indexRow])}>
                                            {
                                                rows.map((data: string, index: number) =>
                                                    <TableCell align="center" key={`cell-${index}`}>
                                                        {(props.dataset?.getColumns()[index] && props.dataset?.getColumns()[index].type === HeaderType.boolean) && <>
                                                            <Checkbox checked={data === 'true' ? true : false} />
                                                        </>}
                                                        {(props.dataset?.getColumns()[index] && props.dataset?.getColumns()[index].type === HeaderType.tag) && <>
                                                            {data !== '' &&
                                                                <>
                                                                    <div style={{ paddingBottom: '10px' }}>
                                                                        <Tooltip title={data}>
                                                                            <Chip color="secondary" key={`chip`} label={formatData(data)} icon={<BookmarkBorderIcon />} />
                                                                        </Tooltip>
                                                                    </div>
                                                                </>
                                                            }
                                                        </>}
                                                        {(props.dataset?.getColumns()[index] && props.dataset?.getColumns()[index].type === HeaderType.string) && <>
                                                            {data}
                                                        </>}
                                                        {(props.dataset?.getColumns()[index] && props.dataset?.getColumns()[index].type === HeaderType.number) && <>
                                                            {Number.isNaN(Number(data)) ? 0 : Number(data)}
                                                        </>}
                                                        {(props.dataset?.getColumns()[index] && props.dataset?.getColumns()[index].type === HeaderType.custom) && <>
                                                            {props.dataset?.getColumns()[index].customDisplay?.(props.dataset?.rows[indexRow])}
                                                        </>}
                                                        {(props.dataset?.getColumns()[index] && props.dataset?.getColumns()[index].type === HeaderType.date) &&
                                                            <>
                                                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                                                    <DatePicker
                                                                        label="Date"
                                                                        disabled={true}
                                                                        value={new Date(parseInt(data))}
                                                                        onChange={(newValue) => {
                                                                            
                                                                        }}
                                                                        renderInput={(params) => <TextField fullWidth={false} disabled={true} variant="standard" {...params} />}
                                                                    />
                                                                </LocalizationProvider>
                                                            </>
                                                        }
                                                    </TableCell>
                                                )
                                            }
                                            {props.dataset?.action &&
                                                <>
                                                    <TableCell>
                                                        {props.dataset?.action.show &&
                                                            <ButtonGroup orientation="vertical" variant="contained" aria-label="outlined primary button group">
                                                                <Tooltip title={`View Details`}>
                                                                    <Button variant="text" onClick={() => showButton(indexRow)}>
                                                                        <VisibilityIcon />
                                                                    </Button>
                                                                </Tooltip>
                                                            </ButtonGroup>
                                                        }

                                                        {
                                                            props.dataset?.action.edit &&
                                                            <ButtonGroup orientation="vertical" variant="contained" aria-label="outlined primary button group">
                                                                <Tooltip title={`Edit Details`}>
                                                                    <Button variant="text" onClick={() => editButton(indexRow)}><EditIcon /></Button>
                                                                </Tooltip>
                                                            </ButtonGroup>
                                                        }

                                                        {
                                                            props.dataset?.action.delete &&
                                                            <ButtonGroup orientation="vertical" variant="contained" aria-label="outlined primary button group">
                                                                <Tooltip title={`Delete Details`}>
                                                                    <Button variant="text" onClick={() => deleteButton(indexRow)}><DeleteForeverIcon /></Button>
                                                                </Tooltip>
                                                            </ButtonGroup>
                                                        }
                                                    </TableCell>
                                                </>
                                            }
                                        </TableRow>
                                    )
                            }
                        </TableBody>
                        <TableFooter>
                            {/* <TablePagination
                                rowsPerPageOptions={[5, 10, 15, 20]}
                                component="div"
                                count={props.dataset?.getRows().length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            /> */}
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    )
}