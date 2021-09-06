import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction' 
import ListItemText from '@material-ui/core/ListItemText' 
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import {Link} from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar'
import ViewIcon from '@material-ui/icons/Visibility'

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    margin: '30px',
    marginTop: '20px'
  }),
  title: {
    margin: `${theme.spacing(3)}px ${theme.spacing(1)}px ${theme.spacing(2)}px`,
    display: 'flex',
    color: "#2dcea3", 
    fontWeight: "600",
    fontFamily: 'sans-serif'
  },
  avatar: {
    marginRight: theme.spacing(1)
  },
  follow: {
    right: theme.spacing(2)
  },
  snack: {
    color: theme.palette.protectedTitle
  },
  viewButton: {
    verticalAlign: 'middle'
  },
  listItemText: {
    fontFamily: 'sans-serif',
    fontSize: '16px'
  }
}))

export default function FindPeople() {
  const classes = useStyles()
  const [values, setValues] = useState({
    users: [],
    open: false,
    followMessage: ''
  })

  const handleRequestClose = (event, reason) => {
    setValues({...values, open: false })
  }
    return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title} >
          Who to follow
        </Typography>
        <List>
           <span>
                <ListItem>
                  <ListItemAvatar className={classes.avatar}>
                      <Avatar src='https://i.pinimg.com/originals/ae/ec/c2/aeecc22a67dac7987a80ac0724658493.jpg'/>
                  </ListItemAvatar>
                  <ListItemText primary='Name' className={classes.listItemText} />
                  <ListItemSecondaryAction className={classes.follow}>
                    <Link to="/">
                      <IconButton variant="contained" color="secondary" className={classes.viewButton}>
                        <ViewIcon/>
                      </IconButton>
                    </Link>
                    <Button aria-label="Follow" variant="contained" style = {{backgroundColor: '#05a684', color: '#ffffff'}} onClick={()=> alert('Click to follow')}>
                      Follow
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemAvatar className={classes.avatar}>
                      <Avatar src='https://i.pinimg.com/originals/ae/ec/c2/aeecc22a67dac7987a80ac0724658493.jpg'/>
                  </ListItemAvatar>
                  <ListItemText primary='Name' />
                  <ListItemSecondaryAction className={classes.follow}>
                    <Link to="#">
                      <IconButton variant="contained" color="secondary" className={classes.viewButton}>
                        <ViewIcon/>
                      </IconButton>
                    </Link>
                    <Button aria-label="Follow" variant="contained" style = {{backgroundColor: '#05a684', color: '#ffffff'}} onClick={()=> alert('Click to follow')}>
                      Follow
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemAvatar className={classes.avatar}>
                      <Avatar src='https://i.pinimg.com/originals/ae/ec/c2/aeecc22a67dac7987a80ac0724658493.jpg'/>
                  </ListItemAvatar>
                  <ListItemText primary='Name' />
                  <ListItemSecondaryAction className={classes.follow}>
                    <Link to="#">
                      <IconButton variant="contained" color="secondary" className={classes.viewButton}>
                        <ViewIcon/>
                      </IconButton>
                    </Link>
                    <Button aria-label="Follow" variant="contained" style = {{backgroundColor: '#05a684', color: '#ffffff'}} onClick={()=> alert('Click to follow')}>
                      Follow
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              </span>
            
        </List>
      </Paper>
      <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={values.open}
          onClose={handleRequestClose}
          autoHideDuration={6000}
          message={<span className={classes.snack}>Follow Message</span>}
      />
    </div>)
}