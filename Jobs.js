import React from 'react';
import Job from "./Job";
import JobModal from "./JobModal";
import Typography from '@material-ui/core/Typography';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const Jobs = ({ jobs }) => {
    // modal
    const [open, setOpen] = React.useState(false);
    const [selectedJob, selectJob] = React.useState({});
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // pagination
    const numJobs = jobs.length;
    const numPages = Math.ceil(numJobs / 50);

    const [activeStep, setActiveStep] = React.useState(0);
    // code for displaying numbe rof jobs on page
    const jobsOnPage = jobs.slice(activeStep * 50, (activeStep * 50) + 50);

    // step == 0, show 0-49
    // step == 1, show 50-99

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <div>
            <JobModal open = {open} job = {selectedJob} handleClose = {handleClose} />
            <Typography variant="h2">
                Software jobs
          </Typography>
          <Typography variant="h4">
                Found {numJobs}
          </Typography>
            {   //map how many jobs to display on page
                jobsOnPage.map(  
                    // to click on a job
                    job => <Job job={job} onClick = {() => { handleClickOpen(); selectJob(job)} } /> 
                )
            }
            <br />
            <div className = "numpages">
                Page {activeStep + 1} of {numPages}
            </div>
            <div className = "MobileStepper">
            <MobileStepper
                variant="progress"
                steps={numPages}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
                        Next
                    <KeyboardArrowRight />
                    </Button>
                    }
                    backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        <KeyboardArrowLeft />
                    Back
                </Button>
                }
            />
        </div>
        </div>
    )
}

export default Jobs
