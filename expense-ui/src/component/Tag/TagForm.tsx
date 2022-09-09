import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, InputLabel, ListItemButton, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { ServiceContext, UserContext } from "../../context";
import { useFormValidation } from "../../hooks/FormValidation";
import { ResponseList } from "../../modal/ResponseList";
import { Tag } from "../../modal/Tag";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

interface TagSelectProps {
    onChange?: (tags: Array<Tag>) => void;
    error: boolean;
    helperText: string;
}

export default function TagSelect(props: TagSelectProps) {
    const user = useContext(UserContext);
    const service = useContext(ServiceContext);
    const [tagName, setTagName] = useState<string[]>([]);
    const [tags, setTags] = useState<Array<Tag>>([]);
    const [openTagModel, setOpenTagModel] = useState<boolean>(false);
    const { handleSubmit, handleChange: handleTagFormChange, data: tagForm, errors: tagFormError } = useFormValidation<Tag>({
        validations: {
            name: {
                required:{
                    value: true,
                    message: "Tag Name is required"
                }
            },
            description: {
                required: {
                    value: true,
                    message: "Tag Description is required"
                },
                custom: {
                    isValid(value) {
                        return (value != null && value.length < 24);
                    },
                    message: "Max Description can be of 24 character and min character is 1."
                }
            }
        },
        onSubmit() {
            tags.push(tagForm);
            setTags([...tags]);
            handleTagModel();
        },
    });

    const handleChange = (event: SelectChangeEvent<typeof tagName>) => {
        let selectedTags: Array<Tag> = [];
        const {
            target: { value },
        } = event;
        setTagName(
            typeof value === 'string' ? value.split(',') : value,
        );
        let inputTagNames: Array<string> = [];
        if (typeof value === 'string') {
            inputTagNames = [...value.split(',')];
        } else {
            inputTagNames = [...value]
        }
        selectedTags.forEach((tag: Tag, idx: number) => {
            if (inputTagNames.indexOf(tag.name) === -1) {
                selectedTags = [...selectedTags.splice(idx, 1)];
            } else {
                inputTagNames = [...inputTagNames.splice(inputTagNames.indexOf(tag.name), 1)]
            }
        });
        inputTagNames.forEach((inputTagName: string) => {
            selectedTags = [...selectedTags.concat(tags.filter((tag: Tag) => tag.name === inputTagName))];
        });
        sendTag(selectedTags);
    };

    const sendTag = (tags: Array<Tag>) => {
        props.onChange?.(tags);
    }

    const handleTagModel = () => {
        setOpenTagModel(!openTagModel);
    }

    useEffect(() => {
        service.tagService?.fetchAllTag()
            .then((res: ResponseList<Tag>) => {
                setTags(res.Items);
            })
    }, [service]);

    return (
        <>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">Tag</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    error={props.error}
                    value={tagName}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {tags.map((tag, index) => (
                        <MenuItem key={index} value={tag.name}>
                            <ListItemText primary={tag.name} secondary={tag.description}></ListItemText>
                        </MenuItem>
                    ))}
                    <MenuItem key='new Tag Button'>
                        <ListItemButton disableRipple={true}>
                            <Button  onClick={handleTagModel} disableRipple={true} sx={{ width: '100%' }}>
                                <ListItemText primary="Create New Tag" />
                            </Button>
                        </ListItemButton>
                    </MenuItem>
                </Select>
                <FormHelperText>{props.helperText}</FormHelperText>
            </FormControl>

            <Dialog open={openTagModel} onClose={handleTagModel}>
                <Box id="tagForm" component="form" noValidate onSubmit={handleSubmit}>
                    <DialogTitle>Add Tag</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Tag Name"
                            type="email"
                            fullWidth
                            variant="standard"
                            error = {tagFormError.name ? true: false}
                            helperText={tagFormError.name}
                            onChange={handleTagFormChange('name')}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Description"
                            type="text"
                            fullWidth
                            variant="standard"
                            error = {tagFormError.description ? true: false}
                            helperText={tagFormError.description}
                            onChange={handleTagFormChange('description')}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleTagModel}>Cancel</Button>
                        <Button type="submit" form="tagForm">Add Tag</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    );
}