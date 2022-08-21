// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import Autocomplete from '@mui/material/Autocomplete';
import { inputLabelClasses } from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import fetchBackendJSON from '../../actions/Fetch';

const formatDate = (date) =>
 [date.getFullYear(), date.getMonth() + 1, date.getDate() + 1].join('-');

function Task() {
 const [startDate, setStartDate] = useState(null);
 const [endDate, setEndDate] = useState(null);
 const [attachments, setAttachments] = useState([]);
 const [title, setTitle] = useState('');
 const [priority, setPriority] = useState(0);
 // const [parent, setParent] = useState(null);
 const [description, setDescription] = useState('');

 const navigate = useNavigate();

 let selectedFile;

 const { taskid, spaceid } = useParams();
 console.log(`taskid: ${taskid}`);
 console.log(`spaceid: ${spaceid}`);
 const parentid = taskid === undefined ? 0 : taskid;

 const submitForm = (e) => {
  e.preventDefault();
  const data = {
   project_id: spaceid,
   title,
   description,
   start_time: formatDate(startDate),
   end_time: formatDate(endDate),
   status: 'Not Started',
   slack_time: 0,
  };
  async function sendData() {
   const res = await fetchBackendJSON('project/addtask', 'POST', data);
   console.log(res);

   if (parentid !== 0) {
    const res2 = await fetchBackendJSON('project/addtaskparent', 'POST', {
     parent_task_id: parentid,
     sub_task_id: res.id,
    });
    console.log(res2);
    navigate(`/spaces/${spaceid}/tasks/${taskid}/`, { replace: false });
   }

   setStartDate(null);
   setEndDate(null);
   setTitle('');
   setDescription('');
   setPriority(0);
   // eslint-disable-next-line no-unused-vars
   setAttachments((prev) => []);
   navigate(`/spaces/${spaceid}/tasks/`, { replace: false });
  }

  sendData();
  // submit everything
 };

 return (
  <div className={['mycontainer', 'container'].join(' ')}>
   <h1>New Task</h1>
   <Form className={['row'].join(' ')}>
    <Form.Group className="mb-3 col-6" controlId="formTaskTitle">
     <Form.Label>Task Title</Form.Label>
     <Form.Control
      type="text"
      placeholder="Enter task title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      onKeyPress={(e) => {
       if (e.key === 'Enter') e.preventDefault();
      }}
     />
    </Form.Group>

    <Form.Group className="mb-3 col-6" controlId="formStartDate">
     {/* <Form.Label>Start Date: </Form.Label> */}
     <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
       openTo="year"
       label="Start Date"
       views={['year', 'month', 'day']}
       value={startDate}
       onChange={(newValue) => {
        setStartDate(newValue);
       }}
       // eslint-disable-next-line react/jsx-props-no-spreading
       renderInput={(params) => (
        <TextField
         // eslint-disable-next-line react/jsx-props-no-spreading
         {...params}
         sx={{ input: { color: 'black' }, svg: { color: 'black' } }}
         onKeyPress={(e) => {
          if (e.key === 'Enter') e.preventDefault();
         }}
         InputLabelProps={{
          sx: {
           // set the color of the label when not shrinked
           color: 'black',
           [`&.${inputLabelClasses.shrink}`]: {
            // set the color of the label when shrinked (usually when the TextField is focused)
            color: 'black',
           },
          },
         }}
        />
       )}
      />
     </LocalizationProvider>
    </Form.Group>

    <Form.Group className="mb-3 col-6" controlId="formTaskDescription">
     <Form.Label>Task Description</Form.Label>
     <Form.Control
      as="textarea"
      rows={3}
      value={description}
      placeholder="Task description here"
      onChange={(e) => setDescription(e.target.value)}
      onKeyPress={(e) => {
       if (e.key === 'Enter') e.preventDefault();
      }}
     />
    </Form.Group>

    <Form.Group className="mb-3 col-6" controlId="formEndDate">
     {/* <Form.Label>Start Date: </Form.Label> */}
     <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
       openTo="year"
       label="Expected End Date"
       views={['year', 'month', 'day']}
       value={endDate}
       onChange={(newValue) => {
        setEndDate(newValue);
       }}
       // eslint-disable-next-line react/jsx-props-no-spreading
       renderInput={(params) => (
        <TextField
         // eslint-disable-next-line react/jsx-props-no-spreading
         {...params}
         sx={{ input: { color: 'black' }, svg: { color: 'black' } }}
         onKeyPress={(e) => {
          if (e.key === 'Enter') e.preventDefault();
         }}
         InputLabelProps={{
          sx: {
           // set the color of the label when not shrinked
           color: 'black',
           [`&.${inputLabelClasses.shrink}`]: {
            // set the color of the label when shrinked (usually when the TextField is focused)
            color: 'black',
           },
          },
         }}
        />
       )}
      />
     </LocalizationProvider>
    </Form.Group>

    <Form.Group className="mb-3 col-6" controlId="formPriority">
     <Form.Label>Priority </Form.Label>
     <Form.Select
      aria-label="Default select example"
      value={priority}
      onChange={(e) => setPriority(e.target.value)}
     >
      <option value="0">Choose a priority</option>
      <option value="1">High</option>
      <option value="2">Medium</option>
      <option value="3">Low</option>
     </Form.Select>
    </Form.Group>

    <Form.Group className="mb-3 col-6" controlId="formAttachFile">
     <Form.Label>Attachments</Form.Label>
     {/* files list */}
     <ul className="mb-3 col-6">
      {attachments.map((val, key) => (
       <li key={key}>{val.name}</li>
      ))}
     </ul>
     <Form.Control
      type="file"
      placeholder="Choose a file"
      value={selectedFile}
      onKeyPress={(e) => {
       if (e.key === 'Enter') e.preventDefault();
      }}
      onChange={(e) => {
       // eslint-disable-next-line prefer-destructuring
       selectedFile = e.target.files[0];
       setAttachments([...attachments, e.target.files[0]]);
      }}
     />
    </Form.Group>

    <Button variant="primary" type="submit" onClick={submitForm}>
     Submit
    </Button>
   </Form>
  </div>
 );
}

export default Task;
