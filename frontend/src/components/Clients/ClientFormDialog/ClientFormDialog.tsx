import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Select,
    MenuItem,
} from '@mui/material';
import { createClient } from '@src/api/clientService';
import { Client } from '@src/types';

const ClientFormDialog = () => {
    // State to control the dialog visibility
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        dob: '',
        fundingId: '1',
        languageId: '1',
    });

    // Functions to handle opening and closing the dialog
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Form submission logic goes here

        console.log(form);
        let client = {
            firstName: form.firstName,
            middleName: form.middleName,
            lastName: form.lastName,
            email: form.email,
            dob: form.dob,
            fundingId: form.fundingId,
            languages: [
                {
                    id: form.languageId,
                    isPrimary: true,
                },
            ],
        };

        // Call the createClient function from the clientService
        createClient(client).then((response: any) => {
            console.log(response);
        });

        // Close the dialog after form submission
        setOpen(false);
    };

    return (
        <div>
            {/* Button to open the dialog */}
            <Button
                variant='contained'
                color='primary'
                onClick={handleClickOpen}
            >
                Create Client
            </Button>

            {/* Dialog Component */}
            <Dialog id='clientDialog' open={open} onClose={handleClose}>
                <DialogTitle>Client Form</DialogTitle>
                <DialogContent>
                    {/* Form inside the dialog */}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            autoFocus
                            margin='dense'
                            label='First Name'
                            type='text'
                            fullWidth
                            required
                            value={form.firstName || ''}
                            onChange={(e) =>
                                setForm({ ...form, firstName: e.target.value })
                            }
                        />
                        <TextField
                            margin='dense'
                            label='Middle Name'
                            type='text'
                            fullWidth
                            value={form.middleName || ''}
                            onChange={(e) =>
                                setForm({ ...form, middleName: e.target.value })
                            }
                        />
                        <TextField
                            margin='dense'
                            label='Last Name'
                            type='text'
                            fullWidth
                            required
                            value={form.lastName || ''}
                            onChange={(e) =>
                                setForm({ ...form, lastName: e.target.value })
                            }
                        />
                        <TextField
                            margin='dense'
                            label='Email'
                            type='email'
                            fullWidth
                            required
                            value={form.email || ''}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                        />
                        <TextField
                            margin='dense'
                            label='Date of Birth'
                            type='date'
                            fullWidth
                            required
                            value={form.dob || ''}
                            onChange={(e) =>
                                setForm({ ...form, dob: e.target.value })
                            }
                        />
                        <Select
                            margin='dense'
                            label='Funding Source'
                            fullWidth
                            required
                            value={form.fundingId || ''}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    fundingId: e.target.value,
                                })
                            }
                        >
                            <MenuItem value='1'>NDIS</MenuItem>
                            <MenuItem value='2'>HCP</MenuItem>
                            <MenuItem value='3'>CHSP</MenuItem>
                            <MenuItem value='4'>DVA</MenuItem>
                            <MenuItem value='5'>HACC</MenuItem>
                        </Select>
                        <Select
                            margin='dense'
                            label='Primary Language'
                            fullWidth
                            required
                            value={form.languageId || ''}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    languageId: e.target.value,
                                })
                            }
                        >
                            <MenuItem value='1'>English</MenuItem>
                            <MenuItem value='2'>Spanish</MenuItem>
                            <MenuItem value='3'>French</MenuItem>
                            <MenuItem value='4'>German</MenuItem>
                            <MenuItem value='5'>Italian</MenuItem>
                        </Select>
                        <DialogActions>
                            <Button onClick={handleClose} color='secondary'>
                                Cancel
                            </Button>
                            <Button type='submit' color='primary'>
                                Submit
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ClientFormDialog;
