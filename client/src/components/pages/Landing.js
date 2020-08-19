import React from 'react'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import HowToRegIcon from '@material-ui/icons/HowToReg'
import { Grid, Typography, Button, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
	title: {
		marginTop: theme.spacing(4),
		textTransform: 'uppercase',
	},
	subtitle: {
		marginTop: theme.spacing(4),
	},
	link: {
		textDecoration: 'none',
		color: theme.palette.secondary.main,
	},
	button: {
		color: theme.palette.primary.main,
		marginRight: theme.spacing(2),
		marginTop: theme.spacing(7),
	},
}))

const Landing = () => {
	const classes = useStyles()

	return (
		<Grid container item xs={12}>
			<Typography
				variant='h3'
				color='primary'
				className={classes.title}
				align='center'
			>
				Join InstaLike and make awesome posts!
			</Typography>
			<Typography variant='h5' color='primary' className={classes.subtitle}>
				Here you may create your profile, add photo and your descr in it, add a
				post in tape, see other people's profiles and posts, comment, like it
				and have fun from it :)
			</Typography>
			<Grid item container xs={6} justify='flex-end'>
				<Link to='/login' className={classes.link}>
					<Button className={classes.button} startIcon={<ExitToAppIcon />}>
						Log In
					</Button>
				</Link>
			</Grid>

			<Grid item container xs={6} justify='flex-start'>
				<Link to='/register' className={classes.link}>
					<Button className={classes.button} startIcon={<HowToRegIcon />}>
						Sign In
					</Button>
				</Link>
			</Grid>
			<Grid container item xs={12}></Grid>
		</Grid>
	)
}

export default Landing
