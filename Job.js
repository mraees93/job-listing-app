import React from 'react'
import Typography from '@material-ui/core/Typography';

export default function Job({job, onClick}) {
    return (
        <div onClick = {onClick} className = "job">
            <div>
            <Typography variant = "h5">{job.title}</Typography>
            </div>
            <div>
            <Typography>{job.company}</Typography>
            </div>
            <div>
            <Typography>{job.location}</Typography>
            </div>
            <div className = "created">
            {/* taking some of the date out, 0,3 specifically to only show the first 3 indexes*/}
            <Typography>{job.created_at.split(' ').slice(0,3).join(' ')}</Typography>  
            </div>
        </div>
    )
}


